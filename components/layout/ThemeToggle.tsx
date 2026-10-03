"use client";

/**
 * T-023 — ThemeToggle
 * Tombol toggle dark/light tema. Simpan ke localStorage via next-themes.
 * Client Component karena menggunakan state dan useTheme hook.
 */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hindari hydration mismatch — render setelah mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-md border border-custom flex items-center justify-center",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
      className={cn(
        "w-9 h-9 rounded-md border flex items-center justify-center",
        "border-custom text-muted hover:text-accent hover:border-accent",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        className
      )}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
