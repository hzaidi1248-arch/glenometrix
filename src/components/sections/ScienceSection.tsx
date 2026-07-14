import { siteConfig } from "@/config/site";

const { science } = siteConfig;

/**
 * The Science — validation study results (Khan et al., McMaster 2026).
 * Gives the manuscript a proper home: real reliability, concordance, and
 * cohort figures, distinct from the in-dashboard clinical-literature library.
 */
export function ScienceSection() {
  return (
    <section
      id="science"
      className="bg-[#fdfcfc] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="science-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16 items-start mb-4">
          <div>
            <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-5">
              {science.label}
            </p>
            <h2
              id="science-heading"
              className="font-display italic text-[#0a0e1a] leading-tight"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.025em",
              }}
            >
              {science.headline}
            </h2>
          </div>
          <div className="flex items-start lg:pt-10">
            <p
              className="font-sans text-[#64748b] leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.0625rem)" }}
            >
              {science.body}
            </p>
          </div>
        </div>

        {/* Results grid — gap-px creates 1px rules at every breakpoint correctly */}
        <div className="mt-12 border-t border-[#e5e5e3]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e3]">
            {science.stats.map((stat) => (
              <div
                key={stat.value}
                className="bg-[#fdfcfc] flex flex-col gap-3 py-8 px-8"
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="font-mono font-bold text-[#0a0e1a] leading-none tabular-nums"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)", letterSpacing: "-0.05em" }}
                  >
                    {stat.value}
                  </span>
                  {"note" in stat && stat.note && (
                    <span className="font-mono text-[10px] text-[#9ca3af] tracking-wide">
                      {stat.note}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-px bg-[#1a5fae]" />
                  <span className="font-sans text-[#64748b] text-sm leading-snug max-w-xs">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Method + citation */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 border-t border-[#e5e5e3] pt-8">
          <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed border-l-2 border-[#1a5fae] pl-4">
            {science.method}
          </p>
          <p className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-wider leading-relaxed self-center">
            {science.citation}
          </p>
        </div>
      </div>
    </section>
  );
}
