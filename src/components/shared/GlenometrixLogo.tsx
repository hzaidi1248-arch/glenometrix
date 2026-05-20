import Image from "next/image";
import { cn } from "@/lib/utils";

interface GlenometrixLogoProps {
  markSize?: number;
  /** "light" inverts the PNG to white for use on dark backgrounds */
  variant?: "default" | "light";
  animated?: boolean;
  className?: string;
}

// PNG natural dimensions: 500 × 166 px
const PNG_ASPECT = 500 / 166;

export function GlenometrixLogo({
  markSize = 40,
  variant = "default",
  className,
}: GlenometrixLogoProps) {
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
        style={{
          objectFit: "contain",
          // On dark backgrounds, render the logo as solid white
          filter: variant === "light" ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  );
}
