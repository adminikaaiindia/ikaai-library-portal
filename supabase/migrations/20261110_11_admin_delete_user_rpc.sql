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

