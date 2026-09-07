/**
 * Glenoid bone loss quantification.
 * Uses the inscribed-circle / glenoid width ratio method (Griffith, 2008).
 * Pure function — no side effects.
 *
 * Reference: Griffith JF, et al. "Bankart lesion: assessment with MR arthrography."
 * The bone loss % is calculated as defect width / contralateral glenoid width × 100.
 */

/**
 * Calculate bone loss as a percentage of total glenoid width.
 * @param glenoidWidth Width of contralateral (reference) glenoid in mm
 * @param defectWidth Width of bone defect on affected glenoid in mm
 * @returns number between 0 and 100 (clamped), rounded to 1 decimal place.
 */
export function computeBoneLossPercent(glenoidWidth: number, defectWidth: number): number {
  if (glenoidWidth <= 0) return 0;
  const raw = (defectWidth / glenoidWidth) * 100;
  return Math.round(Math.min(Math.max(raw, 0), 100) * 10) / 10;
}

/**
 * Interpret bone loss percentage into clinical significance tiers.
 * Thresholds: < 10% minimal, 10–20% subcritical, > 20% critical.
 */
export function interpretBoneLoss(boneLossPercent: number): {
  tier: "minimal" | "subcritical" | "critical";
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
  if (boneLossPercent <= 20) {
    return {
      tier: "subcritical",
      label: "Subcritical (10–20%)",
      note: "Approaching the critical zone; consider remplissage or bony augmentation.",
    };
  }
  return {
    tier: "critical",
    label: "Critical (> 20%)",
    note: "Consider bony augmentation. High risk of failure with isolated soft-tissue repair.",
  };
}
