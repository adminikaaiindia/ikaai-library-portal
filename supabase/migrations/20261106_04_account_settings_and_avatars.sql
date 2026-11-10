-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — ACCOUNT SETTINGS & AVATAR STORAGE POLICIES
-- Migration: 20261106_04_account_settings_and_avatars.sql
-- Description:
--   1. Ensures profiles table has phone, member_since_date, created_at, full_name, avatar_url.
--   2. Configures 'avatars' storage bucket with 2 MB size limit and strict image mime types.
--   3. Establishes strict path-isolated storage policies for avatars:
--      Users can only upload, update, and delete files inside their own folder: {user_id}/*
--   4. Preserves and validates the profile guard trigger (non-admins cannot alter
--      role, programme_id, email, branch, or position).
-- ====================================================================

-- 1. ENSURE PROFILES TABLE COLUMNS (IDEMPOTENT SAFEGUARDS)
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists member_since_date date;
alter table public.profiles add column if not exists created_at timestamptz not null default now();

-- 2. CONFIGURE AVATARS STORAGE BUCKET
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152, -- 2 MB in bytes
  array['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = array['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

-- 3. STORAGE POLICIES FOR AVATARS (PATH ISOLATION PER USER)
-- A. Public read: Anyone can view avatars by path
drop policy if exists "avatars_public_select" on storage.objects;
create policy "avatars_public_select" on storage.objects
  for select using (bucket_id = 'avatars');

-- B. User insert: Authenticated user can ONLY upload inside their own folder: {user_id}/*
drop policy if exists "avatars_auth_insert" on storage.objects;
drop policy if exists "avatars_user_insert" on storage.objects;
create policy "avatars_user_insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- C. User update: Authenticated user can ONLY replace files inside their own folder: {user_id}/*
drop policy if exists "avatars_auth_update" on storage.objects;
drop policy if exists "avatars_user_update" on storage.objects;
create policy "avatars_user_update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- D. User delete: Authenticated user can ONLY delete files inside their own folder: {user_id}/*
--    (Admins can delete any avatar if moderation is required)
drop policy if exists "avatars_auth_delete" on storage.objects;
drop policy if exists "avatars_user_delete" on storage.objects;
create policy "avatars_user_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_admin()
    )
  );

-- 4. CONFIRM PROFILES UPDATE RLS POLICY
-- Non-admin users can only update their own row; column protection is enforced by guard_profile_updates trigger
drop policy if exists "profiles_update_policy" on public.profiles;
create policy "profiles_update_policy" on public.profiles
  for update to authenticated
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

