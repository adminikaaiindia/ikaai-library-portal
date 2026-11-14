-- ============================================================================
-- IKAAI ACADEMY PORTAL – PRODUCTION HARDENING & SECURITY LOCKDOWN
-- Migration: 20261114_17_production_hardening.sql
--
-- Summary of Changes:
-- 1. [SEC-01] Re-enable Row Level Security (RLS) on all 5 chat tables with
--    complete, non-recursive policies for authenticated users.
-- 2. [SEC-02] Remove arbitrary email bypasses and hardcoded developer emails.
--    Administrative privileges rely strictly on public.is_admin() and profiles.role = 'admin'.
-- 3. [SEC-03] Revoke EXECUTE on all functions in schema public from public/anon.
--    Grant EXECUTE to authenticated role only. Lock down default privileges.
-- 4. [SEC-06] Enforce server-side 10MB file_size_limit and strict allowed_mime_types
--    on storage buckets ('chat-attachments', 'personal-documents', 'company-documents').
-- 5. [PER-03] Add composite performance indexes for chat messages, members, and exams.
-- 6. [DAT-03/04] Clean up deprecated profiles columns (display_name, programme, member_since)
--    and drop legacy 20261106 backup snapshot tables.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- SECTION 1: SEC-01 CHAT TABLES ROW LEVEL SECURITY (RLS) RE-ENABLING
-- ----------------------------------------------------------------------------

-- 1.1 Enable RLS on all 5 chat tables
alter table if exists public.chat_conversations enable row level security;
alter table if exists public.chat_conversation_members enable row level security;
alter table if exists public.chat_messages enable row level security;
alter table if exists public.chat_attachments enable row level security;
alter table if exists public.chat_reactions enable row level security;

-- 1.2 Helper function for conversation access check (supports TEXT conversation IDs)
create or replace function public.can_access_chat_conversation(conv_id text, check_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  conv_type text;
  conv_prog_id uuid;
  user_prog_id uuid;
  user_role_val text;
begin
  if check_user_id is null or conv_id is null then
    return false;
  end if;

  -- Administrators have universal access
  select role, programme_id into user_role_val, user_prog_id
  from public.profiles
  where id = check_user_id;

  if user_role_val = 'admin' then
    return true;
  end if;

  -- Conversation lookup
  select type, programme_id into conv_type, conv_prog_id
  from public.chat_conversations
  where id = conv_id;

  if conv_type is null then
    return false;
  end if;

  -- Universal all-members community channel
  if conv_type = 'all_members' or conv_id = 'all-members' then
    return true;
  end if;

  -- Programme-specific channels
  if conv_type = 'programme' then
    if conv_prog_id is not null and user_prog_id is not null and conv_prog_id = user_prog_id then
      return true;
    end if;
  end if;

  -- Direct messages / group chats with explicit membership
  if exists (
    select 1
    from public.chat_conversation_members
    where conversation_id = conv_id
      and user_id::text = check_user_id::text
  ) then
    return true;
  end if;

  return false;
end;
$$;

revoke all on function public.can_access_chat_conversation(text, uuid) from public, anon;
grant execute on function public.can_access_chat_conversation(text, uuid) to authenticated;

-- 1.3 Clean up existing chat policies to prevent duplicates
drop policy if exists "chat_conv_select" on public.chat_conversations;
drop policy if exists "chat_conv_insert" on public.chat_conversations;
drop policy if exists "chat_conv_update" on public.chat_conversations;
drop policy if exists "chat_conv_delete" on public.chat_conversations;
drop policy if exists "chat_conversations_open" on public.chat_conversations;

drop policy if exists "chat_members_select" on public.chat_conversation_members;
drop policy if exists "chat_members_manage" on public.chat_conversation_members;
drop policy if exists "chat_conversation_members_open" on public.chat_conversation_members;

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

-- 1.4 Create comprehensive policies for chat_conversations
create policy "chat_conv_select" on public.chat_conversations
  for select to authenticated
  using (public.can_access_chat_conversation(id, auth.uid()));

create policy "chat_conv_insert" on public.chat_conversations
  for insert to authenticated
  with check (
    type in ('direct', 'group')
    or public.is_admin()
  );

create policy "chat_conv_update" on public.chat_conversations
  for update to authenticated
  using (
    created_by::text = auth.uid()::text
    or public.is_admin()
  );

-- 1.5 Create comprehensive policies for chat_conversation_members
create policy "chat_members_select" on public.chat_conversation_members
  for select to authenticated
  using (
    user_id::text = auth.uid()::text
    or public.can_access_chat_conversation(conversation_id, auth.uid())
  );

create policy "chat_members_insert" on public.chat_conversation_members
  for insert to authenticated
  with check (
    user_id::text = auth.uid()::text
    or public.is_admin()
    or exists (
      select 1 from public.chat_conversations c
      where c.id = conversation_id and c.type in ('direct', 'group')
    )
  );

create policy "chat_members_update" on public.chat_conversation_members
  for update to authenticated
  using (
    user_id::text = auth.uid()::text
    or public.is_admin()
  );

create policy "chat_members_delete" on public.chat_conversation_members
  for delete to authenticated
  using (
    user_id::text = auth.uid()::text
    or public.is_admin()
  );

-- 1.6 Create comprehensive policies for chat_messages
create policy "chat_messages_select" on public.chat_messages
  for select to authenticated
  using (public.can_access_chat_conversation(conversation_id, auth.uid()));

create policy "chat_messages_insert" on public.chat_messages
  for insert to authenticated
  with check (
    sender_id::text = auth.uid()::text
    and public.can_access_chat_conversation(conversation_id, auth.uid())
    and (
      not exists (
        select 1 from public.chat_conversations c
        where c.id = conversation_id and c.is_announcement_only = true
      )
      or exists (
        select 1 from public.profiles p
        where p.id = auth.uid() and p.role in ('instructor', 'admin')
      )
    )
  );

create policy "chat_messages_update" on public.chat_messages
  for update to authenticated
  using (
    sender_id::text = auth.uid()::text
    or public.is_admin()
  );

create policy "chat_messages_delete" on public.chat_messages
  for delete to authenticated
  using (
    sender_id::text = auth.uid()::text
    or public.is_admin()
  );

-- 1.7 Create comprehensive policies for chat_attachments
create policy "chat_attachments_select" on public.chat_attachments
  for select to authenticated
  using (public.can_access_chat_conversation(conversation_id, auth.uid()));

create policy "chat_attachments_insert" on public.chat_attachments
  for insert to authenticated
  with check (
    public.can_access_chat_conversation(conversation_id, auth.uid())
  );

create policy "chat_attachments_delete" on public.chat_attachments
  for delete to authenticated
  using (
    uploaded_by::text = auth.uid()::text
    or public.is_admin()
  );

-- 1.8 Create comprehensive policies for chat_reactions
create policy "chat_reactions_select" on public.chat_reactions
  for select to authenticated
  using (
    exists (
      select 1 from public.chat_messages m
      where m.id = chat_reactions.message_id
        and public.can_access_chat_conversation(m.conversation_id, auth.uid())
    )
  );

create policy "chat_reactions_insert" on public.chat_reactions
  for insert to authenticated
  with check (user_id::text = auth.uid()::text);

create policy "chat_reactions_delete" on public.chat_reactions
  for delete to authenticated
  using (user_id::text = auth.uid()::text or public.is_admin());


-- ----------------------------------------------------------------------------
-- SECTION 2: SEC-02 REMOVE EMAIL-BASED PRIVILEGE BYPASSES & DEVELOPER EMAILS
-- ----------------------------------------------------------------------------

-- Ensure root admin email has an active admin invite row so they are always recognized
insert into public.access_invites (email, role, programme_id, status, created_at, activated_at)
values ('admin.ikaaiindia@gmail.com', 'admin', null, 'active', now(), now())
on conflict (email) do update set
  role = 'admin',
  status = 'active',
  programme_id = null;

-- 2.1 Update public.delete_user: remove email bypass list, rely strictly on target_role = 'admin'
create or replace function public.delete_user(
  p_user_id uuid default null,
  p_email text default null
)
returns jsonb as $$
declare
  target_id uuid;
  target_email text;
  target_role text;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  target_id := p_user_id;
  target_email := lower(trim(coalesce(p_email, '')));

  if target_id is null and target_email <> '' then
    select id into target_id from public.profiles where lower(trim(email)) = target_email;
  end if;

  if target_id is not null then
    select role, email into target_role, target_email from public.profiles where id = target_id;
  end if;

  -- Protection against deleting administrator accounts
  if target_role = 'admin' then
    raise exception 'Operation forbidden: Administrator accounts are protected and cannot be deleted.';
  end if;

  -- Delete from access_invites
  if target_email is not null and target_email <> '' then
    delete from public.access_invites where lower(trim(email)) = target_email;
  end if;
  if target_id is not null then
    delete from public.access_invites where id = target_id;
  end if;

  -- Delete from profiles (foreign keys will CASCADE or SET NULL)
  if target_id is not null then
    delete from public.profiles where id = target_id;
  elsif target_email is not null and target_email <> '' then
    delete from public.profiles where lower(trim(email)) = target_email;
  end if;

  return jsonb_build_object('success', true, 'user_id', target_id, 'email', target_email);
end;
$$ language plpgsql security definer set search_path = public;

-- 2.2 Update public.claim_user_invite: strictly check access_invites, remove email wildcard '%admin%'
create or replace function public.claim_user_invite()
returns jsonb as $$
declare
  v_user_id uuid;
  v_email text;
  v_invite record;
  v_role text;
  v_programme_id uuid;
  v_curr_role text;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return jsonb_build_object('success', false, 'status', 'unauthenticated');
  end if;

  -- Resolve authenticated user email
  select lower(trim(email)) into v_email from auth.users where id = v_user_id;
  if v_email is null or v_email = '' then
    select lower(trim(email)) into v_email from public.profiles where id = v_user_id;
  end if;

  if v_email is null or v_email = '' then
    return jsonb_build_object('success', false, 'status', 'no_email');
  end if;

  -- If user is already active admin in profiles, preserve role
  select role into v_curr_role from public.profiles where id = v_user_id;
  if v_curr_role = 'admin' then
    update public.profiles
    set access_status = 'active', updated_at = now()
    where id = v_user_id;

    return jsonb_build_object(
      'success', true,
      'status', 'active',
      'role', 'admin',
      'programme_id', null
    );
  end if;

  -- Check access_invites for this email
  select * into v_invite
  from public.access_invites
  where lower(trim(email)) = v_email
  limit 1;

  if v_invite is not null and v_invite.status in ('invited', 'active') then
    v_role := case when v_invite.role = 'learner' then 'intern' else coalesce(v_invite.role, 'intern') end;
    v_programme_id := case when v_role = 'admin' then null else v_invite.programme_id end;

    update public.profiles
    set
      role = v_role,
      programme_id = v_programme_id,
      access_status = 'active',
      updated_at = now()
    where id = v_user_id;

    update public.access_invites
    set status = 'active', activated_at = coalesce(activated_at, now())
    where id = v_invite.id;

    return jsonb_build_object(
      'success', true,
      'status', 'active',
      'role', v_role,
      'programme_id', v_programme_id
    );
  elsif v_invite is not null and v_invite.status = 'revoked' then
    update public.profiles
    set access_status = 'revoked', updated_at = now()
    where id = v_user_id;

    return jsonb_build_object(
      'success', false,
      'status', 'revoked',
      'message', 'Your access to the portal has been revoked by an administrator.'
    );
  else
    return jsonb_build_object(
      'success', false,
      'status', 'pending',
      'message', 'Your account is pending administrator approval.'
    );
  end if;
end;
$$ language plpgsql security definer set search_path = public;

-- 2.3 Update handle_new_user signup trigger: clean role assignment without email wildcard '%admin%'
create or replace function public.handle_new_user()
returns trigger as $$
declare
  clean_email text;
  name_val text;
  avatar_val text;
  invite_rec record;
  role_val text;
  programme_id_val uuid;
  access_status_val text;
begin
  clean_email := lower(trim(new.email));

  name_val := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    split_part(clean_email, '@', 1),
    'Learner'
  );

  avatar_val := coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture',
    null
  );

  -- Check access_invites for pre-approval
  begin
    select * into invite_rec
    from public.access_invites
    where lower(trim(email)) = clean_email
    limit 1;
  exception when others then
    invite_rec := null;
  end;

  if invite_rec is not null and invite_rec.status in ('invited', 'active') then
    role_val := case when invite_rec.role = 'learner' then 'intern' else coalesce(invite_rec.role, 'intern') end;
    programme_id_val := case when role_val = 'admin' then null else invite_rec.programme_id end;
    access_status_val := 'active';

    begin
      update public.access_invites
      set status = 'active', activated_at = coalesce(activated_at, now())
      where id = invite_rec.id;
    exception when others then
      -- Do not abort signup
    end;
  elsif invite_rec is not null and invite_rec.status = 'revoked' then
    role_val := case when invite_rec.role = 'learner' then 'intern' else coalesce(invite_rec.role, 'intern') end;
    programme_id_val := case when role_val = 'admin' then null else invite_rec.programme_id end;
    access_status_val := 'revoked';
  else
    role_val := 'intern';
    programme_id_val := null;
    access_status_val := 'pending';
  end if;

  -- Insert profile using canonical columns only
  begin
    insert into public.profiles (
      id,
      full_name,
      email,
      avatar_url,
      role,
      programme_id,
      access_status,
      created_at,
      updated_at
    )
    values (
      new.id,
      name_val,
      clean_email,
      avatar_val,
      role_val,
      programme_id_val,
      access_status_val,
      now(),
      now()
    )
    on conflict (id) do update set
      email = excluded.email,
      full_name = coalesce(public.profiles.full_name, excluded.full_name),
      avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
      access_status = case
        when excluded.access_status = 'active' then 'active'
        else public.profiles.access_status
      end,
      role = case
        when excluded.access_status = 'active' then excluded.role
        else public.profiles.role
      end,
      programme_id = case
        when excluded.access_status = 'active' then excluded.programme_id
        else public.profiles.programme_id
      end,
      updated_at = now();
  exception when others then
    -- Fail safe
  end;

  return new;
end;
$$ language plpgsql security definer set search_path = public;


-- ----------------------------------------------------------------------------
-- SECTION 3: SEC-03 FUNCTION EXECUTION PRIVILEGES LOCKDOWN
-- ----------------------------------------------------------------------------

-- Revoke execute from public and anon across all existing functions in schema public
revoke execute on all functions in schema public from public, anon;

-- Grant execute to authenticated users
grant execute on all functions in schema public to authenticated;

-- Ensure future functions created in schema public do not leak execute to public/anon
alter default privileges in schema public revoke execute on functions from public, anon;
alter default privileges in schema public grant execute on functions to authenticated;


-- ----------------------------------------------------------------------------
-- SECTION 4: SEC-06 STORAGE BUCKET LIMITS & MIME RESTRICTIONS
-- ----------------------------------------------------------------------------

update storage.buckets
set
  file_size_limit = 10485760, -- 10 MB in bytes
  allowed_mime_types = array[
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv'
  ]
where id in ('chat-attachments', 'personal-documents', 'company-documents');


-- ----------------------------------------------------------------------------
-- SECTION 5: PER-03 COMPOSITE PERFORMANCE INDEXES
-- ----------------------------------------------------------------------------

create index if not exists idx_chat_msg_conv_deleted
  on public.chat_messages(conversation_id, is_deleted, created_at desc);

create index if not exists idx_exam_sub_status_grade
  on public.exam_submissions(programme_id, status, grade);

create index if not exists idx_chat_conv_members_user
  on public.chat_conversation_members(user_id, conversation_id);

create index if not exists idx_access_invites_email_lower
  on public.access_invites(lower(email));


-- ----------------------------------------------------------------------------
-- SECTION 6: DAT-03 & DAT-04 DATA MINIMISATION & DEPRECATED COLUMNS CLEANUP
-- ----------------------------------------------------------------------------

-- 6.1 Update guard_profile_updates trigger function to decouple from deprecated columns
create or replace function public.guard_profile_updates()
returns trigger as $$
begin
  if not public.is_admin() then
    -- Non-admins cannot modify account roles
    if new.role is distinct from old.role then
      raise exception 'Only administrators can change account roles.';
    end if;

    -- Non-admins cannot modify access approval status
    if new.access_status is distinct from old.access_status then
      raise exception 'Only administrators can change account access approval status.';
    end if;

    -- Non-admins cannot modify email addresses
    if new.email is distinct from old.email then
      raise exception 'Only administrators can change email addresses.';
    end if;

    -- Non-admins cannot modify office branch location
    if new.branch is distinct from old.branch then
      raise exception 'Only administrators can change branch location.';
    end if;

    -- Non-admins cannot modify position title
    if new.position is distinct from old.position then
      raise exception 'Only administrators can change position title.';
    end if;

    -- Non-admins cannot modify assigned programme_id
    if new.programme_id is distinct from old.programme_id then
      raise exception 'Only administrators can reassign programmes.';
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- 6.2 Safely drop deprecated columns on profiles
do $$
begin
  -- Disable user trigger on profiles temporarily
  execute 'alter table public.profiles disable trigger user';

  alter table public.profiles
    drop column if exists display_name,
    drop column if exists programme,
    drop column if exists member_since;

  execute 'alter table public.profiles enable trigger user';
exception when others then
  -- In case user trigger doesn't exist under that exact name, attempt column drop directly
  alter table public.profiles
    drop column if exists display_name,
    drop column if exists programme,
    drop column if exists member_since;
end $$;

-- 6.3 Drop legacy 20261106 reconciliation snapshot backup tables
drop table if exists public.backup_profiles_20261106 cascade;
drop table if exists public.backup_message_threads_20261106 cascade;
drop table if exists public.backup_exam_submissions_20261106 cascade;
drop table if exists public.backup_feedback_20261106 cascade;


-- ----------------------------------------------------------------------------
-- SECTION 7: SCHEMA CACHE RELOAD
-- ----------------------------------------------------------------------------

notify pgrst, 'reload schema';

-- End of 20261114_17_production_hardening.sql
