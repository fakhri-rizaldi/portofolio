"use client";

/**
 * T-045 — components/sections/Projects.tsx
 * Section Proyek Portofolio:
 *   - CT-01: Data dari content/projects.ts
 *   - CT-02: Filter tag (Semua, Web, Data) dengan layout transition
 *   - AN-06: Kartu interaktif 3D TiltCard dengan glare effect + hover preview
 *   - Desain editorial terminal dengan metrik bisnis terverifikasi
 */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, type Project } from "@/content/projects";
import { TiltCard, MagneticButton } from "@/components/motion";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type FilterCategory = "Semua" | "Web" | "Data";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Semua");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "Semua") return true;
    return project.category === activeFilter;
  });

  const containerRef = useReveal<HTMLDivElement>({
    direction: "left",
    selector: ".project-card-wrap",
    stagger: 0.15,
    startPercent: 15,
  });

  return (
    <section
      id="projects"
      className="section-py relative overflow-hidden"
      aria-label="Karya dan Proyek Terpilih"
    >
      <div ref={containerRef} className="container-main flex flex-col gap-10 sm:gap-14">
        {/* Section Header */}
        <div className="project-card-wrap flex flex-col gap-3">
          <p className="eyebrow">// REKAYASA & PORTOFOLIO</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                className="font-bold tracking-tighter leading-tight text-[var(--fg)] max-w-[20ch]"
                style={{ fontSize: "var(--fs-h2)" }}
              >
                Karya Pilihan & <span className="text-[var(--accent)]">Implementasi Nyata</span>.
              </h2>
              <p className="max-w-[48ch] text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed mt-2">
                Aplikasi web skala produksi, integrasi payment gateway, dan dashboard analitik data historis dengan dampak bisnis riil.
              </p>
            </div>

            {/* CT-02: Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full border border-[var(--border)] bg-[var(--elev)]/60 backdrop-blur-xs self-start lg:self-end">
              {(["Semua", "Web", "Data"] as FilterCategory[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all",
                    activeFilter === tab
                      ? "bg-[var(--accent)] text-[var(--accent-fg)] font-semibold shadow-xs"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid Proyek (AN-06: 3D Tilt Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => {
            const isLarge = project.slug === "bedas-lapor-ai" || project.category === "Data" || idx === 0;

            return (
              <div
                key={project.slug}
                className={cn(
                  "project-card-wrap flex",
                  isLarge ? "lg:col-span-12" : "lg:col-span-6"
                )}
              >
                <TiltCard
                  maxTilt={6}
                  glareOpacity={0.15}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--elev)]/50 backdrop-blur-xs overflow-hidden flex flex-col justify-between group hover:border-[var(--accent)]/50 transition-all duration-300"
                >
                  <div className={cn("grid gap-6 p-6 sm:p-8", isLarge ? "lg:grid-cols-12" : "flex flex-col")}>
                    {/* Visual Thumbnail */}
                    <div
                      className={cn(
                        "relative aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] shrink-0",
                        isLarge ? "lg:col-span-7" : "w-full"
                      )}
                    >
                      {project.thumbnail ? (
                        <>
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          {/* Gradient overlay */}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent opacity-60"
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        /* Terminal HUD & AI Architecture Blueprint (Diskominfo Soreang) */
                        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-[var(--elev)] to-[var(--bg)] font-mono select-none">
                          {/* Blueprint Grid Pattern */}
                          <div
                            className="absolute inset-0 opacity-[0.06] pointer-events-none"
                            style={{
                              backgroundImage: `radial-gradient(var(--fg) 1px, transparent 1px)`,
                              backgroundSize: "16px 16px",
                            }}
                          />

                          {/* Top bar: Diskominfo Soreang context */}
                          <div className="relative z-10 flex items-center justify-between border-b border-[var(--border)]/70 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                              <span className="text-[11px] font-bold tracking-wider text-[var(--fg)]">
                                DISKOMINFO KAB. BANDUNG
                              </span>
                            </div>
                            <span className="text-[10px] text-[var(--fg-muted)]">
                              INTERNSHIP // AUG–SEP 2026
                            </span>
                          </div>

                          {/* Center: System Architecture Node Flow */}
                          <div className="relative z-10 my-auto py-2 flex flex-col gap-2.5">
                            <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                              [ DUAL-LAYER NLP &amp; SPATIAL ENGINE ]
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                              <div className="p-2 rounded border border-[var(--border)] bg-[var(--bg)]/80">
                                <p className="text-[9px] text-[var(--fg-muted)]">Input</p>
                                <p className="font-semibold text-[var(--fg)] mt-0.5">Aduan Warga</p>
                              </div>
                              <div className="p-2 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10">
                                <p className="text-[9px] text-[var(--accent)]">Model</p>
                                <p className="font-semibold text-[var(--fg)] mt-0.5">SVM + Gemini</p>
                              </div>
                              <div className="p-2 rounded border border-[var(--border)] bg-[var(--bg)]/80">
                                <p className="text-[9px] text-[var(--fg-muted)]">Output</p>
                                <p className="font-semibold text-[var(--fg)] mt-0.5">Disposisi Spasial</p>
                              </div>
                            </div>
                            <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed italic">
                              &ldquo;Klasifikasi aduan tiket fasilitas lingkungan otomatis &amp; perutean dinas cerdas di Kab. Bandung.&rdquo;
                            </p>
                          </div>

                          {/* Bottom bar: Tech Badges */}
                          <div className="relative z-10 pt-2 border-t border-[var(--border)]/70 flex items-center justify-between text-[10px] text-[var(--fg-muted)]">
                            <span className="text-[var(--accent)] font-medium">
                              ● Model NLP Mandiri + LLM Fallback
                            </span>
                            <span>Soreang, Jawa Barat</span>
                          </div>
                        </div>
                      )}

                      {/* Floating Category Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[var(--bg)]/90 backdrop-blur-sm border border-[var(--border)] font-mono text-[11px] font-semibold text-[var(--accent)]">
                        {project.category.toUpperCase()} // {project.year}
                      </div>
                    </div>

                    {/* Content Detail */}
                    <div className={cn("flex flex-col justify-between gap-5", isLarge ? "lg:col-span-5" : "")}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
                          <span>PROYEK 0{idx + 1}</span>
                          <span>•</span>
                          <span className="text-[var(--accent)] font-semibold">{project.category}</span>
                        </div>

                        <h3 className="font-bold text-xl sm:text-2xl text-[var(--fg)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
                          {project.description}
                        </p>

                        {/* Metrik Khusus (Untuk Data Project) */}
                        {project.metrics && (
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            {project.metrics.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg)]/80 flex flex-col"
                              >
                                <span className="font-mono text-[10px] text-[var(--fg-muted)] uppercase">
                                  {m.label}
                                </span>
                                <span className="font-mono text-sm font-bold text-[var(--accent)]">
                                  {m.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Features Bullet List */}
                        {!project.metrics && (
                          <ul className="flex flex-col gap-1.5 pt-1 text-xs text-[var(--fg-muted)]">
                            {project.features.slice(0, 3).map((f, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-[var(--accent)] font-bold mt-0.5">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Tech Stack Pills & Action Button */}
                      <div className="flex flex-col gap-4 pt-3 border-t border-[var(--border)]/60">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Action Link */}
                        <div className="flex items-center gap-3 pt-1">
                          {project.liveUrl && (
                            <MagneticButton strength={0.2} radius={50}>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-xs font-semibold bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-all active:scale-95 shadow-xs"
                              >
                                <span>Kunjungi Sistem</span>
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            </MagneticButton>
                          )}

                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1 h-9 px-3 rounded-md text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg)] transition-colors"
                          >
                            <span>Detail Dokumen</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
