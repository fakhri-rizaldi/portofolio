"use client";

/**
 * T-041 — components/layout/MobileMenu.tsx
 * Menu navigasi mobile fullscreen / slide-over:
 *   - FR-05: Muncul pada layar < 768px via tombol hamburger di Navbar
 *   - Render via React Portal ke document.body agar bebas dari containing block CSS header (transform)
 *   - Animasi transisi CSS halus, backdrop blur, lock body scroll saat terbuka
 *   - Desain editorial terminal: font besar, nomor urut (/01-/05), ThemeToggle, dan link sosial
 *   - Klik item -> tutup menu & scroll halus via Lenis (atau scrollIntoView)
 */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onOpenChange(false);

    // Berikan jeda transisi sebelum scroll
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.2 });
      } else {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 250);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-navigation"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[999] transition-visibility duration-300",
        open ? "visible pointer-events-auto" : "invisible pointer-events-none"
      )}
    >
      {/* ── Backdrop Overlay ── */}
      <div
        onClick={() => onOpenChange(false)}
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* ── Slide-over Drawer ── */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[var(--bg)] border-l border-[var(--border)] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out overflow-y-auto z-[1000]",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Mobile"
      >
        <div className="flex flex-col gap-6">
          {/* Header Drawer */}
          <div className="flex items-center justify-between border-b border-[var(--border)]/70 pb-4">
            <span className="font-mono text-xs text-[var(--accent)] tracking-wider uppercase font-semibold">
              // MENU NAVIGASI
            </span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--elev)] text-[var(--fg)] hover:text-[var(--accent)] transition-colors touch-manipulation active:scale-95"
              aria-label="Tutup menu navigasi"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Menu navigasi mobile">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={cn(
                    "group flex items-center justify-between py-3 px-3.5 rounded-lg transition-all min-h-[48px] touch-manipulation active:scale-[0.98]",
                    isActive
                      ? "bg-[var(--elev)] text-[var(--fg)] font-semibold border-l-2 border-[var(--accent)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--elev)]/60"
                  )}
                >
                  <span className="font-sans text-xl tracking-tight transition-transform group-hover:translate-x-1">
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

        {/* Footer Drawer: Tema & Kontak */}
        <div className="flex flex-col gap-4 pt-6 border-t border-[var(--border)]/70 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--fg-muted)] font-mono font-medium">TEMA SITUS</span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <a
              href="mailto:muhamadfakhri06@gmail.com"
              className="font-mono text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors truncate py-1 touch-manipulation"
            >
              muhamadfakhri06@gmail.com
            </a>
            <div className="flex items-center gap-3 pt-1 text-xs text-[var(--fg-muted)]">
              <a
                href="https://www.linkedin.com/in/muhamad-fakhri-rizaldi-399193292/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--fg)] underline underline-offset-4 py-1 touch-manipulation"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/sobatfakhri/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--fg)] underline underline-offset-4 py-1 touch-manipulation"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="/Muhammad_Fakhri_Rizaldi_Resume__Ind_Ver_.pdf"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)] text-[var(--accent)] font-medium py-1 touch-manipulation"
              >
                Unduh CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
