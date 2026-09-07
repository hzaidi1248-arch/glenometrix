/**
 * Clinical type definitions for the Glenometrix scoring system.
 * All interfaces are strict — no optional fields without explicit justification.
 * Pure TypeScript — no React, no browser APIs.
 */

/** Inputs required for the full Glenometrix assessment. */
export interface ClinicalInput {
  // ─── Scoring fields ─────────────────────────────────────────────────────────
  /** Age at first dislocation in years. <20 = 2 pts, 20–30 = 1 pt, >30 = 0 pts */
  ageAtFirstDislocation: number;
  /** Competitive-level sport participation. 2 pts if true */
  competitiveSport: boolean;
  /** Contact or forced overhead arm elevation sport. 1 pt if true */
  contactOrOverheadSport: boolean;
  /** Anterior shoulder or GHIS hyperlaxity present. 1 pt if true */
  anteriorHyperlaxity: boolean;

  // ─── Bone loss (direct %) ───────────────────────────────────────────────────
  /** Glenoid bone loss percentage (0–100). <10% = 0 pts, 10–20% = 1 pt, >20% = 2 pts */
  boneLossPercent: number;

  // ─── Hill-Sachs track status ────────────────────────────────────────────────
  /** Hill-Sachs on-track / off-track classification. on-track = 0 pts, off-track = 2 pts */
  hillSachsTrackStatus: "on-track" | "off-track";

  // ─── Contextual fields ──────────────────────────────────────────────────────
  /** Total prior dislocation count (including first event) */
  priorDislocationCount: number;
  /** Biological sex for epidemiological context */
  sex: "male" | "female" | "other";
}

/** Point-by-point score breakdown. */
export interface ISISResult {
  /** 0, 1, or 2 — based on ageAtFirstDislocation (<20 = 2, 20–30 = 1, >30 = 0) */
  agePoints: number;
  /** 0 or 2 — based on competitiveSport */
  sportLevelPoints: number;
  /** 0 or 1 — based on contactOrOverheadSport */
  sportTypePoints: number;
  /** 0 or 1 — based on anteriorHyperlaxity */
  hyperlaxityPoints: number;
  /** 0, 1, or 2 — based on boneLossPercent (<10% = 0, 10–20% = 1, >20% = 2) */
  boneLossPoints: number;
  /** 0 or 2 — based on hillSachsTrackStatus (on-track = 0, off-track = 2) */
  trackPoints: number;
  /** Sum 0–10 */
  total: number;
}

/** Three-tier risk classification for decision support. */
export type RiskCategory = "low" | "medium" | "high";

/** Consolidated output from all Glenometrix computations. */
export interface RiskScore {
  /** Full score breakdown */
  isis: ISISResult;
  /** Glenoid bone loss as a percentage (0–100) */
  boneLossPercent: number;
  /** Hill-Sachs track classification */
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
