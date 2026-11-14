-- ====================================================================
-- IKAAI ACADEMY / LIBRARY - MIGRATION 20261114_16
-- FIX HOME DASHBOARD SUMMARY: 100% TYPE-SAFE UUID / TEXT CASTING
--
-- Fixes:
--   1. Drop existing function first so PostgREST clears any cached signature.
--   2. Symmetrically cast all user IDs, sender IDs, conversation IDs, and
--      programme IDs to ::text on joins and equality / inequality filters.
--      This guarantees Postgres will NEVER throw 'operator does not exist: uuid <> text'
--      or 'operator does not exist: uuid = text' regardless of table column types.
--   3. Notify PostgREST to immediately flush and reload its schema cache.
-- ====================================================================

begin;

drop function if exists public.get_dashboard_summary() cascade;

create or replace function public.get_dashboard_summary()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_caller_id uuid := auth.uid();
  v_caller_id_text text := auth.uid()::text;
  v_user record;
  v_role text;
  v_prog_id uuid;
  v_prog_id_text text;
  v_prog record;
  v_result jsonb;

  -- Learner variables
  v_mod_record record;
  v_modules jsonb := '[]'::jsonb;
  v_total_modules int := 0;
  v_completed_modules int := 0;
  v_prev_completed boolean := true;
  v_is_unlocked boolean := true;
  v_is_mod_completed boolean := false;
  v_timer_done boolean := false;
  v_next_step jsonb := null;
  v_quiz_score numeric := null;
  v_quiz_passed boolean := false;
  v_quiz_avg numeric := null;
  v_completion_pct numeric := 0;
  v_exam record;
  v_unread_announcements_count int := 0;
  v_recent_announcements jsonb := '[]'::jsonb;
  v_unack_announcements_count int := 0;
  v_unack_documents_count int := 0;
  v_unread_chat_count int := 0;
  v_unanswered_replies_count int := 0;
  v_instructors jsonb := '[]'::jsonb;

  -- Instructor variables
  v_ungraded_exams_count int := 0;
  v_open_threads_count int := 0;
  v_unreviewed_feedback_count int := 0;
  v_scheduled_announcements_count int := 0;
  v_active_learners_count int := 0;
  v_cohort_avg_completion numeric := 0;
  v_cohort_quiz_avg numeric := 0;
  v_exam_submitted_count int := 0;
  v_exam_graded_count int := 0;
  v_exam_not_submitted_count int := 0;
  v_inactive_learners jsonb := '[]'::jsonb;

  -- Admin variables
  v_pending_approval_count int := 0;
  v_admin_ungraded_exams_count int := 0;
  v_admin_open_threads_count int := 0;
  v_admin_unreviewed_feedback_count int := 0;
  v_draft_announcements_count int := 0;
  v_draft_documents_count int := 0;
  v_programmes_overview jsonb := '[]'::jsonb;
  v_active_users_count int := 0;
  v_invited_users_count int := 0;
  v_pending_users_count int := 0;
  v_revoked_users_count int := 0;

begin
  -- 1. Authentication check
  if v_caller_id is null then
    raise exception 'Authentication required.';
  end if;

  select id, role, programme_id, access_status, full_name, email
  into v_user
  from public.profiles
  where id::text = v_caller_id_text;

  if v_user.id is null or v_user.access_status is distinct from 'active' then
    raise exception 'Access denied: account is not active.';
  end if;

  v_role := lower(trim(coalesce(v_user.role, 'learner')));
  if v_role = 'intern' then
    v_role := 'learner';
  end if;
  v_prog_id := v_user.programme_id;
  v_prog_id_text := v_prog_id::text;

  -- ==================================================================
  -- A. LEARNER / INTERN PAYLOAD
  -- ==================================================================
  if v_role = 'learner' then
    if v_prog_id is not null then
      select id, name, slug into v_prog
      from public.programmes
      where id::text = v_prog_id_text;
    end if;

    -- Compute module progression and next step
    v_prev_completed := true;
    for v_mod_record in
      select
        m.id,
        m.number,
        m.title,
        m.timer_seconds,
        mp.opened_at,
        mp.timer_completed_at,
        mp.completed_at,
        mp.seconds_spent,
        qa.score as best_quiz_score,
        qa.total as quiz_total,
        qa.passed as quiz_passed
      from public.modules m
      left join public.module_progress mp
        on mp.module_id::text = m.id::text and mp.user_id::text = v_caller_id_text
      left join lateral (
        select qa_sub.score, qa_sub.total, qa_sub.passed
        from public.quiz_attempts qa_sub
        join public.quizzes q_sub on q_sub.id::text = qa_sub.quiz_id::text
        where q_sub.module_id::text = m.id::text and qa_sub.user_id::text = v_caller_id_text
        order by qa_sub.score desc, qa_sub.submitted_at desc
        limit 1
      ) qa on true
      where (v_prog_id is null or m.programme_id::text = v_prog_id_text)
      order by m.number asc, m.sort_order asc
    loop
      v_total_modules := v_total_modules + 1;
      v_is_mod_completed := (v_mod_record.completed_at is not null);
      if v_is_mod_completed then
        v_completed_modules := v_completed_modules + 1;
      end if;

      v_timer_done := (v_mod_record.timer_completed_at is not null or coalesce(v_mod_record.seconds_spent, 0) >= coalesce(v_mod_record.timer_seconds, 30));
      v_is_unlocked := v_prev_completed;

      -- Determine quiz score percentage
      if v_mod_record.quiz_total is not null and v_mod_record.quiz_total > 0 then
        v_quiz_score := round((v_mod_record.best_quiz_score / v_mod_record.quiz_total) * 100);
      else
        v_quiz_score := null;
      end if;
      v_quiz_passed := coalesce(v_mod_record.quiz_passed, false);

      -- Build module object
      v_modules := v_modules || jsonb_build_array(jsonb_build_object(
        'id', v_mod_record.id,
        'number', v_mod_record.number,
        'title', v_mod_record.title,
        'status', case
          when v_is_mod_completed then 'completed'
          when v_is_unlocked then 'in_progress'
          else 'locked'
        end,
        'is_unlocked', v_is_unlocked,
        'timer_completed', v_timer_done,
        'quiz_score', v_quiz_score,
        'quiz_passed', v_quiz_passed
      ));

      -- Check if this is the first unlocked, non-completed module for "next step"
      if v_next_step is null and v_is_unlocked and not v_is_mod_completed then
        v_next_step := jsonb_build_object(
          'type', 'module',
          'module_id', v_mod_record.id,
          'module_number', v_mod_record.number,
          'title', v_mod_record.title,
          'timer_completed', v_timer_done,
          'action_label', 'Continue module'
        );
      end if;

      v_prev_completed := v_is_mod_completed;
    end loop;

    -- If all modules are complete, check exam submission status
    select status, submitted_at, grade, score, instructor_comment, graded_at
    into v_exam
    from public.exam_submissions
    where user_id::text = v_caller_id_text
      and (v_prog_id is null or programme_id::text = v_prog_id_text or programme_id is null);

    if v_next_step is null and v_total_modules > 0 and v_completed_modules = v_total_modules then
      if v_exam.status is null or v_exam.status = 'not_submitted' then
        v_next_step := jsonb_build_object(
          'type', 'take_exam',
          'title', 'Take your written exam',
          'action_label', 'Start Written Exam'
        );
      elsif v_exam.status = 'submitted' and v_exam.grade is null then
        v_next_step := jsonb_build_object(
          'type', 'exam_waiting',
          'title', 'Waiting for your instructor to grade your exam',
          'action_label', 'View Submission'
        );
      elsif v_exam.status = 'graded' or v_exam.grade is not null then
        v_next_step := jsonb_build_object(
          'type', 'programme_complete',
          'title', 'Programme complete',
          'grade', v_exam.grade,
          'score', v_exam.score,
          'action_label', 'View Evaluation'
        );
      end if;
    elsif v_next_step is null and (v_prog_id is null or v_total_modules = 0) then
      v_next_step := jsonb_build_object(
        'type', 'pending_setup',
        'title', 'Programme curriculum setup in progress',
        'action_label', 'View Resources'
      );
    end if;

    -- Calculate completion percentage
    if v_total_modules > 0 then
      v_completion_pct := round((v_completed_modules::numeric / v_total_modules::numeric) * 100);
    else
      v_completion_pct := 0;
    end if;

    -- Calculate quiz average across attempted quizzes in this programme
    select round(avg((qa_best.score / nullif(qa_best.total, 0)) * 100))
    into v_quiz_avg
    from (
      select distinct on (q_sub.module_id) qa_sub.score, qa_sub.total
      from public.quiz_attempts qa_sub
      join public.quizzes q_sub on q_sub.id::text = qa_sub.quiz_id::text
      join public.modules m_sub on m_sub.id::text = q_sub.module_id::text
      where qa_sub.user_id::text = v_caller_id_text
        and (v_prog_id is null or m_sub.programme_id::text = v_prog_id_text)
      order by q_sub.module_id, qa_sub.score desc, qa_sub.submitted_at desc
    ) qa_best;

    -- Announcements: Unread count, unacknowledged count, top 3 recent
    select count(*)
    into v_unread_announcements_count
    from public.announcements a
    where a.status = 'published'
      and a.publish_at <= now()
      and (a.expires_at is null or a.expires_at > now())
      and (
        a.audience_type = 'all'
        or (a.audience_type = 'programme' and a.programme_id::text = v_prog_id_text)
        or (a.audience_type = 'role' and a.target_role in ('intern', 'learner'))
      )
      and not exists (
        select 1 from public.announcement_reads ar
        where ar.announcement_id::text = a.id::text and ar.user_id::text = v_caller_id_text
      );

    select count(*)
    into v_unack_announcements_count
    from public.announcements a
    where a.status = 'published'
      and a.publish_at <= now()
      and (a.expires_at is null or a.expires_at > now())
      and a.requires_ack = true
      and (
        a.audience_type = 'all'
        or (a.audience_type = 'programme' and a.programme_id::text = v_prog_id_text)
        or (a.audience_type = 'role' and a.target_role in ('intern', 'learner'))
      )
      and not exists (
        select 1 from public.announcement_acks ack
        where ack.announcement_id::text = a.id::text and ack.user_id::text = v_caller_id_text
      );

    select coalesce(jsonb_agg(jsonb_build_object(
      'id', a.id,
      'title', a.title,
      'category', a.category,
      'publish_at', a.publish_at,
      'is_pinned', a.is_pinned,
      'is_urgent', a.is_urgent,
      'requires_ack', a.requires_ack,
      'is_read', exists (select 1 from public.announcement_reads ar where ar.announcement_id::text = a.id::text and ar.user_id::text = v_caller_id_text)
    )), '[]'::jsonb)
    into v_recent_announcements
    from (
      select a.id, a.title, a.category, a.publish_at, a.is_pinned, a.is_urgent, a.requires_ack
      from public.announcements a
      where a.status = 'published'
        and a.publish_at <= now()
        and (a.expires_at is null or a.expires_at > now())
        and (
          a.audience_type = 'all'
          or (a.audience_type = 'programme' and a.programme_id::text = v_prog_id_text)
          or (a.audience_type = 'role' and a.target_role in ('intern', 'learner'))
        )
      order by a.is_pinned desc, a.publish_at desc
      limit 3
    ) a;

    -- Unacknowledged personal documents
    select count(*)
    into v_unack_documents_count
    from public.personal_documents
    where recipient_id::text = v_caller_id_text
      and requires_acknowledgement = true
      and acknowledged_at is null
      and coalesce(is_revoked, false) = false;

    -- Unread chat messages from chat_conversation_members.last_read_at
    -- Fully cast conversation_id, user_id, and sender_id to text for 100% type safety
    select coalesce(count(m.id), 0)
    into v_unread_chat_count
    from public.chat_conversation_members ccm
    join public.chat_messages m on m.conversation_id::text = ccm.conversation_id::text
    where ccm.user_id::text = v_caller_id_text
      and (ccm.last_read_at is null or m.created_at > ccm.last_read_at)
      and (m.sender_id is null or m.sender_id::text != v_caller_id_text)
      and coalesce(m.is_deleted, false) = false;

    -- Unanswered replies in Message Instructor
    select count(*)
    into v_unanswered_replies_count
    from public.message_threads t
    where t.learner_id::text = v_caller_id_text
      and lower(t.status) = 'answered';

    -- Programme instructors list
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', p.id,
      'name', coalesce(p.full_name, 'Instructor'),
      'role', p.role,
      'avatar_url', p.avatar_url
    )), '[]'::jsonb)
    into v_instructors
    from public.profiles p
    where (v_prog_id is null or p.programme_id::text = v_prog_id_text)
      and p.role = 'instructor'
      and p.access_status = 'active';

    v_result := jsonb_build_object(
      'role', 'learner',
      'user', jsonb_build_object(
        'first_name', split_part(coalesce(v_user.full_name, v_user.email, 'Learner'), ' ', 1),
        'full_name', v_user.full_name,
        'email', v_user.email,
        'programme_id', v_prog_id,
        'programme_name', coalesce(v_prog.name, 'Programme')
      ),
      'next_step', v_next_step,
      'progress', jsonb_build_object(
        'completion_percentage', v_completion_pct,
        'total_modules', v_total_modules,
        'completed_modules', v_completed_modules,
        'quiz_average', v_quiz_avg,
        'modules', v_modules
      ),
      'attention', jsonb_build_object(
        'unread_announcements_count', v_unread_announcements_count,
        'recent_announcements', v_recent_announcements,
        'unacknowledged_announcements_count', v_unack_announcements_count,
        'unacknowledged_documents_count', v_unack_documents_count,
        'unread_chat_messages_count', v_unread_chat_count,
        'unanswered_replies_count', v_unanswered_replies_count
      ),
      'exam', jsonb_build_object(
        'status', coalesce(v_exam.status, 'not_started'),
        'submitted_at', v_exam.submitted_at,
        'grade', v_exam.grade,
        'score', v_exam.score,
        'instructor_comment', v_exam.instructor_comment,
        'graded_at', v_exam.graded_at
      ),
      'instructors', v_instructors
    );

    return v_result;

  -- ==================================================================
  -- B. INSTRUCTOR PAYLOAD (Own programme only)
  -- ==================================================================
  elsif v_role = 'instructor' then
    if not (public.is_admin() or public.is_instructor_for(v_prog_id)) then
      raise exception 'Access denied: not an instructor for this programme.';
    end if;

    if v_prog_id is not null then
      select id, name, slug into v_prog
      from public.programmes
      where id::text = v_prog_id_text;
    end if;

    -- 1. Needs attention counts
    select count(*)
    into v_ungraded_exams_count
    from public.exam_submissions
    where programme_id::text = v_prog_id_text
      and status = 'submitted'
      and grade is null;

    select count(*)
    into v_open_threads_count
    from public.message_threads
    where programme_id::text = v_prog_id_text
      and lower(status) = 'open';

    select count(*)
    into v_unreviewed_feedback_count
    from public.feedback
    where programme_id::text = v_prog_id_text
      and (status = 'new' or reviewed_at is null);

    select count(*)
    into v_scheduled_announcements_count
    from public.announcements
    where created_by::text = v_caller_id_text
      and status = 'published'
      and publish_at > now()
      and publish_at <= (now() + interval '7 days');

    -- 2. Cohort snapshot
    select count(*)
    into v_active_learners_count
    from public.profiles
    where programme_id::text = v_prog_id_text
      and role in ('intern', 'learner')
      and access_status = 'active';

    -- Average completion percentage across active learners in this programme
    select coalesce(round(avg(sub.pct)), 0)
    into v_cohort_avg_completion
    from (
      select
        case when count(m.id) = 0 then 0
             else round((count(mp.completed_at)::numeric / count(m.id)::numeric) * 100)
        end as pct
      from public.profiles u
      cross join public.modules m
      left join public.module_progress mp
        on mp.module_id::text = m.id::text and mp.user_id::text = u.id::text and mp.completed_at is not null
      where u.programme_id::text = v_prog_id_text
        and u.role in ('intern', 'learner')
        and u.access_status = 'active'
        and m.programme_id::text = v_prog_id_text
      group by u.id
    ) sub;

    -- Quiz average across active learners in this programme
    select coalesce(round(avg((qa.score / nullif(qa.total, 0)) * 100)), 0)
    into v_cohort_quiz_avg
    from public.quiz_attempts qa
    join public.profiles u on u.id::text = qa.user_id::text
    join public.quizzes q on q.id::text = qa.quiz_id::text
    join public.modules m on m.id::text = q.module_id::text
    where u.programme_id::text = v_prog_id_text
      and u.role in ('intern', 'learner')
      and u.access_status = 'active'
      and m.programme_id::text = v_prog_id_text;

    -- Exam status counts
    select count(*)
    into v_exam_submitted_count
    from public.exam_submissions
    where programme_id::text = v_prog_id_text
      and status = 'submitted'
      and grade is null;

    select count(*)
    into v_exam_graded_count
    from public.exam_submissions
    where programme_id::text = v_prog_id_text
      and status = 'graded';

    v_exam_not_submitted_count := greatest(0, v_active_learners_count - (v_exam_submitted_count + v_exam_graded_count));

    -- Inactive learners for 7 days (name and last_seen only)
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', p.id,
      'name', coalesce(p.full_name, 'Learner'),
      'last_seen', p.last_seen
    )), '[]'::jsonb)
    into v_inactive_learners
    from (
      select p.id, p.full_name, p.last_seen
      from public.profiles p
      where p.programme_id::text = v_prog_id_text
        and p.role in ('intern', 'learner')
        and p.access_status = 'active'
        and (p.last_seen is null or p.last_seen < (now() - interval '7 days'))
      order by p.last_seen asc nulls first
      limit 10
    ) p;

    v_result := jsonb_build_object(
      'role', 'instructor',
      'user', jsonb_build_object(
        'first_name', split_part(coalesce(v_user.full_name, v_user.email, 'Instructor'), ' ', 1),
        'full_name', v_user.full_name,
        'email', v_user.email,
        'programme_id', v_prog_id,
        'programme_name', coalesce(v_prog.name, 'Programme')
      ),
      'attention', jsonb_build_object(
        'ungraded_exams_count', v_ungraded_exams_count,
        'open_threads_count', v_open_threads_count,
        'unreviewed_feedback_count', v_unreviewed_feedback_count,
        'scheduled_announcements_count', v_scheduled_announcements_count
      ),
      'cohort', jsonb_build_object(
        'active_learners_count', v_active_learners_count,
        'avg_completion_percentage', v_cohort_avg_completion,
        'quiz_average', v_cohort_quiz_avg,
        'exam_counts', jsonb_build_object(
          'not_submitted', v_exam_not_submitted_count,
          'submitted', v_exam_submitted_count,
          'graded', v_exam_graded_count
        ),
        'inactive_learners', v_inactive_learners
      )
    );

    return v_result;

  -- ==================================================================
  -- C. ADMIN PAYLOAD (All programmes)
  -- ==================================================================
  elsif v_role = 'admin' then
    if not public.is_admin() then
      raise exception 'Access denied: administrator privileges required.';
    end if;

    -- 1. Needs attention counts
    select count(*)
    into v_pending_approval_count
    from public.profiles
    where access_status = 'pending';

    select count(*)
    into v_admin_ungraded_exams_count
    from public.exam_submissions
    where status = 'submitted' and grade is null;

    select count(*)
    into v_admin_open_threads_count
    from public.message_threads
    where lower(status) = 'open';

    select count(*)
    into v_admin_unreviewed_feedback_count
    from public.feedback
    where status = 'new' or reviewed_at is null;

    select count(*)
    into v_draft_announcements_count
    from public.announcements
    where status = 'draft';

    select count(*)
    into v_draft_documents_count
    from public.company_documents
    where is_published = false and is_archived = false;

    -- 2. Access snapshot counts
    select count(*) into v_active_users_count from public.profiles where access_status = 'active';
    select count(*) into v_invited_users_count from public.access_invites where status = 'invited';
    select count(*) into v_pending_users_count from public.profiles where access_status = 'pending';
    select count(*) into v_revoked_users_count from public.profiles where access_status = 'revoked';

    -- 3. Programme overview table for each of the 5 programmes
    select coalesce(jsonb_agg(jsonb_build_object(
      'programme_id', prog_data.id,
      'programme_name', prog_data.name,
      'programme_slug', prog_data.slug,
      'active_learners_count', prog_data.active_learners,
      'avg_completion_percentage', prog_data.avg_completion,
      'ungraded_exams_count', prog_data.ungraded_exams,
      'open_threads_count', prog_data.open_threads
    )), '[]'::jsonb)
    into v_programmes_overview
    from (
      select
        p.id,
        p.name,
        p.slug,
        p.sort_order,
        (
          select count(*)
          from public.profiles u
          where u.programme_id::text = p.id::text
            and u.role in ('intern', 'learner')
            and u.access_status = 'active'
        ) as active_learners,
        coalesce((
          select round(avg(sub.pct))
          from (
            select
              case when count(m.id) = 0 then 0
                   else round((count(mp.completed_at)::numeric / count(m.id)::numeric) * 100)
              end as pct
            from public.profiles u
            cross join public.modules m
            left join public.module_progress mp
              on mp.module_id::text = m.id::text and mp.user_id::text = u.id::text and mp.completed_at is not null
            where u.programme_id::text = p.id::text
              and u.role in ('intern', 'learner')
              and u.access_status = 'active'
              and m.programme_id::text = p.id::text
            group by u.id
          ) sub
        ), 0) as avg_completion,
        (
          select count(*)
          from public.exam_submissions es
          where es.programme_id::text = p.id::text
            and es.status = 'submitted'
            and es.grade is null
        ) as ungraded_exams,
        (
          select count(*)
          from public.message_threads mt
          where mt.programme_id::text = p.id::text
            and lower(mt.status) = 'open'
        ) as open_threads
      from public.programmes p
      order by p.sort_order asc
    ) prog_data;

    v_result := jsonb_build_object(
      'role', 'admin',
      'user', jsonb_build_object(
        'first_name', split_part(coalesce(v_user.full_name, v_user.email, 'Admin'), ' ', 1),
        'full_name', v_user.full_name,
        'email', v_user.email
      ),
      'attention', jsonb_build_object(
        'pending_approval_count', v_pending_approval_count,
        'ungraded_exams_count', v_admin_ungraded_exams_count,
        'open_threads_count', v_admin_open_threads_count,
        'unreviewed_feedback_count', v_admin_unreviewed_feedback_count,
        'draft_items_count', (v_draft_announcements_count + v_draft_documents_count),
        'draft_announcements_count', v_draft_announcements_count,
        'draft_documents_count', v_draft_documents_count
      ),
      'programmes_overview', v_programmes_overview,
      'access_snapshot', jsonb_build_object(
        'active_users_count', v_active_users_count,
        'invited_users_count', v_invited_users_count,
        'pending_users_count', v_pending_users_count,
        'revoked_users_count', v_revoked_users_count
      )
    );

    return v_result;

  else
    raise exception 'Unrecognized user role: %', v_role;
  end if;

end;
$$;

revoke all on function public.get_dashboard_summary() from public, anon;
grant execute on function public.get_dashboard_summary() to authenticated;

notify pgrst, 'reload schema';

commit;
