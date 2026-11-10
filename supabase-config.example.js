/**
 * IKAAI ACADEMY PORTAL – SUPABASE CONFIGURATION TEMPLATE
 * File: supabase-config.example.js
 *
 * Instructions:
 * 1. Copy this file to `supabase-config.js`.
 * 2. Fill in your project URL and public anon key from:
 *    Supabase Dashboard -> Project Settings -> API -> Project URL & Project API Keys (anon public).
 *
 * SECURITY NOTICE:
 * - Only the PUBLIC anon key should ever be placed here.
 * - NEVER place the service_role key, database password, or Google Client Secret in this file.
 */

const SUPABASE_CONFIG = {
  url: "https://your-project-ref.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_anon_public_key_here"
};

if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

