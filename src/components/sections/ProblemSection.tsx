import { siteConfig } from "@/config/site";

const { problem } = siteConfig;

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="bg-[#0f1628] text-white py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
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
            className="font-sans text-white/70 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.0625rem)" }}
          >
            {problem.body}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {problem.stats.map((stat) => (
            <div
              key={stat.value}
              className="bg-[#0f1628] px-8 py-10 flex flex-col gap-3"
            >
              <span
                className="font-display italic text-[#1a5fae] leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
              >
                {stat.value}
              </span>
              <span className="font-sans text-white/80 text-sm leading-snug">
                {stat.label}
              </span>
              <span className="font-sans text-white/40 text-xs">
                {stat.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
