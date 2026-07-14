/**
 * ISIS score computation — Balg & Boileau, JBJS 2007.
 * Pure function — no side effects, no imports, no browser deps.
 * Reference: Balg F, Boileau P. "The instability severity index score."
 * JBJS Br. 2007;89(11):1470-1477.
 */

import type { ClinicalInput, ISISResult, RiskCategory } from "./types";

/**
 * Compute the ISIS score breakdown from clinical inputs.
 * Maximum total: 10 points.
 */
export function computeISISScore(input: ClinicalInput): ISISResult {
  // Guard: an unentered age (0) must not award points during live scoring.
  const agePoints =
    input.ageAtFirstDislocation > 0 && input.ageAtFirstDislocation < 20 ? 2 : 0;
  const sportLevelPoints = input.competitiveSport ? 2 : 0;
  const sportTypePoints = input.contactOrOverheadSport ? 1 : 0;
  const hyperlaxityPoints = input.anteriorHyperlaxity ? 1 : 0;
  const hillSachsPoints = input.hillSachsOnApXray ? 2 : 0;
  const glenoidLossPoints = input.glenoidBoneLossOnApXray ? 2 : 0;

  const total =
    agePoints +
    sportLevelPoints +
    sportTypePoints +
    hyperlaxityPoints +
    hillSachsPoints +
    glenoidLossPoints;

  return {
    agePoints,
    sportLevelPoints,
    sportTypePoints,
    hyperlaxityPoints,
    hillSachsPoints,
    glenoidLossPoints,
    total,
  };
}

/**
 * Determine the overall risk category from ISIS score and bone loss percentage.
 * Bone loss ≥ 20% is independently escalated to "critical" per Burkhart criteria.
 */
export function computeRiskCategory(
  isisTotal: number,
  boneLossPercent: number
): RiskCategory {
  if (boneLossPercent >= 20 || isisTotal >= 10) return "critical";
  if (isisTotal >= 7 || boneLossPercent >= 15) return "high";
  if (isisTotal >= 4 || boneLossPercent >= 10) return "moderate";
  return "low";
}

/**
 * Return a human-readable recurrence risk estimate string.
 * Figures derived from published Latarjet vs. Bankart literature.
 */
export function computeRecurrenceRisk(riskCategory: RiskCategory): string {
  const map: Record<RiskCategory, string> = {
    low: "< 10% with Bankart repair",
    moderate: "25–40% with Bankart repair; augmentation should be considered",
    high: "≈ 60% with isolated Bankart; bone block strongly recommended",
    critical: "≥ 70%; bone block procedure required",
  };
  return map[riskCategory];
}

/** Surgical recommendation driven by the ISIS threshold (Balg & Boileau, 2007). */
export interface IsisRecommendation {
  procedure: "bankart" | "latarjet";
  label: string;
  detail: string;
}

/**
 * Map an ISIS total to the published surgical recommendation.
 * ISIS ≤ 6  → arthroscopic Bankart repair (recurrence ≈ 10%).
 * ISIS ≥ 7  → Latarjet / open bony procedure (arthroscopic recurrence ≈ 70%).
 * Reference: Balg F, Boileau P. JBJS Br. 2007;89(11):1470-1477.
 */
export function getIsisRecommendation(isisTotal: number): IsisRecommendation {
  if (isisTotal <= 6) {
    return {
      procedure: "bankart",
      label: "Arthroscopic Bankart repair",
      detail:
        "ISIS ≤ 6: arthroscopic soft-tissue repair is appropriate, with a published recurrence rate of approximately 10%.",
    };
  }
  return {
    procedure: "latarjet",
    label: "Latarjet / open bony procedure",
    detail:
      "ISIS ≥ 7: isolated arthroscopic Bankart repair carries a recurrence rate near 70%. A bony augmentation procedure is recommended.",
  };
}
