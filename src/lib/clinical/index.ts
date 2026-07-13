/**
 * Public barrel export for the Glenometrix clinical library.
 * Import everything from "@/lib/clinical" — never import sub-modules directly.
 */

export type {
  ClinicalInput,
  ISISResult,
  RiskScore,
  RiskCategory,
  ValidationError,
  ValidationResult,
} from "./types";

export {
  computeISISScore,
  computeRiskCategory,
  computeRecurrenceRisk,
  getIsisRecommendation,
} from "./risk-scoring";
export type { IsisRecommendation } from "./risk-scoring";

export { computeBoneLossPercent, interpretBoneLoss } from "./bone-loss";

export { computeTrackStatus } from "./measurement";
export type { TrackResult } from "./measurement";

export { getDecisionPathway, getDecisionSummary } from "./clinical-decision";

export { validateClinicalInput } from "./validators";
