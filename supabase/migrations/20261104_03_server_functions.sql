-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — STAGE 1 SERVER-SIDE BUSINESS LOGIC (RPCs)
-- Migration: 20261104_03_server_functions.sql
-- ====================================================================

-- 1. HELPER: CHECK IF A MODULE IS UNLOCKED FOR THE CURRENT USER
create or replace function public.fn_is_module_unlocked(p_module_id uuid, p_user_id uuid)
returns boolean as $$
declare
  v_mod_num int;
  v_prog_id uuid;
  v_prev_mod_id uuid;
  v_prev_completed timestamptz;
begin
  select number, programme_id into v_mod_num, v_prog_id
  from public.modules where id = p_module_id;

  if v_mod_num is null then
    return false;
  end if;

  -- Module 0 is always unlocked
  if v_mod_num = 0 then
    return true;
  end if;

  -- For Module N (N > 0), find module N-1 in same programme
  select id into v_prev_mod_id
  from public.modules
  where programme_id = v_prog_id and number = (v_mod_num - 1);

  if v_prev_mod_id is null then
    return true;
  end if;

  -- Check if previous module is complete
  select completed_at into v_prev_completed
  from public.module_progress
  where user_id = p_user_id and module_id = v_prev_mod_id;

  return (v_prev_completed is not null);
end;
$$ language plpgsql stable security definer set search_path = public;

-- 2. OPEN MODULE (Records opened_at on first open, refuses if locked)
create or replace function public.open_module(p_module_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_unlocked boolean;
  v_rec record;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  -- Validate module exists
  if not exists (select 1 from public.modules where id = p_module_id) then
    raise exception 'Module not found.';
  end if;

  -- Check unlock status
  v_unlocked := public.fn_is_module_unlocked(p_module_id, v_user_id);
  if not v_unlocked and not public.is_admin() then
    raise exception 'This module is locked. Please complete the preceding module first.';
  end if;

  -- Insert or update opened_at
  insert into public.module_progress (user_id, module_id, opened_at)
  values (v_user_id, p_module_id, now())
  on conflict (user_id, module_id) do nothing;

  select * into v_rec from public.module_progress where user_id = v_user_id and module_id = p_module_id;

  return jsonb_build_object(
    'module_id', p_module_id,
    'opened_at', v_rec.opened_at,
    'timer_completed_at', v_rec.timer_completed_at,
    'completed_at', v_rec.completed_at
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 3. COMPLETE MODULE TIMER (Strict Server Clock Verification)
create or replace function public.complete_module_timer(p_module_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_opened_at timestamptz;
  v_timer_sec int;
  v_elapsed_sec numeric;
  v_now timestamptz := now();
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  -- Fetch module timer requirement
  select coalesce(timer_seconds, 30) into v_timer_sec
  from public.modules where id = p_module_id;

  if v_timer_sec is null then
    raise exception 'Module not found.';
  end if;

  -- Fetch user opened_at
  select opened_at into v_opened_at
  from public.module_progress
  where user_id = v_user_id and module_id = p_module_id;

  if v_opened_at is null then
    raise exception 'Module has not been opened yet. Call open_module first.';
  end if;

  -- Server clock elapsed time check
  v_elapsed_sec := extract(epoch from (v_now - v_opened_at));
  if v_elapsed_sec < v_timer_sec and not public.is_admin() then
    raise exception 'Timer has not completed yet. % seconds remaining according to the server clock.', (v_timer_sec - v_elapsed_sec)::int;
  end if;

  -- Update timer_completed_at
  update public.module_progress
  set timer_completed_at = v_now,
      seconds_spent = greatest(seconds_spent, v_elapsed_sec::int)
  where user_id = v_user_id and module_id = p_module_id;

  return jsonb_build_object(
    'success', true,
    'module_id', p_module_id,
    'timer_completed_at', v_now
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 4. MARK RESOURCE COMPLETE (Allowed only after timer completed)
create or replace function public.mark_resource_complete(p_resource_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_mod_id uuid;
  v_timer_done timestamptz;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  -- Find module
  select module_id into v_mod_id
  from public.resources where id = p_resource_id;

  if v_mod_id is null then
    raise exception 'Resource not found.';
  end if;

  -- Verify module timer is completed
  select timer_completed_at into v_timer_done
  from public.module_progress
  where user_id = v_user_id and module_id = v_mod_id;

  if v_timer_done is null and not public.is_admin() then
    raise exception 'You must complete the 30-second module review timer before ticking resources.';
  end if;

  -- Insert resource completion
  insert into public.resource_completions (user_id, resource_id, completed_at)
  values (v_user_id, p_resource_id, now())
  on conflict (user_id, resource_id) do nothing;

  -- Check if module is now ready to complete
  perform public.complete_module(v_mod_id);

  return jsonb_build_object(
    'success', true,
    'resource_id', p_resource_id,
    'completed_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 5. MARK FAQ READ
create or replace function public.mark_faq_read(p_faq_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_mod_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  select module_id into v_mod_id
  from public.faqs where id = p_faq_id;

  if v_mod_id is null then
    raise exception 'FAQ not found.';
  end if;

  insert into public.faq_reads (user_id, faq_id, read_at)
  values (v_user_id, p_faq_id, now())
  on conflict (user_id, faq_id) do nothing;

  -- Check if module is now ready to complete
  perform public.complete_module(v_mod_id);

  return jsonb_build_object(
    'success', true,
    'faq_id', p_faq_id,
    'read_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 6. SUBMIT QUIZ (Scored Securely On Server)
create or replace function public.submit_quiz(p_quiz_id uuid, p_answers jsonb)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_mod_id uuid;
  v_timer_done timestamptz;
  v_pass_mark int;
  v_total_questions int;
  v_correct_count int := 0;
  v_score_pct numeric;
  v_passed boolean;
  v_attempt_no int;
  v_attempt_id uuid;
  v_item jsonb;
  v_q_id uuid;
  v_opt_id uuid;
  v_is_correct boolean;
  v_results jsonb := '[]'::jsonb;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  -- Find module and pass mark
  select module_id, coalesce(pass_mark, 80) into v_mod_id, v_pass_mark
  from public.quizzes where id = p_quiz_id;

  if v_mod_id is null then
    raise exception 'Quiz not found.';
  end if;

  -- Ensure module timer completed
  select timer_completed_at into v_timer_done
  from public.module_progress
  where user_id = v_user_id and module_id = v_mod_id;

  if v_timer_done is null and not public.is_admin() then
    raise exception 'You must complete the 30-second module review timer before submitting the quiz.';
  end if;

  -- Total questions in quiz
  select count(*) into v_total_questions
  from public.quiz_questions where quiz_id = p_quiz_id;

  if v_total_questions = 0 then
    raise exception 'No questions configured for this quiz.';
  end if;

  -- Determine attempt number
  select coalesce(max(attempt_number), 0) + 1 into v_attempt_no
  from public.quiz_attempts
  where user_id = v_user_id and quiz_id = p_quiz_id;

  -- Create attempt record
  insert into public.quiz_attempts (user_id, quiz_id, score, total, passed, attempt_number)
  values (v_user_id, p_quiz_id, 0, v_total_questions, false, v_attempt_no)
  returning id into v_attempt_id;

  -- Grade each answer securely
  for v_item in select * from jsonb_array_elements(p_answers)
  loop
    v_q_id := (v_item->>'question_id')::uuid;
    v_opt_id := (v_item->>'option_id')::uuid;

    -- Check if option is correct from private quiz_options
    select is_correct into v_is_correct
    from public.quiz_options
    where id = v_opt_id and question_id = v_q_id;

    if v_is_correct is true then
      v_correct_count := v_correct_count + 1;
    end if;

    -- Record answer
    insert into public.quiz_answers (attempt_id, question_id, option_id, is_correct)
    values (v_attempt_id, v_q_id, v_opt_id, coalesce(v_is_correct, false));

    v_results := v_results || jsonb_build_object(
      'question_id', v_q_id,
      'is_correct', coalesce(v_is_correct, false)
    );
  end loop;

  v_score_pct := round((v_correct_count::numeric / v_total_questions::numeric) * 100, 2);
  v_passed := (v_score_pct >= v_pass_mark);

  -- Update attempt with final score
  update public.quiz_attempts
  set score = v_correct_count,
      passed = v_passed
  where id = v_attempt_id;

  -- Check if module completion can be awarded
  if v_passed then
    perform public.complete_module(v_mod_id);
  end if;

  return jsonb_build_object(
    'attempt_id', v_attempt_id,
    'score', v_correct_count,
    'total', v_total_questions,
    'percentage', v_score_pct,
    'passed', v_passed,
    'pass_mark', v_pass_mark,
    'results', v_results
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 7. COMPLETE MODULE (Comprehensive completion check)
-- Completion rule:
-- 1. Timer completed (timer_completed_at is not null)
-- 2. All module resources completed
-- 3. All module FAQs read
-- 4. Quiz passed (score >= pass_mark)
create or replace function public.complete_module(p_module_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_prog_rec record;
  v_res_total int;
  v_res_done int;
  v_faq_total int;
  v_faq_done int;
  v_quiz_id uuid;
  v_quiz_passed boolean := false;
  v_all_done boolean := false;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  select * into v_prog_rec
  from public.module_progress
  where user_id = v_user_id and module_id = p_module_id;

  if v_prog_rec.timer_completed_at is null then
    return jsonb_build_object('completed', false, 'reason', 'Timer not completed');
  end if;

  -- Check resources
  select count(*) into v_res_total from public.resources where module_id = p_module_id;
  select count(*) into v_res_done
  from public.resource_completions rc
  join public.resources r on r.id = rc.resource_id
  where rc.user_id = v_user_id and r.module_id = p_module_id;

  if v_res_done < v_res_total then
    return jsonb_build_object('completed', false, 'reason', 'Not all resources completed', 'done', v_res_done, 'total', v_res_total);
  end if;

  -- Check FAQs
  select count(*) into v_faq_total from public.faqs where module_id = p_module_id;
  select count(*) into v_faq_done
  from public.faq_reads fr
  join public.faqs f on f.id = fr.faq_id
  where fr.user_id = v_user_id and f.module_id = p_module_id;

  if v_faq_done < v_faq_total then
    return jsonb_build_object('completed', false, 'reason', 'Not all FAQs read', 'done', v_faq_done, 'total', v_faq_total);
  end if;

  -- Check Quiz
  select id into v_quiz_id from public.quizzes where module_id = p_module_id;
  if v_quiz_id is not null then
    select exists (
      select 1 from public.quiz_attempts
      where user_id = v_user_id and quiz_id = v_quiz_id and passed = true
    ) into v_quiz_passed;

    if not v_quiz_passed then
      return jsonb_build_object('completed', false, 'reason', 'Quiz not passed yet');
    end if;
  else
    v_quiz_passed := true;
  end if;

  -- All criteria passed! Mark module complete
  update public.module_progress
  set completed_at = coalesce(completed_at, now())
  where user_id = v_user_id and module_id = p_module_id;

  return jsonb_build_object(
    'completed', true,
    'module_id', p_module_id,
    'completed_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 8. SUBMIT WRITTEN EXAM
create or replace function public.submit_exam(p_programme_id uuid, p_answers jsonb)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_sub_id uuid;
  v_item jsonb;
  v_q_id uuid;
  v_ans_text text;
begin
  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  -- Insert or update exam submission
  insert into public.exam_submissions (
    user_id,
    programme_id,
    status,
    submitted_at
  )
  values (
    v_user_id,
    p_programme_id,
    'submitted',
    now()
  )
  on conflict (user_id, programme_id) do update set
    status = 'submitted',
    submitted_at = now(),
    updated_at = now()
  returning id into v_sub_id;

  -- Save answers
  for v_item in select * from jsonb_array_elements(p_answers)
  loop
    v_q_id := (v_item->>'question_id')::uuid;
    v_ans_text := coalesce(v_item->>'answer_text', '');

    insert into public.exam_answers (submission_id, question_id, answer_text)
    values (v_sub_id, v_q_id, v_ans_text)
    on conflict (submission_id, question_id) do update set
      answer_text = excluded.answer_text;
  end loop;

  return jsonb_build_object(
    'submission_id', v_sub_id,
    'status', 'submitted',
    'submitted_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 9. GRADE WRITTEN EXAM (Instructor / Admin only)
create or replace function public.grade_exam(p_submission_id uuid, p_marks numeric, p_comment text)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_grade_letter text;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Only instructors or administrators can grade exams.';
  end if;

  if p_marks >= 90 then
    v_grade_letter := 'A (' || round(p_marks)::text || '%)';
  elsif p_marks >= 80 then
    v_grade_letter := 'B (' || round(p_marks)::text || '%)';
  elsif p_marks >= 70 then
    v_grade_letter := 'C (' || round(p_marks)::text || '%)';
  else
    v_grade_letter := 'Fail (' || round(p_marks)::text || '%)';
  end if;

  update public.exam_submissions
  set status = 'graded',
      score = p_marks,
      grade = v_grade_letter,
      instructor_comment = p_comment,
      graded_by = v_user_id,
      graded_at = now(),
      updated_at = now()
  where id = p_submission_id;

  return jsonb_build_object(
    'submission_id', p_submission_id,
    'status', 'graded',
    'score', p_marks,
    'grade', v_grade_letter
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 10. STORAGE BUCKETS CONFIGURATION
insert into storage.buckets (id, name, public)
values
  ('course-files', 'course-files', false),
  ('job-descriptions', 'job-descriptions', false),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage RLS Policies
-- A. course-files: authenticated users can read course files for their programme
create policy "course_files_auth_select" on storage.objects
for select using (
  bucket_id = 'course-files'
  and (auth.role() = 'authenticated')
);

create policy "course_files_admin_all" on storage.objects
for all using (
  bucket_id = 'course-files' and public.is_admin()
);

-- B. job-descriptions: authenticated users can read and download JDs
create policy "job_descriptions_auth_select" on storage.objects
for select using (
  bucket_id = 'job-descriptions'
  and (auth.role() = 'authenticated')
);

create policy "job_descriptions_admin_all" on storage.objects
for all using (
  bucket_id = 'job-descriptions' and public.is_admin()
);

-- C. avatars: public read, authenticated user can upload own avatar
create policy "avatars_public_select" on storage.objects
for select using (bucket_id = 'avatars');

create policy "avatars_auth_insert" on storage.objects
for insert with check (
  bucket_id = 'avatars' and auth.role() = 'authenticated'
);

create policy "avatars_auth_update" on storage.objects
for update using (
  bucket_id = 'avatars' and auth.uid() = owner
);

