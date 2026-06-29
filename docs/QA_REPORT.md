# QA Report — Production Readiness Sprint

Tanggal audit: 2026-06-29

## Area yang Diaudit

- Homepage / Product List
- Product Detail
- Cart / Checkout
- Login / My Account
- News / Contact
- Admin Dashboard
- Product CRUD / News CRUD
- Orders / Shipping

## Bug dan Risiko yang Ditemukan

1. **Duplicate request produk**: store produk dapat dipanggil dari beberapa halaman dan komponen Alpine secara bersamaan sehingga berpotensi membuat request Supabase duplikat.
2. **Console noise / potensi data sensitif**: beberapa flow checkout, akun, profile backend, dan payment backend menulis payload atau respons ke console/log tanpa gating debug.
3. **SEO belum konsisten**: beberapa halaman penting belum memiliki description, canonical, dan Open Graph metadata.
4. **Optimasi render awal belum lengkap**: hero image utama belum diberi preload/fetch priority dan slide sekunder belum lazy-loaded.
5. **Aksesibilitas/focus state global belum konsisten**: focus keyboard dan target sentuh minimum belum distandardisasi di stylesheet global.
6. **Contact form UX**: submit form contact masih mengarah ke action placeholder sehingga dapat menyebabkan reload tanpa success state yang jelas.
7. **Robots directive belum tersedia**: crawler belum memiliki file robots.txt di root project.

## Bug yang Diperbaiki

- Menambahkan guard `loadPromise`/`hasLoaded` di product store untuk mengurangi duplicate fetch Supabase saat inisialisasi paralel.
- Menggating log verbose frontend dengan `APP_DEBUG` dan menghapus log payload sensitif dari backend profile/payment flow.
- Menambahkan metadata SEO dasar: title, description, canonical, Open Graph, favicon tetap dipertahankan, serta preconnect/preload font pada halaman utama yang diaudit.
- Menambahkan preload hero image utama dan lazy loading untuk hero/news image non-kritis.
- Menambahkan hardening CSS global untuk mencegah overflow horizontal, memperbaiki focus-visible keyboard, menjaga media responsif, dan minimum touch target.
- Menambahkan success state dan toast notification untuk contact form tanpa mengubah integrasi bisnis atau database.
- Menambahkan `robots.txt` dengan directive crawl dasar dan referensi sitemap.

## File Berubah

- `js/main.js`
- `js/supabase-client.js`
- `js/my-account.js`
- `controllers/profile.controller.js`
- `controllers/payment.controller.js`
- `css/style.css`
- `index.html`
- `product-details.html`
- `my-cart.html`
- `login-page.html`
- `my-account.html`
- `news-detail.html`
- `contact.html`
- `admin.html`
- `admin-dashboard.html`
- `admin-products.html`
- `admin-news-editor.html`
- `admin-orders.html`
- `admin-editor.html`
- `order-detail.html`
- `robots.txt`
- `docs/QA_REPORT.md`

## Security Review

- Tidak ditemukan service role key yang hardcoded di source; penggunaan service role tetap melalui `process.env.SUPABASE_SERVICE_ROLE_KEY` pada backend.
- Public Supabase anon key masih berada di frontend sesuai pola Supabase public client.
- Tidak ada file `.env` berisi secret yang terdeteksi untuk commit; hanya `.env.example` ditemukan.
- Logging payload yang berpotensi sensitif dikurangi atau digating agar tidak muncul di production/default runtime.

## Rekomendasi Sprint Berikutnya

1. Tambahkan Playwright smoke test untuk semua halaman checklist dengan assertion console error, broken image, dan horizontal overflow.
2. Tambahkan sitemap.xml dinamis atau statis agar robots directive mengarah ke file yang benar-benar tersedia.
3. Pecah CSS per halaman secara bertahap untuk mengurangi unused CSS tanpa redesign.
4. Audit kebijakan cache asset statis dan tambahkan fingerprint/versioning untuk production deploy.
5. Evaluasi migrasi public config Supabase ke environment injection build/deploy agar rotasi konfigurasi lebih mudah.
