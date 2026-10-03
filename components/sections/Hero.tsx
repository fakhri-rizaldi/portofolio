"use client";

/**
 * T-042 — components/sections/Hero.tsx
 * Hero Section Portofolio:
 *   - AN-03: Animasi masuk pasca-preloader
 *   - AN-04: Split text reveal pada headline + rolling role text (IT Support, Data Analyst, Full Stack Developer, Data Science)
 *   - AN-05: Parallax ringan pada latar grafis tema "Signal & Ink" (grid terminal, radar sweep, gelombang sinyal)
 *   - AN-06: Magnetic button pada CTA primer
 *   - Konten: Single Source of Truth dari content.md §2
 */
import { useEffect, useState, useRef } from "react";
import { SplitText, MagneticButton } from "@/components/motion";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import { useParallax } from "@/hooks/useParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { PROFILE } from "@/content";

const ROLES = PROFILE.roles;

interface HeroProps {
  ready?: boolean;
}

export function Hero({ ready = true }: HeroProps) {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roleTextRef = useRef<HTMLSpanElement>(null);
  const parallaxBgRef = useParallax<HTMLDivElement>(0.2);

  // Smooth scroll handler ke Projects
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // AN-04: Rolling role text animation via GSAP
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      const el = roleTextRef.current;
      if (!el) return;

      // Animate out (slide up + fade out)
      gsap.to(el, {
        y: -18,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
          // Set posisi awal bawah untuk animasi masuk
          gsap.set(el, { y: 18, opacity: 0 });
          // Animate in (slide up ke 0 + fade in)
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          });
        },
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-[95dvh] flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pb-16"
      aria-label="Bagian Pembuka (Hero)"
    >
      {/* ── Background Dekoratif Parallax Bergerak: Tema Signal & Ink (content.md §2.3) ── */}
      <div
        ref={parallaxBgRef}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Animated Cyber Grid Matrix */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Gradient Glow Berdenyut */}
        <div
          className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full blur-[140px] opacity-20 dark:opacity-25 animate-pulse"
          style={{
            backgroundColor: "var(--accent)",
            animationDuration: "5s",
          }}
        />

        {/* Radar & Circular Grid SVG Berputar Kontinu */}
        <svg
          className="w-[120vw] max-w-[850px] aspect-square text-[var(--accent)] opacity-25 dark:opacity-35"
          viewBox="0 0 800 800"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{
            animation: reducedMotion ? "none" : "spin-radar 65s linear infinite",
          }}
        >
          <circle cx="400" cy="400" r="380" strokeDasharray="4 8" opacity="0.4" />
          <circle cx="400" cy="400" r="280" opacity="0.3" />
          <circle cx="400" cy="400" r="180" strokeDasharray="6 6" opacity="0.5" />
          <circle cx="400" cy="400" r="80" opacity="0.6" />
          <line x1="400" y1="20" x2="400" y2="780" strokeDasharray="3 6" opacity="0.3" />
          <line x1="20" y1="400" x2="780" y2="400" strokeDasharray="3 6" opacity="0.3" />
        </svg>

        {/* Dynamic Sine Wave Vector */}
        <svg
          className="absolute w-full h-32 bottom-6 left-0 text-[var(--accent)] opacity-15 dark:opacity-20"
          viewBox="0 0 1440 120"
          fill="none"
        >
          <path
            d="M 0 60 Q 360 10 720 60 T 1440 60"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        </svg>
      </div>

      {/* ── Konten Utama Hero ── */}
      <div className="container-main flex flex-col items-start gap-7 z-10">
        {/* Location / Coordinate Tag */}
        <div className="font-mono text-[11px] sm:text-xs text-[var(--fg-muted)] flex flex-wrap items-center gap-2 opacity-80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping shrink-0" />
          <span>Bandung, Indonesia [107.6191° E, 6.9175° S]</span>
        </div>

        {/* Headline dengan SplitText Reveal */}
        <div className="flex flex-col gap-2">
          <h1
            className="font-sans font-bold tracking-tighter leading-[1.04] text-[var(--fg)]"
            style={{ fontSize: "var(--fs-display)" }}
          >
            <SplitText type="chars" delay={0.1} stagger={0.03} trigger="immediate" ready={ready}>
              Halo, saya
            </SplitText>{" "}
            <span className="text-[var(--accent)] inline-block">
              <SplitText type="chars" delay={0.35} stagger={0.03} trigger="immediate" ready={ready}>
                Fakhri.
              </SplitText>
            </span>
          </h1>

          {/* Rolling Role Text (AN-04) */}
          <div className="flex items-center gap-2.5 font-mono text-base sm:text-lg text-[var(--fg-muted)] mt-1">
            <span className="text-[var(--accent)] font-semibold select-none">&gt;</span>
            <span className="font-medium text-[var(--fg)]">Fokus Peran:</span>
            {reducedMotion ? (
              <span className="text-[var(--accent)] font-semibold">
                {ROLES.join(" · ")}
              </span>
            ) : (
              <div className="relative inline-flex h-7 items-center overflow-hidden">
                <span
                  ref={roleTextRef}
                  className="text-[var(--accent)] font-semibold inline-block whitespace-nowrap will-change-transform"
                >
                  {ROLES[currentRoleIndex]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Tagline */}
        <p className="font-mono text-xs sm:text-sm tracking-tight text-[var(--fg-muted)] border-l-2 border-[var(--accent)] pl-3 py-0.5 max-w-[68ch] leading-relaxed">
          <span className="text-[var(--fg)] font-medium">Informatics Undergraduate at UNIKOM</span>
          {" "}• Aspiring Data Scientist &amp; Analyst • Full Stack Engineer • Machine Learning &amp; NLP
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {/* Primary CTA: Lihat Proyek (Magnetic) */}
          <MagneticButton strength={0.3} radius={70}>
            <a
              href="#projects"
              id="cta-lihat-proyek"
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md font-medium text-sm transition-all shadow-sm active:scale-[0.98] bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90"
            >
              <span>Lihat Proyek</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </MagneticButton>

          {/* Secondary CTA: Sapa Saya */}
          <a
            href="mailto:muhamadfakhri06@gmail.com"
            id="cta-sapa"
            className="inline-flex items-center justify-center h-11 px-5 rounded-md border border-[var(--border)] font-medium text-sm text-[var(--fg)] bg-[var(--elev)]/50 hover:bg-[var(--elev)] transition-all active:scale-[0.98]"
          >
            Sapa Saya
          </a>

          {/* Secondary CTA: Unduh CV */}
          <a
            href="/Muhammad_Fakhri_Rizaldi_Resume__Ind_Ver_.pdf"
            id="cta-unduh-cv"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-md border border-[var(--border)] font-medium text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg-muted)] transition-all active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 text-[var(--accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh CV</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin-radar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
