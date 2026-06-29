# Production Audit — Carita Hidroponik V2

Tanggal audit: 2026-06-29

## Ringkasan Eksekutif

Audit dilakukan untuk kesiapan production setelah Sprint 0–8 dengan fokus pada kebersihan kode, UX, visual consistency, performance, security, SEO, accessibility, error handling, dan dokumentasi. Tidak ada fitur baru yang ditambahkan; perubahan hanya berupa hardening, sanitasi output, penghapusan dead code kecil, dan dokumentasi readiness.

## Masalah Ditemukan

| Area | Severity | Temuan | Solusi | File berubah |
| --- | --- | --- | --- | --- |
| Security / XSS | Critical | Product card dan spesifikasi produk dirender lewat `x-html` dan memasukkan nama, kategori, URL gambar, atau spesifikasi dari data produk tanpa escaping eksplisit. Jika data CMS/Supabase terkontaminasi, HTML injection dapat terjadi. | Tambahkan utilitas `escapeHtml` global dan gunakan pada product card homepage, rekomendasi product detail, serta list spesifikasi produk. | `js/utils/app-utils.js`, `js/main.js`, `js/product-details.js` |
| Security / HTML injection | Critical | News detail memakai `x-html` untuk konten berita. Ini dibutuhkan untuk rich content, tetapi perlu sanitasi sebelum render. | Tambahkan utilitas `sanitizeHtml` sederhana yang menghapus tag berisiko, event handler inline, dan `javascript:` URL sebelum konten dirender. | `js/utils/app-utils.js`, `js/news-detail.js` |
| Security headers | Major | API Express belum menambahkan header dasar untuk mengurangi MIME sniffing, clickjacking, referrer leakage, dan akses permission browser yang tidak diperlukan. | Tambahkan middleware security headers tanpa library baru. | `src/app.js` |
| Dead code | Minor | Getter `newsTitle` memiliki return duplikat yang tidak pernah dieksekusi. | Hapus return duplikat. | `js/news-detail.js` |
| Console logging | Minor | Masih ada `console.log` startup server. Ini acceptable untuk runtime log server, tetapi harus tetap dipantau agar tidak membocorkan data sensitif. | Tidak dihapus karena log startup tidak memuat credential/customer data. | Tidak berubah |
| Duplicate fetch | Major | Ada beberapa pola fetch langsung ke Supabase REST di backend controller/routes dan fetch langsung di sebagian frontend. | Sudah ada `fetchWithDebug` dan service layer, tetapi konsolidasi backend REST helper masih perlu dilakukan bertahap agar retry/error format seragam. | Tidak berubah |
| Duplicate CSS / JS | Major | Beberapa halaman masih memiliki inline style dan komponen card HTML yang mirip. | Disarankan refactor bertahap ke design-system/card renderer bersama; tidak dilakukan agar tidak menambah risiko regresi production. | Tidak berubah |
| SEO | Major | Banyak halaman sudah punya title/description/canonical/OG/favicon; Twitter Card dan structured data belum konsisten di semua halaman. | Tambahkan pada backlog production hardening berikutnya. | Tidak berubah |
| Accessibility | Major | Banyak elemen sudah memiliki label/ARIA dasar, tetapi perlu verifikasi keyboard/focus manual end-to-end di halaman admin, checkout, dan modal/toast. | Checklist manual ditambahkan di readiness. | Tidak berubah |
| Error handling | Major | Banyak request memiliki loading/error fallback, namun tidak semua direct fetch/Supabase call memiliki retry eksplisit. | Gunakan `fetchWithDebug`/service wrapper untuk frontend fetch; backend perlu helper REST Supabase terpusat. | Tidak berubah |

## UX Review per Halaman

- **Homepage**: Alur hero → filter/search → produk jelas. Loading skeleton tersedia. Risiko utama adalah product card yang memakai HTML string; sudah di-hardening dengan escaping.
- **Product**: Filter kategori, sort, empty state, dan pagination membantu orientasi user. Perlu QA manual untuk keyboard focus pada sidebar collapse dan pagination.
- **Product Detail**: Informasi produk, quantity, related products, dan fallback gambar tersedia. Related card sudah di-escape.
- **Cart**: Perlu QA manual memastikan empty cart, ongkir gagal, dan retry payment selalu jelas untuk customer.
- **Checkout / Order Detail**: Pastikan status pembayaran, instruksi retry, dan error Midtrans selalu memakai bahasa user-friendly.
- **Profile**: Perlu verifikasi field wajib, fallback profile OAuth, dan error permission Supabase.
- **News**: Loading/not found tersedia. Konten rich HTML sekarang disanitasi sebelum `x-html`.
- **Contact**: Pastikan semua link eksternal jelas dan keyboard accessible.
- **Admin**: Admin shell punya loading/error partial. Perlu smoke test role/unauthorized dan semua CRUD sebelum go-live.

## Visual Consistency

Checklist yang diaudit:

- Spacing, radius, shadow, typography, button, icon, card, color, animation, loading, toast, modal.
- Design system sudah ada dan banyak halaman menggunakannya.
- Risiko tersisa: inline style halaman tertentu dan variasi card renderer dapat membuat drift visual. Jangan refactor besar menjelang release kecuali ada bug nyata.

## Performance

Checklist:

- Hero image utama sudah preload/fetchpriority; gambar non-priority menggunakan lazy loading pada product card/slider.
- Font sudah preconnect/preload stylesheet.
- Script defer perlu dipertahankan di semua halaman.
- Store products sudah punya cache `loadPromise`/`hasLoaded` untuk mengurangi request berulang.
- Risiko tersisa: sebagian halaman melakukan beberapa Supabase request paralel/terpisah; gabungkan hanya jika terbukti lambat dari monitoring.

## Security

Checklist:

- XSS product card: diperbaiki dengan escaping.
- HTML injection news content: diperbaiki dengan sanitasi allow-by-removal sederhana.
- Security headers dasar API: ditambahkan.
- Credential exposure: jangan pernah expose service-role key ke frontend; audit env Vercel/Supabase sebelum go-live.
- Storage: pastikan bucket public hanya untuk aset publik dan upload admin tervalidasi MIME/size.
- Supabase: RLS wajib aktif untuk tabel customer/order/profile/news/product admin-write.

## SEO

Checklist:

- `robots.txt` mengarah ke sitemap.
- Banyak halaman sudah memiliki canonical dan OpenGraph.
- Perlu melengkapi Twitter Card dan structured data Product/Organization/Article secara konsisten.
- Pastikan `sitemap.xml` benar-benar tersedia di deployment production karena `robots.txt` mereferensikannya.

## Accessibility

Checklist:

- Gunakan semantic heading berurutan per halaman.
- Semua interactive control harus bisa difokus dengan keyboard dan punya visible focus state.
- Image product/news wajib punya alt bermakna atau fallback.
- Toast harus tetap memakai `role=status`/`aria-live`.
- Modal/admin drawer perlu verifikasi focus trap manual bila ada.

## Production Readiness Checklist

- [x] Tidak ada `TODO`/`FIXME` aktif pada source utama yang diaudit.
- [x] XSS utama dari product card dan news rich content dimitigasi.
- [x] Security headers dasar API ditambahkan.
- [x] Dead code return duplikat di news detail dibersihkan.
- [x] Test suite Node dijalankan.
- [ ] Smoke test browser end-to-end semua halaman customer.
- [ ] Smoke test admin CRUD dengan akun admin sungguhan.
- [ ] Verifikasi Supabase RLS dan Storage policies di dashboard Supabase.
- [ ] Verifikasi domain production, canonical, sitemap, robots, dan OG image live.
- [ ] Verifikasi Midtrans production credentials dan webhook signature di environment production.
- [ ] Jalankan Lighthouse/accessibility audit di deployment final.

## Critical Issues

1. Product card HTML injection risk — fixed.
2. News rich content HTML injection risk — fixed.

## Major Issues

1. Security headers dasar belum ada — fixed.
2. Fetch/Supabase error handling belum 100% terpusat — documented, recommended for next hardening pass.
3. SEO Twitter Card/structured data belum konsisten — documented.
4. Admin/checkout perlu smoke test manual production — documented.

## Minor Issues

1. Dead code return duplikat di news detail — fixed.
2. Startup `console.log` server masih ada, tetapi tidak membocorkan data sensitif.
3. Inline styles masih ada di beberapa halaman; aman tetapi perlu konsolidasi bertahap.

## Nice To Have

1. Shared product card renderer berbasis DOM/template agar tidak perlu HTML string.
2. Backend Supabase REST helper tunggal untuk mengurangi duplicate fetch.
3. Lighthouse CI untuk performance/accessibility/SEO.
4. Structured data Product, Article, Organization, dan BreadcrumbList.
