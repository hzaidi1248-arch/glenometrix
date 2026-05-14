/**
 * Glenometrix logo mark — pure SVG, zero external deps.
 * Represents the glenoid socket (270° arc) with humeral head (circle).
 * Stroke-draw animation is opt-in via the animated prop.
 */

interface GlenometrixMarkProps {
  /** SVG dimensions in px */
  size?: number;
  /** CSS color value — defaults to brand clinical blue */
  color?: string;
  /** Trigger 1.2s arc stroke-draw animation on mount */
  animated?: boolean;
  className?: string;
}

export function GlenometrixMark({
  size = 48,
  color = "#1a5fae",
  animated = false,
  className,
}: GlenometrixMarkProps) {
  /**
   * Arc geometry:
   * - ViewBox: 0 0 48 48
   * - Glenoid arc center: (22, 24), radius: 14
   * - Arc from (-45°) to (45°) the LONG way (270° arc, CCW on screen)
   *   Start: (22 + 14·cos(-45°), 24 + 14·sin(-45°)) ≈ (31.9, 14.1)
   *   End:   (22 + 14·cos(45°),  24 + 14·sin(45°))  ≈ (31.9, 33.9)
   * - SVG: M 31.9 14.1 A 14 14 0 1 0 31.9 33.9  (large-arc=1, sweep=0)
   * - Humeral head: cx=37, cy=24, r=5.5 (sits in the arc opening)
   *
   * Arc circumference: 270/360 × 2π × 14 ≈ 66 px
   * stroke-dasharray: 66, stroke-dashoffset animates 66→0
   */
  const arcPath = "M 31.9 14.1 A 14 14 0 1 0 31.9 33.9";
  const arcLength = 66;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {animated && (
        <style>{`
          @keyframes gx-draw-arc {
            from { stroke-dashoffset: ${arcLength}; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes gx-fade-circle {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          .gx-arc {
            stroke-dasharray: ${arcLength};
            stroke-dashoffset: ${arcLength};
            animation: gx-draw-arc 1.2s ease-in-out forwards;
          }
          .gx-circle {
            opacity: 0;
            animation: gx-fade-circle 0.5s ease-in-out 0.4s forwards;
          }
        `}</style>
      )}

      {/* Glenoid socket arc */}
      <path
        d={arcPath}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        className={animated ? "gx-arc" : undefined}
      />

      {/* Humeral head */}
      <circle
        cx="37"
        cy="24"
        r="5.5"
        stroke={color}
        strokeWidth="2.5"
        className={animated ? "gx-circle" : undefined}
      />
    </svg>
  );
}
