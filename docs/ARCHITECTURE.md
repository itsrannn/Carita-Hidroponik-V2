# Frontend Architecture

Carita Hidroponik V2 uses a static HTML frontend with Alpine.js stores and page-level scripts. Sprint 8 keeps the current UI and flows intact while introducing a small, safer layering model for shared code.

## Layer Structure

```text
js/
├── config/
│   └── app-config.js
├── services/
│   ├── api/
│   │   └── api-service.js
│   └── supabase/
│       └── content-service.js
├── utils/
│   └── app-utils.js
├── main.js
└── page-level scripts
```

## Responsibilities

### `config`

`js/config/app-config.js` is the single browser-side source for public runtime configuration:

- Supabase project URL.
- Supabase anon key.
- Backend API base URL.
- Public region API base URL.
- Fallback image path.
- Debug flag derived from the URL query string.

Only public, browser-safe values may live here. Do not add service-role keys, private API keys, `.env` values, or secrets.

### `utils`

`js/utils/app-utils.js` centralizes helpers that were previously duplicated or embedded in larger files:

- `formatRupiah` for IDR currency formatting.
- `showToast` / `showSiteNotification` for reusable toast messaging.
- `setLoadingState` for small loading-state toggles.
- `handleError` for consistent error logging and fallback messages.
- `applyImageFallback` for shared image fallback behavior.

The file also preserves legacy globals such as `window.formatRupiah` and `window.showSiteNotification` so existing templates continue to work.

### `services/supabase`

`js/services/supabase/content-service.js` groups common Supabase fetches:

- Products.
- News.
- Orders.
- Profiles.
- Shipping zones.

Page scripts should prefer `window.CaritaServices.supabase` for read operations and simple profile updates. Existing direct mutations remain in admin flows where the current behavior is specific and should be refactored gradually.

### `services/api`

`js/services/api/api-service.js` centralizes browser calls to external/backend APIs:

- Generic `request` helper with JSON parsing and normalized errors.
- `updateProfile` backend endpoint call.
- Region API lookup for provinces/regencies/districts/villages.

### Page scripts and stores

`js/main.js` remains the bootstrap for Alpine stores, layout loading, cart, products, i18n, and global compatibility helpers. Page-specific scripts such as `js/my-account.js`, `js/admin-dashboard.js`, and `js/admin.js` now consume services where safe without changing UX or database schema.

## Script Loading Order

Pages that use Supabase load scripts in this order:

1. Third-party Supabase CDN.
2. `js/config/app-config.js`.
3. `js/utils/app-utils.js`.
4. `js/supabase-client.js`.
5. `js/services/supabase/content-service.js`.
6. `js/services/api/api-service.js`.
7. `js/main.js`.
8. Page-specific scripts.

This order keeps existing globals available while allowing services to depend on the initialized Supabase client.

## Refactor Principles

- Preserve existing data sources and table names.
- Avoid schema changes.
- Avoid UI redesign.
- Keep checkout/admin flows stable.
- Refactor incrementally instead of splitting every component into tiny files.
- Keep legacy globals during transition to avoid breaking inline Alpine templates.
