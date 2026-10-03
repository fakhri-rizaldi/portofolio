/**
 * lib/gsap.ts — Registrasi GSAP plugin SATU KALI (design.md §5.1)
 *
 * Import file ini DI SATU TEMPAT saja (SmoothScrollProvider atau root layout).
 * Jangan re-register plugin di komponen individual — menyebabkan duplikasi.
 *
 * Plugin yang didaftarkan:
 *   - ScrollTrigger : scroll-driven animation
 *   - SplitText    : split text per huruf/kata (T-032)
 *   - useGSAP      : React hook dengan auto-cleanup (design.md §5.3)
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// SplitText hanya tersedia di GSAP v3 Club / free bundle sejak v3.12+
// Coba register; jika gagal (versi lama) tidak akan error
let SplitText: typeof import("gsap/SplitText").SplitText | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("gsap/SplitText");
  SplitText = mod.SplitText || mod.default || mod;
  if (SplitText) {
    gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);
  } else {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }
} catch {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP, SplitText };
