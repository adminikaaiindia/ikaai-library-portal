/**
 * IKAAI ACADEMY – SUPABASE CONFIGURATION
 * 
 * Configured with live Supabase authentication credentials.
 * Region: South Asia (Mumbai, India) - ap-south-1
 */

const SUPABASE_CONFIG = {
  url: "https://fmblkesibzjrydswwldq.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYmxrZXNpYnpqcnlkc3d3bGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MDg2NzEsImV4cCI6MjEwOTE4NDY3MX0.r990IizmXHZ9tTV_Ttb325MliYHUQLvVZFF6Cz6JUVE"
};

if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

// Create global client instance if Supabase SDK is available
let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    });
  } catch (e) {
    console.error("Failed to initialize Supabase client:", e);
  }
}

if (typeof window !== 'undefined') {
  window.supabaseClient = supabaseClient;
}

function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_CONFIG &&
    SUPABASE_CONFIG.url &&
    !SUPABASE_CONFIG.url.includes("YOUR_") &&
    SUPABASE_CONFIG.anonKey &&
    !SUPABASE_CONFIG.anonKey.includes("YOUR_")
  );
}

if (typeof window !== 'undefined') {
  window.isSupabaseConfigured = isSupabaseConfigured;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_CONFIG, isSupabaseConfigured };
}
