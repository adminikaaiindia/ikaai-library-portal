# Ikaai Library Portal – Administrator & Instructor Guide

**Version:** 2.0 (Production Release)  
**Target Audience:** Portal Administrators, Academic Instructors, Mentors, and Operations Staff

---

## 1. System Roles & Access Hierarchy

The portal enforces a strict 3-tier Role-Based Access Control (RBAC) model:

| Role Identifier | UI Display Name | Access Scope | Programme Assignment |
| :--- | :--- | :--- | :--- |
| `intern` (`learner`) | **Intern / Learner** | Learning modules, curriculum slides, module quizzes, written exams, team chat, resources. | Strictly **1** of the 5 canonical programmes. |
| `instructor` | **Instructor / Mentor** | Module access, Exam Evaluation Inbox, learner grading, announcement publishing, team chat. | Assigned to **1** programme (or universal review). |
| `admin` | **Administrator** | Full platform management: user onboarding, access approval/revocation, platform directory, announcements, system audit. | **None** (`programme_id = NULL`). Admins see and manage all programmes. |

> [!IMPORTANT]
> The database strictly checks `role in ('intern', 'instructor', 'admin')`. Do not attempt to assign custom roles; job titles or special tracks should be recorded under the user's `position` field.

---

## 2. User Onboarding & Access Management

### 2.1 Inviting a New User
1. Log in with an **Administrator** account and navigate to **Admin** in the sidebar.
2. Select the **Single User Invite** tab.
3. Enter the user's institutional or personal email address (e.g. `priya.sharma@ikaaiindia.org`).
4. Select the canonical **Role**:
   - `Intern / Learner`
   - `Instructor / Mentor`
   - `Administrator`
5. Select the **Programme Assignment**:
   - Human Resources
   - Data Analyst
   - Social Research & Policy
   - Design & Social Media
   - Business Development
   *(Note: Programme assignment is disabled when inviting an Administrator).*
6. Click **Send Invitation / Approve**. The user record is created in `public.access_invites` with status `invited`.

### 2.2 Approving Pending Sign-ups
If a user registers using Google OAuth or email sign-up without prior invitation:
1. Their account is placed in **Pending Approval** state (`access_status = 'pending'`).
2. They see a secure holding screen and cannot access learning resources, chat, or exams.
3. In the **Admin** screen, find the user in the directory table (filtered by *Pending Approval*).
4. Click **Approve / Edit**, select their designated programme, and click **Save**. Their status becomes `active` immediately.

### 2.3 Revoking User Access
1. Locate the user in the Admin User Directory.
2. Click **Revoke Access**.
3. The user's `access_status` is updated to `revoked`. Their active session is invalidated, and subsequent requests are blocked by Supabase RLS.

---

## 3. Exam Evaluation & Grading (Instructors & Admins)

When an intern submits their final written examination:
1. Navigate to **Exam Grading** in the sidebar.
2. The **Evaluation Inbox** lists submissions with status:
   - `submitted`: Awaiting instructor review.
   - `graded`: Graded with feedback returned to intern.
   - `draft`: Intern is currently writing their exam.
3. Click on a submission row to open the grading modal.
4. Review the candidate's answers for each question.
5. Enter:
   - **Numerical Score** (0 to 100)
   - **Letter Grade** (A, B, C, or Incomplete)
   - **Detailed Instructor Feedback / Recommendations**
6. Click **Submit Evaluation**.
7. The intern's Home dashboard updates immediately to show their grade and feedback.

---

## 4. Announcements Publishing

Instructors and Administrators can broadcast notices to the entire foundation or specific cohorts:
1. Navigate to **Announcements** in the sidebar.
2. Click **New Announcement**.
3. Fill in:
   - **Title & Body**
   - **Category** (General, Academic, Operations, Urgency)
   - **Target Audience**:
     - *Everyone*: Visible across all 5 programmes.
     - *Specific Programme*: Visible only to learners enrolled in that track.
     - *Specific Role*: Visible only to Interns or Instructors.
   - **Options**:
     - *Pin Announcement*: Keeps the notice at the top of the feed.
     - *Urgent Banner*: Displays high-priority styling.
     - *Require Acknowledgement*: Interns must click "Acknowledge" to confirm receipt.
4. Click **Publish**.

---

## 5. Community Guidelines & Moderation

- Instructors and Administrators can delete inappropriate chat messages or comments.
- Chat messages feature soft deletion (`is_deleted = true`), maintaining audit logs for compliance with the Foundation's Code of Conduct.
