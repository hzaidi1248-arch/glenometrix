import { siteConfig } from "@/config/site";

const { outputPreview } = siteConfig;

/**
 * Full mock clinical report — the centerpiece of the landing page.
 * Shows the full breadth of what Glenometrix outputs.
 * Inspired by Mercury command-center data display + Attio instrument density.
 */
export function OutputPreview() {
  return (
    <section
      className="bg-[#fdfcfc] py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Sample Glenometrix analysis report"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.24em] mb-4">
            Sample analysis. Research use only.
          </p>
          <h2
            className="font-display italic text-[#0a0e1a] leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.025em" }}
          >
            From 3D CT scan to structured surgical decision.
          </h2>
        </div>

        {/* Report card */}
        <div
          className="bg-white w-full"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
        >
          {/* Report header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#ebebea] bg-[#fafaf9]">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.22em]">
                Glenometrix Analysis Report
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-[0.22em]">
              Research Use Only
            </span>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr_1px_1fr] gap-0">

            {/* Column 1: Primary metrics */}
            <div className="p-6 flex flex-col gap-6">
              <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                Quantitative Output
              </span>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.18em]">
                    Glenoid Bone Loss
                  </span>
                  <span
                    className="font-mono font-semibold text-[#0a0e1a] leading-none"
                    style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.04em" }}
                  >
                    {outputPreview.boneLossPercent}%
                  </span>
                  {/* Progress bar */}
                  <div className="mt-2 h-1 bg-[#ebebea] relative">
                    <div
                      className="h-full bg-[#1a5fae]"
                      style={{ width: `${parseFloat(outputPreview.boneLossPercent)}%` }}
                    />
                    {/* Critical threshold marker at 20% */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-[#dc2626]"
                      style={{ left: "20%" }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="font-mono text-[8px] text-[#c4c4c2]">0%</span>
                    <span className="font-mono text-[8px] text-[#dc2626]">20% critical</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.18em]">
                    ISIS Score
                  </span>
                  <span
                    className="font-mono font-semibold text-[#0a0e1a] leading-none"
                    style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.04em" }}
                  >
                    {outputPreview.isisScore}
                    <span className="text-[#c4c4c2] text-lg font-normal">/10</span>
                  </span>
                  <div className="mt-2 h-1 bg-[#ebebea] relative">
                    <div
                      className="h-full bg-[#1a5fae]"
                      style={{ width: `${(parseInt(outputPreview.isisScore) / 10) * 100}%` }}
                    />
                    {/* Threshold marker at 7 */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-amber-400"
                      style={{ left: "70%" }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="font-mono text-[8px] text-[#c4c4c2]">0</span>
                    <span className="font-mono text-[8px] text-amber-500">≥7 high risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-[#ebebea]" />

            {/* Column 2: Risk status + track */}
            <div className="p-6 flex flex-col gap-6 border-t lg:border-t-0 border-[#ebebea]">
              <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                Clinical Status
              </span>

              {/* Risk category */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#dc2626] flex-shrink-0" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#dc2626]">
                    {outputPreview.riskCategory}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-amber-400 flex-shrink-0" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-600">
                    {outputPreview.trackStatus}
                  </span>
                </div>
              </div>

              {/* ISIS breakdown preview */}
              <div className="flex flex-col gap-2 border-t border-[#ebebea] pt-4">
                <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-1">
                  ISIS Factors
                </span>
                {[
                  { label: "Age < 20y", pts: 2, max: 2 },
                  { label: "Competitive sport", pts: 2, max: 2 },
                  { label: "Hill-Sachs on AP", pts: 2, max: 2 },
                  { label: "Glenoid loss on AP", pts: 1, max: 2 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="font-sans text-[11px] text-[#64748b] leading-none">{row.label}</span>
                    <span className="font-mono text-[10px] flex-shrink-0">
                      <span className={row.pts > 0 ? "text-[#1a5fae] font-semibold" : "text-[#c4c4c2]"}>
                        {row.pts}
                      </span>
                      <span className="text-[#c4c4c2]">/{row.max}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-[#ebebea]" />

            {/* Column 3: Decision pathway */}
            <div className="p-6 flex flex-col gap-6 border-t lg:border-t-0 border-[#ebebea]">
              <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                Decision Pathway
              </span>

              {/* Track measurement visual */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-wider">
                    Glenoid Track
                  </span>
                  <span className="font-mono text-[9px] text-[#64748b]">21.4 / 24.8mm</span>
                </div>
                <div className="h-1.5 bg-[#ebebea] relative">
                  <div className="absolute inset-y-0 left-0 bg-[#1a5fae]" style={{ width: "86%" }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#dc2626]"
                    style={{ left: "74%" }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[8px] text-[#c4c4c2]">Glenoid track width</span>
                  <span className="font-mono text-[8px] text-[#dc2626]">HSI</span>
                </div>
              </div>

              {/* Decision block */}
              <div className="border-l-2 border-[#1a5fae] pl-4 flex-1">
                <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed italic">
                  {outputPreview.decisionPathway}
                </p>
              </div>

              {/* Recurrence risk */}
              <div className="border-t border-[#ebebea] pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                    Recurrence Risk
                  </span>
                  <span
                    className="font-mono font-semibold text-[#dc2626]"
                    style={{ fontSize: "1.25rem", letterSpacing: "-0.03em" }}
                  >
                    &gt; 40%
                  </span>
                </div>
                <p className="font-sans text-[#9ca3af] text-xs mt-1">
                  with soft-tissue Bankart repair at this bone loss level
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
