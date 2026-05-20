import { cn } from "@/lib/utils";
import { GlenometrixMark } from "./GlenometrixMark";

interface GlenometrixLogoProps {
  markSize?: number;
  variant?: "default" | "light";
  animated?: boolean;
  className?: string;
}

export function GlenometrixLogo({
  markSize = 40,
  variant = "default",
  animated = false,
  className,
}: GlenometrixLogoProps) {
  const textColor =
    variant === "light" ? "text-white" : "text-[#0a0e1a]";
  const accentColor =
    variant === "light" ? "text-white/90" : "text-[#1a5fae]";

  // Font size scales with mark: cap height ≈ 70% of mark height
  const fontSize = Math.round(markSize * 0.52);

  return (
    <div
      className={cn("flex items-center gap-3 select-none", className)}
      aria-label="GlenometriX"
    >
      {/* Mark always renders its own blue gradient — no color prop needed */}
      <GlenometrixMark size={markSize} animated={animated} />

      <span
        className={cn("font-sans font-extrabold tracking-tight", textColor)}
        style={{ fontSize, lineHeight: 1, letterSpacing: "-0.04em" }}
      >
        Glenometri
        <span className={cn("font-extrabold", accentColor)}>X</span>
      </span>
    </div>
  );
}
