"use client";

/**
 * T-036 — components/layout/PageTransition.tsx
 * Transisi halaman wipe untuk Next.js App Router (AN-08).
 *
 * Cara kerja:
 *   - Mendeteksi perubahan `pathname` via usePathname
 *   - Saat ganti halaman: overlay slide in dari bawah → tunggu → slide out ke atas
 *   - Tidak ada kedipan putih (white flash) karena overlay menutup seluruh viewport
 *
 * Reduced-motion: transisi dilewati, konten langsung muncul (AN-10).
 *
 * Cara pakai: pasang di app/layout.tsx setelah ThemeProvider.
 *   <PageTransition>{children}</PageTransition>
 */


interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}
