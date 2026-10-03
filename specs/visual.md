# visual.md — Arah Visual (T-003)

Sumber keputusan: `.agents/skills/design-taste-frontend/SKILL.md`. Dokumen ini adalah input langsung untuk T-020 (token warna) dan T-021 (font + skala tipografi).

## 1. Design Read

> Portofolio developer, redesign-overhaul, Indonesia. Terminal-editorial: neutral slate dingin, satu aksen terracotta hangat, grid asimetris, motion scroll-driven yang terasa tapi tidak pamer.

Mode: **Redesign — overhaul** (situs lama ada, konten dipertahankan, kulit diganti total, lihat `content.md`).

## 2. Dial

| Dial | Nilai | Dasar |
|---|---|---|
| `DESIGN_VARIANCE` | **8** | Preset Portfolio (Developer) = 6, redesign-overhaul `+2` |
| `MOTION_INTENSITY` | **7** | Preset = 5, overhaul `+2`; sejalan dengan AN-01…AN-09 |
| `CONTENT_DENSITY` | **4** | Preset Portfolio (Developer), konten CV cukup padat |

Konsekuensi yang mengikat implementasi:

- `VARIANCE 8` → **hero tidak center**. Pakai split asimetris (teks kiri, foto kanan offset) sesuai `design.md` 3.2.
- `MOTION 7` → gerak harus benar-benar ada: entry hero, scroll-reveal tiap section, hover fisik pada CTA. Kalau tidak sanggup dibangun utuh, turunkan dial, bukan setengah jadi.
- `DENSITY 4` → maksimum ±4 blok informasi per section.

## 3. Palet

Keluarga: **Terracotta + Slate** (rust hangat di atas abu dingin). Beige+brass+espresso dan ungu/biru-glow dilarang di proyek ini.

Satu aksen saja, dipakai di seluruh halaman (nav, hero CTA, link, badge aktif, footer). Tidak ada warna aksen kedua.

### 3.1 Token (isi ke `globals.css` pada T-020)

| Token | Dark (default) | Light | Pemakaian |
|---|---|---|---|
| `--bg` | `#0b0e12` | `#f7f7f5` | Latar halaman |
| `--bg-elev` | `#141920` | `#ffffff` | Kartu, panel, navbar blur |
| `--fg` | `#e8eaed` | `#14181d` | Teks utama |
| `--fg-muted` | `#9aa3ad` | `#5a646e` | Paragraf sekunder, label |
| `--border` | `#242b34` | `#e2e2de` | Garis, divider, outline kartu |
| `--accent` | `#c4512b` | `#b2461f` | CTA, link hover, highlight |
| `--accent-fg` | `#fff6f1` | `#fff6f1` | Teks di atas aksen |
| `--ring` | `#c4512b` | `#b2461f` | Focus ring (NF-05) |

Catatan: saturasi aksen ditahan di bawah 80%; dark mode dan light mode dirancang bersamaan (wajib, bukan opsional).

## 4. Tipografi

Dua family, keduanya dari paket npm `geist` sehingga `next/font` bekerja tanpa file font manual dan tanpa layout shift.

| Peran | Font | Pemakaian |
|---|---|---|
| Sans (display + body) | **Geist Sans** | Headline, judul section, paragraf |
| Mono | **Geist Mono** | Eyebrow label, tag teknologi, angka counter, metadata proyek |

Inter dihindari (default yang dilarang skill). Serif tidak dipakai: brief ini bukan editorial/luxury/heritage.

Skala fluid memakai token di `design.md` 3.1 tanpa perubahan. Tambahan aturan:

- Headline hero: `tracking-tighter leading-[1.05]`, maksimal 6 kata.
- Paragraf: `max-w-[65ch] leading-relaxed`, warna `--fg-muted`.
- Eyebrow mono uppercase: maksimum `ceil(jumlahSection / 3)` kemunculan di seluruh halaman — jadi **maksimum 3 dari 7 section** boleh memakainya.

## 5. Yang Dilarang di Proyek Ini

- Hero center-aligned, `h-screen` (pakai `min-h-[100dvh]`).
- Lebih dari satu warna aksen, atau aksen berubah antar section.
- Tiga section berturut-turut dengan pola image+text split yang sama.
- Dua CTA dengan intent sama ("Hubungi saya" + "Mari bicara"). Satu label per intent, dipakai konsisten di nav, hero, dan footer.
- Emoji sebagai ikon (pakai `lucide-react`).
- Animasi pada `top/left/width/height` — hanya `transform` dan `opacity`.

## 6. Keputusan yang Masih Terbuka

- Nomor telepon dan tanggal pengalaman Data Analyst masih `TODO` di `content.md` — tidak memengaruhi arah visual, tapi harus beres sebelum T-060.
