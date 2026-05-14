"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  return (
    <section className="relative grain-overlay min-h-[90vh] flex items-center bg-white overflow-hidden pt-[100px]">
      {/* Subtle radial background accent */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(26,95,174,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        {/* Desktop: 60/40 split. Mobile: mark above text */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-center">

          {/* Left — text content */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <motion.div {...fadeUp(0.4)}>
              <Badge
                variant="outline"
                className="font-sans text-[#1a5fae] border-[#1a5fae]/30 bg-[#1a5fae]/5 px-3 py-1 text-xs tracking-wide uppercase"
              >
                {hero.badge}
              </Badge>
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
                className="bg-[#1a5fae] hover:bg-[#1550a0] text-white font-sans font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center text-base"
              >
                {hero.cta.label}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="font-sans text-[#0a0e1a] hover:bg-[#f8f9fc] px-6 py-3 rounded-lg transition-colors inline-flex items-center w-full sm:w-auto justify-center text-base"
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
              size={Math.min(240, typeof window !== "undefined" ? window.innerWidth * 0.45 : 200)}
              animated
              color="#1a5fae"
              className="drop-shadow-[0_0_40px_rgba(26,95,174,0.12)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
