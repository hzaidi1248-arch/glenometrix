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

  const textColor = isLight ? "text-white" : "text-[#0a0a0a]";
  const accentColor = isLight ? "text-white/70" : "text-[#1a5fae]";
  const fontSize = Math.round(markSize * 0.6);

  return (
    <div
      className={cn("flex items-center gap-2.5 select-none", className)}
      aria-label="GlenometriX"
    >
      {/* Mark: crop the PNG to its circular mark portion only.
          Container width is 88% of markSize — the circle ends at ~86% of
          the natural image height, safely before the wordmark begins (~96%). */}
      <div
        style={{
          width: Math.round(markSize * 0.88),
          height: markSize,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          style={{
            display: "block",
            height: markSize,
            width: Math.round(markSize * (500 / 166)),
            maxWidth: "none",
            filter: isLight ? "brightness(0) invert(1)" : "none",
          }}
        />
      </div>

      {/* Wordmark with blue X accent */}
      <span
        className={cn("font-sans font-extrabold tracking-tight", textColor)}
        style={{ fontSize, lineHeight: 1, letterSpacing: "-0.045em" }}
      >
        Glenometri
        <span className={cn("font-extrabold", accentColor)}>X</span>
      </span>
    </div>
  );
}
