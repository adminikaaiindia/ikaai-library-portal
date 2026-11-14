-- ============================================================================
-- VERIFICATION QUERIES FOR MIGRATION 20261114_17_PRODUCTION_HARDENING
-- File: verify_20261114_17.sql
--
-- Instructions: Run these READ-ONLY queries in your Supabase SQL Editor
-- to verify each section of the hardening migration.
-- ============================================================================

-- 1. VERIFY ROW LEVEL SECURITY (RLS) ON ALL 5 CHAT TABLES
-- Expected: All 5 tables must return rowsecurity = true
select
  relname as table_name,
  relrowsecurity as rls_enabled
from pg_class
where relname in (
  'chat_conversations',
  'chat_conversation_members',
  'chat_messages',
  'chat_attachments',
  'chat_reactions'
)
order by relname;

-- 2. VERIFY CHAT TABLE POLICIES COUNT
-- Expected: Multiple active policies per table
select
  tablename,
  count(*) as active_policies_count
from pg_policies
where schemaname = 'public'
  and tablename in (
    'chat_conversations',
    'chat_conversation_members',
    'chat_messages',
    'chat_attachments',
    'chat_reactions'
  )
group by tablename
order by tablename;

-- 3. VERIFY RPC FUNCTION PERMISSIONS (ANON MUST NOT HAVE EXECUTE)
-- Expected: 0 rows returned (no public functions executable by anon)
select
  r.routine_name,
  grantee,
  privilege_type
from information_schema.routine_privileges p
join information_schema.routines r on p.specific_name = r.specific_name
where r.routine_schema = 'public'
  and grantee in ('anon', 'public')
  and privilege_type = 'EXECUTE'
  and r.routine_name in (
    'get_dashboard_summary',
    'delete_user',
    'invite_user',
    'claim_user_invite',
    'grade_exam',
    'submit_exam',
    'publish_announcement'
  );

-- 4. VERIFY STORAGE BUCKET CONSTRAINTS
-- Expected: file_size_limit = 10485760 (10MB) and allowed_mime_types populated
select
  id,
  name,
  file_size_limit,
  allowed_mime_types
from storage.buckets
where id in ('chat-attachments', 'personal-documents', 'company-documents');

-- 5. VERIFY COMPOSITE PERFORMANCE INDEXES EXIST
-- Expected: 4 rows returned
select
  indexname,
  tablename
from pg_indexes
where schemaname = 'public'
  and indexname in (
    'idx_chat_msg_conv_deleted',
    'idx_exam_sub_status_grade',
    'idx_chat_conv_members_user',
    'idx_access_invites_email_lower'
  );

-- 6. VERIFY DEPRECATED PROFILES COLUMNS AND BACKUP TABLES ARE GONE
-- Expected: 0 rows returned
select table_name, column_name
from information_schema.columns
where table_schema = 'public'
  and table_name = 'profiles'
  and column_name in ('display_name', 'programme', 'member_since');

-- Expected: 0 rows returned
select tablename
from pg_tables
where schemaname = 'public'
  and tablename in (
    'backup_profiles_20261106',
    'backup_message_threads_20261106',
    'backup_exam_submissions_20261106',
    'backup_feedback_20261106'
  );
