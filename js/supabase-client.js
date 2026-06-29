// js/supabase-client.js

const config = window.CaritaConfig || {};
const supabaseUrl = (config.supabase?.url || window.__SUPABASE_CONFIG?.url || '').replace(/\/+$/, '');
const supabaseKey = config.supabase?.anonKey || window.__SUPABASE_CONFIG?.anonKey || '';

window.__SUPABASE_CONFIG = {
  url: supabaseUrl,
  anonKey: supabaseKey
};

if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl)) {
  console.error('[Supabase] Invalid URL format. Expected https://<project-ref>.supabase.co');
}

if (!supabaseKey || supabaseKey.length < 100) {
  console.error('[Supabase] Anon key is missing or malformed.');
}

if (!window.supabase || typeof window.supabase.createClient !== 'function') {
  console.error('[Supabase] CDN library not loaded. window.supabase.createClient is unavailable.');
} else {
  const { createClient } = window.supabase;
  const sessionStorageAdapter = {
    getItem: (key) => window.sessionStorage.getItem(key),
    setItem: (key, value) => window.sessionStorage.setItem(key, value),
    removeItem: (key) => window.sessionStorage.removeItem(key)
  };

  window.supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: sessionStorageAdapter,
      autoRefreshToken: false,
      persistSession: true
    },
    global: {
      fetch: (...args) => {
        const request = args[0];
        const url = request instanceof Request ? request.url : String(request);
        if (window.APP_DEBUG) console.info('[SupabaseFetch] Request:', url);
        const debugFetch = typeof window.fetchWithDebug === 'function' ? window.fetchWithDebug : fetch;
        return debugFetch(...args)
          .then((response) => {
            if (window.APP_DEBUG) console.info('[SupabaseFetch] Response:', {
              url,
              status: response.status,
              ok: response.ok
            });
            return response;
          })
          .catch((error) => {
            console.error('[SupabaseFetch] Failed:', { url, error });
            throw error;
          });
      }
    }
  });

  if (window.APP_DEBUG) console.info('[Supabase] Client initialized successfully.', { url: supabaseUrl });
}
