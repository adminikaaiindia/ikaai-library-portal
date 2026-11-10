-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — ACCESS CONTROL & INVITATION SYSTEM
-- Migration: 20261106_05_access_control_and_invites.sql
-- Description:
--   1. Creates access_invites table (admin approved list with role & programme).
--   2. Adds profiles.access_status ('active', 'pending', 'revoked'; default 'pending').
--   3. Safely backfills existing users as 'active' with triggers temporarily disabled.
--   4. Rewrites handle_new_user() trigger to enforce invite lookup (never trust metadata).
--   5. Adds auto-activation trigger when an invite is added for an existing pending user.
--   6. Hardens guard trigger on profiles to block non-admin changes to access_status.
--   7. Updates core security functions and RLS policies across all portal tables so
--      non-active users cannot read or write any portal data.
--   8. Creates admin-only RPC functions for inviting, updating, and revoking access.
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- 1. ACCESS INVITES TABLE (THE APPROVED LIST)
-- --------------------------------------------------------------------
create table if not exists public.access_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null check (role in ('intern', 'learner', 'instructor', 'admin')),
  programme_id uuid references public.programmes(id) on delete set null,
  status text not null default 'invited' check (status in ('invited', 'active', 'revoked')),
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  activated_at timestamptz,
  constraint uq_access_invites_email unique (email),
  constraint chk_access_invites_role_programme check (
    (role = 'admin' and programme_id is null) or
    (role in ('intern', 'learner', 'instructor') and programme_id is not null)
  )
);

-- Case-insensitive unique lookup index on lower(trim(email))
create unique index if not exists idx_access_invites_lower_email
  on public.access_invites (lower(trim(email)));
create index if not exists idx_access_invites_status
  on public.access_invites (status);
create index if not exists idx_access_invites_programme
  on public.access_invites (programme_id);

-- --------------------------------------------------------------------
-- 2. ADD ACCESS_STATUS TO PROFILES & SAFELY BACKFILL EXISTING USERS
-- --------------------------------------------------------------------
alter table public.profiles
  add column if not exists access_status text not null default 'pending'
  check (access_status in ('active', 'pending', 'revoked'));

-- Temporarily disable guard trigger to backfill existing profiles safely
alter table public.profiles disable trigger trg_guard_profile_updates;

-- Activate all existing profiles so no current user is locked out
update public.profiles
set access_status = 'active'
where access_status is null or access_status = 'pending';

-- Populate access_invites for existing profiles so invite list matches live users
insert into public.access_invites (email, role, programme_id, status, created_at, activated_at)
select
  lower(trim(p.email)),
  case when p.role = 'admin' then 'admin' when p.role = 'instructor' then 'instructor' else 'intern' end,
  case when p.role = 'admin' then null else p.programme_id end,
  'active',
  coalesce(p.created_at, now()),
  coalesce(p.created_at, now())
from public.profiles p
where p.email is not null
on conflict (email) do update set
  status = 'active',
  role = excluded.role,
  programme_id = excluded.programme_id,
  activated_at = coalesce(public.access_invites.activated_at, now());

-- Re-enable guard trigger on profiles
alter table public.profiles enable trigger trg_guard_profile_updates;

-- --------------------------------------------------------------------
-- 3. ENHANCE GUARD TRIGGER TO PROTECT ACCESS_STATUS
-- --------------------------------------------------------------------
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

    -- Non-admins cannot modify system identifiers or creation timestamp
    if new.id is distinct from old.id then
      raise exception 'Account identifier cannot be modified.';
    end if;
    if new.created_at is distinct from old.created_at then
      raise exception 'Account creation timestamp cannot be modified.';
    end if;

    -- Non-admins cannot modify programme_id once set (allow setting once from null)
    if old.programme_id is not null and new.programme_id is distinct from old.programme_id then
      raise exception 'Only administrators can change assigned programmes.';
    end if;

    -- Non-admins cannot bypass programme protection via legacy programme text column
    if old.programme_id is not null and new.programme is distinct from old.programme then
      raise exception 'Only administrators can change assigned programmes.';
    end if;
  end if;

  -- Maintain legacy text column sync while it remains in place
  if new.programme_id is distinct from old.programme_id and new.programme_id is not null then
    select slug into new.programme from public.programmes where id = new.programme_id;
  end if;

  -- Ensure full_name is propagated to display_name for backward compatibility
  if new.full_name is not null and trim(new.full_name) <> '' then
    new.display_name := new.full_name;
  end if;

  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 4. HARDEN USER SIGNUP TRIGGER (NEVER TRUST USER METADATA FOR ACCESS)
-- --------------------------------------------------------------------
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
    nullif(trim(new.raw_user_meta_data->>'display_name'), ''),
    split_part(clean_email, '@', 1),
    'Learner'
  );

  avatar_val := coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture',
    null
  );

  -- Look up email in approved invites table
  select * into invite_rec
  from public.access_invites
  where lower(trim(email)) = clean_email;

  if found and invite_rec.status in ('invited', 'active') then
    role_val := case when invite_rec.role = 'intern' then 'learner' else invite_rec.role end;
    programme_id_val := invite_rec.programme_id;
    access_status_val := 'active';

    -- Mark invite as active
    update public.access_invites
    set status = 'active', activated_at = coalesce(activated_at, now())
    where id = invite_rec.id;
  elsif found and invite_rec.status = 'revoked' then
    role_val := case when invite_rec.role = 'intern' then 'learner' else invite_rec.role end;
    programme_id_val := invite_rec.programme_id;
    access_status_val := 'revoked';
  else
    -- Not on approved list: default to pending learner with no programme
    role_val := 'learner';
    programme_id_val := null;
    access_status_val := 'pending';
  end if;

  insert into public.profiles (
    id,
    full_name,
    display_name,
    email,
    avatar_url,
    role,
    programme_id,
    programme,
    branch,
    position,
    member_since,
    member_since_date,
    access_status,
    created_at,
    updated_at
  )
  values (
    new.id,
    name_val,
    name_val,
    clean_email,
    avatar_val,
    role_val,
    programme_id_val,
    null,
    'Ikaai HQ - New Delhi / Remote',
    case when role_val = 'admin' then 'Administrator' when role_val = 'instructor' then 'Instructor' else 'Intern' end,
    to_char(now(), 'FMMonth YYYY'),
    current_date,
    access_status_val,
    coalesce(new.created_at, now()),
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    access_status = case 
      when public.profiles.access_status = 'active' then 'active'
      else excluded.access_status
    end,
    role = case
      when public.profiles.access_status = 'active' then public.profiles.role
      else excluded.role
    end,
    programme_id = case
      when public.profiles.access_status = 'active' then public.profiles.programme_id
      else excluded.programme_id
    end,
    updated_at = now();

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- --------------------------------------------------------------------
-- 5. TRIGGER: AUTO-ACTIVATE EXISTING PROFILE ON INVITE CREATION/UPDATE
-- --------------------------------------------------------------------
create or replace function public.on_access_invite_upsert_func()
returns trigger as $$
declare
  target_profile_id uuid;
begin
  -- Find matching profile by email
  select id into target_profile_id
  from public.profiles
  where lower(trim(email)) = lower(trim(new.email));

  if target_profile_id is not null then
    if new.status in ('invited', 'active') then
      update public.profiles
      set
        role = case when new.role = 'intern' then 'learner' else new.role end,
        programme_id = new.programme_id,
        access_status = 'active',
        updated_at = now()
      where id = target_profile_id;

      if new.status = 'invited' then
        new.status := 'active';
        new.activated_at := coalesce(new.activated_at, now());
      end if;
    elsif new.status = 'revoked' then
      update public.profiles
      set
        access_status = 'revoked',
        updated_at = now()
      where id = target_profile_id;
    end if;
  end if;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_on_access_invite_upsert on public.access_invites;
create trigger trg_on_access_invite_upsert
  before insert or update of role, programme_id, status on public.access_invites
  for each row execute function public.on_access_invite_upsert_func();

-- --------------------------------------------------------------------
-- 6. CORE SECURITY HELPER FUNCTIONS (ACTIVE USER ENFORCEMENT)
-- --------------------------------------------------------------------
create or replace function public.is_active_user()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and access_status = 'active'
  );
$$ language sql stable security definer set search_path = public;

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role = 'admin'
    and access_status = 'active'
  );
$$ language sql stable security definer set search_path = public;

create or replace function public.current_role()
returns text as $$
  select case when access_status = 'active' then role else null end
  from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.current_programme_id()
returns uuid as $$
  select case when access_status = 'active' then programme_id else null end
  from public.profiles where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.is_instructor_for(target_programme_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role = 'instructor'
    and access_status = 'active'
    and programme_id = target_programme_id
  );
$$ language sql stable security definer set search_path = public;

-- --------------------------------------------------------------------
-- 7. UPDATE ROW LEVEL SECURITY (RLS) FOR PENDING / REVOKED USERS
-- --------------------------------------------------------------------

-- A. PROFILES TABLE: Pending/revoked users can only SELECT their own row
drop policy if exists "profiles_select_policy" on public.profiles;
create policy "profiles_select_policy" on public.profiles
for select to authenticated
using (
  auth.uid() = id
  or (
    public.is_active_user()
    and (
      public.is_admin()
      or (
        public.current_role() = 'instructor'
        and (programme_id = public.current_programme_id() or programme_id is null)
      )
    )
  )
);

-- B. PROGRAMMES TABLE: Strictly active users only
drop policy if exists "programmes_select_policy" on public.programmes;
create policy "programmes_select_policy" on public.programmes
for select to authenticated
using (public.is_active_user());

-- C. MODULES TABLE: Strictly active users only
drop policy if exists "modules_select_policy" on public.modules;
create policy "modules_select_policy" on public.modules
for select to authenticated
using (
  public.is_active_user()
  and (
    programme_id = public.current_programme_id()
    or public.is_admin()
  )
);

-- D. MODULE RESOURCES TABLE: Strictly active users only
drop policy if exists "resources_select_policy" on public.resources;
create policy "resources_select_policy" on public.resources
for select to authenticated
using (
  public.is_active_user()
  and (
    exists (
      select 1 from public.modules m
      where m.id = resources.module_id
      and (m.programme_id = public.current_programme_id() or public.is_admin())
    )
  )
);

-- E. QUIZZES TABLE: Strictly active users only
drop policy if exists "quizzes_select_policy" on public.quizzes;
create policy "quizzes_select_policy" on public.quizzes
for select to authenticated
using (
  public.is_active_user()
  and (
    exists (
      select 1 from public.modules m
      where m.id = quizzes.module_id
      and (m.programme_id = public.current_programme_id() or public.is_admin())
    )
  )
);

-- F. EXAM SUBMISSIONS TABLE: Strictly active users only
drop policy if exists "exam_submissions_select" on public.exam_submissions;
create policy "exam_submissions_select" on public.exam_submissions
for select to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or programme_id = public.current_programme_id()
    or public.is_admin()
  )
);

drop policy if exists "exam_submissions_insert" on public.exam_submissions;
create policy "exam_submissions_insert" on public.exam_submissions
for insert to authenticated
with check (
  public.is_active_user()
  and user_id = auth.uid()
);

-- G. COMPANY DOCUMENTS TABLE: Strictly active users only (Conditional & using real columns: is_published, is_archived)
do $$
begin
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'company_documents') then
    execute 'drop policy if exists "company_documents_select_policy" on public.company_documents';
    execute 'create policy "company_documents_select_policy" on public.company_documents
      for select to authenticated
      using (
        public.is_active_user()
        and (
          public.is_admin()
          or (
            is_published = true
            and is_archived = false
            and (
              programme_id is null
              or programme_id = public.current_programme_id()
            )
          )
        )
      )';
  end if;
end $$;

-- H. PERSONAL DOCUMENTS TABLE: Strictly active recipient & admins only (Conditional & using real column: is_revoked)
do $$
begin
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'personal_documents') then
    execute 'drop policy if exists "personal_docs_recipient_select" on public.personal_documents';
    execute 'drop policy if exists "personal_documents_recipient_select" on public.personal_documents';
    execute 'create policy "personal_documents_recipient_select" on public.personal_documents
      for select to authenticated
      using (
        public.is_active_user()
        and (
          (recipient_id = auth.uid() and is_revoked = false)
          or public.is_admin()
        )
      )';
  end if;
end $$;

-- I. CHAT CONVERSATIONS & MESSAGES: Strictly active users only
create or replace function public.can_access_chat_conversation(conv_id uuid, check_user_id uuid)
returns boolean as $$
declare
  conv_type text;
  conv_prog_id uuid;
  conv_prog_slug text;
  user_prog_id uuid;
  user_prog_text text;
  user_role_val text;
  user_status_val text;
begin
  if check_user_id is null then
    return false;
  end if;

  -- 1. Check user status: Must be active
  select role, programme_id, programme, access_status
  into user_role_val, user_prog_id, user_prog_text, user_status_val
  from public.profiles
  where id = check_user_id;

  if user_status_val is distinct from 'active' then
    return false;
  end if;

  if user_role_val = 'admin' then
    return true;
  end if;

  -- 2. Check if chat_conversations table exists
  if to_regclass('public.chat_conversations') is null then
    return true;
  end if;

  -- 3. Get conversation details
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

  return exists (
    select 1 from public.chat_conversation_members
    where conversation_id = conv_id and user_id = check_user_id
  );
end;
$$ language plpgsql security definer stable set search_path = public;

-- J. ACCESS INVITES TABLE RLS
alter table public.access_invites enable row level security;

drop policy if exists "access_invites_admin_all" on public.access_invites;
create policy "access_invites_admin_all" on public.access_invites
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- --------------------------------------------------------------------
-- 8. ADMIN-ONLY DATABASE FUNCTIONS (RPC)
-- --------------------------------------------------------------------

-- A. Invite or pre-approve user
create or replace function public.invite_user(
  p_email text,
  p_role text,
  p_programme_id uuid
)
returns jsonb as $$
declare
  clean_email text;
  clean_role text;
  existing_user_id uuid;
  invite_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  clean_email := lower(trim(p_email));
  if clean_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then
    raise exception 'Invalid email address format: %', p_email;
  end if;

  clean_role := lower(trim(p_role));
  if clean_role not in ('intern', 'learner', 'instructor', 'admin') then
    raise exception 'Invalid role: %. Must be intern, instructor, or admin.', p_role;
  end if;

  if clean_role = 'admin' and p_programme_id is not null then
    raise exception 'Admin accounts cannot be assigned to a specific programme.';
  end if;

  if clean_role in ('intern', 'learner', 'instructor') and p_programme_id is null then
    raise exception 'Interns and instructors must be assigned to one of the 5 programmes.';
  end if;

  if p_programme_id is not null and not exists (select 1 from public.programmes where id = p_programme_id) then
    raise exception 'Invalid programme identifier.';
  end if;

  insert into public.access_invites (
    email, role, programme_id, status, invited_by, created_at
  )
  values (
    clean_email, clean_role, p_programme_id, 'invited', auth.uid(), now()
  )
  on conflict (email) do update set
    role = excluded.role,
    programme_id = excluded.programme_id,
    status = case when public.access_invites.status = 'revoked' then 'invited' else public.access_invites.status end,
    invited_by = auth.uid()
  returning id into invite_id;

  -- If matching profile already exists in pending state, activate immediately
  select id into existing_user_id from public.profiles where lower(trim(email)) = clean_email;
  if existing_user_id is not null then
    update public.profiles
    set
      role = case when clean_role = 'intern' then 'learner' else clean_role end,
      programme_id = p_programme_id,
      access_status = 'active',
      updated_at = now()
    where id = existing_user_id;

    update public.access_invites
    set status = 'active', activated_at = coalesce(activated_at, now())
    where id = invite_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'email', clean_email,
    'role', clean_role,
    'programme_id', p_programme_id,
    'activated', existing_user_id is not null
  );
end;
$$ language plpgsql security definer set search_path = public;

-- B. Update user access, role, and programme
create or replace function public.update_user_access(
  p_user_id uuid,
  p_role text,
  p_programme_id uuid
)
returns jsonb as $$
declare
  old_role text;
  target_email text;
  clean_role text;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  select role, email into old_role, target_email
  from public.profiles
  where id = p_user_id;

  if not found then
    raise exception 'User profile not found.';
  end if;

  clean_role := lower(trim(p_role));
  if clean_role not in ('intern', 'learner', 'instructor', 'admin') then
    raise exception 'Invalid role: %.', p_role;
  end if;

  -- Guard: Never demote the last remaining active admin
  if old_role = 'admin' and clean_role <> 'admin' then
    if (select count(*) from public.profiles where role = 'admin' and access_status = 'active') <= 1 then
      raise exception 'Operation forbidden: Cannot demote the last remaining active administrator.';
    end if;
  end if;

  if clean_role = 'admin' and p_programme_id is not null then
    raise exception 'Admin accounts cannot be assigned to a specific programme.';
  end if;

  if clean_role in ('intern', 'learner', 'instructor') and p_programme_id is null then
    raise exception 'Interns and instructors must be assigned to one of the 5 programmes.';
  end if;

  -- Update profile
  update public.profiles
  set
    role = case when clean_role = 'intern' then 'learner' else clean_role end,
    programme_id = p_programme_id,
    access_status = 'active',
    updated_at = now()
  where id = p_user_id;

  -- Update matching invite
  if target_email is not null then
    insert into public.access_invites (email, role, programme_id, status, invited_by, created_at, activated_at)
    values (lower(trim(target_email)), clean_role, p_programme_id, 'active', auth.uid(), now(), now())
    on conflict (email) do update set
      role = excluded.role,
      programme_id = excluded.programme_id,
      status = 'active',
      activated_at = coalesce(public.access_invites.activated_at, now());
  end if;

  return jsonb_build_object('success', true, 'user_id', p_user_id);
end;
$$ language plpgsql security definer set search_path = public;

-- C. Revoke user access
create or replace function public.revoke_user_access(
  p_user_id uuid
)
returns jsonb as $$
declare
  target_role text;
  target_email text;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  select role, email into target_role, target_email
  from public.profiles
  where id = p_user_id;

  if not found then
    raise exception 'User profile not found.';
  end if;

  -- Guard: Never revoke the last remaining active admin
  if target_role = 'admin' then
    if (select count(*) from public.profiles where role = 'admin' and access_status = 'active') <= 1 then
      raise exception 'Operation forbidden: Cannot revoke access for the last remaining active administrator.';
    end if;
  end if;

  update public.profiles
  set
    access_status = 'revoked',
    updated_at = now()
  where id = p_user_id;

  if target_email is not null then
    update public.access_invites
    set status = 'revoked'
    where lower(trim(email)) = lower(trim(target_email));
  end if;

  return jsonb_build_object('success', true, 'user_id', p_user_id, 'status', 'revoked');
end;
$$ language plpgsql security definer set search_path = public;

-- D. Restore user access
create or replace function public.restore_user_access(
  p_user_id uuid
)
returns jsonb as $$
declare
  target_email text;
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  update public.profiles
  set
    access_status = 'active',
    updated_at = now()
  where id = p_user_id
  returning email into target_email;

  if not found then
    raise exception 'User profile not found.';
  end if;

  if target_email is not null then
    update public.access_invites
    set status = 'active', activated_at = coalesce(activated_at, now())
    where lower(trim(email)) = lower(trim(target_email));
  end if;

  return jsonb_build_object('success', true, 'user_id', p_user_id, 'status', 'active');
end;
$$ language plpgsql security definer set search_path = public;

-- E. List all users and access invites for admin management
create or replace function public.list_access_invites()
returns table (
  invite_id uuid,
  email text,
  role text,
  programme_id uuid,
  programme_name text,
  programme_slug text,
  status text,
  created_at timestamptz,
  activated_at timestamptz,
  profile_id uuid,
  profile_name text,
  last_seen timestamptz,
  is_pending_approval boolean
) as $$
begin
  if not public.is_admin() then
    raise exception 'Access denied: Administrator privileges required.';
  end if;

  return query
  -- 1. All invites joined with profiles and programmes
  select
    i.id as invite_id,
    i.email,
    i.role,
    i.programme_id,
    pr.name as programme_name,
    pr.slug as programme_slug,
    coalesce(p.access_status, i.status) as status,
    i.created_at,
    i.activated_at,
    p.id as profile_id,
    p.full_name as profile_name,
    p.last_seen,
    false as is_pending_approval
  from public.access_invites i
  left join public.programmes pr on pr.id = i.programme_id
  left join public.profiles p on lower(trim(p.email)) = lower(trim(i.email))

  union all

  -- 2. Registered profiles that signed up but have NO matching invite (pending approval)
  select
    null::uuid as invite_id,
    p.email,
    p.role,
    p.programme_id,
    pr.name as programme_name,
    pr.slug as programme_slug,
    p.access_status as status,
    p.created_at,
    null::timestamptz as activated_at,
    p.id as profile_id,
    p.full_name as profile_name,
    p.last_seen,
    (p.access_status = 'pending') as is_pending_approval
  from public.profiles p
  left join public.programmes pr on pr.id = p.programme_id
  where not exists (
    select 1 from public.access_invites i
    where lower(trim(i.email)) = lower(trim(p.email))
  )

  order by is_pending_approval desc, created_at desc;
end;
$$ language plpgsql security definer set search_path = public;

commit;

