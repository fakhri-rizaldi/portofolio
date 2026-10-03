"use client";

/**
 * T-043 — components/sections/About.tsx
 * Redesain Kreatif Section Tentang Saya (Bento-Editorial Grid):
 *   - Tier 1: Header + Narasi Profil
 *   - Tier 2: 2 Kolom Seimbang (Foto Profil Eksklusif + Peta Asli Leaflet Bandung)
 *   - Tier 3: 3 Kartu Bento Modular (Akademik & IPK 3.48, Fokus Solusi Keahlian, Minat & Personal)
 *   - Tier 4: Resume Download Center (CV ID & EN)
 *   - Single Source of Truth dari content.md §3
 */
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/motion";
import { PROFILE } from "@/content";

// Dynamic import Leaflet agar bebas dari error SSR Next.js
const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] rounded-2xl border border-[var(--border)] bg-[var(--elev)]/60 flex items-center justify-center font-mono text-xs text-[var(--fg-muted)]">
        Memuat radar peta Bandung...
      </div>
    ),
  }
);

export function About() {
  const photoBoxRef = useRef<HTMLDivElement>(null);

  // T-043: Clip-path reveal pada foto profil saat masuk viewport
  useGSAP(
    () => {
      const el = photoBoxRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.5 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: photoBoxRef }
  );

  const containerRef = useReveal<HTMLDivElement>({
    direction: "left",
    selector: ".about-card",
    stagger: 0.12,
    startPercent: 15,
  });

  return (
    <section
      id="about"
      className="section-py relative overflow-hidden"
      aria-label="Tentang Fakhri"
    >
      <div ref={containerRef} className="container-main flex flex-col gap-10 sm:gap-14">
        {/* ── Section Header ── */}
        <div className="about-card flex flex-col gap-3">
          <p className="eyebrow">// PROFIL & LATAR BELAKANG</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-bold tracking-tighter leading-tight text-[var(--fg)] max-w-[20ch]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Menjembatani Solusi Teknis dari{" "}
              <span className="text-[var(--accent)]">Infrastruktur</span> hingga{" "}
              <span className="text-[var(--accent)]">Wawasan Data</span>.
            </h2>
            <p className="max-w-[48ch] text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed">
              Mahasiswa Teknik Informatika Universitas Komputer Indonesia yang adaptif dan serba bisa. Terbiasa memecahkan masalah perangkat keras, membangun aplikasi web handal, hingga mengolah data dan visualisasi wawasan bisnis.
            </p>
          </div>
        </div>

        {/* ── Tier 1 Bento: Foto Profil & Peta Leaflet Bandung (Side-by-Side Lega) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Kartu Foto Profil & Identitas (5 Kolom) */}
          <div className="about-card lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--elev)]/40 backdrop-blur-xs relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Photo Box dengan Clip-Path Reveal */}
              <div
                ref={photoBoxRef}
                className="relative w-36 h-44 sm:w-40 sm:h-48 shrink-0 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--elev)] shadow-sm will-change-[clip-path]"
              >
                <Image
                  src="/profile.jpeg"
                  alt="Muhammad Fakhri Rizaldi"
                  fill
                  sizes="160px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
              </div>

              {/* Identity text */}
              <div className="flex flex-col text-center sm:text-left gap-2 pt-1">
                <div className="font-mono text-[11px] text-[var(--accent)] tracking-wider uppercase font-semibold">
                  // BIODATA
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-[var(--fg)] tracking-tight">
                  Muhammad Fakhri Rizaldi
                </h3>
                <p className="font-mono text-xs text-[var(--fg-muted)]">
                  Bandung, Jawa Barat, ID
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--fg-muted)] self-center sm:self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>S1 Informatika UNIKOM</span>
                </div>
              </div>
            </div>

            {/* Quote / Narrative Snippet */}
            <div className="mt-6 pt-4 border-t border-[var(--border)]/60 text-xs text-[var(--fg-muted)] leading-relaxed italic">
              &ldquo;Fokus saya adalah menghubungkan rekayasa perangkat keras, sistem perangkat lunak, dan kecerdasan data menjadi satu kesatuan solusi teknis end-to-end.&rdquo;
            </div>
          </div>

          {/* Kartu Peta Interaktif Leaflet Bandung (7 Kolom) */}
          <div className="about-card lg:col-span-7 h-full min-h-[320px] flex">
            <LeafletMap />
          </div>
        </div>

        {/* ── Tier 2 Bento: 3 Kartu Modular (Akademik, Fokus Keahlian, Personal) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kartu 1: Akademik & IPK UNIKOM */}
          <div className="about-card p-6 rounded-2xl border border-[var(--border)] bg-[var(--elev)]/40 flex flex-col justify-between gap-4 group hover:border-[var(--accent)]/40 transition-colors">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider uppercase font-semibold">
                // 01 PENDIDIKAN
              </span>
              <h4 className="font-bold text-base text-[var(--fg)]">
                Universitas Komputer Indonesia
              </h4>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                S1 Teknik Informatika (2023 – 2027). Mata kuliah utama: Sistem Operasi, Jaringan Komputer, DBMS (MySQL), Data Mining.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border)]/60 flex items-baseline justify-between">
              <span className="font-mono text-xs text-[var(--fg-muted)]">IPK Kumulatif:</span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-[var(--accent)]">3,48</span>
                <span className="text-xs text-[var(--fg-muted)]">/ 4,00</span>
              </div>
            </div>
          </div>

          {/* Kartu 2: Pilar Keahlian Teknis */}
          <div className="about-card p-6 rounded-2xl border border-[var(--border)] bg-[var(--elev)]/40 flex flex-col justify-between gap-4 group hover:border-[var(--accent)]/40 transition-colors">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider uppercase font-semibold">
                // 02 PILAR KEAHLIAN
              </span>
              <h4 className="font-bold text-base text-[var(--fg)]">
                Infrastruktur & Rekayasa
              </h4>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Kombinasi troubleshoot hardware/jaringan, full-stack web engineering modern, serta pemodelan analitik data.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]/60">
              {["Hardware & IT Support", "Web Development", "Data Science", "Machine Learning"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Kartu 3: Personal & Etos Kerja */}
          <div className="about-card p-6 rounded-2xl border border-[var(--border)] bg-[var(--elev)]/40 flex flex-col justify-between gap-4 group hover:border-[var(--accent)]/40 transition-colors">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] text-[var(--accent)] tracking-wider uppercase font-semibold">
                // 03 PERSONAL & HOBI
              </span>
              <h4 className="font-bold text-base text-[var(--fg)]">
                Keseimbangan & Disiplin
              </h4>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Di luar penulisan kode dan analisis data, saya menjaga ketajaman mental dan stamina fisik melalui aktivitas terstruktur.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]/60 font-mono text-xs text-[var(--fg)]">
              <span className="text-[var(--accent)]">⚡</span>
              <span>GYM</span>
              <span className="text-[var(--border)]">•</span>
              <span>Badminton</span>
              <span className="text-[var(--border)]">•</span>
              <span>Gaming</span>
            </div>
          </div>
        </div>

        {/* ── Tier 3 Bento: Resume Download & Action Hub ── */}
        <div className="about-card p-6 rounded-2xl border border-[var(--border)] bg-[var(--elev)]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-bold text-sm text-[var(--fg)]">
              Tertarik bekerja sama atau melihat rekam jejak lengkap?
            </span>
            <span className="font-mono text-xs text-[var(--fg-muted)]">
              Dokumen Curriculum Vitae resmi tersedia dalam Bahasa Indonesia dan Bahasa Inggris.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <MagneticButton strength={0.2} radius={60}>
              <a
                href="/cv-id.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-xs font-medium border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all active:scale-95 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Unduh CV (ID)</span>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2} radius={60}>
              <a
                href="/cv-en.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-xs font-medium border border-[var(--border)] bg-transparent text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg-muted)] transition-all active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume (EN)</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
