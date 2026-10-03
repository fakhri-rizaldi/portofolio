"use client";

/**
 * T-035 — components/layout/CustomCursor.tsx
 * Kursor kustom untuk perangkat desktop dengan mouse (pointer:fine).
 *
 * State kursor:
 *   - default  : dot kecil (8px)
 *   - hover    : ring lebih besar (40px) saat di atas a, button, [data-cursor]
 *   - hidden   : tidak terlihat (saat keluar window)
 *
 * Teknis:
 *   - GSAP quickTo: tidak ada re-render React per frame (skill 3.B)
 *   - Hanya render/aktif jika window.matchMedia('(pointer: fine)') true
 *   - Semua interaksi: CSS class swap + GSAP scale/opacity
 *   - Global cursor default disembunyikan via CSS pada pointer:fine (lihat globals.css)
 *
 * Cara pakai: pasang di layout.tsx di luar ScrollProvider.
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type CursorState = "default" | "hover" | "hidden";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  // Deteksi pointer:fine hanya di client
  useEffect(() => {
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickTo untuk performa: tidak ada setState
    const xDot  = gsap.quickTo(dot,  "x", { duration: 0.1, ease: "none" });
    const yDot  = gsap.quickTo(dot,  "y", { duration: 0.1, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const setState = (state: CursorState) => {
      const isHover  = state === "hover";
      const isHidden = state === "hidden";

      gsap.to(ring, {
        scale:   isHover ? 2.5 : 1,
        opacity: isHidden ? 0 : isHover ? 0.5 : 0.7,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale:   isHover ? 0 : 1,
        opacity: isHidden ? 0 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const INTERACTIVE = "a, button, [data-cursor], input, textarea, label, [role='button']";

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onEnterInteractive = () => setState("hover");
    const onLeaveInteractive = () => setState("default");
    const onLeaveWindow      = () => setState("hidden");
    const onEnterWindow      = () => setState("default");

    // Delegasi event hover ke elemen interaktif
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest(INTERACTIVE)) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    // Sembunyikan native cursor pada pointer:fine via style tag
    const style = document.createElement("style");
    style.textContent = `@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      style.remove();
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Ring — lambat mengikuti kursor */}
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          opacity: 0.7,
          left: 0,
          top: 0,
        }}
      />
      {/* Dot — langsung mengikuti kursor */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}
