// Centralized public runtime configuration for Carita Hidroponik frontend.
// Only browser-safe values belong here. Do not place service-role keys or secrets.
(() => {
  const rawSupabaseUrl = 'https://thetdckuftpzyubvlbju.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZXRkY2t1ZnRwenl1YnZsYmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Nzk2NzgsImV4cCI6MjA3ODM1NTY3OH0.79TyhVbyQzKa9xFeg9JxVLxcN0NVyYBx-_VniQFfQZg';
  const apiBaseUrl = 'https://carita-hidroponik-backend.vercel.app';

  const config = {
    supabase: {
      url: rawSupabaseUrl.replace(/\/+$/, ''),
      anonKey: supabaseAnonKey
    },
    api: {
      baseUrl: apiBaseUrl.replace(/\/+$/, ''),
      snapTokenEndpoint: '/api/payment/create-snap-token',
      regionBaseUrl: 'https://www.emsifa.com/api-wilayah-indonesia/api'
    },
    assets: {
      fallbackImage: 'img/coming-soon.jpg'
    },
    debug: new URLSearchParams(window.location.search).has('debug')
  };

  window.CaritaConfig = Object.freeze(config);
  window.__SUPABASE_CONFIG = Object.freeze({ url: config.supabase.url, anonKey: config.supabase.anonKey });
  window.API_BASE_URL = config.api.baseUrl;
  window.APP_DEBUG = config.debug;
})();
