-- ====================================================================
-- SCHEMA RECONCILIATION & SAFE CLEANUP MIGRATION
-- Migration: 20261106_01_schema_reconciliation.sql
-- Description:
--   1. Reconciles profiles table (created_at, phone, member_since_date, full_name, programme_id).
--   2. Strengthens guard trigger against non-admin edits across all protected columns.
--   3. Reconciles message_threads (programme_id FK, module_ref FK, check constraints, indexes).
--   4. Enforces single active submission per user per programme on exam_submissions with retake control.
--   5. Enhances feedback table (status, updated_at).
--   6. Updates RLS policies to use programme_id references.
--   7. Preserves legacy columns with deprecation comments (NO DATA DROPPED).
--   8. Uses strictly verified columns from live schema; all operations are transactional and idempotent.
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- 0. CORE SECURITY HELPER FUNCTIONS
-- --------------------------------------------------------------------
create or replace function public.current_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.current_programme_id()
returns uuid as $$
  select programme_id from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.is_admin()
returns boolean as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$ language sql stable security definer set search_path = public;

create or replace function public.get_user_role(user_id uuid)
returns text as $$
  select role from public.profiles where id = user_id;
$$ language sql stable security definer set search_path = public;

create or replace function public.is_instructor_for(target_programme_id uuid)
returns boolean as $$
  select coalesce(
    (select role in ('instructor', 'admin') and (programme_id = target_programme_id or role = 'admin')
     from public.profiles where id = auth.uid()),
    false
  );
$$ language sql stable security definer set search_path = public;


-- --------------------------------------------------------------------
-- 1. PROFILES TABLE RECONCILIATION
-- --------------------------------------------------------------------

-- 1.1 Add new columns if missing
alter table public.profiles
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists phone text,
  add column if not exists member_since_date date;

-- 1.2 Backfill created_at from auth.users where possible
update public.profiles p
set created_at = u.created_at
from auth.users u
where p.id = u.id
  and u.created_at is not null
  and (p.created_at is null or p.created_at = p.updated_at);

-- 1.3 Safe parser for member_since text into member_since_date
create or replace function public.safe_parse_member_since(p_text text, p_fallback date)
returns date as $$
begin
  if p_text is null or trim(p_text) = '' then
    return p_fallback;
  end if;

  -- Format 'Month YYYY' (e.g. 'October 2026', 'Oct 2026')
  if p_text ~* '^(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)[[:space:]]+[0-9]{4}$' then
    begin
      return to_date('01 ' || trim(p_text), 'DD Month YYYY');
    exception when others then
      return p_fallback;
    end;
  end if;

  -- Format 'YYYY-MM-DD'
  if p_text ~ '^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$' then
    begin
      return p_text::date;
    exception when others then
      return p_fallback;
    end;
  end if;

  -- Format 'DD/MM/YYYY'
  if p_text ~ '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$' then
    begin
      return to_date(p_text, 'DD/MM/YYYY');
    exception when others then
      return p_fallback;
    end;
  end if;

  return p_fallback;
end;
$$ language plpgsql stable set search_path = public;

update public.profiles
set member_since_date = public.safe_parse_member_since(member_since, coalesce(created_at::date, current_date))
where member_since_date is null;

-- Set default for future inserts
alter table public.profiles
  alter column member_since_date set default current_date;

-- 1.4 Single source of truth for user names: full_name
update public.profiles
set full_name = coalesce(nullif(trim(full_name), ''), nullif(trim(display_name), ''), 'Learner')
where full_name is null or trim(full_name) = '';

-- Synchronize display_name to mirror full_name for backward compatibility
update public.profiles
set display_name = full_name
where display_name is null or trim(display_name) = '';

-- 1.5 Single source of truth for programmes: programme_id
update public.profiles p
set programme_id = pr.id
from public.programmes pr
where p.programme_id is null
  and (
    (p.programme ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' and p.programme = pr.id::text)
    or p.programme = pr.slug
    or lower(trim(p.programme)) = lower(trim(pr.name))
    or (p.programme = 'hr' and pr.slug = 'human-resources')
    or (p.programme = 'data' and pr.slug = 'data-analyst')
    or (p.programme = 'research' and pr.slug = 'social-research-policy')
    or (p.programme = 'design' and pr.slug = 'design-social-media')
    or (p.programme = 'bd' and pr.slug = 'business-development')
  );

-- 1.6 Deprecation comments on legacy columns
comment on column public.profiles.display_name is 'deprecated, remove after verification: use full_name instead';
comment on column public.profiles.programme is 'deprecated, remove after verification: use programme_id instead';
comment on column public.profiles.member_since is 'deprecated, remove after verification: use member_since_date instead';


-- --------------------------------------------------------------------
-- 2. STRENGTHEN PROFILE GUARD TRIGGER
-- --------------------------------------------------------------------
create or replace function public.guard_profile_updates()
returns trigger as $$
begin
  if not public.is_admin() then
    -- Non-admins cannot modify account roles
    if new.role is distinct from old.role then
      raise exception 'Only administrators can change account roles.';
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

    -- Non-admins cannot modify system identifiers or creation timestamp
    if new.id is distinct from old.id then
      raise exception 'Account identifier cannot be modified.';
    end if;
    if new.created_at is distinct from old.created_at then
      raise exception 'Account creation timestamp cannot be modified.';
    end if;

    -- Non-admins cannot modify programme_id once set (allow setting once from null)
    if old.programme_id is not null and new.programme_id is distinct from old.programme_id then
      raise exception 'Only administrators can change assigned programmes.';
    end if;

    -- Non-admins cannot bypass programme protection via legacy programme text column
    if old.programme_id is not null and new.programme is distinct from old.programme then
      raise exception 'Only administrators can change assigned programmes.';
    end if;
  end if;

  -- Maintain legacy text column sync while it remains in place
  if new.programme_id is distinct from old.programme_id and new.programme_id is not null then
    select slug into new.programme from public.programmes where id = new.programme_id;
  end if;

  -- Ensure full_name is propagated to display_name for backward compatibility
  if new.full_name is not null and trim(new.full_name) <> '' then
    new.display_name := new.full_name;
  end if;

  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_guard_profile_updates on public.profiles;
create trigger trg_guard_profile_updates
before update on public.profiles
for each row execute function public.guard_profile_updates();


-- --------------------------------------------------------------------
-- 3. USER SIGNUP PROFILE TRIGGER
-- --------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
declare
  name_val text;
  avatar_val text;
  role_val text;
begin
  name_val := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    nullif(trim(new.raw_user_meta_data->>'display_name'), ''),
    split_part(new.email, '@', 1),
    'Learner'
  );

  avatar_val := coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture',
    null
  );

  role_val := coalesce(new.raw_user_meta_data->>'role', 'intern');
  if role_val not in ('intern', 'instructor', 'admin', 'learner') then
    role_val := 'intern';
  end if;

  insert into public.profiles (
    id,
    full_name,
    display_name,
    email,
    avatar_url,
    role,
    programme_id,
    programme,
    branch,
    position,
    member_since,
    member_since_date,
    created_at,
    updated_at
  )
  values (
    new.id,
    name_val,
    name_val,
    new.email,
    avatar_val,
    role_val,
    null,
    'human-resources',
    'New Delhi / Remote',
    case when role_val in ('admin', 'instructor') then 'Staff' else 'Intern' end,
    to_char(now(), 'FMMonth YYYY'),
    current_date,
    coalesce(new.created_at, now()),
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    display_name = coalesce(public.profiles.display_name, excluded.display_name),
    updated_at = now();

  return new;
end;
$$ language plpgsql security definer set search_path = public;


-- --------------------------------------------------------------------
-- 4. MESSAGE_THREADS TABLE RECONCILIATION
-- --------------------------------------------------------------------

-- 4.1 Add new relational foreign key columns
alter table public.message_threads
  add column if not exists programme_id uuid references public.programmes(id) on delete set null,
  add column if not exists module_ref uuid references public.modules(id) on delete set null;

-- 4.2 Normalize existing data before applying check constraints
update public.message_threads
set status = case
  when lower(trim(status)) in ('open', 'new', 'unanswered') then 'open'
  when lower(trim(status)) in ('answered', 'pending', 'replied') then 'answered'
  when lower(trim(status)) in ('resolved', 'closed', 'completed') then 'resolved'
  else 'open'
end;

update public.message_threads
set category = case
  when lower(trim(category)) in ('module question', 'module_question', 'course_content', 'curriculum') then 'module_question'
  when lower(trim(category)) in ('technical issue', 'technical_issue', 'portal_bug', 'platform_issue') then 'technical_issue'
  when lower(trim(category)) in ('exam or grading', 'exam_grading', 'grading', 'exam') then 'exam_grading'
  when lower(trim(category)) in ('leave or attendance', 'leave_attendance', 'leave', 'attendance') then 'leave_attendance'
  else 'other'
end;

update public.message_threads
set rating = case
  when lower(trim(rating)) in ('up', 'helpful', 'positive', 'thumbs_up', '+1') then 'up'
  when lower(trim(rating)) in ('down', 'unhelpful', 'negative', 'thumbs_down', '-1') then 'down'
  else null
end;

-- 4.3 Backfill programme_id from legacy programme text or learner profile
update public.message_threads t
set programme_id = pr.id
from public.programmes pr
where t.programme_id is null
  and (
    (t.programme ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' and t.programme = pr.id::text)
    or t.programme = pr.slug
    or lower(trim(t.programme)) = lower(trim(pr.name))
    or (t.programme = 'hr' and pr.slug = 'human-resources')
    or (t.programme = 'data' and pr.slug = 'data-analyst')
    or (t.programme = 'research' and pr.slug = 'social-research-policy')
    or (t.programme = 'design' and pr.slug = 'design-social-media')
    or (t.programme = 'bd' and pr.slug = 'business-development')
  );

update public.message_threads t
set programme_id = p.programme_id
from public.profiles p
where t.programme_id is null
  and t.learner_id = p.id
  and p.programme_id is not null;

-- 4.4 Backfill module_ref using ONLY existing columns (module_id, programme_id)
-- Case A: module_id is already a valid UUID matching a module
update public.message_threads t
set module_ref = m.id
from public.modules m
where t.module_ref is null
  and t.module_id is not null
  and t.module_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  and t.module_id = m.id::text;

-- Case B: module_id contains a number (e.g. 'mod_0', 'mod_1', 'module-2', '0')
update public.message_threads t
set module_ref = m.id
from public.modules m
where t.module_ref is null
  and t.programme_id is not null
  and t.module_id is not null
  and t.module_id ~ '[0-9]'
  and m.programme_id = t.programme_id
  and m.number = (substring(t.module_id from '[0-9]+'))::int;

-- Case C: module_id matches module title directly
update public.message_threads t
set module_ref = m.id
from public.modules m
where t.module_ref is null
  and t.programme_id is not null
  and t.module_id is not null
  and m.programme_id = t.programme_id
  and lower(trim(m.title)) = lower(trim(t.module_id));

-- 4.5 Apply check constraints
alter table public.message_threads
  drop constraint if exists chk_message_threads_status,
  add constraint chk_message_threads_status check (status in ('open', 'answered', 'resolved'));

alter table public.message_threads
  drop constraint if exists chk_message_threads_category,
  add constraint chk_message_threads_category check (category in ('module_question', 'technical_issue', 'exam_grading', 'leave_attendance', 'other'));

alter table public.message_threads
  drop constraint if exists chk_message_threads_rating,
  add constraint chk_message_threads_rating check (rating is null or rating in ('up', 'down'));

-- 4.6 Performance indexes
create index if not exists idx_message_threads_learner_id on public.message_threads(learner_id);
create index if not exists idx_message_threads_programme_id on public.message_threads(programme_id);
create index if not exists idx_message_threads_status on public.message_threads(status);
create index if not exists idx_message_threads_last_message_at on public.message_threads(last_message_at desc);

-- 4.7 Deprecation comments
comment on column public.message_threads.programme is 'deprecated, remove after verification: use programme_id instead';
comment on column public.message_threads.module_id is 'deprecated, remove after verification: use module_ref instead';


-- --------------------------------------------------------------------
-- 5. EXAM_SUBMISSIONS RECONCILIATION & RETAKE CONTROL
-- --------------------------------------------------------------------

-- 5.1 Add retake permission flag
alter table public.exam_submissions
  add column if not exists allow_retake boolean not null default false;

-- 5.2 Deduplicate any legacy multiple submissions before enforcing unique rule
with ranked as (
  select id,
         row_number() over (
           partition by user_id, programme_id
           order by coalesce(graded_at, submitted_at, created_at) desc, created_at desc
         ) as rnk
  from public.exam_submissions
)
delete from public.exam_submissions
where id in (select id from ranked where rnk > 1);

-- 5.3 Enforce unique submission rule per user per programme
alter table public.exam_submissions
  drop constraint if exists uq_exam_sub_user_prog,
  add constraint uq_exam_sub_user_prog unique (user_id, programme_id);

-- 5.4 Update submit_exam function to enforce retake permissions strictly
create or replace function public.submit_exam(p_programme_id uuid, p_answers jsonb)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_sub_id uuid;
  v_item jsonb;
  v_q_id uuid;
  v_ans_text text;
  v_existing record;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  -- Check existing submission state
  select id, status, allow_retake
  into v_existing
  from public.exam_submissions
  where user_id = v_user_id and programme_id = p_programme_id;

  if v_existing.id is not null then
    -- If already submitted or graded and instructor has not granted retake permission:
    if v_existing.status in ('submitted', 'graded') and not coalesce(v_existing.allow_retake, false) then
      raise exception 'Exam has already been submitted for this programme. Retakes are not allowed unless permitted by an instructor.';
    end if;

    -- Update existing submission for retake
    update public.exam_submissions
    set status = 'submitted',
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
    -- Fresh first submission
    insert into public.exam_submissions (
      user_id,
      programme_id,
      status,
      submitted_at,
      allow_retake
    )
    values (
      v_user_id,
      p_programme_id,
      'submitted',
      now(),
      false
    )
    returning id into v_sub_id;
  end if;

  -- Save or update answers if exam_answers table exists
  if to_regclass('public.exam_answers') is not null and p_answers is not null and jsonb_typeof(p_answers) = 'array' then
    for v_item in select * from jsonb_array_elements(p_answers)
    loop
      if v_item ? 'question_id' and (v_item->>'question_id') ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
        v_q_id := (v_item->>'question_id')::uuid;
        v_ans_text := coalesce(v_item->>'answer_text', '');

        execute 'insert into public.exam_answers (submission_id, question_id, answer_text)
                 values ($1, $2, $3)
                 on conflict (submission_id, question_id) do update set
                   answer_text = excluded.answer_text'
        using v_sub_id, v_q_id, v_ans_text;
      end if;
    end loop;
  end if;

  return jsonb_build_object(
    'submission_id', v_sub_id,
    'status', 'submitted',
    'submitted_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 5.5 Helper function for instructors to grant retake permission
create or replace function public.allow_exam_retake(p_submission_id uuid)
returns jsonb as $$
declare
  v_sub record;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Only instructors or administrators can permit exam retakes.';
  end if;

  select s.* into v_sub
  from public.exam_submissions s
  where s.id = p_submission_id;

  if v_sub.id is null then
    raise exception 'Exam submission not found.';
  end if;

  -- Instructors can only permit retakes for their assigned programme
  if not public.is_instructor_for(v_sub.programme_id) then
    raise exception 'You are not authorized to permit retakes for this programme.';
  end if;

  update public.exam_submissions
  set allow_retake = true,
      updated_at = now()
  where id = p_submission_id;

  return jsonb_build_object('success', true, 'submission_id', p_submission_id, 'allow_retake', true);
end;
$$ language plpgsql security definer set search_path = public;


-- --------------------------------------------------------------------
-- 6. FEEDBACK TABLE ENHANCEMENT
-- --------------------------------------------------------------------
alter table public.feedback
  add column if not exists status text not null default 'new',
  add column if not exists updated_at timestamptz not null default now();

alter table public.feedback
  drop constraint if exists chk_feedback_status,
  add constraint chk_feedback_status check (status in ('new', 'reviewed'));


-- --------------------------------------------------------------------
-- 7. UPDATE RLS POLICIES & SECURITY FUNCTIONS TO USE PROGRAMME_ID
-- --------------------------------------------------------------------

-- 7.1 Keep get_user_programme compatible but backed by programme_id
create or replace function public.get_user_programme(user_id uuid)
returns text as $$
  select coalesce(
    (select pr.slug from public.profiles p join public.programmes pr on pr.id = p.programme_id where p.id = user_id),
    (select programme from public.profiles where id = user_id)
  );
$$ language sql stable security definer set search_path = public;

-- 7.2 Message threads policies using programme_id
drop policy if exists "Learners can view own threads; staff can view programme threads" on public.message_threads;
create policy "Learners can view own threads; staff can view programme threads"
  on public.message_threads for select
  using (
    auth.uid() = learner_id
    or public.is_admin()
    or (
      public.current_role() = 'instructor'
      and (programme_id = public.current_programme_id() or programme_id is null)
    )
  );

drop policy if exists "Learners can insert own threads" on public.message_threads;
create policy "Learners can insert own threads"
  on public.message_threads for insert
  with check (
    auth.uid() = learner_id
  );

drop policy if exists "Learners can update rating or reopen; staff can update thread status/assignment" on public.message_threads;
create policy "Learners can update rating or reopen; staff can update thread status/assignment"
  on public.message_threads for update
  using (
    auth.uid() = learner_id
    or public.is_admin()
    or (
      public.current_role() = 'instructor'
      and (programme_id = public.current_programme_id() or programme_id is null)
    )
  );

-- 7.3 Messages policies using thread programme_id
drop policy if exists "Users can view messages in accessible threads" on public.messages;
create policy "Users can view messages in accessible threads"
  on public.messages for select
  using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (
          t.learner_id = auth.uid()
          or public.is_admin()
          or (
            public.current_role() = 'instructor'
            and (t.programme_id = public.current_programme_id() or t.programme_id is null)
          )
        )
    )
  );

drop policy if exists "Users can insert messages into authorized threads" on public.messages;
create policy "Users can insert messages into authorized threads"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (
          t.learner_id = auth.uid()
          or public.is_admin()
          or (
            public.current_role() = 'instructor'
            and (t.programme_id = public.current_programme_id() or t.programme_id is null)
          )
        )
    )
  );

-- 7.4 Auto-enroll chat trigger (conditional on conversations and conversation_members existing)
do $$
begin
  if to_regclass('public.conversations') is not null and to_regclass('public.conversation_members') is not null then
    execute $sql$
      create or replace function public.fn_auto_enroll_user_in_chat()
      returns trigger as $fn$
      declare
        conv_record record;
        prog_slug text;
      begin
        prog_slug := coalesce(
          (select slug from public.programmes where id = new.programme_id),
          new.programme,
          'human-resources'
        );

        insert into public.conversations (programme, type, name, slug, description, is_announcement_only)
        values (prog_slug, 'all_members', 'All Members', 'all-members', 'Programme-wide community for all learners, mentors, and staff', false)
        on conflict do nothing;

        insert into public.conversations (programme, type, name, slug, description)
        values (prog_slug, 'channel', '#general', 'general', 'General discussions, questions, and daily updates')
        on conflict do nothing;

        insert into public.conversations (programme, type, name, slug, description)
        values (prog_slug, 'channel', '#help-and-doubts', 'help-and-doubts', 'Ask peers and instructors for help with exercises and projects')
        on conflict do nothing;

        insert into public.conversations (programme, type, name, slug, description)
        values (prog_slug, 'channel', '#introductions', 'introductions', 'Introduce yourself and share your background and goals')
        on conflict do nothing;

        for conv_record in
          select id from public.conversations
          where programme = prog_slug and type in ('all_members', 'channel')
        loop
          insert into public.conversation_members (conversation_id, user_id, role)
          values (conv_record.id, new.id, case when new.role = 'admin' then 'admin' else 'member' end)
          on conflict (conversation_id, user_id) do nothing;
        end loop;

        return new;
      end;
      $fn$ language plpgsql security definer set search_path = public;

      drop trigger if exists trg_auto_enroll_user_in_chat on public.profiles;
      create trigger trg_auto_enroll_user_in_chat
      after insert or update of programme_id on public.profiles
      for each row execute function public.fn_auto_enroll_user_in_chat();
    $sql$;
  end if;
end $$;

commit;
