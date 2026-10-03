"use client";

/**
 * T-023 — ThemeProvider
 * Membungkus next-themes agar dapat dipakai di Server Component layout.tsx.
 * Klient komponen isolasi, sesuai design.md 5 dan skill RSC SAFETY rule.
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
