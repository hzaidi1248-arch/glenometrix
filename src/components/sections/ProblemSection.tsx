import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const { problem } = siteConfig;

export function ProblemSection() {
  return (
    <section
      id="science"
      className="bg-[#0a0e1a] text-white py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start mb-0">
          {/* Left — heading */}
          <div>
            <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-5">
              The Problem
            </p>
            <h2
              id="problem-heading"
              className="font-display italic text-white leading-tight"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {problem.headline}
            </h2>
          </div>

          {/* Right — body */}
          <div className="flex items-start pt-0 lg:pt-10">
            <p
              className="font-sans text-white/55 leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.0625rem)" }}
            >
              {problem.body}
            </p>
          </div>
        </div>

        {/* Stats — open grid, structure through spacing. Numbers at maximum impact. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/8 mt-16">
          {problem.stats.map((stat, i) => (
            <div
              key={stat.value}
              className={cn(
                "flex flex-col gap-4 py-10 border-b sm:border-b-0 border-white/8",
                i > 0 && "sm:border-l sm:border-white/8 sm:pl-10",
                i < problem.stats.length - 1 && "sm:pr-10"
              )}
            >
              <span
                className="font-display italic text-white leading-none"
                style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", letterSpacing: "-0.05em" }}
              >
                {stat.value}
              </span>
              <div className="flex flex-col gap-2">
                <div className="w-8 h-px bg-[#1a5fae]" />
                <span className="font-sans text-white/65 text-sm leading-snug max-w-xs">
                  {stat.label}
                </span>
                <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.2em]">
                  {stat.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
