# Ikaai Library Portal — Stage 1 Backend Plan & Frontend Audit

This document maps all existing hard-coded, memory, and `localStorage` data structures from the frontend (`index.html`, `app.js`, `jd-data.js`, and the `JD/` directory) to the Supabase Postgres database tables, views, RLS policies, and server RPC functions for **Stage 1**.

---

## 1. Frontend Audit & Data Inventory

| Category | Existing Frontend Location | Current Data Structure | Planned Database Mapping | Notes / Constraints |
| :--- | :--- | :--- | :--- | :--- |
| **Programmes** | `app.js` (`INITIAL_DATA.programmes`) | 5 programmes: `hr`, `data`, `research`, `design`, `bd` with title, roleTag, description | `public.programmes` | Slugs: `human-resources`, `data-analyst`, `social-research-policy`, `design-social-media`, `business-development`. |
| **Modules** | `app.js` (`p.modules[0..5]`) | 6 modules per programme (index 0 to 5) with title, quizTitle, objectives, resources, faqs | `public.modules` | Linked to `programme_id`. Has `number`, `title`, `description`, `learning_objectives text[]`, `sort_order`, `timer_seconds default 30`. |
| **Learning Objectives** | `app.js` (`m.objectives`) | Array of 3–4 strings per module | `public.modules.learning_objectives` | Stored as `text[]` in Postgres. |
| **Resources** | `app.js` (`m.resources`) | Numbered resource cards (e.g., `res_0_1`, title, format, subtitle) | `public.resources` | Linked to `module_id`. Has `number`, `title`, `type` (`document`/`pdf`/`image`/`presentation`), `storage_path`, `sort_order`. |
| **FAQs** | `app.js` (`m.faqs`) | Accordion questions & answers (q, a) | `public.faqs` | Linked to `module_id`. Has `question`, `answer`, `sort_order`. |
| **Quizzes** | `app.js` (`m.quiz`) | Per-module quiz with title, pass mark (80%), questions, options, `correctIndex` | `public.quizzes`, `public.quiz_questions`, `public.quiz_options` | `is_correct` in `quiz_options` is strictly protected by RLS; learners only read options via safe view `v_quiz_options_learner`. |
| **Exam Questions** | `app.js` (`p.exam.questions`) | 3 comprehensive essay prompts per programme | `public.exam_questions` | Linked to `programme_id`. Has `question`, `prompt`, `max_marks` (default 100), `sort_order`. |
| **Job Descriptions** | `jd-data.js` & `JD/*.docx` | 11 official Word JDs with full HTML, excerpt, file metadata | `public.jobs` | Full content stored as `content_html`, slug, category, linked `programme_id`, docx storage path. |
| **User Profile** | `INITIAL_DATA.profile`, `app.js` auth | Sudhir Kumar / logged-in user (name, role, branch, position, etc.) | `public.profiles` | `id` references `auth.users(id)`. Auto-inserted via trigger on signup. Role default `intern`. |
| **Instructors** | `PROGRAMME_INSTRUCTORS` in `app.js` | Devashish Chauhan, Neha Singhal, Gehna Sahni | `public.profiles` (where `role = 'instructor'`) & programme association | Associated by `programme_id`. |
| **Module Progress & Timer** | `app.js` state & `moduleTimerSeconds` | 30s countdown, unlocked flag in memory | `public.module_progress` | Tracks `opened_at`, `timer_completed_at`, `completed_at`, `seconds_spent`. Server validates 30s elapsed! |
| **Resource Completions**| `app.js` resource checkmarks | Checkmarks in memory / localStorage | `public.resource_completions` | `(user_id, resource_id, completed_at)`. Requires module timer completed first. |
| **FAQ Reads** | `app.js` FAQ read toggle | Read flags in memory / localStorage | `public.faq_reads` | `(user_id, faq_id, read_at)`. |
| **Quiz Attempts & Grades** | `app.js` `grade` property (e.g. `A (90%)`) | Hard-coded strings (`A (90%)`, `10/10`) | `public.quiz_attempts`, `public.quiz_answers` | Graded ON THE SERVER. Returns percentage, passed status, and letter grade scale. |
| **Exam Submissions** | `app.js` `prog.exam.submitted` | Answers map `{ [qId]: text }` | `public.exam_submissions`, `public.exam_answers` | Submission status (`not_submitted`, `submitted`, `graded`), instructor grade & comments. |
| **Feedback** | `app.js` `prog.feedbackList` | Topic, message, timestamp in memory | `public.feedback` | `(user_id, module_id, programme_id, topic, message, created_at)`. |
| **Programme Completion**| `app.js` progress bar (e.g. `91%`) | Computed in client | `v_programme_completion` view | Real server-side percentage based on passed/completed modules. |
| **Grades Summary** | `app.js` Grade screen | Hard-coded table rows | `v_my_grades` view / RPC | Real computed quiz grades, average, and written exam grade. |

---

## 2. Programme Slug & Category Mapping

| Programme Name | Slug | Associated JD Categories & Roles |
| :--- | :--- | :--- |
| **Human Resources** | `human-resources` | `HR Intern JD_Ikaai.docx`, `JD_HR and Admin.docx` |
| **Data Analyst** | `data-analyst` | `Data Analyst Intern JD.docx` |
| **Social Research & Policy** | `social-research-policy`| `JD_Research Assistant.docx`, `JD_Research Associate.docx`, `JD_Research Executive.docx`, `JD_Research Trainee.docx`, `JD_Sr. Research Associate.docx`, `Research Intern JD-.docx` |
| **Design & Social Media** | `design-social-media` | `Social Media cum Graphic Design Intern JD.docx` |
| **Business Development** | `business-development` | `JD_Associate- Partnerships and Business Development.docx` |

---

## 3. Security & Rule Architecture (Zero-Trust Server Validation)

1. **Timer Skipping Prevention**:
   - `open_module(module_id)` records server timestamp `opened_at`.
   - `complete_module_timer(module_id)` queries `opened_at` against server `now()`. If `< 30 seconds` have elapsed on the server clock, the request is rejected with `TIMER_NOT_ELAPSED`.
2. **Cheat-Proof Quizzes**:
   - `quiz_options.is_correct` is never readable by interns via RLS. Interns read through `v_quiz_options_learner`.
   - `submit_quiz(quiz_id, answers)` scores answers inside a PostgreSQL `SECURITY DEFINER` function against `quiz_options.is_correct`, records `quiz_attempts`, and returns the scored result without leaking answers.
3. **Module Sequential Unlocking**:
   - Module 0 is always unlocked.
   - Module N+1 requires Module N to have `completed_at is not null` (all resources completed, all FAQs read, and quiz passed with >=80%).
4. **Data Isolation (RLS)**:
   - Interns can only read content for their assigned `programme_id`.
   - Interns can only view/mutate their own progress records.
   - Instructors can review their programme's learners' progress and grade exams.
   - Admins possess full access across all programmes.

---

## 4. Frontend Data Layer Architecture

- **`supabase-client.js`**: Initializes standard Supabase JS client using `SUPABASE_CONFIG.url` and `SUPABASE_CONFIG.anonKey`.
- **`data.js`**: Clean abstraction providing typed async functions (`getProgrammes()`, `getActiveProgramme()`, `getModules()`, `getModule()`, `openModule()`, `completeTimer()`, `submitQuiz()`, `getGrades()`, `submitExam()`, `getJobs()`, `updateProfile()`, etc.).
- **Zero LocalStorage Progress**: All learning progress, ticks, and grades are pulled live from Supabase. `localStorage` is used solely for UI preferences (theme: light/dark/auto).

