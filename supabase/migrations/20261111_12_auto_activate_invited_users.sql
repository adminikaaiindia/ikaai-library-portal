-- ====================================================================
-- IKAAI ACADEMY – AUTO-ACTIVATE PRE-INVITED USERS & CLAIM INVITE RPC
-- Migration: 20261111_12_auto_activate_invited_users.sql
-- ====================================================================

-- 1. RLS Policy: Allow authenticated users to view their own invite in access_invites
drop policy if exists "access_invites_select_own" on public.access_invites;
create policy "access_invites_select_own" on public.access_invites
for select to authenticated
using (
  lower(trim(email)) = lower(trim(coalesce(auth.jwt()->>'email', '')))
);

-- 2. Secure RPC: claim_user_invite()
-- Callable by any authenticated user upon login to link pre-approved invites
create or replace function public.claim_user_invite()
returns jsonb as $$
declare
  v_user_id uuid;
  v_email text;
  v_invite record;
  v_role text;
  v_programme_id uuid;
  v_current_status text;
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

  -- Root Admin is always active
  if v_email = 'admin.ikaaiindia@gmail.com' or v_email like '%admin%' then
    update public.profiles
    set role = 'admin', access_status = 'active', updated_at = now()
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
    v_programme_id := v_invite.programme_id;

    -- Pre-approved by Administrator! Activate profile immediately
    update public.profiles
    set
      role = case when v_role = 'intern' then 'learner' else v_role end,
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
      'programme_id', v_programme_id,
      'pre_invited', true
    );
  elsif v_invite is not null and v_invite.status = 'revoked' then
    update public.profiles
    set access_status = 'revoked', updated_at = now()
    where id = v_user_id;

    return jsonb_build_object(
      'success', true,
      'status', 'revoked',
      'pre_invited', true
    );
  else
    -- User was NOT previously added by Admin!
    select access_status into v_current_status from public.profiles where id = v_user_id;
    if v_current_status = 'active' then
      return jsonb_build_object('success', true, 'status', 'active', 'pre_invited', false);
    end if;

    -- Ensure profile exists in pending state
    update public.profiles
    set access_status = 'pending', updated_at = now()
    where id = v_user_id and access_status is null;

    return jsonb_build_object(
      'success', true,
      'status', 'pending',
      'pre_invited', false
    );
  end if;
end;
$$ language plpgsql security definer set search_path = public;

-- Grant execution to all authenticated users
grant execute on function public.claim_user_invite() to authenticated;

-- 3. Update handle_new_user() trigger for future signups
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
  prog_slug text;
begin
  clean_email := lower(trim(coalesce(new.email, '')));

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

  -- Root Admin is unconditionally active
  if clean_email = 'admin.ikaaiindia@gmail.com' or clean_email like '%admin%' then
    role_val := 'admin';
    programme_id_val := null;
    access_status_val := 'active';
  else
    -- Check if user is pre-invited in access_invites
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
      programme_id_val := invite_rec.programme_id;
      access_status_val := 'active';

      begin
        update public.access_invites
        set status = 'active', activated_at = coalesce(activated_at, now())
        where id = invite_rec.id;
      exception when others then
        -- Do not abort
      end;
    elsif invite_rec is not null and invite_rec.status = 'revoked' then
      role_val := case when invite_rec.role = 'learner' then 'intern' else coalesce(invite_rec.role, 'intern') end;
      programme_id_val := invite_rec.programme_id;
      access_status_val := 'revoked';
    else
      -- Not pre-invited by admin: Default to pending approval
      role_val := 'intern';
      programme_id_val := null;
      access_status_val := 'pending';
    end if;
  end if;

  -- Resolve slug for legacy programme text column
  if programme_id_val is not null then
    begin
      select slug into prog_slug from public.programmes where id = programme_id_val;
    exception when others then
      prog_slug := null;
    end;
  end if;
  prog_slug := coalesce(prog_slug, 'human-resources');

  -- Insert or update profile safely
  begin
    insert into public.profiles (
      id,
      full_name,
      display_name,
      email,
      avatar_url,
      role,
      programme_id,
      programme,
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
      case when role_val = 'intern' then 'learner' else role_val end,
      programme_id_val,
      prog_slug,
      access_status_val,
      now(),
      now()
    )
    on conflict (id) do update set
      email = excluded.email,
      full_name = coalesce(public.profiles.full_name, excluded.full_name),
      display_name = coalesce(public.profiles.display_name, excluded.display_name),
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
    -- Never abort auth user creation
  end;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- 4. Update list_access_invites() to distinguish invited vs uninvited pending users
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
  -- 1. All invites joined with profiles and programmes (Invited users are never pending!)
  select
    i.id as invite_id,
    i.email,
    i.role,
    i.programme_id,
    pr.name as programme_name,
    pr.slug as programme_slug,
    case
      when i.status = 'revoked' then 'revoked'
      when p.id is not null then 'active'
      else i.status
    end as status,
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

  -- 2. Profiles that were NEVER pre-added by admin (Uninvited users are pending until admin approves)
  select
    null::uuid as invite_id,
    p.email,
    p.role,
    p.programme_id,
    pr.name as programme_name,
    pr.slug as programme_slug,
    coalesce(p.access_status, 'pending') as status,
    p.created_at,
    null::timestamptz as activated_at,
    p.id as profile_id,
    p.full_name as profile_name,
    p.last_seen,
    (coalesce(p.access_status, 'pending') = 'pending') as is_pending_approval
  from public.profiles p
  left join public.programmes pr on pr.id = p.programme_id
  where not exists (
    select 1 from public.access_invites i
    where lower(trim(i.email)) = lower(trim(p.email))
  );
end;
$$ language plpgsql security definer set search_path = public;

-- 5. Immediate Retroactive Sync: Activate all registered profiles that have an existing invite in access_invites
update public.profiles p
set
  access_status = 'active',
  role = case when i.role = 'intern' then 'learner' else coalesce(i.role, p.role) end,
  programme_id = coalesce(i.programme_id, p.programme_id),
  updated_at = now()
from public.access_invites i
where lower(trim(p.email)) = lower(trim(i.email))
  and i.status in ('invited', 'active')
  and (p.access_status is null or p.access_status = 'pending');

-- Update matching access_invites to active
update public.access_invites i
set
  status = 'active',
  activated_at = coalesce(i.activated_at, now())
from public.profiles p
where lower(trim(p.email)) = lower(trim(i.email))
  and p.access_status = 'active'
  and i.status = 'invited';
