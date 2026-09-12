import { cn } from "@/lib/utils";
import { interpretBoneLoss } from "@/lib/clinical";
import type { IsisRecommendation } from "@/lib/clinical";
import type { ClinicalInput, ISISResult, RiskCategory } from "@/lib/clinical/types";
import { ISISBreakdown } from "./ISISBreakdown";

interface ScoreDisplayProps {
  input: ClinicalInput;
  isis: ISISResult;
  recommendation: IsisRecommendation;
  riskCategory: RiskCategory;
  isOverride: boolean;
}

const REC_STYLES: Record<
  IsisRecommendation["procedure"],
  { border: string; dot: string; text: string }
> = {
  bankart: {
    border: "border-[#16a34a]",
    dot: "bg-[#16a34a]",
    text: "text-[#16a34a]",
  },
  "bankart-remplissage": {
    border: "border-[#d97706]",
    dot: "bg-[#d97706]",
    text: "text-[#b45309]",
  },
  "bony-augmentation": {
    border: "border-[#dc2626]",
    dot: "bg-[#dc2626]",
    text: "text-[#dc2626]",
  },
};

const RISK_STYLES: Record<RiskCategory, { badge: string; text: string; bg: string }> = {
  low: { badge: "bg-[#16a34a]/10 text-[#16a34a]", text: "text-[#16a34a]", bg: "bg-[#16a34a]" },
  medium: { badge: "bg-[#d97706]/10 text-[#b45309]", text: "text-[#b45309]", bg: "bg-[#d97706]" },
  high: { badge: "bg-[#dc2626]/10 text-[#dc2626]", text: "text-[#dc2626]", bg: "bg-[#dc2626]" },
};

export function ScoreDisplay({
  input,
  isis,
  recommendation,
  riskCategory,
  isOverride,
}: ScoreDisplayProps) {
  const rec = REC_STYLES[recommendation.procedure];
  const risk = RISK_STYLES[riskCategory];
  const scorePct = (isis.total / 10) * 100;
  const boneLoss = interpretBoneLoss(input.boneLossPercent);

  return (
    <div
      className="bg-white flex flex-col"
      style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-3 border-b border-[#ebebea] bg-[#fafaf9]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.22em]">
            Live Score
          </span>
          <span className={cn("font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded", risk.badge)}>
            {riskCategory} Risk
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-[0.22em]">
          Research Use Only. Not For Clinical Use.
        </span>
      </div>

      {/* Prominent live score */}
      <div className="px-6 pt-6 pb-5 flex flex-col gap-3">
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <span
              className="font-mono font-bold text-[#0a0e1a] leading-none tabular-nums"
              style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", letterSpacing: "-0.05em" }}
            >
              {isis.total}
            </span>
            <span className="font-mono text-[#c4c4c2] text-2xl font-normal">/10</span>
          </div>
          <div className="flex flex-col items-end gap-0.5 pb-1">
            <span className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.2em]">
              of maximum
            </span>
            <span className="font-mono text-lg font-semibold text-[#0a0e1a] tabular-nums">
              {scorePct.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-[#ebebea]">
          <div
            className={cn("h-full transition-all duration-300", risk.bg)}
            style={{ width: `${scorePct}%` }}
          />
          {/* Marker 40% */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-px h-3.5 bg-[#0a0e1a]"
            style={{ left: "40%" }}
            aria-hidden="true"
          />
          {/* Marker 70% */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-px h-3.5 bg-[#0a0e1a]"
            style={{ left: "70%" }}
            aria-hidden="true"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-mono text-[8px] text-[#c4c4c2] uppercase tracking-wider">
            0
          </span>
          <div className="flex gap-4">
            <span className="font-mono text-[8px] text-[#0a0e1a] uppercase tracking-wider">
              ≥ 4 medium
            </span>
            <span className="font-mono text-[8px] text-[#0a0e1a] uppercase tracking-wider">
              ≥ 7 high risk
            </span>
          </div>
        </div>
      </div>

      {isOverride && (
        <div className="px-6 pb-4">
          <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded flex gap-2 items-start">
            <span className="text-[#dc2626]">⚠</span>
            <span className="text-sm text-[#b91c1c] font-sans font-medium">
              GBL &gt; 20% + off-track Hill-Sachs: automatically classified as high risk
            </span>
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className="px-6 pb-6">
        <div className={cn("border-l-2 pl-4 flex flex-col gap-1.5", rec.border)}>
          <div className="flex items-center gap-2">
            <span className={cn("w-2 h-2 flex-shrink-0", rec.dot)} />
            <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
              Recommendation
            </span>
          </div>
          <p className={cn("font-sans font-semibold text-sm leading-snug", rec.text)}>
            {recommendation.label}
          </p>
          <p className="font-sans text-[#64748b] text-xs leading-relaxed">
            {recommendation.detail}
          </p>
        </div>
      </div>

      {/* Status section (Bone Loss and Track) */}
      <div className="px-6 py-5 border-t border-[#ebebea] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
              Glenoid Bone Loss
            </span>
            <span className="font-mono font-semibold text-[#0a0e1a] text-lg tabular-nums">
              {input.boneLossPercent.toFixed(1)}%
            </span>
          </div>
          <p className="font-sans text-[#64748b] text-xs leading-relaxed">
            <span className="font-medium text-[#0a0e1a]">{boneLoss.label}.</span>{" "}
            {boneLoss.note}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#ebebea]/50">
          <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
            Glenoid Track
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 flex-shrink-0",
                input.hillSachsTrackStatus === "off-track" ? "bg-[#d97706]" : "bg-[#16a34a]"
              )}
            />
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.16em]",
                input.hillSachsTrackStatus === "off-track" ? "text-[#b45309]" : "text-[#16a34a]"
              )}
            >
              {input.hillSachsTrackStatus === "off-track" ? "Off-Track" : "On-Track"}
            </span>
          </span>
        </div>
      </div>

      {/* ISIS breakdown */}
      <div className="px-6 py-5 border-t border-[#ebebea]">
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-3">
          Score Breakdown
        </p>
        <ISISBreakdown result={isis} />
      </div>

      {/* Provenance */}
      <div className="px-6 py-3 border-t border-[#ebebea] bg-[#fafaf9]">
        <p className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-wider leading-relaxed">
          ISIS: Balg &amp; Boileau, JBJS 2007
          {input.priorDislocationCount > 0 &&
            ` · ${input.priorDislocationCount} prior event${input.priorDislocationCount > 1 ? "s" : ""}`}
        </p>
      </div>
    </div>
  );
}
