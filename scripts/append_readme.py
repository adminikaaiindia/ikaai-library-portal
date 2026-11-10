readme_addition = """

## 7. Strict Admin Approval Access Control & Cohort Assignments

### Overview & Access Model
1. **Admin Approval Gate**: No user can access portal curriculum, resources, or communication until an administrator approves their email in `access_invites`.
2. **Elimination of Self-Assignment**: The legacy "Select Your Programme" onboarding modal has been permanently removed. Programme assignments are set exclusively by administrators.
3. **Role & Programme Enforcement**:
   - `intern`: Locked to 1 assigned programme (`programme_id` required). Programme switch selector is disabled.
   - `instructor`: Locked to 1 assigned programme (`programme_id` required). Programme switch selector is disabled.
   - `admin`: Has unrestricted access across all 5 programmes (`programme_id` is null). Admin can freely switch programmes to inspect modules, submissions, and resources.
4. **Instant Gating**:
   - `pending`: Displays full-screen `#accessPendingScreen` ("Account Pending Approval"). No portal data, modules, or documents are synced or loaded.
   - `revoked`: Displays full-screen `#accessRevokedScreen` ("Access Revoked"). All portal access is blocked.
   - `active`: Enters portal immediately with assigned cohort curriculum.
5. **Last Admin Protection**: Database triggers and RPC functions explicitly block demoting or revoking access for the last remaining active administrator.

---

### Database Migration: `20261106_05_access_control_and_invites.sql`
Run the migration file in your **Supabase Project > SQL Editor**:
```sql
-- Run file: supabase/migrations/20261106_05_access_control_and_invites.sql
```

#### What It Does:
1. Creates `public.access_invites` table with lowercase unique email constraint and check constraint (`chk_access_invites_role_programme`) ensuring admins have `programme_id IS NULL` and interns/instructors have `programme_id IS NOT NULL`.
2. Adds `access_status` (`'active'`, `'pending'`, `'revoked'`, default `'pending'`) to `public.profiles`.
3. Temporarily disables `trg_guard_profile_updates`, backfills all existing profiles to `'active'` (so nobody is locked out), populates `access_invites` for current users, and safely re-enables the trigger.
4. Rewrites `handle_new_user()` auth trigger to consult `access_invites` on sign-up (ignoring user-supplied metadata). If invited, sets role, programme, and `'active'`. If uninvited, sets `'learner'`, null programme, and `'pending'`.
5. Adds trigger `trg_on_access_invite_upsert` to automatically promote any pending profile to `'active'` when an invite is created.
6. Updates security helpers (`is_active_user()`, `is_admin()`, `current_role()`, `current_programme_id()`, `can_access_chat_conversation()`) and RLS across all tables so non-active users cannot query or mutate portal data.
7. Adds secure admin RPC functions: `invite_user`, `update_user_access`, `revoke_user_access`, `restore_user_access`, and `list_access_invites`.

#### Post-Migration Verification Query:
```sql
-- 1. Check access invites table
select email, role, programme_id, status from public.access_invites;

-- 2. Check profile access status
select id, email, full_name, role, programme_id, access_status from public.profiles;

-- 3. Verify last admin protection
select count(*) as active_admins from public.profiles where role = 'admin' and access_status = 'active';
```

---

### Data Stored Summary (Data Storage Rule)
| Table | Column | Purpose | Storage Rule Justification |
| :--- | :--- | :--- | :--- |
| `public.access_invites` | `id` | UUID primary key | Unique identifier for invite records |
| `public.access_invites` | `email` | Lowercase email string | Single source of truth for approved list |
| `public.access_invites` | `role` | text (`intern`, `instructor`, `admin`) | Admin-determined role permission |
| `public.access_invites` | `programme_id` | uuid (FK `programmes.id`, nullable) | Required for intern/instructor, null for admin |
| `public.access_invites` | `status` | text (`invited`, `active`, `revoked`) | Invitation lifecycle state |
| `public.access_invites` | `invited_by` | uuid (FK `auth.users`, nullable) | Audit trail of which admin approved access |
| `public.access_invites` | `created_at` | timestamptz | Timestamp invite was created |
| `public.access_invites` | `activated_at` | timestamptz (nullable) | Timestamp user first registered / activated |
| `public.profiles` | `access_status` | text (`active`, `pending`, `revoked`) | Live account gate state |

**Deliberately NOT Stored**:
- Passwords (handled exclusively by Supabase Auth with bcrypt/argon2 hashing).
- Session tokens or API secrets (kept out of database tables).
- Duplicate copies of user profile metadata.
- Keystrokes, navigation clicks, or browser fingerprinting data.
"""

with open("README.md", "a", encoding="utf-8") as f:
    f.write(readme_addition)

print("Updated README.md with section 7.")
