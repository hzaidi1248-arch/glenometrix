import { cn } from "@/lib/utils";

interface GlenometrixLogoProps {
  markSize?: number;
  /** "light" for use on dark backgrounds */
  variant?: "default" | "light";
  className?: string;
}

/**
 * Renders the logo mark (PNG circle, cropped from the full logo asset)
 * alongside a JSX wordmark so the "X" accent colour can be controlled.
 *
 * PNG is 500 × 166 px. The circular mark fills the full height, occupying
 * roughly the leftmost 166 px. We clip to a square so only the mark shows,
 * then render the wordmark text separately.
 */
export function GlenometrixLogo({
  markSize = 40,
  variant = "default",
  className,
}: GlenometrixLogoProps) {
  const isLight = variant === "light";

  const textColor = isLight ? "text-white" : "text-[#0a0e1a]";
  const accentColor = isLight ? "text-white/70" : "text-[#1a5fae]";
  const fontSize = Math.round(markSize * 0.52);

  return (
    <div
      className={cn("flex items-center gap-2.5 select-none", className)}
      aria-label="GlenometriX"
    >
      {/* Mark: crop the PNG to its square circle portion */}
      <div
        style={{ width: markSize, height: markSize, overflow: "hidden", flexShrink: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          style={{
            height: markSize,
            width: "auto",
            maxWidth: "none",
            filter: isLight ? "brightness(0) invert(1)" : "none",
          }}
        />
      </div>

      {/* Wordmark with blue X accent */}
      <span
        className={cn("font-sans font-bold tracking-tight", textColor)}
        style={{ fontSize, lineHeight: 1, letterSpacing: "-0.03em" }}
      >
        Glenometri
        <span className={cn("font-bold", accentColor)}>X</span>
      </span>
    </div>
  );
}
