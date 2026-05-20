"use client";

/**
 * Glenometrix logo mark — anatomically accurate shoulder joint.
 *
 * Anterior view, right shoulder. White bone anatomy on blue background:
 *   • Acromion   — broad arch spanning the superior aspect
 *   • Coracoid   — clean anterior hook from superior glenoid
 *   • Scapula    — triangular body, concave glenoid face
 *   • Humeral head — large prominent articular sphere
 *   • Humeral shaft — diaphysis descending to circle base
 *
 * Premium finish: radial gradient on circle (lighter upper-left → richer deep blue
 * at edges) gives depth without decoration. Unique gradient ID per instance via
 * module counter to avoid SVG ID collisions across multiple logo instances.
 *
 * All vertex coordinates verified within r=49 boundary. No clipPath needed.
 */

import { useId } from "react";

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
  const uid = useId().replace(/:/g, "");
  const gradId = `gx-grad-${uid}`;
  const glowId = `gx-glow-${uid}`;

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
          @keyframes gx-mark-in {
            from { opacity: 0; transform: scale(0.88); transform-origin: 50px 50px; }
            to   { opacity: 1; transform: scale(1);    transform-origin: 50px 50px; }
          }
          .gx-animated {
            opacity: 0;
            animation: gx-mark-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          }
        `}</style>
      )}

      <defs>
        {/* Radial gradient: lighter upper-left, richer deep blue at rim */}
        <radialGradient id={gradId} cx="38%" cy="32%" r="72%" fx="38%" fy="32%">
          <stop offset="0%"   stopColor="#3b8ee8" />
          <stop offset="55%"  stopColor={color} />
          <stop offset="100%" stopColor="#0c3f8f" />
        </radialGradient>
        {/* Subtle inner rim highlight filter */}
        <radialGradient id={glowId} cx="38%" cy="28%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <g className={animated ? "gx-animated" : undefined}>
        {/* ── Background circle with depth gradient ─────────────────────── */}
        <circle cx="50" cy="50" r="49" fill={`url(#${gradId})`} />

        {/* Subtle inner highlight for premium depth */}
        <circle cx="50" cy="50" r="49" fill={`url(#${glowId})`} />

        {/* ── White bone anatomy ──────────────────────────────────────────── */}
        <g fill="white">

          {/*
           * ACROMION
           * Broad arch from scapular spine (72,17) anteriorly to tip (28,16).
           * Undersurface clears humeral head top (y≈30) by ~6 units — subacromial space.
           * Verified: (70,10)→dist≈43.3, (28,16)→dist≈40.5, (28,24)→dist≈33.3  ✓
           */}
          <path d="
            M 72,17
            L 70,10
            C 57,4  36,6  28,16
            L 28,24
            C 39,14 59,12 69,19
            Z
          " />

          {/*
           * CORACOID PROCESS
           * Elegant anterior hook projecting from superior glenoid.
           * Tip at (44,17) — sits clearly below acromion underside (~y23 at x44).
           * Verified: (44,17)→dist≈33.5  ✓
           */}
          <path d="
            M 54,27
            L 52,20
            C 49,13 46,12 44,16
            L 45,22
            C 47,18 50,19 53,26
            Z
          " />

          {/*
           * SCAPULAR BODY + GLENOID FACE
           * Glenoid face: concave Q-bezier (bows to x≈49 at midpoint).
           * Joint space between face min-x (51) and humeral head right (46): 5 units ✓
           * Verified: (79,76)→dist≈39.6, (73,17)→dist≈40.8  ✓
           */}
          <path d="
            M 53,26
            Q 49,43 53,60
            L 79,76
            C 84,57 84,30 73,17
            Z
          " />

          {/*
           * HUMERAL SHAFT
           * Tapered diaphysis, slightly curved. Width ~12 units at surgical neck.
           * Bottom trimmed to y=90 to stay inside circle at x≈25.
           * Verified: (25,90)→dist≈47.2, (37,90)→dist≈42.1  ✓
           */}
          <path d="
            M 25,59
            C 23,71 23,82 25,90
            L 37,90
            C 37,82 37,71 36,59
            Z
          " />

          {/*
           * HUMERAL HEAD
           * Large prominent articular oval — most visually dominant anatomy element.
           * cx=31, cy=44, rx=15, ry=14.
           * Right edge x=46; 5-unit joint space to glenoid face.
           * Top edge y=30; 6-unit subacromial space to acromion underside.
           * Verified: left(16,44)→dist≈34.5, all within circle  ✓
           */}
          <ellipse cx="31" cy="44" rx="15" ry="14" />

        </g>

        {/* Hairline inner ring — frames the circle with precision */}
        <circle
          cx="50" cy="50" r="48.2"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}
