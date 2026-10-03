"use client";

/**
 * T-047 — components/sections/Experience.tsx
 * Section Timeline Pengalaman & Pendidikan:
 *   - CT-04: Data dari content/experience.ts (content.md §4)
 *   - Garis SVG & progress beam yang mengikuti scroll (GSAP ScrollTrigger scrub)
 *   - Posisi teratas: Data Science & Software Engineering Intern (Diskominfo Kab. Bandung)
 *   - Reduced-motion compliant (AN-10)
 */
import { useState, useRef, useEffect } from "react";
import { EXPERIENCES, type ExperienceItem } from "@/content/experience";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type FilterType = "all" | "internship" | "project" | "volunteer";

export function Experience() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const filteredItems = EXPERIENCES.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "internship") return item.type === "internship";
    if (activeFilter === "project") return item.type === "project";
    if (activeFilter === "volunteer") return item.type === "volunteer";
    return true;
  });

  useEffect(() => {
    if (reduced || !timelineRef.current || !progressLineRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Progress line drawing down with scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );

      // 2. Glowing beam tracker following scroll position
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Reveal animation for each timeline item
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [reduced, activeFilter]);

  return (
    <section
      id="experience"
      className="section-py relative overflow-hidden"
      aria-label="Riwayat Pengalaman dan Pendidikan"
    >
      <div className="container-main flex flex-col gap-10 sm:gap-14">
        {/* ── Section Header ── */}
        <div className="flex flex-col gap-3">
          <p className="eyebrow">// RIWAYAT REKAYASA &amp; PENGALAMAN</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                className="font-bold tracking-tighter leading-tight text-[var(--fg)] max-w-[22ch]"
                style={{ fontSize: "var(--fs-h2)" }}
              >
                Linimasa Karier &amp;{" "}
                <span className="text-[var(--accent)]">Eksplorasi Teknis</span>.
              </h2>
              <p className="max-w-[50ch] text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed mt-2">
                Dari rekayasa sistem AI &amp; pemodelan NLP di instansi pemerintahan, pengembangan web skala penuh, hingga pemeliharaan infrastruktur TI.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border border-[var(--border)] bg-[var(--elev)]/60 backdrop-blur-xs self-start lg:self-end">
              {[
                { label: "Semua", value: "all" },
                { label: "Magang", value: "internship" },
                { label: "Proyek", value: "project" },
                { label: "Organisasi", value: "volunteer" },
              ].map((tab) => {
                const isActive = activeFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value as FilterType)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-[var(--accent)] text-[var(--accent-fg)] font-semibold shadow-xs"
                        : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--border)]/30"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Timeline Track with Dynamic SVG Scroll Beam ── */}
        <div
          ref={timelineRef}
          className="relative mt-2 [--spine-x:100px] sm:[--spine-x:208px] md:[--spine-x:264px]"
        >
          {/* Static Background Spine positioned at center of column 2 */}
          <div
            className="absolute left-[var(--spine-x)] top-6 bottom-6 w-[2px] bg-[var(--border)] -translate-x-1/2 pointer-events-none"
            aria-hidden="true"
          />

          {/* Dynamic Active Progress Spine (Scroll-driven) */}
          <div
            ref={progressLineRef}
            className="absolute left-[var(--spine-x)] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--accent)]/40 -translate-x-1/2 origin-top pointer-events-none"
            style={{ transform: reduced ? "scaleY(1)" : "scaleY(0)" }}
            aria-hidden="true"
          />

          {/* Glowing Beam Tracker (Traveler Node) */}
          {!reduced && (
            <div
              ref={beamRef}
              className="absolute left-[var(--spine-x)] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_3px_var(--accent)] pointer-events-none z-20"
              style={{ top: "0%" }}
              aria-hidden="true"
            />
          )}

          {/* ── Timeline Items ── */}
          <div className="flex flex-col gap-8 sm:gap-12">
            {filteredItems.map((item, idx) => {
              const isDiskominfo = item.id === "diskominfo-soreang";

              return (
                <div
                  key={item.id}
                  className="timeline-card relative grid grid-cols-[90px_20px_1fr] sm:grid-cols-[190px_36px_1fr] md:grid-cols-[240px_48px_1fr] items-start"
                >
                  {/* 1. Left Column (Tahun, Durasi, Lokasi, Kategori) — Sisi Kiri Garis */}
                  <div className="text-right flex flex-col items-end gap-1 font-mono pt-3 sm:pt-4 pr-2 sm:pr-3">
                    <span
                      className={cn(
                        "font-bold text-xs sm:text-sm leading-snug tracking-tight",
                        isDiskominfo ? "text-[var(--accent)]" : "text-[var(--fg)]"
                      )}
                    >
                      {item.period}
                    </span>
                    <span className="text-[var(--fg-muted)] text-[10px] sm:text-[11px] leading-tight">
                      {item.location}
                    </span>
                    <span
                      className={cn(
                        "inline-block mt-1 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold border uppercase tracking-wider",
                        isDiskominfo
                          ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border)] bg-[var(--elev)] text-[var(--fg-muted)]"
                      )}
                    >
                      {item.typeLabel}
                    </span>
                  </div>

                  {/* 2. Middle Column (Node Pin di atas Garis) */}
                  <div className="flex justify-center pt-3.5 sm:pt-4">
                    <div
                      className={cn(
                        "rounded-full flex items-center justify-center z-10 transition-colors bg-[var(--bg)]",
                        isDiskominfo
                          ? "w-6 h-6 border-2 border-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                          : "w-4 h-4 border-2 border-[var(--border)] group-hover:border-[var(--accent)]"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-full",
                          isDiskominfo
                            ? "w-2.5 h-2.5 bg-[var(--accent)] animate-pulse"
                            : "w-1.5 h-1.5 bg-[var(--fg-muted)]"
                        )}
                      />
                    </div>
                  </div>

                  {/* 3. Right Column (Card Content) — Sisi Kanan Garis */}
                  <div
                    className={cn(
                      "p-5 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col gap-4 ml-1 sm:ml-2",
                      isDiskominfo
                        ? "border-[var(--accent)]/40 bg-[var(--elev)]/80 shadow-lg shadow-[var(--accent)]/5 hover:border-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--elev)]/40 hover:border-[var(--border)]/80 hover:bg-[var(--elev)]/70"
                    )}
                  >
                    {/* Header Role & Organization */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)]/60 pb-4">
                      <div>
                        {isDiskominfo && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-mono font-bold uppercase mb-2 tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                            <span>Magang Resmi · BEDAS Lapor-AI</span>
                          </div>
                        )}
                        <h3 className="font-bold text-lg sm:text-xl text-[var(--fg)] tracking-tight">
                          {item.role}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-[var(--fg-muted)] mt-0.5">
                          {item.organization}
                        </p>
                      </div>

                      <div className="font-mono text-xs text-[var(--fg-muted)] self-start sm:self-auto">
                        #0{idx + 1}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "font-bold mt-0.5",
                              isDiskominfo ? "text-[var(--accent)]" : "text-[var(--border)]"
                            )}
                          >
                            ▹
                          </span>
                          <span className="text-[var(--fg)]/90">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills Used */}
                    {item.skills && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]/50">
                        {item.skills.map((sk) => (
                          <span
                            key={sk}
                            className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
