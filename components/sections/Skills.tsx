"use client";

/**
 * T-044 — components/sections/Skills.tsx
 * Section Keahlian & Teknologi:
 *   - AN-09: Motion graphic SVG path draw / animated metrics
 *   - AN-05: Komponen Marquee running tech stack
 *   - Grid kategori keahlian resmi sesuai content.md §5 (tanpa persentase fiktif)
 *   - AN-01 / AN-02: Stagger reveal dari bawah saat masuk viewport
 */
import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Marquee } from "@/components/motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SKILL_CATEGORIES, MARQUEE_ITEMS } from "@/content";

export function Skills() {
  const containerRef = useReveal<HTMLDivElement>({
    direction: "right",
    selector: ".skills-card",
    stagger: 0.1,
    startPercent: 15,
  });

  const svgPathRef = useRef<SVGPathElement>(null);

  // AN-09: SVG Path Draw Motion Graphic via GSAP ScrollTrigger
  useGSAP(
    () => {
      const path = svgPathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: svgPathRef }
  );

  return (
    <section
      id="skills"
      className="section-py relative overflow-hidden"
      aria-label="Keahlian dan Penguasaan Teknologi"
    >
      <div ref={containerRef} className="container-main flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="skills-card flex flex-col gap-3">
          <p className="eyebrow">// KEAHLIAN & STACK TEKNOLOGI</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-bold tracking-tighter leading-tight text-[var(--fg)] max-w-[20ch]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Kompetensi yang Berakar pada <span className="text-[var(--accent)]">Praktik & Bukti Nyata</span>.
            </h2>
            <p className="max-w-[48ch] text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed">
              Daftar keahlian disusun secara faktual berdasarkan proyek independen dan studi akademik. Tidak menggunakan persentase fiktif—semua teknologi memiliki implementasi langsung.
            </p>
          </div>
        </div>

        {/* ── AN-09: Motion Graphic Signal Banner / Wave Path ── */}
        <div className="skills-card relative w-full h-16 sm:h-20 rounded-xl border border-[var(--border)] bg-[var(--elev)]/40 overflow-hidden flex items-center justify-between px-6">
          <div className="flex items-center gap-3 z-10 font-mono text-xs text-[var(--fg-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-semibold text-[var(--fg)]">SIGNAL METRICS</span>
            <span className="opacity-40">|</span>
            <span className="hidden sm:inline">DATA DRIVEN • INFRASTRUCTURE VERIFIED</span>
          </div>

          {/* SVG Animated Path Draw */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              ref={svgPathRef}
              d="M 0 50 Q 125 15 250 50 T 500 50 T 750 50 T 1000 50"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </svg>

          <span className="z-10 font-mono text-xs text-[var(--accent)] font-semibold">
            STATUS: ACTIVE
          </span>
        </div>

        {/* ── Bento Grid Kategori Keahlian (content.md §5) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`skills-card p-6 rounded-2xl border border-[var(--border)] bg-[var(--elev)]/50 backdrop-blur-xs flex flex-col justify-between gap-5 group hover:border-[var(--accent)]/50 transition-colors ${idx === 0 ? "lg:col-span-2" : ""
                }`}
            >
              <div className="flex flex-col gap-3">
                {/* Header Kategori */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--accent)] font-bold tracking-wider px-2 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                    {cat.icon}
                  </span>
                  <span className="font-mono text-xs text-[var(--fg-muted)] opacity-60">
                    CAT_0{idx + 1}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[var(--fg)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {cat.category}
                </h3>

                <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]/60">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] transition-transform duration-200 group-hover:border-[var(--accent)]/30 hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── AN-05: Marquee Teknologi Horizontal ── */}
        <div className="skills-card pt-4 flex flex-col gap-3">
          <span className="font-mono text-[11px] text-[var(--fg-muted)] tracking-wider uppercase text-center sm:text-left">
            // RUNNING STACK OVERVIEW
          </span>
          <div className="py-3 px-2 rounded-xl border border-[var(--border)] bg-[var(--elev)]/30 overflow-hidden">
            <Marquee speed={35} pauseOnHover gap="gap-10">
              {MARQUEE_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center gap-4 shrink-0 font-mono text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors">
                  <span className="text-[var(--fg)] font-medium tracking-tight">{item}</span>
                  <span className="text-[var(--accent)] opacity-60">•</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
