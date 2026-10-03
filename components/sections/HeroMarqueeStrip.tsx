"use client";

/**
 * components/sections/HeroMarqueeStrip.tsx
 * Strip Motion Graphic & Marquee Penghubung antara Hero dan About:
 *   - Menghilangkan area kosong antara salam pembuka dan profil latar belakang
 *   - Running ticker Marquee horizontal dengan kata kunci keahlian riil
 *   - Visualizer gelombang sinyal & telemetri terminal real-time
 */
import { Marquee } from "@/components/motion/Marquee";

const MARQUEE_ITEMS = [
  "FULL STACK ENGINEERING",
  "NLP DUAL-LAYER MODEL",
  "BEDAS LAPOR-AI // SOREANG",
  "LEAFLET SPATIAL HEATMAP",
  "LARAVEL 11 & INERTIA.JS",
  "PYTHON MACHINE LEARNING",
  "MIDTRANS PAYMENT GATEWAY",
  "REST API & WEBSOCKET",
  "UNIVERSITAS KOMPUTER INDONESIA",
];

export function HeroMarqueeStrip() {
  return (
    <div
      className="w-full border-y border-[var(--border)] bg-[var(--elev)]/40 backdrop-blur-xs py-3 overflow-hidden select-none"
      aria-hidden="true"
    >
      <Marquee speed={28} direction="left" pauseOnHover={false} gap="gap-10">
        {MARQUEE_ITEMS.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 font-mono text-xs text-[var(--fg-muted)]">
            <span className="text-[var(--accent)] font-bold text-sm">✦</span>
            <span className="font-semibold tracking-wider text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
              {item}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
