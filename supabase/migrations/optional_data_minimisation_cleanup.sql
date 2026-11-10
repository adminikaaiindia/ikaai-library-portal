-- ============================================================================
-- IKAAI ACADEMY PORTAL – OPTIONAL DATA MINIMISATION & CLEANUP
-- File: optional_data_minimisation_cleanup.sql
--
-- IMPORTANT NOTICE (READ BEFORE RUNNING):
-- This file is strictly OPTIONAL and for future maintenance.
-- DO NOT RUN THIS FILE until the portal has been live and verified stable for several days.
--
-- Contents proposed for removal under Data Minimisation:
-- 1. Backup tables created during schema reconciliation on 2026-11-06.
-- 2. Deprecated columns on public.profiles (display_name, programme text, member_since text).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. OPTIONAL REMOVAL: RECONCILIATION BACKUP TABLES
-- ----------------------------------------------------------------------------
-- These 4 tables were snapshot backups created prior to the foreign key reconciliation.
-- Once you have verified all live data is intact, you can drop them to save space.

-- drop table if exists public.backup_profiles_20261106 cascade;
-- drop table if exists public.backup_message_threads_20261106 cascade;
-- drop table if exists public.backup_exam_submissions_20261106 cascade;
-- drop table if exists public.backup_feedback_20261106 cascade;


-- ----------------------------------------------------------------------------
-- 2. OPTIONAL REMOVAL: DEPRECATED COLUMNS ON PROFILES
-- ----------------------------------------------------------------------------
-- The portal now strictly uses:
--   - profiles.full_name (instead of display_name)
--   - profiles.programme_id (UUID foreign key instead of programme text)
--   - profiles.created_at / member_since_date (instead of member_since text)
--
-- Before dropping these columns, disable the user trigger on profiles:

/*
alter table public.profiles disable trigger user;

alter table public.profiles
  drop column if exists display_name,
  drop column if exists programme,
  drop column if exists member_since;

alter table public.profiles enable trigger user;
*/

-- End of optional_data_minimisation_cleanup.sql

