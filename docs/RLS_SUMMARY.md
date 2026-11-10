# Ikaai Academy Portal – Row Level Security (RLS) Summary & Security Matrix

**Audit Date:** 6 November 2026  
**Audited Schema:** Supabase PostgreSQL Database (Production Migration Track `20261102` through `20261106_08`)  
**Specification:** Prompt 6 (Security Audit and Hardening)

---

## 1. Executive Summary

All public application tables in the Ikaai Library Portal have Row Level Security (`RLS`) enabled. Access gating operates via the central `public.is_active_user()` helper function and the `access_invites` whitelist system.

* **Deprecated Column Check:** **0 policies** reference `display_name`, `profiles.programme` (text), or `member_since` (text). All programme isolation uses `profiles.programme_id` (UUID).
* **Inactive / Pending User Isolation:** Users with `access_status` != `'active'` can **only** read their own single profile row. They are strictly blocked by RLS policies from querying programmes, modules, quizzes, documents, chat, feedback, exams, and announcements.
* **Personal Document Isolation:** Instructors have **zero** read access to `personal_documents` or the `personal-documents` storage bucket. Interns can access only their own unrevoked documents; Admins can manage all documents.
* **Storage Bucket Privacy:** 6 out of 7 buckets are marked private (`public = false`). Only `avatars` is public. All private files are accessed via short-lived signed URLs.

---

## 2. Comprehensive Table RLS Matrix

| # | Table Name | RLS Enabled | Policies Defined | Select (Read) Permissions | Insert / Update / Delete Permissions | Active-Only Filter |
|---|---|:---:|:---:|---|---|:---:|
| 1 | `profiles` | **YES** | 4 | Any active user can view staff & peer profiles; users can view their own profile even if `pending`. | Users can update own `full_name`, `phone`, `avatar_url`, `last_seen`. Role, programme, email, branch, and access_status are blocked by `trg_guard_profile_updates`. Admins can manage all. | Partial (own row viewable by pending) |
| 2 | `access_invites` | **YES** | 2 | Admins only (and server RPC functions `list_access_invites`). | Admins only (via server RPCs `invite_user`, `update_user_access`, `revoke_user_access`). | Admin only |
| 3 | `programmes` | **YES** | 2 | Active users can view all programmes. | Admins only. | **YES** |
| 4 | `modules` | **YES** | 2 | Active users enrolled in programme, or Admins. | Admins & programme Instructors. | **YES** |
| 5 | `resources` | **YES** | 2 | Active users enrolled in programme, or Admins. | Admins & programme Instructors. | **YES** |
| 6 | `faqs` | **YES** | 2 | Active users enrolled in programme, or Admins. | Admins & programme Instructors. | **YES** |
| 7 | `quizzes` | **YES** | 2 | Active users enrolled in programme, or Admins. | Admins & programme Instructors. | **YES** |
| 8 | `quiz_questions` | **YES** | 2 | Active users enrolled in programme, or Admins. | Admins & programme Instructors. | **YES** |
| 9 | `quiz_options` | **YES** | 2 | Active users enrolled in programme, or Admins. Learners query `v_quiz_options_learner`. | Admins & programme Instructors. | **YES** |
| 10 | `exam_questions` | **YES** | 2 | Active users enrolled in programme, or Admins. | Admins & programme Instructors. | **YES** |
| 11 | `jobs` | **YES** | 2 | Active users can view all published jobs. | Admins only. | **YES** |
| 12 | `resource_completions` | **YES** | 3 | Users can view own; Instructors can view assigned programme; Admins view all. | Users can insert/toggle own completions only if module timer is unlocked. | **YES** |
| 13 | `module_progress` | **YES** | 3 | Users view own; Staff view assigned programme/all. | Users can upsert own progress only. | **YES** |
| 14 | `faq_reads` | **YES** | 2 | Users view own read states. | Users can insert own read state. | **YES** |
| 15 | `quiz_attempts` | **YES** | 3 | Users view own scores; Staff view programme/all. | Users can insert own attempt records. | **YES** |
| 16 | `quiz_answers` | **YES** | 2 | Users view own answers; Staff view programme/all. | Users can insert own answers. | **YES** |
| 17 | `exam_submissions` | **YES** | 4 | Learners view own submissions; Instructors view assigned programme; Admins view all. | Active learners insert submission (`status = 'submitted'`); Instructors grade their programme; Admins grade all. | **YES** |
| 18 | `exam_answers` | **YES** | 3 | Learners view own answers; Staff view programme/all. | Learners insert answers during submission. | **YES** |
| 19 | `feedback` | **YES** | 3 | Learners view own feedback; Instructors view assigned programme; Admins view all. | Active learners submit feedback; Staff review/mark reviewed. | **YES** |
| 20 | `message_threads` | **YES** | 3 | Learners view own threads; Instructors view assigned programme threads; Admins view all. | Learners create threads for assigned programme; Staff reply. | **YES** |
| 21 | `messages` | **YES** | 2 | Users view messages only in threads they can access. | Senders can insert message into accessible threads. | **YES** |
| 22 | `canned_replies` | **YES** | 2 | Staff (Instructors & Admins) only. | Staff only. | Staff only |
| 23 | `internal_notes` | **YES** | 2 | Staff only. Learners cannot view or insert notes. | Staff only. | Staff only |
| 24 | `company_documents` | **YES** | 2 | Active users can view published documents matching their programme or all (`programme_id is null`). | Staff can create, update, and archive company documents. | **YES** |
| 25 | `company_document_audit_logs`| **YES** | 2 | Admins only. | System / user can insert audit log on view/download. | **YES** |
| 26 | `personal_documents` | **YES** | 4 | **Recipient intern only** (`recipient_id = auth.uid()` and not revoked) or **Admin**. **Instructors CANNOT read.** | Admins only can insert, update, revoke, restore, or delete personal documents. | **YES** |
| 27 | `personal_document_audit_logs`| **YES** | 2 | Admins only. | System / user can insert audit log on view/download. | **YES** |
| 28 | `chat_conversations` | **YES** | 2 | Conversation members and Admins. | Conversation members and Admins. | **YES** |
| 29 | `chat_conversation_members` | **YES** | 2 | Conversation members and Admins. | Admins or conversation admins. | **YES** |
| 30 | `chat_messages` | **YES** | 3 | Conversation members only. | Conversation members only. | **YES** |
| 31 | `announcements` | **YES** | 4 | Active users matching audience (`all`, `programme = current_programme_id()`, or `role = current_role()`). | Staff can author/edit; Instructors limited to assigned programme; Admins all. | **YES** |
| 32 | `announcement_reads` | **YES** | 3 | Users view own reads; Staff view for reach audit. | Users insert own read timestamp. | **YES** |
| 33 | `announcement_acks` | **YES** | 3 | Users view own acknowledgements; Staff view for audit. | Users insert own acknowledgement timestamp. | **YES** |
| 34 | `announcement_comments` | **YES** | 3 | Active users matching announcement audience. | Active users post comment on accessible announcements. | **YES** |
| 35 | `announcement_files` | **YES** | 2 | Active users matching announcement audience. | Staff can attach files to announcements. | **YES** |

---

## 3. Storage Buckets Security Audit

| Bucket Name | Visibility | Allowed Select (Download) | Allowed Insert / Update / Delete |
|---|:---:|---|---|
| `avatars` | **PUBLIC** | Public read. | Authenticated users can upload to `avatars/<auth.uid()>` only. |
| `course-files` | **PRIVATE** | Active users enrolled in programme, or Admin. Served via signed URLs. | Staff (Instructors for assigned programme, Admins for all). |
| `job-descriptions` | **PRIVATE** | Active users. Served via signed URLs. | Admins only. |
| `company-documents` | **PRIVATE** | Active users matching document programme (or all). Served via signed URLs. | Admins only. |
| `personal-documents` | **PRIVATE** | **Strictly recipient intern only** (`<auth.uid()>/...`) or **Admin**. **Instructors CANNOT access.** Served via signed URLs. | Admins only. |
| `chat-attachments` | **PRIVATE** | Members of conversation only. Served via signed URLs. | Active conversation members. |
| `announcement-files` | **PRIVATE** | Active users matching announcement audience. Served via signed URLs. | Staff only. |

---

## 4. Views & Cross-Tenant Isolation

1. **`v_quiz_options_learner`**:
   * Uses `with (security_invoker = true)`
   * Strips `is_correct` boolean so learners cannot inspect answers in the DOM or API payloads.
   * Isolates to active users enrolled in the module's programme or admin.
2. **`v_my_grades`**:
   * Uses `with (security_invoker = true)`
   * Strictly filters `qa_sub.user_id = auth.uid()` and `m.programme_id = public.current_programme_id() or public.is_admin()`.
   * Prevents any user from reading grades of peers or other programmes.
3. **`v_programme_completion`**:
   * Uses `with (security_invoker = true)`
   * Filters to `auth.uid()` and user's enrolled programme.

---

## 5. Security Checklist & Compliance

- [x] All 35 tables have `ROW LEVEL SECURITY` enabled.
- [x] Zero references to deprecated columns (`display_name`, `programme`, `member_since`).
- [x] Users with `access_status = 'pending'` or `'revoked'` are blocked from reading portal data.
- [x] Non-admins cannot alter `role`, `programme_id`, `email`, `branch`, `position`, or `access_status` via `trg_guard_profile_updates`.
- [x] Instructors cannot view or download `personal_documents` belonging to interns.
- [x] Storage buckets are private (except `avatars`).
- [x] All server-side RPC functions enforce server-level role verification (`is_admin()`, `is_instructor_for()`) and use explicit `set search_path = public, pg_temp`.
- [x] Zero secrets in front-end files (only public `anonKey`).

