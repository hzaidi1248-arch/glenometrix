import { cn } from "@/lib/utils";
import { interpretBoneLoss } from "@/lib/clinical";
import type { IsisRecommendation } from "@/lib/clinical";
import type { ClinicalInput, ISISResult } from "@/lib/clinical/types";
import type { TrackResult } from "@/lib/clinical/measurement";
import { ISISBreakdown } from "./ISISBreakdown";

interface ScoreDisplayProps {
  input: ClinicalInput;
  isis: ISISResult;
  recommendation: IsisRecommendation;
  /** Bone loss %, only meaningful when glenoid width has been entered */
  boneLossPercent: number;
  hasBoneLoss: boolean;
  /** Track result, only meaningful when all track inputs have been entered */
  track: TrackResult;
  hasTrack: boolean;
}

const REC_STYLES: Record<
  IsisRecommendation["procedure"],
  { border: string; dot: string; text: string; tag: string }
> = {
  bankart: {
    border: "border-[#16a34a]",
    dot: "bg-[#16a34a]",
    text: "text-[#16a34a]",
    tag: "Low ISIS",
  },
  latarjet: {
    border: "border-[#d97706]",
    dot: "bg-[#d97706]",
    text: "text-[#b45309]",
    tag: "High ISIS",
  },
};

export function ScoreDisplay({
  input,
  isis,
  recommendation,
  boneLossPercent,
  hasBoneLoss,
  track,
  hasTrack,
}: ScoreDisplayProps) {
  const rec = REC_STYLES[recommendation.procedure];
  const scorePct = (isis.total / 10) * 100;
  const boneLoss = interpretBoneLoss(boneLossPercent);

  return (
    <div
      className="bg-white flex flex-col"
      style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-3 border-b border-[#ebebea] bg-[#fafaf9]">
        <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.22em]">
          Live ISIS Score
        </span>
        <span className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-[0.22em]">
          Research Use Only
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

        {/* Progress bar with Latarjet threshold marker at 7/10 */}
        <div className="relative h-1.5 bg-[#ebebea]">
          <div
            className={cn("h-full transition-all duration-300", rec.dot)}
            style={{ width: `${scorePct}%` }}
          />
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
          <span className="font-mono text-[8px] text-[#0a0e1a] uppercase tracking-wider">
            ≥ 7 Latarjet threshold
          </span>
        </div>
      </div>

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

      {/* Bone loss — only when entered */}
      {hasBoneLoss && (
        <div className="px-6 py-5 border-t border-[#ebebea] flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
              Glenoid Bone Loss
            </span>
            <span className="font-mono font-semibold text-[#0a0e1a] text-lg tabular-nums">
              {boneLossPercent.toFixed(1)}%
            </span>
          </div>
          <p className="font-sans text-[#64748b] text-xs leading-relaxed">
            <span className="font-medium text-[#0a0e1a]">{boneLoss.label}.</span>{" "}
            {boneLoss.note}
          </p>
        </div>
      )}

      {/* Glenoid track — only when entered */}
      {hasTrack && (
        <div className="px-6 py-5 border-t border-[#ebebea] flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
              Glenoid Track
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className={cn(
                  "w-2 h-2 flex-shrink-0",
                  track.status === "off-track" ? "bg-[#d97706]" : "bg-[#16a34a]"
                )}
              />
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.16em]",
                  track.status === "off-track" ? "text-[#b45309]" : "text-[#16a34a]"
                )}
              >
                {track.status === "off-track" ? "Off-Track" : "On-Track"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-[#64748b] tabular-nums">
            <span>GT {track.glenoidTrack}mm</span>
            <span>HST {track.hillSachsTrack}mm</span>
            <span
              className={track.marginMm < 0 ? "text-[#b45309]" : "text-[#16a34a]"}
            >
              margin {track.marginMm}mm
            </span>
          </div>
        </div>
      )}

      {/* ISIS breakdown */}
      <div className="px-6 py-5 border-t border-[#ebebea]">
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-3">
          ISIS Score Breakdown
        </p>
        <ISISBreakdown result={isis} />
      </div>

      {/* Provenance */}
      <div className="px-6 py-3 border-t border-[#ebebea] bg-[#fafaf9]">
        <p className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-wider leading-relaxed">
          ISIS: Balg &amp; Boileau, JBJS 2007
          {hasTrack && " · Track: Di Giacomo, Arthroscopy 2014"}
          {hasBoneLoss && " · Bone loss: best-fit circle method"}
          {" · "}
          {input.priorDislocationCount > 0 &&
            `${input.priorDislocationCount} prior event${input.priorDislocationCount > 1 ? "s" : ""}`}
        </p>
      </div>
    </div>
  );
}
