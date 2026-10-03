# content.md — Sumber Konten Portofolio (Single Source of Truth)

> **Aturan untuk agent:** Semua teks, angka, tautan, dan daftar di situs HARUS berasal dari file ini. Dilarang mengarang proyek, pengalaman, skill, angka, atau tautan. Kalau data yang dibutuhkan tidak ada di sini, tulis `TODO` di kode dan tanyakan ke pemilik, jangan menebak.
> Sumber: CV Indonesia, CV Inggris, dan `index.html` lama (data `portfolioData`).

## 0. Hal yang Harus Dikonfirmasi Pemilik (Konflik Data)

| # | Masalah | Temuan | Keputusan sementara |
|---|---|---|---|
| 1 | Nomor telepon | Situs lama: `+62 812 3456 7890` (tampak placeholder). CV: `+6289659474088` | Pakai nomor CV. **Tampilkan hanya jika pemilik setuju**; default: tidak ditampilkan |
| 2 | Alamat rumah | CV memuat alamat lengkap (Cibaduyut Raya) | **Jangan tampilkan** di situs publik. Cukup "Bandung, Indonesia" |
| 3 | Semester | CV ID: semester 7. CV EN: semester 6 | Pakai **tidak menyebut semester**; tulis "S1 Teknik Informatika, 2023 – 2027" |
| 4 | Tanggal pengalaman Data Analyst | CV ID: Jan–Feb **2025**. CV EN: Jan–Feb **2026** | **TODO**: konfirmasi tahun yang benar |
| 5 | Judul profesi | Situs lama: "Data Analyst & Web Developer". CV: "IT Support Intern" | Hero memakai peran bergilir (lihat 2.2) |
| 6 | Nama tampilan | Situs lama: "Fakhri". CV: "Muhammad Fakhri Rizaldi" | Hero: "Fakhri"; nama lengkap di About, footer, dan metadata |
| 7 | Typo di CV ID | "Mahasisa" (seharusnya "Mahasiswa") | Dikoreksi di situs. Perbaiki juga di file CV |
| 8 | Pengalaman di situs lama yang tidak ada di CV | PKL Desain Grafis (2022), Volunteer GAMATIF 2024, skill desain (Figma, dll.) | Tetap ditampilkan (lihat bagian 4 dan 5). Konfirmasi masih ingin dipakai |
| 9 | Proyek TB.SumberAlam 2 | Ada di CV ID, tidak ada di situs lama | **TODO**: tidak ada tautan/screenshot; tampilkan tanpa tautan atau tanyakan pemilik |
| 10 | Minat karir ML Engineer | Ada di situs lama (TensorFlow, MLOps), tidak ada bukti di CV | Konfirmasi; default: **hapus** agar tidak berlebihan |
| 11 | Data Science sebagai peran | Tidak ada di CV sebagai judul terpisah, tetapi pemilik mengkonfirmasi pemahaman nyata | **Dikonfirmasi pemilik** — ditambahkan sebagai peran ke-4 di Hero rolling text |
| 12 | Tagline profesional & Full Stack Engineer | Permintaan penambahan headline profesional oleh pemilik | **Dikonfirmasi pemilik** — "Informatics Undergraduate at UNIKOM | Aspiring Data Scientist & Analyst | Full Stack Engineer | Machine Learning & NLP" |
| 13 | Keahlian Data & ML | Permintaan revisi oleh pemilik | **Dikonfirmasi pemilik** — Ubah "Machine Learning (KNN, PCA)" menjadi "Machine Learning", serta tambahkan "Rekayasa Fitur" |
| 14 | Keahlian Web | Permintaan revisi oleh pemilik | **Dikonfirmasi pemilik** — Tambahkan "REST API", "Payment Gateway", dan "Responsive Design" pada kategori Pengembangan Web |
| 15 | Penggantian Proyek DonasiYuk & Tambah Pengalaman Magang Diskominfo | Permintaan pemilik: ganti DonasiYuk dengan hasil intern di Diskominfo Soreang (BEDAS Lapor-AI), gambar dikosongkan sementara | **Dikonfirmasi pemilik** — Ganti DonasiYuk dengan BEDAS Lapor-AI (NLP, Gemini API, Laravel 11, Vue 3, Leaflet Spatial), tampilkan skematik terminal HUD, tambahkan pengalaman magang Diskominfo Kab. Bandung di Timeline |
| 16 | Hapus Teknisi Hardware & S1 TI dari Linimasa | Permintaan pemilik: hapus bagian linimasa Teknisi Perangkat Keras dan S1 Teknik Informatika | **Dikonfirmasi pemilik** — Dihapus dari linimasa Experience (data UNIKOM tetap ditampilkan di kartu profil About) |
| 17 | Kategori BEDAS Lapor-AI | Revisi pemilik: BEDAS Lapor-AI masuk ke kategori Web, bukan Data | **Dikonfirmasi pemilik** — Kategori diubah menjadi Web |

## 1. Profil

| Field | Nilai |
|---|---|
| Nama tampilan | Fakhri |
| Nama lengkap | Muhammad Fakhri Rizaldi |
| Tagline Profesional | Informatics Undergraduate at UNIKOM \| Aspiring Data Scientist & Analyst \| Full Stack Engineer \| Machine Learning & NLP |
| Lokasi (publik) | Bandung, Indonesia |
| Email | muhamadfakhri06@gmail.com |
| LinkedIn | https://www.linkedin.com/in/muhamad-fakhri-rizaldi-399193292/ |
| Instagram | https://www.instagram.com/sobatfakhri/?hl=en |
| Status | Terbuka untuk pekerjaan / magang |
| Foto profil | `assets/profile.jpeg` |
| CV Indonesia | `Muhammad_Fakhri_Rizaldi_Resume__Ind_Ver_.pdf` |
| CV Inggris | `Muhammad_Fakhri_Rizaldi_Resume.pdf` |
| Bahasa situs | Indonesia (default) dan Inggris, dengan toggle ID/EN |

### Ringkasan (ID)
Mahasiswa Teknik Informatika Universitas Komputer Indonesia yang adaptif dan serba bisa, dengan keahlian di Infrastruktur TI, Data Science, dan Pengembangan Perangkat Lunak. Terbiasa menangani pemecahan masalah perangkat keras, pengembangan sistem berbasis web, pengolahan data (Python, SQL, Machine Learning), dan visualisasi wawasan bisnis lewat Looker Studio. Sedang mencari peluang magang untuk menerapkan solusi teknis end-to-end.

### Summary (EN)
Informatics Engineering student at Universitas Komputer Indonesia with a dual focus on IT infrastructure maintenance and data-driven problem solving. Experienced in hardware troubleshooting, including printer repairs and PC assembly, plus data visualization with Looker Studio. Seeking an IT Support internship to apply technical and analytical skills.

> Catatan: versi singkat ini disusun dari CV. Pemilik boleh mengubah kata-katanya, tetapi isi klaim tidak boleh ditambah.

## 2. Hero

### 2.1 Teks
- Eyebrow: `Status: Terbuka untuk Pekerjaan` / `Open to Work`
- Headline: `Halo, saya Fakhri.`
- Tagline: `Informatics Undergraduate at UNIKOM | Aspiring Data Scientist & Analyst | Full Stack Engineer | Machine Learning & NLP`
- Tombol utama: `Lihat Proyek` (scroll ke Projects)
- Tombol sekunder: `Sapa Saya` (mailto) dan `Unduh CV (ID)` / `Download CV (EN)`

### 2.2 Teks peran bergilir (animasi rolling text)
1. IT Support
2. Data Analyst
3. Web Developer
4. Data Science

> Empat peran di atas dikonfirmasi oleh pemilik (lihat konflik #11). Jangan menambahkan "ML Engineer", "UI/UX Designer", dan sejenisnya tanpa persetujuan.

### 2.3 Elemen dekoratif (dari situs lama, boleh dipertahankan sebagai motion graphic)
Tema "Signal & Ink": radar sweep, gelombang sinyal (SVG path draw), kartu HUD kecil. Label di kartu HUD pada situs lama (`SAMPLING: 24.0 kHz`, `LATENCY: LOW`, `99.4%`, `12ms`) hanyalah dekorasi, bukan data nyata. Jangan disajikan sebagai statistik asli.

## 3. About / Tentang

Isi: foto profil, ringkasan (bagian 1), dan fakta singkat berikut.

| Fakta | Nilai |
|---|---|
| Kampus | Universitas Komputer Indonesia |
| Program | S1 Teknik Informatika, 2023 – 2027 |
| IPK | 3,48 / 4,00 |
| Mata kuliah relevan | Sistem Operasi, Jaringan Komputer, Sistem Manajemen Basis Data, Data Mining |
| Fokus | Infrastruktur TI, Pengembangan Perangkat Lunak, Data Science |
| Hobi | GYM, Badminton, Game |

## 4. Pengalaman & Pendidikan (Timeline)

Urutan dari terbaru ke terlama. Setiap item menjadi satu kartu timeline.

### 4.0 Data Science & Software Engineering Intern
- Periode: Agu 2026 – Sep 2026 (2 bln) · Diskominfo Kabupaten Bandung, Soreang (Hybrid)
- Jenis: `internship`
- Poin:
  - Mencetuskan ide dan membuat sistem pelaporan aduan masyarakat berbasis kecerdasan buatan, BEDAS Lapor-AI, untuk mengotomatisasi klasifikasi tiket fasilitas lingkungan dan perutean dinas secara cerdas di Kabupaten Bandung.
  - End-to-End NLP Modeling: Membangun dan melatih model klasifikasi teks (multiclass) untuk mengelompokkan aduan warga ke dalam 4 kategori menggunakan pipeline preprocessing teks Bahasa Indonesia, ekstraksi fitur TF-IDF, dan algoritma klasifikasi (SVM / Naive Bayes).
  - Dual-Layer Classification System: Mengarsiteki sistem klasifikasi dua lapis yang memvalidasi hasil zero-shot classification dari Gemini API secara paralel dengan model NLP mandiri berbasis Python, menerapkan mekanisme deteksi anomali (flagging perlu review) dan graceful fallback saat limit API tercapai.
  - Spatial & Cluster Analytics: Mengintegrasikan reverse geocoding (Nominatim OpenStreetMap) dan visualisasi spasial berbasis Leaflet & Heatmap untuk memetakan klaster persebaran titik aduan warga guna membantu pengambilan keputusan pimpinan dinas.
  - Full-Stack AI Integration: Mengintegrasikan model NLP dan LLM ke dalam aplikasi web berbasis Laravel 11, Inertia.js, dan Vue 3 dengan sistem real-time updates menggunakan Laravel Reverb WebSocket.

### 4.1 Pengembang Full Stack (Berbasis Proyek)
- Periode: Des 2025 – Jan 2026 · Proyek Independen, Bandung
- Jenis: `project`
- Poin:
  - Mengembangkan beberapa aplikasi web (DonasiYuk, RestoranPro, TB.SumberAlam 2) dengan Laravel dan PHP.
  - Merancang skema basis data MySQL dan mengimplementasikan SQL Triggers untuk otomatisasi proses bisnis.
  - Menyusun dokumentasi sistem dengan UML (Use Case Diagram, Activity Diagram).
  - Mengintegrasikan autentikasi pengguna dan pelaporan transaksi real-time.
  - Menyelesaikan bug lewat pengujian untuk menjaga keandalan platform.

### 4.2 Data Analyst & Data Scientist (Berbasis Proyek)
- Periode: Jan – Feb **TODO: 2025 atau 2026?** · Proyek Independen, Bandung
- Jenis: `project`
- Poin:
  - Ekstraksi, pembersihan, dan EDA data memakai Python dan SQL.
  - Membangun dan membandingkan model klasifikasi (KNN) serta reduksi dimensi (PCA). *(hanya di CV ID)*
  - Dashboard startup Asia Tenggara di Looker Studio: **297 startup**, total investasi **$1,85 miliar**.
  - Dominasi pasar **lebih dari 80%** pada sektor E-Commerce Indonesia.
  - Visualisasi alokasi modal di Singapura, Indonesia, Malaysia, Thailand (sektor Marketplace).
  - Analisis data historis 2009–2013; rata-rata investasi **$6,22 juta** per startup.

### 4.3 Teknisi Perangkat Keras & Dukungan TI (Berbasis Proyek) *(Dikecualikan dari linimasa atas permintaan pemilik)*
- Periode: Nov 2023 – Sekarang · Proyek Independen, Bandung
- Jenis: `project`
- Poin:
  - Merakit PC custom dan melakukan upgrade perangkat keras.
  - Mendiagnosis dan memperbaiki printer inkjet seri G2000 (kerusakan mainboard dan sistem aliran tinta).
  - Instalasi bersih Windows 11 dan pemeliharaan rutin (bersihkan berkas sementara, optimasi startup).

### 4.4 S1 Teknik Informatika *(Dikecualikan dari linimasa atas permintaan pemilik; tetap ditampilkan di bagian About)*
- Periode: 2023 – Sekarang · Universitas Komputer Indonesia · Jenis: `education`
- IPK 3,48 / 4,00

### 4.5 Volunteer GAMATIF 2024 *(situs lama, tidak ada di CV)*
- Periode: 2024 · Divisi P3K · Jenis: `volunteer`
- Bertanggung jawab atas kesehatan dan keselamatan peserta serta panitia selama acara; menangani pertolongan pertama untuk kecelakaan ringan.

### 4.6 PKL Divisi Desain Grafis, PT Inti Optima Teknologi *(situs lama, tidak ada di CV)*
- Periode: 2022 · Jenis: `internship`
- Membuat desain grafis untuk kebutuhan perusahaan dan karakter maskot 3D memakai Blender.

## 5. Skills / Keahlian

Kelompokkan sesuai bukti. Gunakan ikon dari devicon bila tersedia (CDN jsDelivr diizinkan hanya untuk skrip, jadi **unduh ikon ke `public/icons/`**, jangan hotlink).

| Grup | Item |
|---|---|
| Pengembangan Web | PHP, Laravel, Tailwind CSS, MySQL, PostgreSQL, REST API, Payment Gateway, Responsive Design |
| Data | Python, SQL, Looker Studio, EDA, Machine Learning, Rekayasa Fitur |
| Infrastruktur TI | Perakitan PC, instalasi hardware, troubleshooting, pemeliharaan, instalasi OS |
| Desain & Editing *(dari situs lama)* | Figma, Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Canva, CapCut |
| Soft skill | Critical Thinking, Technical Troubleshooting |
| Lainnya | Midtrans API |

> Jangan menampilkan bar persentase skill (mis. "PHP 90%"). Tidak ada data untuk itu.

## 6. Proyek

Urutan tampil: Restoran, BEDAS Lapor-AI, Startup SE-Asia. Tag filter: `Web`, `Data`.

### 6.1 Sistem Informasi Restoran (RestoranPro)
- Kategori: Web
- Deskripsi: Sistem manajemen restoran multi-role (Admin, Kasir, Koki, Pelayan) dengan pemesanan digital, reservasi meja, integrasi pembayaran Midtrans, manajemen stok menu, verifikasi pesanan dapur, dan dashboard keuangan.
- Tech: Laravel, MySQL, Midtrans API
- Link: https://restoranproif7.my.id
- Gambar: `assets/RP 0.jpg` (pratinjau), `RP 1.jpg` s/d `RP 5.jpg` (galeri)

### 6.2 BEDAS Lapor-AI (Diskominfo Kabupaten Bandung)
- Kategori: Web
- Deskripsi: Sistem pelaporan aduan masyarakat berbasis kecerdasan buatan untuk mengotomatisasi klasifikasi tiket fasilitas lingkungan dan perutean dinas secara cerdas di Kabupaten Bandung.
- Tech: Python, NLP (TF-IDF, SVM), Gemini API, Laravel 11, Inertia.js, Vue 3, Leaflet Spatial, Laravel Reverb WebSocket
- Kontribusi Utama:
  1. End-to-End NLP Modeling: Klasifikasi teks multiclass aduan warga ke dalam 4 kategori (preprocessing teks Bahasa Indonesia, ekstraksi fitur TF-IDF, SVM / Naive Bayes).
  2. Dual-Layer Classification System: Sistem klasifikasi 2 lapis memvalidasi zero-shot Gemini API secara paralel dengan model NLP mandiri Python, deteksi anomali (flagging), dan graceful fallback.
  3. Spatial & Cluster Analytics: Reverse geocoding (Nominatim OpenStreetMap) dan visualisasi spasial berbasis Leaflet & Heatmap klaster persebaran aduan warga.
  4. Full-Stack AI Integration: Aplikasi web responsif Laravel 11, Inertia.js, Vue 3 dengan real-time updates via Laravel Reverb WebSocket.
- Gambar: Dikosongkan sementara atas permintaan pemilik (ditampilkan blueprint terminal HUD skematik Diskominfo Soreang).

### 6.3 Analisis Strategis Startup (SE-Asia)
- Kategori: Data
- Deskripsi: Dashboard visualisasi yang menganalisis ekosistem startup Asia Tenggara (2009–2013): tren investasi, dominasi E-Commerce Indonesia, peluang B2B Software, dan perbandingan distribusi pendanaan regional.
- Tech: Looker Studio, Python, Data Analytics
- Link: https://lookerstudio.google.com/s/l5Rtf3uRI1s
- Gambar: `assets/D1.jpg`
- Angka yang boleh ditampilkan: 297 startup, $1,85 miliar, >80% E-Commerce, $6,22 juta rata-rata

### 6.4 TB.SumberAlam 2
- Kategori: Web · Tech: Laravel, PHP
- **TODO**: tidak ada deskripsi, tautan, dan gambar. Jangan dibuat kartu sampai pemilik memberi data.

## 7. Contact

- Judul: `Mari Bekerja Sama` / `Let's Work Together`
- Teks: Saya terbuka untuk diskusi seputar analisis data, machine learning, atau pengembangan web. Sedang tersedia untuk magang dan peluang baru.
- Aksi: Email (mailto), LinkedIn, Instagram, form kontak (lihat `design.md` 4.2)
- Footer: `© 2026 Fakhri. All rights reserved.`

## 8. Metadata SEO

- Title: `Fakhri — Data Analyst & Web Developer`
- Description: Mahasiswa Teknik Informatika UNIKOM yang membangun aplikasi web Laravel, dashboard data, dan solusi TI. Terbuka untuk magang.
- Bahasa: `id` (default), `en`
- Verifikasi Google Search Console: pertahankan token dari situs lama (`google-site-verification`).

## 9. Aset yang Harus Dipindahkan dari Situs Lama

| Aset | Catatan |
|---|---|
| `assets/profile.jpeg` | Foto profil; optimalkan (WebP) |
| `assets/RP 0–5.jpg`, `DY 1–5.jpg`, `D1.jpg` | Ganti nama tanpa spasi, mis. `rp-0.jpg` |
| Dua file CV PDF | Taruh di `public/` |
| Ikon teknologi | Unduh ke `public/icons/` (jangan hotlink) |

## 10. Larangan Konten (Guardrail)

1. Jangan menampilkan alamat rumah atau nomor telepon tanpa persetujuan.
2. Jangan menambah testimoni, klien, penghargaan, sertifikat, atau metrik yang tidak tertulis di atas.
3. Jangan memakai foto stok atau avatar AI.
4. Jangan menyebut teknologi yang tidak ada di bagian 5 (mis. React, TensorFlow) sebagai keahlian.
5. Semua string tampil harus punya versi ID dan EN dalam `content/*.ts`. Kalau terjemahan EN belum ada, tandai `TODO`.
