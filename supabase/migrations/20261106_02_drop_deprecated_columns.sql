-- ====================================================================
-- OPTIONAL POST-VERIFICATION CLEANUP SCRIPT
-- Migration: 20261106_02_drop_deprecated_columns.sql
-- CAUTION: RUN THIS SCRIPT ONLY AFTER CONFIRMING THAT THE APP AND ALL
--          PERSONAS FUNCTION CLEANLY AND SAFELY WITH THE RECONCILED SCHEMA.
--
-- Drops legacy deprecated columns that have been replaced by relational references:
--   - profiles.display_name   (replaced by profiles.full_name)
--   - profiles.programme      (replaced by profiles.programme_id)
--   - profiles.member_since   (replaced by profiles.member_since_date)
--   - message_threads.programme (replaced by message_threads.programme_id)
--   - message_threads.module_id (replaced by message_threads.module_ref)
-- ====================================================================

begin;

-- 1. Safely detach chat auto-enroll trigger if present
drop trigger if exists trg_auto_enroll_user_in_chat on public.profiles;

-- 2. Drop deprecated columns from message_threads
alter table public.message_threads
  drop column if exists programme cascade,
  drop column if exists module_id cascade;

-- 3. Drop deprecated columns from profiles
alter table public.profiles
  drop column if exists display_name cascade,
  drop column if exists programme cascade,
  drop column if exists member_since cascade;

-- 4. Re-attach chat auto-enroll trigger on programme_id conditionally (only if chat tables and function exist)
do $$
begin
  if to_regclass('public.conversations') is not null and exists (
    select 1 from pg_proc where proname = 'fn_auto_enroll_user_in_chat'
  ) then
    execute 'create trigger trg_auto_enroll_user_in_chat
             after insert or update of programme_id on public.profiles
             for each row execute function public.fn_auto_enroll_user_in_chat()';
  end if;
end $$;

commit;
