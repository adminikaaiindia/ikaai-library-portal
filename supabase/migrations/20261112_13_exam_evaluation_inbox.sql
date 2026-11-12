-- ====================================================================
-- IKAAI ACADEMY / LIBRARY - MIGRATION 20261112_13
-- WRITTEN EXAM EVALUATION INBOX, PER-QUESTION GRADING & REALTIME SYNC
--
-- Features:
--   1. Fix is_instructor_for() to include administrators
--   2. Hardened submit_exam() supporting active learners & retake rules
--   3. RPC list_exam_submissions(): secure filtered inbox for staff
--   4. RPC get_exam_submission_detail(): per-question rubrics & answers
--   5. Hardened 4-argument grade_exam() and allow_exam_retake()
--   6. Row Level Security policies on exam_submissions & exam_answers
--   7. Indexing & Supabase Realtime publication registration
-- ====================================================================
begin;
-- --------------------------------------------------------------------
-- 1. HELPER: is_instructor_for() (INCLUDE ADMINS & INSTRUCTORS)
-- --------------------------------------------------------------------
create or replace function public.is_instructor_for(target_programme_id uuid) returns boolean as $$
select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and access_status = 'active'
      and (
        role = 'admin'
        or (
          role = 'instructor'
          and programme_id = target_programme_id
        )
      )
  );
$$ language sql stable security definer
set search_path = public, pg_temp;
-- --------------------------------------------------------------------
-- 2. SERVER FUNCTION: submit_exam() (ONE PER PERSON UNLESS RETAKE ALLOWED)
-- --------------------------------------------------------------------
create or replace function public.submit_exam(p_programme_id uuid, p_answers jsonb) returns jsonb as $$
declare v_user_id uuid := auth.uid();
v_sub_id uuid;
v_existing record;
v_key text;
v_q_id uuid;
v_ans_text text;
v_user_role text;
v_user_prog uuid;
v_user_access text;
begin if v_user_id is null then raise exception 'Authentication required.';
end if;
select role,
  programme_id,
  access_status into v_user_role,
  v_user_prog,
  v_user_access
from public.profiles
where id = v_user_id;
if v_user_access is distinct
from 'active' then raise exception 'Account access is not active.';
end if;
if v_user_role in ('intern', 'learner')
and v_user_prog is not null
and p_programme_id is distinct
from v_user_prog then raise exception 'You are not authorized to submit exams for this programme.';
end if;
-- Check existing submission state
select id,
  status,
  allow_retake into v_existing
from public.exam_submissions
where user_id = v_user_id
  and programme_id = p_programme_id;
if v_existing.id is not null then if v_existing.status in ('submitted', 'graded')
and not coalesce(v_existing.allow_retake, false) then raise exception 'Exam has already been submitted for this programme. Retakes are not allowed unless permitted by an instructor.';
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
    user_id,
    programme_id,
    status,
    submitted_at,
    allow_retake,
    created_at,
    updated_at
  )
values (
    v_user_id,
    p_programme_id,
    'submitted',
    now(),
    false,
    now(),
    now()
  )
returning id into v_sub_id;
end if;
-- Upsert individual answers
if p_answers is not null
and jsonb_typeof(p_answers) = 'object' then for v_key in
select jsonb_object_keys(p_answers) loop begin v_q_id := v_key::uuid;
v_ans_text := p_answers->>v_key;
insert into public.exam_answers (submission_id, question_id, answer_text)
values (v_sub_id, v_q_id, coalesce(v_ans_text, '')) on conflict (submission_id, question_id) do
update
set answer_text = excluded.answer_text;
exception
when others then -- Continue if a key cannot be cast to UUID
end;
end loop;
end if;
return jsonb_build_object(
  'success',
  true,
  'submission_id',
  v_sub_id,
  'status',
  'submitted',
  'submitted_at',
  now()
);
end;
$$ language plpgsql security definer
set search_path = public, pg_temp;
-- --------------------------------------------------------------------
-- 3. SERVER FUNCTION: list_exam_submissions() (SECURE EVALUATION INBOX)
-- --------------------------------------------------------------------
create or replace function public.list_exam_submissions(
    p_programme_id uuid default null,
    p_status text default null,
    p_search text default null,
    p_limit int default 50,
    p_offset int default 0
  ) returns table (
    id uuid,
    learner_name text,
    learner_email text,
    programme_name text,
    programme_id uuid,
    status text,
    submitted_at timestamptz,
    grade text,
    score numeric,
    graded_at timestamptz,
    total_count bigint
  ) as $$
declare v_caller_id uuid := auth.uid();
v_role text;
v_access text;
v_caller_prog uuid;
v_effective_prog uuid;
v_status_clean text := lower(trim(coalesce(p_status, '')));
v_search_clean text := lower(trim(coalesce(p_search, '')));
v_lim int := coalesce(p_limit, 50);
v_off int := coalesce(p_offset, 0);
begin if v_caller_id is null then raise exception 'Authentication required.';
end if;
select p.role,
  p.access_status,
  p.programme_id into v_role,
  v_access,
  v_caller_prog
from public.profiles p
where p.id = v_caller_id;
if v_access is distinct
from 'active'
  or v_role not in ('admin', 'instructor') then raise exception 'Access denied: Only active administrators or instructors can view exam submissions.';
end if;
-- Instructors only get their own programme (ignore any other p_programme_id)
if v_role = 'instructor' then v_effective_prog := v_caller_prog;
else v_effective_prog := p_programme_id;
end if;
if v_lim > 100 then v_lim := 100;
elsif v_lim < 1 then v_lim := 50;
end if;
if v_off < 0 then v_off := 0;
end if;
return query with filtered as (
  select s.id as sub_id,
    coalesce(p.full_name, 'Learner') as sub_learner_name,
    coalesce(p.email, '') as sub_learner_email,
    coalesce(pr.name, 'Programme') as sub_programme_name,
    s.programme_id as sub_programme_id,
    s.status as sub_status,
    s.submitted_at as sub_submitted_at,
    s.grade as sub_grade,
    s.score as sub_score,
    s.graded_at as sub_graded_at,
    count(*) over() as sub_total_count
  from public.exam_submissions s
    join public.profiles p on p.id = s.user_id
    left join public.programmes pr on pr.id = s.programme_id
  where s.status in ('submitted', 'graded')
    and (
      v_effective_prog is null
      or s.programme_id = v_effective_prog
    )
    and (
      v_status_clean is null
      or v_status_clean in ('', 'all')
      or (
        v_status_clean in ('pending', 'needs_grading', 'submitted')
        and s.status = 'submitted'
      )
      or (
        v_status_clean = 'graded'
        and s.status = 'graded'
      )
    )
    and (
      v_search_clean is null
      or v_search_clean = ''
      or lower(coalesce(p.full_name, '')) like '%' || v_search_clean || '%'
      or lower(coalesce(p.email, '')) like '%' || v_search_clean || '%'
    )
)
select f.sub_id,
  f.sub_learner_name,
  f.sub_learner_email,
  f.sub_programme_name,
  f.sub_programme_id,
  f.sub_status,
  f.sub_submitted_at,
  f.sub_grade,
  f.sub_score,
  f.sub_graded_at,
  f.sub_total_count
from filtered f
order by case
    when f.sub_status = 'submitted' then 0
    else 1
  end asc,
  case
    when f.sub_status = 'submitted' then f.sub_submitted_at
  end asc nulls last,
  f.sub_submitted_at desc
limit v_lim offset v_off;
end;
$$ language plpgsql security definer
set search_path = public, pg_temp;
-- --------------------------------------------------------------------
-- 4. SERVER FUNCTION: get_exam_submission_detail() (QUESTIONS & ANSWERS)
-- --------------------------------------------------------------------
create or replace function public.get_exam_submission_detail(p_submission_id uuid) returns jsonb as $$
declare v_caller_id uuid := auth.uid();
v_role text;
v_access text;
v_caller_prog uuid;
v_sub record;
v_questions jsonb;
begin if v_caller_id is null then raise exception 'Authentication required.';
end if;
select p.role,
  p.access_status,
  p.programme_id into v_role,
  v_access,
  v_caller_prog
from public.profiles p
where p.id = v_caller_id;
if v_access is distinct
from 'active'
  or v_role not in ('admin', 'instructor') then raise exception 'Access denied: Only active administrators or instructors can view submission details.';
end if;
select s.*,
  p.full_name as learner_name,
  p.email as learner_email,
  p.avatar_url as learner_avatar,
  pr.name as programme_name into v_sub
from public.exam_submissions s
  join public.profiles p on p.id = s.user_id
  left join public.programmes pr on pr.id = s.programme_id
where s.id = p_submission_id;
if v_sub.id is null then raise exception 'Exam submission not found.';
end if;
if v_role = 'instructor'
and v_sub.programme_id is distinct
from v_caller_prog then raise exception 'Access denied: You are not authorized to view submissions for this programme.';
end if;
select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'question_id',
        q.id,
        'question_title',
        q.question,
        'prompt',
        q.prompt,
        'max_marks',
        q.max_marks,
        'sort_order',
        q.sort_order,
        'answer_text',
        coalesce(a.answer_text, ''),
        'marks',
        a.marks,
        'comment',
        a.comment
      )
      order by q.sort_order asc,
        q.created_at asc
    ),
    '[]'::jsonb
  ) into v_questions
from public.exam_questions q
  left join public.exam_answers a on a.question_id = q.id
  and a.submission_id = p_submission_id
where q.programme_id = v_sub.programme_id;
return jsonb_build_object(
  'id',
  v_sub.id,
  'user_id',
  v_sub.user_id,
  'programme_id',
  v_sub.programme_id,
  'programme_name',
  v_sub.programme_name,
  'status',
  v_sub.status,
  'submitted_at',
  v_sub.submitted_at,
  'grade',
  v_sub.grade,
  'score',
  v_sub.score,
  'instructor_comment',
  v_sub.instructor_comment,
  'graded_by',
  v_sub.graded_by,
  'graded_at',
  v_sub.graded_at,
  'allow_retake',
  coalesce(v_sub.allow_retake, false),
  'learner_name',
  v_sub.learner_name,
  'learner_email',
  v_sub.learner_email,
  'learner_avatar',
  v_sub.learner_avatar,
  'questions',
  v_questions
);
end;
$$ language plpgsql security definer
set search_path = public, pg_temp;
-- --------------------------------------------------------------------
-- 5. SERVER FUNCTION: grade_exam() (4-ARGUMENT SIGNATURE & VALIDATION)
-- --------------------------------------------------------------------
create or replace function public.grade_exam(
    p_submission_id uuid,
    p_overall_marks numeric,
    p_overall_comment text,
    p_answers_grades jsonb default null
  ) returns jsonb as $$
declare v_grader_id uuid := auth.uid();
v_grader_role text;
v_grader_access text;
v_grader_prog uuid;
v_sub record;
v_grade_letter text;
v_item jsonb;
v_q_id uuid;
v_marks numeric;
v_comment text;
begin if v_grader_id is null then raise exception 'Authentication required.';
end if;
select role,
  access_status,
  programme_id into v_grader_role,
  v_grader_access,
  v_grader_prog
from public.profiles
where id = v_grader_id;
if v_grader_access is distinct
from 'active'
  or v_grader_role not in ('admin', 'instructor') then raise exception 'Only active instructors or administrators can grade exams.';
end if;
if p_overall_marks is null
or p_overall_marks < 0
or p_overall_marks > 100 then raise exception 'Overall score percentage must be between 0 and 100.';
end if;
if length(coalesce(p_overall_comment, '')) > 2000 then raise exception 'Overall comment cannot exceed 2000 characters.';
end if;
select s.* into v_sub
from public.exam_submissions s
where s.id = p_submission_id;
if v_sub.id is null then raise exception 'Exam submission not found.';
end if;
if v_grader_role = 'instructor'
and v_sub.programme_id is distinct
from v_grader_prog then raise exception 'You are not authorized to grade submissions for this programme.';
end if;
-- Calculate grade letter
if p_overall_marks >= 90 then v_grade_letter := 'A (' || round(p_overall_marks)::text || '%)';
elsif p_overall_marks >= 80 then v_grade_letter := 'B (' || round(p_overall_marks)::text || '%)';
elsif p_overall_marks >= 70 then v_grade_letter := 'C (' || round(p_overall_marks)::text || '%)';
else v_grade_letter := 'Fail (' || round(p_overall_marks)::text || '%)';
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
if p_answers_grades is not null
and jsonb_typeof(p_answers_grades) = 'array' then for v_item in
select *
from jsonb_array_elements(p_answers_grades) loop v_q_id := (v_item->>'question_id')::uuid;
v_marks := case
  when v_item->>'marks' is not null
  and (v_item->>'marks') <> '' then (v_item->>'marks')::numeric
  else null
end;
v_comment := v_item->>'comment';
update public.exam_answers
set marks = v_marks,
  comment = v_comment
where submission_id = p_submission_id
  and question_id = v_q_id;
end loop;
end if;
return jsonb_build_object(
  'success',
  true,
  'submission_id',
  p_submission_id,
  'status',
  'graded',
  'score',
  p_overall_marks,
  'grade',
  v_grade_letter
);
end;
$$ language plpgsql security definer
set search_path = public, pg_temp;

-- 3-argument backwards-compatibility wrapper
create or replace function public.grade_exam(
    p_submission_id uuid,
    p_overall_marks numeric,
    p_overall_comment text
  ) returns jsonb as $$
begin
  return public.grade_exam(p_submission_id, p_overall_marks, p_overall_comment, null::jsonb);
end;
$$ language plpgsql security definer
set search_path = public, pg_temp;
-- --------------------------------------------------------------------
-- 6. SERVER FUNCTION: allow_exam_retake()
-- --------------------------------------------------------------------
create or replace function public.allow_exam_retake(p_submission_id uuid) returns jsonb as $$
declare v_caller_id uuid := auth.uid();
v_role text;
v_access text;
v_prog uuid;
v_sub record;
begin if v_caller_id is null then raise exception 'Authentication required.';
end if;
select role,
  access_status,
  programme_id into v_role,
  v_access,
  v_prog
from public.profiles
where id = v_caller_id;
if v_access is distinct
from 'active'
  or v_role not in ('admin', 'instructor') then raise exception 'Only active instructors or administrators can permit exam retakes.';
end if;
select s.* into v_sub
from public.exam_submissions s
where s.id = p_submission_id;
if v_sub.id is null then raise exception 'Exam submission not found.';
end if;
if v_role = 'instructor'
and v_sub.programme_id is distinct
from v_prog then raise exception 'You are not authorized to permit retakes for this programme.';
end if;
update public.exam_submissions
set allow_retake = true,
  updated_at = now()
where id = p_submission_id;
return jsonb_build_object(
  'success',
  true,
  'submission_id',
  p_submission_id,
  'allow_retake',
  true
);
end;
$$ language plpgsql security definer
set search_path = public, pg_temp;
-- --------------------------------------------------------------------
-- 7. SECURITY: FUNCTION PERMISSIONS
-- --------------------------------------------------------------------
revoke execute on function public.list_exam_submissions
from public,
  anon;
grant execute on function public.list_exam_submissions to authenticated;
revoke execute on function public.get_exam_submission_detail
from public,
  anon;
grant execute on function public.get_exam_submission_detail to authenticated;
revoke execute on function public.grade_exam(uuid, numeric, text, jsonb)
from public,
  anon;
grant execute on function public.grade_exam(uuid, numeric, text, jsonb) to authenticated;
revoke execute on function public.grade_exam(uuid, numeric, text)
from public,
  anon;
grant execute on function public.grade_exam(uuid, numeric, text) to authenticated;
revoke execute on function public.allow_exam_retake(uuid)
from public,
  anon;
grant execute on function public.allow_exam_retake(uuid) to authenticated;
revoke execute on function public.submit_exam(uuid, jsonb)
from public,
  anon;
grant execute on function public.submit_exam(uuid, jsonb) to authenticated;
-- --------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------
alter table public.exam_submissions enable row level security;
alter table public.exam_answers enable row level security;
-- exam_submissions policies
drop policy if exists "exam_submissions_select" on public.exam_submissions;
create policy "exam_submissions_select" on public.exam_submissions for
select to authenticated using (
    public.is_active_user()
    and (
      user_id = auth.uid()
      or public.is_admin()
      or (
        public.current_role() = 'instructor'
        and programme_id = public.current_programme_id()
      )
    )
  );
drop policy if exists "exam_submissions_insert" on public.exam_submissions;
create policy "exam_submissions_insert" on public.exam_submissions for
insert to authenticated with check (
    public.is_active_user()
    and (
      user_id = auth.uid()
      or public.is_admin()
    )
  );
drop policy if exists "exam_submissions_update" on public.exam_submissions;
create policy "exam_submissions_update" on public.exam_submissions for
update to authenticated using (
    public.is_active_user()
    and (
      public.is_admin()
      or (
        public.current_role() = 'instructor'
        and programme_id = public.current_programme_id()
      )
      or (
        user_id = auth.uid()
        and status in ('draft', 'submitted')
      )
    )
  );
-- exam_answers policies
drop policy if exists "exam_answers_select" on public.exam_answers;
create policy "exam_answers_select" on public.exam_answers for
select to authenticated using (
    public.is_active_user()
    and exists (
      select 1
      from public.exam_submissions s
      where s.id = exam_answers.submission_id
        and (
          s.user_id = auth.uid()
          or public.is_admin()
          or (
            public.current_role() = 'instructor'
            and s.programme_id = public.current_programme_id()
          )
        )
    )
  );
drop policy if exists "exam_answers_insert" on public.exam_answers;
create policy "exam_answers_insert" on public.exam_answers for
insert to authenticated with check (
    public.is_active_user()
    and exists (
      select 1
      from public.exam_submissions s
      where s.id = exam_answers.submission_id
        and (
          s.user_id = auth.uid()
          or public.is_admin()
        )
    )
  );
drop policy if exists "exam_answers_update" on public.exam_answers;
create policy "exam_answers_update" on public.exam_answers for
update to authenticated using (
    public.is_active_user()
    and exists (
      select 1
      from public.exam_submissions s
      where s.id = exam_answers.submission_id
        and (
          public.is_admin()
          or (
            public.current_role() = 'instructor'
            and s.programme_id = public.current_programme_id()
          )
          or (
            s.user_id = auth.uid()
            and s.status in ('draft', 'submitted')
          )
        )
    )
  );
-- --------------------------------------------------------------------
-- 9. PERFORMANCE INDEX & SUPABASE REALTIME PUBLICATION
-- --------------------------------------------------------------------
create index if not exists idx_exam_sub_prog_stat_subat on public.exam_submissions (programme_id, status, submitted_at desc);
do $$ begin if not exists (
  select 1
  from pg_publication_tables
  where pubname = 'supabase_realtime'
    and tablename = 'exam_submissions'
) then alter publication supabase_realtime
add table public.exam_submissions;
end if;
exception
when duplicate_object then null;
when others then null;
end $$;
commit;