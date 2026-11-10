-- ====================================================================
-- IKAAI ACADEMY – REALTIME TEAM CHAT & LIVE DIRECTORY SYNC
-- Migration: 20261106_10_realtime_chat_and_members.sql
-- ====================================================================

-- 1. Drop existing policies FIRST so column types can be altered
drop policy if exists "chat_conv_select" on public.chat_conversations;
drop policy if exists "chat_conv_insert" on public.chat_conversations;
drop policy if exists "chat_conv_update" on public.chat_conversations;
drop policy if exists "chat_conversations_open" on public.chat_conversations;

drop policy if exists "chat_msg_select" on public.chat_messages;
drop policy if exists "chat_msg_insert" on public.chat_messages;
drop policy if exists "chat_msg_update" on public.chat_messages;
drop policy if exists "chat_msg_delete" on public.chat_messages;
drop policy if exists "chat_messages_open" on public.chat_messages;

drop policy if exists "chat_attachments_open" on public.chat_attachments;
drop policy if exists "chat_reactions_open" on public.chat_reactions;

-- 2. Drop foreign key constraints
alter table if exists public.chat_attachments drop constraint if exists chat_attachments_conversation_id_fkey;
alter table if exists public.chat_messages drop constraint if exists chat_messages_conversation_id_fkey;
alter table if exists public.chat_conversation_members drop constraint if exists chat_conversation_members_conversation_id_fkey;

-- 3. Alter column types to text
alter table if exists public.chat_conversations alter column id type text;
alter table if exists public.chat_messages alter column conversation_id type text;
alter table if exists public.chat_attachments alter column conversation_id type text;
alter table if exists public.chat_conversation_members alter column conversation_id type text;

-- 4. Seed default community channels
insert into public.chat_conversations (id, name, type, slug, description, is_announcement_only)
values 
  ('all-members', 'All Members', 'all_members', 'all-members', 'Programme-wide community for all learners, mentors, and staff.', false),
  ('general', '#general', 'channel', 'general', 'General discussions, questions, and daily updates.', false)
on conflict (id) do nothing;

-- 5. Create open test policies
alter table if exists public.chat_conversations enable row level security;
alter table if exists public.chat_messages enable row level security;
alter table if exists public.chat_attachments enable row level security;
alter table if exists public.chat_reactions enable row level security;

create policy "chat_conversations_open" on public.chat_conversations for all to authenticated using (true) with check (true);
create policy "chat_messages_open" on public.chat_messages for all to authenticated using (true) with check (true);
create policy "chat_attachments_open" on public.chat_attachments for all to authenticated using (true) with check (true);
create policy "chat_reactions_open" on public.chat_reactions for all to authenticated using (true) with check (true);

-- 6. Enable Realtime Replication
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
