/**
 * Clinical type definitions for the Glenometrix scoring system.
 * All interfaces are strict — no optional fields without explicit justification.
 * Pure TypeScript — no React, no browser APIs.
 */

/** Inputs required for the full Glenometrix assessment. */
export interface ClinicalInput {
  // ─── ISIS Score fields (Balg & Boileau, JBJS 2007) ─────────────────────────
  /** Age at first dislocation in years. <20 = 2 pts, ≥20 = 0 pts */
  ageAtFirstDislocation: number;
  /** Competitive-level sport participation. 2 pts if true */
  competitiveSport: boolean;
  /** Contact or forced overhead arm elevation sport. 1 pt if true */
  contactOrOverheadSport: boolean;
  /** Anterior shoulder or GHIS hyperlaxity present. 1 pt if true */
  anteriorHyperlaxity: boolean;
  /** Hill-Sachs lesion visible on AP X-ray in external rotation. 2 pts if true */
  hillSachsOnApXray: boolean;
  /** Loss of inferior glenoid contour on AP X-ray. 2 pts if true */
  glenoidBoneLossOnApXray: boolean;

  // ─── Bone loss quantification ───────────────────────────────────────────────
  /** Width of contralateral (reference) glenoid in mm */
  glenoidWidth: number;
  /** Width of bone defect on affected glenoid in mm */
  defectWidth: number;

  // ─── Glenoid track / on/off-track assessment (Di Giacomo, Arthroscopy 2014) ─
  /** Width of Hill-Sachs lesion in mm */
  hillSachsWidth: number;
  /**
   * Distance from the medial edge of the Hill-Sachs lesion
   * to the medial rotator cuff footprint in mm (HSL offset).
   */
  hslToRotatorCuffOffset: number;

  // ─── Contextual fields ──────────────────────────────────────────────────────
  /** Total prior dislocation count (including first event) */
  priorDislocationCount: number;
  /** Biological sex for epidemiological context */
  sex: "male" | "female" | "other";
}

/** Point-by-point ISIS score breakdown. */
export interface ISISResult {
  /** 0 or 2 — based on ageAtFirstDislocation */
  agePoints: number;
  /** 0 or 2 — based on competitiveSport */
  sportLevelPoints: number;
  /** 0 or 1 — based on contactOrOverheadSport */
  sportTypePoints: number;
  /** 0 or 1 — based on anteriorHyperlaxity */
  hyperlaxityPoints: number;
  /** 0 or 2 — based on hillSachsOnApXray */
  hillSachsPoints: number;
  /** 0 or 2 — based on glenoidBoneLossOnApXray */
  glenoidLossPoints: number;
  /** Sum 0–10 */
  total: number;
}

/** Four-tier risk classification for decision support. */
export type RiskCategory = "low" | "moderate" | "high" | "critical";

/** Consolidated output from all Glenometrix computations. */
export interface RiskScore {
  /** Full ISIS score breakdown */
  isis: ISISResult;
  /** Calculated bone loss as a percentage of total glenoid width (0–100) */
  boneLossPercent: number;
  /** Glenoid track classification */
  trackStatus: "on-track" | "off-track";
  /** Overall risk tier */
  riskCategory: RiskCategory;
  /** Human-readable recurrence risk estimate string */
  recurrenceRisk: string;
  /** Rule-based clinical decision recommendation — RUO, not diagnostic */
  decisionPathway: string;
}

/** A single field-level validation error. */
export interface ValidationError {
  field: keyof ClinicalInput;
  message: string;
}

/** Return type of validateClinicalInput. */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
