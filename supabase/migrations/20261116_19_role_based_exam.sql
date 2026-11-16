-- ====================================================================
-- IKAAI ACADEMY / LIBRARY - MIGRATION 20261116_19
-- ROLE-BASED EXAMINATION ARCHITECTURE & SECURE AUTOMARKING
--
-- Features:
--   1. Schema: job_id on profiles, access_invites, exam_questions, exam_submissions
--   2. New table: exam_question_options with exactly one correct option per MCQ
--   3. Guard triggers & signup sync for job_id
--   4. Admin RPCs: invite_user and update_user_access with job_id support
--   5. Learner RPC: get_exam_paper() without leaking answers or rubrics
--   6. Hardened submit_exam() with automated server-side MCQ marking
--   7. Hardened grade_exam() with server-computed final score
--   8. Evaluation Inbox detail RPCs supporting role titles & legacy submissions
--   9. Strict Row Level Security & permissions revocation
--  10. Deactivation of legacy non-role-based questions (is_active = false)
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- 1. EXTEND TABLES WITH JOB ASSIGNMENT COLUMNS
-- --------------------------------------------------------------------

-- A. profiles.job_id
alter table public.profiles
  add column if not exists job_id uuid references public.jobs(id) on delete set null;

create index if not exists idx_profiles_job_id on public.profiles(job_id);

-- B. access_invites.job_id
alter table public.access_invites
  add column if not exists job_id uuid references public.jobs(id) on delete set null;

create index if not exists idx_access_invites_job_id on public.access_invites(job_id);

-- C. exam_questions extensions
alter table public.exam_questions
  add column if not exists job_id uuid references public.jobs(id) on delete cascade;

alter table public.exam_questions
  add column if not exists question_type text not null default 'written';

alter table public.exam_questions
  drop constraint if exists exam_questions_question_type_check;

alter table public.exam_questions
  add constraint exam_questions_question_type_check check (question_type in ('written', 'mcq'));

alter table public.exam_questions
  add column if not exists marking_guide text;

alter table public.exam_questions
  add column if not exists is_active boolean not null default true;

create index if not exists idx_exam_questions_job_id on public.exam_questions(job_id);
create index if not exists idx_exam_questions_job_active on public.exam_questions(job_id, is_active, sort_order);

-- D. exam_submissions.job_id
alter table public.exam_submissions
  add column if not exists job_id uuid references public.jobs(id) on delete set null;

create index if not exists idx_exam_submissions_job_id on public.exam_submissions(job_id);

-- --------------------------------------------------------------------
-- 2. NEW TABLE: exam_question_options (MCQ OPTIONS)
-- --------------------------------------------------------------------
create table if not exists public.exam_question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.exam_questions(id) on delete cascade,
  option_label text not null check (option_label in ('A', 'B', 'C', 'D')),
  option_text text not null,
  is_correct boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  constraint uq_exam_question_option_label unique (question_id, option_label)
);

create index if not exists idx_exam_q_options_question on public.exam_question_options(question_id);
create unique index if not exists uq_exam_question_options_correct
  on public.exam_question_options(question_id) where (is_correct = true);

-- E. exam_answers extensions
alter table public.exam_answers
  add column if not exists selected_option_id uuid references public.exam_question_options(id) on delete set null;

-- Allow answer_text to be null for MCQs
alter table public.exam_answers
  alter column answer_text drop not null;

create index if not exists idx_exam_answers_selected_option on public.exam_answers(selected_option_id);


-- --------------------------------------------------------------------
-- 3. GUARD TRIGGER: PREVENT NON-ADMINS FROM CHANGING job_id
-- --------------------------------------------------------------------
create or replace function public.guard_profile_updates()
returns trigger as $$
begin
  if not public.is_admin() then
    -- Non-admins cannot modify account roles
    if new.role is distinct from old.role then
      raise exception 'Only administrators can change account roles.';
    end if;

    -- Non-admins cannot modify access approval status
    if new.access_status is distinct from old.access_status then
      raise exception 'Only administrators can change account access approval status.';
    end if;

    -- Non-admins cannot modify email addresses
    if new.email is distinct from old.email then
      raise exception 'Only administrators can change email addresses.';
    end if;

    -- Non-admins cannot modify office branch location
    if new.branch is distinct from old.branch then
      raise exception 'Only administrators can change branch location.';
    end if;

    -- Non-admins cannot modify position title
    if new.position is distinct from old.position then
      raise exception 'Only administrators can change position title.';
    end if;

    -- Non-admins cannot modify assigned programme_id
    if new.programme_id is distinct from old.programme_id then
      raise exception 'Only administrators can reassign programmes.';
    end if;

    -- Non-admins cannot modify assigned job_id
    if new.job_id is distinct from old.job_id then
      raise exception 'Only administrators can change assigned job role.';
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 4. SIGNUP TRIGGER: COPY job_id FROM INVITE TO PROFILE
-- --------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
declare
  clean_email text;
  name_val text;
  avatar_val text;
  invite_rec record;
  role_val text;
  programme_id_val uuid;
  job_id_val uuid;
  position_val text;
  access_status_val text;
begin
  clean_email := lower(trim(new.email));

  name_val := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    split_part(clean_email, '@', 1),
    'Learner'
  );

  avatar_val := coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture',
    null
  );

  -- Check access_invites for pre-approval
  begin
    select * into invite_rec
    from public.access_invites
    where lower(trim(email)) = clean_email
    limit 1;
  exception when others then
    invite_rec := null;
  end;

  if invite_rec is not null and invite_rec.status in ('invited', 'active') then
    role_val := case when invite_rec.role = 'learner' then 'intern' else coalesce(invite_rec.role, 'intern') end;
    programme_id_val := case when role_val = 'admin' then null else invite_rec.programme_id end;
    job_id_val := case when role_val = 'admin' then null else invite_rec.job_id end;
    access_status_val := 'active';

    if job_id_val is not null then
      select title into position_val from public.jobs where id = job_id_val;
    end if;

    begin
      update public.access_invites
      set status = 'active', activated_at = coalesce(activated_at, now())
      where id = invite_rec.id;
    exception when others then
      -- Do not abort signup
    end;
  elsif invite_rec is not null and invite_rec.status = 'revoked' then
    role_val := case when invite_rec.role = 'learner' then 'intern' else coalesce(invite_rec.role, 'intern') end;
    programme_id_val := case when role_val = 'admin' then null else invite_rec.programme_id end;
    job_id_val := case when role_val = 'admin' then null else invite_rec.job_id end;
    access_status_val := 'revoked';
  else
    role_val := 'intern';
    programme_id_val := null;
    job_id_val := null;
    access_status_val := 'pending';
  end if;

  -- Insert profile using canonical columns only
  begin
    insert into public.profiles (
      id,
      full_name,
      email,
      avatar_url,
      role,
      programme_id,
      job_id,
      position,
      access_status,
      created_at,
      updated_at
    )
    values (
      new.id,
      name_val,
      clean_email,
      avatar_val,
      role_val,
      programme_id_val,
      job_id_val,
      position_val,
      access_status_val,
      now(),
      now()
    )
    on conflict (id) do update set
      full_name = coalesce(public.profiles.full_name, excluded.full_name),
      email = excluded.email,
      avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
      job_id = coalesce(public.profiles.job_id, excluded.job_id),
      position = coalesce(public.profiles.position, excluded.position),
      updated_at = now();
  exception when others then
    -- Resilient fallback
    null;
  end;

  return new;
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 5. ADMIN FUNCTIONS: invite_user & update_user_access (WITH job_id)
-- --------------------------------------------------------------------
drop function if exists public.invite_user(text, text, uuid, uuid);
drop function if exists public.invite_user(text, text, uuid);
drop function if exists public.update_user_access(uuid, text, uuid, uuid);
drop function if exists public.update_user_access(uuid, text, uuid);

-- A. invite_user with optional p_job_id
create or replace function public.invite_user(
  p_email text,
  p_role text,
  p_programme_id uuid,
  p_job_id uuid default null
)
returns jsonb as $$
declare
  clean_email text;
  clean_role text;
  v_job_prog uuid;
  v_job_title text;
  existing_user_id uuid;
  existing_invite_id uuid;
  invite_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  clean_email := lower(trim(p_email));
  if clean_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then
    raise exception 'Invalid email address format: %', p_email;
  end if;

  clean_role := lower(trim(p_role));
  if clean_role not in ('intern', 'learner', 'instructor', 'admin') then
    raise exception 'Invalid role: %. Must be intern, instructor, or admin.', p_role;
  end if;

  if clean_role = 'admin' then
    if p_programme_id is not null or p_job_id is not null then
      raise exception 'Admin accounts cannot be assigned to a specific programme or job role.';
    end if;
  end if;

  -- Validate job_id requirement for interns
  if clean_role in ('intern', 'learner') then
    if p_job_id is null then
      raise exception 'Interns require an assigned job role.';
    end if;
  end if;

  -- Validate job exists and belongs to the chosen programme
  if p_job_id is not null then
    select programme_id, title into v_job_prog, v_job_title
    from public.jobs
    where id = p_job_id;

    if not found then
      raise exception 'Invalid job role identifier.';
    end if;

    if p_programme_id is not null and v_job_prog is distinct from p_programme_id then
      raise exception 'Assigned job role does not belong to the selected programme.';
    end if;

    if p_programme_id is null and clean_role in ('intern', 'learner', 'instructor') then
      p_programme_id := v_job_prog;
    end if;
  end if;

  if clean_role in ('intern', 'learner', 'instructor') and p_programme_id is null then
    raise exception 'Interns and instructors must be assigned to one of the 5 programmes.';
  end if;

  if p_programme_id is not null and not exists (select 1 from public.programmes where id = p_programme_id) then
    raise exception 'Invalid programme identifier.';
  end if;

  -- Upsert access_invites
  select id into existing_invite_id
  from public.access_invites
  where lower(trim(email)) = clean_email;

  if existing_invite_id is not null then
    update public.access_invites
    set
      role = clean_role,
      programme_id = p_programme_id,
      job_id = p_job_id,
      status = case when status = 'revoked' then 'invited' else status end,
      invited_by = auth.uid()
    where id = existing_invite_id
    returning id into invite_id;
  else
    insert into public.access_invites (
      email, role, programme_id, job_id, status, invited_by, created_at
    )
    values (
      clean_email, clean_role, p_programme_id, p_job_id, 'invited', auth.uid(), now()
    )
    returning id into invite_id;
  end if;

  -- If matching profile already exists, activate and sync role/programme/job_id
  select id into existing_user_id from public.profiles where lower(trim(email)) = clean_email;
  if existing_user_id is not null then
    update public.profiles
    set
      role = case when clean_role = 'intern' then 'learner' else clean_role end,
      programme_id = p_programme_id,
      job_id = p_job_id,
      position = coalesce(v_job_title, position),
      access_status = 'active',
      updated_at = now()
    where id = existing_user_id;

    update public.access_invites
    set status = 'active', activated_at = coalesce(activated_at, now())
    where id = invite_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'invite_id', invite_id,
    'email', clean_email,
    'role', clean_role,
    'programme_id', p_programme_id,
    'job_id', p_job_id,
    'activated', existing_user_id is not null
  );
end;
$$ language plpgsql security definer set search_path = public, pg_temp;

-- 3-argument backward compatibility wrapper for invite_user
create or replace function public.invite_user(
  p_email text,
  p_role text,
  p_programme_id uuid
)
returns jsonb as $$
begin
  return public.invite_user(p_email, p_role, p_programme_id, null::uuid);
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- B. update_user_access with optional p_job_id
create or replace function public.update_user_access(
  p_user_id uuid,
  p_role text,
  p_programme_id uuid,
  p_job_id uuid default null
)
returns jsonb as $$
declare
  old_role text;
  target_email text;
  clean_role text;
  v_job_prog uuid;
  v_job_title text;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  select role, email into old_role, target_email
  from public.profiles
  where id = p_user_id;

  if not found then
    raise exception 'User profile not found.';
  end if;

  clean_role := lower(trim(p_role));
  if clean_role not in ('intern', 'learner', 'instructor', 'admin') then
    raise exception 'Invalid role: %.', p_role;
  end if;

  -- Guard: Never demote the last remaining active admin
  if old_role = 'admin' and clean_role <> 'admin' then
    if (select count(*) from public.profiles where role = 'admin' and access_status = 'active') <= 1 then
      raise exception 'Operation forbidden: Cannot demote the last remaining active administrator.';
    end if;
  end if;

  if clean_role = 'admin' then
    if p_programme_id is not null or p_job_id is not null then
      raise exception 'Admin accounts cannot be assigned to a specific programme or job role.';
    end if;
  end if;

  -- Validate job_id requirement for interns
  if clean_role in ('intern', 'learner') then
    if p_job_id is null then
      raise exception 'Interns require an assigned job role.';
    end if;
  end if;

  -- Validate job exists and belongs to the chosen programme
  if p_job_id is not null then
    select programme_id, title into v_job_prog, v_job_title
    from public.jobs
    where id = p_job_id;

    if not found then
      raise exception 'Invalid job role identifier.';
    end if;

    if p_programme_id is not null and v_job_prog is distinct from p_programme_id then
      raise exception 'Assigned job role does not belong to the selected programme.';
    end if;

    if p_programme_id is null and clean_role in ('intern', 'learner', 'instructor') then
      p_programme_id := v_job_prog;
    end if;
  end if;

  if clean_role in ('intern', 'learner', 'instructor') and p_programme_id is null then
    raise exception 'Interns and instructors must be assigned to one of the 5 programmes.';
  end if;

  -- Update profile
  update public.profiles
  set
    role = case when clean_role = 'intern' then 'learner' else clean_role end,
    programme_id = p_programme_id,
    job_id = p_job_id,
    position = coalesce(v_job_title, position),
    access_status = 'active',
    updated_at = now()
  where id = p_user_id;

  -- Update matching invite
  if target_email is not null then
    insert into public.access_invites (email, role, programme_id, job_id, status, invited_by, created_at, activated_at)
    values (lower(trim(target_email)), clean_role, p_programme_id, p_job_id, 'active', auth.uid(), now(), now())
    on conflict (email) do update set
      role = excluded.role,
      programme_id = excluded.programme_id,
      job_id = excluded.job_id,
      status = 'active',
      activated_at = coalesce(public.access_invites.activated_at, now());
  end if;

  return jsonb_build_object(
    'success', true,
    'user_id', p_user_id,
    'role', clean_role,
    'programme_id', p_programme_id,
    'job_id', p_job_id
  );
end;
$$ language plpgsql security definer set search_path = public, pg_temp;

-- 3-argument backward compatibility wrapper for update_user_access
create or replace function public.update_user_access(
  p_user_id uuid,
  p_role text,
  p_programme_id uuid
)
returns jsonb as $$
begin
  return public.update_user_access(p_user_id, p_role, p_programme_id, null::uuid);
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 6. RPC: get_exam_paper() (LEARNER PAPER RETRIEVAL)
-- --------------------------------------------------------------------
drop function if exists public.get_exam_paper();

create or replace function public.get_exam_paper()
returns jsonb as $$
declare
  v_caller_id uuid := auth.uid();
  v_user record;
  v_questions jsonb;
  v_job record;
begin
  if v_caller_id is null then
    raise exception 'Authentication required.';
  end if;

  select id, role, access_status, programme_id, job_id
  into v_user
  from public.profiles
  where id = v_caller_id;

  if v_user.access_status is distinct from 'active' then
    raise exception 'Account access is not active.';
  end if;

  if v_user.job_id is null then
    -- Auto-resolve primary job for learner's programme if set
    if v_user.programme_id is not null then
      select id into v_user.job_id
      from public.jobs
      where programme_id = v_user.programme_id
      order by sort_order asc
      limit 1;

      if v_user.job_id is not null then
        update public.profiles
        set job_id = v_user.job_id,
            position = coalesce(position, (select title from public.jobs where id = v_user.job_id))
        where id = v_user.id and job_id is null;
      end if;
    end if;
  end if;

  if v_user.job_id is null then
    raise exception 'Your role has not been assigned yet. Please contact your administrator.';
  end if;

  select id, title, slug, category, programme_id
  into v_job
  from public.jobs
  where id = v_user.job_id;

  if v_job.id is null then
    raise exception 'Assigned job role record not found.';
  end if;

  -- Load active questions and their MCQ options (WITHOUT is_correct and WITHOUT marking_guide)
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', q.id,
        'question', q.question,
        'prompt', q.prompt,
        'question_type', q.question_type,
        'max_marks', q.max_marks,
        'sort_order', q.sort_order,
        'options', case
          when q.question_type = 'mcq' then (
            select coalesce(
              jsonb_agg(
                jsonb_build_object(
                  'id', o.id,
                  'option_label', o.option_label,
                  'option_text', o.option_text,
                  'sort_order', o.sort_order
                )
                order by o.sort_order asc, o.option_label asc
              ),
              '[]'::jsonb
            )
            from public.exam_question_options o
            where o.question_id = q.id
          )
          else '[]'::jsonb
        end
      )
      order by q.sort_order asc, q.created_at asc
    ),
    '[]'::jsonb
  ) into v_questions
  from public.exam_questions q
  where q.job_id = v_user.job_id
    and q.is_active = true;

  return jsonb_build_object(
    'job_id', v_job.id,
    'job_title', v_job.title,
    'programme_id', v_job.programme_id,
    'questions', v_questions
  );
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 7. RPC: submit_exam() (HARDENED SERVER-SIDE AUTOMARKING)
-- --------------------------------------------------------------------
drop function if exists public.submit_exam(uuid, jsonb);

create or replace function public.submit_exam(p_programme_id uuid, p_answers jsonb)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_user record;
  v_job record;
  v_sub_id uuid;
  v_existing record;
  v_total_questions int := 0;
  v_answered_questions int := 0;
  v_q record;
  v_ans_item jsonb;
  v_ans_text text;
  v_selected_opt_id uuid;
  v_opt record;
  v_marks numeric;
  v_answers_map jsonb := '{}'::jsonb;
  v_item jsonb;
  v_key text;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  select id, role, programme_id, job_id, access_status
  into v_user
  from public.profiles
  where id = v_user_id;

  if v_user.access_status is distinct from 'active' then
    raise exception 'Account access is not active.';
  end if;

  if v_user.job_id is null then
    -- Auto-resolve primary job for learner's programme if set
    if v_user.programme_id is not null then
      select id into v_user.job_id
      from public.jobs
      where programme_id = v_user.programme_id
      order by sort_order asc
      limit 1;

      if v_user.job_id is not null then
        update public.profiles
        set job_id = v_user.job_id,
            position = coalesce(position, (select title from public.jobs where id = v_user.job_id))
        where id = v_user.id and job_id is null;
      end if;
    end if;
  end if;

  if v_user.job_id is null then
    raise exception 'Your role has not been assigned yet. Please contact your administrator.';
  end if;

  select id, title, programme_id into v_job
  from public.jobs
  where id = v_user.job_id;

  if v_job.id is null then
    raise exception 'Assigned job role record not found.';
  end if;

  -- Programme verification: caller must be authorized for this programme
  if v_user.role in ('intern', 'learner') then
    if v_user.programme_id is not null and p_programme_id is not null and p_programme_id is distinct from v_user.programme_id then
      raise exception 'You are not authorized to submit exams for this programme.';
    end if;
  end if;

  if p_programme_id is null then
    p_programme_id := coalesce(v_user.programme_id, v_job.programme_id);
  end if;

  -- Check existing submission state
  select id, status, allow_retake into v_existing
  from public.exam_submissions
  where user_id = v_user_id
    and programme_id = p_programme_id;

  if v_existing.id is not null then
    if v_existing.status in ('submitted', 'graded')
      and not coalesce(v_existing.allow_retake, false) then
      raise exception 'Exam has already been submitted for this programme. Retakes are not allowed unless permitted by an instructor.';
    end if;
  end if;

  -- Normalize incoming answers into a key-value lookup: { "<question_id>": { "selected_option_id": "...", "answer_text": "..." } }
  if p_answers is null then
    raise exception 'No exam answers provided.';
  end if;

  if jsonb_typeof(p_answers) = 'array' then
    for v_item in select * from jsonb_array_elements(p_answers) loop
      v_key := v_item->>'question_id';
      if v_key is not null then
        v_answers_map := jsonb_set(v_answers_map, array[v_key], v_item, true);
      end if;
    end loop;
  elsif jsonb_typeof(p_answers) = 'object' then
    for v_key in select jsonb_object_keys(p_answers) loop
      v_item := p_answers->v_key;
      if jsonb_typeof(v_item) = 'object' then
        v_answers_map := jsonb_set(v_answers_map, array[v_key], v_item, true);
      else
        -- Backwards-compatible: value is string (either option_id or answer_text)
        v_ans_text := p_answers->>v_key;
        v_answers_map := jsonb_set(
          v_answers_map,
          array[v_key],
          jsonb_build_object(
            'question_id', v_key,
            'answer_text', v_ans_text,
            'selected_option_id', case when v_ans_text ~* '^[0-9a-f-]{36}$' then v_ans_text else null end
          ),
          true
        );
      end if;
    end loop;
  else
    raise exception 'Invalid answer payload structure.';
  end if;

  -- Create or reset submission record
  if v_existing.id is not null then
    update public.exam_submissions
    set
      job_id = v_user.job_id,
      status = 'submitted',
      submitted_at = now(),
      allow_retake = false,
      score = null,
      grade = null,
      instructor_comment = null,
      graded_by = null,
      graded_at = null,
      updated_at = now()
    where id = v_existing.id
    returning id into v_sub_id;
  else
    insert into public.exam_submissions (
      user_id,
      programme_id,
      job_id,
      status,
      submitted_at,
      allow_retake,
      created_at,
      updated_at
    )
    values (
      v_user_id,
      p_programme_id,
      v_user.job_id,
      'submitted',
      now(),
      false,
      now(),
      now()
    )
    returning id into v_sub_id;
  end if;

  -- Validate each active question of the caller's job
  for v_q in
    select id, question_type, max_marks
    from public.exam_questions
    where job_id = v_user.job_id
      and is_active = true
    order by sort_order asc
  loop
    v_total_questions := v_total_questions + 1;
    v_ans_item := v_answers_map->(v_q.id::text);

    if v_ans_item is null then
      raise exception 'Question % is unanswered. All questions must be completed before submission.', v_total_questions;
    end if;

    if v_q.question_type = 'mcq' then
      v_selected_opt_id := null;
      if (v_ans_item->>'selected_option_id') is not null and (v_ans_item->>'selected_option_id') <> '' then
        begin
          v_selected_opt_id := (v_ans_item->>'selected_option_id')::uuid;
        exception when others then
          v_selected_opt_id := null;
        end;
      elsif (v_ans_item->>'answer_text') is not null and (v_ans_item->>'answer_text') ~* '^[0-9a-f-]{36}$' then
        v_selected_opt_id := (v_ans_item->>'answer_text')::uuid;
      end if;

      if v_selected_opt_id is null then
        raise exception 'Question % (MCQ) requires a chosen option.', v_total_questions;
      end if;

      -- Verify option belongs to this question
      select id, is_correct into v_opt
      from public.exam_question_options
      where id = v_selected_opt_id
        and question_id = v_q.id;

      if v_opt.id is null then
        raise exception 'Selected option does not belong to question %.', v_total_questions;
      end if;

      -- Automark: max_marks if correct, 0 if incorrect
      v_marks := case when v_opt.is_correct then v_q.max_marks else 0 end;

      insert into public.exam_answers (
        submission_id,
        question_id,
        selected_option_id,
        answer_text,
        marks
      )
      values (
        v_sub_id,
        v_q.id,
        v_selected_opt_id,
        null,
        v_marks
      )
      on conflict (submission_id, question_id) do update set
        selected_option_id = excluded.selected_option_id,
        answer_text = excluded.answer_text,
        marks = excluded.marks;

      v_answered_questions := v_answered_questions + 1;

    else
      -- Written Question
      v_ans_text := trim(coalesce(v_ans_item->>'answer_text', ''));
      if v_ans_text = '' then
        raise exception 'Question % (Written) cannot be empty.', v_total_questions;
      end if;

      if length(v_ans_text) > 4000 then
        raise exception 'Question % response exceeds 4000 characters limit.', v_total_questions;
      end if;

      -- Written marks remain NULL until graded by instructor
      insert into public.exam_answers (
        submission_id,
        question_id,
        selected_option_id,
        answer_text,
        marks
      )
      values (
        v_sub_id,
        v_q.id,
        null,
        v_ans_text,
        null
      )
      on conflict (submission_id, question_id) do update set
        selected_option_id = excluded.selected_option_id,
        answer_text = excluded.answer_text,
        marks = excluded.marks;

      v_answered_questions := v_answered_questions + 1;
    end if;
  end loop;

  if v_total_questions = 0 then
    raise exception 'No active exam questions found for your role.';
  end if;

  if v_answered_questions < v_total_questions then
    raise exception 'All % questions must be answered before submitting.', v_total_questions;
  end if;

  return jsonb_build_object(
    'success', true,
    'submission_id', v_sub_id,
    'status', 'submitted',
    'submitted_at', now(),
    'total_questions', v_total_questions
  );
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 8. RPC: grade_exam() (HARDENED SERVER-COMPUTED SCORING)
-- --------------------------------------------------------------------
drop function if exists public.grade_exam(uuid, numeric, text, jsonb);
drop function if exists public.grade_exam(uuid, numeric, text);

create or replace function public.grade_exam(
  p_submission_id uuid,
  p_overall_marks numeric,
  p_overall_comment text,
  p_answers_grades jsonb default null
)
returns jsonb as $$
declare
  v_grader_id uuid := auth.uid();
  v_grader_role text;
  v_grader_access text;
  v_grader_prog uuid;
  v_sub record;
  v_grade_letter text;
  v_item jsonb;
  v_q_id uuid;
  v_marks numeric;
  v_comment text;
  v_q_rec record;
  v_sum_marks numeric := 0;
  v_sum_max_marks numeric := 0;
  v_final_percentage numeric;
  v_ungraded_written_count int := 0;
begin
  if v_grader_id is null then
    raise exception 'Authentication required.';
  end if;

  select role, access_status, programme_id
  into v_grader_role, v_grader_access, v_grader_prog
  from public.profiles
  where id = v_grader_id;

  if v_grader_access is distinct from 'active'
    or v_grader_role not in ('admin', 'instructor') then
    raise exception 'Only active instructors or administrators can grade exams.';
  end if;

  if length(coalesce(p_overall_comment, '')) > 2000 then
    raise exception 'Overall comment cannot exceed 2000 characters.';
  end if;

  select s.* into v_sub
  from public.exam_submissions s
  where s.id = p_submission_id;

  if v_sub.id is null then
    raise exception 'Exam submission not found.';
  end if;

  if v_grader_role = 'instructor'
    and v_sub.programme_id is distinct from v_grader_prog then
    raise exception 'You are not authorized to grade submissions for this programme.';
  end if;

  -- Apply individual answer grades if provided
  if p_answers_grades is not null and jsonb_typeof(p_answers_grades) = 'array' then
    for v_item in select * from jsonb_array_elements(p_answers_grades) loop
      v_q_id := (v_item->>'question_id')::uuid;
      v_comment := v_item->>'comment';

      select id, question_type, max_marks into v_q_rec
      from public.exam_questions
      where id = v_q_id;

      if v_q_rec.id is null then
        raise exception 'Question % not found.', v_q_id;
      end if;

      if v_q_rec.question_type = 'mcq' then
        -- Reject manual marks tampering for MCQs
        if v_item->>'marks' is not null and (v_item->>'marks') <> '' then
          raise exception 'MCQ questions are automatically scored by the server and cannot be manually graded.';
        end if;
      else
        -- Written question grading
        if v_item->>'marks' is null or (v_item->>'marks') = '' then
          raise exception 'Marks are required for written question %.', v_q_rec.id;
        end if;

        v_marks := (v_item->>'marks')::numeric;
        if v_marks < 0 or v_marks > v_q_rec.max_marks then
          raise exception 'Awarded marks for question % must be between 0 and %.', v_q_rec.id, v_q_rec.max_marks;
        end if;

        update public.exam_answers
        set
          marks = v_marks,
          comment = v_comment
        where submission_id = p_submission_id
          and question_id = v_q_id;
      end if;
    end loop;
  end if;

  -- Verify all written answers have been graded
  select count(*) into v_ungraded_written_count
  from public.exam_answers a
  join public.exam_questions q on q.id = a.question_id
  where a.submission_id = p_submission_id
    and q.question_type = 'written'
    and a.marks is null;

  if v_ungraded_written_count > 0 then
    raise exception 'All written questions must be graded before submitting official evaluation.';
  end if;

  -- Compute final score ON SERVER as:
  -- (sum of answer marks / sum of max_marks of answered questions) * 100
  select
    coalesce(sum(a.marks), 0),
    coalesce(sum(q.max_marks), 0)
  into v_sum_marks, v_sum_max_marks
  from public.exam_answers a
  join public.exam_questions q on q.id = a.question_id
  where a.submission_id = p_submission_id;

  if v_sum_max_marks <= 0 then
    v_final_percentage := 0;
  else
    v_final_percentage := round((v_sum_marks / v_sum_max_marks) * 100.0, 2);
  end if;

  -- Determine grade letter
  if v_final_percentage >= 90 then
    v_grade_letter := 'A (' || round(v_final_percentage)::text || '%)';
  elsif v_final_percentage >= 80 then
    v_grade_letter := 'B (' || round(v_final_percentage)::text || '%)';
  elsif v_final_percentage >= 70 then
    v_grade_letter := 'C (' || round(v_final_percentage)::text || '%)';
  else
    v_grade_letter := 'Fail (' || round(v_final_percentage)::text || '%)';
  end if;

  -- Update submission master record
  update public.exam_submissions
  set
    status = 'graded',
    score = v_final_percentage,
    grade = v_grade_letter,
    instructor_comment = p_overall_comment,
    graded_by = v_grader_id,
    graded_at = now(),
    updated_at = now()
  where id = p_submission_id;

  return jsonb_build_object(
    'success', true,
    'submission_id', p_submission_id,
    'status', 'graded',
    'score', v_final_percentage,
    'grade', v_grade_letter
  );
end;
$$ language plpgsql security definer set search_path = public, pg_temp;

-- 3-argument backward compatibility wrapper for grade_exam
create or replace function public.grade_exam(
  p_submission_id uuid,
  p_marks numeric,
  p_comment text default null
)
returns jsonb as $$
begin
  return public.grade_exam(p_submission_id, p_marks, p_comment, null::jsonb);
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 9. RPC: get_exam_submission_detail() (SUPPORTS MCQs & LEGACY PAPERS)
-- --------------------------------------------------------------------
drop function if exists public.get_exam_submission_detail(uuid);

create or replace function public.get_exam_submission_detail(p_submission_id uuid)
returns jsonb as $$
declare
  v_caller_id uuid := auth.uid();
  v_role text;
  v_access text;
  v_caller_prog uuid;
  v_sub record;
  v_questions jsonb;
  v_job_title text;
begin
  if v_caller_id is null then
    raise exception 'Authentication required.';
  end if;

  select p.role, p.access_status, p.programme_id
  into v_role, v_access, v_caller_prog
  from public.profiles p
  where p.id = v_caller_id;

  if v_access is distinct from 'active'
    or v_role not in ('admin', 'instructor') then
    raise exception 'Access denied: Only active administrators or instructors can view submission details.';
  end if;

  select
    s.*,
    p.full_name as learner_name,
    p.email as learner_email,
    p.avatar_url as learner_avatar,
    pr.name as programme_name,
    j.title as submission_job_title
  into v_sub
  from public.exam_submissions s
  join public.profiles p on p.id = s.user_id
  left join public.programmes pr on pr.id = s.programme_id
  left join public.jobs j on j.id = s.job_id
  where s.id = p_submission_id;

  if v_sub.id is null then
    raise exception 'Exam submission not found.';
  end if;

  if v_role = 'instructor'
    and v_sub.programme_id is distinct from v_caller_prog then
    raise exception 'Access denied: You are not authorized to view submissions for this programme.';
  end if;

  v_job_title := coalesce(v_sub.submission_job_title, 'Role not assigned');

  -- Query answered questions via exam_answers (ensures old legacy submissions still load)
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'question_id', q.id,
        'question_title', q.question,
        'prompt', q.prompt,
        'question_type', q.question_type,
        'max_marks', q.max_marks,
        'sort_order', q.sort_order,
        'marking_guide', q.marking_guide,
        'answer_text', coalesce(a.answer_text, ''),
        'selected_option_id', a.selected_option_id,
        'selected_option_label', sel_opt.option_label,
        'selected_option_text', sel_opt.option_text,
        'is_correct', sel_opt.is_correct,
        'correct_option_id', corr_opt.id,
        'correct_option_label', corr_opt.option_label,
        'correct_option_text', corr_opt.option_text,
        'marks', a.marks,
        'comment', a.comment
      )
      order by q.sort_order asc, q.created_at asc
    ),
    '[]'::jsonb
  ) into v_questions
  from public.exam_answers a
  join public.exam_questions q on q.id = a.question_id
  left join public.exam_question_options sel_opt on sel_opt.id = a.selected_option_id
  left join public.exam_question_options corr_opt on corr_opt.question_id = q.id and corr_opt.is_correct = true
  where a.submission_id = p_submission_id;

  return jsonb_build_object(
    'id', v_sub.id,
    'user_id', v_sub.user_id,
    'programme_id', v_sub.programme_id,
    'programme_name', v_sub.programme_name,
    'job_id', v_sub.job_id,
    'job_title', v_job_title,
    'status', v_sub.status,
    'submitted_at', v_sub.submitted_at,
    'grade', v_sub.grade,
    'score', v_sub.score,
    'instructor_comment', v_sub.instructor_comment,
    'graded_by', v_sub.graded_by,
    'graded_at', v_sub.graded_at,
    'allow_retake', coalesce(v_sub.allow_retake, false),
    'learner_name', v_sub.learner_name,
    'learner_email', v_sub.learner_email,
    'learner_avatar', v_sub.learner_avatar,
    'questions', v_questions
  );
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 10. RPC: list_exam_submissions() (INCLUDES ROLE TITLE)
-- --------------------------------------------------------------------
drop function if exists public.list_exam_submissions(uuid, text, text, int, int);

create or replace function public.list_exam_submissions(
  p_programme_id uuid default null,
  p_status text default null,
  p_search text default null,
  p_limit int default 50,
  p_offset int default 0
)
returns table (
  id uuid,
  learner_name text,
  learner_email text,
  programme_name text,
  programme_id uuid,
  role_title text,
  status text,
  submitted_at timestamptz,
  grade text,
  score numeric,
  graded_at timestamptz,
  total_count bigint
) as $$
declare
  v_caller_id uuid := auth.uid();
  v_role text;
  v_access text;
  v_caller_prog uuid;
  v_effective_prog uuid;
  v_status_clean text := lower(trim(coalesce(p_status, '')));
  v_search_clean text := lower(trim(coalesce(p_search, '')));
  v_lim int := coalesce(p_limit, 50);
  v_off int := coalesce(p_offset, 0);
begin
  if v_caller_id is null then
    raise exception 'Authentication required.';
  end if;

  select p.role, p.access_status, p.programme_id
  into v_role, v_access, v_caller_prog
  from public.profiles p
  where p.id = v_caller_id;

  if v_access is distinct from 'active'
    or v_role not in ('admin', 'instructor') then
    raise exception 'Access denied: Only active administrators or instructors can view exam submissions.';
  end if;

  if v_role = 'instructor' then
    v_effective_prog := v_caller_prog;
  else
    v_effective_prog := p_programme_id;
  end if;

  if v_lim > 100 then v_lim := 100;
  elsif v_lim < 1 then v_lim := 50;
  end if;
  if v_off < 0 then v_off := 0;
  end if;

  return query
  with filtered as (
    select
      s.id as sub_id,
      coalesce(p.full_name, 'Learner') as sub_learner_name,
      coalesce(p.email, '') as sub_learner_email,
      coalesce(pr.name, 'Programme') as sub_programme_name,
      s.programme_id as sub_programme_id,
      coalesce(j.title, p.position, 'Role not assigned') as sub_role_title,
      s.status as sub_status,
      s.submitted_at as sub_submitted_at,
      s.grade as sub_grade,
      s.score as sub_score,
      s.graded_at as sub_graded_at,
      count(*) over() as sub_total_count
    from public.exam_submissions s
    join public.profiles p on p.id = s.user_id
    left join public.programmes pr on pr.id = s.programme_id
    left join public.jobs j on j.id = s.job_id
    where s.status in ('submitted', 'graded')
      and (v_effective_prog is null or s.programme_id = v_effective_prog)
      and (
        v_status_clean is null or v_status_clean in ('', 'all')
        or (v_status_clean in ('pending', 'needs_grading', 'submitted') and s.status = 'submitted')
        or (v_status_clean = 'graded' and s.status = 'graded')
      )
      and (
        v_search_clean is null or v_search_clean = ''
        or lower(coalesce(p.full_name, '')) like '%' || v_search_clean || '%'
        or lower(coalesce(p.email, '')) like '%' || v_search_clean || '%'
        or lower(coalesce(j.title, '')) like '%' || v_search_clean || '%'
      )
  )
  select
    f.sub_id,
    f.sub_learner_name,
    f.sub_learner_email,
    f.sub_programme_name,
    f.sub_programme_id,
    f.sub_role_title,
    f.sub_status,
    f.sub_submitted_at,
    f.sub_grade,
    f.sub_score,
    f.sub_graded_at,
    f.sub_total_count
  from filtered f
  order by
    case when f.sub_status = 'submitted' then 0 else 1 end asc,
    case when f.sub_status = 'submitted' then f.sub_submitted_at end asc nulls last,
    f.sub_submitted_at desc
  limit v_lim offset v_off;
end;
$$ language plpgsql security definer set search_path = public, pg_temp;


-- --------------------------------------------------------------------
-- 11. SECURITY, RLS POLICIES & PERMISSIONS
-- --------------------------------------------------------------------
alter table public.exam_question_options enable row level security;

-- Revoke direct access on options: learners must NEVER query is_correct directly
revoke select, insert, update, delete on public.exam_question_options from anon, authenticated, public;

-- Instructors and admins can view options directly if needed
create policy "exam_question_options_staff_select" on public.exam_question_options
  for select to authenticated
  using (
    public.is_admin() or (
      public.current_role() = 'instructor'
    )
  );

-- Only admins can manage questions and options
create policy "exam_questions_admin_all" on public.exam_questions
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "exam_question_options_admin_all" on public.exam_question_options
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Function execution privileges
revoke execute on function public.get_exam_paper() from public, anon;
grant execute on function public.get_exam_paper() to authenticated;

revoke execute on function public.submit_exam(uuid, jsonb) from public, anon;
grant execute on function public.submit_exam(uuid, jsonb) to authenticated;

revoke execute on function public.grade_exam(uuid, numeric, text, jsonb) from public, anon;
grant execute on function public.grade_exam(uuid, numeric, text, jsonb) to authenticated;

revoke execute on function public.grade_exam(uuid, numeric, text) from public, anon;
grant execute on function public.grade_exam(uuid, numeric, text) to authenticated;

revoke execute on function public.get_exam_submission_detail(uuid) from public, anon;
grant execute on function public.get_exam_submission_detail(uuid) to authenticated;

revoke execute on function public.list_exam_submissions(uuid, text, text, int, int) from public, anon;
grant execute on function public.list_exam_submissions(uuid, text, text, int, int) to authenticated;

revoke execute on function public.invite_user(text, text, uuid, uuid) from public, anon;
grant execute on function public.invite_user(text, text, uuid, uuid) to authenticated;

revoke execute on function public.invite_user(text, text, uuid) from public, anon;
grant execute on function public.invite_user(text, text, uuid) to authenticated;

revoke execute on function public.update_user_access(uuid, text, uuid, uuid) from public, anon;
grant execute on function public.update_user_access(uuid, text, uuid, uuid) to authenticated;

revoke execute on function public.update_user_access(uuid, text, uuid) from public, anon;
grant execute on function public.update_user_access(uuid, text, uuid) to authenticated;


-- --------------------------------------------------------------------
-- 12. DEACTIVATE PREVIOUS NON-ROLE-BASED QUESTIONS
-- --------------------------------------------------------------------
update public.exam_questions
set is_active = false
where job_id is null;

commit;

-- Verification notice: Migration 20261116_19 applied cleanly.

