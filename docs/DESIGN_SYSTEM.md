# Carita Hidroponik V2 Design System

Dokumen ini mendefinisikan fondasi UI dasar untuk Sprint 1. Tujuannya adalah menyediakan token dan utility class yang konsisten tanpa mengubah alur bisnis, Supabase, checkout, login, maupun admin.

## Prinsip Penggunaan

- Gunakan `css/design-system.css` sebagai sumber token UI baru.
- Pertahankan CSS halaman lama; design system ditambahkan secara bertahap agar tampilan lama tidak rusak.
- Untuk komponen baru, gunakan utility class dari design system sebelum membuat class khusus baru.
- Jangan mengubah schema database atau logic JavaScript untuk kebutuhan styling.

## Warna

Token warna tersedia sebagai CSS variables:

| Token | Nilai | Penggunaan |
| --- | --- | --- |
| `--color-primary` | `#1b5e20` | Brand utama, tombol utama, heading penting |
| `--color-primary-hover` | `#2e7d32` | Hover/active primary dan aksen hijau |
| `--color-secondary` | `#f0fdf4` | Background tombol/elemen sekunder |
| `--color-accent` | `#f59e0b` | Aksen promosi atau highlight terbatas |
| `--color-background` | `#ffffff` | Background halaman/kartu utama |
| `--color-surface` | `#f6f8f5` | Area permukaan lembut seperti sidebar/search |
| `--color-text` | `#111827` | Teks utama |
| `--color-muted` | `#6b7280` | Teks pendukung |
| `--color-border` | `#e5e7eb` | Border netral |
| `--color-danger` | `#dc2626` | Status error/danger |
| `--color-warning` | `#f59e0b` | Status warning |
| `--color-success` | `#16a34a` | Status sukses |

Alias lama (`--green`, `--accent`, `--muted`, `--bg`, `--surface`, `--shadow`, `--radius`) tetap tersedia agar CSS existing tetap kompatibel.

## Typography

Font utama:

- Heading: `--font-heading` (`Montserrat`, fallback `sans-serif`)
- Body: `--font-body` (`Open Sans`, fallback `sans-serif`)

Skala ukuran:

- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1rem`
- `--text-lg`: `1.125rem`
- `--text-xl`: `1.25rem`
- `--text-2xl`: `1.5rem`
- `--text-3xl`: `2rem`
- `--text-4xl`: `2.5rem`

## Spacing, Radius, dan Shadow

Spacing menggunakan skala `--space-*` dari `--space-0` sampai `--space-16`. Gunakan token ini untuk padding, margin, dan gap agar ritme layout konsisten.

Radius:

- `--radius-sm`: elemen kecil
- `--radius-md`: input dan komponen umum
- `--radius-lg`: kartu
- `--radius-xl`: panel besar
- `--radius-pill`: tombol/badge berbentuk kapsul

Shadow:

- `--shadow-sm`: elevasi ringan
- `--shadow-md`: kartu dan tombol hover
- `--shadow-lg`: panel/overlay yang lebih menonjol

## Button

Utility button dasar:

```html
<a class="btn btn-primary" href="#Product">Belanja</a>
<button class="btn btn-secondary">Sekunder</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
```

Aturan:

- Gunakan `.btn-primary` untuk aksi utama.
- Gunakan `.btn-secondary` untuk aksi alternatif yang tetap penting.
- Gunakan `.btn-outline` untuk aksi netral dengan border.
- Gunakan `.btn-ghost` untuk aksi ringan di area yang sudah padat.
- Gunakan `.btn-lg` untuk CTA utama seperti hero.

## Card

Gunakan `.card` untuk surface standar dengan background putih, border netral, radius, dan shadow.

```html
<article class="card">
  ...
</article>
```

Produk dan berita existing boleh tetap memakai class lama (`.product-card`, `.news-card`) sampai migrasi bertahap berikutnya.

## Badge

Gunakan `.badge` untuk label pendek seperti status, promo, atau kategori.

```html
<span class="badge">Promo</span>
```

Untuk badge status khusus, gunakan token warna status (`--color-danger`, `--color-warning`, `--color-success`) pada class tambahan.

## Form

Utility form dasar:

```html
<input class="input" type="text" />
<select class="select"></select>
<textarea class="textarea"></textarea>
```

Aturan:

- Semua field harus memiliki focus state yang jelas.
- Jangan menghapus attribute atau binding JavaScript ketika menambahkan class styling.
- Validasi dan submit tetap dikelola logic existing.

## Layout

Utility layout dasar:

- `.container`: membatasi lebar konten ke `1200px` dan memberi gutter horizontal.
- `.section-spacing`: memberi padding vertikal standar untuk section.
- `.product-grid-responsive`: grid responsive dengan kolom otomatis minimal `180px`.

Contoh:

```html
<section class="container section-spacing">
  <div class="product-grid-responsive">
    ...
  </div>
</section>
```

## Penerapan Sprint 1

Pada Sprint 1, design system diterapkan aman di `index.html` dengan:

- Menambahkan stylesheet `css/design-system.css` sebelum stylesheet existing.
- Menambahkan class `.input` pada search field tanpa mengubah binding Alpine.
- Menambahkan `.product-grid-responsive` pada grid produk/promo/loading tanpa menghapus `.products-grid` lama.

