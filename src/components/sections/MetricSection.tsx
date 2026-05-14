"use client";

import { motion } from "framer-motion";
import { UploadCloud, ScanLine, BarChart3, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

const { metric } = siteConfig;

const ICON_MAP: Record<string, LucideIcon> = {
  UploadCloud,
  ScanLine,
  BarChart3,
};

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
      id="metric"
      className="bg-white py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="metric-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2
            id="metric-heading"
            className="font-sans font-bold text-[#0a0e1a] leading-tight mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {metric.headline}{" "}
            <span className="text-[#1a5fae]">{metric.headlineAccent}</span>
          </h2>
          <p className="font-sans text-[#64748b] text-base leading-relaxed">
            {metric.body}
          </p>
        </motion.div>

        {/* 3-column feature strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
          {metric.steps.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? UploadCloud;
            const isLast = i === metric.steps.length - 1;

            return (
              <div key={step.title} className="flex flex-col md:flex-row items-stretch">
                <motion.div
                  className="flex flex-col items-center md:items-start text-center md:text-left gap-4 px-6 py-8 flex-1 border border-[#e2e8f0] md:border-r-0 rounded-2xl md:rounded-none first:md:rounded-l-2xl last:md:rounded-r-2xl last:md:border-r"
                  {...staggerItem(i)}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a5fae]/8 border border-[#1a5fae]/15 flex-shrink-0">
                    <Icon size={22} className="text-[#1a5fae]" />
                  </div>
                  <div>
                    <h3
                      className="font-sans font-semibold text-[#0a0e1a] mb-2"
                      style={{ fontSize: "1.0625rem" }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-sans text-[#64748b] text-sm leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </motion.div>

                {/* Connector arrow (desktop only) */}
                {!isLast && (
                  <div className="hidden md:flex items-center justify-center w-8 text-[#e2e8f0] flex-shrink-0">
                    <ArrowRight size={16} className="text-[#1a5fae]/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
