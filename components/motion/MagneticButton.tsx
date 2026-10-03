"use client";

/**
 * T-034 — components/motion/MagneticButton.tsx
 * Wrapper yang memberi efek "magnetic" pada children: elemen mengikuti kursor
 * ketika mouse berada di dekatnya, dan kembali ke posisi asal saat mouse pergi.
 *
 * Fitur:
 *   - Hanya aktif di perangkat pointer:fine (desktop dengan mouse) — design.md §6
 *   - Dibungkus gsap.matchMedia agar mematuhi reduced-motion (T-037)
 *   - Tidak ada useState untuk posisi → tidak ada re-render per frame (skill 3.B)
 *   - GSAP quickTo untuk performa tinggi
 *
 * Cara pakai:
 *   <MagneticButton>
 *     <button>Lihat Proyek</button>
 *   </MagneticButton>
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Kekuatan magnetic: 0-1, semakin besar semakin kuat (default: 0.35) */
  strength?: number;
  /** Jarak (px) kursor harus masuk untuk efek aktif (default: 80) */
  radius?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  radius = 80,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = wrapRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          // quickTo: jauh lebih cepat dari gsap.to per-frame
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              xTo(dx * strength);
              yTo(dy * strength);
            } else {
              xTo(0);
              yTo(0);
            }
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("mousemove", handleMouseMove);
          el.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            gsap.set(el, { x: 0, y: 0 });
          };
        }
      );

      /* ── coarse pointer / reduced-motion: tidak ada efek ── */
      mm.add(
        "(pointer: coarse), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(el, { x: 0, y: 0 });
        }
      );

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [strength, radius] }
  );

  return (
    <div
      ref={wrapRef}
      className={cn("inline-block", className)}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
