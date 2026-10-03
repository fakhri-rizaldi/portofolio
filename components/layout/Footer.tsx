"use client";

/**
 * T-049 — components/layout/Footer.tsx
 * Footer global portofolio:
 *   - Copyright © 2026 Muhammad Fakhri Rizaldi
 *   - Link sosial: Email, LinkedIn, Instagram
 *   - Navigasi cepat antar-section
 *   - Tombol Back-to-Top dengan Lenis smooth scroll
 *   - ThemeToggle & status terminal
 */
import Link from "next/link";
import { useLenis } from "lenis/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MagneticButton } from "@/components/motion";

export function Footer() {
  const lenis = useLenis();

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "Tentang", href: "#about" },
    { label: "Keahlian", href: "#skills" },
    { label: "Proyek", href: "#projects" },
    { label: "Pengalaman", href: "#experience" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--bg)] relative overflow-hidden"
      aria-label="Footer Halaman"
    >
      {/* Top Banner & Quick Links */}
      <div className="container-main py-12 sm:py-16 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-[var(--border)]/60">
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-lg tracking-tight text-[var(--fg)]">
              Muhammad Fakhri Rizaldi
            </span>
            <p className="font-mono text-xs text-[var(--fg-muted)]">
              Informatics Undergraduate at UNIKOM · Full Stack &amp; Data Science
            </p>
          </div>

          {/* Back to top magnetic button */}
          <div className="self-start md:self-auto">
            <MagneticButton strength={0.25} radius={50}>
              <button
                type="button"
                onClick={handleScrollToTop}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[var(--border)] bg-[var(--elev)] text-xs font-mono text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Kembali ke atas"
              >
                <span>Kembali ke Atas</span>
                <span className="text-sm font-bold">↑</span>
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-xs">
          {/* Navigasi Section */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-[var(--fg-muted)] tracking-wider">
              // NAVIGASI CEPAT
            </span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kanal Sosial */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-[var(--fg-muted)] tracking-wider">
              // KANAL JEJARING
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/muhamad-fakhri-rizaldi-399193292/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sobatfakhri/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fakhri-rizaldi"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:muhamadfakhri06@gmail.com"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Surel (Email)</span>
                  <span className="text-[10px]">✉</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Dokumen & Profil */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-[var(--fg-muted)] tracking-wider">
              // DOKUMEN RESMI
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/Muhammad_Fakhri_Rizaldi_Resume__Ind_Ver_.pdf"
                  download
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Curriculum Vitae (ID)</span>
                  <span className="text-[10px]">↓</span>
                </a>
              </li>
              <li>
                <a
                  href="/Muhammad_Fakhri_Rizaldi_Resume.pdf"
                  download
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Resume (EN)</span>
                  <span className="text-[10px]">↓</span>
                </a>
              </li>
              <li>
                <Link
                  href="/projects/bedas-lapor-ai"
                  className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Arsip BEDAS Lapor-AI ↗</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Status & Koordinat */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-[var(--fg-muted)] tracking-wider">
              // TELEMETRI SISTEM
            </span>
            <div className="flex flex-col gap-2 text-[11px] text-[var(--fg-muted)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[var(--fg)]">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <p>Bandung · 107.6191° E, 6.9175° S</p>
              <p className="text-[10px] opacity-75">Stack: Next.js 16 · Tailwind v4 · GSAP</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--fg-muted)]">
          <p>© 2026 Fakhri. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Tema Antarmuka:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
