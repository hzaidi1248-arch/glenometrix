import type { RiskScore } from "@/lib/clinical/types";
import { ISISBreakdown } from "./ISISBreakdown";

interface ScoreDisplayProps {
  result: RiskScore;
}

const RISK_DOT: Record<string, { dot: string; text: string; label: string }> = {
  low:      { dot: "bg-[#16a34a]", text: "text-[#16a34a]", label: "Low Risk"      },
  moderate: { dot: "bg-amber-500", text: "text-amber-700", label: "Moderate Risk" },
  high:     { dot: "bg-[#dc2626]", text: "text-[#dc2626]", label: "High Risk"     },
  critical: { dot: "bg-[#dc2626]", text: "text-[#dc2626]", label: "Critical Risk" },
};

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const risk = RISK_DOT[result.riskCategory] ?? RISK_DOT.low;

  return (
    <div className="border border-[#e2e8f0] rounded-2xl p-8 bg-white flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-sans font-semibold text-[#0a0e1a] text-base">
          Glenometrix Score
        </h3>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#64748b] flex-shrink-0">
          Research Guidance Only
        </span>
      </div>

      {/* Primary scores — side by side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
            Bone Loss
          </span>
          <span className="score-value text-[#0a0e1a]">
            {result.boneLossPercent.toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
            ISIS Score
          </span>
          <span className="score-value text-[#0a0e1a]">
            {result.isis.total}
            <span className="text-[#64748b] text-lg font-sans font-normal ml-1">/10</span>
          </span>
        </div>
      </div>

      {/* Risk + track status */}
      <div className="flex flex-wrap gap-5">
        <span className="inline-flex items-center gap-2">
          <span className={`w-1.5 h-1.5 flex-shrink-0 ${risk.dot}`} />
          <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${risk.text}`}>
            {risk.label}
          </span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 flex-shrink-0 ${
              result.trackStatus === "off-track" ? "bg-amber-500" : "bg-[#16a34a]"
            }`}
          />
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
              result.trackStatus === "off-track" ? "text-amber-700" : "text-[#16a34a]"
            }`}
          >
            {result.trackStatus === "off-track" ? "Off-Track" : "On-Track"}
          </span>
        </span>
      </div>

      {/* Recurrence risk */}
      <div className="bg-[#f8f9fc] rounded-xl p-4 flex flex-col gap-1">
        <p className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
          Recurrence Risk Estimate
        </p>
        <p className="font-sans text-[#0a0e1a] text-sm font-medium">
          {result.recurrenceRisk}
        </p>
      </div>

      {/* Decision pathway */}
      <div className="border-t border-[#e2e8f0] pt-4">
        <p className="font-sans text-[#64748b] text-xs uppercase tracking-wider mb-2">
          Decision Pathway
        </p>
        <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed italic">
          {result.decisionPathway}
        </p>
      </div>

      {/* ISIS breakdown */}
      <div className="border-t border-[#e2e8f0] pt-4">
        <p className="font-sans text-[#64748b] text-xs uppercase tracking-wider mb-3">
          ISIS Score Breakdown
        </p>
        <ISISBreakdown result={result.isis} />
      </div>
    </div>
  );
}
