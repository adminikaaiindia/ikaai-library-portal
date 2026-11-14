# Ikaai Library Portal – Production Go-Live Checklist

**Target Launch Date:** November 2026  
**Site URL:** `https://adminikaaiindia.github.io/ikaai-library-portal/`  
**Backend:** Supabase Project `fmblkesibzjrydswwldq`

Every item must be reviewed and confirmed prior to inviting external users.

---

## 1. Supabase Backend Configuration

| Item | Setting / Location | Why It Matters | Verification Test | Confirmed |
| :--- | :--- | :--- | :--- | :---: |
| **RLS Enabled** | Database > Tables > All Tables | Prevents unauthorized read/write access via public anon key | Run `verify_20261114_17.sql` step 1 (all 5 chat tables return `rls_enabled = true`) | [ ] |
| **RPC Anon Lockdown** | Database > Functions | Prevents unauthenticated bots from calling administrative RPCs | Run `verify_20261114_17.sql` step 3 (0 rows returned) | [ ] |
| **Site URL** | Auth > URL Configuration > Site URL | Ensures auth redirects navigate to GitHub Pages sub-path | Value is strictly `https://adminikaaiindia.github.io/ikaai-library-portal/` | [ ] |
| **Redirect URLs** | Auth > URL Configuration > Redirect URLs | Permits Google OAuth and password reset callbacks | Includes `https://adminikaaiindia.github.io/ikaai-library-portal/**` and `http://localhost:*` | [ ] |
| **Email Confirmation** | Auth > Providers > Email | Decides whether new registrants must verify email before sign-in | Recommended `OFF` for invite-only portal, or `ON` if self-registration is allowed | [ ] |
| **Realtime Replication** | Database > Publications > `supabase_realtime` | Required for live chat and last seen presence updates | Check `chat_messages`, `chat_conversation_members`, `profiles` are included | [ ] |
| **Storage Bucket Limits** | Storage > Settings / Buckets | Prevents oversized uploads and executable malware files | Run `verify_20261114_17.sql` step 4 (10MB limit and MIME list populated) | [ ] |

---

## 2. Google Cloud Platform (GCP) OAuth Setup

| Item | Setting / Location | Why It Matters | Verification Test | Confirmed |
| :--- | :--- | :--- | :--- | :---: |
| **OAuth Consent Screen** | GCP Console > APIs & Services > OAuth consent | Displays official Foundation branding and logo to learners | App name is "Ikaai India Academy", support email configured | [ ] |
| **Authorized JavaScript Origins** | GCP Console > Credentials > Client ID | Prevents cross-origin authorization attacks | Includes `https://adminikaaiindia.github.io` and `https://fmblkesibzjrydswwldq.supabase.co` | [ ] |
| **Authorized Redirect URIs** | GCP Console > Credentials > Client ID | Allows Google to return auth token to Supabase Auth handler | Must include `https://fmblkesibzjrydswwldq.supabase.co/auth/v1/callback` | [ ] |

---

## 3. GitHub Pages Deployment

| Item | Setting / Location | Why It Matters | Verification Test | Confirmed |
| :--- | :--- | :--- | :--- | :---: |
| **Sub-path Assets** | Repository Root | Site is served from `/ikaai-library-portal/` | All asset links in `index.html` use relative paths (`styles.css`, `logo.png`) | [ ] |
| **Bypass Jekyll (`.nojekyll`)** | Repository Root > `.nojekyll` | Prevents Jekyll from ignoring files with underscores or custom folders | Verify file exists at root of repository | [ ] |
| **Enforce HTTPS** | GitHub Repo > Settings > Pages | Prevents MITM attacks and plain HTTP transmission | "Enforce HTTPS" checkbox is checked | [ ] |
| **No Secrets in Repo** | Git Commit History | Protects cloud resources and service credentials | Run `node scripts/build.js` (passes with 0 alerts) | [ ] |

---

## 4. Accounts & Role Initialization

| Item | Action | Why It Matters | Verification Test | Confirmed |
| :--- | :--- | :--- | :--- | :---: |
| **Primary Administrator Account** | Invite / Seed Admin in `access_invites` | Guarantees organization admin can access Admin portal without backdoor emails | In `access_invites`: `admin.ikaaiindia@gmail.com` with role `admin`, status `active` | [ ] |
| **Instructor Accounts** | Onboard academic mentors | Enables instructors to evaluate written exams and post notices | Verified in Admin User Table with role `instructor` and assigned programme | [ ] |
| **Remove Test Accounts** | Clean up staging accounts | Keeps platform directory clean and protects learner privacy | Check Admin User Table for dummy or test records | [ ] |

---

## 5. Curriculum Content & Storage Assets

| Item | Action | Why It Matters | Verification Test | Confirmed |
| :--- | :--- | :--- | :--- | :---: |
| **Course Slides Uploaded** | Upload module PDFs/decks to `course-files` | Learners clicking "Download Slides" must receive real files (not 404) | Review `docs/UPLOAD_CHECKLIST.csv` and verify files in Supabase Storage | [ ] |
| **Question Bank Depth** | Academic review of quizzes & exams | Ensures rigorous evaluation of learners across all 5 programmes | Instructors review `app.js` module questions and exam prompts | [ ] |

---

## 6. Pre-Launch Functional Smoke Test

- [ ] Sign in with Google as new learner -> Holding screen shows "Account Pending Approval".
- [ ] Admin approves learner and assigns to Data Analyst programme -> Page refreshes into Data Analyst dashboard.
- [ ] Learner completes Module 1 Quiz -> Score recorded in Supabase.
- [ ] Learner submits Written Exam -> Appears in Instructor Evaluation Inbox.
- [ ] Instructor grades exam -> Grade and feedback appear on Learner Home screen.
- [ ] Live chat message sent between two users -> Delivered in realtime without refresh.
- [ ] User logs out -> Session cleared, redirects cleanly to login tab.
