"use client";

/**
 * T-036 — components/layout/Preloader.tsx
 * Preloader singkat (≤ 2 detik) yang muncul saat halaman pertama kali dimuat.
 * Setelah selesai, menghilang dan memberi sinyal ke parent bahwa hero bisa masuk (AN-03).
 *
 * Animasi:
 *   1. Nama "Fakhri" muncul huruf per huruf (0–1 dtk)
 *   2. Counter 0→100% (progress palsu, hanya dekoratif)
 *   3. Overlay slide up → hilang (1–1.8 dtk)
 *   4. Callback onComplete dipanggil
 *
 * Reduced-motion: langsung hilang setelah 300ms (tidak ada animasi).
 *
 * Cara pakai (di app/page.tsx atau layout):
 *   const [loaded, setLoaded] = useState(false);
 *   <Preloader onComplete={() => setLoaded(true)} />
 *   {loaded && <MainContent />}
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (reduced) {
      // Reduced motion: langsung hilang
      setTimeout(() => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            overlay.style.display = "none";
            onComplete?.();
          },
        });
      }, 300);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          overlay.style.display = "none";
          onComplete?.();
        },
      });

      // 1. Nama muncul dari bawah
      if (nameRef.current) {
        const letters = nameRef.current.querySelectorAll("[data-letter]");
        tl.fromTo(
          letters,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
          0
        );
      }

      // 2. Counter naik 0 → 100
      tl.to({ val: 0 }, {
        val: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: function () {
          setCount(Math.round(this.targets()[0].val));
        },
      }, 0.1);

      // 3. Slide up overlay
      tl.to(overlay, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
      }, "+=0.1");
    }, overlay);

    return () => ctx.revert();
  }, [reduced, onComplete]);

  const NAME = "Fakhri";

  return (
    <div
      id="preloader-overlay"
      data-preloader-overlay
      ref={overlayRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--bg)" }}
      aria-label="Memuat halaman..."
      role="status"
    >
      {/* Nama */}
      <span
        ref={nameRef}
        className="font-sans font-semibold tracking-tighter select-none overflow-hidden"
        style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "var(--fg)", lineHeight: 1 }}
        aria-hidden="true"
      >
        {NAME.split("").map((ch, i) => (
          <span
            key={i}
            data-letter
            className="inline-block"
            style={{ color: ch === "i" ? "var(--accent)" : "var(--fg)" }}
          >
            {ch}
          </span>
        ))}
      </span>

      {/* Counter */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className="h-px bg-border flex-1 origin-left"
          style={{ width: `${count}px`, maxWidth: "160px", backgroundColor: "var(--accent)", transition: "width 0.05s linear" }}
          aria-hidden="true"
        />
        <span
          ref={progressRef}
          className="font-mono text-sm tabular-nums"
          style={{ color: "var(--fg-muted)" }}
          aria-hidden="true"
        >
          {count}%
        </span>
      </div>
    </div>
  );
}
