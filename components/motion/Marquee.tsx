"use client";

/**
 * T-033 — components/motion/Marquee.tsx
 * Teks atau elemen yang berjalan horizontal tanpa henti.
 *
 * Aturan desain (skill 5, AN-05):
 *   - Maksimum SATU marquee per halaman — dokumentasikan di sini
 *   - CSS animation-based untuk performa (tidak ada JS per-frame)
 *   - Duplikat konten agar loop terasa seamless
 *   - Dimatikan saat reduced-motion (AN-10): tampil statis
 *   - Gap + ukuran font bisa dikustomisasi
 *
 * Cara pakai:
 *   <Marquee speed={40}>
 *     <span>PHP</span><span>Laravel</span><span>MySQL</span>
 *   </Marquee>
 */
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  children: React.ReactNode;
  /** Kecepatan dalam px/detik (default: 40) */
  speed?: number;
  /** Arah: 'left' | 'right' (default: 'left') */
  direction?: "left" | "right";
  /** Jeda saat hover (default: true) */
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  /** Gap antar item (Tailwind class, default: 'gap-8') */
  gap?: string;
}

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  itemClassName,
  gap = "gap-8",
}: MarqueeProps) {
  const reduced = useReducedMotion();

  // Jika reduced-motion: tampilkan statis
  if (reduced) {
    return (
      <div
        className={cn("flex flex-wrap items-center overflow-hidden", gap, className)}
        aria-label="Teknologi marquee (animasi dimatikan)"
      >
        <div className={cn("flex items-center flex-wrap", gap, itemClassName)}>
          {children}
        </div>
      </div>
    );
  }

  // Durasi: lebar konten ÷ kecepatan
  // Kita set fixed duration berdasarkan speed; CSS handles the loop
  const duration = `${speed}s`;

  return (
    <div
      className={cn(
        "flex overflow-hidden select-none",
        pauseOnHover && "group",
        className
      )}
      aria-hidden="true"
    >
      {/* Dua salinan agar loop seamless */}
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            "flex shrink-0 items-center",
            gap,
            itemClassName,
            "marquee-track"
          )}
          style={{
            animation: `marquee-${direction} ${duration} linear infinite`,
            animationPlayState: "running",
          }}
        >
          {children}
        </div>
      ))}

      {/* Keyframes inline — lebih aman daripada globals.css karena scope ke komponen */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .group:hover .marquee-track {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>
    </div>
  );
}
