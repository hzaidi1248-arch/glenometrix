/**
 * Glenoid bone loss quantification.
 * Uses the inscribed-circle / glenoid width ratio method (Griffith, 2008).
 * Pure function — no side effects.
 *
 * Reference: Griffith JF, et al. "Bankart lesion: assessment with MR arthrography."
 * The bone loss % is calculated as defect width / contralateral glenoid width × 100.
 */

import type { ClinicalInput } from "./types";

/**
 * Calculate bone loss as a percentage of total glenoid width.
 * @returns number between 0 and 100 (clamped), rounded to 1 decimal place.
 */
export function computeBoneLossPercent(input: ClinicalInput): number {
  if (input.glenoidWidth <= 0) return 0;
  const raw = (input.defectWidth / input.glenoidWidth) * 100;
  return Math.round(Math.min(Math.max(raw, 0), 100) * 10) / 10;
}

/**
 * Interpret bone loss percentage into clinical significance tiers.
 * Thresholds per Burkhart & De Beer (2000) and subsequent literature.
 */
export function interpretBoneLoss(boneLossPercent: number): {
  tier: "minimal" | "moderate" | "significant" | "critical";
  label: string;
  note: string;
} {
  if (boneLossPercent < 10) {
    return {
      tier: "minimal",
      label: "Minimal (< 10%)",
      note: "Soft-tissue repair feasible; bone loss unlikely to drive recurrence.",
    };
  }
  if (boneLossPercent < 13.5) {
    return {
      tier: "moderate",
      label: "Moderate (10–13.5%)",
      note: "Approaching the critical zone; assess glenoid track status.",
    };
  }
  if (boneLossPercent < 20) {
    return {
      tier: "significant",
      label: "Significant (13.5–20%)",
      note: "Glenoid track often compromised; consider bone block procedure.",
    };
  }
  return {
    tier: "critical",
    label: "Critical (≥ 20%)",
    note: "Bone block procedure required (Latarjet or Eden-Hybinette). Isolated soft-tissue repair contraindicated.",
  };
}
