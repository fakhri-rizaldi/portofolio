"use client";

/**
 * hooks/useReducedMotion.ts
 * Utility hook: cek apakah user mengaktifkan prefers-reduced-motion.
 * Dipakai di seluruh komponen animasi untuk patuh AN-10.
 */
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
