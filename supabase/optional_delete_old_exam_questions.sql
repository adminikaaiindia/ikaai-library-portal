-- ====================================================================
-- IKAAI ACADEMY / LIBRARY - OPTIONAL CLEANUP OF OLD EXAM QUESTIONS
-- WARNING: Only run this script if you decide to permanently purge
-- the legacy (non-role-based) questions and the two early test submissions.
-- DO NOT RUN unless you explicitly want to delete old test submissions!
-- ====================================================================

begin;

-- 1. Remove old test submissions that answered the legacy questions
delete from public.exam_answers
where submission_id in (
  select id from public.exam_submissions where job_id is null
);

delete from public.exam_submissions
where job_id is null;

-- 2. Delete inactive old exam questions that do not have a job_id assigned
delete from public.exam_questions
where is_active = false and job_id is null;

commit;

-- Verification notice: Legacy questions and legacy test submissions removed.

