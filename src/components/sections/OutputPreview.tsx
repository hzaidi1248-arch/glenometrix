import { GlenometrixMark } from "@/components/shared/GlenometrixMark";
import { siteConfig } from "@/config/site";

const { outputPreview } = siteConfig;

export function OutputPreview() {
  return (
    <section
      className="bg-[#fdfcfc] py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Sample Glenometrix output"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <p className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.24em] mb-10">
          Sample output — research use only
        </p>

        {/* Score card — hairline shadow, sharp corners. Attio instrument aesthetic */}
        <div
          className="w-full max-w-[480px] bg-white p-8 relative"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
        >
          {/* RUO stamp — top right */}
          <span className="absolute top-5 right-5 font-mono text-[9px] uppercase tracking-[0.28em] text-[#c4c4c2]">
            RUO
          </span>

          {/* Mark watermark — top left, very faint */}
          <div className="absolute top-5 left-5 opacity-[0.06]">
            <GlenometrixMark size={28} color="#0a0e1a" />
          </div>

          <div className="flex flex-col gap-6 pt-2">
            {/* Primary scores */}
            <div className="grid grid-cols-2 gap-6 border-b border-[#ebebea] pb-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                  Bone Loss
                </span>
                <span className="score-value text-[#0a0e1a]">
                  {outputPreview.boneLossPercent}%
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                  ISIS Score
                </span>
                <span className="score-value text-[#0a0e1a]">
                  {outputPreview.isisScore}
                  <span className="text-[#c4c4c2] text-base font-sans font-normal ml-1">
                    /10
                  </span>
                </span>
              </div>
            </div>

            {/* Risk + track status */}
            <div className="flex flex-wrap gap-6">
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dc2626] flex-shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#dc2626]">
                  {outputPreview.riskCategory}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 flex-shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-600">
                  {outputPreview.trackStatus}
                </span>
              </span>
            </div>

            {/* Decision pathway */}
            <div className="border-l border-[#1a5fae] pl-4">
              <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-2">
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
