-- ====================================================================
-- IKAAI ACADEMY – FIX AUTH USER CREATION & GOOGLE SIGN-IN TRIGGER
-- Migration: 20261106_09_fix_auth_user_creation.sql
-- ====================================================================

-- 1. Relax NOT NULL constraints on legacy columns of public.profiles
alter table if exists public.profiles alter column programme drop not null;
alter table if exists public.profiles alter column display_name drop not null;
alter table if exists public.profiles alter column member_since drop not null;

-- 2. Ensure role check constraint allows both 'intern' and 'learner' (as well as instructor, admin)
alter table if exists public.profiles drop constraint if exists profiles_role_check;
alter table if exists public.profiles add constraint profiles_role_check 
  check (role in ('intern', 'learner', 'instructor', 'admin'));

-- 3. Ensure access_status check constraint exists and default is 'pending'
alter table if exists public.profiles drop constraint if exists profiles_access_status_check;
alter table if exists public.profiles add constraint profiles_access_status_check 
  check (access_status in ('active', 'pending', 'revoked'));

-- 4. Safe and resilient handle_new_user() trigger function
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
      -- Do not fail user creation if invite update fails
    end;
  elsif invite_rec is not null and invite_rec.status = 'revoked' then
    role_val := case when invite_rec.role = 'learner' then 'intern' else coalesce(invite_rec.role, 'intern') end;
    programme_id_val := invite_rec.programme_id;
    access_status_val := 'revoked';
  else
    -- Default to pending intern
    role_val := 'intern';
    programme_id_val := null;
    access_status_val := 'pending';
  end if;

  -- Resolve slug for legacy programme text column (safe fallback)
  if programme_id_val is not null then
    begin
      select slug into prog_slug from public.programmes where id = programme_id_val;
    exception when others then
      prog_slug := null;
    end;
  end if;
  prog_slug := coalesce(prog_slug, 'human-resources');

  -- Insert profile safely with exception handler so auth.users insert NEVER aborts
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
      prog_slug,
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
  exception when others then
    -- Ultra-safe fallback: minimal insert so auth.users insert NEVER rolls back
    begin
      insert into public.profiles (id, email, full_name, role, access_status)
      values (new.id, clean_email, name_val, 'intern', 'pending')
      on conflict (id) do nothing;
    exception when others then
      null; -- Never abort auth.users creation
    end;
  end;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- 5. Re-attach trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
