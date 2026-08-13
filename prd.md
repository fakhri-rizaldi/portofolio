# PRD — Redesign Portofolio Fakhri
**Codename arah desain:** Signal & Ink
**Stack:** PHP (render) → `build.php` → `index.html` statis → GitHub Pages
**Status:** Draft v1

---

## 1. Latar Belakang

Portofolio saat ini (`index.php` + `data.php` + `script.js`) sudah punya arsitektur yang bagus — konten terpisah dari tampilan lewat `data.php`, dan `build.php` meng-generate `index.html` statis untuk GitHub Pages. Masalahnya ada di lapisan visual: primary blue default, blob gradient blur, glassmorphism, font Inter, efek typing-caret, dan animasi AOS fade-up di hampir semua elemen. Kombinasi ini adalah pola yang sangat umum dipakai template/landing page buatan AI, sehingga tidak mencerminkan identitas personal Fakhri sebagai mahasiswa Informatika dengan minat Data Science/Analyst, latar belakang developer PHP, pengalaman relawan P3K, dan skill visual (Figma, Illustrator, Premiere).

## 2. Tujuan

1. Redesign visual total (warna, tipografi, komponen, motion) tanpa mengubah arsitektur teknis yang sudah baik (PHP + `data.php` sebagai single source of content + `build.php` untuk static export).
2. Membangun identitas visual yang spesifik untuk Fakhri — bukan template generik — dengan satu elemen signature yang konsisten dipakai ulang, bukan efek-efek yang berserakan.
3. Menjaga kesan **profesional**, dengan animasi yang **simple dan bertujuan** (bukan dekoratif berlebihan).
4. Tetap ringan dan cepat di-deploy ke GitHub Pages (static hosting, tanpa build step Node/npm).

## 3. Non-Tujuan (Out of Scope)

- Tidak mengubah struktur data di `data.php` (field-field yang ada tetap dipakai apa adanya).
- Tidak migrasi ke framework JS (React/Vue) — tetap vanilla JS + Tailwind (CDN atau compiled, dibahas di task.md).
- Tidak membangun CMS/admin panel untuk edit konten.
- Tidak redesign alur `build.php` (proses build tetap sama: `ob_start()` → `require index.php` → simpan ke `index.html`).

## 4. Target Audiens

- **Primer:** Recruiter/HR & hiring manager (data analyst/scientist entry level, atau posisi PHP/web dev) yang scan portofolio dalam < 60 detik.
- **Sekunder:** Klien freelance yang mencari jasa desain grafis/video editing atau pengembangan web.
- Kedua audiens ini butuh kesan **kompeten dan rapi**, bukan "flashy tapi kosong".

## 5. Prinsip Desain

- **Satu bahasa visual, bukan efek yang berserakan.** Satu motif signature (garis sinyal/data-trace) dipakai ulang di beberapa titik: hero, divider antar-section, hover project card — bukan blob + float + gradient-x + typing-caret sekaligus seperti sekarang.
- **Tipografi membawa kepribadian.** Ganti font default Inter dengan pasangan font yang punya alasan tematik (detail di `styleguide.md`).
- **Motion bertujuan, bukan ambient.** Animasi dipakai untuk mengarahkan perhatian (misal: garis sinyal "digambar" saat scroll ke section baru), bukan animasi mengambang tanpa akhir yang jalan terus-menerus di background.
- **Struktur = informasi.** Elemen seperti angka urut hanya dipakai kalau kontennya memang berurutan (contoh: timeline pengalaman/pendidikan), bukan dipasang di semua tempat sebagai dekorasi.

## 6. Ruang Lingkup Halaman (berdasarkan section yang sudah ada)

| Section | Sumber data | Perubahan utama |
|---|---|---|
| Navigasi | statis | Ganti gaya pill/blur jadi lebih tegas, tanpa penomoran (bukan konten sekuensial) |
| Hero / About | `profile` | Hero jadi "pernyataan tesis": nama, judul, ringkasan, CTA — dengan motif signature sebagai elemen visual utama, bukan blob |
| Career Interests | `career_interests` | Card dengan struktur data-sheet, bukan glassmorphism |
| Experience & Education | `experience`, `education` | Digabung jadi satu **timeline kronologis** (di sini penomoran/urutan waktu memang relevan) |
| Skills (Technical & Editing) | `skills`, `editing_skills` | Grid logo dipertahankan fungsinya, gaya kartu diperbarui |
| Projects + Modal | `projects` | Grid card + modal carousel (fungsi JS di `script.js` dipertahankan), gaya visual diperbarui |
| Contact | `profile.socials`, `email` | CTA akhir, lebih tegas dan personal |

## 7. Functional Requirements

- FR1: Semua section tetap di-render dari `data.php` lewat loop PHP (`foreach`) — tidak ada konten hardcode baru di HTML.
- FR2: Dark/light mode toggle tetap berfungsi (localStorage + prefers-color-scheme), dengan palet baru untuk kedua mode (lihat `styleguide.md`).
- FR3: Modal proyek + carousel screenshot (`openProjectModal`, `changeSlide`, keyboard arrow/Escape) tetap berfungsi persis seperti sekarang — hanya gaya visual yang berubah, bukan logikanya.
- FR4: `projectsData` tetap di-passing dari PHP (`json_encode($data['projects'])`) ke `script.js` seperti sekarang.
- FR5: `build.php` tetap bisa generate `index.html` tanpa perubahan logic — hanya perlu memastikan path asset (font, gambar) tetap relatif dan valid setelah export statis.
- FR6: Mobile menu (hamburger) tetap berfungsi dengan gaya baru.

## 8. Non-Functional Requirements

- **Performa:** Tidak menambah dependency berat. Kalau font baru dipakai, load via `<link>` Google Fonts atau self-host subset, hindari font-weight yang tidak dipakai.
- **Aksesibilitas:** Kontras warna teks vs background minimal WCAG AA. Fokus keyboard terlihat jelas (outline, bukan dihilangkan). Hormati `prefers-reduced-motion` — animasi trace-line langsung tampil final state kalau user set reduce motion.
- **Responsif:** Mobile-first check di breakpoint 375px, 768px, 1024px, 1440px.
- **SEO:** Meta tags yang sudah ada (`title`, `description`, `keywords`, `google-site-verification`) dipertahankan apa adanya.
- **Kompatibilitas hosting:** Semua asset path harus relatif (bukan absolute `/assets/...`) karena akan di-host di GitHub Pages, kemungkinan di subpath repo (`username.github.io/repo-name/`).

## 9. Kriteria Sukses (Definition of Done)

- [ ] Tidak ada lagi elemen visual generik dari versi lama: blob blur, gradient-x, typing-caret, tombol pill bg-primary default.
- [ ] Ada satu motif signature yang konsisten muncul di ≥ 3 titik berbeda di halaman.
- [ ] Semua fungsi JS (theme toggle, modal, carousel, mobile menu) diverifikasi tetap jalan setelah restyle.
- [ ] Lolos build via `build.php` → `index.html` tanpa error, dan tampil identik saat dibuka langsung sebagai file statis.
- [ ] Dicek di 3 breakpoint (mobile/tablet/desktop) dan 2 mode (light/dark).
- [ ] Skor Lighthouse Accessibility ≥ 90.

## 10. Asumsi & Risiko

- **Asumsi:** Konten teks di `data.php` tidak berubah drastis (masih boleh diedit ringan untuk konsistensi voice, dibahas di task.md).
- **Risiko:** Kalau font baru butuh banyak weight, ukuran halaman bisa naik — mitigasi dengan membatasi ke 2–3 weight per family.
- **Risiko:** Tailwind CDN (`cdn.tailwindcss.com`) tidak men-tree-shake CSS — untuk static hosting ringan, pertimbangkan pindah ke Tailwind CLI/compiled CSS saat build (opsional, dibahas di task.md sebagai item lanjutan).
