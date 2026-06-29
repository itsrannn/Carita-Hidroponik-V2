# Sprint 3 Product Flow

## Audit ringkas

- **Homepage / katalog (`index.html`)**: section produk sudah mengambil data dari Alpine store `$store.products`, yang memuat produk dari tabel Supabase `products`. Sprint 3 merapikan toolbar pencarian, kategori, sort, grid produk, dan state kosong/error tanpa mengubah homepage di luar link/flow produk.
- **Product detail (`product-details.html`, `js/product-details.js`)**: detail produk menggunakan query param `id` dan membaca produk dari store Supabase. Fallback mock dihapus agar halaman tidak menampilkan produk hardcode ketika data Supabase tidak tersedia.
- **Product card (`js/main.js`, `js/product-details.js`, `css/style.css`)**: card distandardisasi dengan gambar 1:1, kategori, nama, harga normal/diskon, tombol detail, dan tombol add to cart pada katalog.
- **Search/filter/sort (`index.html`, `js/main.js`)**: pencarian memakai debounce, filter kategori tetap lewat sidebar, dan sort diganti dari toggle harga menjadi dropdown yang lebih eksplisit.
- **Responsive (`css/style.css`, `css/mobile.css`)**: katalog mengikuti target 3 kolom desktop, 2 kolom tablet, dan 1 kolom mobile.

## Perubahan UX produk

1. **Product card konsisten**
   - Gambar produk selalu 1:1 dengan `object-fit: cover`.
   - Kategori tampil sebagai label kecil di atas nama.
   - Diskon tampil sebagai badge persentase pada area gambar.
   - Harga diskon menampilkan harga asli tercoret dan harga final tebal.
   - CTA dipisah jelas: `Detail` dan `Add`.

2. **Search/filter/sort**
   - Search tetap submit-able tetapi juga responsif lewat debounce pada input.
   - Sort sekarang berupa select: default, nama A-Z, harga rendah-tinggi, harga tinggi-rendah.
   - Empty state menyediakan tombol reset filter.

3. **State data**
   - Loading memakai skeleton card.
   - Empty state tampil saat filter/search tidak menemukan produk.
   - Error state memakai pesan dari store produk jika fetch Supabase gagal.

4. **Supabase**
   - Schema tidak diubah.
   - Katalog tetap mengambil data dari tabel `products`.
   - Product detail tetap berdasarkan `id` dari URL dan tidak memakai mock product.

## Batasan yang dijaga

- Tidak mengubah checkout/cart existing selain tetap memanggil `$store.cart.add()` dari tombol katalog.
- Tidak mengubah admin.
- Tidak mengubah auth/login flow.
- Tidak mengubah schema Supabase.
- Tidak menambahkan library baru.
