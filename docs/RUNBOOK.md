# Ikaai Library Portal – Production Runbook & Incident Response

**Version:** 2.0 (Production Hardening)  
**Maintained By:** Lead Infrastructure / Security Engineer  
**Backend:** Supabase PostgreSQL (`fmblkesibzjrydswwldq.supabase.co`)  
**Frontend:** GitHub Pages (`https://adminikaaiindia.github.io/ikaai-library-portal/`)

---

## 1. Routine Maintenance & Database Migrations

### 1.1 Applying Numbered SQL Migrations
All database schema changes and RLS policies are tracked under `supabase/migrations/`.

**Safe Execution Procedure:**
1. Log in to the [Supabase Dashboard](https://supabase.com/dashboard/project/fmblkesibzjrydswwldq).
2. Go to **SQL Editor** > **New Query**.
3. Paste the contents of the target migration (e.g. `20261114_17_production_hardening.sql`).
4. Click **Run** and verify the result message shows `Success. No rows returned` or the expected DDL output.
5. In the same SQL Editor, run the corresponding verification script (e.g. `verify_20261114_17.sql`).
6. Confirm all verification assertions return the expected counts.

### 1.2 Schema Cache Reload
PostgREST caches the database schema. If an RPC or column change does not reflect in the client immediately:
```sql
notify pgrst, 'reload schema';
```

---

## 2. Incident Response Scenarios

### Scenario A: Users Report "Unable to Load Dashboard" / Database Error
1. **Check Supabase Status:** Open the Supabase dashboard and verify the project database is active (not paused or throttled).
2. **Inspect Browser Console & Network:** Check the failed RPC name and HTTP status:
   - `401 Unauthorized / 42501 Permission Denied`: User session expired or RLS policy blocked the request. Have user re-authenticate.
   - `PGRST202 Function not found`: Migration was not executed or schema cache was not reloaded. Run `notify pgrst, 'reload schema';`.
   - `42883 Operator does not exist`: Data type mismatch between UUID and text in a join. Verify migrations `20261114_16` and `20261114_17` are applied.

### Scenario B: Realtime Chat or Last Seen Not Updating
1. **Verify Realtime Publication:**
   In Supabase SQL Editor:
   ```sql
   select * from pg_publication_tables where pubname = 'supabase_realtime';
   ```
   Ensure `chat_messages`, `chat_conversation_members`, and `profiles` are listed.
2. **Verify Replica Identity:**
   ```sql
   alter table public.chat_messages replica identity full;
   alter table public.profiles replica identity full;
   ```
3. **Verify CSP in Browser:** Open Browser DevTools > Network > WS (WebSockets). Confirm `wss://fmblkesibzjrydswwldq.supabase.co` connects with status 101 Switching Protocols.

### Scenario C: Compromised Account or Malicious User
1. Open the **Admin** dashboard screen.
2. Locate the compromised user email and click **Revoke Access**.
3. In Supabase Dashboard > **Authentication** > **Users**, click **Delete User** or **Ban User** to revoke all active refresh tokens immediately.

---

## 3. Secret Rotation Procedure

### 3.1 Supabase Public Anon Key
If the Supabase `anon` key must be rotated:
1. Generate a new `anon` key in Supabase Dashboard > **Settings** > **API**.
2. Open `supabase-config.js` and replace the `anonKey` string.
3. Bump cache query string in `index.html` (e.g. `supabase-config.js?v=NEW_DATE`).
4. Run `node scripts/build.js` to verify integrity.
5. Commit and push to GitHub.

> [!CAUTION]
> The Supabase `service_role` key must **NEVER** be placed in `supabase-config.js`, `app.js`, or any file committed to the frontend repository.

### 3.2 Google OAuth Client Secret
1. Open [Google Cloud Console](https://console.cloud.google.com/) > **APIs & Services** > **Credentials**.
2. Rotate or regenerate the Client Secret.
3. Open Supabase Dashboard > **Authentication** > **Providers** > **Google**.
4. Update the Client Secret and click **Save**. Client code requires no changes.

---

## 4. Storage Maintenance & Upload Limits

The portal uses Supabase Storage buckets:
- `chat-attachments`: User file uploads in team chat (limit 10 MB, strictly checked).
- `personal-documents`: Issued internship certificates, letters (limit 10 MB).
- `company-documents`: Institutional handbooks, guidelines (limit 10 MB).
- `course-files`: Curriculum slide decks and modules.

To audit storage usage, run:
```sql
select bucket_id, count(*), pg_size_pretty(sum((metadata->>'size')::bigint)) as total_size
from storage.objects
group by bucket_id;
```
