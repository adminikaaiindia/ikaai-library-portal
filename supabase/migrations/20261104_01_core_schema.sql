-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — STAGE 1 CORE DATABASE SCHEMA
-- Migration: 20261104_01_core_schema.sql
-- ====================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. PROGRAMMES TABLE
create table if not exists public.programmes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  tag_label text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_programmes_slug on public.programmes(slug);
create index if not exists idx_programmes_sort on public.programmes(sort_order);

-- 3. PROFILES TABLE (Extend existing or create fresh)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  display_name text,
  email text,
  avatar_url text,
  role text not null default 'intern' check (role in ('intern', 'learner', 'instructor', 'admin')),
  programme_id uuid references public.programmes(id) on delete set null,
  programme text default 'human-resources',
  branch text default 'New Delhi / Remote',
  position text default 'Intern',
  member_since text default 'October 2026',
  last_seen timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure all required columns exist if profiles was pre-created
do $$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'full_name') then
    alter table public.profiles add column full_name text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'programme_id') then
    alter table public.profiles add column programme_id uuid references public.programmes(id) on delete set null;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'branch') then
    alter table public.profiles add column branch text default 'New Delhi / Remote';
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'position') then
    alter table public.profiles add column position text default 'Intern';
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'member_since') then
    alter table public.profiles add column member_since text default 'October 2026';
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'last_seen') then
    alter table public.profiles add column last_seen timestamptz default now();
  end if;
end $$;

-- Update role check constraint to allow 'intern', 'learner', 'instructor', 'admin'
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('intern', 'learner', 'instructor', 'admin'));

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_programme_id on public.profiles(programme_id);

-- 4. MODULES TABLE
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references public.programmes(id) on delete cascade,
  number int not null,
  title text not null,
  description text,
  learning_objectives text[] not null default '{}',
  sort_order int not null default 0,
  timer_seconds int not null default 30,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_module_programme_number unique(programme_id, number)
);

create index if not exists idx_modules_programme_id on public.modules(programme_id);
create index if not exists idx_modules_sort_order on public.modules(programme_id, sort_order);

-- 5. RESOURCES TABLE
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  number text,
  title text not null,
  type text not null check (type in ('document', 'pdf', 'image', 'presentation')),
  storage_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_resources_module_id on public.resources(module_id);
create index if not exists idx_resources_sort on public.resources(module_id, sort_order);

-- 6. FAQS TABLE
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_faqs_module_id on public.faqs(module_id);
create index if not exists idx_faqs_sort on public.faqs(module_id, sort_order);

-- 7. QUIZZES TABLE
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null unique references public.modules(id) on delete cascade,
  title text not null,
  pass_mark int not null default 80,
  created_at timestamptz not null default now()
);

create index if not exists idx_quizzes_module_id on public.quizzes(module_id);

-- 8. QUIZ QUESTIONS TABLE
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_quiz_questions_quiz_id on public.quiz_questions(quiz_id);
create index if not exists idx_quiz_questions_sort on public.quiz_questions(quiz_id, sort_order);

-- 9. QUIZ OPTIONS TABLE
create table if not exists public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  option_text text not null,
  sort_order int not null default 0,
  is_correct boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_quiz_options_question_id on public.quiz_options(question_id);
create index if not exists idx_quiz_options_sort on public.quiz_options(question_id, sort_order);

-- Safe learner view leaving out is_correct
create or replace view public.v_quiz_options_learner as
select
  id,
  question_id,
  option_text,
  sort_order
from public.quiz_options;

-- 10. EXAM QUESTIONS TABLE
create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references public.programmes(id) on delete cascade,
  question text not null,
  prompt text,
  max_marks int not null default 100,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_exam_questions_programme_id on public.exam_questions(programme_id);
create index if not exists idx_exam_questions_sort on public.exam_questions(programme_id, sort_order);

-- 11. JOBS TABLE (11 official Job Descriptions)
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  programme_id uuid references public.programmes(id) on delete set null,
  summary text,
  content_html text not null,
  docx_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_jobs_programme_id on public.jobs(programme_id);
create index if not exists idx_jobs_slug on public.jobs(slug);
create index if not exists idx_jobs_category on public.jobs(category);

-- 12. PROGRESS TABLES
-- A. Resource Completions
create table if not exists public.resource_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, resource_id)
);

create index if not exists idx_res_comp_user on public.resource_completions(user_id);
create index if not exists idx_res_comp_resource on public.resource_completions(resource_id);

-- B. Module Progress
create table if not exists public.module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  opened_at timestamptz not null default now(),
  timer_completed_at timestamptz,
  completed_at timestamptz,
  seconds_spent int not null default 0,
  primary key (user_id, module_id)
);

create index if not exists idx_mod_prog_user on public.module_progress(user_id);
create index if not exists idx_mod_prog_module on public.module_progress(module_id);
create index if not exists idx_mod_prog_lookup on public.module_progress(user_id, module_id);

-- C. FAQ Reads
create table if not exists public.faq_reads (
  user_id uuid not null references auth.users(id) on delete cascade,
  faq_id uuid not null references public.faqs(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (user_id, faq_id)
);

create index if not exists idx_faq_reads_user on public.faq_reads(user_id);
create index if not exists idx_faq_reads_faq on public.faq_reads(faq_id);

-- D. Quiz Attempts & Answers
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score numeric(5,2) not null,
  total numeric(5,2) not null,
  passed boolean not null default false,
  attempt_number int not null default 1,
  submitted_at timestamptz not null default now()
);

create index if not exists idx_quiz_attempts_user on public.quiz_attempts(user_id);
create index if not exists idx_quiz_attempts_quiz on public.quiz_attempts(quiz_id);
create index if not exists idx_quiz_attempts_user_quiz on public.quiz_attempts(user_id, quiz_id, submitted_at desc);

create table if not exists public.quiz_answers (
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  option_id uuid not null references public.quiz_options(id) on delete cascade,
  is_correct boolean,
  primary key (attempt_id, question_id)
);

create index if not exists idx_quiz_answers_attempt on public.quiz_answers(attempt_id);

-- E. Exam Submissions & Answers
create table if not exists public.exam_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  programme_id uuid not null references public.programmes(id) on delete cascade,
  status text not null default 'not_submitted' check (status in ('not_submitted', 'submitted', 'graded')),
  submitted_at timestamptz,
  grade text,
  score numeric(5,2),
  instructor_comment text,
  graded_by uuid references auth.users(id) on delete set null,
  graded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_exam_sub_user_prog unique(user_id, programme_id)
);

create index if not exists idx_exam_sub_user on public.exam_submissions(user_id);
create index if not exists idx_exam_sub_prog on public.exam_submissions(programme_id);

create table if not exists public.exam_answers (
  submission_id uuid not null references public.exam_submissions(id) on delete cascade,
  question_id uuid not null references public.exam_questions(id) on delete cascade,
  answer_text text not null,
  marks numeric(5,2),
  comment text,
  primary key (submission_id, question_id)
);

create index if not exists idx_exam_answers_sub on public.exam_answers(submission_id);

-- F. Feedback
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid references public.modules(id) on delete set null,
  programme_id uuid not null references public.programmes(id) on delete cascade,
  topic text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_feedback_user on public.feedback(user_id);
create index if not exists idx_feedback_programme on public.feedback(programme_id);

-- 13. USER SIGNUP PROFILE TRIGGER
create or replace function public.handle_new_user()
returns trigger as $$
declare
  default_prog_id uuid;
  name_val text;
  avatar_val text;
  role_val text;
begin
  -- Determine name from Google or signup metadata
  name_val := coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    split_part(new.email, '@', 1)
  );
  avatar_val := coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture'
  );
  role_val := coalesce(new.raw_user_meta_data->>'role', 'intern');
  if role_val = 'learner' then
    role_val := 'intern';
  end if;

  -- Default to human-resources programme if available
  select id into default_prog_id from public.programmes where slug = 'human-resources' limit 1;

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
    last_seen
  )
  values (
    new.id,
    name_val,
    name_val,
    new.email,
    avatar_val,
    role_val,
    default_prog_id,
    'human-resources',
    'New Delhi / Remote',
    'Intern',
    to_char(now(), 'Month YYYY'),
    now()
  )
  on conflict (id) do update set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    display_name = coalesce(excluded.display_name, public.profiles.display_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    last_seen = now(),
    updated_at = now();

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 14. VIEWS FOR GRADES AND PROGRAMME COMPLETION
-- A. My Grades View
create or replace view public.v_my_grades as
select
  p.id as programme_id,
  m.id as module_id,
  m.number as module_number,
  m.title as module_title,
  qa.score,
  qa.total,
  case
    when qa.total is null or qa.total = 0 then 'No grade yet'
    when (qa.score / qa.total) >= 0.90 then 'A (' || round((qa.score / qa.total) * 100)::text || '%)'
    when (qa.score / qa.total) >= 0.80 then 'B (' || round((qa.score / qa.total) * 100)::text || '%)'
    when (qa.score / qa.total) >= 0.70 then 'C (' || round((qa.score / qa.total) * 100)::text || '%)'
    else 'Fail (' || round((qa.score / qa.total) * 100)::text || '%)'
  end as grade_display,
  qa.passed,
  auth.uid() as user_id
from public.modules m
join public.programmes p on p.id = m.programme_id
left join lateral (
  select score, total, passed
  from public.quiz_attempts qa_sub
  where qa_sub.quiz_id in (select id from public.quizzes where module_id = m.id)
    and qa_sub.user_id = auth.uid()
  order by qa_sub.score desc, qa_sub.submitted_at desc
  limit 1
) qa on true;

-- B. Programme Completion View
create or replace view public.v_programme_completion as
select
  p.id as programme_id,
  p.name as programme_name,
  p.slug as programme_slug,
  auth.uid() as user_id,
  count(m.id) as total_modules,
  count(mp.completed_at) as completed_modules,
  case
    when count(m.id) = 0 then 0
    else round((count(mp.completed_at)::numeric / count(m.id)::numeric) * 100)
  end as completion_percentage
from public.programmes p
left join public.modules m on m.programme_id = p.id
left join public.module_progress mp on mp.module_id = m.id and mp.user_id = auth.uid()
group by p.id, p.name, p.slug;

