import re

with open("supabase/migrations/20261106_05_access_control_and_invites.sql", "r", encoding="utf-8") as f:
    sql = f.read()

# Replace the incorrect status = 'published' and status in ('published', 'acknowledged')
target_section = """-- G. COMPANY DOCUMENTS TABLE: Strictly active users only
drop policy if exists "company_documents_select_policy" on public.company_documents;
create policy "company_documents_select_policy" on public.company_documents
for select to authenticated
using (
  public.is_active_user()
  and (
    public.is_admin()
    or (
      status = 'published'
      and (
        programme_id is null
        or programme_id = public.current_programme_id()
      )
    )
  )
);

-- H. PERSONAL DOCUMENTS TABLE: Strictly active recipient & admins only
drop policy if exists "personal_docs_recipient_select" on public.personal_documents;
create policy "personal_docs_recipient_select" on public.personal_documents
for select to authenticated
using (
  public.is_active_user()
  and (
    (recipient_id = auth.uid() and status in ('published', 'acknowledged'))
    or public.is_admin()
  )
);"""

replacement_section = """-- G. COMPANY DOCUMENTS TABLE: Strictly active users only (Conditional & using real columns: is_published, is_archived)
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
end $$;"""

if target_section in sql:
    sql = sql.replace(target_section, replacement_section)
    print("Replaced document policies with conditional, schema-accurate checks.")
else:
    print("WARNING: target_section not found!")

# Also safeguard can_access_chat_conversation if chat_conversations table does not exist
chat_check = """  -- 2. Get conversation details
  select type, programme_id, programme_slug into conv_type, conv_prog_id, conv_prog_slug
  from public.chat_conversations
  where id = conv_id;"""

safe_chat_check = """  -- 2. Check if chat_conversations table exists
  if to_regclass('public.chat_conversations') is null then
    return true;
  end if;

  -- 3. Get conversation details
  select type, programme_id, programme_slug into conv_type, conv_prog_id, conv_prog_slug
  from public.chat_conversations
  where id = conv_id;"""

if chat_check in sql:
    sql = sql.replace(chat_check, safe_chat_check)
    print("Safeguarded can_access_chat_conversation with to_regclass check.")

with open("supabase/migrations/20261106_05_access_control_and_invites.sql", "w", encoding="utf-8") as f:
    f.write(sql)

print("Migration 05 written successfully!")

