# Sprint 4 — Cart & Checkout Flow

## Scope
Sprint ini merapikan alur dari keranjang sampai checkout tanpa mengubah schema Supabase, admin, homepage/product flow besar, atau payment provider.

File utama:
- `my-cart.html`
- `css/my-cart.css`
- `js/main.js`
- `controllers/payment.controller.js`

## Audit Flow
1. Produk ditambahkan ke cart melalui Alpine store `cart` dan disimpan di `localStorage`.
2. Halaman `my-cart.html` membaca detail produk dari store `products`, lalu menghitung subtotal dari harga final dan quantity.
3. Checkout melakukan validasi:
   - cart tidak kosong,
   - user harus login,
   - profil dan alamat wajib lengkap,
   - ongkir rekomendasi harus tersedia.
4. Ongkir dihitung dari endpoint existing `/api/shipping/cost` dan ditampilkan terpisah dari subtotal.
5. Total order dihitung sebagai `subtotal + ongkir`.
6. Order dibuat melalui endpoint existing `/api/orders`, lalu Snap Midtrans dibuka menggunakan token dari backend.
7. Jika Supabase service key tersedia, backend menyimpan order ke tabel `orders` menggunakan schema existing. Jika tidak tersedia, flow fallback in-memory existing tetap dipertahankan untuk development.
8. Callback Snap mengirim status pembayaran ke endpoint confirm existing dan mengosongkan cart setelah pembayaran success/pending atau saat user diarahkan ke detail order.

## Perubahan Sprint 4
- Cart mendukung tambah item, kurangi item, hapus item, dan clear cart dari UI.
- Empty state ditambahkan agar cart kosong tetap punya CTA kembali belanja.
- Summary menampilkan subtotal, ongkir, dan total secara eksplisit untuk mencegah double-count.
- Confirmation modal menampilkan subtotal dan ongkir sebelum total.
- Checkout payload menyertakan `id`, `name`, `price`, dan `quantity` agar endpoint existing dapat membuat Snap item details dengan benar.
- Backend create order mengembalikan Midtrans `clientKey` tanpa hardcode API key.
- Backend create order mencoba menyimpan order ke Supabase `orders` sesuai schema existing ketika konfigurasi service role tersedia.

## Checklist Manual
- Jalankan `npm run dev`.
- Tambah produk ke cart dari product detail/home product card.
- Ubah quantity dengan tombol `+` dan `-`.
- Hapus item dengan ikon trash.
- Kosongkan cart dengan tombol `Kosongkan Keranjang`.
- Coba checkout tanpa login: modal login harus tampil.
- Coba checkout dengan profile/alamat belum lengkap: modal lengkapi profile harus tampil.
- Coba checkout normal: summary harus menunjukkan subtotal + ongkir = total.
- Lanjutkan Snap Midtrans: order detail diarahkan sesuai order yang dibuat.
- Cek Supabase `orders` jika backend memiliki `SUPABASE_SERVICE_ROLE_KEY`.

## Catatan Teknis
- Tidak ada schema Supabase yang diubah.
- Tidak ada perubahan admin.
- Tidak ada library baru.
- Tidak ada API key yang di-hardcode; Midtrans client key tetap berasal dari environment backend.
