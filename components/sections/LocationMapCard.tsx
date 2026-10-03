"use client";

/**
 * components/sections/LocationMapCard.tsx
 * Kartu Lokasi Bandung dengan visualisasi peta terminal/radar bergaya Signal & Ink:
 *   - Koordinat geografis Bandung: 6.9175° S, 107.6191° E
 *   - Live clock waktu lokal Bandung (WIB / UTC+7)
 *   - Pin radar berkedip di atas kontur grid topografi mini
 *   - Estetika editorial gelap dengan aksen terracotta
 */
import { useEffect, useState } from "react";

export function LocationMapCard() {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      // Waktu Indonesia Barat (WIB, UTC+7)
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--elev)]/60 backdrop-blur-xs p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[var(--accent)]/50 transition-colors"
      aria-label="Lokasi domisili Bandung"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="font-mono text-xs font-semibold text-[var(--fg)] tracking-tight">
            BANDUNG, INDONESIA
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--fg-muted)] tabular-nums">
          {localTime ? `${localTime} WIB` : "UTC+7"}
        </span>
      </div>

      {/* Visual Map / Radar Area */}
      <div className="relative h-28 w-full rounded-lg border border-[var(--border)]/60 bg-[var(--bg)]/90 overflow-hidden flex items-center justify-center">
        {/* Topography & Coordinate Grid Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30 text-[var(--fg-muted)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          {/* Stylized Bandung elevation contour waves */}
          <path
            d="M -20 70 Q 60 40 140 60 T 300 50 T 450 65"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M -10 90 Q 70 65 150 85 T 320 75 T 450 85"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.25"
          />
        </svg>

        {/* Radar Range Rings centered on Bandung */}
        <div className="absolute w-24 h-24 rounded-full border border-[var(--accent)]/30 pointer-events-none" />
        <div className="absolute w-14 h-14 rounded-full border border-[var(--accent)]/50 pointer-events-none" />

        {/* Pulsing Pin Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-5 w-5 rounded-full bg-[var(--accent)] opacity-40" />
            <span className="h-3 w-3 rounded-full bg-[var(--accent)] shadow-md" />
          </div>
          <span className="mt-1 font-mono text-[10px] font-bold text-[var(--accent)] bg-[var(--bg)]/90 px-1.5 py-0.5 rounded border border-[var(--accent)]/40 shadow-xs">
            BDG // BASE
          </span>
        </div>

        {/* Corner coordinates label */}
        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[var(--fg-muted)] opacity-60">
          LAT: 6.9175° S
        </span>
        <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[var(--fg-muted)] opacity-60">
          LON: 107.6191° E
        </span>
      </div>

      {/* Footer Subtext */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--fg-muted)] z-10 pt-0.5">
        <span>KOTA BANDUNG, JAWA BARAT</span>
        <span className="text-[var(--accent)] text-[10px]">AKTIF // TERHUBUNG</span>
      </div>
    </div>
  );
}
