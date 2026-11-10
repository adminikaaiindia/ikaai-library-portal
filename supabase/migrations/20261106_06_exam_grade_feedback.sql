-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — DATABASE MIGRATION 20261106_06
-- WRITTEN EXAM, GRADE REPORT & FEEDBACK COMPLETE INTEGRATION
--
-- Single numbered migration file safe to re-run.
-- Data storage rule compliant: no data dropped, no secrets stored.
--
-- Features:
--   1. Adds 'draft' to exam_submissions.status check constraint.
--   2. Adds is_anonymous boolean to public.feedback.
--   3. RPC save_exam_draft(): stores in-progress answers in database.
--   4. RPC submit_exam(): enforces one active submission & retake rules.
--   5. RPC grade_exam(): supports grading per question, marks & comments.
--   6. RPC allow_exam_retake(): grants retakes (instructors & admins).
--   7. RPC submit_feedback(): enforces 10-1000 char & 5/day rate limit.
--   8. RPC mark_feedback_reviewed(): marks feedback reviewed by staff.
--   9. RPC get_cohort_grade_roster(): learner cohort table & CSV data.
--   10. Hardened RLS policies across exam, quiz attempts & feedback tables.
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- 1. ENHANCE EXAM_SUBMISSIONS (ALLOW 'draft' STATUS)
-- --------------------------------------------------------------------
do $$
declare
  r record;
begin
  for r in (
    select conname
    from pg_constraint
    where conrelid = 'public.exam_submissions'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%status%'
  ) loop
    execute format('alter table public.exam_submissions drop constraint %I', r.conname);
  end loop;
end $$;

alter table public.exam_submissions
  add constraint chk_exam_submissions_status
  check (status in ('draft', 'not_submitted', 'submitted', 'graded'));

create index if not exists idx_exam_sub_user_prog_status
  on public.exam_submissions (user_id, programme_id, status);

create index if not exists idx_exam_sub_programme_status
  on public.exam_submissions (programme_id, status);

-- --------------------------------------------------------------------
-- 2. ENHANCE FEEDBACK TABLE (ANONYMOUS OPTION)
-- --------------------------------------------------------------------
alter table public.feedback
  add column if not exists is_anonymous boolean not null default false;

create index if not exists idx_feedback_programme_status
  on public.feedback (programme_id, status);

create index if not exists idx_feedback_user_created
  on public.feedback (user_id, created_at);

-- --------------------------------------------------------------------
-- 3. SERVER FUNCTION: save_exam_draft()
-- --------------------------------------------------------------------
create or replace function public.save_exam_draft(p_programme_id uuid, p_answers jsonb)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_sub_id uuid;
  v_existing record;
  v_q_id uuid;
  v_ans_text text;
  v_key text;
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  if public.current_role() = 'intern' and p_programme_id is distinct from public.current_programme_id() then
    raise exception 'You are not enrolled in this programme.';
  end if;

  -- Check existing submission state
  select id, status, allow_retake
  into v_existing
  from public.exam_submissions
  where user_id = v_user_id and programme_id = p_programme_id;

  if v_existing.id is not null then
    if v_existing.status in ('submitted', 'graded') and not coalesce(v_existing.allow_retake, false) then
      raise exception 'Exam has already been submitted and cannot be edited as draft.';
    end if;

    update public.exam_submissions
    set status = 'draft',
        updated_at = now()
    where id = v_existing.id
    returning id into v_sub_id;
  else
    insert into public.exam_submissions (user_id, programme_id, status, created_at, updated_at)
    values (v_user_id, p_programme_id, 'draft', now(), now())
    returning id into v_sub_id;
  end if;

  -- Upsert answers into exam_answers
  if p_answers is not null and jsonb_typeof(p_answers) = 'object' then
    for v_key in select jsonb_object_keys(p_answers) loop
      v_q_id := v_key::uuid;
      v_ans_text := p_answers->>v_key;

      insert into public.exam_answers (submission_id, question_id, answer_text)
      values (v_sub_id, v_q_id, coalesce(v_ans_text, ''))
      on conflict (submission_id, question_id) do update
      set answer_text = excluded.answer_text;
    end loop;
  end if;

  return jsonb_build_object(
    'success', true,
    'submission_id', v_sub_id,
    'status', 'draft',
    'saved_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 4. SERVER FUNCTION: submit_exam() (ENHANCED)
-- --------------------------------------------------------------------
create or replace function public.submit_exam(p_programme_id uuid, p_answers jsonb)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_sub_id uuid;
  v_existing record;
  v_key text;
  v_q_id uuid;
  v_ans_text text;
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  if public.current_role() = 'intern' and p_programme_id is distinct from public.current_programme_id() then
    raise exception 'You are not authorized to submit exams for this programme.';
  end if;

  -- Check existing submission state
  select id, status, allow_retake
  into v_existing
  from public.exam_submissions
  where user_id = v_user_id and programme_id = p_programme_id;

  if v_existing.id is not null then
    if v_existing.status in ('submitted', 'graded') and not coalesce(v_existing.allow_retake, false) then
      raise exception 'Exam has already been submitted for this programme. Retakes are not allowed unless permitted by an instructor.';
    end if;

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
    insert into public.exam_submissions (
      user_id, programme_id, status, submitted_at, allow_retake, created_at, updated_at
    ) values (
      v_user_id, p_programme_id, 'submitted', now(), false, now(), now()
    )
    returning id into v_sub_id;
  end if;

  -- Upsert answers
  if p_answers is not null and jsonb_typeof(p_answers) = 'object' then
    for v_key in select jsonb_object_keys(p_answers) loop
      v_q_id := v_key::uuid;
      v_ans_text := p_answers->>v_key;

      insert into public.exam_answers (submission_id, question_id, answer_text)
      values (v_sub_id, v_q_id, coalesce(v_ans_text, ''))
      on conflict (submission_id, question_id) do update
      set answer_text = excluded.answer_text;
    end loop;
  end if;

  return jsonb_build_object(
    'success', true,
    'submission_id', v_sub_id,
    'status', 'submitted',
    'submitted_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 5. SERVER FUNCTION: grade_exam() (PER-QUESTION MARKS & AUTHORIZATION)
-- --------------------------------------------------------------------
create or replace function public.grade_exam(
  p_submission_id uuid,
  p_overall_marks numeric,
  p_overall_comment text,
  p_answers_grades jsonb default null
)
returns jsonb as $$
declare
  v_grader_id uuid := auth.uid();
  v_sub record;
  v_grade_letter text;
  v_item jsonb;
  v_q_id uuid;
  v_marks numeric;
  v_comment text;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Only instructors or administrators can grade exams.';
  end if;

  select s.* into v_sub
  from public.exam_submissions s
  where s.id = p_submission_id;

  if v_sub.id is null then
    raise exception 'Exam submission not found.';
  end if;

  if not public.is_instructor_for(v_sub.programme_id) then
    raise exception 'You are not authorized to grade submissions for this programme.';
  end if;

  -- Calculate grade letter
  if p_overall_marks >= 90 then
    v_grade_letter := 'A (' || round(p_overall_marks)::text || '%)';
  elsif p_overall_marks >= 80 then
    v_grade_letter := 'B (' || round(p_overall_marks)::text || '%)';
  elsif p_overall_marks >= 70 then
    v_grade_letter := 'C (' || round(p_overall_marks)::text || '%)';
  else
    v_grade_letter := 'Fail (' || round(p_overall_marks)::text || '%)';
  end if;

  -- Update submission master record
  update public.exam_submissions
  set status = 'graded',
      score = p_overall_marks,
      grade = v_grade_letter,
      instructor_comment = p_overall_comment,
      graded_by = v_grader_id,
      graded_at = now(),
      updated_at = now()
  where id = p_submission_id;

  -- Update individual answer grades if provided
  if p_answers_grades is not null and jsonb_typeof(p_answers_grades) = 'array' then
    for v_item in select * from jsonb_array_elements(p_answers_grades) loop
      v_q_id := (v_item->>'question_id')::uuid;
      v_marks := (v_item->>'marks')::numeric;
      v_comment := v_item->>'comment';

      update public.exam_answers
      set marks = v_marks,
          comment = v_comment
      where submission_id = p_submission_id and question_id = v_q_id;
    end loop;
  end if;

  return jsonb_build_object(
    'success', true,
    'submission_id', p_submission_id,
    'status', 'graded',
    'score', p_overall_marks,
    'grade', v_grade_letter
  );
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 6. SERVER FUNCTION: allow_exam_retake()
-- --------------------------------------------------------------------
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

  if not public.is_instructor_for(v_sub.programme_id) then
    raise exception 'You are not authorized to permit retakes for this programme.';
  end if;

  update public.exam_submissions
  set allow_retake = true,
      updated_at = now()
  where id = p_submission_id;

  return jsonb_build_object(
    'success', true,
    'submission_id', p_submission_id,
    'allow_retake', true
  );
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 7. SERVER FUNCTION: submit_feedback() (RATE-LIMITED & ANONYMOUS OPTION)
-- --------------------------------------------------------------------
create or replace function public.submit_feedback(
  p_programme_id uuid,
  p_module_id uuid,
  p_topic text,
  p_message text,
  p_is_anonymous boolean default false
)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_trimmed text;
  v_daily_count int;
  v_fb_id uuid;
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  v_trimmed := trim(coalesce(p_message, ''));
  if length(v_trimmed) < 10 or length(v_trimmed) > 1000 then
    raise exception 'Feedback message must be between 10 and 1000 characters.';
  end if;

  if coalesce(trim(p_topic), '') = '' then
    raise exception 'Please specify a feedback topic.';
  end if;

  -- Rate limit: At most 5 feedback entries per learner per calendar day
  select count(*) into v_daily_count
  from public.feedback
  where user_id = v_user_id
    and created_at >= date_trunc('day', now());

  if v_daily_count >= 5 then
    raise exception 'Daily limit reached: You can submit at most 5 feedback entries per day.';
  end if;

  insert into public.feedback (
    user_id, programme_id, module_id, topic, message, is_anonymous, status, created_at, updated_at
  ) values (
    v_user_id, p_programme_id, p_module_id, trim(p_topic), v_trimmed, coalesce(p_is_anonymous, false), 'new', now(), now()
  )
  returning id into v_fb_id;

  return jsonb_build_object(
    'success', true,
    'feedback_id', v_fb_id,
    'status', 'new',
    'created_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 8. SERVER FUNCTION: mark_feedback_reviewed()
-- --------------------------------------------------------------------
create or replace function public.mark_feedback_reviewed(p_feedback_id uuid)
returns jsonb as $$
declare
  v_fb record;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Only instructors or administrators can review feedback.';
  end if;

  select f.* into v_fb
  from public.feedback f
  where f.id = p_feedback_id;

  if v_fb.id is null then
    raise exception 'Feedback record not found.';
  end if;

  if not public.is_instructor_for(v_fb.programme_id) then
    raise exception 'You are not authorized to review feedback for this programme.';
  end if;

  update public.feedback
  set status = 'reviewed',
      updated_at = now()
  where id = p_feedback_id;

  return jsonb_build_object(
    'success', true,
    'feedback_id', p_feedback_id,
    'status', 'reviewed'
  );
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 9. SERVER FUNCTION: get_cohort_grade_roster()
-- --------------------------------------------------------------------
create or replace function public.get_cohort_grade_roster(p_programme_id uuid default null)
returns table (
  user_id uuid,
  full_name text,
  email text,
  avatar_url text,
  programme_id uuid,
  programme_name text,
  total_modules bigint,
  completed_modules bigint,
  completion_percentage numeric,
  quiz_average numeric,
  exam_status text,
  exam_grade text,
  exam_score numeric,
  submission_id uuid,
  allow_retake boolean
) as $$
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Only instructors or administrators can access the cohort grade roster.';
  end if;

  -- Instructors can only query their own assigned programme
  if public.current_role() = 'instructor' then
    p_programme_id := public.current_programme_id();
  end if;

  return query
  with user_cohort as (
    select
      p.id as u_id,
      p.full_name as u_name,
      p.email as u_email,
      p.avatar_url as u_avatar,
      p.programme_id as u_prog_id,
      pr.name as u_prog_name
    from public.profiles p
    left join public.programmes pr on pr.id = p.programme_id
    where p.access_status = 'active'
      and p.role in ('intern', 'learner')
      and (p_programme_id is null or p.programme_id = p_programme_id)
  ),
  cohort_mods as (
    select
      m.programme_id,
      count(m.id) as mod_count
    from public.modules m
    group by m.programme_id
  ),
  user_completed as (
    select
      mp.user_id,
      count(mp.module_id) as comp_count
    from public.module_progress mp
    where mp.completed_at is not null
    group by mp.user_id
  ),
  user_quizzes as (
    select
      qa.user_id,
      round(avg((qa.score / nullif(qa.total, 0)) * 100), 1) as avg_score
    from public.quiz_attempts qa
    group by qa.user_id
  ),
  user_exams as (
    select
      es.user_id,
      es.id as sub_id,
      es.status as sub_status,
      es.grade as sub_grade,
      es.score as sub_score,
      es.allow_retake as sub_retake
    from public.exam_submissions es
  )
  select
    uc.u_id as user_id,
    coalesce(uc.u_name, 'Learner') as full_name,
    uc.u_email as email,
    uc.u_avatar as avatar_url,
    uc.u_prog_id as programme_id,
    coalesce(uc.u_prog_name, 'Unassigned') as programme_name,
    coalesce(cm.mod_count, 0) as total_modules,
    coalesce(uco.comp_count, 0) as completed_modules,
    case
      when coalesce(cm.mod_count, 0) = 0 then 0
      else round((coalesce(uco.comp_count, 0)::numeric / cm.mod_count::numeric) * 100, 1)
    end as completion_percentage,
    uq.avg_score as quiz_average,
    coalesce(ue.sub_status, 'not_submitted') as exam_status,
    ue.sub_grade as exam_grade,
    ue.sub_score as exam_score,
    ue.sub_id as submission_id,
    coalesce(ue.sub_retake, false) as allow_retake
  from user_cohort uc
  left join cohort_mods cm on cm.programme_id = uc.u_prog_id
  left join user_completed uco on uco.user_id = uc.u_id
  left join user_quizzes uq on uq.user_id = uc.u_id
  left join user_exams ue on ue.user_id = uc.u_id
  order by uc.u_name asc;
end;
$$ language plpgsql security definer stable set search_path = public;

-- --------------------------------------------------------------------
-- 10. REFRESH RLS POLICIES ACROSS EXAM, QUIZ & FEEDBACK TABLES
-- --------------------------------------------------------------------

-- Exam Questions: All active users can read questions
alter table public.exam_questions enable row level security;
drop policy if exists "exam_questions_select_active" on public.exam_questions;
create policy "exam_questions_select_active" on public.exam_questions
for select to authenticated
using (public.is_active_user());

-- Exam Submissions: Active users only
alter table public.exam_submissions enable row level security;
drop policy if exists "exam_submissions_select" on public.exam_submissions;
create policy "exam_submissions_select" on public.exam_submissions
for select to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or (public.current_role() = 'instructor' and programme_id = public.current_programme_id())
    or public.is_admin()
  )
);

drop policy if exists "exam_submissions_insert" on public.exam_submissions;
create policy "exam_submissions_insert" on public.exam_submissions
for insert to authenticated
with check (
  public.is_active_user()
  and user_id = auth.uid()
);

drop policy if exists "exam_submissions_update" on public.exam_submissions;
create policy "exam_submissions_update" on public.exam_submissions
for update to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or (public.current_role() = 'instructor' and programme_id = public.current_programme_id())
    or public.is_admin()
  )
);

-- Exam Answers: Active users only
alter table public.exam_answers enable row level security;
drop policy if exists "exam_answers_select" on public.exam_answers;
create policy "exam_answers_select" on public.exam_answers
for select to authenticated
using (
  public.is_active_user()
  and exists (
    select 1 from public.exam_submissions s
    where s.id = exam_answers.submission_id
      and (
        s.user_id = auth.uid()
        or (public.current_role() = 'instructor' and s.programme_id = public.current_programme_id())
        or public.is_admin()
      )
  )
);

drop policy if exists "exam_answers_insert" on public.exam_answers;
create policy "exam_answers_insert" on public.exam_answers
for insert to authenticated
with check (
  public.is_active_user()
  and exists (
    select 1 from public.exam_submissions s
    where s.id = exam_answers.submission_id
      and s.user_id = auth.uid()
  )
);

drop policy if exists "exam_answers_update" on public.exam_answers;
create policy "exam_answers_update" on public.exam_answers
for update to authenticated
using (
  public.is_active_user()
  and exists (
    select 1 from public.exam_submissions s
    where s.id = exam_answers.submission_id
      and (
        s.user_id = auth.uid()
        or (public.current_role() = 'instructor' and s.programme_id = public.current_programme_id())
        or public.is_admin()
      )
  )
);

-- Feedback: Active users only
alter table public.feedback enable row level security;
drop policy if exists "feedback_select" on public.feedback;
create policy "feedback_select" on public.feedback
for select to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or (public.current_role() = 'instructor' and programme_id = public.current_programme_id())
    or public.is_admin()
  )
);

drop policy if exists "feedback_insert" on public.feedback;
create policy "feedback_insert" on public.feedback
for insert to authenticated
with check (
  public.is_active_user()
  and user_id = auth.uid()
);

drop policy if exists "feedback_update" on public.feedback;
create policy "feedback_update" on public.feedback
for update to authenticated
using (
  public.is_active_user()
  and (
    (public.current_role() = 'instructor' and programme_id = public.current_programme_id())
    or public.is_admin()
  )
);

-- Quiz Attempts: Active users only
alter table public.quiz_attempts enable row level security;
drop policy if exists "quiz_attempts_select" on public.quiz_attempts;
create policy "quiz_attempts_select" on public.quiz_attempts
for select to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or (
      public.current_role() = 'instructor'
      and exists (
        select 1 from public.quizzes q
        join public.modules m on m.id = q.module_id
        where q.id = quiz_attempts.quiz_id
          and m.programme_id = public.current_programme_id()
      )
    )
    or public.is_admin()
  )
);

commit;

