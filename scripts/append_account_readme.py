account_readme_section = """
---

## 5. Account Settings & Avatar Storage Setup

### Database Migration: `20261106_04_account_settings_and_avatars.sql`

To apply the storage policies and ensure the `avatars` bucket is strictly configured:
1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Run the script: [`supabase/migrations/20261106_04_account_settings_and_avatars.sql`](supabase/migrations/20261106_04_account_settings_and_avatars.sql).
3. Confirm that the `avatars` bucket exists with:
   - **Public**: `true`
   - **File size limit**: `2097152` (2 MB)
   - **Allowed mime types**: `image/png`, `image/jpeg`, `image/jpg`, `image/webp`
   - **Path-isolated RLS policies**: Users can only upload, update, and delete files in their own folder `{user_id}/*`.

---

## 6. Data Stored Summary for Account Settings

| Screen Field | Storage Location | Data Type / Notes |
| :--- | :--- | :--- |
| **Email Address** | `public.profiles.email` & `auth.users.email` | Read-only for non-admins; managed via Supabase Auth. |
| **Sign-in Method** | `auth.users.app_metadata.provider` / `identities` | Evaluated dynamically ("Google Account" or "Email & Password"). |
| **Current Role** | `public.profiles.role` | Protected by guard trigger; editable only by Admins. |
| **Assigned Programme**| `public.profiles.programme_id` (FK to `programmes.id`) | Name resolved from `programmes` table; protected by guard trigger. |
| **Office Branch** | `public.profiles.branch` | Protected by guard trigger; editable only by Admins. |
| **Position Title** | `public.profiles.position` | Protected by guard trigger; editable only by Admins. |
| **Member Since** | `public.profiles.member_since_date` (or `created_at`)| Standard date; read-only. |
| **Account Verification**| `auth.users.email_confirmed_at` / Google provider | Real verification status derived from Auth; never a static label. |
| **Full Name** | `public.profiles.full_name` | Single source of truth for user's legal name (2-60 chars). |
| **Phone Number** | `public.profiles.phone` | Optional contact number (validated pattern). |
| **Profile Photo** | `public.profiles.avatar_url` & `storage/avatars/{user_id}/*` | Stored in Supabase `avatars` bucket; max 2 MB; old photo deleted on replace/remove. |
| **Account Password** | **Supabase Auth only (`auth.users`)** | Updated via `supabase.auth.updateUser()`. **NEVER** stored in any database table. |
| **Session State** | **Supabase Auth Session (HTTP Cookies/Token)** | Signed out via `supabase.auth.signOut()`. No user data kept in localStorage. |
"""

with open('README.md', 'r', encoding='utf-8') as f:
    current_readme = f.read()

if 'Account Settings & Avatar Storage Setup' not in current_readme:
    with open('README.md', 'a', encoding='utf-8') as f:
        f.write(account_readme_section)
    print("Appended Account Settings documentation to README.md")
else:
    print("README.md already includes Account Settings section.")

