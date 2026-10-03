"use client";

/**
 * T-030 — SmoothScrollProvider
 * Menginisialisasi Lenis smooth scroll dan menyinkronkannya dengan GSAP ScrollTrigger.
 *
 * Integrasi kritis (design.md §5.2):
 *   1. lenis.on('scroll', ScrollTrigger.update) — GSAP tahu posisi scroll Lenis
 *   2. gsap.ticker.add((time) => lenis.raf(time * 1000)) — Lenis berjalan di RAF GSAP
 *   3. gsap.ticker.lagSmoothing(0) — matikan lag smoothing agar tidak drift
 *   4. Cleanup lengkap saat unmount (destroy Lenis, remove ticker)
 *
 * Pola: Client Component isolasi; dipakai di app/layout.tsx atau app/page.tsx.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }

    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Reset ke atas jika URL tidak ada hash anchor
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    // 1. Sinkronkan Lenis → ScrollTrigger
    //    Setiap kali Lenis men-scroll, beritahu ScrollTrigger untuk update posisinya
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Jalankan Lenis lewat GSAP ticker (bukan requestAnimationFrame sendiri)
    //    Ini memastikan Lenis dan GSAP bergerak dalam satu loop RAF yang sama
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker unit: detik → Lenis butuh ms
    };
    gsap.ticker.add(tickerCallback);

    // 3. Matikan lag smoothing GSAP agar scroll tidak drift
    gsap.ticker.lagSmoothing(0);

    // Expose lenis ke window untuk debug (development only)
    if (process.env.NODE_ENV === "development") {
      (window as typeof window & { lenis: Lenis }).lenis = lenis;
    }

    // Cleanup saat komponen unmount
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

/**
 * useLenis — Hook untuk mengakses instance Lenis dari komponen child.
 * Berguna untuk scrollTo programatik (mis. dari Navbar).
 *
 * Cara pakai:
 *   const lenis = useLenis();
 *   lenis?.scrollTo("#projects", { duration: 1.2 });
 */
export function useLenis(): Lenis | null {
  // Mengambil instance dari window (di-set oleh provider di atas)
  if (typeof window === "undefined") return null;
  return (window as typeof window & { lenis?: Lenis }).lenis ?? null;
}
