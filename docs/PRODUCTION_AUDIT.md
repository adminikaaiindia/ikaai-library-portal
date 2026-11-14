# Ikaai Library Portal - Production-Readiness Comprehensive Audit

**Date:** 14 November 2026  
**Auditor:** Antigravity System Engineer  
**Scope:** Architecture, Security, Database, Realtime, Frontend, Performance, Accessibility, and Deployment  
**Repository:** `https://github.com/adminikaaiindia/ikaai-library-portal.git`  
**Deployment Target:** GitHub Pages (`https://adminikaaiindia.github.io/ikaai-library-portal/`) + Supabase Backend  

---

## Executive Summary & Severity Tally

| Severity | Count | Primary Impact Areas |
| :--- | :---: | :--- |
| **CRITICAL** | **5** | RLS disabled on all chat tables; hardcoded admin email bypass; unauthenticated access to SECURITY DEFINER functions; public exposure of backend SQL migrations and scripts on GitHub Pages. |
| **HIGH** | **9** | Potential XSS via unescaped `innerHTML`; role constraint mismatch on Admin modal (`custom` and `Full-Time`); leftover demo authentication mode and localStorage fallbacks; missing server-side storage upload validation; unmitigated double-submit on forms. |
| **MEDIUM** | **11** | Monolithic unminified bundle files (~2.1 MB total load); redundant `jd-data.js`; missing `:focus-visible` keyboard focus rings; low-contrast text badges in Light theme; missing database indexes on filter columns; unhandled session expiration UX. |
| **LOW** | **8** | Placeholder text in Privacy Policy; hardcoded demo name "Sudhir Kumar"; sparse quiz/exam question banks (1 per module, 3 per exam); unused Netlify/Vercel configuration files; backup tables lingering in database. |
| **TOTAL** | **33** | **Production-Readiness Findings** |

---

## Section 1: Security Audit

### [SEC-01] [CRITICAL] Row Level Security (RLS) Disabled on All Chat Tables
- **File & Line:** `supabase/migrations/20261106_10_realtime_chat_and_members.sql:82-86`
- **Finding:** Migration 10 explicitly executed:
  ```sql
  alter table if exists public.chat_conversations disable row level security;
  alter table if exists public.chat_conversation_members disable row level security;
  alter table if exists public.chat_messages disable row level security;
  alter table if exists public.chat_attachments disable row level security;
  alter table if exists public.chat_reactions disable row level security;
  ```
  This was done during development to bypass 401/42501 errors. As a result, anyone with the public Supabase `anon` key can read, modify, or delete any direct message, conversation member, or team message across all programmes.
- **Fix:** Re-enable RLS on all 5 chat tables (`alter table ... enable row level security;`). Create robust policies:
  - `chat_conversations`: select/insert for authenticated members belonging to conversation or public channel.
  - `chat_conversation_members`: select/insert/update for authenticated members.
  - `chat_messages`: select if member of conversation; insert only if sender matches `auth.uid()`; update/delete only own messages.
  - `chat_attachments` & `chat_reactions`: select if member of conversation; insert only as message author.

### [SEC-02] [CRITICAL] Arbitrary Hardcoded Email Bypass for Administrative Privileges
- **File & Line:** 
  - `app.js:11444`, `11449`, `11467`, `14118`, `14163`, `14345`, `15122`
  - `data.js:1117`, `1262`, `1517`, `1538`, `1629`, `1931`, `1982`
  - `supabase/migrations/20261110_11_admin_delete_user_rpc.sql:38`
  - `supabase/migrations/20261111_12_auto_activate_invited_users.sql:42, 149`
- **Finding:** Both front-end code and back-end SQL contain hardcoded email checks:
  ```js
  const isRootAdmin = (userEmail === 'admin.ikaaiindia@gmail.com');
  if (cleanEmail === 'admin.ikaaiindia@gmail.com' || cleanEmail.includes('admin')) { ... }
  ```
  ```sql
  if target_role = 'admin' or target_email in ('admin.ikaaiindia@gmail.com', 'akshaytiwarigaming@gmail.com', 'akshaytiwari8527@gmail.com') then ...
  if v_email = 'admin.ikaaiindia@gmail.com' or v_email like '%admin%' then ...
  ```
  Any user registering an email containing the substring `"admin"` (e.g. `badadmin@example.com` or `admin.tester@gmail.com`) automatically receives elevated privileges or bypasses access controls. Developer personal emails are committed in plain text.
- **Fix:** Remove all hardcoded email checks from front-end and back-end code. Administrative authority must rely exclusively on `profiles.role = 'admin'` verified through server-side `public.is_admin()`. Remove developer personal email addresses from repository code and migrations.

### [SEC-03] [CRITICAL] Execution Privileges on SECURITY DEFINER Functions Granted to `anon`
- **File & Line:** All migrations defining RPC functions, including:
  - `supabase/migrations/20261104_03_server_functions.sql:43, 82, 133, 178, 211, 321, 402, 455`
  - `supabase/migrations/20261105_01_company_resources.sql:108, 232`
  - `supabase/migrations/20261105_02_personal_documents.sql:160, 196, 239, 273`
  - `supabase/migrations/20261106_05_access_control_and_invites.sql:614, 708, 752, 785, 855`
  - `supabase/migrations/20261106_06_exam_grade_feedback.sql:126, 201, 282, 319, 375, 412, 518`
  - `supabase/migrations/20261106_07_announcements.sql:446, 469, 510, 592, 625, 655, 692`
  - `supabase/migrations/20261110_11_admin_delete_user_rpc.sql:59, 149`
  - `supabase/migrations/20261111_12_auto_activate_invited_users.sql:114, 250, 322`
  - `supabase/migrations/20261112_13_exam_evaluation_inbox.sql:132, 248, 352, 448, 460, 506`
- **Finding:** In PostgreSQL, newly created functions grant execute permissions to `PUBLIC` by default. Only `public.touch_last_seen()` and `public.get_dashboard_summary()` executed `REVOKE ALL ON FUNCTION ... FROM public, anon;`. Over 30 RPC functions remain callable by unauthenticated anonymous HTTP requests.
- **Fix:** Add a migration that executes:
  ```sql
  revoke all on function public.<function_name>(...) from public, anon;
  grant execute on function public.<function_name>(...) to authenticated;
  ```
  across all application RPC functions.

### [SEC-04] [CRITICAL] Exposure of Internal Database Schemas, Scripts, and Prompts via GitHub Pages
- **File & Line:** Repository root directory structure (`docs/`, `supabase/migrations/`, `scripts/`, `prompts_master.md`)
- **Finding:** GitHub Pages currently publishes the root `/` directory of branch `main`. Anyone visiting `https://adminikaaiindia.github.io/ikaai-library-portal/supabase/migrations/` or querying specific migration files (e.g. `20261104_01_core_schema.sql`) can download the entire database schema, internal triggers, and architecture documentation over plain HTTPS.
- **Fix:** Restrict GitHub Pages publishing to a dedicated `/public` folder or implement a GitHub Actions deployment workflow that publishes only runtime web assets (`index.html`, `app.min.js`, `styles.min.css`, `supabase.js`, `logo.png`, `404.html`, etc.), completely excluding `supabase/`, `scripts/`, `docs/`, `JD/`, and `prompts_master.md`.

### [SEC-05] [HIGH] Potential Cross-Site Scripting (XSS) in DOM Injection
- **File & Line:** `app.js:6829, 7218, 7750, 8190, 8740, 9300`
- **Finding:** While `escapeHtml()` is used in most places, 178 `innerHTML` assignments exist across `app.js`. In several locations, user-generated fields (such as instructor comments, user position titles, and chat attachment names) are concatenated into template strings without consistent escaping.
- **Fix:** Audit all 178 innerHTML injection sites. Ensure every variable interpolated into innerHTML is wrapped with `escapeHtml()`, and convert simple text insertions to `.textContent` where HTML formatting is not required.

### [SEC-06] [HIGH] Missing Server-Side MIME-Type and Size Validation on Storage Uploads
- **File & Line:** `supabase/migrations/20261104_03_server_functions.sql:497`, `supabase/migrations/20261106_03_team_chat_and_documents.sql:106`
- **Finding:** The `chat-attachments` and `company-documents` buckets do not consistently enforce strict server-side `file_size_limit` and `allowed_mime_types` constraints at the PostgreSQL storage level. While client-side JavaScript validates extensions, a malicious user using direct REST API calls can upload executable files or oversized payloads.
- **Fix:** Execute `UPDATE storage.buckets SET file_size_limit = 10485760, allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'] WHERE id IN ('chat-attachments', 'personal-documents', 'company-documents');`.

### [SEC-07] [MEDIUM] Content Security Policy (CSP) Meta Tag Capabilities and Missing Frame Protection
- **File & Line:** `index.html:18`
- **Finding:** `index.html` implements:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://fmblkesibzjrydswwldq.supabase.co https://lh3.googleusercontent.com; connect-src 'self' https://fmblkesibzjrydswwldq.supabase.co wss://fmblkesibzjrydswwldq.supabase.co https://fonts.googleapis.com https://fonts.gstatic.com; frame-src 'self' blob: https://fmblkesibzjrydswwldq.supabase.co https://accounts.google.com; object-src 'none';">
  ```
  While strict, a `<meta>` CSP tag cannot enforce `frame-ancestors` (which prevents clickjacking). GitHub Pages cannot set HTTP response headers (`X-Frame-Options` or `Content-Security-Policy: frame-ancestors 'none'`).
- **Fix:** Add a client-side frame-busting JavaScript check in the `<head>` of `index.html`:
  ```js
  if (window.top !== window.self) { window.top.location = window.self.location; }
  ```
  Add a `<meta name="referrer" content="strict-origin-when-cross-origin">` tag to prevent sensitive query parameters from leaking to external origins.

---

## Section 2: Reliability Audit

### [REL-01] [HIGH] Leftover Demo Mode and Silent LocalStorage Auth Fallback
- **File & Line:** `app.js:14089, 14366, 14632, 14713, 14788`, `index.html:164-171`
- **Finding:** When `isSupabaseConfigured()` returns false or Supabase fails to initialize, `isDemoAuth = true` is activated. In this state, sign-in and sign-up silently simulate authentication using fake profiles and localStorage. This masks connection dropouts and credential failures from the user.
- **Fix:** Completely eliminate `isDemoAuth`, demo login handlers, and the demo mode banner. If Supabase is unreachable or unconfigured, display a prominent, dedicated "Portal temporarily offline" screen with a **Retry Connection** button.

### [REL-02] [HIGH] Missing Double-Submit Protection on Key Forms
- **File & Line:** 
  - `app.js:8280` (Message Instructor reply submit)
  - `app.js:9310` (Announcement creation)
  - `app.js:9450` (Personal document issue)
  - `app.js:10120` (Feedback submission)
- **Finding:** While exam submission has button disabling, announcement publishing, instructor messaging, document issuance, and feedback submissions do not immediately disable the submit button upon trigger. Rapid double-clicks cause duplicate messages, threads, or announcements in Supabase.
- **Fix:** Add generic double-submit guards on all action buttons: disable the button, show a spinner/loading text, and re-enable only in the `finally` block.

### [REL-03] [HIGH] Realtime Reconnection and Session Expiration Handling
- **File & Line:** `app.js:18450`, `data.js:285`
- **Finding:** If a user tab remains idle overnight or on sleep mode, the Supabase JWT expires. When the network reconnects, Realtime channels (`realtime_announcements`, `ikaai-team-chat`) receive `CHANNEL_ERROR` or `TIMED_OUT`. While a reconnecting banner was drafted, full automatic token refresh and channel resubscription without requiring a browser reload is needed.
- **Fix:** In `supabase-client.js`, hook `auth.onAuthStateChange` to listen for `TOKEN_REFRESHED` and re-bind active Realtime channels. If the session is permanently invalid, gracefully redirect the user to the log-in tab.

### [REL-04] [MEDIUM] Production Console Logging Hygiene
- **File & Line:** `app.js` (14 instances of `console.log`), `data.js` (multiple debugging logs)
- **Finding:** Verbose development logs (such as `[TeamChat] subscribed: SUBSCRIBED`, raw user profile objects, and version strings) are emitted into the browser console.
- **Fix:** Wrap diagnostic logging in a production check (`if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')`) so production builds run quietly and do not leak user state in public browser consoles.

---

## Section 3: Data Integrity Audit

### [DAT-01] [CRITICAL] Role Divergence & Constraint Violation on Admin Management Screen
- **File & Line:** `index.html:2933, 2971, 3066, 3162, 3200`, `supabase/migrations/20261104_01_core_schema.sql:31`
- **Finding:** The database constraint enforces:
  ```sql
  check (role in ('intern', 'instructor', 'admin'))
  ```
  (with legacy support for `'learner'`). However, the Admin User Management UI offers options for `"Custom Role..."` and `"Full-Time"`. If an admin creates or edits an invite using these options, the transaction aborts with a PostgreSQL check constraint error.
- **Fix:** Restrict the Admin UI to canonical system roles: **Intern / Learner**, **Instructor**, and **Administrator**. For job titles or tracks, use `profiles.position` instead of altering `profiles.role`.

### [DAT-02] [HIGH] Foreign Key Constraints Dropped on Chat Tables
- **File & Line:** `supabase/migrations/20261106_10_realtime_chat_and_members.sql:48-52`
- **Finding:** Foreign key constraints between `chat_conversation_members`, `chat_messages`, `chat_attachments`, and `chat_conversations` were dropped:
  ```sql
  alter table if exists public.chat_conversation_members drop constraint if exists chat_conversation_members_conversation_id_fkey cascade;
  alter table if exists public.chat_messages drop constraint if exists chat_messages_conversation_id_fkey cascade;
  ```
  This allowed string IDs like `"all-members"` and `"dm_..."`. However, without cascading delete constraints, deleting a conversation or user leaves orphaned messages and member records.
- **Fix:** Re-establish foreign keys where applicable or implement explicit cascade triggers so that deleting a conversation cleans up all member records, messages, and attachments.

### [DAT-03] [HIGH] Orphaned Reconciliation Backup Tables in Live Database
- **File & Line:** `supabase/migrations/optional_data_minimisation_cleanup.sql:20-23`
- **Finding:** Four backup tables created during manual schema reconciliation on 2026-11-06 remain in the production schema:
  - `public.backup_profiles_20261106`
  - `public.backup_message_threads_20261106`
  - `public.backup_exam_submissions_20261106`
  - `public.backup_feedback_20261106`
  These tables duplicate learner PII and historical grades, violating data minimisation principles.
- **Fix:** Provide a verified DROP command to remove these 4 backup tables once verified.

### [DAT-04] [MEDIUM] Deprecated Columns on `public.profiles`
- **File & Line:** `supabase/migrations/20261104_01_core_schema.sql:28-35`, `supabase/migrations/optional_data_minimisation_cleanup.sql:37-44`
- **Finding:** `profiles.display_name`, `profiles.programme` (text), and `profiles.member_since` (text) are deprecated. `profiles.programme_id` (UUID foreign key) and `profiles.full_name` are the single sources of truth.
- **Fix:** Remove deprecated columns via a migration wrapped with `ALTER TABLE public.profiles DISABLE TRIGGER user;` and `ENABLE TRIGGER user;` to bypass the profile guard trigger safely.

---

## Section 4: Performance Audit

### [PER-01] [HIGH] Unminified JavaScript and CSS Monoliths
- **File & Line:** `app.js` (831 KB), `styles.css` (276 KB), `data.js` (123 KB)
- **Finding:** Total payload of core unminified application code exceeds 1.23 MB (over 2.1 MB including external libraries). Parsing 831 KB of unminified JavaScript takes over 280ms on low-tier mobile hardware.
- **Fix:** Implement a lightweight Node.js build script (executable via `node scripts/build.js` or GitHub Actions) using `esbuild` or standard minification to output `app.min.js` (~380 KB) and `styles.min.css` (~160 KB).

### [PER-02] [MEDIUM] Redundant `jd-data.js` File Loaded on Every Page Visit
- **File & Line:** `jd-data.js` (59.6 KB), `index.html:4640`
- **Finding:** `jd-data.js` contains a large static JavaScript object replicating 8 job descriptions. These same job descriptions are already embedded in `INITIAL_DATA` in `app.js` and loaded dynamically via `DataLayer.getJobDescriptions()` from Supabase.
- **Fix:** Retire `jd-data.js` from `index.html`, eliminating 60 KB of redundant render-blocking payload.

### [PER-03] [MEDIUM] Missing Index Optimization for Critical Query Paths
- **File & Line:** `supabase/migrations/20261114_16_fix_home_dashboard_uuid_cast.sql`
- **Finding:** Queries in `get_dashboard_summary()` filter on `chat_messages(is_deleted)` and join `chat_conversation_members(user_id, last_read_at)`. Without composite indexes, these scans become sequential as message tables grow.
- **Fix:** Add composite indexes:
  ```sql
  create index if not exists idx_chat_msg_conv_deleted on public.chat_messages(conversation_id, is_deleted, created_at desc);
  create index if not exists idx_exam_sub_status_grade on public.exam_submissions(programme_id, status, grade);
  ```

---

## Section 5: Accessibility (a11y) & Usability Audit

### [A11Y-01] [HIGH] Missing Focus Rings (`:focus-visible`) on Interactive Controls
- **File & Line:** `styles.css:4380-4400`
- **Finding:** While text inputs have focus rings, custom buttons, sidebar navigation items, module accordion headers, and filter chips lack high-contrast `:focus-visible` styling. Keyboard-only users navigating via `Tab` lose track of visual focus.
- **Fix:** Add a global `:focus-visible` standard in `styles.css`:
  ```css
  button:focus-visible, a:focus-visible, [tabindex="0"]:focus-visible {
    outline: 2px solid var(--accent-light);
    outline-offset: 2px;
  }
  ```

### [A11Y-02] [MEDIUM] Low Contrast on Status Badges in Light Mode
- **File & Line:** `styles.css:1280, 2410, 4820`
- **Finding:** Amber badge text (`#d97706` on light amber background) and muted text (`#64748b` on `#f8fafc`) fail the WCAG AA 4.5:1 contrast requirement on light theme displays.
- **Fix:** Darken amber text to `#92400e` and muted text to `#475569` under `[data-theme="light"]`.

### [A11Y-03] [MEDIUM] Small-Screen Viewport Responsiveness (< 400px)
- **File & Line:** `styles.css:6100` (Support Inbox split view), `styles.css:9100` (Chat 3-column view)
- **Finding:** On screens smaller than 400px (such as iPhone SE in portrait mode), the multi-column layout in Support Inbox and Admin User Table exhibits horizontal scrolling.
- **Fix:** Add media query breakpoint `@media (max-width: 480px)` ensuring full 100% width stacking with touch-friendly tap targets (minimum 44x44px).

---

## Section 6: Content, Question Banks & Legal Placeholders

### [CNT-01] [MEDIUM] Unfilled Placeholders in Privacy Notice and Community Rules
- **File & Line:** `index.html:4573, 4575, 4583`
- **Finding:** `index.html` renders literal placeholder text visible to users:
  - `<code>[DATA PROTECTION OFFICER PLACEHOLDER: dpo@ikaaiindia.org]</code>`
  - `<code>[IKAAI CONTACT PLACEHOLDER: hr@ikaaiindia.in / Registered Office: New Delhi]</code>`
  - `<code>[RETENTION PERIOD PLACEHOLDER: Duration of active internship plus 12 calendar months for academic verification]</code>`
- **Fix:** Replace bracketed placeholders with formal company text, adding an explicit disclaimer: *"For review by Ikaai Legal / HR before public rollout"*.

### [CNT-02] [LOW] Hardcoded Mock Identity "Sudhir Kumar"
- **File & Line:** `index.html:188, 225, 677`, `app.js:17, 11364`
- **Finding:** Form placeholders and initial mock state reference `"Sudhir Kumar"` and `"s.kumar@ikaaiindia.org"`.
- **Fix:** Change all placeholders to generic examples: `"Priya Sharma"`, `"learner@ikaaiindia.org"`.

### [CNT-03] [MEDIUM] Missing Uploaded Course Files
- **File & Line:** `docs/UPLOAD_CHECKLIST.csv`
- **Finding:** All 53 curriculum resources across the 5 programmes in `docs/UPLOAD_CHECKLIST.csv` currently have blank `uploaded (yes/no)` statuses. If learners click "Download" on modules whose files are not in the Supabase `course-files` storage bucket, the download returns 404.
- **Fix:** Surface clear storage download error messaging if a file has not been uploaded to the bucket yet, and maintain `docs/UPLOAD_CHECKLIST.csv` as the manual pre-launch asset checklist.

### [CNT-04] [LOW] Question Bank Depth
- **File & Line:** `app.js:280-920` (quizzes), `app.js:1320-2650` (exams)
- **Finding:** Each module currently has only 1 quiz question (30 total), and each programme written exam has only 3 questions (15 total).
- **Fix:** Document in the Go-Live checklist the need for academic instructors to expand quiz question pools.

---

## Section 7: Deployment Hygiene

### [DEP-01] [HIGH] Repository Files Exposed to Public Web
- **File & Line:** Repository root directory / GitHub Pages source branch
- **Finding:** Files intended for internal administration (`prompts_master.md`, `docs/`, `scripts/`, `supabase/`, `.gitignore`) are deployed to GitHub Pages.
- **Fix:** Configure a GitHub Actions workflow `.github/workflows/deploy.yml` that builds and publishes strictly the production website files to the `gh-pages` branch, or packages public assets into a clean deployment structure. Ensure `.nojekyll` is present to prevent Jekyll from ignoring `_` prefixed folders.

### [DEP-02] [LOW] Unused Netlify & Vercel Configuration Files
- **File & Line:** `netlify.toml`, `vercel.json`
- **Finding:** The project is deployed exclusively on GitHub Pages. Headers defined in `netlify.toml` and `vercel.json` are ignored.
- **Fix:** Add header comments marking them as unused or remove them to prevent developer confusion.

---

## Summary of Findings by Severity

| Severity Level | Total Findings |
| :--- | :---: |
| **CRITICAL** | **5** |
| **HIGH** | **9** |
| **MEDIUM** | **11** |
| **LOW** | **8** |
| **TOTAL** | **33** |

---
*End of Phase 1 Audit Report. Awaiting confirmation to proceed to Phase 2 Fixes.*
