import { cn } from "@/lib/utils";
import { GlenometrixMark } from "./GlenometrixMark";

interface GlenometrixLogoProps {
  /** Mark size in px — drives proportional font size */
  markSize?: number;
  /** "light" for use on dark backgrounds */
  variant?: "default" | "light";
  /** Pass through animation to the mark */
  animated?: boolean;
  className?: string;
}

export function GlenometrixLogo({
  markSize = 40,
  variant = "default",
  animated = false,
  className,
}: GlenometrixLogoProps) {
  // Mark is always brand blue — the filled circle reads on both light and dark surfaces.
  const markColor = "#1a5fae";
  const textColor =
    variant === "light" ? "text-white" : "text-[#0a0e1a]";
  const accentColor =
    variant === "light" ? "text-white" : "text-[#1a5fae]";

  const fontSize = Math.round(markSize * 0.48);

  return (
    <div
      className={cn("flex items-center gap-2.5 select-none", className)}
      aria-label="Glenometrix"
    >
      <GlenometrixMark
        size={markSize}
        color={markColor}
        animated={animated}
      />
      <span
        className={cn("font-sans font-semibold tracking-tight", textColor)}
        style={{ fontSize, lineHeight: 1, letterSpacing: "-0.03em" }}
      >
        Glenometri
        <span className={cn("font-bold", accentColor)}>X</span>
      </span>
    </div>
  );
}
