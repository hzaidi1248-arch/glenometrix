"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlenometrixMark } from "@/components/shared/GlenometrixMark";
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

export function HeroSection() {
  const [markSize, setMarkSize] = useState(200);

  useEffect(() => {
    function update() {
      setMarkSize(Math.min(240, window.innerWidth * 0.42));
    }
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-[#fdfcfc] overflow-hidden pt-[100px]"
      aria-label="Hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-center">

          {/* Left — text content */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <motion.div {...fadeUp(0.4)}>
              <p className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.24em]">
                {hero.badge}
              </p>
            </motion.div>

            <motion.h1
              className="font-display italic text-[#0a0e1a] leading-[0.95]"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
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
              className="font-sans text-[#64748b] leading-relaxed max-w-lg"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
              {...fadeUp(0.65)}
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
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
          </div>

          {/* Right — animated mark */}
          <motion.div
            className="flex justify-center items-center order-1 md:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <GlenometrixMark
              size={markSize}
              animated
              color="#1a5fae"
            />
          </motion.div>
        </div>
      </div>

      {/* Blueprint baseline rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e5e5e3]" />
    </section>
  );
}
