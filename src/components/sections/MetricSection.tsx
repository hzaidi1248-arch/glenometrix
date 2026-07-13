"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const { metric } = siteConfig;

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function staggerItem(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { duration: 0.5, ease: EASE, delay: i * 0.1 },
  };
}

export function MetricSection() {
  return (
    <section
      id="how"
      className="bg-[#fdfcfc] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="metric-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div>
            <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-4">
              How It Works
            </p>
            <h2
              id="metric-heading"
              className="font-display italic text-[#0a0e1a] leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.025em",
              }}
            >
              {metric.headline}{" "}
              <span className="not-italic font-sans font-bold text-[#1a5fae]">{metric.headlineAccent}</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-sans text-[#64748b] text-[0.9375rem] leading-relaxed">
              {metric.body}
            </p>
          </div>
        </motion.div>

        {/* 3-column step strip — 1px gap grid (247Studio blueprint) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e3]">
          {metric.steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="bg-[#fdfcfc] flex flex-col gap-6 px-8 py-10"
              {...staggerItem(i)}
            >
              {/* Step numeral — very large, very faint (structural, not decorative) */}
              <span
                className="font-mono font-semibold text-[#e5e5e3] leading-none select-none"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>

              {/* Thin rule */}
              <div className="w-8 h-px bg-[#1a5fae]" />

              <div className="flex flex-col gap-2.5">
                <h3
                  className="font-sans font-semibold text-[#0a0e1a] leading-tight"
                  style={{ fontSize: "1.0625rem" }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-[#64748b] text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
