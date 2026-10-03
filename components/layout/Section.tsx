/**
 * T-022 — Komponen Layout: Section
 * Pola standar tiap section: eyebrow label (opsional) → judul H2 → slot konten.
 * Spacing vertikal konsisten via CSS var(--section-py).
 *
 * Server Component — interaktivitas animasi ditangani oleh parent/children Client.
 *
 * Catatan eyebrow: maksimum ceil(7 section / 3) = 3 kemunculan di seluruh halaman.
 * Jangan tambahkan eyebrow di setiap section (lihat visual.md bagian 4 & skill 4.7).
 */
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Label eyebrow mono uppercase — pakai maksimum 3x di seluruh halaman */
  eyebrow?: string;
  /** Judul H2 section */
  heading?: string;
  /** Ubah tag semantik wrapping element */
  as?: "section" | "div" | "article";
  /** Sembunyikan padding vertikal (untuk section dengan hero atau full-bleed) */
  noPadding?: boolean;
}

export function Section({
  children,
  id,
  className,
  containerClassName,
  eyebrow,
  heading,
  as: Tag = "section",
  noPadding = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(!noPadding && "section-py", className)}
    >
      <Container className={containerClassName}>
        {/* Eyebrow + heading hanya di-render jika disediakan */}
        {(eyebrow || heading) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <p className="eyebrow mb-3" aria-label={eyebrow}>
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className="font-sans font-semibold tracking-tight"
                style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1 }}
              >
                {heading}
              </h2>
            )}
          </div>
        )}
        {children}
      </Container>
    </Tag>
  );
}
