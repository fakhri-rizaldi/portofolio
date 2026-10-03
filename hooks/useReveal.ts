"use client";

/**
 * T-031 — hooks/useReveal.ts
 * Hook scroll-reveal: slide-in dari kiri/kanan/bawah dengan stagger opsional.
 *
 * Fitur:
 *   - direction: 'up' | 'left' | 'right' (sesuai tabel design.md 3.2)
 *   - selector: CSS selector untuk elemen anak → stagger otomatis
 *   - Dibungkus gsap.matchMedia (T-037): reduced-motion hanya fade
 *   - once: true — animasi berjalan sekali saja (AN-01)
 *   - start: "top 80%" — trigger saat 20% elemen masuk viewport (AN-01)
 *
 * Cara pakai:
 *   const ref = useReveal<HTMLDivElement>({ direction: "left" });
 *   <div ref={ref}>...</div>
 *
 *   // Dengan stagger pada anak:
 *   const ref = useReveal<HTMLUListElement>({ direction: "up", selector: "li" });
 */
import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type RevealDirection = "up" | "left" | "right";

interface UseRevealOptions {
  direction?: RevealDirection;
  /** Jarak geser dalam px (default: 60 untuk up, 80 untuk left/right) */
  distance?: number;
  /** Durasi animasi dalam detik (default: 0.8) */
  duration?: number;
  /** Delay awal dalam detik (default: 0) */
  delay?: number;
  /** CSS selector elemen anak untuk stagger (default: undefined = animasi seluruh container) */
  selector?: string;
  /** Jeda antar elemen stagger dalam detik (default: 0.08) */
  stagger?: number;
  /** Animasi berjalan sekali saja (default: true) */
  once?: boolean;
  /** Persentase elemen yang harus terlihat sebelum trigger, 0-100 (default: 20) */
  startPercent?: number;
}

const ORIGIN: Record<RevealDirection, gsap.TweenVars> = {
  up:    { y: 60,  x: 0  },
  left:  { x: 80,  y: 0  },
  right: { x: -80, y: 0  },
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
): RefObject<T | null> {
  const {
    direction = "up",
    distance,
    duration = 0.8,
    delay = 0,
    selector,
    stagger = 0.08,
    once = true,
    startPercent = 20,
  } = options;

  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      const getTargets = (): HTMLElement | HTMLElement[] => {
        if (!selector) return el;
        if (selector === "> *" || selector === ":scope > *") {
          return Array.from(el.children) as HTMLElement[];
        }
        const scopedSelector = selector.startsWith(">") ? `:scope ${selector}` : selector;
        return gsap.utils.toArray<HTMLElement>(el.querySelectorAll(scopedSelector));
      };

      /* ── Normal motion ── */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const origin = { ...ORIGIN[direction] };

        // Override distance jika diberikan
        if (distance !== undefined) {
          if ("y" in origin && origin.y !== 0) origin.y = direction === "up" ? distance : -distance;
          if ("x" in origin && origin.x !== 0) origin.x = direction === "left" ? distance : -distance;
        }

        const targets = getTargets();

        gsap.fromTo(
          targets,
          { opacity: 0, ...origin },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
            stagger: selector ? stagger : 0,
            scrollTrigger: {
              trigger: el,
              start: `top ${100 - startPercent}%`,
              once,
            },
          }
        );
      });

      /* ── Reduced motion: hanya fade, tanpa geser (AN-10) ── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const targets = getTargets();

        gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay,
            stagger: 0,
            scrollTrigger: {
              trigger: el,
              start: `top ${100 - startPercent}%`,
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    {
      scope: containerRef,
      dependencies: [direction, distance, duration, delay, selector, stagger, once, startPercent],
    }
  );

  return containerRef;
}
