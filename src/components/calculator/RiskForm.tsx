"use client";

import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
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
import type { ClinicalInput } from "@/lib/clinical/types";

interface RiskFormProps {
  value: ClinicalInput;
  onChange: (next: ClinicalInput) => void;
  onReset: () => void;
}

/**
 * Live clinical input form — fully controlled by the parent.
 * No submit: every change flows up immediately so results update in real time
 */
export function RiskForm({ value, onChange, onReset }: RiskFormProps) {
  function set<K extends keyof ClinicalInput>(field: K, v: ClinicalInput[K]) {
    onChange({ ...value, [field]: v });
  }

  function setNum(field: keyof ClinicalInput, raw: string) {
    set(field, (parseFloat(raw) || 0) as ClinicalInput[typeof field]);
  }

  const agePts =
    value.ageAtFirstDislocation === 0 ? 0 :
    value.ageAtFirstDislocation < 20 ? 2 :
    value.ageAtFirstDislocation <= 30 ? 1 : 0;

  const boneLossPts =
    value.boneLossPercent > 20 ? 2 :
    value.boneLossPercent >= 10 ? 1 : 0;

  return (
    <div className="flex flex-col gap-6">
      <p className="font-sans text-[#64748b] text-sm leading-relaxed">
        Results update live as you enter each factor.{" "}
        <span className="font-medium text-[#0a0e1a]">Research use only. Not for clinical use.</span>
      </p>

      {/* ── ISIS Score Factors ─────────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.2em] mb-2">
          ISIS Score Factors
        </legend>

        {/* Age — real value, with a live points indicator */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <Label htmlFor="ageAtFirst" className="font-sans text-[#0a0e1a] text-sm">
              Age at first dislocation (years)
            </Label>
            <span
              className={cn(
                "font-mono text-[10px] flex-shrink-0 tabular-nums",
                agePts > 0 ? "text-[#1a5fae] font-semibold" : "text-[#9ca3af]"
              )}
            >
              +{agePts} {agePts === 1 ? "pt" : "pts"}
            </span>
          </div>
          <Input
            id="ageAtFirst"
            type="number"
            inputMode="numeric"
            value={value.ageAtFirstDislocation || ""}
            onChange={(e) => setNum("ageAtFirstDislocation", e.target.value)}
            placeholder="e.g. 18"
            min={10}
            max={90}
            className="rounded-none font-sans text-sm focus-visible:ring-0 focus-visible:border-[#1a5fae]"
          />
          <p className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-wider">
            &lt; 20 = 2 pts · 20–30 = 1 pt · &gt; 30 = 0 pts
          </p>
        </div>

        <SegField
          label="Competitive-level sport participation"
          hint="+2 pts"
          value={value.competitiveSport}
          onChange={(v) => set("competitiveSport", v)}
        />
        <SegField
          label="Contact or forced overhead arm elevation sport"
          hint="+1 pt"
          value={value.contactOrOverheadSport}
          onChange={(v) => set("contactOrOverheadSport", v)}
        />
        <SegField
          label="Anterior shoulder or GHIS hyperlaxity"
          hint="+1 pt"
          value={value.anteriorHyperlaxity}
          onChange={(v) => set("anteriorHyperlaxity", v)}
        />
      </fieldset>

      {/* ── Bone Loss & Track Status ─────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.2em] mb-2">
          Bone Loss &amp; Track Status
        </legend>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <Label htmlFor="boneLossPercent" className="font-sans text-[#0a0e1a] text-sm">
              Glenoid bone loss (%)
            </Label>
            <span
              className={cn(
                "font-mono text-[10px] flex-shrink-0 tabular-nums",
                boneLossPts > 0 ? "text-[#1a5fae] font-semibold" : "text-[#9ca3af]"
              )}
            >
              +{boneLossPts} {boneLossPts === 1 ? "pt" : "pts"}
            </span>
          </div>
          <Input
            id="boneLossPercent"
            type="number"
            inputMode="decimal"
            value={value.boneLossPercent || ""}
            onChange={(e) => setNum("boneLossPercent", e.target.value)}
            placeholder="%"
            min={0}
            max={100}
            step="0.1"
            className="rounded-none font-sans text-sm focus-visible:ring-0 focus-visible:border-[#1a5fae]"
          />
          <p className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-wider">
            &lt; 10% = 0 pts · 10–20% = 1 pt · &gt; 20% = 2 pts
          </p>
        </div>

        <SegFieldTrack
          label="Hill-Sachs track status"
          hint="+2 pts if off-track"
          value={value.hillSachsTrackStatus}
          onChange={(v) => set("hillSachsTrackStatus", v as ClinicalInput["hillSachsTrackStatus"])}
        />
      </fieldset>

      {/* ── Clinical Context ───────────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.2em] mb-2">
          Clinical Context (optional)
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumField
            id="priorDislocations"
            label="Total prior dislocation count"
            value={value.priorDislocationCount || ""}
            onChange={(v) => setNum("priorDislocationCount", v)}
            placeholder="e.g. 3"
            min={1}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sex" className="font-sans text-[#0a0e1a] text-sm">
              Biological sex
            </Label>
            <Select
              value={value.sex}
              onValueChange={(v) => set("sex", v as ClinicalInput["sex"])}
            >
              <SelectTrigger id="sex" className="font-sans text-sm rounded-none">
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

      <div className="flex pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="rounded-none font-sans text-[#64748b] gap-2"
        >
          <RotateCcw size={14} />
          Reset
        </Button>
      </div>
    </div>
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
      <Label htmlFor={id} className="font-sans text-[#0a0e1a] text-sm">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step="0.1"
        className={cn(
          "rounded-none font-sans text-sm focus-visible:ring-0 focus-visible:border-[#1a5fae]",
          error && "border-[#dc2626]"
        )}
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

function SegField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm text-[#0a0e1a] leading-snug">
          {label}
        </span>
        <span className="font-mono text-[10px] text-[#1a5fae] flex-shrink-0">
          {hint}
        </span>
      </div>
      <div
        className="grid grid-cols-2 gap-px bg-[#e5e5e3]"
        role="group"
        aria-label={label}
      >
        <SegButton active={value} onClick={() => onChange(true)}>
          Yes
        </SegButton>
        <SegButton active={!value} onClick={() => onChange(false)}>
          No
        </SegButton>
      </div>
    </div>
  );
}

function SegFieldTrack({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm text-[#0a0e1a] leading-snug">
          {label}
        </span>
        <span className="font-mono text-[10px] text-[#1a5fae] flex-shrink-0">
          {hint}
        </span>
      </div>
      <div
        className="grid grid-cols-2 gap-px bg-[#e5e5e3]"
        role="group"
        aria-label={label}
      >
        <SegButton active={value === "on-track"} onClick={() => onChange("on-track")}>
          On-Track
        </SegButton>
        <SegButton active={value === "off-track"} onClick={() => onChange("off-track")}>
          Off-Track
        </SegButton>
      </div>
    </div>
  );
}

function SegButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "py-2.5 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1a5fae] focus-visible:ring-inset",
        active
          ? "bg-[#0a0e1a] text-white font-medium"
          : "bg-white text-[#64748b] hover:text-[#0a0e1a]"
      )}
    >
      {children}
    </button>
  );
}
