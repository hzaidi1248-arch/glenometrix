"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const { hero } = siteConfig;

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: EASE, delay },
  };
}

/**
 * Inline clinical readout card — shows the actual product output as hero visual.
 * Dark surface on light hero = product screenshot aesthetic (Mercury/Linear style).
 */
function ClinicalReadoutCard() {
  return (
    <div
      className="w-full max-w-[360px] bg-[#0a0e1a] select-none"
      style={{ boxShadow: "0 40px 80px rgba(10,14,26,0.18), 0 0 0 0.5px rgba(255,255,255,0.06)" }}
      aria-hidden="true"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
        <span className="font-mono text-[9px] text-[#4b5563] uppercase tracking-[0.22em]">
          Glenometrix Output
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fae]" />
          <span className="font-mono text-[9px] text-[#4b5563] uppercase tracking-[0.22em]">
            RUO
          </span>
        </div>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-2 gap-0 border-b border-white/8">
        <div className="px-5 py-5 border-r border-white/8">
          <div className="font-mono text-[9px] text-[#4b5563] uppercase tracking-[0.2em] mb-2">
            Bone Loss
          </div>
          <div
            className="font-mono text-white font-semibold leading-none"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            18.4%
          </div>
          <div className="font-mono text-[9px] text-[#374151] mt-2 uppercase tracking-wider">
            Critical &gt; 20%
          </div>
        </div>
        <div className="px-5 py-5">
          <div className="font-mono text-[9px] text-[#4b5563] uppercase tracking-[0.2em] mb-2">
            ISIS Score
          </div>
          <div
            className="font-mono text-white font-semibold leading-none"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            7<span className="text-[#374151] text-base font-normal">/10</span>
          </div>
          <div className="font-mono text-[9px] text-[#374151] mt-2 uppercase tracking-wider">
            Threshold ≥ 7
          </div>
        </div>
      </div>

      {/* Risk status */}
      <div className="flex items-center gap-5 px-5 py-4 border-b border-white/8">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#dc2626] flex-shrink-0" />
          <span className="font-mono text-[10px] text-[#dc2626] uppercase tracking-[0.18em]">
            High Risk
          </span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-400 flex-shrink-0" />
          <span className="font-mono text-[10px] text-amber-400 uppercase tracking-[0.18em]">
            Off-Track
          </span>
        </span>
        <span className="ml-auto font-mono text-[9px] text-[#374151] uppercase tracking-wider">
          0.6s
        </span>
      </div>

      {/* Glenoid track measurement bar */}
      <div className="px-5 py-4 border-b border-white/8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] text-[#4b5563] uppercase tracking-[0.2em]">
            Glenoid Track
          </span>
          <span className="font-mono text-[9px] text-white/50">21.4mm / 24.8mm</span>
        </div>
        <div className="relative h-1 bg-white/8 overflow-visible">
          <div className="absolute inset-y-0 left-0 bg-[#1a5fae]" style={{ width: "86%" }} />
          {/* Hill-Sachs interval marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-[#dc2626]"
            style={{ left: "74%" }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px] text-[#374151]">Track</span>
          <span className="font-mono text-[8px] text-[#dc2626]">HSI</span>
        </div>
      </div>

      {/* Decision pathway */}
      <div className="px-5 py-4">
        <div className="border-l border-[#1a5fae] pl-3">
          <div className="font-mono text-[9px] text-[#4b5563] uppercase tracking-[0.2em] mb-1.5">
            Decision
          </div>
          <p className="font-sans text-white/60 text-[11px] leading-snug italic">
            Bone block procedure indicated. Latarjet or Eden-Hybinette recommended.
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-[#fdfcfc] overflow-hidden pt-[100px]"
      aria-label="Hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

          {/* Left — text content */}
          <div className="flex flex-col gap-6 max-w-xl">
            <motion.div {...fadeUp(0.4)}>
              <p className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.24em]">
                {hero.badge}
              </p>
            </motion.div>

            <motion.h1
              className="font-display italic text-[#0a0e1a] leading-[0.95]"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
                letterSpacing: "-0.03em",
              }}
              {...fadeUp(0.5)}
            >
              {hero.headline}
              <br />
              <span className="text-[#1a5fae] not-italic font-sans font-bold">
                {hero.headlineAccent}
              </span>
            </motion.h1>

            <motion.p
              className="font-sans text-[#64748b] leading-relaxed max-w-md"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.0625rem)" }}
              {...fadeUp(0.65)}
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-1"
              {...fadeUp(0.75)}
            >
              <Link
                href={hero.cta.href}
                className="bg-[#0a0e1a] hover:bg-[#1a5fae] text-white font-sans font-medium px-6 py-3 rounded transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center text-[0.9375rem]"
              >
                {hero.cta.label}
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="font-sans text-[#0a0e1a] border border-[#e5e5e3] hover:border-[#0a0e1a] px-6 py-3 rounded transition-colors inline-flex items-center w-full sm:w-auto justify-center text-[0.9375rem]"
              >
                {hero.ctaSecondary.label}
              </Link>
            </motion.div>

            {/* Quick stats row — proof before narrative */}
            <motion.div
              className="flex flex-wrap gap-6 pt-3 border-t border-[#e5e5e3]"
              {...fadeUp(0.85)}
            >
              {[
                { value: "40%", label: "recurrence w/ ISIS ≥ 7" },
                { value: "20%", label: "critical bone loss threshold" },
                { value: "< 60s", label: "AI assessment time" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-mono font-semibold text-[#0a0e1a] text-sm" style={{ letterSpacing: "-0.02em" }}>
                    {stat.value}
                  </span>
                  <span className="font-sans text-[#9ca3af] text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — clinical readout card (product preview) */}
          {mounted && (
            <motion.div
              className="hidden md:flex justify-end items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            >
              <ClinicalReadoutCard />
            </motion.div>
          )}
        </div>
      </div>

      {/* Blueprint baseline rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e5e5e3]" />
    </section>
  );
}
