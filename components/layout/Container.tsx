/**
 * T-022 — Komponen Layout: Container
 * Wrapper utama max-width 1280px dengan padding fluid horizontal.
 * Server Component — tidak ada state/interaktivitas.
 */
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Override max-width jika diperlukan */
  size?: "default" | "wide" | "narrow";
}

const sizeMap = {
  default: "max-w-[1280px]",
  wide: "max-w-[1440px]",
  narrow: "max-w-[768px]",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "container-main",
        sizeMap[size],
        className
      )}
    >
      {children}
    </div>
  );
}
