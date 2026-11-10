# Ikaai Library Portal – Production Deployment Guide

**Audience:** System Administrators, DevOps, HR / Operations  
**Date:** 6 November 2026  
**Deployment Target:** Static Web Hosting (Netlify, Vercel, or Cloudflare Pages) connected to Supabase (Mumbai Region: `ap-south-1`)

---

## 1. Hosting Architecture Overview

The Ikaai Library Portal is designed as a secure, high-performance static Single Page Application (SPA):
* **Frontend:** Static HTML5, Vanilla JavaScript (ES2022), CSS3 custom properties with responsive layout. Zero Node.js runtime needed in production.
* **Backend:** Supabase PostgreSQL (`fmblkesibzjrydswwldq.supabase.co`) with Row Level Security (RLS), GoTrue Auth, Realtime engine, and Private Storage.
* **Hosting Configs Provided:**
  * `netlify.toml` (SPA rewrites and hardened Content-Security-Policy headers)
  * `vercel.json` (Vercel routes and security headers)
  * `.gitignore` (excludes `.env`, `.pem`, secrets, and logs)

---

## 2. Configuration & Secrets Hygiene

1. **Client Configuration (`supabase-config.js`)**:
   * Uses only the public `anonKey` and project URL:
     ```javascript
     const SUPABASE_CONFIG = {
       url: "https://fmblkesibzjrydswwldq.supabase.co",
       anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYmxrZXNpYnpqcnlkc3d3bGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MDg2NzEsImV4cCI6MjEwOTE4NDY3MX0.r990IizmXHZ9tTV_Ttb325MliYHUQLvVZFF6Cz6JUVE"
     };
     ```
   * A clean template is provided in `supabase-config.example.js`.
   * **Security Rule:** Never put the `service_role` secret or database password into any client-side JavaScript or HTML file.

2. **Dynamic URLs**:
   * All authentication redirects (Google sign-in, magic links, password resets) dynamically resolve to `window.location.origin + window.location.pathname`.
   * The application adapts automatically across `localhost`, staging domains, and the production custom domain (`library.ikaaiindia.in`).

---

## 3. Step-by-Step Publishing

### Option A: Deploy to Netlify
1. Log in to [Netlify](https://app.netlify.com).
2. Click **Add new site** → **Import an existing project** (or drag & drop the portal directory into Netlify Drop).
3. **Build settings**:
   * **Base directory**: Leave blank / root (`.`)
   * **Build command**: Leave blank (no build step required)
   * **Publish directory**: `.`
4. Netlify will automatically detect `netlify.toml` and apply security headers and SPA redirects.
5. In **Domain management**, add your company domain (e.g. `library.ikaaiindia.in`).

### Option B: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** → **Project** → Select your Git repository.
3. **Framework Preset**: Select `Other`.
4. **Root Directory**: `./`
5. Click **Deploy**. Vercel will automatically read `vercel.json` for routing and headers.

---

## 4. Supabase Auth & URL Configuration

Once your production domain is active (e.g. `https://library.ikaaiindia.in`), configure Supabase authentication:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard/project/fmblkesibzjrydswwldq).
2. Navigate to **Authentication** → **URL Configuration**.
3. **Site URL**:
   * Set to your production URL: `https://library.ikaaiindia.in`
4. **Redirect URLs** (Add each of these):
   * `https://library.ikaaiindia.in`
   * `https://library.ikaaiindia.in/index.html`
   * `http://localhost:8080` (for local development testing)
   * `http://localhost:8080/index.html`
5. Click **Save**.

---

## 5. Google Cloud Console Configuration (OAuth 2.0)

If your cohort uses Google Sign-In:

1. Open [Google Cloud Console](https://console.cloud.google.com).
2. Navigate to **APIs & Services** → **Credentials** → Select your OAuth 2.0 Client ID for Supabase.
3. Under **Authorized JavaScript origins**, add:
   * `https://fmblkesibzjrydswwldq.supabase.co`
   * `https://library.ikaaiindia.in`
   * `http://localhost:8080`
4. Under **Authorized redirect URIs**, ensure Supabase's callback is present:
   * `https://fmblkesibzjrydswwldq.supabase.co/auth/v1/callback`
5. Click **Save**.
6. **Publish App**: In **OAuth consent screen**, if the app is in *Testing* status, click **Publish App** so interns outside your test group can sign in without encountering `Access blocked: App has not completed the Google verification process`.

---

## 6. Pre-Launch Verification Checklist

Before announcing portal access to interns:

- [ ] **Access Whitelist**: Admin adds initial intern and instructor emails via **Users & Access** screen in portal (or via `invite_user` database function).
- [ ] **Bucket Privacy**: Confirm private bucket settings in Supabase:
  ```sql
  select id, public from storage.buckets order by id;
  ```
  *(Only `avatars` may be `true`)*.
- [ ] **Course Files Uploaded**: Upload curriculum PDFs/resources using `docs/UPLOAD_CHECKLIST.csv`.
- [ ] **Custom Domain SSL**: Verify HTTPS certificate is active on `library.ikaaiindia.in`.
- [ ] **404 Handling**: Navigate to `https://library.ikaaiindia.in/non-existent-page` and verify the custom `404.html` renders with the return button.
- [ ] **Pending Gate Verification**: Sign in with an unapproved test email and confirm the full-screen "Access Pending Approval" gate displays without leaking portal data.
- [ ] **Admin Verification**: Sign in with an approved admin email and verify admin tabs (Users & Access, Documents Management, Announcements Authoring) load properly.

---

## 7. Data Stored Summary

| Category | Storage Location | Retention / Sensitivity |
|---|---|---|
| User Credentials | Supabase Auth (`auth.users`) | Encrypted passwords, OAuth tokens. Never stored in public tables. |
| User Profile | `public.profiles` | Name, email, phone, role, programme, avatar URL. |
| Access Whitelist | `public.access_invites` | Approved emails, assigned roles, programme IDs, statuses. |
| Curriculum Progress | `public.module_progress`, `resource_completions`, `quiz_attempts` | Progress timestamps and assessment scores. |
| Exam & Feedback | `public.exam_submissions`, `exam_answers`, `feedback` | Evaluated answers, grades, feedback reviews. |
| Team Communication | `public.message_threads`, `messages`, `announcements` | Noticeboard broadcasts, discussions, attachments. |
| Private Documents | `public.personal_documents`, `company_documents` | Private storage paths; access logged in audit tables. |

