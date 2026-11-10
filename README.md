# Ikaai Academy – Learning Portal

A full-stack, responsive dark-themed learning portal for new joiners and interns at **Ikaai India Foundation** (https://ikaaiindia.in).

---

## 🚀 Quick Start (Running the Site)

The portal requires no build step. You can open it in any modern browser:

### Option 1: Using the Local Web Server (Recommended)
Run the Python built-in static server:
```bash
python -m http.server 8080
```
Then visit: **http://localhost:8080/index.html**

### Option 2: Direct File Open
Double-click `index.html` to open it in Chrome, Edge, or Firefox.

---

## 🔐 Authentication & Access Control

The portal is powered by **Supabase Authentication** with both **Email/Password** and **Google Sign-In**:
- **Offline / Local Mode**: When developing without an active Supabase backend, the portal operates in Demo Mode with full local simulation.
- **Production Supabase Mode**: Automatically connects using credentials in supabase-config.js, managing live sessions, user profiles, role-based authorization (Intern, Instructor, Admin), learning progress, and real-time team chat.

---

## 📂 Job Descriptions (JDs)

All 11 official Word (.docx) specifications are parsed at build time and available in the portal under the **Job Descriptions** menu:
- Full document structure (headings, tables, bullet lists, bold text) is rendered natively in dark theme.
- Filter chips: *Research*, *HR & Admin*, *Data Analyst*, *Business Development*, *Social Media & Design*.
- Each JD includes a **Download original (.docx)** link to the file in the `JD/` directory and a **Print** feature.



---

## 🏛️ Stage 1 Backend: Supabase Integration & Architecture

The portal has been transitioned from client-side mock storage to a production-grade **Supabase PostgreSQL** backend with strict **Row Level Security (RLS)**, server-side scoring, zero-trust timer enforcement, and multi-role access control.

### 1. The 5 Cohort Programmes
The backend models the 5 official Ikaai India training programmes:
1. **Human Resources** (`human-resources`)
2. **Data Analyst** (`data-analyst`)
3. **Social Research & Policy** (`social-research-policy`)
4. **Design & Social Media** (`design-social-media`)
5. **Business Development** (`business-development`)

### 2. Database Migrations Execution Order
Run the migration scripts in the Supabase SQL Editor in the exact numeric sequence:

1. **`supabase/migrations/20261104_01_core_schema.sql`**:
   - Creates `programmes`, `profiles`, `modules`, `resources`, `faqs`, `quizzes`, `quiz_questions`, `quiz_options`, `exam_questions`, `jobs`, `resource_completions`, `module_progress`, `faq_reads`, `quiz_attempts`, `quiz_answers`, `exam_submissions`, `exam_answers`, and `feedback`.
   - Creates safe learner view `v_quiz_options_learner` (excluding `is_correct`), `v_my_grades`, and `v_programme_completion`.
   - Adds indexes on all foreign keys and `(user_id, module_id)` queries.

2. **`supabase/migrations/20261104_02_rls_policies.sql`**:
   - Implements `SECURITY DEFINER` helper functions (`current_role()`, `current_programme_id()`, `is_admin()`, `is_instructor_for()`).
   - Enables RLS on every table. Interns can only read their assigned programme curriculum and mutate their own progress. Instructors can access their cohort. Admins have global access.
   - Profile trigger guards: prevents learners from self-promoting or altering their assigned programme.

3. **`supabase/migrations/20261104_03_server_functions.sql`**:
   - `open_module(module_id)`: Records server timestamp `opened_at`.
   - `complete_module_timer(module_id)`: Strict server-clock validation ensuring `now() - opened_at >= interval '30 seconds'`.
   - `mark_resource_complete(resource_id)`: Verifies timer completion before allowing resource ticks.
   - `mark_faq_read(faq_id)`: Records FAQ review.
   - `submit_quiz(quiz_id, answers)`: Evaluates answers on the server against protected `quiz_options.is_correct`, records attempt, calculates letter grade, and unlocks next module if passed.
   - `submit_exam(programme_id, answers)`: Saves written exam essays for instructor review.
   - `grade_exam(submission_id, marks, comment)`: Allows instructors and admins to grade written exams.

4. **`supabase/seed.sql`**:
   - Idempotently seeds all 5 programmes, 30 modules, resources, FAQs, quizzes, exam prompts, and full 11 Job Descriptions without hard-coded fake user progress.

### 3. Storage Buckets
Create the following storage buckets in **Supabase Dashboard > Storage**:
- **`course-files`**: Private (only signed-in cohort members can read course documents).
- **`job-descriptions`**: Public (allows learners to download full original Word specifications).
- **`avatars`**: Public (for user profile avatars).

### 4. How to Promote the First Admin
To promote an account to full administrative control (enabling the Admin Portal and cross-programme switcher):
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

### 5. Architecture Documentation & Testing
- **[docs/BACKEND_PLAN.md](docs/BACKEND_PLAN.md)**: Full audit of frontend data structures and Postgres entity mappings.
- **[docs/MISSING_FILES.md](docs/MISSING_FILES.md)**: Inventory of referenced module documents and slides for Supabase storage upload.
- **[docs/TEST_CHECKLIST.md](docs/TEST_CHECKLIST.md)**: Step-by-step verification checklist for Intern, Instructor, and Admin roles.

---

## 📬 Support Inbox & Supabase Backend Setup

The **"Message Instructor"** section has been rebuilt as a professional, production-grade support inbox with a split two-panel desktop layout, instant FAQ quick-answers, attachment uploads, read receipts, resolved ratings, role switching (Learner vs Instructor/Admin), stats strip, saved templates, and private internal notes.

### 1. Run Database Migrations in Supabase SQL Editor
1. Open your Supabase Dashboard: [https://supabase.com/dashboard/project/fmblkesibzjrydswwldq](https://supabase.com/dashboard/project/fmblkesibzjrydswwldq)
2. In the left navigation, click **SQL Editor** -> **New Query**.
3. Open the file `supabase/migrations/20261102_support_inbox_schema.sql` located in this project.
4. Copy its entire content, paste it into the Supabase SQL Editor, and click **Run**.
   - This sets up:
     - `profiles` with `role` (`learner`, `instructor`, `admin`), `display_name`, `avatar_url`, and `programme`.
     - `message_threads` with RLS policies, indexes, and full columns.
     - `messages` with attachment support, read receipts, and rate-limiting check (10 messages per minute trigger).
     - `canned_replies` seeded with default response templates.
     - `internal_notes` for private staff-only communications (hidden from learners via RLS).
     - Supabase Realtime publication for `message_threads` and `messages`.

### 2. How to Make a User an Instructor or Admin
To grant an account instructor or admin privileges:
1. In Supabase Dashboard, navigate to **Table Editor** > `profiles`.
2. Find the row corresponding to the user's email.
3. Edit the `role` column and set it to:
   - `'instructor'` – Allows managing and answering tickets for their programme, private internal notes, and stats strip.
   - `'admin'` – Full access including managing canned response templates across programmes.
4. Alternatively, execute this SQL in the SQL Editor:
   ```sql
   UPDATE public.profiles
   SET role = 'instructor'
   WHERE email = 'admin.ikaaiindia@gmail.com';
   ```
*(Note: You can also use the **Learner / Instructor View** toggle pill directly in the top right of the Message Instructor screen to switch roles on the fly during local testing!)*

### 3. Create the Private Storage Bucket for Attachments
1. In Supabase Dashboard, go to **Storage** -> **New Bucket**.
2. Bucket name: `support-attachments`
3. Toggle **Public bucket** to **OFF** (Keep it Private).
4. Save the bucket. The migration script already configured Row Level Security policies allowing learners to upload files to their thread folders and participants to read attachments.

### 4. Email Notifications Setup (Supabase Edge Function + Resend)
When an instructor replies to a thread or a learner submits a new question, an email notification can be dispatched automatically via the Edge Function:
1. The Edge function source code is in `supabase/functions/send-support-email/index.ts`.
2. Install Supabase CLI: `npm install -g supabase`.
3. Link your project:
   ```bash
   supabase link --project-ref fmblkesibzjrydswwldq
   ```
4. Set the Resend API key secret:
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_api_key_here
   ```
5. Deploy the function:
   ```bash
   supabase functions deploy send-support-email
   ```
*(Note: If `RESEND_API_KEY` is not configured, the portal will skip email sending gracefully without any errors or interruptions to the user experience.)*

### 5. Testing with Learner and Instructor in Two Browsers
1. **Browser 1 (Learner View)**:
   - Open `http://localhost:8080/index.html`.
   - Ensure the view toggle is set to **Learner View**.
   - Click **+ New message** to open a new support thread. Notice how typing in the subject or message triggers **Quick Answers** from the module FAQs.
   - Attach a document (PNG, JPG, PDF, or DOCX up to 5 MB) and click **Send message**.
   - Notice the thread appears in the inbox, and the composer accepts Enter to send and Shift+Enter for new line.
2. **Browser 2 (Instructor View)**:
   - In another browser window (or Incognito), open `http://localhost:8080/index.html`.
   - Switch the toggle pill to **Instructor View**.
   - Notice the **Stats Strip** at the top showing Open threads, Average reply time, Categories breakdown, and Satisfaction rate.
   - Click the newly created learner thread.
   - Use the **Templates ⚡** button to insert a canned response, or click **Add Private Internal Note** to add staff-only notes.
   - Reply to the thread. The status automatically updates to `Answered`.
3. **Verify Read Receipts & Ratings**:
   - In Browser 1 (Learner), observe the live update and read receipts.
   - In Browser 2 (Instructor), set status to `Resolved`.
   - In Browser 1 (Learner), observe the **"Was this helpful?"** rating card with 👍 / 👎 buttons and optional comment box, as well as the **"Reopen conversation"** button.


---

## 💬 Real-Time Team Chat Setup

The portal includes a **Real-Time Team Chat** section (Screen 5, accessible via **Chat** in the left sidebar) supporting programme-wide All Members discussions, dedicated channels, 1:1 Direct Messages, multi-user Group chats, emoji reactions, message pinning, thread replies, @mentions autocompletion, shared portal knowledge (modules, JDs, FAQs), and file attachments.

### 1. Run Database Migrations in Supabase SQL Editor
Navigate to your Supabase project dashboard -> **SQL Editor** and run the migrations in order:

1. **Schema & Policies**: Run `supabase/migrations/20261103_team_chat_schema.sql`
   - Augments `profiles` with `last_seen` and `chat_status`.
   - Creates `conversations`, `conversation_members`, `messages`, `message_attachments`, `message_reactions`, `message_mentions`, `pinned_messages`, `shared_items`, and `user_chat_settings`.
   - Configures triggers for auto-enrolling new users in `#general`, `#help-and-doubts`, and `#introductions`.
   - Sets up rate limiting (20 messages/min) and Row-Level Security (RLS) policies.
   - Configures the `chat-attachments` storage bucket and Realtime publication.

2. **Initial Channels Seed**: Run `supabase/migrations/20261103_team_chat_seed.sql`
   - Populates initial programme channels (`#general`, `#help-and-doubts`, `#introductions`) and starter welcome posts from instructors.

### 2. Deploy Link Preview Edge Function (Optional)
To provide rich link preview cards for shared URLs:
```bash
supabase functions deploy chat-link-preview --no-verify-jwt
```

### 3. User Role Capabilities in Chat
| Capability | Learner / Intern | Instructor | Admin |
| :--- | :---: | :---: | :---: |
| Post in All Members & Public Channels | Yes (unless read-only) | Yes | Yes |
| Start 1:1 Direct Messages | Yes | Yes | Yes |
| Create Group Chats (2+ members) | Yes | Yes | Yes |
| Create New Channels (`#...`) | No | Yes | Yes |
| Toggle "Announcements only" mode | No | Yes | Yes |
| Delete Any Message (Moderation) | Own only | Any | Any |
| Pin / Unpin Messages | Yes | Yes | Yes |
| React with Emojis & Reply in Threads | Yes | Yes | Yes |
| Share Portal Content (Modules, JDs, FAQs) | Yes | Yes | Yes |

### 4. Offline & Demo Mode Fallback
If you are developing locally without an active Supabase backend, the chat section includes a complete local fallback with instructors (Devashish Chauhan, Neha Singhal, Gehna Sahni), channel history, reactive reply simulation, search, reactions, attachments, and thread replies.


---

## 📁 Company Resources (Official & Personal Documents Repository)

The **Company Resources** section (`ROLES & REPOSITORIES > Company Resources`) provides a centralized, role-governed document distribution hub for:
- **Tab 1: Programme Documents**: Official policies, guidelines, templates, forms, letters, and reports issued to cohorts or across the entire organization.
- **Tab 2: My Documents**: Confidential documents issued personally to the signed-in user (offer letters, access cards, non-disclosure agreements, stipend letters, certificates) with mandatory formal acknowledgement workflows.
- **Tab 3: Manage (Admins Only)**: Full administrative oversight to issue personal documents individually, execute batch dispatches via CSV, revoke documents, replace files, view per-user dossiers, and audit access logs.

---

### 🛡️ India DPDP Act 2023 Statutory Compliance Note
> [!IMPORTANT]
> Personal documents (offer letters, ID cards, evaluations, agreements, and payslips) contain sensitive Personally Identifiable Information (PII) protected under **India's Digital Personal Data Protection (DPDP) Act 2023**.
> Access is enforced at both the PostgreSQL database layer (Row Level Security) and the Supabase Storage object layer:
> - **Zero Peer Access**: Interns can never view, guess, or access another intern's personal documents.
> - **Zero Instructor Access**: Instructors have NO access to personal documents or the personal storage bucket.
> - **Short-Lived Signed URLs**: Files are served exclusively through 60-second temporary signed URLs created after an explicit authorization check.
> - **Tamper-Evident Audit Logging**: Every view, download, and acknowledgement is immutably recorded in `public.document_access_log`.

---

### 1. SQL Migrations Execution Order
Execute the following migration files in the **Supabase Dashboard > SQL Editor** in order:

1. **`supabase/migrations/20261105_01_company_resources.sql`**:
   - Creates `public.company_documents`, `public.document_versions`, and `public.company_document_downloads`.
   - Establishes RLS policies for programme documents:
     - **Interns**: Read-only access to published, non-archived documents for their assigned programme or global documents (`programme_id IS NULL`).
     - **Instructors**: Read/write access restricted to their own programme track + read access to global documents.
     - **Admins**: Full global access.
   - Configures the private `company-documents` storage bucket with path RLS.

2. **`supabase/migrations/20261105_02_personal_documents.sql`**:
   - Creates `public.personal_documents` and `public.document_access_log`.
   - Enforces strict DPDP RLS: recipients can read only their own non-revoked rows (`recipient_id = auth.uid()`).
   - Grants write, revoke, and audit permissions exclusively to administrators.
   - Implements database RPC functions: `mark_document_opened(p_document_id)`, `acknowledge_document(p_document_id)`, `log_document_access(p_document_kind, p_document_id, p_action)`, and `issue_personal_document(...)`.
   - Creates the private `personal-documents` storage bucket with folder-level isolation (`(storage.foldername(name))[1] = auth.uid()::text`).

3. **(Optional) `supabase/demo_company_documents.sql`**:
   - Optional demo seed containing sample policies, templates, and confidential personal documents with valid hex UUIDs for offline or staging testing.
   - *Do not run this script on a live production deployment.*

---

### 2. Private Storage Buckets Setup

The migrations automatically create the two required storage buckets:
- **`company-documents`**: Private (`public = false`), max file size 20 MB.
- **`personal-documents`**: Private (`public = false`), max file size 10 MB.

If your Supabase instance prevents bucket creation via SQL:
1. Open **Supabase Dashboard > Storage > Buckets**.
2. Click **New Bucket**:
   - Bucket 1 Name: `company-documents` &bull; **Public bucket: OFF (Private)** &bull; File size: 20 MB.
   - Bucket 2 Name: `personal-documents` &bull; **Public bucket: OFF (Private)** &bull; File size: 10 MB.
3. In Storage Policies, verify that Row Level Security is active for both buckets.

---

### 3. How to Issue the First Programme Document
1. Sign in with an account having role `admin` or `instructor`.
2. Navigate to **ROLES & REPOSITORIES > Company Resources**.
3. On **Tab 1: Programme Documents**, click **Issue Programme Doc**.
4. In the modal:
   - **Title**: e.g., *Leave & Attendance Policy 2026*
   - **Type**: Select Policy, Guideline, Template, Form, Letter, Report, or Other.
   - **Target Programme**: Instructors are locked to their own cohort; Admins can select *All Programmes* or a specific track.
   - **Version & Date**: e.g., `1.0` and current date.
   - **Attach File**: PDF, DOCX, XLSX, PPTX, PNG, JPG (max 20 MB).
   - **Publish**: Check "Publish immediately" (or uncheck to keep in Drafts).
5. Click **Issue Document**.

---

### 4. How to Issue the First Personal Document (Admins Only)

#### Method A: Single Issuance
1. Sign in with an account having role `admin`.
2. Go to **Company Resources > Manage Tab**.
3. Click **Issue Personal Document**.
4. Select the **Recipient** from the registered user dropdown.
5. Select the **Category** (Offer Letter, Certificate, ID Card, Evaluation, Agreement, Payslip, Other).
6. Set Title, Description, and Issue Date.
7. *(Optional)* Toggle **"Requires recipient acknowledgement"** for agreements or offer letters.
8. Attach the document file (PDF, DOCX, PNG, JPG; max 10 MB).
9. Confirm the privacy banner: *"This document will be visible only to [Recipient Name]"*.
10. Click **Issue Personal Document**.

#### Method B: Bulk Dispatch via CSV
1. On the **Manage Tab**, click **Bulk Issue (CSV)**.
2. Prepare a CSV file with columns:
   ```csv
   email,title,category,issue_date,file_name,requires_acknowledgement
   rohan.verma@ikaaiindia.org,Internship Appointment Letter,offer_letter,2026-11-03,Rohan_Offer.pdf,true
   sneha.patel@ikaaiindia.org,Internship Appointment Letter,offer_letter,2026-11-03,Sneha_Offer.pdf,true
   ```
3. Select your `.csv` file and multi-select the referenced `.pdf` or `.docx` files.
4. Review the automated verification preview table (matches recipient emails and file attachments).
5. Click **Issue Valid Documents**.

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
