# Sprint 5 — Admin Panel V2

## Tujuan
Sprint ini merapikan admin panel Carita Hidroponik V2 tanpa mengubah schema Supabase dan tanpa mengubah checkout/product flow publik. Fokus perubahan berada pada konsistensi visual, state UI, dan menjaga integrasi CRUD admin tetap memakai flow data yang sudah ada.

## Ringkasan Audit
- `admin.html` menjadi pusat admin panel dengan sidebar, topbar, routing hash, dan partial content untuk dashboard, produk/berita, pesanan, serta pengiriman.
- `admin-editor.html` menjadi editor terpadu untuk produk dan berita melalui parameter `type`, `action`, dan `id`.
- Data produk dan berita pada daftar admin tetap dibaca dari tabel Supabase existing (`products`, `news`) melalui Supabase client.
- Editor produk/berita tetap menyimpan melalui endpoint admin existing (`/api/admin/products`, `/api/admin/news`) agar validasi/admin auth berjalan sesuai flow saat ini.
- Order management tetap membaca tabel `orders` dan profil terkait dari Supabase, serta hanya mengubah `status` saat admin memakai kontrol status existing.
- Shipping management tetap membaca/menulis tabel `shipping_zones` dan mempertahankan fallback field lama (`zone_name`, `base_rate`, `province_match`, `district_match`) untuk kompatibilitas.

## Perubahan Sprint 5

### Visual dan Layout Admin
- Halaman admin pusat sudah menggunakan `css/admin.css` untuk design system V2: warna hijau Carita, card radius konsisten, table, badge, button, empty/loading/error state, dan responsive sidebar/topbar.
- Partial dashboard, produk/berita, pesanan, dan pengiriman diselaraskan agar memakai class admin yang sama (`admin-page-header`, `admin-card`, `admin-table`, `admin-button`, `admin-state`).

### Produk dan Berita
- Daftar produk/berita kini menangani variasi nama field gambar Supabase/backend (`image_url`, `imageUrl`, `cover_image_url`, `coverImageUrl`) sehingga preview/list tetap tampil setelah data disimpan dari editor terpadu.
- Label diskon di daftar produk dirapikan agar membaca format lama (`discount_price`) dan format payload editor (`discountType`/`discountValue` atau snake_case) tanpa menambah kolom Supabase.
- Empty state, loading state, error state, filter, pagination, dan feedback delete/bulk action tetap tersedia di daftar konten.

### Editor Produk/Berita
- Form editor terpadu memiliki label wajib, validasi field utama, validasi JSON karakteristik produk, validasi slug berita, preview gambar, upload/manual URL, tombol simpan/batal/hapus yang konsisten, toast success/error/warning, dan skeleton loading.
- Tidak ada hardcoded API key. Upload dan save tetap memakai session admin yang sudah ada.

### Pesanan
- Order management membaca data dari Supabase `orders`, menampilkan statistik status, filter/search/sort, empty state, dan feedback saat update status gagal/berhasil.
- Update status tetap terbatas pada kolom `status` sesuai fitur existing.

### Pengiriman
- Shipping management membaca `shipping_zones`, menampilkan loading state sebelum query selesai, empty state saat zona kosong, error state saat query gagal, dan success/error notice saat menyimpan harga.
- Seed default tetap memakai data default existing dan tidak mengubah schema.

## File Terdampak
- `admin.html` — shell admin pusat, sidebar/topbar, routing partial.
- `admin-editor.html` — editor terpadu produk/berita.
- `admin-partials/admin-dashboard-content.html` — dashboard analytics admin.
- `admin-partials/admin-products-content.html` — daftar produk/berita dan binding field gambar/diskon.
- `admin-partials/admin-orders-content.html` — order management partial.
- `admin-partials/admin-shipping-content.html` — shipping management partial.
- `js/admin.js` — shared admin helper, order management, content manager produk/berita.
- `js/admin-dashboard.js` — analytics dashboard.
- `js/admin-product-editor.js` — editor terpadu produk/berita.
- `js/admin-shipping.js` — shipping management state dan persistence.
- `css/admin.css` — design system admin V2.
- `docs/SPRINT_5_ADMIN_PANEL.md` — dokumentasi sprint ini.

## Cara Testing Manual
1. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
2. Login sebagai admin.
3. Buka `admin.html#dasbor` dan pastikan KPI, grafik, insight, dan transaksi terbaru tampil atau menampilkan error state yang jelas jika Supabase/RLS menolak akses.
4. Buka `admin.html#produk`:
   - cari/filter produk;
   - tambah produk dari tombol `Tambah Produk`;
   - edit produk existing;
   - hapus produk test;
   - pastikan gambar tampil baik dari `image_url` maupun `imageUrl`.
5. Buka `admin.html#berita`:
   - tambah berita;
   - edit berita existing;
   - hapus berita test;
   - pastikan slug, status, preview gambar, dan validasi wajib isi berjalan.
6. Buka `admin.html#pesanan`:
   - cek list order;
   - filter/search order;
   - ubah status order jika akun admin memiliki izin update.
7. Buka `admin.html#pengiriman`:
   - cek daftar zona;
   - ubah harga/currency salah satu zona test;
   - simpan dan pastikan notice sukses muncul;
   - gunakan seed default hanya jika tabel kosong dan sesuai kebutuhan environment.

## Catatan Batasan
- Tidak ada perubahan schema Supabase.
- Tidak ada file `.env` yang diubah atau ditambahkan.
- Tidak ada library baru.
- Tidak ada perubahan pada checkout/product flow publik selain kompatibilitas tampilan field gambar/diskon di admin.
