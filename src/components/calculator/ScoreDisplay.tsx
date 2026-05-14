import type { RiskScore } from "@/lib/clinical/types";
import { Badge } from "@/components/ui/badge";
import { ISISBreakdown } from "./ISISBreakdown";

interface ScoreDisplayProps {
  result: RiskScore;
}

const RISK_STYLES: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  low: {
    bg: "bg-[#16a34a]/10",
    text: "text-[#16a34a]",
    border: "border-[#16a34a]/20",
    label: "Low Risk",
  },
  moderate: {
    bg: "bg-amber-500/10",
    text: "text-amber-700",
    border: "border-amber-500/20",
    label: "Moderate Risk",
  },
  high: {
    bg: "bg-[#dc2626]/10",
    text: "text-[#dc2626]",
    border: "border-[#dc2626]/20",
    label: "High Risk",
  },
  critical: {
    bg: "bg-[#dc2626]/20",
    text: "text-[#dc2626]",
    border: "border-[#dc2626]/40",
    label: "Critical Risk",
  },
};

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const risk = RISK_STYLES[result.riskCategory] ?? RISK_STYLES.low;

  return (
    <div className="border border-[#e2e8f0] rounded-2xl p-8 bg-white flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-sans font-semibold text-[#0a0e1a] text-base">
          Glenometrix Score
        </h3>
        <Badge
          variant="outline"
          className="font-sans text-[10px] uppercase tracking-wider text-[#64748b] border-[#e2e8f0] flex-shrink-0"
        >
          Research Guidance Only
        </Badge>
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

      {/* Risk + track badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          className={`${risk.bg} ${risk.text} ${risk.border} font-sans text-xs font-medium hover:${risk.bg}`}
        >
          {risk.label}
        </Badge>
        <Badge
          className={`font-sans text-xs font-medium ${
            result.trackStatus === "off-track"
              ? "bg-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/10"
              : "bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20 hover:bg-[#16a34a]/10"
          }`}
        >
          {result.trackStatus === "off-track" ? "Off-Track" : "On-Track"}
        </Badge>
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
