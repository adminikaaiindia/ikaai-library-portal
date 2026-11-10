-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — REAL-TIME TEAM CHAT & DOCUMENTS SCHEMA
-- Migration: 20261106_03_team_chat_and_documents.sql
-- Description: Robust, collision-free database schema and storage bucket
--              for team chat messaging, group channels, DMs, reactions,
--              and smooth document uploading and downloading.
-- ====================================================================

-- 1. EXTEND PROFILES WITH CHAT STATUS (IF NOT PRESENT)
alter table public.profiles add column if not exists last_seen timestamptz default now();
alter table public.profiles add column if not exists chat_status text default 'online' check (chat_status in ('online', 'away', 'dnd', 'offline'));

-- 2. CHAT CONVERSATIONS TABLE
-- Dedicated table to avoid any collision with existing support inbox or generic tables
create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid references public.programmes(id) on delete cascade,
  programme_slug text not null default 'hr',
  type text not null check (type in ('all_members', 'channel', 'direct', 'group')),
  name text not null,
  slug text,
  description text,
  icon text,
  is_announcement_only boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  last_message_preview text
);

create index if not exists idx_chat_conv_prog on public.chat_conversations(programme_slug, type);
create index if not exists idx_chat_conv_last_msg on public.chat_conversations(last_message_at desc);

-- 3. CHAT CONVERSATION MEMBERS TABLE
create table if not exists public.chat_conversation_members (
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'moderator', 'member')),
  is_muted boolean not null default false,
  mute_until timestamptz,
  notification_pref text not null default 'all' check (notification_pref in ('all', 'mentions', 'none')),
  last_read_at timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create index if not exists idx_chat_members_user on public.chat_conversation_members(user_id);
create index if not exists idx_chat_members_conv on public.chat_conversation_members(conversation_id);

-- 4. CHAT MESSAGES TABLE
-- Distinct from public.messages which is used by the Support Inbox (thread_id)
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  sender_name text not null,
  sender_role text not null default 'learner' check (sender_role in ('learner', 'instructor', 'admin')),
  sender_avatar text,
  content text not null default '',
  parent_message_id uuid references public.chat_messages(id) on delete set null,
  shared_item jsonb,
  is_pinned boolean not null default false,
  is_edited boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_chat_messages_conv_created on public.chat_messages(conversation_id, created_at asc);
create index if not exists idx_chat_messages_parent on public.chat_messages(parent_message_id) where parent_message_id is not null;
create index if not exists idx_chat_messages_sender on public.chat_messages(sender_id);

-- 5. CHAT ATTACHMENTS (DOCUMENTS & MEDIA) TABLE
create table if not exists public.chat_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.chat_messages(id) on delete cascade,
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  file_name text not null,
  file_size bigint not null default 0,
  mime_type text not null default 'application/octet-stream',
  storage_path text not null,
  public_url text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_chat_attachments_msg on public.chat_attachments(message_id);
create index if not exists idx_chat_attachments_conv on public.chat_attachments(conversation_id);
create index if not exists idx_chat_attachments_uploader on public.chat_attachments(uploaded_by);

-- 6. CHAT REACTIONS TABLE
create table if not exists public.chat_reactions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.chat_messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null,
  emoji text not null,
  created_at timestamptz not null default now(),
  constraint uq_chat_reaction unique (message_id, user_id, emoji)
);

create index if not exists idx_chat_reactions_msg on public.chat_reactions(message_id);

-- 7. CHAT ATTACHMENTS STORAGE BUCKET
insert into storage.buckets (id, name, public, file_size_limit)
values (
  'chat-attachments',
  'chat-attachments',
  true,
  52428800 -- 50 MB limit
)
on conflict (id) do update set
  public = true,
  file_size_limit = 52428800;

-- 8. SECURITY DEFINER HELPER FUNCTION FOR CONVERSATION ACCESS
create or replace function public.can_access_chat_conversation(conv_id uuid, check_user_id uuid)
returns boolean as $$
declare
  conv_type text;
  conv_prog_id uuid;
  conv_prog_slug text;
  user_prog_id uuid;
  user_prog_text text;
  user_role_val text;
begin
  if check_user_id is null then
    return false;
  end if;

  -- 1. Check user role: Admin can access any conversation
  select role, programme_id, programme into user_role_val, user_prog_id, user_prog_text
  from public.profiles
  where id = check_user_id;

  if user_role_val = 'admin' then
    return true;
  end if;

  -- 2. Get conversation details
  select type, programme_id, programme_slug into conv_type, conv_prog_id, conv_prog_slug
  from public.chat_conversations
  where id = conv_id;

  if not found then
    return false;
  end if;

  -- 3. Direct or Group: User must be an explicit member
  if conv_type in ('direct', 'group') then
    return exists (
      select 1 from public.chat_conversation_members
      where conversation_id = conv_id and user_id = check_user_id
    );
  end if;

  -- 4. All-Members or Channel: Accessible if user belongs to the same programme
  if conv_prog_id is not null and user_prog_id is not null and conv_prog_id = user_prog_id then
    return true;
  end if;

  if conv_prog_slug is not null and (
    lower(trim(conv_prog_slug)) = lower(trim(coalesce(user_prog_text, '')))
    or conv_prog_slug = 'all'
  ) then
    return true;
  end if;

  -- Fallback: Check if explicitly in conversation members
  return exists (
    select 1 from public.chat_conversation_members
    where conversation_id = conv_id and user_id = check_user_id
  );
end;
$$ language plpgsql security definer stable;

-- 9. ENABLE ROW LEVEL SECURITY
alter table public.chat_conversations enable row level security;
alter table public.chat_conversation_members enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_attachments enable row level security;
alter table public.chat_reactions enable row level security;

-- 10. RLS POLICIES FOR CHAT CONVERSATIONS
drop policy if exists "chat_conv_select" on public.chat_conversations;
create policy "chat_conv_select" on public.chat_conversations
  for select to authenticated
  using (public.can_access_chat_conversation(id, auth.uid()));

drop policy if exists "chat_conv_insert" on public.chat_conversations;
create policy "chat_conv_insert" on public.chat_conversations
  for insert to authenticated
  with check (
    type in ('direct', 'group')
    or public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

drop policy if exists "chat_conv_update" on public.chat_conversations;
create policy "chat_conv_update" on public.chat_conversations
  for update to authenticated
  using (
    created_by = auth.uid()
    or public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

-- 11. RLS POLICIES FOR CHAT MEMBERS
drop policy if exists "chat_members_select" on public.chat_conversation_members;
create policy "chat_members_select" on public.chat_conversation_members
  for select to authenticated
  using (public.can_access_chat_conversation(conversation_id, auth.uid()));

drop policy if exists "chat_members_manage" on public.chat_conversation_members;
create policy "chat_members_manage" on public.chat_conversation_members
  for all to authenticated
  using (
    user_id = auth.uid()
    or public.can_access_chat_conversation(conversation_id, auth.uid())
  );

-- 12. RLS POLICIES FOR CHAT MESSAGES
drop policy if exists "chat_messages_select" on public.chat_messages;
create policy "chat_messages_select" on public.chat_messages
  for select to authenticated
  using (public.can_access_chat_conversation(conversation_id, auth.uid()));

drop policy if exists "chat_messages_insert" on public.chat_messages;
create policy "chat_messages_insert" on public.chat_messages
  for insert to authenticated
  with check (
    public.can_access_chat_conversation(conversation_id, auth.uid())
    and (
      -- Check if announcement-only channel
      not exists (
        select 1 from public.chat_conversations
        where id = conversation_id and is_announcement_only = true
      )
      or public.get_user_role(auth.uid()) in ('instructor', 'admin')
    )
  );

drop policy if exists "chat_messages_update" on public.chat_messages;
create policy "chat_messages_update" on public.chat_messages
  for update to authenticated
  using (
    sender_id = auth.uid()
    or public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

drop policy if exists "chat_messages_delete" on public.chat_messages;
create policy "chat_messages_delete" on public.chat_messages
  for delete to authenticated
  using (
    sender_id = auth.uid()
    or public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

-- 13. RLS POLICIES FOR CHAT ATTACHMENTS
drop policy if exists "chat_attachments_select" on public.chat_attachments;
create policy "chat_attachments_select" on public.chat_attachments
  for select to authenticated
  using (public.can_access_chat_conversation(conversation_id, auth.uid()));

drop policy if exists "chat_attachments_insert" on public.chat_attachments;
create policy "chat_attachments_insert" on public.chat_attachments
  for insert to authenticated
  with check (
    public.can_access_chat_conversation(conversation_id, auth.uid())
  );

drop policy if exists "chat_attachments_delete" on public.chat_attachments;
create policy "chat_attachments_delete" on public.chat_attachments
  for delete to authenticated
  using (
    uploaded_by = auth.uid()
    or public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

-- 14. RLS POLICIES FOR CHAT REACTIONS
drop policy if exists "chat_reactions_select" on public.chat_reactions;
create policy "chat_reactions_select" on public.chat_reactions
  for select to authenticated
  using (
    exists (
      select 1 from public.chat_messages m
      where m.id = chat_reactions.message_id
      and public.can_access_chat_conversation(m.conversation_id, auth.uid())
    )
  );

drop policy if exists "chat_reactions_manage" on public.chat_reactions;
create policy "chat_reactions_manage" on public.chat_reactions
  for all to authenticated
  using (user_id = auth.uid());

-- 15. STORAGE POLICIES FOR CHAT-ATTACHMENTS BUCKET
drop policy if exists "chat_storage_select" on storage.objects;
create policy "chat_storage_select" on storage.objects
  for select to authenticated, anon
  using (bucket_id = 'chat-attachments');

drop policy if exists "chat_storage_insert" on storage.objects;
create policy "chat_storage_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'chat-attachments');

drop policy if exists "chat_storage_delete" on storage.objects;
create policy "chat_storage_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'chat-attachments'
    and (
      auth.uid() = owner
      or public.get_user_role(auth.uid()) in ('instructor', 'admin')
    )
  );

-- 16. TRIGGER TO UPDATE CONVERSATION LAST MESSAGE AND TIMESTAMP
create or replace function public.on_chat_message_inserted_func()
returns trigger as $$
begin
  update public.chat_conversations
  set
    last_message_at = new.created_at,
    last_message_preview = coalesce(nullif(trim(substring(new.content from 1 for 60)), ''), 'Attachment'),
    updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_on_chat_message_inserted on public.chat_messages;
create trigger trg_on_chat_message_inserted
  after insert on public.chat_messages
  for each row execute function public.on_chat_message_inserted_func();

-- 17. TRIGGER TO AUTO-ENROLL USERS INTO DEFAULT PROGRAMME CHANNELS
create or replace function public.auto_join_default_channels_func()
returns trigger as $$
declare
  conv_record record;
  user_prog_slug text;
begin
  -- Resolve programme slug
  if new.programme_id is not null then
    select slug into user_prog_slug from public.programmes where id = new.programme_id;
  end if;
  if user_prog_slug is null then
    user_prog_slug := coalesce(new.programme, 'hr');
  end if;

  -- Add user to all_members and public channels of this programme
  for conv_record in
    select id from public.chat_conversations
    where type in ('all_members', 'channel')
    and (
      programme_id = new.programme_id
      or programme_slug = user_prog_slug
      or (user_prog_slug in ('hr', 'human-resources') and programme_slug in ('hr', 'human-resources'))
      or (user_prog_slug in ('data-analyst', 'data_analyst') and programme_slug in ('data-analyst', 'data_analyst'))
    )
  loop
    insert into public.chat_conversation_members (conversation_id, user_id, role)
    values (conv_record.id, new.id, case when new.role = 'admin' then 'admin' when new.role = 'instructor' then 'moderator' else 'member' end)
    on conflict (conversation_id, user_id) do nothing;
  end loop;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_auto_join_default_channels on public.profiles;
create trigger trg_auto_join_default_channels
  after insert or update of programme_id, programme on public.profiles
  for each row execute function public.auto_join_default_channels_func();

-- 18. SEED DEFAULT CHANNELS FOR ALL PROGRAMMES
do $$
declare
  prog record;
  conv_all_id uuid;
  conv_gen_id uuid;
  conv_ann_id uuid;
  conv_rnd_id uuid;
begin
  for prog in select id, slug, name from public.programmes loop
    -- 1. All Members channel
    insert into public.chat_conversations (
      programme_id, programme_slug, type, name, slug, description, is_announcement_only
    )
    values (
      prog.id,
      prog.slug,
      'all_members',
      'All Members',
      'all-members',
      'Programme-wide community for all learners, mentors, and staff in ' || prog.name || '.',
      false
    )
    on conflict do nothing;

    -- 2. General channel
    insert into public.chat_conversations (
      programme_id, programme_slug, type, name, slug, description, is_announcement_only
    )
    values (
      prog.id,
      prog.slug,
      'channel',
      'general',
      'general',
      'General discussions and learning queries for ' || prog.name || '.',
      false
    )
    on conflict do nothing;

    -- 3. Announcements channel (read-only for learners)
    insert into public.chat_conversations (
      programme_id, programme_slug, type, name, slug, description, is_announcement_only
    )
    values (
      prog.id,
      prog.slug,
      'channel',
      'announcements',
      'announcements',
      'Official programme updates and notices. Instructor and admin posts only.',
      true
    )
    on conflict do nothing;

    -- 4. Random channel
    insert into public.chat_conversations (
      programme_id, programme_slug, type, name, slug, description, is_announcement_only
    )
    values (
      prog.id,
      prog.slug,
      'channel',
      'random',
      'random',
      'Casual conversations, watercooler chat, and interesting links.',
      false
    )
    on conflict do nothing;
  end loop;

  -- Enroll all existing profiles into default channels
  insert into public.chat_conversation_members (conversation_id, user_id, role)
  select
    c.id as conversation_id,
    p.id as user_id,
    case when p.role = 'admin' then 'admin' when p.role = 'instructor' then 'moderator' else 'member' end as role
  from public.chat_conversations c
  cross join public.profiles p
  where c.type in ('all_members', 'channel')
  and (
    (c.programme_id is not null and c.programme_id = p.programme_id)
    or c.programme_slug = coalesce(p.programme, 'hr')
    or (c.programme_slug in ('hr', 'human-resources') and coalesce(p.programme, 'hr') in ('hr', 'human-resources'))
  )
  on conflict (conversation_id, user_id) do nothing;
end $$;

