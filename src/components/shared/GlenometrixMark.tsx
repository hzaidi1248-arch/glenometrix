/**
 * Glenometrix logo mark — minimal SVG for use on dark backgrounds (light variant).
 * Represents glenoid socket (270° arc) + humeral head (circle).
 * Only rendered when the full PNG logo cannot be used (e.g. dark footer).
 */

interface GlenometrixMarkProps {
  size?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

export function GlenometrixMark({
  size = 48,
  color = "#1a5fae",
  animated = false,
  className,
}: GlenometrixMarkProps) {
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
      <path
        d={arcPath}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        className={animated ? "gx-arc" : undefined}
      />
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
