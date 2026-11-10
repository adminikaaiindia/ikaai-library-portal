<USER_REQUEST>
# Ikaai Library Portal: Antigravity Prompts (current status)

Prepared 5 November 2026. Use the prompts **in order**. Finish and test one before starting the next.

## How to use this file
1. Open Antigravity and click the agent chat box (Ctrl + L).
2. Paste the **DATA STORAGE RULE** block first, then the prompt, in the **same message**.
3. When Antigravity finishes, read its report. Do not click "Accept all" blindly.
4. Antigravity **cannot** run SQL on your Supabase project. Run any SQL file it creates yourself: Supabase, SQL Editor, new tab, paste, Run. Choose "Run and enable RLS" if asked.
5. Run the checks listed under each prompt, then test with real accounts.
6. Never paste secret keys (Supabase service_role key, Google client secret) into any chat.

## Current status

| Area | Database | Screen connected and tested |
|---|---|---|
| Course modules, quizzes, timer, 30 s unlock | Done | Done |
| Job descriptions (11) | Done | Done (check the Research Assistant text) |
| Schema cleanup (profiles, message_threads, exams, feedback) | Done | Check names and programmes still show correctly |
| Company documents, personal documents, chat | Tables created | **Test with real accounts** |
| Message Instructor | Done | **Test with real accounts** |
| Access control (admin approves emails) | **Prompt 1** | **Prompt 1** |
| Account Settings | Table ready | **Prompt 2** |
| Written exam, Grade, Feedback | Tables ready | **Prompt 4** |
| Announcements | Not built | **Prompt 5** |

## Order of prompts
1. Access control: admin approves emails and assigns roles and programmes (removes the programme picker)
2. Account Settings
3. Chat enrolment backfill (only if the check shows no conversations)
4. Written exam, Grade and Feedback
5. Announcements
6. Security audit and hardening
7. Deployment readiness
8. Fallback prompts (use only when something fails)

---

## DATA STORAGE RULE (paste this at the top of EVERY prompt)

```
DATA STORAGE RULE (applies to this task and every future task in this project)
- Everything important must be saved in the Supabase database, and every screen must read it from there. Do not keep important data only in the browser (no localStorage or hard-coded values for user data). The only things allowed in localStorage are UI preferences such as the theme (Light/Dark/Auto).
- Store only what is necessary. Do not create extra tables or columns "just in case", do not store duplicate copies of the same data, do not store demo or test data, and do not log things that are not needed.
- Never store passwords, tokens, API keys or other secret values in any table. Passwords stay in Supabase Auth only.
- Before adding any table or column, check supabase/migrations and reuse what already exists. If something new is truly needed, add it through ONE new numbered migration file (add column if not exists, create table if not exists, never drop or delete data), and say in one line why each item is needed.
- You cannot run SQL on my Supabase project. After you finish, list exactly which SQL files I must run in the Supabase SQL Editor, in what order, and what to check afterwards. Do not claim a database change is "executed" or "applied" unless I confirm I ran it.
- Check every column, table, function and policy name against the real schema and the earlier migration files before using it. Avoid set-returning functions in WHERE, guard text-to-uuid and text-to-int casts, use valid UUIDs only (characters 0-9 and a-f), and make each migration safe to re-run.
- When backfilling the profiles table from a migration, switch the user triggers off first and on again afterwards (alter table public.profiles disable trigger user; ... enable trigger user;), because the guard trigger blocks changes made from the SQL Editor.
- Be honest in test reports: say which tests ran against my live Supabase project and which only ran locally or by reading the code.
- Finish with a short "Data stored" list: for each field or feature, which table and column it is saved in, and what is deliberately NOT stored.
```

---

## Live schema reference (use this when a prompt asks about real columns)

- profiles: id, role, full_name, programme_id (single source of truth), email, avatar_url, branch, position, phone, created_at, member_since_date, last_seen. Deprecated, do NOT use: display_name, programme (text), member_since (text).
- programmes: id, slug, name, description, tag_label, sort_order. Five programmes: Human Resources, Data Analyst, Social Research & Policy, Design & Social Media, Business Development.
- modules, resources, faqs, quizzes, quiz_questions, quiz_options, exam_questions, jobs, resource_completions, module_progress, faq_reads, quiz_attempts, quiz_answers, exam_submissions (has allow_retake), exam_answers, feedback (has status, updated_at).
- message_threads (programme_id and module_ref added), messages, canned_replies, internal_notes.
- Company documents, personal documents and chat tables, created from the three later migrations.
- Existing helper functions: current_role(), current_programme_id(), is_admin(), is_instructor_for(programme_id). Check exact names in supabase/migrations.
- Storage buckets: avatars (public), course-files, job-descriptions, company-documents, personal-documents, chat-attachments (all private).
- Guard trigger on profiles: trg_guard_profile_updates (must never be weakened for signed-in users).

---

## Prompt 1: Access control (admin approves emails, assigns role and programme)

Paste the DATA STORAGE RULE first, then this:

```
Change how access, roles and programmes work in the Ikaai Library portal. Do not change the design except where stated. Keep the existing Supabase authentication (email and Google).

NEW ACCESS MODEL
- Nobody can use the portal unless an admin has approved their email. Admins decide who gets access, which role they have (intern, instructor, admin) and which programme they belong to (interns and instructors get one of the 5 programmes; admins get none and see all).
- Users can no longer choose their own programme. Remove the "Select Your Programme" onboarding modal and any code that sets programme_id from the user's choice.

1. DATABASE (one new migration file, safe to run on the existing database)
- Table access_invites (the approved list): id, email (stored lowercase, unique, case-insensitive), role (intern, instructor, admin), programme_id (nullable; required for intern and instructor, must be null for admin), status (invited, active, revoked), invited_by, created_at, activated_at. Add a check constraint for the role/programme rule.
- Add profiles.access_status (active, pending, revoked; default pending). Existing profiles must be set to active by the migration so nobody is locked out, and the existing admin must stay admin.
- Trigger on new sign-ups (auth.users insert, plus a safe fallback when a profile is first read): lower-case the email and look it up in access_invites. If found and not revoked, create the profile with that role and programme_id, access_status = active, and mark the invite as active. If not found, create the profile with role = intern, no programme, access_status = pending. Never take role or programme from the sign-up form or from user metadata.
- If an admin adds an invite for an email that already has a pending profile, activate that profile with the invited role and programme straight away.
- Update the helper functions (current_role(), current_programme_id(), is_admin(), is_instructor_for()) and Row Level Security so that users whose access_status is not 'active' cannot read or write any portal data (programmes, modules, resources, quizzes, documents, messages, chat, grades). They may only read their own profile row. Check every table's policies.
- Revoking access sets access_status = revoked on the matching profile and blocks the user immediately.
- Keep the guard trigger: non-admins still cannot change role, programme_id, email, branch, position or access_status.
- Admin-only database functions (RPC), each checking is_admin() on the server and validating all input: invite_user(email, role, programme_id), update_user_access(user_id, role, programme_id), revoke_user_access(user_id), restore_user_access(user_id), list_access_invites().

2. ADMIN PANEL (visible only to admins), a "Users & Access" screen
- "Invite user": email (validated), role dropdown (Intern, Instructor, Admin), programme dropdown (the 5 programmes; disabled and empty for Admin), and an "Add and give access" button. Allow several emails at once (paste a list or upload a CSV with email, role, programme) with a preview that flags invalid or duplicate emails before saving.
- "All users and invites" table: name, email, role, programme, status (Invited, Active, Pending, Revoked), joined date, last seen. Search and filters by role, programme and status. Row actions: change role, change programme, revoke access, restore access. Confirm before revoking or demoting an admin, and never allow the last remaining admin to be removed or demoted.
- Show how many people are waiting for approval (signed in but not on the list), with an "Approve" action that opens the invite form with that email filled in.

3. SIGN-IN EXPERIENCE
- If access_status is not 'active', show only a full-screen "Access pending" page: "Your account is waiting for approval. Please contact the Ikaai administrator." with the user's email and a Sign out button. No portal data may load.
- If access is revoked, show "Your access has been removed" with a contact line.
- Active users go straight to the portal with their assigned role and programme. Interns and instructors see only their own programme. Admins see all programmes.

4. QUALITY AND SECURITY
- Responsive from 1920px to 400px, readable in Light and Dark themes (theme CSS variables only), loading and error states, escaped text. If a save fails, show an error and never pretend it saved. Never put the service_role key in front-end code.

5. TEST (be honest about what ran against my live Supabase project)
- An email NOT on the list can sign in but sees only "Access pending" and cannot read any data by calling the API directly.
- An invited email gets the invited role and programme on first sign-in (email and Google), with no picker.
- An intern cannot change their own role, programme or access status by editing the request.
- Revoking a user blocks them on their next request.
- Only admins can call the admin functions. The last admin cannot be removed.
- Existing users (the admin and the interns) still have access after the migration.

6. DOCS
- Update the README with the SQL file to run, the order, and how to add the first invites.
```

**After Antigravity finishes**
1. Run the new SQL file in a new Supabase SQL tab.
2. Check existing users kept access:
   ```sql
   select email, role, access_status, programme_id from public.profiles order by email;
   ```
   All should show `active`, and the admin should still be `admin`.
3. Check security coverage (only the four `backup_` tables may appear):
   ```sql
   select t.tablename, t.rowsecurity as rls_on, count(p.policyname) as policies
   from pg_tables t
   left join pg_policies p on p.schemaname = t.schemaname and p.tablename = t.tablename
   where t.schemaname = 'public'
   group by t.tablename, t.rowsecurity
   having t.rowsecurity = false or count(p.policyname) = 0;
   ```
4. In Supabase go to **Authentication, Sign In / Providers, Email** and turn on **Confirm email**. Without it, someone could sign up with an approved address that is not theirs.
5. Test: invite a second Gmail you own as an intern in Data Analyst and sign in with it in a private window (it should open directly in Data Analyst, no picker). Sign in with an email that is not on the list (it should see only "Access pending"). Approve it as admin. Revoke it.

---

## Prompt 2: Account Settings

Paste the DATA STORAGE RULE first, then this:

```
Build the database connection for the "Account Settings" section only. Do not touch other sections, and do not change the design.

The profiles table was cleaned up: full_name is the single source of truth for the name, programme_id is the single source of truth for the programme, and member_since_date, created_at and phone exist. Use only those columns. Do not use the deprecated columns display_name, programme (text) or member_since (text). Programme, role, email, branch, position and access status are set by admins only (see the access control work), so they are read-only here.

1. First, check what exists: the profiles table and its columns, the guard trigger (do not weaken it), the avatars Storage bucket, and what the Account Settings screen currently uses (hard-coded values such as "Sudhir Kumar" or "s.kumar@ikaaiindia.org", demo role and branch, or localStorage). List them before you change anything.

2. Connect the screen to the signed-in user's real profile:
   - Show real values for email, role, programme (name from programme_id), branch, position, member since (from member_since_date, falling back to created_at) and status. "Verified" must come from the user's confirmed email or Google sign-in, not a fixed label. Remove all demo values.
   - Show the sign-in method (Email or Google).
   - "Change name": saves full_name to profiles, updates the name in the top bar and everywhere it appears, with validation (2 to 60 characters, no empty names) and a success message.
   - Optional phone number, saved to profiles.phone with simple validation.
   - Profile photo: upload or remove a photo (png, jpg, webp, max 2 MB) to the avatars bucket under {user_id}/avatar.<ext>. Save the URL in profiles.avatar_url and show initials when there is no photo. Users with a Google photo see it by default. When a photo is replaced or removed, delete the old file so no unused files stay in storage.
   - "Change password" for email-and-password users only (supabase.auth.updateUser), minimum 8 characters, confirm field and a clear message. Hide it for Google-only users and show "You sign in with Google". Never store the password anywhere except Supabase Auth.
   - "Sign out" and "Sign out of all devices" buttons.

3. Database changes: only if something is still missing, add it in one new numbered migration file. If profiles already has everything, say so and skip this step. Do not change the role-protection trigger.

4. Security (Row Level Security and Storage policies):
   - A user can read and update only their own profile row, and can change only full_name, avatar_url and phone. Role, programme_id, branch, position, email and access_status can be changed only by an admin.
   - Storage: a user can upload, replace and delete files only inside their own folder {user_id}/ in avatars, with the size and type limits above.
   - Admins can edit branch and position of any user from the Admin screen.

5. Add loading, empty and error states. If a save fails, show a clear error and do not pretend it saved. Escape all text.

6. Test with an intern, a second intern and an admin:
   - Name change saves to the database and shows everywhere after a page refresh.
   - Photo upload, replace and remove work, the old file is removed, and another user's folder cannot be overwritten.
   - An intern cannot change their own role, programme, email, branch, position or access status by editing the request.
   - A Google user does not see the password form, and an email user can change their password.
   - Verified status is real.

7. Update the README with any SQL file to run. Finish with the "Data stored" list and my manual steps.
```

**After Antigravity finishes**
1. Run any new SQL file it creates.
2. Test: change a name, upload a photo, refresh, confirm the changes stay.
3. Check the database:
   ```sql
   select email, role, full_name, phone, avatar_url from public.profiles order by email;
   ```
4. Open **Storage, avatars** and confirm each user has one file in their own folder, not a pile of old versions.

---

## Prompt 3: Chat enrolment backfill (only if needed)

Run this check first:

```sql
select count(*) as conversations from public.chat_conversations;
select count(*) as members from public.chat_conversation_members;
```

If both are `0`, paste the DATA STORAGE RULE and this:

```
The chat tables exist in my live database, but there are no conversations or members for my existing users, because they signed up before the chat migration. Write a safe backfill SQL file that:
1. Creates the default conversations (#All Members, #general, #announcements, #random) for each of the 5 programmes if they are missing.
2. Enrols every existing profile with access_status = 'active' and a programme_id into its programme's conversations. Admins are added to every conversation.
3. Uses only profiles.programme_id (never the deprecated text column), is safe to run twice, and never deletes data.
4. Confirms that the auto-enrol trigger fires when a profile is activated or its programme_id changes, and that a revoked user is removed from or blocked in chat.
Give me the file and the checks I should run afterwards.
```

---

## Prompt 4: Written exam, Grade and Feedback

Paste the DATA STORAGE RULE first, then this:

```
Connect three sections to the real database and remove all demo data from them: "Written Exam", "Grade" and "Feedback". Do not change the design, and do not touch other sections. Use the existing tables: exam_questions, exam_submissions (user_id, programme_id, status, submitted_at, grade, score, instructor_comment, graded_by, graded_at, allow_retake), exam_answers, quiz_attempts, the views v_my_grades and v_programme_completion, and feedback (user_id, module_id, programme_id, topic, message, status, created_at, updated_at). Use programme_id everywhere, never the deprecated text columns.

1. First, list what exists (tables, views, functions: submit_exam, grade_exam, allow_exam_retake) and what each screen currently uses (hard-coded values, localStorage).

2. WRITTEN EXAM
- Learner: sees the exam for their own programme (instructions, questions with a text box each, character counter, save-as-draft stored in the database). "Submit" calls submit_exam on the server. After submission the screen is read-only and shows status (Submitted, Graded). Only one submission per person unless an instructor allowed a retake (allow_retake); if a retake is allowed, show a "Start retake" button.
- Instructor (own programme only) and admin: a "Submissions" list with learner name, status, submitted date and filters (Not graded, Graded). Open a submission, read each answer, give marks per answer, a total grade and a comment, and save through grade_exam. Button to allow a retake (allow_exam_retake). Instructors cannot open another programme's submissions.
- The learner sees the grade and comment on the Written Exam and Grade screens after grading.

3. GRADE
- Learner: real quiz scores per module (from quiz_attempts), quiz average, exam status and grade, and programme completion. A new learner starts with no grades and sees an empty state ("No grades yet"), never fake values such as "A (95%)".
- Instructor: a read-only table of their programme's learners with module completion, quiz average and exam grade. Admin: the same for all programmes, with a programme filter. Add CSV export for instructors and admins.

4. FEEDBACK
- Learner form: topic dropdown, optional related module, message (10 to 1000 characters, with counter), submit button, and a "Your feedback" history that shows only their own entries with status (New, Reviewed).
- Instructor (own programme) and admin: a feedback list with filters (status, programme, module), a "Mark as reviewed" action, and no ability to edit the learner's text. Show the learner's name unless an "anonymous" option is chosen; if you add an anonymous option, hide the name from everyone except admins.
- Rate limit: at most 5 feedback entries per learner per day, enforced on the server.

5. DATABASE
- Only add what is missing (for example indexes, a draft status for exam answers if needed) in one new numbered migration file. Do not duplicate existing columns or tables.
- Row Level Security: learners read and write only their own rows; instructors read their own programme's rows and can grade and mark reviewed; admins can do everything. Users whose access_status is not 'active' have no access.
- Grading, exam submission and retakes happen only through server functions that check the caller's role and programme.

6. QUALITY
- Loading, empty and error states, responsive from 1920px to 400px, Light and Dark themes (theme CSS variables only), escaped text. If a save fails, show an error and never pretend it saved.

7. TEST with an intern, a second intern, an instructor and an admin (say which tests ran against my live Supabase project):
- An intern cannot submit twice without a retake, cannot grade, and cannot read another intern's answers, grades or feedback.
- An instructor cannot grade or read another programme's submissions.
- Grades and comments appear on the learner's screen after grading and survive a refresh.
- A new account sees empty states, not demo data.

8. DOCS: update the README with any SQL to run. Finish with the "Data stored" list and my manual steps.
```

**After Antigravity finishes**
1. Run any new SQL file.
2. Test the whole flow: intern submits, instructor grades, intern sees the grade.
3. Check one-submission-per-person:
   ```sql
   select user_id, programme_id, count(*) from public.exam_submissions
   group by user_id, programme_id having count(*) > 1;
   ```
   It should return no rows.
4. Write more exam and quiz questions (you currently have about 1 quiz question per module and 3 exam questions per programme).

---

## Prompt 5: Announcements

Paste the DATA STORAGE RULE first, then this:

```
Build the "Announcements" section: a one-way noticeboard where admins and instructors post and everyone else reads. Keep the current design, green accent, Light/Dark/Auto themes, sidebar and authentication. Do not touch other sections. Store only what is necessary.

1. FEED (all users)
- Newest first, as cards: title, author name with a role badge, date and time, category tag, and the full text with basic formatting (headings, bold, bullet lists, links). Show an "Urgent" label on urgent posts and a "Pinned" label on pinned posts; pinned posts stay at the top.
- Filter chips by category: All, General, Programme update, Deadline, Event, Holiday, Policy, Opportunity. A search box (title and text). Empty state: "No announcements yet."
- Unread tracking: unread cards are bold with a dot, a badge with the unread count on the "Announcements" sidebar item, and a "Mark all as read" button. Opening a card marks it read.
- Optional attachments (PDF, docx, xlsx, png, jpg; max 10 MB each, up to 3 per post), downloaded through short-lived signed URLs from a private bucket.
- An "I have read this" button on posts where acknowledgement is required. Show a confirmation and save the date and time.
- Optional comments: if comments are enabled on a post, learners can add short comments (max 500 characters), and staff can delete comments. If comments are off, the post shows no comment box.

2. CREATE AND MANAGE (admins and instructors only)
- "New announcement" form: title (required, max 120), body, category, audience, pinned toggle, urgent toggle, "Requires acknowledgement" toggle, "Allow comments" toggle, optional publish date (schedule) and optional expiry date, attachments, and "Save as draft" or "Publish".
- Audience: "Everyone", "One programme" (dropdown of the 5 programmes) or "One role" (interns only or instructors only). Instructors can post only to their own programme. Admins can post to anyone.
- A "Manage" tab (staff only) with Drafts, Scheduled, Published and Archived lists. Actions: edit (show an "Edited" label), pin or unpin, archive, delete (with confirmation). Archive is the default; archived posts disappear from learners' feeds.
- For each post, show staff how many people have read it and who has not, and for acknowledgement posts, who has and has not acknowledged, with a CSV export.

3. DATABASE (one new numbered migration file, safe to run on the existing database, valid UUIDs only)
- announcements: id, title, body, category, audience_type (all, programme, role), programme_id (nullable), target_role (nullable), is_pinned, is_urgent, requires_ack, comments_enabled, status (draft, published, archived), publish_at, expires_at, created_by, created_at, updated_at, edited_at.
- announcement_reads: announcement_id, user_id, read_at (unique per pair).
- announcement_acks: announcement_id, user_id, acknowledged_at (unique per pair).
- announcement_comments: id, announcement_id, user_id, body, created_at (only used when comments are enabled).
- announcement_files: id, announcement_id, storage_path, file_name, file_size.
- Private Storage bucket "announcement-files", served only through signed URLs to users who are allowed to see that announcement.
- Row Level Security on every table and on the bucket: learners read only published, non-archived announcements that match their audience (everyone, their own programme, or their role) and that are inside their publish and expiry dates; they write only their own read, acknowledgement and comment rows. Instructors create and manage announcements for their own programme only. Admins manage everything. Users whose access_status is not 'active' have no access.
- Server functions (RPC) for mark_read, acknowledge, publish and the read and acknowledgement reports, each checking the caller's role.
- Add indexes on status, publish_at, audience fields and announcement_id. Never put the service_role key in front-end code.

4. NOTIFICATIONS
- In-portal only for now: the unread badge and a toast when a new announcement arrives (use Supabase Realtime on the announcements table). Do not add email sending in this task.

5. QUALITY
- Sanitise the rich text so nobody can inject unsafe code. Loading, empty and error states, responsive from 1920px to 400px, Light and Dark themes (theme CSS variables only). If a save fails, show an error and never pretend it saved.

6. TEST with an intern in one programme, an intern in another programme, an instructor and an admin (say which tests ran against my live Supabase project):
- Each intern sees only announcements meant for them (everyone, their programme, their role).
- An intern cannot post, edit or delete, and cannot read drafts, scheduled or archived posts, even through direct API calls.
- An instructor cannot post to another programme.
- Scheduled posts appear only after their publish time and disappear after expiry.
- Read and acknowledgement counts are correct and visible only to staff.

7. DOCS: update the README with the SQL file to run, the bucket to confirm, and how to post the first announcement. Finish with the "Data stored" list and my manual steps.
```

**After Antigravity finishes**
1. Run the new SQL file and confirm the private `announcement-files` bucket exists.
2. Run the security coverage query from Prompt 1.
3. Post a test announcement as admin to one programme only, and confirm the other programme's intern does not see it.

---

## Prompt 6: Security audit and hardening

Run this after Prompts 1 to 5 work. Paste the DATA STORAGE RULE first, then this:

```
Audit the whole portal for security and data-storage problems and fix them. Do not change the design.

1. Storage: confirm every bucket except avatars is private (public = false), including chat-attachments, company-documents, personal-documents, course-files, job-descriptions and announcement-files. Files must be served through short-lived signed URLs, and only to users who are allowed to see them. Check the storage policies match the table rules.
2. Views: make every view (for example v_quiz_options_learner, v_my_grades, v_programme_completion) use security_invoker = true, or filter by auth.uid() and the user's programme, so no view leaks data across users or programmes.
3. Remove any offline fallback or cached demo data. If Supabase is unreachable, show a clear error and a retry button instead of fake progress.
4. Secrets: confirm no service_role key, password or other secret appears anywhere in front-end files, config files or docs. Only the public anon key may be in the front end.
5. Row Level Security: list every table, its policies and who can read and write it in docs/RLS_SUMMARY.md. Flag any table without RLS or without a policy, any policy that uses a deprecated column (profiles.programme, display_name, member_since), and any policy that lets a user whose access_status is not 'active' read portal data.
6. Roles: confirm a non-admin cannot change role, programme_id, email, branch, position or access_status, directly or through any function. Confirm admin-only functions check is_admin() on the server.
7. Personal documents: confirm instructors cannot read them, interns can read only their own, and every view and download is logged.
8. Input safety: check that user text (messages, feedback, announcements, document titles, names) is escaped or sanitised everywhere to prevent XSS, and that file uploads check type and size.
9. Data minimisation: list anything stored that is not needed (extra columns, duplicate data, unused tables, demo rows, unneeded logs) and propose removals as a SEPARATE optional SQL file, without running or deleting anything.
10. Test with SQL and API calls as an intern, a second intern, an instructor, an admin and a pending user, and report which checks pass and fail. Be honest about what ran against my live Supabase project and what did not.
11. Give me one corrected SQL file I can safely run on the existing database without deleting data, and a list of manual steps.
```

**After Antigravity finishes**
1. Run its corrected SQL file.
2. Confirm the buckets:
   ```sql
   select id, public from storage.buckets order by id;
   ```
   Only `avatars` may be `true`.
3. Do the hands-on test: sign in as an intern and try to read another intern's data, personal documents and chat messages. All attempts must fail.

---

## Prompt 7: Deployment readiness

Paste the DATA STORAGE RULE first, then this:

```
Prepare the Ikaai Library portal to be hosted online as a static website. Do not change the design or features.

1. Configuration: move the Supabase URL and public anon key into one config file (supabase-config.js) with a clear example file (supabase-config.example.js). Remove every hard-coded localhost URL. Confirm no secret key is in the code.
2. Redirects: make sign-in and sign-out, Google login and password reset use the site's real address (window.location.origin) so they work on localhost and on the live address.
3. Add a simple hosting config for Netlify or Vercel (for example redirects and security headers such as Content-Security-Policy, X-Content-Type-Options and Referrer-Policy), and a .gitignore that excludes config files with secrets.
4. Add friendly pages: "Page not found", "Access pending" and a maintenance message when Supabase is unreachable.
5. Add a short Privacy Notice and Community Rules page, using clear placeholders for the Ikaai contact, the retention period, and the data protection officer. Do not claim legal compliance; mark the text "for review by Ikaai legal or HR".
6. Add basic performance checks: lazy-load heavy parts, compress images, and no console errors.
7. Write docs/DEPLOY.md with exact steps: how to publish, what to put in Supabase (Authentication, URL Configuration: Site URL and Redirect URLs), what to put in Google Cloud (Authorized JavaScript origins and redirect URI), and how to test the live site.
8. Finish with a launch checklist and the "Data stored" list.
```

**Your manual steps (Antigravity cannot do these)**
1. Upgrade Supabase to the Pro plan (backups, no pausing) and set up a proper email service with your own domain.
2. Move the owner accounts (Supabase, Google Cloud, hosting, domain) to company email addresses with two-factor authentication, and keep at least two owners.
3. Host the site (Netlify, Vercel or Cloudflare Pages) on a company address such as `library.ikaaiindia.in`.
4. Add that address in Supabase (Authentication, URL Configuration) and in Google Cloud (Authorized JavaScript origins). Publish the Google sign-in app so it is not limited to test users.
5. Upload the course files using `docs/UPLOAD_CHECKLIST.csv`, write more quiz questions, and review the job description text against the Word files.
6. Run a pilot with 5 to 10 interns across different programmes for one to two weeks before the full launch.

---

## Prompt 8: Fallback prompts (use only when something fails)

### A. A migration fails in Supabase
Copy the first line of the red error and the `LINE` number, then paste:

```
Migration [FILE NAME] fails in Supabase with:
[PASTE THE ERROR]

You referenced something that does not exist in my live database. My real schema is in the "Live schema reference" section of prompts.md. Fix the file: check every column, table, function and policy name against it and against the earlier migration files, avoid set-returning functions in WHERE, guard text-to-uuid and text-to-int casts, use valid UUIDs only, and make the file safe to re-run (if not exists, drop policy if exists before create policy, drop trigger if exists before create trigger). Give me the corrected full file and a list of exactly what you changed.
```

### B. Error: "Only administrators can change account roles"
This comes from the guard trigger when SQL is run from the SQL Editor.

```
The migration fails with "Only administrators can change account roles" from guard_profile_updates() because auth.uid() is null in the SQL Editor. Fix the migration so it runs "alter table public.profiles disable trigger user;" before the profiles update and "alter table public.profiles enable trigger user;" after it. Do not weaken the guard for signed-in users. Give me the corrected file.
```

### C. A screen shows an error or stays blank
Press F12, open the Console tab, copy the red messages, then paste:

```
The [SCREEN NAME] screen shows an error or a blank page after sign-in. Console error: [PASTE THE ERROR]. Find the cause (a missing column, a wrong table or function name, a Row Level Security policy that blocks the query, a missing storage path, or a missing migration I have not run) and fix it without weakening any security rule. If the fix needs SQL, give me a new migration file and tell me exactly what to run. Do not use demo data to hide the problem.
```

### D. Which programme or role a user sees is wrong
```
A user sees the wrong programme or role. Check that the frontend and every policy use profiles.programme_id and the real role, never the deprecated text columns, and that admins see all programmes while interns and instructors see only their own. Do not add any fallback to Human Resources or the first programme when programme_id is empty or a query fails; show an error or the "Access pending" page instead. Tell me what was wrong and which SQL, if any, I must run.
```

---

## Quick reference: useful checks

Security coverage (only the four `backup_` tables may appear):
```sql
select t.tablename, t.rowsecurity as rls_on, count(p.policyname) as policies
from pg_tables t
left join pg_policies p on p.schemaname = t.schemaname and p.tablename = t.tablename
where t.schemaname = 'public'
group by t.tablename, t.rowsecurity
having t.rowsecurity = false or count(p.policyname) = 0;
```

Guard trigger is on (`tgenabled` must be `O`):
```sql
select tgname, tgenabled from pg_trigger
where tgrelid = 'public.profiles'::regclass and not tgisinternal;
```

Buckets (only `avatars` may be public):
```sql
select id, public from storage.buckets order by id;
```

Who has which role and programme:
```sql
select p.email, p.role, pr.name as programme
from public.profiles p
left join public.programmes pr on pr.id = p.programme_id
order by p.email;
```

Make a user admin from the SQL Editor (the guard blocks it unless the trigger is switched off for the update):
```sql
alter table public.profiles disable trigger user;
update public.profiles set role = 'admin' where email = 'your-email@example.com';
alter table public.profiles enable trigger user;
```

## Do not do yet
- Do not run `20261106_02_drop_deprecated_columns.sql` until everything has worked for several days.
- Do not delete the `backup_` tables until the cleanup is proven. Remove them later with `drop table`.
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-05T11:21:43+05:30.

The user's current state is as follows:
Active Document: d:\IKAAI India\Ikaai Beginner Portal 1\index.html (LANGUAGE_UNSPECIFIED)
Cursor is on line: 1
Other open documents:
- d:\IKAAI India\Ikaai Beginner Portal 1\scripts\append_account_readme.py (LANGUAGE_UNSPECIFIED)
- d:\IKAAI India\Ikaai Beginner Portal 1\supabase\demo_company_documents.sql (LANGUAGE_UNSPECIFIED)
- d:\IKAAI India\Ikaai Beginner Portal 1\supabase\migrations\20261106_01_schema_reconciliation.sql (LANGUAGE_UNSPECIFIED)
- d:\IKAAI India\Ikaai Beginner Portal 1\styles.css (LANGUAGE_UNSPECIFIED)
- d:\IKAAI India\Ikaai Beginner Portal 1\scripts\debug_boot.js (LANGUAGE_UNSPECIFIED)
</ADDITIONAL_METADATA>