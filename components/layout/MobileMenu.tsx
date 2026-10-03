"use client";

/**
 * T-041 — components/layout/MobileMenu.tsx
 * Menu navigasi mobile fullscreen / slide-over (shadcn Sheet):
 *   - FR-05: Muncul pada layar < 768px via tombol hamburger di Navbar
 *   - Desain editorial terminal: font besar, indikator nomor (01, 02..), status ketersediaan
 *   - Klik link -> tutup menu & scroll halus ke section tujuan via useLenis()
 *   - Integrasi tombol Unduh CV, ThemeToggle, dan email langsung
 */
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLenis } from "./SmoothScrollProvider";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./Navbar";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSection?: string;
}

export function MobileMenu({ open, onOpenChange, activeSection }: MobileMenuProps) {
  const lenis = useLenis();

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onOpenChange(false);

    // Beri sedikit jeda agar sheet menutup halus sebelum scrolling
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[var(--bg)] border-l border-[var(--border)] p-6 flex flex-col justify-between"
      >
        <div className="flex flex-col gap-8 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[var(--accent)] tracking-wider uppercase font-semibold">
              // MENU NAVIGASI
            </span>
            <SheetTitle className="sr-only">Menu Navigasi Mobile</SheetTitle>
            <SheetDescription className="sr-only">Navigasi utama untuk tampilan layar ponsel</SheetDescription>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2" aria-label="Menu navigasi mobile">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={cn(
                    "group flex items-baseline justify-between py-3 px-3 rounded-lg transition-all",
                    isActive
                      ? "bg-[var(--elev)] text-[var(--fg)] font-semibold"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--elev)]/60"
                  )}
                >
                  <span className="font-sans text-xl sm:text-2xl tracking-tight transition-transform group-hover:translate-x-1">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-[var(--accent)] tracking-wider">
                    /{formattedIndex}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer Sheet: Kontak Cepat & Theme Toggle */}
        <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border)]/70">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--fg-muted)] font-mono">TEMA SITUS</span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <a
              href="mailto:muhamadfakhri06@gmail.com"
              className="font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors truncate"
            >
              muhamadfakhri06@gmail.com
            </a>
            <div className="flex items-center gap-3 pt-1 text-xs text-[var(--fg-muted)]">
              <a
                href="https://www.linkedin.com/in/muhamad-fakhri-rizaldi-399193292/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--fg)] underline underline-offset-4"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/sobatfakhri/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--fg)] underline underline-offset-4"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="/Muhammad_Fakhri_Rizaldi_Resume__Ind_Ver_.pdf"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)] text-[var(--accent)] font-medium"
              >
                Unduh CV
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
