import { Badge } from "@/components/ui/badge";
import { GlenometrixMark } from "@/components/shared/GlenometrixMark";
import { siteConfig } from "@/config/site";

const { outputPreview } = siteConfig;

export function OutputPreview() {
  return (
    <section
      className="bg-white py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Sample Glenometrix output"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <p className="font-sans text-[#64748b] text-sm uppercase tracking-widest mb-6 font-medium">
          Sample output — research use only
        </p>

        {/* Score card — max 480px, centered */}
        <div className="w-full max-w-[480px] border border-[#e2e8f0] rounded-2xl p-8 relative">
          {/* RUO badge */}
          <Badge
            variant="outline"
            className="absolute top-4 right-4 font-sans text-[10px] uppercase tracking-wider text-[#64748b] border-[#e2e8f0]"
          >
            Research Use Only
          </Badge>

          <div className="flex flex-col gap-6">
            {/* Primary scores */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
                  Bone Loss
                </span>
                <span className="score-value text-[#0a0e1a]">
                  {outputPreview.boneLossPercent}%
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
                  ISIS Score
                </span>
                <span className="score-value text-[#0a0e1a]">
                  {outputPreview.isisScore}
                  <span className="text-[#64748b] text-lg font-sans font-normal ml-1">
                    /10
                  </span>
                </span>
              </div>
            </div>

            {/* Risk + track badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20 font-sans text-xs font-medium hover:bg-[#dc2626]/10">
                {outputPreview.riskCategory}
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 font-sans text-xs font-medium hover:bg-amber-500/10">
                {outputPreview.trackStatus}
              </Badge>
            </div>

            {/* Glenoid mark */}
            <div className="flex justify-center py-2">
              <GlenometrixMark size={80} color="#1a5fae" />
            </div>

            {/* Decision pathway */}
            <div className="border-t border-[#e2e8f0] pt-4">
              <p className="font-sans text-[#64748b] text-xs uppercase tracking-wider mb-2">
                Decision Pathway
              </p>
              <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed italic">
                {outputPreview.decisionPathway}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
