# Task Breakdown — Redesign Portofolio Fakhri
Referensi: `prd.md` (requirement), `styleguide.md` (token & komponen)

---

## Fase 0 — Persiapan
- [ ] Buat branch baru di repo (`git checkout -b redesign-signal-ink`) — jangan kerja langsung di `main`.
- [ ] Backup `index.php`, `script.js`, dan `data.php` versi lama (misal folder `_old/`) sebagai referensi/rollback.
- [ ] Cek ulang isi `data.php` — ada typo/placeholder yang perlu dirapikan? (misal `'title' => 'Portofolio'` di profile, cek apakah mau diganti jadi lebih spesifik seperti "Aspiring Data Analyst").
- [ ] Pastikan semua asset gambar di folder `assets/` sudah final (profile photo, screenshot proyek).

## Fase 1 — Fondasi Desain (Tokens)
- [x] Tambahkan Google Fonts: IBM Plex Sans, IBM Plex Sans Condensed, IBM Plex Mono (pilih weight 400/500/600/700 secukupnya saja).
- [x] Update `tailwind.config` inline di `index.php`: ganti `colors.primary/secondary/dark/darker/card` dengan token dari `styleguide.md` (dark & light).
- [x] Ganti `fontFamily.sans` jadi IBM Plex Sans, tambah `fontFamily.mono` untuk IBM Plex Mono, `fontFamily.display` untuk IBM Plex Sans Condensed.
- [x] Hapus keyframes lama yang tidak dipakai lagi: `float`, `float-delayed`, `blob`, `gradient-x`, `typing`, `blink-caret`.
- [x] Tambah keyframe baru: `trace-draw` (stroke-dashoffset untuk garis sinyal) dan transisi hover card.
- [x] Tambah media query `prefers-reduced-motion: reduce` yang mematikan animasi trace-draw (langsung ke state akhir).

## Fase 2 — Komponen Global
- [x] **Tombol (Primary/Secondary):** buat ulang sesuai spesifikasi di styleguide (radius 6px, no shimmer, hover underline/border).
- [x] **Badge/tag:** ubah dari `rounded-full` jadi `rounded` kecil, font mono, style hairline.
- [x] **Section header pattern ("axis tick"):** buat 1 komponen reusable (blade-style include kalau mau, atau cukup snippet PHP terpisah) dipakai di semua judul section, ganti pola gradient-text + garis panjang yang sekarang ada.
- [x] **Card base style:** border hairline, radius 10px, hover trace-line top edge — buat 1 class utility dipakai di project card & career interest card & skill card.

## Fase 3 — Rebuild Section (urut sesuai halaman)
- [x] **Navbar:** ganti background blur berat → solid/hairline border bawah, label pakai font mono, hapus efek pill besar di toggle jika perlu disederhanakan.
- [x] **Hero/About:** bangun SVG garis sinyal (oscilloscope-style path) sebagai elemen utama pengganti blob. Animasikan sekali saat load pakai `stroke-dashoffset`. Susun ulang layout teks (eyebrow mono "STATUS: OPEN FOR WORK" dsb) sesuai wireframe di styleguide.


- [x] **Light mode color overrides:** tambahkan CSS variables untuk token light mode di styleguide, terapkan via class `dark:` / default di body & sections.
- [x] **Career Interests:** restyle card pakai card base baru, tags ganti ke badge mono.
- [x] **Experience + Education → Timeline:** gabungkan dua section jadi satu timeline vertikal kronologis (di sinilah penomoran/tahun relevan dipakai). Loop tetap dari `data['experience']` dan `data['education']`, digabung & diurutkan berdasarkan `period` di PHP sebelum di-render.
- [x] **Skills & Editing Skills:** pertahankan grid logo, ganti card style (hairline, hover ringan, hapus grayscale-to-color kalau ingin lebih tegas atau pertahankan sebagai micro-interaction yang sudah cukup baik).
- [x] **Projects grid:** restyle card sesuai card base baru, overlay gradient di preview image disederhanakan (tidak perlu serumit sekarang), badge tech-stack pakai style mono.
- [x] **Project Modal:** sesuaikan radius, hilangkan backdrop-blur berat jadi overlay solid, sesuaikan warna tombol "Kunjungi Website" ke token baru. **Jangan ubah logic JS** (`openProjectModal`, `setupCarousel`, `changeSlide`, `updateSlideImage` di `script.js` tetap dipakai apa adanya).
- [x] **Contact:** sederhanakan background noise/texture, CTA pakai tombol primary baru, ikon sosial disesuaikan warna.

## Fase 4 — Motion Pass (setelah semua section jadi)
- [x] Review ulang: pastikan animasi hanya muncul di 3 titik signature (hero pulse line, section header axis-tick draw-in, card hover trace) — hapus sisa `data-aos` yang berlebihan di elemen kecil (misal setiap skill icon satu-satu tidak perlu delay bertingkat satu per satu).
- [x] Test dengan OS setting "reduce motion" aktif → pastikan semua animasi trace langsung final state.
- [x] Pertimbangkan drop AOS library sepenuhnya kalau scroll-reveal cukup di-handle dengan CSS `@starting-style`/Intersection Observer ringan sendiri (opsional, kurangi dependency eksternal).

## Fase 5 — QA Responsif & Aksesibilitas
- [x] Cek breakpoint 375px, 768px, 1024px, 1440px — khususnya hero (SVG garis sinyal harus tetap proporsional), timeline (jadi 1 kolom di mobile), modal (stack vertikal di mobile — sudah ada `flex-col md:flex-row`).
- [x] Cek kontras warna token baru (pakai contoh: WebAIM contrast checker) untuk kombinasi teks/background di kedua mode.
- [x] Tab-through seluruh halaman pakai keyboard: nav, toggle tema, tombol CV, project card, modal (Escape & Arrow key), sosial media links — pastikan semua punya focus ring `signal-amber` yang terlihat.
- [ ] Jalankan Lighthouse (Accessibility & Performance) di Chrome DevTools, target skor sesuai `prd.md` (Accessibility ≥ 90).

## Fase 6 — Review Konten `data.php`
- [x] Selaraskan tone teks dengan arah desain baru (lebih presisi/analitis) tanpa mengubah makna — opsional, bukan wajib.
- [x] Pastikan field `title` di profile ('Portofolio') tidak membingungkan — pertimbangkan ganti ke posisi yang dituju (mis. "Data Analyst & Web Developer").

## Fase 7 — Build & Deploy
- [ ] Jalankan `php build.php` secara lokal → cek `index.html` yang dihasilkan terbuka dengan benar sebagai file statis (double click / `python -m http.server`).
- [ ] Pastikan semua path asset (font, gambar, `script.js`) relatif — cek khusus kalau repo GitHub Pages di-serve dari subpath (`username.github.io/repo/`), bukan root domain.
- [ ] Commit `index.html` + folder `assets/` + `script.js` ke branch, push, aktifkan GitHub Pages dari branch/folder yang sesuai.
- [ ] Buka live URL, cek sekali lagi di device asli (bukan cuma DevTools responsive mode).

## Fase 8 — Review Akhir (Self-Critique)
- [ ] Bandingkan hasil akhir dengan checklist "Yang Dihindari" di `styleguide.md` — pastikan tidak ada satupun elemen generik lama yang tersisa.
- [ ] Screenshot before/after untuk dokumentasi pribadi (bagus juga buat konten LinkedIn/Instagram tentang proses redesign).
- [ ] Merge branch ke `main` setelah semua checklist di atas selesai.
