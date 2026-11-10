/**
 * IKAAI ACADEMY / LIBRARY — SUPABASE CLIENT
 * Single Supabase client instance using anon public key only.
 */

(function () {
  'use strict';

  let clientInstance = null;

  function initClient() {
    if (clientInstance) return clientInstance;
    if (window.supabaseClient) {
      clientInstance = window.supabaseClient;
      return clientInstance;
    }

    const config = window.SUPABASE_CONFIG;
    if (!config || !config.url || !config.anonKey) {
      console.warn('[SupabaseClient] SUPABASE_CONFIG missing or incomplete.');
      return null;
    }

    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        clientInstance = window.supabase.createClient(config.url, config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        window.supabaseClient = clientInstance;
      } catch (err) {
        console.error('[SupabaseClient] Failed to initialize client:', err);
      }
    } else {
      console.warn('[SupabaseClient] Supabase SDK (window.supabase) not found.');
    }

    return clientInstance;
  }

  const SupabaseClient = {
    getClient: () => {
      if (!clientInstance) initClient();
      return clientInstance;
    },
    isReady: () => {
      const c = SupabaseClient.getClient();
      return Boolean(c && window.SUPABASE_CONFIG && !window.SUPABASE_CONFIG.url.includes('YOUR_'));
    },
    getSession: async () => {
      const client = SupabaseClient.getClient();
      if (!client) return null;
      try {
        const { data, error } = await client.auth.getSession();
        if (error) throw error;
        return data.session;
      } catch (e) {
        console.warn('[SupabaseClient] Error fetching session:', e);
        return null;
      }
    },
    getUser: async () => {
      const client = SupabaseClient.getClient();
      if (!client) return null;
      try {
        const { data, error } = await client.auth.getUser();
        if (error) throw error;
        return data.user;
      } catch (e) {
        return null;
      }
    },
    getProfile: async () => {
      if (window.DataLayer && typeof window.DataLayer.getMyProfile === 'function') {
        return await window.DataLayer.getMyProfile();
      }
      const client = SupabaseClient.getClient();
      const user = await SupabaseClient.getUser();
      if (!client || !user) return null;
      try {
        const { data, error } = await client
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        if (error) throw error;
        return data;
      } catch (e) {
        return null;
      }
    }
  };

  window.SupabaseClient = SupabaseClient;

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClient);
  } else {
    initClient();
  }
})();

