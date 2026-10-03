"use client";

/**
 * T-034 — components/motion/TiltCard.tsx
 * Kartu dengan efek 3D tilt mengikuti posisi kursor saat hover.
 *
 * Fitur:
 *   - CSS perspective + GSAP rotateX/rotateY untuk animasi halus
 *   - Highlight overlay ikut bergerak (efek "cahaya" mewah)
 *   - Hanya aktif di pointer:fine + no reduced-motion (T-037)
 *   - Cleanup proper pada unmount
 *
 * Cara pakai:
 *   <TiltCard className="rounded-xl p-6 bg-elev">
 *     <ProjectCardContent />
 *   </TiltCard>
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Intensitas tilt dalam derajat (default: 8) */
  maxTilt?: number;
  /** Intensitas efek highlight (default: 0.15) */
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  glareOpacity = 0.12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card || !glare) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
            const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1

            gsap.to(card, {
              rotateX: -dy * maxTilt,
              rotateY: dx * maxTilt,
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 800,
            });

            // Posisi highlight: berlawanan arah kursor
            gsap.to(glare, {
              opacity: glareOpacity,
              x: `${(dx * 50) + 50}%`,
              y: `${(dy * 50) + 50}%`,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: "power3.out",
            });
            gsap.to(glare, {
              opacity: 0,
              duration: 0.4,
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
            gsap.set(card, { rotateX: 0, rotateY: 0 });
          };
        }
      );

      mm.add(
        "(pointer: coarse), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(card, { rotateX: 0, rotateY: 0 });
          gsap.set(glare, { opacity: 0 });
        }
      );

      return () => mm.revert();
    },
    { scope: cardRef, dependencies: [maxTilt, glareOpacity] }
  );

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {/* Highlight overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
          top: "50%",
          left: "50%",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
