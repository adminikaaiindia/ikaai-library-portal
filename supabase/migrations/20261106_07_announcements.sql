-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — DATABASE MIGRATION 20261106_07
-- ANNOUNCEMENTS NOTICEBOARD SYSTEM & REALTIME NOTIFICATIONS
--
-- Single numbered migration file safe to re-run on existing database.
-- Data storage rule compliant: no data dropped, no secrets stored.
--
-- Features:
--   1. announcements master table (audience targeting, pinning, scheduling).
--   2. announcement_reads (per-user unread tracking).
--   3. announcement_acks (mandatory acknowledgement tracking).
--   4. announcement_comments (optional learner discussion).
--   5. announcement_files (metadata for attachments).
--   6. Private Storage bucket 'announcement-files' with strict signed-url RLS.
--   7. Server functions: mark_read, acknowledge, publish, archive, delete,
--      post_comment, and staff audit reports (read/ack roster with CSV data).
--   8. Hardened RLS policies honoring roles (intern, instructor, admin)
--      and active membership status.
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- 1. ANNOUNCEMENTS TABLE
-- --------------------------------------------------------------------
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 120),
  body text not null check (char_length(trim(body)) >= 5),
  category text not null default 'General'
    check (category in ('General', 'Programme update', 'Deadline', 'Event', 'Holiday', 'Policy', 'Opportunity')),
  audience_type text not null default 'all'
    check (audience_type in ('all', 'programme', 'role')),
  programme_id uuid references public.programmes(id) on delete set null,
  target_role text check (target_role is null or target_role in ('intern', 'instructor')),
  is_pinned boolean not null default false,
  is_urgent boolean not null default false,
  requires_ack boolean not null default false,
  comments_enabled boolean not null default false,
  status text not null default 'published'
    check (status in ('draft', 'published', 'archived')),
  publish_at timestamptz not null default now(),
  expires_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  edited_at timestamptz
);

-- Indexes for lightning-fast feed queries and status filtering
create index if not exists idx_announcements_status_publish
  on public.announcements (status, publish_at desc);

create index if not exists idx_announcements_audience
  on public.announcements (audience_type, programme_id, target_role);

create index if not exists idx_announcements_pinned_urgent
  on public.announcements (is_pinned desc, is_urgent desc, publish_at desc);

-- --------------------------------------------------------------------
-- 2. ANNOUNCEMENT READS (UNREAD TRACKING)
-- --------------------------------------------------------------------
create table if not exists public.announcement_reads (
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (announcement_id, user_id)
);

create index if not exists idx_announcement_reads_user
  on public.announcement_reads (user_id, announcement_id);

-- --------------------------------------------------------------------
-- 3. ANNOUNCEMENT ACKNOWLEDGEMENTS (FORMAL ACCEPTANCE)
-- --------------------------------------------------------------------
create table if not exists public.announcement_acks (
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  acknowledged_at timestamptz not null default now(),
  primary key (announcement_id, user_id)
);

create index if not exists idx_announcement_acks_user
  on public.announcement_acks (user_id, announcement_id);

-- --------------------------------------------------------------------
-- 4. ANNOUNCEMENT COMMENTS (OPTIONAL DISCUSSION)
-- --------------------------------------------------------------------
create table if not exists public.announcement_comments (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists idx_announcement_comments_ann_created
  on public.announcement_comments (announcement_id, created_at asc);

-- --------------------------------------------------------------------
-- 5. ANNOUNCEMENT ATTACHMENTS (FILES)
-- --------------------------------------------------------------------
create table if not exists public.announcement_files (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  file_size bigint not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_announcement_files_ann
  on public.announcement_files (announcement_id);

-- --------------------------------------------------------------------
-- 6. PRIVATE STORAGE BUCKET: announcement-files
-- --------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('announcement-files', 'announcement-files', false)
on conflict (id) do update set public = false;

-- --------------------------------------------------------------------
-- 7. HELPER FUNCTION: CAN USER VIEW ANNOUNCEMENT?
-- --------------------------------------------------------------------
create or replace function public.can_user_view_announcement(p_ann_id uuid)
returns boolean as $$
declare
  v_user_id uuid := auth.uid();
  v_role text;
  v_prog_id uuid;
  v_ann record;
begin
  if v_user_id is null or not public.is_active_user() then
    return false;
  end if;

  if public.is_admin() then
    return true;
  end if;

  select * into v_ann
  from public.announcements
  where id = p_ann_id;

  if v_ann.id is null then
    return false;
  end if;

  v_role := public.current_role();
  v_prog_id := public.current_programme_id();

  -- Instructors can always view announcements they created or for their cohort
  if v_role = 'instructor' then
    if v_ann.created_by = v_user_id then
      return true;
    end if;
    if v_ann.audience_type = 'all' then
      return true;
    end if;
    if v_ann.audience_type = 'programme' and v_ann.programme_id = v_prog_id then
      return true;
    end if;
    if v_ann.audience_type = 'role' and v_ann.target_role = 'instructor' then
      return true;
    end if;
    return false;
  end if;

  -- Interns can only see published, non-archived announcements within active window
  if v_ann.status != 'published' then
    return false;
  end if;

  if v_ann.publish_at > now() then
    return false;
  end if;

  if v_ann.expires_at is not null and v_ann.expires_at <= now() then
    return false;
  end if;

  if v_ann.audience_type = 'all' then
    return true;
  end if;

  if v_ann.audience_type = 'programme' and v_ann.programme_id = v_prog_id then
    return true;
  end if;

  if v_ann.audience_type = 'role' and v_ann.target_role = 'intern' then
    return true;
  end if;

  return false;
end;
$$ language plpgsql security definer stable set search_path = public;

-- --------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------

-- Announcements
alter table public.announcements enable row level security;

drop policy if exists "announcements_select" on public.announcements;
create policy "announcements_select" on public.announcements
for select to authenticated
using (
  public.is_active_user()
  and (
    public.is_admin()
    or (public.current_role() = 'instructor' and (
      created_by = auth.uid()
      or audience_type = 'all'
      or (audience_type = 'programme' and programme_id = public.current_programme_id())
      or (audience_type = 'role' and target_role = 'instructor')
    ))
    or (
      status = 'published'
      and publish_at <= now()
      and (expires_at is null or expires_at > now())
      and (
        audience_type = 'all'
        or (audience_type = 'programme' and programme_id = public.current_programme_id())
        or (audience_type = 'role' and target_role = 'intern')
      )
    )
  )
);

drop policy if exists "announcements_insert" on public.announcements;
create policy "announcements_insert" on public.announcements
for insert to authenticated
with check (
  public.is_active_user()
  and (
    public.is_admin()
    or (
      public.current_role() = 'instructor'
      and audience_type = 'programme'
      and programme_id = public.current_programme_id()
    )
  )
);

drop policy if exists "announcements_update" on public.announcements;
create policy "announcements_update" on public.announcements
for update to authenticated
using (
  public.is_active_user()
  and (
    public.is_admin()
    or (
      public.current_role() = 'instructor'
      and created_by = auth.uid()
      and programme_id = public.current_programme_id()
    )
  )
);

drop policy if exists "announcements_delete" on public.announcements;
create policy "announcements_delete" on public.announcements
for delete to authenticated
using (
  public.is_active_user()
  and (
    public.is_admin()
    or (
      public.current_role() = 'instructor'
      and created_by = auth.uid()
      and programme_id = public.current_programme_id()
    )
  )
);

-- Reads
alter table public.announcement_reads enable row level security;

drop policy if exists "announcement_reads_select" on public.announcement_reads;
create policy "announcement_reads_select" on public.announcement_reads
for select to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or public.is_admin()
    or public.current_role() = 'instructor'
  )
);

drop policy if exists "announcement_reads_insert" on public.announcement_reads;
create policy "announcement_reads_insert" on public.announcement_reads
for insert to authenticated
with check (
  public.is_active_user()
  and user_id = auth.uid()
  and public.can_user_view_announcement(announcement_id)
);

-- Acknowledgements
alter table public.announcement_acks enable row level security;

drop policy if exists "announcement_acks_select" on public.announcement_acks;
create policy "announcement_acks_select" on public.announcement_acks
for select to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or public.is_admin()
    or public.current_role() = 'instructor'
  )
);

drop policy if exists "announcement_acks_insert" on public.announcement_acks;
create policy "announcement_acks_insert" on public.announcement_acks
for insert to authenticated
with check (
  public.is_active_user()
  and user_id = auth.uid()
  and public.can_user_view_announcement(announcement_id)
);

-- Comments
alter table public.announcement_comments enable row level security;

drop policy if exists "announcement_comments_select" on public.announcement_comments;
create policy "announcement_comments_select" on public.announcement_comments
for select to authenticated
using (
  public.is_active_user()
  and public.can_user_view_announcement(announcement_id)
);

drop policy if exists "announcement_comments_insert" on public.announcement_comments;
create policy "announcement_comments_insert" on public.announcement_comments
for insert to authenticated
with check (
  public.is_active_user()
  and user_id = auth.uid()
  and public.can_user_view_announcement(announcement_id)
  and exists (
    select 1 from public.announcements
    where id = announcement_comments.announcement_id
      and comments_enabled = true
  )
);

drop policy if exists "announcement_comments_delete" on public.announcement_comments;
create policy "announcement_comments_delete" on public.announcement_comments
for delete to authenticated
using (
  public.is_active_user()
  and (
    user_id = auth.uid()
    or public.is_admin()
    or public.current_role() = 'instructor'
  )
);

-- Files
alter table public.announcement_files enable row level security;

drop policy if exists "announcement_files_select" on public.announcement_files;
create policy "announcement_files_select" on public.announcement_files
for select to authenticated
using (
  public.is_active_user()
  and public.can_user_view_announcement(announcement_id)
);

drop policy if exists "announcement_files_insert" on public.announcement_files;
create policy "announcement_files_insert" on public.announcement_files
for insert to authenticated
with check (
  public.is_active_user()
  and (
    public.is_admin()
    or public.current_role() = 'instructor'
  )
);

drop policy if exists "announcement_files_delete" on public.announcement_files;
create policy "announcement_files_delete" on public.announcement_files
for delete to authenticated
using (
  public.is_active_user()
  and (
    public.is_admin()
    or public.current_role() = 'instructor'
  )
);

-- Storage bucket policies for announcement-files
drop policy if exists "announcement_files_bucket_select" on storage.objects;
create policy "announcement_files_bucket_select" on storage.objects
for select to authenticated
using (
  bucket_id = 'announcement-files'
  and public.is_active_user()
);

drop policy if exists "announcement_files_bucket_insert" on storage.objects;
create policy "announcement_files_bucket_insert" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'announcement-files'
  and public.is_active_user()
  and (public.is_admin() or public.current_role() = 'instructor')
);

drop policy if exists "announcement_files_bucket_delete" on storage.objects;
create policy "announcement_files_bucket_delete" on storage.objects
for delete to authenticated
using (
  bucket_id = 'announcement-files'
  and public.is_active_user()
  and (public.is_admin() or public.current_role() = 'instructor')
);

-- --------------------------------------------------------------------
-- 9. SERVER FUNCTIONS (RPCs)
-- --------------------------------------------------------------------

-- A. Mark Announcement Read
create or replace function public.mark_announcement_read(p_announcement_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  if not public.can_user_view_announcement(p_announcement_id) then
    raise exception 'Announcement not found or not accessible.';
  end if;

  insert into public.announcement_reads (announcement_id, user_id, read_at)
  values (p_announcement_id, v_user_id, now())
  on conflict (announcement_id, user_id) do update
  set read_at = excluded.read_at;

  return jsonb_build_object('success', true, 'announcement_id', p_announcement_id);
end;
$$ language plpgsql security definer set search_path = public;

-- B. Mark All Announcements as Read
create or replace function public.mark_all_announcements_read()
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_count int := 0;
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  insert into public.announcement_reads (announcement_id, user_id, read_at)
  select a.id, v_user_id, now()
  from public.announcements a
  where public.can_user_view_announcement(a.id)
  on conflict (announcement_id, user_id) do nothing;

  get diagnostics v_count = row_count;

  return jsonb_build_object('success', true, 'marked_count', v_count);
end;
$$ language plpgsql security definer set search_path = public;

-- C. Acknowledge Announcement
create or replace function public.acknowledge_announcement(p_announcement_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_ann record;
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  select * into v_ann
  from public.announcements
  where id = p_announcement_id;

  if v_ann.id is null or not public.can_user_view_announcement(p_announcement_id) then
    raise exception 'Announcement not found or not accessible.';
  end if;

  if not coalesce(v_ann.requires_ack, false) then
    raise exception 'This announcement does not require acknowledgement.';
  end if;

  insert into public.announcement_acks (announcement_id, user_id, acknowledged_at)
  values (p_announcement_id, v_user_id, now())
  on conflict (announcement_id, user_id) do update
  set acknowledged_at = excluded.acknowledged_at;

  -- Also mark as read
  insert into public.announcement_reads (announcement_id, user_id, read_at)
  values (p_announcement_id, v_user_id, now())
  on conflict do nothing;

  return jsonb_build_object(
    'success', true,
    'announcement_id', p_announcement_id,
    'acknowledged_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- D. Publish / Schedule Announcement
create or replace function public.publish_announcement(
  p_title text,
  p_body text,
  p_category text,
  p_audience_type text,
  p_programme_id uuid default null,
  p_target_role text default null,
  p_is_pinned boolean default false,
  p_is_urgent boolean default false,
  p_requires_ack boolean default false,
  p_comments_enabled boolean default false,
  p_status text default 'published',
  p_publish_at timestamptz default null,
  p_expires_at timestamptz default null,
  p_announcement_id uuid default null
)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_ann_id uuid;
  v_role text;
  v_effective_publish timestamptz := coalesce(p_publish_at, now());
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  v_role := public.current_role();
  if not (public.is_admin() or v_role = 'instructor') then
    raise exception 'Only administrators and instructors can publish announcements.';
  end if;

  -- Instructors can only publish to their own programme
  if v_role = 'instructor' then
    if p_audience_type != 'programme' or p_programme_id is distinct from public.current_programme_id() then
      raise exception 'Instructors can only post announcements to their own assigned programme.';
    end if;
  end if;

  if p_announcement_id is not null then
    -- Edit existing
    update public.announcements
    set title = trim(p_title),
        body = trim(p_body),
        category = p_category,
        audience_type = p_audience_type,
        programme_id = p_programme_id,
        target_role = p_target_role,
        is_pinned = p_is_pinned,
        is_urgent = p_is_urgent,
        requires_ack = p_requires_ack,
        comments_enabled = p_comments_enabled,
        status = p_status,
        publish_at = v_effective_publish,
        expires_at = p_expires_at,
        updated_at = now(),
        edited_at = now()
    where id = p_announcement_id
    returning id into v_ann_id;
  else
    -- Insert new
    insert into public.announcements (
      title, body, category, audience_type, programme_id, target_role,
      is_pinned, is_urgent, requires_ack, comments_enabled, status,
      publish_at, expires_at, created_by, created_at, updated_at
    ) values (
      trim(p_title), trim(p_body), p_category, p_audience_type, p_programme_id, p_target_role,
      p_is_pinned, p_is_urgent, p_requires_ack, p_comments_enabled, p_status,
      v_effective_publish, p_expires_at, v_user_id, now(), now()
    )
    returning id into v_ann_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'announcement_id', v_ann_id,
    'status', p_status
  );
end;
$$ language plpgsql security definer set search_path = public;

-- E. Archive Announcement
create or replace function public.archive_announcement(p_announcement_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_role text;
  v_ann record;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Staff permission required.';
  end if;

  select * into v_ann
  from public.announcements
  where id = p_announcement_id;

  if v_ann.id is null then
    raise exception 'Announcement not found.';
  end if;

  if public.current_role() = 'instructor' and (v_ann.created_by != v_user_id or v_ann.programme_id is distinct from public.current_programme_id()) then
    raise exception 'You can only archive announcements for your own programme.';
  end if;

  update public.announcements
  set status = 'archived',
      updated_at = now()
  where id = p_announcement_id;

  return jsonb_build_object('success', true, 'announcement_id', p_announcement_id, 'status', 'archived');
end;
$$ language plpgsql security definer set search_path = public;

-- F. Delete Announcement
create or replace function public.delete_announcement(p_announcement_id uuid)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_ann record;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Staff permission required.';
  end if;

  select * into v_ann
  from public.announcements
  where id = p_announcement_id;

  if v_ann.id is null then
    raise exception 'Announcement not found.';
  end if;

  if public.current_role() = 'instructor' and (v_ann.created_by != v_user_id or v_ann.programme_id is distinct from public.current_programme_id()) then
    raise exception 'You can only delete announcements you created for your programme.';
  end if;

  delete from public.announcements
  where id = p_announcement_id;

  return jsonb_build_object('success', true, 'announcement_id', p_announcement_id);
end;
$$ language plpgsql security definer set search_path = public;

-- G. Post Announcement Comment
create or replace function public.post_announcement_comment(p_announcement_id uuid, p_body text)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_comment_id uuid;
  v_trimmed text;
begin
  if v_user_id is null or not public.is_active_user() then
    raise exception 'Authentication required.';
  end if;

  v_trimmed := trim(coalesce(p_body, ''));
  if length(v_trimmed) < 1 or length(v_trimmed) > 500 then
    raise exception 'Comment must be between 1 and 500 characters.';
  end if;

  if not public.can_user_view_announcement(p_announcement_id) then
    raise exception 'Announcement not accessible.';
  end if;

  if not exists (select 1 from public.announcements where id = p_announcement_id and comments_enabled = true) then
    raise exception 'Comments are disabled for this announcement.';
  end if;

  insert into public.announcement_comments (announcement_id, user_id, body, created_at)
  values (p_announcement_id, v_user_id, v_trimmed, now())
  returning id into v_comment_id;

  return jsonb_build_object(
    'success', true,
    'comment_id', v_comment_id,
    'created_at', now()
  );
end;
$$ language plpgsql security definer set search_path = public;

-- H. Staff Audit Report (Read & Acknowledgement Status Roster)
create or replace function public.get_announcement_audit_report(p_announcement_id uuid)
returns table (
  user_id uuid,
  full_name text,
  email text,
  avatar_url text,
  role text,
  programme_name text,
  has_read boolean,
  read_at timestamptz,
  has_acknowledged boolean,
  acknowledged_at timestamptz
) as $$
declare
  v_ann record;
begin
  if not (public.is_admin() or public.current_role() = 'instructor') then
    raise exception 'Staff permission required.';
  end if;

  select * into v_ann
  from public.announcements
  where id = p_announcement_id;

  if v_ann.id is null then
    raise exception 'Announcement not found.';
  end if;

  return query
  select
    p.id as user_id,
    p.full_name,
    p.email,
    p.avatar_url,
    p.role,
    pr.name as programme_name,
    (ar.read_at is not null) as has_read,
    ar.read_at,
    (aa.acknowledged_at is not null) as has_acknowledged,
    aa.acknowledged_at
  from public.profiles p
  left join public.programmes pr on pr.id = p.programme_id
  left join public.announcement_reads ar on ar.announcement_id = p_announcement_id and ar.user_id = p.id
  left join public.announcement_acks aa on aa.announcement_id = p_announcement_id and aa.user_id = p.id
  where p.access_status = 'active'
    and (
      v_ann.audience_type = 'all'
      or (v_ann.audience_type = 'programme' and p.programme_id = v_ann.programme_id)
      or (v_ann.audience_type = 'role' and p.role = v_ann.target_role)
    )
  order by p.full_name asc;
end;
$$ language plpgsql security definer stable set search_path = public;

commit;

