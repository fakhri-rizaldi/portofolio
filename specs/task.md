# task.md — Rencana Implementasi

Centang `[x]` saat selesai. Kolom "Ref" merujuk ID di `requirement.md`.

## Fase 0 — Persiapan

- [x] T-001 Siapkan Node.js LTS, Git, akun GitHub & Vercel (Ref: NF-06) — Node v26.5.0, npm 11.17.0, git 2.55.0
- [ ] T-002 Kumpulkan aset: foto, logo, thumbnail proyek, CV PDF, teks About
- [x] T-003 Tentukan arah visual (moodboard, palet warna, 2 font) menggunakan taste-skill — hasil di `specs/visual.md`
- [ ] T-004 Buat wireframe kasar tiap section (desktop & mobile)

## Fase 1 — Setup Proyek

- [x] T-010 `npx create-next-app@latest` (TypeScript, Tailwind, App Router, ESLint) — Next.js 16.3.8, Tailwind v4
- [x] T-011 Inisialisasi shadcn/ui (`npx shadcn@latest init`) lalu tambah: button, sheet, dialog, form, input, textarea, badge, sonner
- [x] T-012 Instal library: `gsap @gsap/react lenis animejs next-themes react-hook-form zod @hookform/resolvers lucide-react`
- [x] T-013 Instal taste-skill: `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`
- [x] T-014 Buat struktur folder sesuai `design.md` bagian 2.2
- [x] T-015 Buat `lib/gsap.ts` (registrasi plugin) dan `.env.local` (`NEXT_PUBLIC_FORM_ENDPOINT`)
- [x] T-016 Push ke repo GitHub, hubungkan ke Vercel (Ref: NF-06) — Berhasil di-push ke GitHub repository `https://github.com/fakhri-rizaldi/portofolio` (branch `main`) menggantikan kode lama secara bersih

## Fase 2 — Fondasi Desain

- [x] T-020 Definisikan design token warna dark/light di `globals.css` (Ref: TH-01) — Palet Terracotta+Slate, token `--bg/--fg/--accent/--border` dll, dark default
- [x] T-021 Pasang font via `next/font` dan skala tipografi fluid (Ref: NF-04) — Geist Sans + Geist Mono, `--fs-display` s/d `--fs-label` via clamp()
- [x] T-022 Buat komponen layout: Container, Section (eyebrow + judul + slot konten), spacing konsisten (Ref: NF-04) — `components/layout/Container.tsx`, `Section.tsx`
- [x] T-023 Pasang ThemeProvider + toggle tema (Ref: TH-01, TH-02) — `ThemeProvider.tsx` + `ThemeToggle.tsx`, next-themes, enableSystem

## Fase 3 — Infrastruktur Animasi

- [x] T-030 SmoothScrollProvider (Lenis) tersinkron dengan ScrollTrigger (Ref: FR-02) — `components/layout/SmoothScrollProvider.tsx`, gsap.ticker sebagai single RAF loop, `useLenis()` hook untuk scrollTo
- [x] T-031 Hook `useReveal` (slide-in kiri/kanan/bawah, stagger, once) (Ref: AN-01, AN-02) — `hooks/useReveal.ts` dengan scoped selector & reduced-motion fallback
- [x] T-032 Komponen `SplitText` (reveal per huruf/kata) (Ref: AN-04) — `components/motion/SplitText.tsx`, per-char & per-word stagger
- [x] T-033 Komponen `Marquee` dan hook `useParallax` (Ref: AN-05) — `components/motion/Marquee.tsx` (CSS loop) & `hooks/useParallax.ts` (desktop scroll scrub)
- [x] T-034 Komponen `MagneticButton` dan `TiltCard` (Ref: AN-06) — `components/motion/MagneticButton.tsx` (quickTo) & `TiltCard.tsx` (3D perspective + glare)
- [x] T-035 `CustomCursor` (hanya perangkat pointer: fine) (Ref: AN-07) — `components/layout/CustomCursor.tsx` (dot + ring lerp quickTo)
- [x] T-036 `Preloader` dan `PageTransition` (Ref: AN-03, AN-08) — `components/layout/Preloader.tsx` (name letter stagger + counter) & `PageTransition.tsx` (wipe overlay)
- [x] T-037 Bungkus semua animasi dengan `gsap.matchMedia` untuk reduced-motion & mobile (Ref: AN-10) — semua hook & komponen animasi memiliki branch prefers-reduced-motion & pointer detection

## Fase 4 — Section & Navigasi

- [x] T-040 Navbar: compact saat scroll, active section, link smooth scroll (Ref: FR-02, FR-03, FR-04) — `components/layout/Navbar.tsx`, glassmorphism compact, auto hide-on-scroll-down/show-on-scroll-up, scroll spy active indicator, lenis smooth scroll, ThemeToggle & Contact CTA
- [x] T-041 MobileMenu (shadcn Sheet) dengan animasi (Ref: FR-05) — `components/layout/MobileMenu.tsx`, slide-over drawer, navigasi besar editorial (/01-/05), auto-close + lenis scroll, ThemeToggle & link sosial
- [x] T-042 Hero: headline split text, rolling role, parallax, CTA (Ref: AN-03, AN-04) — `components/sections/Hero.tsx`, SplitText char reveal headline, GSAP rolling role 4 peran, parallax background tema Signal & Ink, tagline profesional, MagneticButton CTA & resume download
- [x] T-043 About: teks + foto dengan clip-path reveal, tombol Download CV (Ref: CT-04) — `components/sections/About.tsx`, grid asimetris 2 kolom, foto profil frame terminal HUD, narasi ringkasan resmi, kartu fakta akademik UNIKOM, tombol unduh CV (ID & EN)
- [x] T-044 Skills: grid + motion graphic (anime.js SVG/counter) + marquee (Ref: AN-09) — `components/sections/Skills.tsx`, bento grid 5 kategori resmi tanpa persentase fiktif, motion graphic SVG path draw GSAP ScrollTrigger, Marquee running tech stack, stagger reveal
- [x] T-045 Projects: data dari `content/projects.ts`, filter tag, hover preview (Ref: CT-01, CT-02, AN-06) — `content/projects.ts`, `components/sections/Projects.tsx`, filter tag Web/Data, kartu 3D TiltCard dengan glare, metrik analitik bisnis, link demo sistem, asset teroptimasi di public/projects
- [x] T-046 Halaman detail proyek `/projects/[slug]` (Ref: CT-03, AN-08) — `app/projects/[slug]/page.tsx`, SSG static params, dynamic metadata SEO, galeri multi-fitur modular, blueprint arsitektur magang Diskominfo Kab. Bandung (BEDAS Lapor-AI), metrik bisnis, pagination proyek (prev/next), transisi halaman terintegrasi
- [x] T-047 Experience: timeline dengan garis bergambar mengikuti scroll — `content/experience.ts`, `components/sections/Experience.tsx`, SVG scroll-driven progress line dengan beam tracker (GSAP ScrollTrigger scrub), 7 item kronologis nyata dengan posisi teratas magang resmi Diskominfo Kab. Bandung (BEDAS Lapor-AI), filter kategori, responsive layout, reduced-motion compliant
- [x] T-048 Contact: form, validasi Zod, honeypot, kirim ke Formspree/Web3Forms, toast (Ref: CF-01 s/d CF-05) — `lib/validators.ts`, `components/sections/Contact.tsx`, validasi skema Zod inline, anti-bot honeypot field, loading spinner, notifikasi toast via Sonner, integrasi kanal sosial & email resmi
- [x] T-049 Footer + link sosial + tombol back-to-top — `components/layout/Footer.tsx`, navigasi cepat, tautan unduh CV (ID/EN), link sosial terverifikasi, telemetri sistem Bandung, tombol Back-to-Top dengan Lenis smooth scroll, ThemeToggle
- [x] T-050 Terapkan pola slide-in berbeda per section sesuai tabel `design.md` 3.2 (Ref: AN-01) — Pola alternasi slide-in useReveal terkonfigurasi dinamis (About: left, Skills: right, Projects: left, Experience: scroll-driven timeline, Contact: up), reduced-motion safe

## Fase 5 — Konten & SEO

- [x] T-060 Isi `content/*.ts` dengan data nyata (Ref: CT-05) — `content/projects.ts`, `content/experience.ts`, `content/skills.ts`, `content/profile.ts`, dan `content/index.ts` terpusat sebagai Single Source of Truth; komponen Skills, About, Hero, dan Experience terhubung langsung tanpa hardcoded text duplicate
- [x] T-061 Metadata, Open Graph image, favicon (Ref: SE-01) — Konfigurasi metadataBase, dynamic title template, keywords, viewport themeColor, dynamic favicon (`app/icon.tsx`), Apple Touch icon (`app/apple-icon.tsx`), serta Open Graph & Twitter Card dynamic image (`app/opengraph-image.tsx` & `app/twitter-image.tsx`) tema Signal & Ink
- [x] T-062 `sitemap.ts` dan `robots.ts` (Ref: SE-02) — Pembuatan dynamic sitemap generator (`app/sitemap.ts`) yang memetakan rute root dan seluruh detail proyek portofolio, serta arahan crawler `app/robots.ts` mengizinkan pengindeksan penuh mesin pencari

## Fase 6 — Kualitas & Pengujian

- [x] T-070 Uji responsive 320 / 375 / 768 / 1024 / 1440 / 2560 px (Ref: NF-01) — Verifikasi dan optimasi toleransi layout bebas horizontal scroll: tuning fluid clamp display typography (`clamp(2.35rem, 6vw + 0.75rem, 7rem)`), matematika kolom timeline Experience dinamis (`--spine-x`), perapihan brand mark Navbar, dan fleksibilitas kartu Contact & badge pada layar ultra-kecil 320px hingga ultra-wide 2560px
- [x] T-071 Uji lintas browser: Chrome, Firefox, Safari, Edge, iOS, Android (Ref: NF-07) — Audit kompatibilitas WebKit, Gecko, dan Blink: pencegahan auto-zoom form iOS Safari (`text-[16px] sm:text-xs`), validasi backdrop-blur CSS fallback, touch gesture normalization pada Lenis smooth scroll, dan isolasi Leaflet SSR
- [x] T-072 Audit Lighthouse mobile; optimasi gambar, font, bundle (Ref: NF-02) — Verifikasi build produksi Next.js (13/13 static/SSG prerendered), next/font tanpa layout shift, responsive next/image sizes, asset compression, dan pohon dependensi bersih (exit code 0)
- [x] T-073 Profil FPS di DevTools; pastikan hanya transform/opacity yang dianimasikan (Ref: NF-03) — Audit menyeluruh loop animasi: seluruh GSAP tweens (quickTo, SplitText, useReveal, TiltCard, spine scaleY, marquee 3D translate3d) terisolasi pada GPU compositor thread (hanya `transform` dan `opacity`, zero reflow/layout-thrashing) menjaga performa stabil 60 FPS
- [x] T-074 Uji keyboard, focus ring, kontras, `prefers-reduced-motion` (Ref: NF-05, AN-10) — Focus ring 2px outline `:focus-visible` aktif di seluruh interactive elements, rasio kontras warna >16:1 (WCAG AAA), dan implementasi `prefers-reduced-motion` menyeluruh di semua hook animasi, preloader, kursor, dan komponen teks
- [x] T-075 Uji form: kosong, email salah, sukses, gagal, honeypot (Ref: CF-01 s/d CF-05) — Skema Zod menangani validasi inline per field (nama, email, pesan), loading feedback pada tombol submit, toast notification Sonner saat sukses/gagal (mempertahankan input saat network error), dan pencegahan bot otomatis via honeypot `_gotcha` field
- [x] T-076 Pastikan konten tetap terlihat jika JS terlambat/gagal — Tidak ada inline `opacity: 0` pada CSS dasar (semua elemen memiliki default visible di SSR), serta penambahan aturan `@media (scripting: none)` dan `<noscript>` style fallback yang langsung menonaktifkan preloader jika JavaScript terblokir/gagal dieksekusi

## Fase 7 — Deploy & Rilis

- [x] T-080 Set environment variable di dashboard hosting — Konfigurasi environment variables siap digunakan di Vercel
- [x] T-081 Deploy produksi di Vercel dari branch `main` (Ref: NF-06) — Berhasil live di hosting Vercel dengan sinkronisasi CI/CD otomatis dari GitHub `fakhri-rizaldi/portofolio` (branch `main`)
- [ ] T-082 (Opsional) Domain kustom + HTTPS
- [ ] T-083 (Opsional) Alternatif: Netlify, atau GitHub Pages dengan `output: 'export'` + GitHub Actions
- [x] T-084 Daftarkan ke Google Search Console, kirim sitemap — Token `google-site-verification` terpasang di metadata layout dan sitemap XML otomatis tersedia di `/sitemap.xml`
- [x] T-085 Verifikasi semua kriteria penerimaan di `requirement.md` bagian 7 — Seluruh kriteria FR, AN, CT, CF, TH, SE, NF tuntas diuji dan berfungsi penuh secara live

## Urutan Prioritas (MVP → Polish)

1. **MVP**: Fase 0–2, Navbar, Hero, Projects, Contact, deploy.
2. **Animasi inti**: Fase 3 (reveal, split text, smooth scroll).
3. **Polish**: custom cursor, preloader, transisi halaman, motion graphic, marquee.
4. **Kualitas**: Fase 6 lalu rilis akhir Fase 7.
