"use client";

/**
 * components/sections/LeafletMap.tsx
 * Peta interaktif Leaflet asli dengan tile CartoDB Dark Matter:
 *   - Koordinat: Bandung (-6.9175, 107.6191)
 *   - Custom terracotta marker dengan efek pulsing radar
 *   - ScrollWheelZoom terkunci secara aman agar tidak menjebak scroll halaman portofolio
 *   - Live local time (WIB / UTC+7)
 */
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

export function LeafletMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [localTime, setLocalTime] = useState<string>("");
  const [isInteractive, setIsInteractive] = useState<boolean>(false);

  // Live WIB clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        new Intl.DateTimeFormat("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Leaflet initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current || (mapContainerRef.current as any)._leaflet_id) return;

    let isMounted = true;

    // Dynamic import to avoid any SSR issues
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      if (mapInstanceRef.current || (mapContainerRef.current as any)._leaflet_id) return;

      const BANDUNG_COORDS: [number, number] = [-6.9175, 107.6191];

      const map = L.map(mapContainerRef.current, {
        center: BANDUNG_COORDS,
        zoom: 12,
        scrollWheelZoom: false, // Prevent scroll trapping
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Tile OpenStreetMap resmi (100% gratis tanpa watermark dan tanpa API key)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        className: "osm-dark-tiles",
      }).addTo(map);

      // Custom terracotta pulsing radar marker
      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; transform: translate(-10px, -10px);">
            <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: rgba(196, 81, 43, 0.3); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #c4512b; background: rgba(196, 81, 43, 0.5);"></div>
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 8px #c4512b;"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker(BANDUNG_COORDS, { icon: customIcon }).addTo(map);

      // Popup
      marker.bindPopup(`
        <div style="font-family: monospace; font-size: 11px; padding: 4px; color: #1e293b;">
          <strong>Bandung, Jawa Barat</strong><br/>
          <span>Base Operasional // UNIKOM</span>
        </div>
      `);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const toggleInteractivity = () => {
    if (!mapInstanceRef.current) return;
    const next = !isInteractive;
    setIsInteractive(next);
    if (next) {
      mapInstanceRef.current.scrollWheelZoom.enable();
    } else {
      mapInstanceRef.current.scrollWheelZoom.disable();
    }
  };

  const resetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([-6.9175, 107.6191], 12);
  };

  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--elev)]/60 shadow-sm">
      {/* Header bar bergaya terminal radar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]/70 z-10 select-none">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="font-mono text-xs font-semibold text-[var(--fg)] tracking-tight">
            BANDUNG, ID // LEAFLET RADAR
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[var(--fg-muted)] tabular-nums">
            {localTime ? `${localTime} WIB` : "UTC+7"}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={resetView}
              title="Reset ke Bandung"
              className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--border)] bg-[var(--elev)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
            >
              RESET
            </button>
            <button
              type="button"
              onClick={toggleInteractivity}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                isInteractive
                  ? "bg-[var(--accent)] text-[var(--accent-fg)] border-[var(--accent)] font-semibold"
                  : "bg-[var(--elev)] text-[var(--fg-muted)] border-[var(--border)] hover:text-[var(--fg)]"
              }`}
            >
              {isInteractive ? "SCROLL ZOOM: ON" : "ZOOM: OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative flex-1 w-full min-h-[240px]">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Ambient Corner Grid Overlays */}
        <div className="pointer-events-none absolute bottom-2 left-3 z-[400] font-mono text-[10px] text-[var(--fg-muted)] bg-[var(--bg)]/80 backdrop-blur-xs px-2 py-1 rounded border border-[var(--border)]/60">
          6°55&apos;03.0&quot;S 107°37&apos;08.8&quot;E
        </div>
      </div>
    </div>
  );
}
