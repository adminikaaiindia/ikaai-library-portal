# Ikaai Library & Academy Portal — Stage 1 Testing Checklist

This checklist provides step-by-step verification instructions for testing the **Stage 1 Supabase Backend** and connected frontend across **Intern**, **Instructor**, and **Admin** roles.

---

## 🛠️ Step 0: Database & Storage Pre-flight Check

Before starting UI verification, ensure the Supabase migrations and seed have been executed in your Supabase SQL Editor in the exact numeric order:

1. `supabase/migrations/20261104_01_core_schema.sql` (Creates core tables, views `v_quiz_options_learner`, `v_my_grades`, `v_programme_completion`, and indexes)
2. `supabase/migrations/20261104_02_rls_policies.sql` (Enables Row Level Security on every table and defines security definer helper functions)
3. `supabase/migrations/20261104_03_server_functions.sql` (Registers RPC functions `open_module`, `complete_module_timer`, `mark_resource_complete`, `mark_faq_read`, `submit_quiz`, `submit_exam`, `grade_exam`, and storage buckets)
4. `supabase/seed.sql` (Inserts the 5 programmes, 30 modules, resources, FAQs, quizzes with answers, exam questions, and 11 job descriptions)

### Storage Buckets Verification
Ensure these three buckets exist in **Supabase Dashboard > Storage**:
- `course-files` (Private, for curriculum slides and documents)
- `job-descriptions` (Public, for downloadable JD .docx files)
- `avatars` (Public, for user profile pictures)

---

## 🎓 Test Case 1: Intern Experience & Sequential Learning

### 1.1 First-Time Login & Programme Selection
1. Open the portal at `http://localhost:8080/index.html`.
2. Sign in with a new user account (via Google or Email signup).
3. **Verification**: If no `programme_id` is assigned to this user, the **"Select Your Programme"** modal appears.
4. Select one of the 5 official programmes (e.g., `Data Analyst`) and click **Confirm & Begin Curriculum**.
5. **Verification**:
   - Modal closes.
   - Programme title changes to **Data Analyst**.
   - Programme dropdown is disabled/locked to the assigned programme for the intern.
   - The user profile in `public.profiles` now has `programme_id` populated with the selected programme UUID.

### 1.2 Sequential Module Unlocking
1. In the sidebar, inspect the module list:
   - **Module 0** is unlocked.
   - **Modules 1 through 5** are locked with lock icons.
2. Click on **Module 1**:
   - **Verification**: A toast notification informs: *"Please complete Module 0 before opening this module."*
   - Navigation is prevented.

### 1.3 Zero-Trust 30-Second Module Review Timer
1. Open **Module 0**.
2. **Verification**:
   - `window.DataLayer.openModule()` triggers and records `opened_at` on the server clock.
   - Ring timer displays `30s` countdown.
   - Buttons (*Start Quiz*, *Resource Ticks*, *Next module*) are locked.
3. Switch browser tabs or minimize the window:
   - **Verification**: The timer pauses with *"Paused (come back to this tab)"*.
4. Switch back to the tab and allow the timer to reach `0s`:
   - **Verification**:
     - `window.DataLayer.completeModuleTimer()` runs on the server.
     - The server clock validates that at least 30 seconds have elapsed since `opened_at`.
     - Timer turns into a green checkmark: *"Unlocked - All module actions available"*.

### 1.4 Resource Ticks & FAQ Reading
1. Click the checkmark icon on a resource card:
   - **Verification**: Checkmark fills green; `mark_resource_complete` RPC records completion in `public.resource_completions`.
2. Expand and read an accordion FAQ item:
   - **Verification**: FAQ gets marked as read; `mark_faq_read` records in `public.faq_reads`.

### 1.5 Cheat-Proof Quiz (No Client-Side Answers)
1. Click **Start Module Quiz**:
   - Open browser DevTools > Network / Elements.
   - Inspect the loaded quiz options or payload.
   - **Verification**: The `is_correct` column is completely absent (enforced by RLS view `v_quiz_options_learner`).
2. Select answers for each question and click **Submit Quiz**:
   - **Verification**:
     - Quiz answers `{ question_id, option_id }` are sent to `submit_quiz` RPC on Supabase.
     - Postgres calculates score against private `quiz_options.is_correct`.
     - Score, letter grade (e.g., `A (100%)`), and pass status are returned.
     - `public.quiz_attempts` records the submission.
     - If passed (>=80%), **Module 1 unlocks** in the sidebar.

### 1.6 Academic Grade Report
1. Click **Grade** in the sidebar:
   - **Verification**:
     - Quiz average shows the real calculated average (e.g. `A (100%)`).
     - Breakdown table lists each module quiz and true server status.
     - No hard-coded mock values (e.g., 98% default removed).

### 1.7 Written Exam Submission
1. Click **Written Exam** in the sidebar.
2. Click **Start Written Exam**.
3. Fill in all 3 essay prompts and click **Submit Written Exam**:
   - **Verification**:
     - Answers are saved via `submit_exam` RPC into `public.exam_submissions` and `public.exam_answers`.
     - Status pill updates to **"Submitted · Under Review"**.
     - Form switches to review mode.

### 1.8 Anonymous Feedback
1. Click **Feedback** in the sidebar (or top of any module).
2. Enter topic and comments, then click **Submit Feedback**:
   - **Verification**:
     - Saved via `submitFeedback` to `public.feedback`.
     - Added to "Your Recent Submissions" list.

---

## 👩‍🏫 Test Case 2: Instructor Experience

### 2.1 Promote User to Instructor
In Supabase SQL Editor:
```sql
UPDATE public.profiles
SET role = 'instructor',
    programme_id = '10000000-0000-0000-0000-000000000002' -- Data Analyst
WHERE email = 'your-instructor-email@example.com';
```

### 2.2 Verify Instructor Privileges
1. Sign in with the instructor account.
2. In the sidebar:
   - Programme dropdown is fixed to the instructor's cohort (`Data Analyst`).
   - `#navAdmin` is hidden.
3. Exam Review & Grading:
   - Instructors can review exam submissions for learners in their cohort.
   - Execute `grade_exam` RPC with marks and feedback:
     ```sql
     SELECT public.grade_exam(
       p_submission_id := '<submission-uuid>',
       p_marks := 'A (95%)',
       p_comment := 'Excellent analytical rigor and methodology.'
     );
     ```
   - In learner view, the exam pill updates to **"Graded (A (95%))"**.

---

## 🛡️ Test Case 3: Admin Portal Experience

### 3.1 Promote User to Admin
In Supabase SQL Editor:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

### 3.2 Verify Admin Capabilities
1. Sign in with the admin account:
   - **Verification**:
     - **Admin Portal** button (`#navAdmin`) appears in the sidebar.
     - Programme dropdown is fully unlocked and can switch between all 5 programmes:
       1. Human Resources
       2. Data Analyst
       3. Social Research & Policy
       4. Design & Social Media
       5. Business Development
2. Click **Admin Portal** in the sidebar:
   - **Verification**:
     - User table loads with real users from `public.profiles`.
     - User search filter works in real-time.
3. Change a user's role (e.g., from `intern` to `instructor` or `admin`) and programme assignment:
   - Click **Save**.
   - **Verification**:
     - Green toast: *"Updated permissions for User"*.
     - Profile in `public.profiles` updates immediately.

---

## 🎨 Test Case 4: Light & Dark Theme Consistency

1. In the top bar, click the theme toggle buttons:
   - **Light Mode**:
     - Test all screens (`Module`, `JDs`, `Exam`, `Grade`, `Feedback`, `Settings`, `Admin Portal`).
     - Verify text contrast is at least 4.5:1.
     - Ensure no pure black or hard-coded white boxes.
   - **Dark Mode**:
     - Verify dark backgrounds, borders, and green accents.
   - **Auto Mode**:
     - Follows OS preferred color scheme.

