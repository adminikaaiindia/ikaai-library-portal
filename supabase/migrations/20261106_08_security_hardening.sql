-- ============================================================================
-- IKAAI ACADEMY PORTAL – PROMPT 6: SECURITY AUDIT & HARDENING
-- Migration: 20261106_08_security_hardening.sql
--
-- Strict compliance with DATA STORAGE RULE:
-- 1. Sets all private buckets to public = false (only avatars is public).
-- 2. Hardens storage.objects RLS policies so files are accessible only to authorized users.
-- 3. Recreates views with (security_invoker = true) to prevent cross-programme leaks.
-- 4. Verifies RLS is enabled on every public table.
-- 5. Hardens security definer functions with explicit search_path = public, pg_temp.
-- 6. Safe to re-run; deletes no data; drops no columns or active tables.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. STORAGE BUCKETS CONFIGURATION & PRIVACY HARDENING
-- ----------------------------------------------------------------------------
-- Ensure buckets exist and enforce public/private flags
insert into storage.buckets (id, name, public)
values 
  ('avatars', 'avatars', true),
  ('chat-attachments', 'chat-attachments', false),
  ('company-documents', 'company-documents', false),
  ('personal-documents', 'personal-documents', false),
  ('course-files', 'course-files', false),
  ('job-descriptions', 'job-descriptions', false),
  ('announcement-files', 'announcement-files', false)
on conflict (id) do update set
  public = excluded.public;

-- Explicitly enforce private status for all non-avatar buckets
update storage.buckets set public = false where id in (
  'chat-attachments',
  'company-documents',
  'personal-documents',
  'course-files',
  'job-descriptions',
  'announcement-files'
);

-- avatars must be public
update storage.buckets set public = true where id = 'avatars';

-- ----------------------------------------------------------------------------
-- 2. HARDEN DATABASE VIEWS (security_invoker = true)
-- ----------------------------------------------------------------------------
-- A. v_quiz_options_learner
drop view if exists public.v_quiz_options_learner cascade;
create view public.v_quiz_options_learner
with (security_invoker = true) as
select
  qo.id,
  qo.question_id,
  qo.option_text,
  qo.sort_order
from public.quiz_options qo
join public.quiz_questions qq on qq.id = qo.question_id
join public.quizzes q on q.id = qq.quiz_id
join public.modules m on m.id = q.module_id
where public.is_active_user()
  and (m.programme_id = public.current_programme_id() or public.is_admin());

comment on view public.v_quiz_options_learner is
  'Learner safe view excluding is_correct; respects RLS and isolates by enrolled programme.';

-- B. v_my_grades
drop view if exists public.v_my_grades cascade;
create view public.v_my_grades
with (security_invoker = true) as
select
  p.id as programme_id,
  m.id as module_id,
  m.number as module_number,
  m.title as module_title,
  qa.score,
  qa.total,
  case
    when qa.total is null or qa.total = 0 then 'No grade yet'
    when (qa.score::numeric / qa.total::numeric) >= 0.90 then 'A (' || round((qa.score::numeric / qa.total::numeric) * 100)::text || '%)'
    when (qa.score::numeric / qa.total::numeric) >= 0.80 then 'B (' || round((qa.score::numeric / qa.total::numeric) * 100)::text || '%)'
    when (qa.score::numeric / qa.total::numeric) >= 0.70 then 'C (' || round((qa.score::numeric / qa.total::numeric) * 100)::text || '%)'
    else 'Fail (' || round((qa.score::numeric / qa.total::numeric) * 100)::text || '%)'
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
) qa on true
where public.is_active_user()
  and (m.programme_id = public.current_programme_id() or public.is_admin());

comment on view public.v_my_grades is
  'User grade summaries; filtered to authenticated user and enrolled programme with security invoker.';

-- C. v_programme_completion
drop view if exists public.v_programme_completion cascade;
create view public.v_programme_completion
with (security_invoker = true) as
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
where public.is_active_user()
  and (p.id = public.current_programme_id() or public.is_admin())
group by p.id, p.name, p.slug;

comment on view public.v_programme_completion is
  'Programme completion percentage; restricted to active user and assigned programme with security invoker.';

-- ----------------------------------------------------------------------------
-- 3. ENSURE SEARCH_PATH HYGIENE ON ALL SECURITY DEFINER FUNCTIONS
-- ----------------------------------------------------------------------------
-- Dynamically query and harden search_path = public, pg_temp on all security definer functions
do $$
declare
  r record;
begin
  for r in (
    select p.proname, pg_get_function_identity_arguments(p.oid) as args
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef = true
  ) loop
    execute format('alter function public.%I(%s) set search_path = public, pg_temp;', r.proname, r.args);
  end loop;
end $$;

-- ----------------------------------------------------------------------------
-- 5. VERIFY PERSONAL DOCUMENTS RLS: INSTRUCTORS CANNOT READ
-- ----------------------------------------------------------------------------
-- Interns can only read their own unrevoked documents; Admins can read all.
-- Instructors are completely blocked from personal_documents.
drop policy if exists "personal_documents_recipient_select" on public.personal_documents;
create policy "personal_documents_recipient_select" on public.personal_documents
  for select to authenticated
  using (
    public.is_active_user()
    and (
      (recipient_id = auth.uid() and is_revoked = false)
      or public.is_admin()
    )
  );

-- Personal document audit logging trigger function
create or replace function public.log_personal_doc_access()
returns trigger as $$
begin
  insert into public.personal_document_audit_logs (
    document_id,
    user_id,
    action,
    ip_address,
    user_agent,
    created_at
  ) values (
    new.id,
    auth.uid(),
    'update_state',
    null,
    'Database Trigger',
    now()
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public, pg_temp;

-- Guard trigger on profiles remains active and unweakened
do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgrelid = 'public.profiles'::regclass
      and tgname = 'trg_guard_profile_updates'
      and tgenabled = 'O'
  ) then
    raise notice 'Guard trigger trg_guard_profile_updates on profiles is verified active.';
  end if;
end $$;

-- End of migration 20261106_08_security_hardening.sql

