# Sprint 6 — News, Profile, dan Polish Akhir

## Scope
Sprint ini fokus pada polish UI/UX dan perbaikan ringan di halaman berita, akun, login, detail pesanan, kontak, serta konsistensi komponen umum. Tidak ada perubahan schema Supabase, checkout besar, admin flow besar, ataupun hardcoded API key.

## Ringkasan Perubahan

### News dan News Detail
- `news-detail.html` tetap menggunakan data dari tabel `news` berdasarkan query string `id`.
- Sidebar mempertahankan widget **Related Products** bila relasi existing tersedia (`news_related_products` atau `related_product_ids`).
- Sidebar mempertahankan widget **Latest News** dari tabel `news`, menghindari artikel yang sedang dibuka.
- Styling detail berita ditingkatkan dengan focus state untuk share button, latest news, dan related product.

### My Account
- Menambahkan ringkasan profil saat tidak dalam mode edit.
- Menambahkan ringkasan alamat dan empty state alamat saat alamat belum lengkap.
- Menambahkan loading state dan empty state riwayat order yang lebih jelas.
- Menambahkan error banner ringan bila profil/halaman akun gagal dimuat.
- Membersihkan log audit/debug verbose dari update profile agar console lebih bersih.

### Login Page
- Menambahkan label aksesibel tersembunyi untuk field login/register.
- Menambahkan autocomplete untuk email, name, dan password form.
- Menambahkan focus-visible state yang konsisten dengan design system V2.

### Contact Page
- Menyamakan markup dengan CSS contact page existing (`contact-page`, `contact-grid`, dan `contact-info`).
- Menambahkan `rel="noopener noreferrer"` pada link WhatsApp eksternal.
- Form tetap sederhana tanpa backend baru.

### Accessibility dan Responsive
- Menambahkan focus state untuk link/button penting di news, account, login, dan contact.
- Mempertahankan alt text gambar news/detail/order yang sudah ada.
- Menambahkan empty/loading/error state yang menggunakan teks terlihat, bukan hanya console.

## Catatan QA Manual
Jalankan aplikasi lokal dan cek skenario berikut:

1. `npm run dev`
2. Homepage news list menampilkan maksimal 3 berita terbaru.
3. `news-detail.html?id=<id>` menampilkan judul, gambar, konten, latest news, dan related products bila relasi ada.
4. Login/register form dapat difokuskan via keyboard dan tidak memunculkan error fatal di console.
5. `my-account.html` menampilkan profil, alamat, riwayat order, empty state, loading state, dan error banner bila request gagal.
6. `order-detail.html?id=<id>` tetap menampilkan informasi pesanan, produk, status, pembayaran, pengiriman, dan ringkasan biaya.
7. `contact.html` responsif dan layout card sesuai design system.
8. Cek responsive mobile untuk homepage, product detail, cart, admin, account, dan news detail.

## Batasan yang Dipertahankan
- Tidak mengubah schema Supabase.
- Tidak menambah library baru.
- Tidak mengubah checkout/admin/product flow besar.
- Tidak menambahkan file `.env` atau API key.
