"use client";

/**
 * T-033 — hooks/useParallax.ts
 * Hook parallax ringan: elemen bergerak lebih lambat/cepat dari scroll.
 *
 * Fitur:
 *   - speed: faktor parallax (positif = bergerak searah scroll, negatif = berlawanan)
 *   - Otomatis dimatikan di mobile (max-width: 767px) dan reduced-motion (AN-10, design.md §6)
 *   - Hanya menganimasikan `transform` (NF-03)
 *
 * Cara pakai:
 *   const ref = useParallax<HTMLDivElement>(0.3); // bergerak 30% dari scroll
 *   <div ref={ref}>...</div>
 */
import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      /* ── Desktop + no reduced-motion: aktifkan parallax ── */
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(el, {
            y: () => el.offsetHeight * speed * -1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      );

      /* ── Mobile atau reduced-motion: tidak ada parallax ── */
      mm.add(
        "(max-width: 767px), (prefers-reduced-motion: reduce)",
        () => {
          // Reset transform jika sebelumnya ada
          gsap.set(el, { y: 0 });
        }
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed] }
  );

  return ref;
}
