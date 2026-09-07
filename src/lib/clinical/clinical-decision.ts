/**
 * Rule-based clinical decision pathway.
 * NOT generative AI — deterministic rule engine based on published guidelines.
 * Output is annotated Research Use Only.
 *
 * Three-tier risk system:
 *   Low  → Consider Bankart repair with possible remplissage
 *   Medium → Consider Bankart repair with remplissage, or possible bony augmentation
 *   High → Consider bony augmentation
 */

import type { RiskCategory } from "./types";

interface DecisionInput {
  riskCategory: RiskCategory;
  boneLossPercent: number;
  trackStatus: "on-track" | "off-track";
  isisTotal: number;
  isOverride: boolean;
}

interface DecisionOutput {
  recommendation: string;
  rationale: string;
  urgency: "elective" | "prompt" | "urgent";
}

/**
 * Generate a rule-based clinical decision pathway string.
 * Returns a recommendation appropriate for the risk profile.
 * All output must be displayed with a "Research Guidance Only" label.
 */
export function getDecisionPathway(input: DecisionInput): DecisionOutput {
  const { riskCategory, boneLossPercent, trackStatus, isisTotal, isOverride } = input;

  // High risk
  if (riskCategory === "high") {
    if (isOverride) {
      return {
        recommendation:
          "Consider bony augmentation. GBL > 20% with off-track Hill-Sachs lesion indicates high risk of failure with Bankart repair.",
        rationale: `Bone loss of ${boneLossPercent.toFixed(1)}% exceeds 20% and Hill-Sachs lesion is off-track. This combination carries high risk of recurrence with isolated soft-tissue repair regardless of the total score (${isisTotal}/10).`,
        urgency: "urgent",
      };
    }
    return {
      recommendation:
        "Consider bony augmentation. High risk of failure with Bankart repair at this score level.",
      rationale: `Score of ${isisTotal}/10 places this case in the high-risk tier (≥ 7). Bankart repair alone carries unacceptably high recurrence risk.`,
      urgency: "urgent",
    };
  }

  // Medium risk
  if (riskCategory === "medium") {
    return {
      recommendation:
        "Consider Bankart repair with remplissage, or possible bony augmentation.",
      rationale: `Score of ${isisTotal}/10 is in the medium-risk tier (4–6). ${trackStatus === "off-track" ? "Off-track Hill-Sachs lesion present. " : ""}${boneLossPercent >= 10 ? `Bone loss of ${boneLossPercent.toFixed(1)}% is in the subcritical range. ` : ""}Bankart + remplissage may be appropriate; bony augmentation should be considered.`,
      urgency: "prompt",
    };
  }

  // Low risk
  return {
    recommendation:
      "Consider Bankart repair with possible remplissage. Low risk of failure with Bankart repair.",
    rationale: `Score of ${isisTotal}/10 indicates low recurrence risk (≤ 3). Standard soft-tissue repair is appropriate.`,
    urgency: "elective",
  };
}

/** Summarize the decision for single-line display in the score card. */
export function getDecisionSummary(input: DecisionInput): string {
  const output = getDecisionPathway(input);
  return output.recommendation;
}
