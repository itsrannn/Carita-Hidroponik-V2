# Sprint 8 Architecture Refactor

## Goal

Improve frontend modularity and scalability without adding features, redesigning UI, changing Supabase schema, or changing major checkout/admin flows.

## Audit Summary

### JavaScript duplication found

- Configuration values for Supabase/API were embedded in runtime scripts.
- Rupiah formatting existed globally and as local page fallbacks.
- Toast/notification behavior was defined globally but used across pages.
- Image fallback logic was embedded in the main bootstrap.
- Product/news/order/profile/shipping reads were scattered across Alpine stores and admin/account scripts.

### CSS duplication

No broad CSS rewrite was done in Sprint 8 to keep the change safe. Existing CSS files remain scoped by page/feature. Future cleanup can consolidate repeated button, card, loading, and admin table states after visual regression coverage is stronger.

### Supabase fetch duplication

Repeated `window.supabase.from(...).select(...)` patterns existed for:

- Products.
- News.
- Orders.
- Profiles.
- Shipping zones.

These are now available through `window.CaritaServices.supabase` for safer reuse.

## Changes Made

### New layers

- `js/config/app-config.js`
  - Central public runtime config.
  - Exposes `window.CaritaConfig`, `window.__SUPABASE_CONFIG`, `window.API_BASE_URL`, and `window.APP_DEBUG`.

- `js/utils/app-utils.js`
  - Shared format, toast, loading, error, and image fallback helpers.
  - Maintains backward-compatible globals.

- `js/services/supabase/content-service.js`
  - Shared fetch functions for products, news, orders, profile, and shipping zones.

- `js/services/api/api-service.js`
  - Shared fetch wrapper for backend API calls and region API calls.

### Updated consumers

- `js/supabase-client.js` now reads Supabase URL/key from centralized config.
- `js/main.js` now reads API/debug config from centralized config and uses the product service for product loading.
- `js/my-account.js` now uses services for profile reads/updates, backend profile update calls, and region API fetches.
- `js/admin-dashboard.js` now uses services for dashboard orders/products/news/shipping reads.
- `js/admin.js` now uses services for products/news content lists while leaving admin mutations intact.

## Compatibility Notes

Existing templates still use globals such as:

- `window.formatRupiah`.
- `window.showSiteNotification`.
- `window.fixImagePath`.
- `window.API_BASE_URL`.
- `window.__SUPABASE_CONFIG`.

Those globals are intentionally preserved to reduce risk.

## What Was Not Changed

- No Supabase schema changes.
- No new libraries.
- No checkout flow redesign.
- No admin CRUD flow redesign.
- No `.env` or secret files added.
- No broad CSS rewrite.

## Recommended Follow-up

1. Move more admin mutations into dedicated service functions after admin CRUD regression checks are available.
2. Consolidate duplicated product card rendering in a shared component helper.
3. Add Playwright smoke checks for homepage, product detail, cart, checkout, account, news, and admin pages.
4. Gradually reduce inline script usage in HTML once script loading order is fully standardized.
