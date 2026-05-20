import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlenometrixMark } from "./GlenometrixMark";

interface GlenometrixLogoProps {
  markSize?: number;
  /** "light" for use on dark backgrounds — renders SVG mark + white text */
  variant?: "default" | "light";
  animated?: boolean;
  className?: string;
}

// PNG natural dimensions: 500 × 166 px
const PNG_ASPECT = 500 / 166;

export function GlenometrixLogo({
  markSize = 40,
  variant = "default",
  animated = false,
  className,
}: GlenometrixLogoProps) {
  if (variant === "default") {
    return (
      <div
        className={cn("flex items-center select-none", className)}
        aria-label="GlenometriX"
      >
        <Image
          src="/logo.png"
          alt="GlenometriX"
          height={markSize}
          width={Math.round(markSize * PNG_ASPECT)}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  // Light variant: white arc mark + white wordmark (for dark backgrounds)
  const fontSize = Math.round(markSize * 0.52);
  return (
    <div
      className={cn("flex items-center gap-3 select-none", className)}
      aria-label="GlenometriX"
    >
      <GlenometrixMark size={markSize} color="#ffffff" animated={animated} />
      <span
        className="font-sans font-extrabold text-white tracking-tight"
        style={{ fontSize, lineHeight: 1, letterSpacing: "-0.04em" }}
      >
        Glenometri<span className="text-white/80">X</span>
      </span>
    </div>
  );
}
