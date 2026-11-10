-- ====================================================================
-- SCHEMA CLEANUP & RECONCILIATION VERIFICATION SCRIPT
-- File: supabase/verify_schema_cleanup.sql
-- Description:
--   Queries the live schema to verify backfills, constraints, indexes,
--   duplicate prevention, and RLS policies after running 20261106_01.
--   Uses strictly verified real tables and columns.
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. PROFILES AUDIT
-- --------------------------------------------------------------------
select '=== 1.1 PROFILES: COLUMNS AUDIT ===' as check_section;
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'profiles'
  and column_name in ('full_name', 'display_name', 'programme_id', 'programme', 'created_at', 'phone', 'member_since_date', 'member_since')
order by ordinal_position;

select '=== 1.2 PROFILES: UNBACKFILLED OR ANOMALOUS ROWS ===' as check_section;
select
  count(*) filter (where member_since_date is null) as unbackfilled_member_since_date,
  count(*) filter (where created_at is null) as null_created_at,
  count(*) filter (where full_name is null or trim(full_name) = '') as empty_full_name,
  count(*) filter (where programme_id is null) as null_programme_id,
  count(*) filter (where full_name is distinct from display_name) as name_display_mismatches
from public.profiles;

-- Detailed list of any profiles with issues (should return 0 rows)
select id, full_name, display_name, email, role, programme_id, programme, member_since_date, member_since, created_at
from public.profiles
where full_name is null
   or trim(full_name) = ''
   or member_since_date is null
   or created_at is null;


-- --------------------------------------------------------------------
-- 2. MESSAGE THREADS AUDIT
-- --------------------------------------------------------------------
select '=== 2.1 MESSAGE THREADS: COLUMNS AUDIT ===' as check_section;
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'message_threads'
  and column_name in ('id', 'programme_id', 'programme', 'module_ref', 'module_id', 'status', 'category', 'rating')
order by ordinal_position;

select '=== 2.2 MESSAGE THREADS: UNBACKFILLED REFERENCES ===' as check_section;
select
  count(*) as total_threads,
  count(*) filter (where programme_id is null) as unbackfilled_programme_id,
  count(*) filter (where module_ref is null and module_id is not null) as unbackfilled_module_ref
from public.message_threads;

-- Show any threads where programme_id could not be resolved (should be 0)
select id, subject, programme, programme_id, module_id, module_ref
from public.message_threads
where programme_id is null;

select '=== 2.3 MESSAGE THREADS: CHECK CONSTRAINT COMPLIANCE ===' as check_section;
select
  count(*) filter (where status not in ('open', 'answered', 'resolved')) as invalid_status_count,
  count(*) filter (where category not in ('module_question', 'technical_issue', 'exam_grading', 'leave_attendance', 'other')) as invalid_category_count,
  count(*) filter (where rating is not null and rating not in ('up', 'down')) as invalid_rating_count
from public.message_threads;

select '=== 2.4 MESSAGE THREADS: INDEXES ===' as check_section;
select indexname, indexdef
from pg_indexes
where schemaname = 'public' and tablename = 'message_threads'
order by indexname;


-- --------------------------------------------------------------------
-- 3. EXAM SUBMISSIONS AUDIT
-- --------------------------------------------------------------------
select '=== 3.1 EXAM SUBMISSIONS: DUPLICATE CHECK ===' as check_section;
-- Must return 0 rows: only 1 submission allowed per user per programme
select user_id, programme_id, count(*) as submission_count
from public.exam_submissions
group by user_id, programme_id
having count(*) > 1;

select '=== 3.2 EXAM SUBMISSIONS: COLUMNS & CONSTRAINTS ===' as check_section;
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'exam_submissions'
  and column_name in ('id', 'user_id', 'programme_id', 'status', 'allow_retake');

select conname as constraint_name, contype, pg_get_constraintdef(c.oid) as definition
from pg_constraint c
join pg_namespace n on n.oid = c.connamespace
where n.nspname = 'public' and conrelid = 'public.exam_submissions'::regclass;


-- --------------------------------------------------------------------
-- 4. FEEDBACK AUDIT
-- --------------------------------------------------------------------
select '=== 4.1 FEEDBACK: COLUMNS & CONSTRAINTS ===' as check_section;
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'feedback'
  and column_name in ('id', 'status', 'updated_at', 'created_at');

select conname as constraint_name, pg_get_constraintdef(c.oid) as definition
from pg_constraint c
join pg_namespace n on n.oid = c.connamespace
where n.nspname = 'public' and conrelid = 'public.feedback'::regclass;


-- --------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES AUDIT
-- --------------------------------------------------------------------
select '=== 5.1 ACTIVE RLS POLICIES ===' as check_section;
select tablename, policyname, permissive, roles, cmd, qual
from pg_policies
where schemaname = 'public'
  and tablename in ('profiles', 'message_threads', 'messages', 'exam_submissions', 'feedback')
order by tablename, policyname;


-- --------------------------------------------------------------------
-- 6. ACTIVE TRIGGERS AUDIT
-- --------------------------------------------------------------------
select '=== 6.1 CRITICAL SECURITY TRIGGERS ===' as check_section;
select tgname as trigger_name,
       relname as table_name,
       proname as function_name,
       tgenabled
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_proc p on p.oid = t.tgfoid
where relname in ('profiles', 'message_threads', 'exam_submissions')
  and tgname in ('trg_guard_profile_updates', 'trg_auto_enroll_user_in_chat')
order by relname, tgname;
