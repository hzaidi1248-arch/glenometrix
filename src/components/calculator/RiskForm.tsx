"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  computeISISScore,
  computeRiskCategory,
  computeRecurrenceRisk,
  computeBoneLossPercent,
  computeTrackStatus,
  getDecisionSummary,
  validateClinicalInput,
} from "@/lib/clinical";
import type { ClinicalInput, RiskScore } from "@/lib/clinical/types";

interface RiskFormProps {
  onResult: (score: RiskScore) => void;
}

const INITIAL: ClinicalInput = {
  ageAtFirstDislocation: 0,
  competitiveSport: false,
  contactOrOverheadSport: false,
  anteriorHyperlaxity: false,
  hillSachsOnApXray: false,
  glenoidBoneLossOnApXray: false,
  glenoidWidth: 0,
  defectWidth: 0,
  hillSachsWidth: 0,
  hslToRotatorCuffOffset: 0,
  priorDislocationCount: 1,
  sex: "male",
};

export function RiskForm({ onResult }: RiskFormProps) {
  const [form, setForm] = useState<ClinicalInput>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function setNum(
    field: keyof ClinicalInput,
    raw: string
  ) {
    const value = parseFloat(raw) || 0;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function setBool(field: keyof ClinicalInput, value: boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateClinicalInput(form);
    if (!validation.valid) {
      const errs: Record<string, string> = {};
      validation.errors.forEach((err) => {
        errs[err.field] = err.message;
      });
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Yield to browser paint, then compute synchronously
    setTimeout(() => {
      const isis = computeISISScore(form);
      const boneLossPercent = computeBoneLossPercent(form);
      const track = computeTrackStatus(form);
      const riskCategory = computeRiskCategory(isis.total, boneLossPercent);
      const recurrenceRisk = computeRecurrenceRisk(riskCategory);
      const decisionPathway = getDecisionSummary({
        riskCategory,
        boneLossPercent,
        trackStatus: track.status,
        isisTotal: isis.total,
      });

      const result: RiskScore = {
        isis,
        boneLossPercent,
        trackStatus: track.status,
        riskCategory,
        recurrenceRisk,
        decisionPathway,
      };

      setLoading(false);
      onResult(result);
    }, 0);
  }

  function handleReset() {
    setForm(INITIAL);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <p className="font-sans text-[#64748b] text-sm leading-relaxed">
        Enter clinical measurements to generate an ISIS score, bone loss
        percentage, on/off-track status, and decision pathway.{" "}
        <span className="font-medium text-[#0a0e1a]">Research use only.</span>
      </p>

      {/* ISIS Score Inputs */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-sans font-semibold text-[#0a0e1a] text-sm uppercase tracking-wider mb-1">
          ISIS Score Factors
        </legend>

        <NumField
          id="ageAtFirst"
          label="Age at first dislocation (years)"
          value={form.ageAtFirstDislocation || ""}
          onChange={(v) => setNum("ageAtFirstDislocation", v)}
          error={errors.ageAtFirstDislocation}
          placeholder="e.g. 18"
          min={10}
          max={90}
        />

        <BoolField
          id="competitiveSport"
          label="Competitive-level sport participation"
          hint="+2 pts"
          value={form.competitiveSport}
          onChange={(v) => setBool("competitiveSport", v)}
        />
        <BoolField
          id="contactSport"
          label="Contact or forced overhead arm elevation sport"
          hint="+1 pt"
          value={form.contactOrOverheadSport}
          onChange={(v) => setBool("contactOrOverheadSport", v)}
        />
        <BoolField
          id="hyperlaxity"
          label="Anterior shoulder or GHIS hyperlaxity"
          hint="+1 pt"
          value={form.anteriorHyperlaxity}
          onChange={(v) => setBool("anteriorHyperlaxity", v)}
        />
        <BoolField
          id="hillSachs"
          label="Hill-Sachs lesion visible on AP X-ray (external rotation)"
          hint="+2 pts"
          value={form.hillSachsOnApXray}
          onChange={(v) => setBool("hillSachsOnApXray", v)}
        />
        <BoolField
          id="glenoidLoss"
          label="Loss of inferior glenoid contour on AP X-ray"
          hint="+2 pts"
          value={form.glenoidBoneLossOnApXray}
          onChange={(v) => setBool("glenoidBoneLossOnApXray", v)}
        />
      </fieldset>

      {/* Bone Loss Measurements */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-sans font-semibold text-[#0a0e1a] text-sm uppercase tracking-wider mb-1">
          Bone Loss Measurements (mm)
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumField
            id="glenoidWidth"
            label="Contralateral glenoid width"
            value={form.glenoidWidth || ""}
            onChange={(v) => setNum("glenoidWidth", v)}
            error={errors.glenoidWidth}
            placeholder="mm"
          />
          <NumField
            id="defectWidth"
            label="Glenoid bone defect width"
            value={form.defectWidth || ""}
            onChange={(v) => setNum("defectWidth", v)}
            error={errors.defectWidth}
            placeholder="mm"
          />
        </div>
      </fieldset>

      {/* Track Status Inputs */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-sans font-semibold text-[#0a0e1a] text-sm uppercase tracking-wider mb-1">
          Glenoid Track Assessment (mm)
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumField
            id="hillSachsWidth"
            label="Hill-Sachs lesion width"
            value={form.hillSachsWidth || ""}
            onChange={(v) => setNum("hillSachsWidth", v)}
            error={errors.hillSachsWidth}
            placeholder="mm"
          />
          <NumField
            id="hslOffset"
            label="HSL medial edge to rotator cuff footprint"
            value={form.hslToRotatorCuffOffset || ""}
            onChange={(v) => setNum("hslToRotatorCuffOffset", v)}
            error={errors.hslToRotatorCuffOffset}
            placeholder="mm"
          />
        </div>
      </fieldset>

      {/* Context */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-sans font-semibold text-[#0a0e1a] text-sm uppercase tracking-wider mb-1">
          Clinical Context
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumField
            id="priorDislocations"
            label="Total prior dislocation count"
            value={form.priorDislocationCount || ""}
            onChange={(v) => setNum("priorDislocationCount", v)}
            error={errors.priorDislocationCount}
            placeholder="e.g. 3"
            min={1}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sex" className="font-sans text-[#0a0e1a] text-sm font-medium">
              Biological sex
            </Label>
            <Select
              value={form.sex}
              onValueChange={(v) =>
                setForm((p) => ({
                  ...p,
                  sex: v as ClinicalInput["sex"],
                }))
              }
            >
              <SelectTrigger id="sex" className="font-sans text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male" className="font-sans">Male</SelectItem>
                <SelectItem value="female" className="font-sans">Female</SelectItem>
                <SelectItem value="other" className="font-sans">Other / Not specified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 sm:flex-none bg-[#1a5fae] hover:bg-[#1550a0] text-white font-sans font-medium gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Computing…
            </>
          ) : (
            "Calculate Score"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="font-sans text-[#64748b]"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

/* ─── Field sub-components ─────────────────────────────────────────────────── */

function NumField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  min,
  max,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="font-sans text-[#0a0e1a] text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step="0.1"
        className={`font-sans text-sm ${error ? "border-[#dc2626] focus-visible:ring-[#dc2626]" : ""}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <p id={`${id}-error`} className="font-sans text-xs text-[#dc2626]">
          {error}
        </p>
      )}
    </div>
  );
}

function BoolField({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 cursor-pointer group py-0.5"
    >
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-[#e2e8f0] accent-[#1a5fae] cursor-pointer flex-shrink-0"
      />
      <span className="font-sans text-sm text-[#0a0e1a] group-hover:text-[#1a5fae] transition-colors leading-snug flex-1">
        {label}
      </span>
      <span className="font-sans text-xs text-[#1a5fae] font-medium flex-shrink-0 mt-0.5">
        {hint}
      </span>
    </label>
  );
}
