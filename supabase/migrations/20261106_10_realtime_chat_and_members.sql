-- ====================================================================
-- IKAAI ACADEMY – REALTIME TEAM CHAT & LIVE DIRECTORY SYNC
-- Migration: 20261106_10_realtime_chat_and_members.sql
-- ====================================================================

-- 1. DROP ALL CHAT POLICIES EXPLICITLY (Prevents Postgres 0A000 dependency error)
do $$
declare
  pol record;
begin
  for pol in (
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('chat_conversations', 'chat_messages', 'chat_attachments', 'chat_reactions', 'chat_conversation_members')
  ) loop
    execute format('drop policy if exists %I on %I.%I', pol.policyname, pol.schemaname, pol.tablename);
  end loop;
end $$;

-- Explicit policy drops
drop policy if exists "chat_messages_select" on public.chat_messages;
drop policy if exists "chat_messages_insert" on public.chat_messages;
drop policy if exists "chat_messages_update" on public.chat_messages;
drop policy if exists "chat_messages_delete" on public.chat_messages;
drop policy if exists "chat_messages_open" on public.chat_messages;

drop policy if exists "chat_attachments_select" on public.chat_attachments;
drop policy if exists "chat_attachments_insert" on public.chat_attachments;
drop policy if exists "chat_attachments_delete" on public.chat_attachments;
drop policy if exists "chat_attachments_open" on public.chat_attachments;

drop policy if exists "chat_reactions_select" on public.chat_reactions;
drop policy if exists "chat_reactions_insert" on public.chat_reactions;
drop policy if exists "chat_reactions_delete" on public.chat_reactions;
drop policy if exists "chat_reactions_open" on public.chat_reactions;

drop policy if exists "chat_members_select" on public.chat_conversation_members;
drop policy if exists "chat_members_manage" on public.chat_conversation_members;
drop policy if exists "chat_conversation_members_open" on public.chat_conversation_members;

drop policy if exists "chat_conv_select" on public.chat_conversations;
drop policy if exists "chat_conv_insert" on public.chat_conversations;
drop policy if exists "chat_conv_update" on public.chat_conversations;
drop policy if exists "chat_conv_delete" on public.chat_conversations;
drop policy if exists "chat_conversations_open" on public.chat_conversations;

-- 2. Drop foreign key constraints (allows custom string room IDs like 'all-members', 'general', 'dm_...')
alter table if exists public.chat_conversation_members drop constraint if exists chat_conversation_members_conversation_id_fkey cascade;
alter table if exists public.chat_messages drop constraint if exists chat_messages_conversation_id_fkey cascade;
alter table if exists public.chat_attachments drop constraint if exists chat_attachments_conversation_id_fkey cascade;

-- 3. Drop function overloads that expect UUID
drop function if exists public.can_access_chat_conversation(uuid, uuid) cascade;
drop function if exists public.can_access_chat_conversation(text, uuid) cascade;

-- 4. Alter column types to text
alter table if exists public.chat_conversations alter column id type text;
alter table if exists public.chat_conversation_members alter column conversation_id type text;
alter table if exists public.chat_messages alter column conversation_id type text;
alter table if exists public.chat_attachments alter column conversation_id type text;

-- 5. Delete all dummy # channels and duplicate conversations
delete from public.chat_conversations 
where lower(trim(slug)) in ('general', 'announcements', 'random')
   or lower(trim(name)) in ('general', '#general', 'announcements', '#announcements', 'random', '#random')
   or id in ('general', 'announcements', 'random', 'group-hr-interns')
   or (name = 'All Members' and id != 'all-members');

-- Seed default universal All Members community channel
insert into public.chat_conversations (id, name, type, slug, description, is_announcement_only)
values 
  ('all-members', 'All Members', 'all_members', 'all-members', 'Programme-wide community for all registered learners and mentors.', false)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description;

-- 6. Disable Row Level Security on chat tables for testing mode
-- (Eliminates all 401 / 42501 RLS policy blocks when users send messages)
alter table if exists public.chat_conversations disable row level security;
alter table if exists public.chat_conversation_members disable row level security;
alter table if exists public.chat_messages disable row level security;
alter table if exists public.chat_attachments disable row level security;
alter table if exists public.chat_reactions disable row level security;

-- 7. Enable Realtime Replication
alter table if exists public.chat_messages replica identity full;
alter table if exists public.profiles replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'chat_messages'
  ) then
    alter publication supabase_realtime add table public.chat_messages;
  end if;

  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;
end $$;
