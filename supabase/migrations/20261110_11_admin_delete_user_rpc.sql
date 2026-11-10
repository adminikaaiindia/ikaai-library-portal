-- ============================================================================
-- IKAAI ACADEMY – MIGRATION 20261110_11_ADMIN_DELETE_USER_RPC
-- Adds admin user deletion RPC and delete policy for profiles
-- ============================================================================

-- 1. Create DELETE policy on public.profiles for admins
drop policy if exists "profiles_delete_policy" on public.profiles;
create policy "profiles_delete_policy" on public.profiles
for delete to authenticated
using (public.is_admin());

-- 2. Dedicated admin-only delete_user RPC
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

  if target_role = 'admin' or target_email in ('admin.ikaaiindia@gmail.com', 'akshaytiwarigaming@gmail.com', 'akshaytiwari8527@gmail.com') then
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

-- 3. Resilient invite_user RPC (prevents idx_access_invites_lower_email unique constraint violations)
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
  existing_invite_id uuid;
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

  -- Check if invite already exists by lower(trim(email))
  select id into existing_invite_id
  from public.access_invites
  where lower(trim(email)) = clean_email;

  if existing_invite_id is not null then
    update public.access_invites
    set
      role = clean_role,
      programme_id = p_programme_id,
      status = case when status = 'revoked' then 'invited' else status end,
      invited_by = auth.uid()
    where id = existing_invite_id
    returning id into invite_id;
  else
    insert into public.access_invites (
      email, role, programme_id, status, invited_by, created_at
    )
    values (
      clean_email, clean_role, p_programme_id, 'invited', auth.uid(), now()
    )
    returning id into invite_id;
  end if;

  -- If matching profile already exists in pending or revoked state, activate immediately
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

