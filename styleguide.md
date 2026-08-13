# Styleguide — "Signal & Ink"
Panduan desain untuk redesign portofolio Fakhri.

---

## 0. Konsep Arah Desain

**Signal & Ink** menggabungkan dua sisi Fakhri: sisi analitis (data science, SQL, Python, membaca pola dalam data mentah) dan sisi human/hands-on (relawan P3K — membaca "detak" dan kondisi vital orang lain). Elemen signature-nya adalah **garis sinyal (pulse/trace line)**: bentuk seperti gelombang oscilloscope atau EKG yang di hero halus berdenyut, lalu di section berikutnya "mendatar" menjadi garis pembatas antar-section, dan muncul lagi sebagai sapuan tipis saat hover di project card. Satu motif, dipakai konsisten — bukan kumpulan efek acak (blob, float, gradient, typing-caret) seperti versi sebelumnya.

Font-nya ditarik dari keluarga **IBM Plex** — dirancang untuk konteks teknis/engineering, punya varian Sans, Sans Condensed, dan Mono yang selaras satu sama lain. Ini relevan langsung dengan latar belakang Fakhri (data, kode) tanpa jatuh ke default Inter atau ke klise "serif elegan + warna terracotta" yang sering muncul di desain buatan AI.

**Kenapa bukan pola default AI:** menghindari (1) cream background + serif display + aksen terracotta, (2) near-black + satu aksen hijau/vermilion terang, (3) layout broadsheet hairline tanpa radius. Signal & Ink pakai graphite-violet (bukan near-black polos) + aksen amber-phosphor (nuansa layar oscilloscope/terminal lama, bukan hijau neon), dan tipografi grotesk teknis (bukan serif editorial).

---

## 1. Warna

### Dark mode (default)
| Token | Hex | Pemakaian |
|---|---|---|
| `--bg-base` | `#14131F` | Background utama (graphite-violet, bukan hitam pekat) |
| `--bg-surface` | `#1C1B2E` | Card, modal, nav (sedikit lebih terang dari base) |
| `--ink-primary` | `#F2EFE9` | Teks utama (putih hangat, bukan putih murni) |
| `--ink-secondary` | `#A6A2B8` | Teks sekunder/deskripsi |
| `--hairline` | `#2E2C42` | Border tipis, divider |
| `--signal-amber` | `#FFB648` | Aksen utama — CTA, garis sinyal, highlight |
| `--trace-teal` | `#3FBFAD` | Aksen kedua — dipakai terbatas untuk tag/data kedua (skills, tech stack) |

### Light mode
| Token | Hex | Pemakaian |
|---|---|---|
| `--bg-base` | `#F5F3ED` | Kertas hangat (bukan putih bersih) |
| `--bg-surface` | `#FFFFFF` | Card di atas base |
| `--ink-primary` | `#1B1A2E` | Teks utama |
| `--ink-secondary` | `#5C5871` | Teks sekunder |
| `--hairline` | `#DEDAD0` | Border tipis |
| `--signal-amber` | `#C97A1A` | Aksen utama (di-gelapkan dari versi dark agar kontras cukup di atas terang) |
| `--trace-teal` | `#1E8A7B` | Aksen kedua |

**Aturan pakai aksen:** `signal-amber` hanya untuk 1 CTA utama per section + garis sinyal. `trace-teal` hanya untuk badge/tag tech stack & skill. Jangan campur keduanya di elemen yang sama.

---

## 2. Tipografi

| Peran | Font | Weight | Contoh pemakaian |
|---|---|---|---|
| Display (headline besar) | **IBM Plex Sans Condensed** | 600–700, tracking sedikit rapat | Nama di hero, judul section |
| Body | **IBM Plex Sans** | 400–450 | Paragraf, deskripsi |
| Mono / label / data | **IBM Plex Mono** | 400–500 | Eyebrow label, nav, badge tech stack, tanggal timeline, nomor/index |

**Skala tipe (rem, base 16px):**
- Display XL: 3.5rem / mobile 2.25rem — nama di hero
- Display L: 2.25rem — judul section
- Display M: 1.5rem — judul card
- Body: 1rem, line-height 1.65
- Small/mono label: 0.8125rem, letter-spacing 0.06em, uppercase untuk eyebrow saja

Jangan gunakan efek typing/caret blink untuk judul — sudah terasa template. Kalau butuh aksen di title, cukup garis bawah tipis animasi `stroke-dashoffset` (bagian dari motif signature), bukan caret berkedip.

---

## 3. Layout

- Container max-width: `1200px`, padding horizontal 24px (mobile) / 48px (desktop).
- Section header: bukan blob dekoratif. Gunakan pola "axis tick": label mono kecil (mis. `SECT / ABOUT`) + garis hairline horizontal dengan 2–3 tanda centang kecil seperti sumbu grafik — konsisten dengan tema data, tapi halus, bukan mendominasi.
- **Nav:** tanpa penomoran (About/Interests/Projects/Contact bukan konten berurutan secara makna) — cukup label mono, underline-on-hover tipis.
- **Timeline (Experience + Education digabung):** di sini penomoran/urutan *relevan* karena memang kronologis — tampilkan sebagai garis vertikal dengan titik penanda tahun, mono font untuk tahun.

ASCII wireframe hero (desktop):
```
┌───────────────────────────────────────────────────┐
│ [MONO] STATUS: OPEN FOR WORK          [theme] [☰]  │
├───────────────────────────────────────────────────┤
│  ~ pulse line, tipis, memanjang penuh lebar ~       │
│                                                     │
│  Halo, saya                                        │
│  FAKHRI                          [foto, kotak      │
│  Portofolio                       tegas, tanpa      │
│  ringkasan singkat ...            bingkai gradient] │
│  [Get in Touch] [Lihat Proyek] [Unduh CV]          │
└───────────────────────────────────────────────────┘
```

---

## 4. Komponen

**Tombol**
- Primary: solid `signal-amber`, radius 6px (bukan pill penuh), teks `ink-primary` gelap di atas amber. Hover: sedikit gelap + garis bawah tipis muncul (bukan shimmer sweep).
- Secondary: border 1px `hairline`, transparan, hover: border jadi `signal-amber`.
- Semua tombol: no drop-shadow besar/glow — cukup border + 1 hover state.

**Card (project, career interest, skill)**
- Background `bg-surface`, border 1px `hairline`, radius 10px, no shadow default.
- Hover: garis tipis (`signal-amber`) "tumbuh" dari kiri ke kanan di tepi atas card (animasi `width` atau `stroke-dashoffset`, 200–300ms) + translateY -3px. Tidak perlu scale/rotate gambar berlebihan.

**Badge / tag (tech stack, skill tag)**
- Font mono, uppercase kecil, radius 4px (kotak, bukan pill), border hairline, background transparan. Hover: border jadi `trace-teal`.

**Modal proyek**
- Struktur dipertahankan (gambar kiri, konten kanan). Ganti radius besar (2xl) jadi radius 10–12px, hilangkan backdrop-blur berat, cukup overlay gelap solid dengan opacity.

**Toggle tema**
- Bentuk dipertahankan (switch), warna disesuaikan token baru.

---

## 5. Motion

- **Signature motion:** garis sinyal di hero — SVG path oscilloscope, animasi `stroke-dashoffset` sekali saat load (1–1.5s), tidak looping selamanya.
- **Scroll reveal:** hanya untuk judul section (garis axis-tick "digambar" saat masuk viewport) — bukan setiap card/elemen kecil kena fade-up seperti sekarang.
- **Hapus:** `animate-blob`, `animate-float`, `animate-gradient-x`, efek `typing-effect` caret.
- **Hormati `prefers-reduced-motion: reduce`:** semua animasi trace-line langsung tampil di state akhir, tanpa transisi.
- Durasi standar: micro-interaction (hover) 150–250ms, reveal on-scroll 400–600ms. Easing: `ease-out` untuk masuk, `ease-in-out` untuk hover.

---

## 6. Aksesibilitas

- Kontras teks:latar minimum 4.5:1 untuk body text, 3:1 untuk teks besar (≥24px).
- Focus state: outline 2px `signal-amber` dengan offset 2px, terlihat jelas di kedua mode.
- Semua ikon interaktif (toggle tema, tombol carousel) tetap punya `sr-only` label seperti kode existing.
- Carousel modal tetap bisa dinavigasi keyboard (Escape, Arrow Left/Right) — sudah ada di `script.js`, jangan dihilangkan saat restyle.

---

## 7. Yang Dihindari

- ❌ Full-pill button dengan shimmer sweep
- ❌ Blob gradient blur mengambang
- ❌ Efek typing/caret blink di judul
- ❌ Glassmorphism berat (`backdrop-blur` besar di banyak tempat)
- ❌ Angka urut (01/02/03) di elemen non-sekuensial (nav, grid skill)
- ❌ Palet biru default (`#3b82f6`) tanpa alasan tematik
