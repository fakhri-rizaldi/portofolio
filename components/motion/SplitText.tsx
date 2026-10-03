"use client";

/**
 * T-032 — components/motion/SplitText.tsx
 * Komponen reveal teks per huruf atau per kata.
 *
 * Implementasi: split manual (span per char/word) agar tidak bergantung
 * pada GSAP SplitText plugin versi premium.
 * Setiap span diberi --index CSS var untuk stagger via delay kalkulasi.
 *
 * Fitur:
 *   - type: "chars" | "words" — split per huruf atau per kata
 *   - reveal: slide-up per unit dengan stagger (AN-04)
 *   - Dibungkus gsap.matchMedia: reduced-motion hanya fade sekali (AN-10)
 *   - Screen reader: teks asli tetap ada via aria-label pada wrapper
 *
 * Cara pakai:
 *   <SplitText as="h1" type="words">Halo, saya Fakhri.</SplitText>
 */
import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitType = "chars" | "words";

interface SplitTextProps {
  children: string;
  as?: React.ElementType;
  type?: SplitType;
  className?: string;
  /** Delay sebelum animasi mulai (detik) */
  delay?: number;
  /** Stagger antar unit (detik) */
  stagger?: number;
  /** Trigger: 'scroll' (masuk viewport) atau 'immediate' (langsung) */
  trigger?: "scroll" | "immediate";
  /** Scroll start position jika trigger='scroll' */
  startPercent?: number;
  /** Apakah siap untuk dianimasikan (default: true) */
  ready?: boolean;
}

export function SplitText({
  children,
  as: Tag = "span",
  type = "words",
  className,
  delay = 0,
  stagger = 0.04,
  trigger = "scroll",
  startPercent = 20,
  ready = true,
}: SplitTextProps) {
  const wrapperRef = useRef<HTMLElement>(null);

  // Bagi teks menjadi unit-unit
  const units = useMemo(() => {
    if (type === "chars") {
      return children.split("").map((ch, i) => ({ text: ch === " " ? "\u00A0" : ch, key: i }));
    }
    return children.split(" ").map((word, i) => ({ text: word, key: i }));
  }, [children, type]);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const spans = wrapper.querySelectorAll<HTMLElement>("[data-split-unit]");
      if (!ready) {
        gsap.set(spans, { opacity: 0, y: 35 });
        return;
      }

      const mm = gsap.matchMedia();

      /* ── Normal motion ── */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          spans,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay,
            stagger,
            ...(trigger === "scroll"
              ? {
                  scrollTrigger: {
                    trigger: wrapper,
                    start: `top ${100 - startPercent}%`,
                    once: true,
                  },
                }
              : {}),
          }
        );
      });

      /* ── Reduced motion: fade tanpa geser ── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          wrapper,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay,
            ...(trigger === "scroll"
              ? {
                  scrollTrigger: {
                    trigger: wrapper,
                    start: `top ${100 - startPercent}%`,
                    once: true,
                  },
                }
              : {}),
          }
        );
      });

      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [type, delay, stagger, trigger, startPercent, ready] }
  );

  return (
    <Tag
      ref={wrapperRef as any}
      className={cn("inline", className)}
      aria-label={children}
    >
      {units.map(({ text, key }, i) => (
        <span
          key={key}
          data-split-unit
          className="inline-block overflow-hidden leading-[1.1]"
          aria-hidden="true"
          style={{ "--index": i } as React.CSSProperties}
        >
          <span className="inline-block">
            {text}
          </span>
          {/* Spasi antar kata jika split per kata */}
          {type === "words" && i < units.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
