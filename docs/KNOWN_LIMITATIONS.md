# Ikaai Library Portal – Known Limitations & Architecture Boundaries

This document records deliberate design trade-offs, hosting platform constraints, and known limitations of the current architecture.

---

## 1. Hosting Environment (GitHub Pages)

### Limitation: Inability to Set Custom HTTP Response Headers
- **Context:** GitHub Pages serves static files directly from GitHub's CDN. It does not provide server-side middleware or configuration mechanisms (like Cloudflare Workers, Netlify Edge, or Vercel Headers) to attach custom HTTP response headers.
- **Impact:**
  - `X-Frame-Options` and `Content-Security-Policy: frame-ancestors` cannot be delivered via HTTP headers.
  - `Strict-Transport-Security` (HSTS) is managed globally by GitHub (`github.io`).
- **Mitigation Implemented:**
  - Strict Content-Security-Policy delivered via `<meta http-equiv="Content-Security-Policy">` in `index.html`.
  - Client-side JavaScript frame-busting check (`if (window.top !== window.self)`) in the `<head>` of `index.html`.
  - `<meta name="referrer" content="strict-origin-when-cross-origin">` tag to prevent query parameter leakage.
  - Configuration files `netlify.toml` and `vercel.json` are annotated as legacy/unused reference files.

---

## 2. Realtime Team Chat & Channel Identifier Design

### Limitation: Text-Based Conversation IDs vs. UUIDs
- **Context:** Chat rooms use text slugs and room identifiers (such as `'all-members'` and `'dm_<uid1>_<uid2>'`) rather than strictly standard UUID format.
- **Impact:**
  - Foreign key constraints between `chat_conversations.id` (text) and `chat_messages.conversation_id` (text) require application-level referential integrity or cascading triggers.
  - Direct joins against UUID user profiles require explicit symmetrical casting (`::text`).
- **Mitigation Implemented:**
  - `public.can_access_chat_conversation(conv_id text, check_user_id uuid)` handles text IDs safely with security definer encapsulation.
  - Soft deletion is used (`is_deleted = true`), preventing dangling foreign keys while maintaining complete audit trails.

---

## 3. Academic Assessment & Question Bank Depth

### Limitation: Single Question per Module Quiz
- **Context:** The current client curriculum features 1 quiz question per module (30 total across 5 programmes) and 3 written exam questions per programme (15 total).
- **Impact:** Interns retaking a quiz encounter the same question.
- **Recommended Future Enhancement:**
  - Move quiz questions into a relational `module_questions` table in Supabase.
  - Support question pools with randomized 5-question subsets per attempt.

---

## 4. Single Administrator Programme Exemption

### Deliberate Design:
- Administrators have no programme assignment (`profiles.programme_id = NULL`).
- Any attempt to assign an admin account to a specific programme is intentionally rejected by the `invite_user` and `guard_profile_updates` database functions. This ensures administrators always retain global platform visibility across all 5 programmes.
