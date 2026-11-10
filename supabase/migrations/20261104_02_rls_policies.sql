-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — STAGE 1 ROW LEVEL SECURITY (RLS)
-- Migration: 20261104_02_rls_policies.sql
-- ====================================================================

-- 1. SECURITY DEFINER HELPER FUNCTIONS (with fixed search_path)
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

create or replace function public.is_instructor_for(target_programme_id uuid)
returns boolean as $$
  select coalesce(
    (select role in ('instructor', 'admin') and (programme_id = target_programme_id or role = 'admin')
     from public.profiles where id = auth.uid()),
    false
  );
$$ language sql stable security definer set search_path = public;

-- 2. ENABLE RLS ON ALL TABLES
alter table public.programmes enable row level security;
alter table public.modules enable row level security;
alter table public.resources enable row level security;
alter table public.faqs enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_options enable row level security;
alter table public.exam_questions enable row level security;
alter table public.jobs enable row level security;
alter table public.profiles enable row level security;
alter table public.resource_completions enable row level security;
alter table public.module_progress enable row level security;
alter table public.faq_reads enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.exam_submissions enable row level security;
alter table public.exam_answers enable row level security;
alter table public.feedback enable row level security;

-- 3. PROFILES POLICIES
-- A. Select: user can read own profile; instructors can read learners in their programme; admins can read all
create policy "profiles_select_policy" on public.profiles
for select using (
  auth.uid() = id
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and (programme_id = public.current_programme_id() or programme_id is null)
  )
);

-- B. Update: users can update own profile (trigger prevents updating role or programme_id)
create policy "profiles_update_policy" on public.profiles
for update using (
  auth.uid() = id or public.is_admin()
) with check (
  auth.uid() = id or public.is_admin()
);

-- Trigger to guard against non-admins changing their role or programme_id
create or replace function public.guard_profile_updates()
returns trigger as $$
begin
  if not public.is_admin() then
    -- Forbid changing role or programme_id unless initially setting programme_id from null
    if new.role <> old.role then
      raise exception 'Only administrators can change account roles.';
    end if;
    if old.programme_id is not null and new.programme_id <> old.programme_id then
      raise exception 'Only administrators can change assigned programmes.';
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_guard_profile_updates on public.profiles;
create trigger trg_guard_profile_updates
before update on public.profiles
for each row execute function public.guard_profile_updates();

-- 4. PROGRAMMES POLICIES
-- Read: Interns & instructors can read their assigned programme; admins can read all.
-- Users with no programme_id assigned yet can read all programmes to select their initial one.
create policy "programmes_select_policy" on public.programmes
for select using (
  public.is_admin()
  or public.current_programme_id() is null
  or id = public.current_programme_id()
);

create policy "programmes_admin_write" on public.programmes
for all using (public.is_admin()) with check (public.is_admin());

-- 5. MODULES POLICIES
create policy "modules_select_policy" on public.modules
for select using (
  public.is_admin()
  or programme_id = public.current_programme_id()
);

create policy "modules_admin_write" on public.modules
for all using (public.is_admin()) with check (public.is_admin());

-- 6. RESOURCES POLICIES
create policy "resources_select_policy" on public.resources
for select using (
  public.is_admin()
  or module_id in (select id from public.modules where programme_id = public.current_programme_id())
);

create policy "resources_admin_write" on public.resources
for all using (public.is_admin()) with check (public.is_admin());

-- 7. FAQS POLICIES
create policy "faqs_select_policy" on public.faqs
for select using (
  public.is_admin()
  or module_id in (select id from public.modules where programme_id = public.current_programme_id())
);

create policy "faqs_admin_write" on public.faqs
for all using (public.is_admin()) with check (public.is_admin());

-- 8. QUIZZES POLICIES
create policy "quizzes_select_policy" on public.quizzes
for select using (
  public.is_admin()
  or module_id in (select id from public.modules where programme_id = public.current_programme_id())
);

create policy "quizzes_admin_write" on public.quizzes
for all using (public.is_admin()) with check (public.is_admin());

-- 9. QUIZ QUESTIONS POLICIES
create policy "quiz_questions_select_policy" on public.quiz_questions
for select using (
  public.is_admin()
  or quiz_id in (
    select q.id from public.quizzes q
    join public.modules m on m.id = q.module_id
    where m.programme_id = public.current_programme_id()
  )
);

create policy "quiz_questions_admin_write" on public.quiz_questions
for all using (public.is_admin()) with check (public.is_admin());

-- 10. QUIZ OPTIONS POLICIES
-- Direct read on quiz_options is restricted to instructors and admins.
-- Learners access options via v_quiz_options_learner which excludes is_correct!
create policy "quiz_options_select_policy" on public.quiz_options
for select using (
  public.is_admin()
  or public.current_role() = 'instructor'
);

create policy "quiz_options_admin_write" on public.quiz_options
for all using (public.is_admin()) with check (public.is_admin());

-- 11. EXAM QUESTIONS POLICIES
create policy "exam_questions_select_policy" on public.exam_questions
for select using (
  public.is_admin()
  or programme_id = public.current_programme_id()
);

create policy "exam_questions_admin_write" on public.exam_questions
for all using (public.is_admin()) with check (public.is_admin());

-- 12. JOBS POLICIES (All authenticated users can browse JDs)
create policy "jobs_select_policy" on public.jobs
for select using (auth.uid() is not null);

create policy "jobs_admin_write" on public.jobs
for all using (public.is_admin()) with check (public.is_admin());

-- 13. PROGRESS POLICIES
-- A. Resource Completions
create policy "res_comp_select_policy" on public.resource_completions
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and user_id in (select id from public.profiles where programme_id = public.current_programme_id())
  )
);

-- B. Module Progress
create policy "mod_prog_select_policy" on public.module_progress
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and user_id in (select id from public.profiles where programme_id = public.current_programme_id())
  )
);

-- C. FAQ Reads
create policy "faq_reads_select_policy" on public.faq_reads
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and user_id in (select id from public.profiles where programme_id = public.current_programme_id())
  )
);

-- D. Quiz Attempts
create policy "quiz_attempts_select_policy" on public.quiz_attempts
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and user_id in (select id from public.profiles where programme_id = public.current_programme_id())
  )
);

-- E. Quiz Answers
create policy "quiz_answers_select_policy" on public.quiz_answers
for select using (
  attempt_id in (select id from public.quiz_attempts where user_id = auth.uid())
  or public.is_admin()
  or public.current_role() = 'instructor'
);

-- F. Exam Submissions
create policy "exam_sub_select_policy" on public.exam_submissions
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and (programme_id = public.current_programme_id() or programme_id is null)
  )
);

create policy "exam_sub_update_policy" on public.exam_submissions
for update using (
  public.is_admin() or public.current_role() = 'instructor'
);

-- G. Exam Answers
create policy "exam_answers_select_policy" on public.exam_answers
for select using (
  submission_id in (select id from public.exam_submissions where user_id = auth.uid())
  or public.is_admin()
  or public.current_role() = 'instructor'
);

-- H. Feedback
create policy "feedback_select_policy" on public.feedback
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or public.current_role() = 'instructor'
);

create policy "feedback_insert_policy" on public.feedback
for insert with check (
  auth.uid() = user_id
);

