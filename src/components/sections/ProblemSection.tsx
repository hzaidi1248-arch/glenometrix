import { siteConfig } from "@/config/site";

const { problem } = siteConfig;

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="bg-[#0a0e1a] text-white py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20">
          <h2
            id="problem-heading"
            className="font-display italic text-white leading-tight mb-6"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {problem.headline}
          </h2>
          <p
            className="font-sans text-white/60 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.0625rem)" }}
          >
            {problem.body}
          </p>
        </div>

        {/* Stats — open grid with horizontal rules. 247Studio blueprint structure */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-white/10">
          {problem.stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex flex-col gap-3 py-10 ${
                i < problem.stats.length - 1 ? "sm:border-r border-white/10 sm:pr-10 sm:mr-px" : ""
              } ${i > 0 ? "sm:pl-10" : ""} border-b sm:border-b-0 border-white/10`}
            >
              <span
                className="font-display italic text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
              >
                {stat.value}
              </span>
              {/* Thin rule accent */}
              <div className="w-6 h-px bg-[#1a5fae]" />
              <span className="font-sans text-white/70 text-sm leading-snug">
                {stat.label}
              </span>
              <span className="font-mono text-white/30 text-[10px] tracking-wider uppercase">
                {stat.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
