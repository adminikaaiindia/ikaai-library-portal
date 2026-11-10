-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — REAL-TIME TEAM CHAT SCHEMA
-- Migration: 20261103_team_chat_schema.sql
-- ====================================================================

-- 1. EXTEND PROFILES WITH LAST_SEEN AND CHAT STATUS
alter table public.profiles add column if not exists last_seen timestamptz default now();
alter table public.profiles add column if not exists chat_status text default 'online' check (chat_status in ('online', 'away', 'dnd', 'offline'));

-- 2. CONVERSATIONS TABLE
-- Types: 'all_members' (programme-wide), 'channel' (public in programme), 'direct' (1:1), 'group' (multi-member)
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  programme text not null default 'hr',
  type text not null check (type in ('all_members', 'channel', 'direct', 'group')),
  name text,
  slug text,
  description text,
  icon text,
  is_announcement_only boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

-- Index for querying conversations by programme and type
create index if not exists idx_conversations_programme_type on public.conversations (programme, type);
create index if not exists idx_conversations_last_message on public.conversations (last_message_at desc);

-- 3. CONVERSATION MEMBERS TABLE
create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'moderator', 'member')),
  is_muted boolean not null default false,
  mute_until timestamptz,
  notification_pref text not null default 'all' check (notification_pref in ('all', 'mentions', 'none')),
  last_read_at timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create index if not exists idx_conv_members_user on public.conversation_members (user_id);
create index if not exists idx_conv_members_conv on public.conversation_members (conversation_id);

-- 4. MESSAGES TABLE
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  sender_name text not null,
  sender_role text not null default 'learner' check (sender_role in ('learner', 'instructor', 'admin')),
  sender_avatar text,
  content text not null,
  parent_message_id uuid references public.messages(id) on delete set null,
  is_edited boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_messages_conv_created on public.messages (conversation_id, created_at asc);
create index if not exists idx_messages_parent on public.messages (parent_message_id) where parent_message_id is not null;
create index if not exists idx_messages_sender on public.messages (sender_id);

-- Full-text search index for messages
create index if not exists idx_messages_content_fts on public.messages using gin (to_tsvector('english', content));

-- 5. MESSAGE ATTACHMENTS TABLE
create table if not exists public.message_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  file_name text not null,
  file_type text not null,
  file_size integer not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_attachments_msg on public.message_attachments (message_id);

-- 6. MESSAGE REACTIONS TABLE
create table if not exists public.message_reactions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null,
  emoji text not null,
  created_at timestamptz not null default now(),
  constraint uq_message_reaction unique (message_id, user_id, emoji)
);

create index if not exists idx_reactions_msg on public.message_reactions (message_id);

-- 7. MESSAGE MENTIONS TABLE
create table if not exists public.message_mentions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  mention_type text not null default 'user' check (mention_type in ('user', 'everyone', 'instructors')),
  created_at timestamptz not null default now()
);

create index if not exists idx_mentions_user on public.message_mentions (user_id);
create index if not exists idx_mentions_msg on public.message_mentions (message_id);

-- 8. PINNED MESSAGES TABLE
create table if not exists public.pinned_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  message_id uuid not null references public.messages(id) on delete cascade,
  pinned_by uuid references auth.users(id) on delete set null,
  pinned_at timestamptz not null default now(),
  constraint uq_pinned_message unique (conversation_id, message_id)
);

create index if not exists idx_pinned_conv on public.pinned_messages (conversation_id);

-- 9. SHARED PORTAL CONTENT TABLE (Modules, JDs, FAQs shared into chat)
create table if not exists public.shared_items (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  item_type text not null check (item_type in ('module', 'jd', 'faq')),
  item_id text not null,
  item_title text not null,
  item_snippet text,
  item_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_shared_items_msg on public.shared_items (message_id);

-- 10. USER CHAT SETTINGS TABLE
create table if not exists public.user_chat_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  dnd_enabled boolean not null default false,
  sound_enabled boolean not null default true,
  desktop_notifications boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ====================================================================
-- AUTOMATION TRIGGERS & FUNCTIONS
-- ====================================================================

-- Function: update last_message_at on conversations when a message is sent
create or replace function public.fn_update_conversation_last_message()
returns trigger as $$
begin
  update public.conversations
  set last_message_at = new.created_at,
      updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_update_conversation_last_message on public.messages;
create trigger trg_update_conversation_last_message
after insert on public.messages
for each row execute function public.fn_update_conversation_last_message();

-- Function: rate limit message sending (max 20 messages per minute per user)
create or replace function public.fn_check_message_rate_limit()
returns trigger as $$
declare
  recent_count integer;
begin
  if new.sender_id is not null then
    select count(*) into recent_count
    from public.messages
    where sender_id = new.sender_id
      and created_at > (now() - interval '1 minute');

    if recent_count >= 20 then
      raise exception 'Rate limit exceeded. You can only send 20 messages per minute.';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_check_message_rate_limit on public.messages;
create trigger trg_check_message_rate_limit
before insert on public.messages
for each row execute function public.fn_check_message_rate_limit();

-- Function: auto-enroll new users into programme All-Members and default channels
create or replace function public.fn_auto_enroll_user_in_chat()
returns trigger as $$
declare
  conv_record record;
begin
  -- Ensure default conversations exist for the user's programme
  -- 1. All Members
  insert into public.conversations (programme, type, name, slug, description, is_announcement_only)
  values (new.programme, 'all_members', 'All Members', 'all-members', 'Programme-wide community for all learners, mentors, and staff', false)
  on conflict do nothing;

  -- 2. #general
  insert into public.conversations (programme, type, name, slug, description)
  values (new.programme, 'channel', '#general', 'general', 'General discussions, questions, and daily updates')
  on conflict do nothing;

  -- 3. #help-and-doubts
  insert into public.conversations (programme, type, name, slug, description)
  values (new.programme, 'channel', '#help-and-doubts', 'help-and-doubts', 'Ask peers and instructors for help with exercises and projects')
  on conflict do nothing;

  -- 4. #introductions
  insert into public.conversations (programme, type, name, slug, description)
  values (new.programme, 'channel', '#introductions', 'introductions', 'Introduce yourself and share your background and goals')
  on conflict do nothing;

  -- Add user as member to All Members and all public channels for this programme
  for conv_record in
    select id from public.conversations
    where programme = new.programme and type in ('all_members', 'channel')
  loop
    insert into public.conversation_members (conversation_id, user_id, role)
    values (conv_record.id, new.id, case when new.role = 'admin' then 'admin' else 'member' end)
    on conflict (conversation_id, user_id) do nothing;
  end loop;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_auto_enroll_user_in_chat on public.profiles;
create trigger trg_auto_enroll_user_in_chat
after insert or update of programme on public.profiles
for each row execute function public.fn_auto_enroll_user_in_chat();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.message_attachments enable row level security;
alter table public.message_reactions enable row level security;
alter table public.message_mentions enable row level security;
alter table public.pinned_messages enable row level security;
alter table public.shared_items enable row level security;
alter table public.user_chat_settings enable row level security;

-- Conversations RLS:
-- Users can read conversations they are a member of, or any public channel/all-members in their programme
create policy "conversations_select_policy" on public.conversations
for select using (
  type in ('all_members', 'channel')
  or id in (select conversation_id from public.conversation_members where user_id = auth.uid())
);

-- Users can insert direct or group conversations; only instructors/admins can create channels
create policy "conversations_insert_policy" on public.conversations
for insert with check (
  auth.uid() is not null
  and (
    type in ('direct', 'group')
    or (
      type in ('channel', 'all_members')
      and exists (
        select 1 from public.profiles
        where id = auth.uid() and role in ('instructor', 'admin')
      )
    )
  )
);

-- Group admins or instructors can update conversations (e.g. rename group, toggle announcement mode)
create policy "conversations_update_policy" on public.conversations
for update using (
  exists (
    select 1 from public.conversation_members
    where conversation_id = id and user_id = auth.uid() and role in ('admin', 'moderator')
  )
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('instructor', 'admin')
  )
);

-- Conversation Members RLS:
create policy "conv_members_select_policy" on public.conversation_members
for select using (
  -- Can view members if user is in that conversation or if it is a public channel / all_members
  conversation_id in (
    select id from public.conversations
    where type in ('all_members', 'channel')
       or id in (select cm2.conversation_id from public.conversation_members cm2 where cm2.user_id = auth.uid())
  )
);

create policy "conv_members_insert_policy" on public.conversation_members
for insert with check (
  auth.uid() is not null
  and (
    -- Group admin or instructor can add members, or self-join public channels
    exists (
      select 1 from public.conversation_members
      where conversation_id = conversation_members.conversation_id and user_id = auth.uid() and role in ('admin', 'moderator')
    )
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('instructor', 'admin')
    )
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.conversations
        where id = conversation_members.conversation_id and type in ('channel', 'all_members', 'direct', 'group')
      )
    )
  )
);

create policy "conv_members_update_policy" on public.conversation_members
for update using (
  user_id = auth.uid()
  or exists (
    select 1 from public.conversation_members
    where conversation_id = conversation_members.conversation_id and user_id = auth.uid() and role in ('admin', 'moderator')
  )
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('instructor', 'admin')
  )
);

create policy "conv_members_delete_policy" on public.conversation_members
for delete using (
  -- Member leaving self, or group admin removing member
  user_id = auth.uid()
  or exists (
    select 1 from public.conversation_members
    where conversation_id = conversation_members.conversation_id and user_id = auth.uid() and role = 'admin'
  )
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('instructor', 'admin')
  )
);

-- Messages RLS:
create policy "messages_select_policy" on public.messages
for select using (
  conversation_id in (
    select id from public.conversations
    where type in ('all_members', 'channel')
       or id in (select conversation_id from public.conversation_members where user_id = auth.uid())
  )
);

create policy "messages_insert_policy" on public.messages
for insert with check (
  auth.uid() is not null
  and sender_id = auth.uid()
  and (
    -- If announcement only, must be instructor or admin
    not exists (
      select 1 from public.conversations
      where id = messages.conversation_id and is_announcement_only = true
    )
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('instructor', 'admin')
    )
  )
  and (
    conversation_id in (
      select id from public.conversations where type in ('all_members', 'channel')
    )
    or exists (
      select 1 from public.conversation_members
      where conversation_id = messages.conversation_id and user_id = auth.uid()
    )
  )
);

create policy "messages_update_policy" on public.messages
for update using (
  -- Sender can edit own message, or instructor/admin can soft-delete
  (sender_id = auth.uid())
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('instructor', 'admin')
  )
);

-- Reactions RLS:
create policy "reactions_select_policy" on public.message_reactions
for select using (
  message_id in (select id from public.messages)
);

create policy "reactions_insert_policy" on public.message_reactions
for insert with check (
  auth.uid() is not null and user_id = auth.uid()
);

create policy "reactions_delete_policy" on public.message_reactions
for delete using (
  user_id = auth.uid()
);

-- Attachments RLS:
create policy "attachments_select_policy" on public.message_attachments
for select using (
  message_id in (select id from public.messages)
);

create policy "attachments_insert_policy" on public.message_attachments
for insert with check (
  auth.uid() is not null
);

-- Mentions RLS:
create policy "mentions_select_policy" on public.message_mentions
for select using (
  message_id in (select id from public.messages)
);

create policy "mentions_insert_policy" on public.message_mentions
for insert with check (
  auth.uid() is not null
);

-- Pinned Messages RLS:
create policy "pinned_messages_select_policy" on public.pinned_messages
for select using (
  conversation_id in (select id from public.conversations)
);

create policy "pinned_messages_insert_policy" on public.pinned_messages
for insert with check (
  auth.uid() is not null
);

create policy "pinned_messages_delete_policy" on public.pinned_messages
for delete using (
  pinned_by = auth.uid()
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('instructor', 'admin')
  )
);

-- Shared Items RLS:
create policy "shared_items_select_policy" on public.shared_items
for select using (
  message_id in (select id from public.messages)
);

create policy "shared_items_insert_policy" on public.shared_items
for insert with check (
  auth.uid() is not null
);

-- User Chat Settings RLS:
create policy "settings_select_policy" on public.user_chat_settings
for select using (user_id = auth.uid());

create policy "settings_upsert_policy" on public.user_chat_settings
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Storage Bucket Setup for Chat Attachments
insert into storage.buckets (id, name, public)
values ('chat-attachments', 'chat-attachments', true)
on conflict (id) do nothing;

create policy "chat_attachments_public_read" on storage.objects
for select using (bucket_id = 'chat-attachments');

create policy "chat_attachments_auth_insert" on storage.objects
for insert with check (
  bucket_id = 'chat-attachments' and auth.role() = 'authenticated'
);

create policy "chat_attachments_auth_delete" on storage.objects
for delete using (
  bucket_id = 'chat-attachments' and auth.uid() = owner
);

-- Enable Realtime for Chat Tables
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.conversation_members;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.message_reactions;
alter publication supabase_realtime add table public.pinned_messages;

