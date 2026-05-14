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
    field: "glenoidWidth",
    test: (v) => v.glenoidWidth > 0 && v.glenoidWidth <= 60,
    message: "Glenoid width must be between 1 and 60 mm.",
  },
  {
    field: "defectWidth",
    test: (v) => v.defectWidth >= 0 && v.defectWidth <= v.glenoidWidth,
    message: "Defect width cannot exceed total glenoid width and must be ≥ 0.",
  },
  {
    field: "hillSachsWidth",
    test: (v) => v.hillSachsWidth >= 0 && v.hillSachsWidth <= 60,
    message: "Hill-Sachs width must be between 0 and 60 mm.",
  },
  {
    field: "hslToRotatorCuffOffset",
    test: (v) => v.hslToRotatorCuffOffset >= 0 && v.hslToRotatorCuffOffset <= 60,
    message: "HSL offset must be between 0 and 60 mm.",
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
