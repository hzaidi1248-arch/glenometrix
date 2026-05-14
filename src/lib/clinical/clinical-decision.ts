/**
 * Rule-based clinical decision pathway.
 * NOT generative AI — deterministic rule engine based on published guidelines.
 * Output is annotated Research Use Only.
 *
 * Based on: Burkhart SS, et al. (2000); Latarjet, Balg & Boileau (2007);
 * Di Giacomo et al. (2014); current ASES/ESSKA guidelines.
 */

import type { RiskCategory } from "./types";

interface DecisionInput {
  riskCategory: RiskCategory;
  boneLossPercent: number;
  trackStatus: "on-track" | "off-track";
  isisTotal: number;
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
  const { riskCategory, boneLossPercent, trackStatus, isisTotal } = input;

  // Critical: bone loss ≥ 20% or ISIS ≥ 10
  if (riskCategory === "critical") {
    return {
      recommendation:
        "Bone block procedure required (Latarjet or Eden-Hybinette). Arthroscopic soft-tissue repair is contraindicated at this level of bone loss.",
      rationale: `Bone loss of ${boneLossPercent.toFixed(1)}% exceeds the 20% critical threshold${isisTotal >= 10 ? ` and ISIS score is ${isisTotal}/10` : ""}. Isolated Bankart repair failure rates exceed 70% in this range.`,
      urgency: "urgent",
    };
  }

  // High: ISIS 7–9 OR bone loss 15–19.9%
  if (riskCategory === "high") {
    return {
      recommendation:
        "Bone block procedure strongly recommended (Latarjet). Arthroscopic repair alone carries unacceptably high recurrence risk.",
      rationale: `ISIS score of ${isisTotal}/10 places this case in the high-risk tier. Recurrence with isolated Bankart repair is approximately 60%. Latarjet addresses both bone loss and capsulolabral deficiency.`,
      urgency: "prompt",
    };
  }

  // Moderate: ISIS 4–6
  if (riskCategory === "moderate") {
    if (trackStatus === "off-track" || boneLossPercent >= 13.5) {
      return {
        recommendation:
          "Latarjet procedure recommended. Off-track lesion or significant bone loss compromises glenoid track integrity.",
        rationale: `${trackStatus === "off-track" ? "Hill-Sachs lesion is off-track" : `Bone loss of ${boneLossPercent.toFixed(1)}%`} indicates glenoid track compromise. Bankart + remplissage may be considered in select cases; Latarjet is preferred.`,
        urgency: "prompt",
      };
    }
    return {
      recommendation:
        "Arthroscopic Bankart repair with possible remplissage. Carefully evaluate glenoid track. Consider Latarjet if any concern about track status.",
      rationale: `ISIS score of ${isisTotal}/10 is intermediate. On-track lesion with bone loss < 13.5% may be amenable to Bankart repair. Close intraoperative glenoid track assessment is essential.`,
      urgency: "elective",
    };
  }

  // Low: ISIS 0–3
  return {
    recommendation:
      "Arthroscopic Bankart repair is appropriate. Low recurrence risk with standard soft-tissue repair.",
    rationale: `ISIS score of ${isisTotal}/10 indicates low recurrence risk. On-track status confirmed. Bone loss does not approach critical threshold.`,
    urgency: "elective",
  };
}

/** Summarize the decision for single-line display in the score card. */
export function getDecisionSummary(input: DecisionInput): string {
  const output = getDecisionPathway(input);
  return output.recommendation;
}
