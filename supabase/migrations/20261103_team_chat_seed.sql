-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — REAL-TIME TEAM CHAT INITIAL SEED DATA
-- Migration: 20261103_team_chat_seed.sql
-- ====================================================================

-- 1. Insert standard channels for Human Resources programme if not present
insert into public.conversations (id, programme, type, name, slug, description, is_announcement_only)
values
  ('c0000000-0000-0000-0000-000000000001', 'hr', 'all_members', 'All Members', 'all-members', 'Programme-wide community for all learners, mentors, and staff', false),
  ('c0000000-0000-0000-0000-000000000002', 'hr', 'channel', '#general', 'general', 'General discussions, questions, and daily updates', false),
  ('c0000000-0000-0000-0000-000000000003', 'hr', 'channel', '#help-and-doubts', 'help-and-doubts', 'Ask peers and instructors for help with exercises and projects', false),
  ('c0000000-0000-0000-0000-000000000004', 'hr', 'channel', '#introductions', 'introductions', 'Introduce yourself and share your background and goals', false)
on conflict (id) do nothing;

-- 2. Sample welcome messages in #general and All Members
insert into public.messages (id, conversation_id, sender_name, sender_role, content, created_at)
values
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Devashish Chauhan',
    'instructor',
    'Welcome everyone to the Ikaai India Foundation HR & Operations Programme! Please check your learning modules and reach out here if you have any questions. Best of luck!',
    now() - interval '2 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000002',
    'Neha Singhal',
    'instructor',
    'Hi team! Feel free to discuss module exercises and practical case studies in this channel.',
    now() - interval '1 day'
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    'c0000000-0000-0000-0000-000000000004',
    'Gehna Sahni',
    'instructor',
    'Hello everyone! Please say hello and tell us what you hope to learn during your internship.',
    now() - interval '18 hours'
  )
on conflict (id) do nothing;

-- 3. Pin the welcome message in All Members
insert into public.pinned_messages (conversation_id, message_id, pinned_at)
values
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', now() - interval '2 days')
on conflict do nothing;

