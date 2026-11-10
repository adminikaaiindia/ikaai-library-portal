# Database Schema Reconciliation & Cleanup Guide

## Overview
This document outlines the safe reconciliation of the Ikaai Beginner Portal database schema, transitioning legacy text columns to relational foreign key references and single sources of truth without dropping or losing any existing data.

---

## 1. Migration Run Order

Execute the following migrations in your Supabase SQL Editor in exact chronological order:

1. **`supabase/migrations/20261106_01_schema_reconciliation.sql`** (Required)
   - Adds `created_at`, `phone`, and `member_since_date` to `profiles`.
   - Backfills `member_since_date` from `member_since` and `created_at` from `auth.users`.
   - Establishes `full_name` as the single source of truth for user names.
   - Establishes `programme_id` as the single source of truth for user programmes.
   - Strengthens `guard_profile_updates()` trigger to prevent non-admins from changing `role`, `email`, `branch`, `position`, `programme`, `programme_id`, and `created_at`.
   - Adds `programme_id` (UUID references `programmes`) and `module_ref` (UUID references `modules`) to `message_threads`.
   - Backfills `programme_id` and `module_ref` from legacy text columns.
   - Normalizes and enforces check constraints on `message_threads`:
     - `status`: `'open'`, `'answered'`, `'resolved'`
     - `category`: `'module_question'`, `'technical_issue'`, `'exam_grading'`, `'leave_attendance'`, `'other'`
     - `rating`: `'up'`, `'down'`, or `null`
   - Adds performance indexes on `message_threads(learner_id)`, `(programme_id)`, `(status)`, and `(last_message_at DESC)`.
   - Adds `allow_retake` (default `false`) to `exam_submissions` and enforces unique submission rule `(user_id, programme_id)` via server function `submit_exam`.
   - Adds `status` (`'new'`, `'reviewed'`) and `updated_at` to `feedback`.
   - Updates support inbox and chat RLS policies to use `programme_id` and `public.current_programme_id()`.
   - Adds SQL deprecation comments to legacy columns (`profiles.display_name`, `profiles.programme`, `profiles.member_since`, `message_threads.programme`, `message_threads.module_id`).

2. **`supabase/migrations/20261106_02_drop_deprecated_columns.sql`** (Optional — Post-Verification Only)
   > [!CAUTION]
   > Do **NOT** run this script until all tests and user workflows have been verified in production. This script permanently removes legacy columns: `profiles.display_name`, `profiles.programme`, `profiles.member_since`, `message_threads.programme`, and `message_threads.module_id`.

---

## 2. Verification Instructions

After running `20261106_01_schema_reconciliation.sql`, open `supabase/verify_schema_cleanup.sql` in the Supabase SQL Editor and run it.

### Expected Results:
1. **Profiles Columns & Backfill**:
   - `unbackfilled_member_since_date` = `0`
   - `null_created_at` = `0`
   - `empty_full_name` = `0`
   - `null_programme_id` = `0` (or only new unassigned accounts awaiting initial programme selection)
   - `name_display_mismatches` = `0`
2. **Message Threads**:
   - `unbackfilled_programme_id` = `0`
   - `invalid_status_count` = `0`
   - `invalid_category_count` = `0`
   - `invalid_rating_count` = `0`
3. **Exam Submissions**:
   - Query 3.1 returns `0 rows` (confirming no duplicate submissions per user per programme).
   - Constraint `uq_exam_sub_user_prog` is active.
4. **Feedback**:
   - Columns `status` (`new` / `reviewed`) and `updated_at` present and constrained.
5. **RLS Policies**:
   - Policies for `message_threads` and `messages` filter via `programme_id = public.current_programme_id()`.
6. **Trigger Status**:
   - `trg_guard_profile_updates` active on `public.profiles`.
   - `trg_auto_enroll_user_in_chat` active on `public.profiles(programme_id)`.

---

## 3. Frontend Column Updates

The frontend has been updated to read and write the new relational columns exclusively:
- User names: `profile.full_name` is used across account settings, UI avatars, support threads, and chat.
- User programme: `profile.programme_id` is used for access control, query filtering, and cohort navigation.
- Message threads: `thread.programme_id` and `thread.module_ref` are read and written.
- Exam submission: Handles retake restrictions and displays instructor retake status.

