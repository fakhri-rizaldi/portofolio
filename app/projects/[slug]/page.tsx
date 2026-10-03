import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, type Project } from "@/content/projects";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MagneticButton } from "@/components/motion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan — Fakhri",
    };
  }

  return {
    title: `${project.title} — Detail Dokumen & Portofolio Fakhri`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Fakhri Portfolio`,
      description: project.summary,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[var(--accent-fg)]">
      {/* ─── Top Header Navigation ─── */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="container-main h-16 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            <span>Kembali ke Portofolio</span>
          </Link>

          {/* Breadcrumb center */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
            <span>fakhri.dev</span>
            <span>/</span>
            <span>projects</span>
            <span>/</span>
            <span className="text-[var(--accent)] font-semibold">{project.slug}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-semibold bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-all shadow-xs"
              >
                <span>Buka Demo</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="container-main py-10 sm:py-16 flex flex-col gap-12 sm:gap-16">
        {/* Project Header Info */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md bg-[var(--elev)] border border-[var(--border)] font-mono text-xs font-bold text-[var(--accent)]">
              {project.category.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-[var(--fg-muted)]">//</span>
            <span className="text-xs font-mono text-[var(--fg-muted)]">PERIODE: {project.year}</span>
            {project.slug === "bedas-lapor-ai" && (
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
                DISKOMINFO SOREANG · INTERNSHIP
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1
              className="font-bold tracking-tight text-[var(--fg)] leading-tight max-w-[28ch]"
              style={{ fontSize: "clamp(2rem, 3.5vw + 1rem, 3.5rem)" }}
            >
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-[var(--fg-muted)] leading-relaxed max-w-[65ch]">
              {project.description}
            </p>
          </div>

          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--elev)]/60 font-mono text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-[var(--fg-muted)] uppercase text-[10px]">Kategori</span>
              <span className="font-semibold text-[var(--fg)]">{project.category} Engineering</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[var(--fg-muted)] uppercase text-[10px]">Tahun Pengerjaan</span>
              <span className="font-semibold text-[var(--fg)]">{project.year}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[var(--fg-muted)] uppercase text-[10px]">Status Proyek</span>
              <span className="font-semibold text-[var(--accent)]">
                {project.slug === "bedas-lapor-ai" ? "Arsip Magang Diskominfo" : "Terverifikasi Produksi"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[var(--fg-muted)] uppercase text-[10px]">Tautan Langsung</span>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Kunjungi Web ↗</span>
                </a>
              ) : (
                <span className="text-[var(--fg-muted)]">Sistem Khusus Internal</span>
              )}
            </div>
          </div>
        </section>

        {/* ─── Hero Visual / Architecture Showcase ─── */}
        <section className="flex flex-col gap-4">
          <p className="eyebrow">// VISUAL &amp; SISTEM ARSITEKTUR</p>

          {project.thumbnail ? (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--elev)]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            /* Technical Blueprint Frame for BEDAS Lapor-AI */
            <div className="relative rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--elev)] to-[var(--bg)] p-6 sm:p-10 font-mono overflow-hidden">
              {/* Radial dots */}
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(var(--fg) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 flex flex-col gap-8">
                {/* Header Blueprint */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[var(--accent)] font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                      <span>ARSITEKTUR RESMI SISTEM MAGANG</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg)] mt-1">
                      BEDAS Lapor-AI — Diskominfo Kabupaten Bandung
                    </h3>
                  </div>
                  <div className="text-left sm:text-right text-xs text-[var(--fg-muted)]">
                    <p>Lokasi: Soreang, Jawa Barat</p>
                    <p>Periode: Agustus – September 2026</p>
                  </div>
                </div>

                {/* Architecture Pipeline Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/90 flex flex-col gap-2">
                    <span className="text-[10px] text-[var(--accent)] font-bold">// 01. INGESTION</span>
                    <h4 className="font-bold text-sm text-[var(--fg)]">Pelaporan Warga</h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Warga mengirimkan aduan fasilitas lingkungan lewat portal web responsif.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/90 flex flex-col gap-2">
                    <span className="text-[10px] text-[var(--accent)] font-bold">// 02. PREPROCESSING</span>
                    <h4 className="font-bold text-sm text-[var(--fg)]">NLP Pipeline</h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Pembersihan teks Bahasa Indonesia, stopwords, tokenisasi, dan ekstraksi TF-IDF.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 flex flex-col gap-2">
                    <span className="text-[10px] text-[var(--accent)] font-bold">// 03. DUAL-LAYER AI</span>
                    <h4 className="font-bold text-sm text-[var(--fg)]">SVM + Gemini API</h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Klasifikasi paralel model Python lokal dengan fallback zero-shot LLM &amp; deteksi anomali.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/90 flex flex-col gap-2">
                    <span className="text-[10px] text-[var(--accent)] font-bold">// 04. DISPOSISI</span>
                    <h4 className="font-bold text-sm text-[var(--fg)]">Spatial &amp; WebSocket</h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Reverse geocoding OSM, heatmap klaster Leaflet, dan perutean dinas real-time via Laravel Reverb.
                    </p>
                  </div>
                </div>

                {/* Highlights Note */}
                <div className="p-4 rounded-xl border border-[var(--border)]/70 bg-[var(--elev)]/70 text-xs text-[var(--fg-muted)] flex items-start gap-3">
                  <span className="text-[var(--accent)] text-base">ℹ</span>
                  <p className="leading-relaxed">
                    Data sistem ini merupakan hasil karya nyata masa magang di Diskominfo Soreang. Seluruh data arsitektur, integrasi NLP lokal, zero-shot LLM, serta visualisasi spasial dirancang untuk mengotomatisasi disposisi tiket kedinasan secara terstruktur.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── Gallery Showcase (If multiple images exist) ─── */}
        {project.gallery.length > 1 && (
          <section className="flex flex-col gap-4">
            <p className="eyebrow">// DOKUMENTASI ANTARMUKA &amp; FITUR</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((imgSrc, imgIdx) => (
                <div
                  key={imgIdx}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--elev)]"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.title} - Tampilan ${imgIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="font-mono text-[11px] text-[var(--fg)] bg-[var(--bg)]/90 px-2 py-0.5 rounded border border-[var(--border)]">
                      Modul {imgIdx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Features & Technical Contributions ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="eyebrow">// PENCAPAIAN TEKNIS &amp; FITUR UTAMA</p>
            <div className="flex flex-col gap-3">
              {project.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--elev)]/50 flex items-start gap-3"
                >
                  <span className="font-mono text-xs font-bold text-[var(--accent)] mt-0.5">
                    0{fIdx + 1}.
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--fg)] leading-relaxed">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics & Tech Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {project.metrics && (
              <div className="flex flex-col gap-3">
                <p className="eyebrow">// METRIK &amp; HASIL RIIL</p>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--elev)] flex flex-col gap-1"
                    >
                      <span className="font-mono text-[10px] text-[var(--fg-muted)] uppercase">
                        {m.label}
                      </span>
                      <span className="font-mono text-base font-bold text-[var(--accent)]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <p className="eyebrow">// STACK TEKNOLOGI DIGUNAKAN</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--elev)] text-[var(--fg)] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Project Pagination (Next / Prev) ─── */}
        <section className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--elev)]/40 hover:bg-[var(--elev)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all w-full sm:w-auto"
          >
            <span>←</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[var(--fg-muted)] uppercase">Proyek Sebelumnya</span>
              <span className="font-semibold text-[var(--fg)]">{prevProject.title}</span>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center justify-end gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--elev)]/40 hover:bg-[var(--elev)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all w-full sm:w-auto text-right"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--fg-muted)] uppercase">Proyek Selanjutnya</span>
              <span className="font-semibold text-[var(--fg)]">{nextProject.title}</span>
            </div>
            <span>→</span>
          </Link>
        </section>
      </main>

      {/* ─── Minimal Detail Footer ─── */}
      <footer className="border-t border-[var(--border)] py-6 bg-[var(--elev)]/30">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--fg-muted)]">
          <span>© 2026 Muhammad Fakhri Rizaldi</span>
          <div className="flex items-center gap-4">
            <Link href="/#projects" className="hover:text-[var(--fg)] transition-colors">
              Portofolio
            </Link>
            <span>•</span>
            <Link href="/#about" className="hover:text-[var(--fg)] transition-colors">
              Tentang
            </Link>
            <span>•</span>
            <Link href="/#contact" className="hover:text-[var(--fg)] transition-colors">
              Kontak
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
