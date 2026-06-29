# Sprint 0 Audit & Cleanup — Carita Hidroponik V2

Tanggal audit: 2026-06-29

## Kondisi awal project

- Project saat ini adalah frontend statis berbasis HTML, CSS, dan JavaScript yang dijalankan lokal dengan `serve .` melalui `npm run dev`.
- Halaman publik utama berada di root repository, misalnya `index.html`, `contact.html`, `news-detail.html`, `product-details.html`, `my-cart.html`, `my-account.html`, dan `my-grow-lab.html`.
- Halaman admin berada di root repository dengan pola `admin*.html`, dibantu partial HTML di `admin-partials/` dan script di `js/admin*.js`.
- Asset UI berada di `css/`, `img/`, `components/`, `locales/`, dan `js/`.
- Konfigurasi Supabase frontend berada di `js/supabase-client.js`. File SQL lama/setup masih berada di root dan folder `migrations/`.
- Masih ada folder dan file bernuansa backend/API dari project lama, seperti `src/`, `routes/`, `controllers/`, `services/`, `middleware/`, `repositories/`, `utils/`, dan `api/`. Karena backend V2 disebut terpisah di repository lain, bagian ini perlu diaudit lanjutan sebelum dipindahkan atau dihapus.
- Terdapat test dan artifact verifikasi visual dari sprint/bugfix sebelumnya, termasuk screenshot PNG, Playwright report, dan script `verify*`/Python helper.

## Masalah utama yang ditemukan

1. **Root repository terlalu ramai**
   - File halaman aktif, dokumen audit, SQL setup, screenshot, verify script, dan backend legacy bercampur di level root.

2. **Artifact test/visual tersimpan bersama source aktif**
   - Screenshot seperti `before_screenshot.png`, `desktop_news_detail.png`, dan `product_details_desktop.png` adalah hasil verifikasi, bukan source aplikasi.
   - `playwright-report/` adalah output test, bukan source utama.

3. **Script verifikasi ad-hoc berada di root**
   - Script seperti `verify.js`, `verify_news_content.js`, `verify_products.py`, dan `check_images.py` tampak sebagai alat verifikasi sekali pakai/ad-hoc.
   - Script ini tidak dihapus agar riwayat investigasi tetap tersedia, tetapi dipindahkan ke archive tools.

4. **Metadata `package.json` masih generik/legacy**
   - Nama package masih `app` dan beberapa metadata masih mengarah ke repository lama.
   - Script `dev` sudah benar memakai `serve .` dan dipertahankan.

5. **Batas frontend/backend belum jelas di repository ini**
   - Karena backend V2 berada di repository lain, file backend legacy perlu diputuskan statusnya pada sprint berikutnya.
   - Sprint 0 tidak mengubah flow checkout, logic Supabase, schema Supabase, atau halaman admin secara besar.

## File/folder yang dipertahankan

### Source frontend aktif

- Root HTML publik: `index.html`, `contact.html`, `login-page.html`, `news-detail.html`, `product-details.html`, `my-cart.html`, `my-account.html`, `my-grow-lab.html`, dan `order-detail.html`.
- Root HTML admin: `admin.html`, `admin-dashboard.html`, `admin-products.html`, `admin-orders.html`, `admin-shipping.html`, `admin-editor.html`, `admin-news-editor.html`, dan `admin-grow-lab.html`.
- Partial admin: `admin-partials/`.
- Komponen HTML: `components/`.
- Stylesheet: `css/`.
- Script frontend/admin: `js/`.
- Asset gambar dan flag: `img/`.
- File lokalisasi: `locales/`.

### Konfigurasi dan dependensi

- `package.json` dan `package-lock.json` dipertahankan serta dirapikan metadata-nya.
- `.env.example`, `.gitignore`, dan `vercel.json` dipertahankan.

### File data/database yang belum disentuh

- `supabase_setup.sql`, `supabase_seed.sql`, `migrations/20260513_grow_lab.sql`, dan `migrations_shipping_management.sql` dipertahankan tanpa perubahan schema.

### Area backend/legacy yang belum dipindahkan

- `src/`, `routes/`, `controllers/`, `services/`, `middleware/`, `repositories/`, `utils/`, dan `api/` dipertahankan untuk audit lanjutan karena masih ada test Node yang mereferensikan beberapa modul tersebut.

### Test source

- `tests/` dipertahankan karena berisi test yang masih bisa dijalankan dengan `npm test`.

## File/folder yang diarsipkan

Artifact berikut dipindahkan, bukan dihapus, agar tetap bisa dilacak jika masih dibutuhkan:

### Screenshot/report hasil verifikasi

Dipindahkan ke `docs/archive/screenshots/`:

- `before_screenshot.png`
- `after_screenshot.png`
- `desktop_news_detail.png`
- `desktop_news_detail_fixed.png`
- `mobile_news_detail.png`
- `mobile_news_detail_fixed.png`
- `news-detail-screenshot.png`
- `product_details_desktop.png`

Dipindahkan ke `docs/archive/playwright-report/`:

- `playwright-report/`

### Script verifikasi ad-hoc

Dipindahkan ke `tools/archive/`:

- `check_images.py`
- `verify.js`
- `verify_dashboard_final.py`
- `verify_final_arrows.py`
- `verify_news_content.js`
- `verify_news_layout.py`
- `verify_product_details.js`
- `verify_products.py`

## Perubahan package.json

- Mengubah `name` menjadi `carita-hidroponik-v2`.
- Mengubah `version` menjadi `0.1.0` sebagai baseline V2 awal.
- Menambahkan `private: true` untuk mencegah publish tidak sengaja.
- Mengisi deskripsi project.
- Menghapus metadata legacy/generik yang mengarah ke repository lama.
- Mempertahankan script penting:
  - `npm run dev` tetap menjalankan `serve .`.
  - `npm start` tetap menjalankan `serve .`.
  - `npm test` tetap menjalankan `node --test`.

## Rekomendasi struktur folder V2

Struktur target yang disarankan untuk sprint berikutnya:

```text
.
├── public/ atau pages/
│   ├── index.html
│   ├── contact.html
│   ├── product-details.html
│   ├── news-detail.html
│   └── account/
├── admin/
│   ├── index.html
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   ├── shipping.html
│   └── partials/
├── assets/
│   ├── css/
│   ├── img/
│   ├── js/
│   └── locales/
├── docs/
│   ├── archive/
│   └── SPRINT_0_AUDIT.md
├── tools/
│   └── archive/
├── tests/
└── package.json
```

Catatan implementasi:

- Jangan langsung memindahkan HTML/CSS/JS aktif sebelum semua path relatif untuk CSS, JS, gambar, partial fetch, dan link navigasi dipetakan.
- Jika tetap menggunakan static hosting sederhana, struktur dapat dibuat bertahap agar `serve .` tidak rusak.
- Pisahkan keputusan `backend legacy` dari refactor frontend. Jika backend benar-benar sudah berada di repository lain, buat sprint khusus untuk menghapus/memindahkan `src/`, `routes/`, `controllers/`, `services/`, `middleware/`, `repositories/`, dan `utils/` setelah test/flow terkait dipastikan tidak dipakai frontend.

## Urutan kerja sprint berikutnya

1. **Sprint 1 — Dependency & boundary audit**
   - Petakan semua referensi `<script>`, `<link>`, image path, fetch partial, dan Supabase call dari setiap halaman.
   - Tentukan secara eksplisit file backend legacy mana yang masih dibutuhkan oleh test atau deployment lama.

2. **Sprint 2 — Frontend structure migration kecil**
   - Mulai pindahkan asset non-HTML ke struktur `assets/` jika disetujui.
   - Update path secara bertahap dan verifikasi setiap halaman dengan `serve .`.

3. **Sprint 3 — Admin stabilization**
   - Rapikan partial admin dan script admin tanpa redesign besar.
   - Tambahkan smoke checklist admin dashboard, products, orders, shipping, dan news editor.

4. **Sprint 4 — Checkout and Supabase safety pass**
   - Audit flow checkout dan Supabase read/write tanpa mengubah schema.
   - Dokumentasikan tabel/kolom yang diasumsikan frontend.

5. **Sprint 5 — Test cleanup**
   - Pisahkan test aktif, test legacy backend, dan test visual.
   - Jika Playwright akan dipakai rutin, tambahkan konfigurasi output agar report/screenshot otomatis masuk ignored/artifact folder.

## Checklist Sprint 0

- [x] Audit struktur folder dan file.
- [x] Identifikasi file aktif dan artifact/obsolete kandidat.
- [x] Rapikan `package.json` tanpa mengubah cara menjalankan project.
- [x] Pastikan `npm run dev` dapat start dengan `serve .`.
- [x] Pindahkan screenshot/report/script verifikasi ke archive, bukan delete.
- [x] Tidak mengubah logic Supabase.
- [x] Tidak mengubah flow checkout.
- [x] Tidak mengubah schema Supabase.
- [x] Tidak redesign halaman admin.
