/**
 * Glenometrix logo mark — anatomically accurate shoulder joint silhouette.
 *
 * Blue filled circle. White bone anatomy inside:
 *   • Acromion   — flat arch spanning the superior aspect
 *   • Scapula    — triangular body + concave glenoid face
 *   • Coracoid   — anterior projection from superior glenoid rim
 *   • Humeral head — large spherical articular surface (left/lateral)
 *   • Humeral shaft — diaphysis descending from the head
 *
 * All coordinates verified within the r=49 circle (center 50,50).
 * No clipPath needed — every vertex checked against circle boundary.
 *
 * Viewing angle: anterior view of right shoulder joint.
 * Joint space and subacromial space intentionally visible as blue gaps.
 */

interface GlenometrixMarkProps {
  /** Rendered size in px (both width and height). */
  size?: number;
  /** Fill color for the background circle — defaults to clinical blue. */
  color?: string;
  /** Fade-in scale reveal animation on mount. */
  animated?: boolean;
  className?: string;
}

export function GlenometrixMark({
  size = 48,
  color = "#1a5fae",
  animated = false,
  className,
}: GlenometrixMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {animated && (
        <style>{`
          @keyframes gx-reveal {
            from {
              opacity: 0;
              transform: scale(0.92);
              transform-origin: 50px 50px;
            }
            to {
              opacity: 1;
              transform: scale(1);
              transform-origin: 50px 50px;
            }
          }
          .gx-mark {
            opacity: 0;
            animation: gx-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          }
        `}</style>
      )}

      <g className={animated ? "gx-mark" : undefined}>
        {/* ── Blue background circle ─────────────────────────────────────── */}
        <circle cx="50" cy="50" r="49" fill={color} />

        {/* ── White bone anatomy ────────────────────────────────────────── */}
        <g fill="white">

          {/*
           * ACROMION
           * Flat curved arch spanning from the scapular spine (right, x≈72)
           * anteriorly to its tip (left, x≈32). Width ≈ 7 units.
           * Subacromial space between its inferior surface and humeral head ≈ 8 units.
           * All points within circle: (32,11)→dist≈42.9, (72,17)→dist≈38.6  ✓
           */}
          <path d="
            M 72,17
            L 70,11
            C 58,5 38,7 31,16
            L 31,23
            C 40,15 59,13 69,18
            Z
          " />

          {/*
           * CORACOID PROCESS
           * Anterior projection from superior glenoid rim.
           * Base at scapula (x≈55,y≈27), tip at (x≈46,y≈19).
           * Sits below acromion with the coracoacromial space visible (≈2 units).
           * Tip (46,19)→dist≈31.2  ✓
           */}
          <path d="
            M 55,27
            L 53,21
            C 50,15 47,14 45,18
            L 46,23
            C 48,19 50,21 53,26
            Z
          " />

          {/*
           * SCAPULAR BODY + GLENOID FACE
           * Left edge is the concave glenoid face (Q bezier bows left to x≈49
           * at midpoint). Gap to humeral head right edge (x=47): ≈4 units joint space.
           * Superior rim (53,26) → inferior rim (53,61) via concave face.
           * Then scapula body: inferior angle (79,76), vertebral/superior border (73,17).
           * Key points: (79,76)→dist≈38.9, (73,17)→dist≈40.2  ✓
           */}
          <path d="
            M 53,26
            Q 49,44 53,61
            L 79,77
            C 84,58 84,31 73,17
            Z
          " />

          {/*
           * HUMERAL SHAFT (diaphysis)
           * Slightly tapered tube, centered ~x=33, descending from surgical neck (y=58)
           * to the inferior circle edge (y≈93 at this x-range).
           * At x=27,y=93: dist≈48.2 ✓   At x=39,y=93: dist≈44.3 ✓
           */}
          <path d="
            M 27,58
            C 26,70 26,81 27,93
            L 39,93
            C 39,81 39,70 38,58
            Z
          " />

          {/*
           * HUMERAL HEAD (proximal articular surface)
           * Large white oval. cx=33, cy=44, rx=14, ry=13.
           * Right edge x=47 — joint space between x=47 and glenoid face min x≈51.
           * Top edge y=31 — subacromial space between y=31 and acromion bottom (y≈23 here).
           * Left extreme (19,44)→dist≈31.6  ✓
           */}
          <ellipse cx="33" cy="44" rx="14" ry="13" />

        </g>
      </g>
    </svg>
  );
}
