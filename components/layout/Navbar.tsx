"use client";

/**
 * T-040 — components/layout/Navbar.tsx
 * Navbar utama portofolio:
 *   - FR-02: Klik item -> smooth scroll halus via useLenis()
 *   - FR-03: Scroll spy -> menandai menu aktif sesuai section yang tampak di viewport
 *   - FR-04: Compact & glassmorphism saat scroll melewati Hero, auto-hide saat scroll ke bawah dan muncul saat scroll ke atas
 *   - Integrasi ThemeToggle, tombol Kontak, dan status badge ketersediaan kerja
 */
import { useEffect, useState, useRef } from "react";
import { useLenis } from "./SmoothScrollProvider";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/motion";

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "Tentang" },
  { id: "skills", label: "Keahlian" },
  { id: "projects", label: "Proyek" },
  { id: "experience", label: "Pengalaman" },
  { id: "contact", label: "Kontak" },
];

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.2,
      });
    } else {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveSection(id);
  };

  // Scroll spy & compact / hide-on-scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // FR-04: Compact styling setelah lewat 60px
      setIsScrolled(currentScrollY > 60);

      // Hide saat scroll down drastis, show saat scroll up (hanya setelah lewat hero > 200px)
      if (currentScrollY > 200 && !mobileMenuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 10) {
          setIsVisible(false); // scroll down -> sembunyikan
        } else if (lastScrollY.current - currentScrollY > 10) {
          setIsVisible(true); // scroll up -> tampilkan
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // FR-03: Active section detection
      const scrollPosition = currentScrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      // Jika masih di paling atas
      if (currentScrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out",
          isVisible || mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "py-3 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]/70 shadow-sm"
            : "py-5 sm:py-6 bg-transparent"
        )}
      >
        <div className="container-main relative flex items-center justify-between min-h-[44px]">
          {/* Logo / Monogram Brand di Sisi Kiri */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-mono text-sm font-bold tracking-tighter text-[var(--fg)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 touch-manipulation py-2 pr-3"
            aria-label="Kembali ke atas (Hero)"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block animate-pulse" />
            <span>FAKHRI<span className="text-[var(--accent)]">.</span></span>
          </a>

          {/* Desktop Nav Items — Presisi di Sumbu Tengah Layar */}
          <nav
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-3.5 py-1.5 rounded-full border border-[var(--border)]/70 bg-[var(--bg)]/70 backdrop-blur-md shadow-sm"
            aria-label="Navigasi Utama"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "relative px-3.5 py-1 text-xs font-medium transition-colors rounded-full",
                    isActive
                      ? "text-[var(--fg)] font-semibold"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full -z-10 bg-[var(--border)]/70 transition-all"
                      style={{ willChange: "transform" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle + Contact CTA & Mobile Menu Trigger — Di Sisi Kanan */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <ThemeToggle />

            <div className="hidden sm:inline-block">
              <MagneticButton strength={0.25} radius={60}>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="inline-flex items-center justify-center h-8 px-3.5 rounded-md text-xs font-medium transition-all bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 active:scale-95"
                >
                  Hubungi
                </a>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button (Hamburger) - Area sentuh ramah jempol (≥44px) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenMobileMenu) {
                  onOpenMobileMenu();
                } else {
                  setMobileMenuOpen((prev) => !prev);
                }
              }}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--elev)]/60 text-[var(--fg)] hover:text-[var(--accent)] active:scale-95 transition-all touch-manipulation cursor-pointer"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
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
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* T-041: Menu Navigasi Layar Mobile (Rendered via Portal ke document.body) */}
      <MobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        activeSection={activeSection}
      />
    </>
  );
}
