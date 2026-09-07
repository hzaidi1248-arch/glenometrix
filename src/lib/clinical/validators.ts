/**
 * Clinical input validation guards.
 * Called before any computation — prevents out-of-range values from producing
 * misleading clinical outputs.
 */

import type { ClinicalInput, ValidationResult, ValidationError } from "./types";

const RULES: Array<{
  field: keyof ClinicalInput;
  test: (v: ClinicalInput) => boolean;
  message: string;
}> = [
  {
    field: "ageAtFirstDislocation",
    test: (v) => v.ageAtFirstDislocation >= 10 && v.ageAtFirstDislocation <= 90,
    message: "Age at first dislocation must be between 10 and 90 years.",
  },
  {
    field: "boneLossPercent",
    test: (v) => v.boneLossPercent >= 0 && v.boneLossPercent <= 100,
    message: "Bone loss percentage must be between 0 and 100.",
  },
  {
    field: "priorDislocationCount",
    test: (v) => v.priorDislocationCount >= 1 && v.priorDislocationCount <= 100,
    message: "Prior dislocation count must be at least 1.",
  },
];

export function validateClinicalInput(input: ClinicalInput): ValidationResult {
  const errors: ValidationError[] = RULES.filter(
    (rule) => !rule.test(input)
  ).map((rule) => ({ field: rule.field, message: rule.message }));

  return { valid: errors.length === 0, errors };
}
