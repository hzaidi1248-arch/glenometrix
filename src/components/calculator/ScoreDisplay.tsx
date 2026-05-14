import type { RiskScore } from "@/lib/clinical/types";
import { ISISBreakdown } from "./ISISBreakdown";

interface ScoreDisplayProps {
  result: RiskScore;
}

const RISK_CONFIG: Record<string, { dot: string; text: string; label: string }> = {
  low:      { dot: "bg-[#16a34a]", text: "text-[#16a34a]", label: "Low Risk"      },
  moderate: { dot: "bg-amber-400",  text: "text-amber-600", label: "Moderate Risk" },
  high:     { dot: "bg-[#dc2626]",  text: "text-[#dc2626]", label: "High Risk"     },
  critical: { dot: "bg-[#dc2626]",  text: "text-[#dc2626]", label: "Critical Risk" },
};

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const risk = RISK_CONFIG[result.riskCategory] ?? RISK_CONFIG.low;

  return (
    <div
      className="bg-white flex flex-col gap-6 p-8"
      style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-sans font-semibold text-[#0a0e1a] text-[0.9375rem]">
          Glenometrix Score
        </h3>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#c4c4c2] flex-shrink-0">
          Research Guidance Only
        </span>
      </div>

      {/* Primary scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-[#ebebea] pb-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
            Bone Loss
          </span>
          <span className="score-value text-[#0a0e1a]">
            {result.boneLossPercent.toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
            ISIS Score
          </span>
          <span className="score-value text-[#0a0e1a]">
            {result.isis.total}
            <span className="text-[#c4c4c2] text-base font-sans font-normal ml-1">/10</span>
          </span>
        </div>
      </div>

      {/* Risk + track status */}
      <div className="flex flex-wrap gap-6">
        <span className="inline-flex items-center gap-2">
          <span className={`w-1.5 h-1.5 flex-shrink-0 ${risk.dot}`} />
          <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${risk.text}`}>
            {risk.label}
          </span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 flex-shrink-0 ${
              result.trackStatus === "off-track" ? "bg-amber-400" : "bg-[#16a34a]"
            }`}
          />
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
              result.trackStatus === "off-track" ? "text-amber-600" : "text-[#16a34a]"
            }`}
          >
            {result.trackStatus === "off-track" ? "Off-Track" : "On-Track"}
          </span>
        </span>
      </div>

      {/* Recurrence risk — left-border accent block (Attio-style, no bg card) */}
      <div className="border-l border-[#e5e5e3] pl-4 flex flex-col gap-1">
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
          Recurrence Risk Estimate
        </p>
        <p className="font-sans text-[#0a0e1a] text-sm font-medium leading-snug">
          {result.recurrenceRisk}
        </p>
      </div>

      {/* Decision pathway */}
      <div className="border-l border-[#1a5fae] pl-4 flex flex-col gap-1">
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-1">
          Decision Pathway
        </p>
        <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed italic">
          {result.decisionPathway}
        </p>
      </div>

      {/* ISIS breakdown */}
      <div className="border-t border-[#ebebea] pt-4">
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-3">
          ISIS Score Breakdown
        </p>
        <ISISBreakdown result={result.isis} />
      </div>
    </div>
  );
}
