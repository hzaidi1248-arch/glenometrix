/**
 * Glenometrix risk scoring — adapted from Balg & Boileau ISIS (JBJS 2007).
 * Modified scoring system with integrated bone loss % and on/off-track status.
 * Pure function — no side effects, no imports, no browser deps.
 *
 * Maximum total: 10 points.
 * Age (<20 = 2, 20–30 = 1, >30 = 0) + Sport level (2) + Sport type (1) +
 * Hyperlaxity (1) + GBL% (<10% = 0, 10–20% = 1, >20% = 2) + Track (off = 2, on = 0)
 */

import type { ClinicalInput, ISISResult, RiskCategory } from "./types";

/**
 * Compute the score breakdown from clinical inputs.
 * Maximum total: 10 points.
 */
export function computeISISScore(input: ClinicalInput): ISISResult {
  // Age: <20 = 2pts, 20–30 = 1pt, >30 = 0pts
  // Guard: an unentered age (0) must not award points during live scoring.
  let agePoints = 0;
  if (input.ageAtFirstDislocation > 0) {
    if (input.ageAtFirstDislocation < 20) {
      agePoints = 2;
    } else if (input.ageAtFirstDislocation <= 30) {
      agePoints = 1;
    }
  }

  const sportLevelPoints = input.competitiveSport ? 2 : 0;
  const sportTypePoints = input.contactOrOverheadSport ? 1 : 0;
  const hyperlaxityPoints = input.anteriorHyperlaxity ? 1 : 0;

  // Bone loss: <10% = 0pts, 10–20% = 1pt, >20% = 2pts
  let boneLossPoints = 0;
  if (input.boneLossPercent > 20) {
    boneLossPoints = 2;
  } else if (input.boneLossPercent >= 10) {
    boneLossPoints = 1;
  }

  // Track: off-track = 2pts, on-track = 0pts
  const trackPoints = input.hillSachsTrackStatus === "off-track" ? 2 : 0;

  const total =
    agePoints +
    sportLevelPoints +
    sportTypePoints +
    hyperlaxityPoints +
    boneLossPoints +
    trackPoints;

  return {
    agePoints,
    sportLevelPoints,
    sportTypePoints,
    hyperlaxityPoints,
    boneLossPoints,
    trackPoints,
    total,
  };
}

/**
 * Determine the overall risk category from score and clinical factors.
 *
 * Thresholds:
 *   ≤ 3 → low
 *   4–6 → medium
 *   ≥ 7 → high
 *
 * Override: GBL > 20% + off-track → high regardless of score.
 */
export function computeRiskCategory(
  isisTotal: number,
  boneLossPercent: number,
  trackStatus: "on-track" | "off-track" = "on-track"
): RiskCategory {
  // Override: >20% GBL + off-track = immediate high risk
  if (boneLossPercent > 20 && trackStatus === "off-track") return "high";

  if (isisTotal >= 7) return "high";
  if (isisTotal >= 4) return "medium";
  return "low";
}

/**
 * Return a human-readable recurrence risk estimate string.
 */
export function computeRecurrenceRisk(riskCategory: RiskCategory): string {
  const map: Record<RiskCategory, string> = {
    low: "Low risk of failure with Bankart repair",
    medium: "Medium risk of failure with Bankart repair",
    high: "High risk of failure with Bankart repair",
  };
  return map[riskCategory];
}

/** Surgical recommendation based on risk tier. */
export interface IsisRecommendation {
  procedure: "bankart" | "bankart-remplissage" | "bony-augmentation";
  label: string;
  detail: string;
}

/**
 * Map a risk category to the recommended surgical pathway.
 *
 * Low (≤3):    Consider Bankart repair with possible remplissage
 * Medium (4–6): Consider Bankart repair with remplissage, or possible bony augmentation
 * High (≥7):   Consider bony augmentation
 */
export function getIsisRecommendation(
  riskCategory: RiskCategory,
  isOverride: boolean = false
): IsisRecommendation {
  if (riskCategory === "high") {
    return {
      procedure: "bony-augmentation",
      label: "Consider bony augmentation",
      detail: isOverride
        ? "GBL > 20% with off-track Hill-Sachs lesion: high risk of failure with Bankart repair regardless of total score. Bony augmentation is recommended."
        : "Score ≥ 7: high risk of failure with Bankart repair. Consider bony augmentation procedure.",
    };
  }
  if (riskCategory === "medium") {
    return {
      procedure: "bankart-remplissage",
      label: "Bankart repair with remplissage or bony augmentation",
      detail:
        "Score 4–6: medium risk of failure with Bankart repair. Consider Bankart repair with remplissage, or possible bony augmentation.",
    };
  }
  return {
    procedure: "bankart",
    label: "Bankart repair with possible remplissage",
    detail:
      "Score ≤ 3: low risk of failure with Bankart repair. Consider Bankart repair with possible remplissage.",
  };
}
