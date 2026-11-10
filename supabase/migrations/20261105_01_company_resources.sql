-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — COMPANY RESOURCES SYSTEM
-- Migration: 20261105_01_company_resources.sql
-- Safe to run on existing database (does not drop or delete any data)
-- ====================================================================

-- 1. CREATE COMPANY DOCUMENTS TABLE
create table if not exists public.company_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  document_type text not null check (document_type in ('policy', 'guideline', 'template', 'form', 'letter', 'report', 'other')),
  programme_id uuid references public.programmes(id) on delete set null,
  storage_path text,
  file_name text,
  file_size bigint,
  mime_type text,
  version text not null default '1.0',
  issued_by uuid references public.profiles(id) on delete set null,
  issued_at date not null default current_date,
  is_published boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. CREATE DOCUMENT VERSIONS TABLE (History of previous versions)
create table if not exists public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.company_documents(id) on delete cascade,
  version text not null,
  storage_path text not null,
  file_name text,
  file_size bigint,
  mime_type text,
  changelog text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  uploaded_at timestamptz not null default now()
);

-- 3. CREATE DOCUMENT DOWNLOADS LOG TABLE
create table if not exists public.company_document_downloads (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.company_documents(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  downloaded_at timestamptz not null default now()
);

-- 4. INDEXES FOR PERFORMANCE
create index if not exists idx_company_documents_programme on public.company_documents(programme_id);
create index if not exists idx_company_documents_doc_type on public.company_documents(document_type);
create index if not exists idx_company_documents_issued_at on public.company_documents(issued_at);
create index if not exists idx_company_documents_visibility on public.company_documents(is_published, is_archived);
create index if not exists idx_company_document_downloads_doc on public.company_document_downloads(document_id);
create index if not exists idx_company_document_downloads_user on public.company_document_downloads(user_id);
create index if not exists idx_document_versions_doc on public.document_versions(document_id);

-- 5. TRIGGER FOR UPDATED_AT
create or replace function public.set_company_documents_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tr_company_documents_updated_at on public.company_documents;
create trigger tr_company_documents_updated_at
before update on public.company_documents
for each row execute function public.set_company_documents_updated_at();

-- 6. ENABLE ROW LEVEL SECURITY
alter table public.company_documents enable row level security;
alter table public.document_versions enable row level security;
alter table public.company_document_downloads enable row level security;

-- 7. HELPER FUNCTION TO CHECK COMPANY DOCUMENT ACCESS
create or replace function public.can_access_company_document(
  p_programme_id uuid,
  p_is_published boolean,
  p_is_archived boolean
)
returns boolean as $$
declare
  v_role text;
  v_user_prog uuid;
begin
  -- Admins can read everything
  if public.is_admin() then
    return true;
  end if;

  v_role := public.current_role();
  v_user_prog := public.current_programme_id();

  -- Instructors can read documents for their own programme and All programmes (including drafts)
  if v_role in ('instructor', 'admin') then
    return (p_programme_id is null or p_programme_id = v_user_prog);
  end if;

  -- Interns: can only read published, non-archived documents for their own programme or All programmes
  if p_is_published = true and p_is_archived = false then
    return (p_programme_id is null or p_programme_id = v_user_prog);
  end if;

  return false;
end;
$$ language plpgsql stable security definer set search_path = public;

-- 8. POLICIES ON COMPANY_DOCUMENTS
-- SELECT Policy
create policy "company_documents_select_policy" on public.company_documents
for select using (
  public.can_access_company_document(programme_id, is_published, is_archived)
);

-- INSERT Policy (Admins can insert any; Instructors only for their programme)
create policy "company_documents_insert_policy" on public.company_documents
for insert with check (
  public.is_admin()
  or (
    public.current_role() = 'instructor'
    and (programme_id = public.current_programme_id())
  )
);

-- UPDATE Policy (Admins can update any; Instructors only for their programme)
create policy "company_documents_update_policy" on public.company_documents
for update using (
  public.is_admin()
  or (
    public.current_role() = 'instructor'
    and (programme_id = public.current_programme_id())
  )
);

-- DELETE Policy (Admins can delete any; Instructors only for their programme)
create policy "company_documents_delete_policy" on public.company_documents
for delete using (
  public.is_admin()
  or (
    public.current_role() = 'instructor'
    and (programme_id = public.current_programme_id())
  )
);

-- 9. POLICIES ON DOCUMENT_VERSIONS
create policy "document_versions_select_policy" on public.document_versions
for select using (
  exists (
    select 1 from public.company_documents cd
    where cd.id = document_versions.document_id
    and public.can_access_company_document(cd.programme_id, cd.is_published, cd.is_archived)
  )
);

create policy "document_versions_insert_policy" on public.document_versions
for insert with check (
  public.is_admin()
  or (
    public.current_role() = 'instructor'
    and exists (
      select 1 from public.company_documents cd
      where cd.id = document_versions.document_id
      and cd.programme_id = public.current_programme_id()
    )
  )
);

create policy "document_versions_delete_policy" on public.document_versions
for delete using (
  public.is_admin()
  or (
    public.current_role() = 'instructor'
    and exists (
      select 1 from public.company_documents cd
      where cd.id = document_versions.document_id
      and cd.programme_id = public.current_programme_id()
    )
  )
);

-- 10. POLICIES ON COMPANY_DOCUMENT_DOWNLOADS
-- Users see own download logs; Admins see all; Instructors see downloads for their programme documents
create policy "company_document_downloads_select_policy" on public.company_document_downloads
for select using (
  auth.uid() = user_id
  or public.is_admin()
  or (
    public.current_role() = 'instructor'
    and exists (
      select 1 from public.company_documents cd
      where cd.id = company_document_downloads.document_id
      and (cd.programme_id = public.current_programme_id() or cd.programme_id is null)
    )
  )
);

-- Authenticated users can log their own download
create policy "company_document_downloads_insert_policy" on public.company_document_downloads
for insert with check (
  auth.uid() = user_id
);

-- 11. RPC FUNCTION TO SAFELY LOG DOWNLOAD
create or replace function public.log_company_document_download(p_document_id uuid)
returns boolean as $$
declare
  v_doc record;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select programme_id, is_published, is_archived into v_doc
  from public.company_documents
  where id = p_document_id;

  if not found then
    raise exception 'Document not found';
  end if;

  if not public.can_access_company_document(v_doc.programme_id, v_doc.is_published, v_doc.is_archived) then
    raise exception 'Access denied to this document';
  end if;

  insert into public.company_document_downloads (document_id, user_id)
  values (p_document_id, auth.uid());

  return true;
end;
$$ language plpgsql security definer set search_path = public;

-- 12. STORAGE BUCKET CONFIGURATION (Private Bucket)
insert into storage.buckets (id, name, public)
values ('company-documents', 'company-documents', false)
on conflict (id) do nothing;

-- Security Definer to check access to storage objects in company-documents
create or replace function public.can_access_company_document_storage_path(p_storage_path text)
returns boolean as $$
declare
  v_doc record;
begin
  if public.is_admin() then
    return true;
  end if;

  -- Look up in current documents
  select programme_id, is_published, is_archived into v_doc
  from public.company_documents
  where storage_path = p_storage_path
  limit 1;

  -- Look up in version history if not in current
  if not found then
    select cd.programme_id, cd.is_published, cd.is_archived into v_doc
    from public.document_versions dv
    join public.company_documents cd on cd.id = dv.document_id
    where dv.storage_path = p_storage_path
    limit 1;
  end if;

  if not found then
    -- If document row is not registered yet, only allow admin/instructor uploading
    return public.current_role() in ('admin', 'instructor');
  end if;

  return public.can_access_company_document(v_doc.programme_id, v_doc.is_published, v_doc.is_archived);
end;
$$ language plpgsql stable security definer set search_path = public;

-- Storage Policies for company-documents
create policy "company_documents_storage_select" on storage.objects
for select using (
  bucket_id = 'company-documents'
  and (
    public.is_admin()
    or public.can_access_company_document_storage_path(name)
  )
);

create policy "company_documents_storage_insert" on storage.objects
for insert with check (
  bucket_id = 'company-documents'
  and (
    public.is_admin()
    or public.current_role() = 'instructor'
  )
);

create policy "company_documents_storage_update" on storage.objects
for update using (
  bucket_id = 'company-documents'
  and (
    public.is_admin()
    or public.current_role() = 'instructor'
  )
);

create policy "company_documents_storage_delete" on storage.objects
for delete using (
  bucket_id = 'company-documents'
  and (
    public.is_admin()
    or public.current_role() = 'instructor'
  )
);

