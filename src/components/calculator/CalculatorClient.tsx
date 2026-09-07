"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  computeISISScore,
  computeRiskCategory,
  getIsisRecommendation,
} from "@/lib/clinical";
import type { ClinicalInput } from "@/lib/clinical/types";
import { RiskForm } from "./RiskForm";
import { ScoreDisplay } from "./ScoreDisplay";

const BASE_INITIAL: ClinicalInput = {
  ageAtFirstDislocation: 0,
  competitiveSport: false,
  contactOrOverheadSport: false,
  anteriorHyperlaxity: false,
  boneLossPercent: 0,
  hillSachsTrackStatus: "on-track",
  priorDislocationCount: 1,
  sex: "male",
};

function CalculatorClientInner() {
  const searchParams = useSearchParams();
  const initialBoneLoss = searchParams.get("boneLoss");
  const parsedBoneLoss = initialBoneLoss ? parseFloat(initialBoneLoss) : 0;

  const [form, setForm] = useState<ClinicalInput>(() => ({
    ...BASE_INITIAL,
    boneLossPercent: isNaN(parsedBoneLoss) ? 0 : parsedBoneLoss,
  }));

  // All computations are pure and cheap — recompute live on every change.
  const derived = useMemo(() => {
    const isis = computeISISScore(form);
    const riskCategory = computeRiskCategory(isis.total, form.boneLossPercent, form.hillSachsTrackStatus);
    const isOverride = form.boneLossPercent > 20 && form.hillSachsTrackStatus === "off-track";
    const recommendation = getIsisRecommendation(riskCategory, isOverride);

    return { isis, riskCategory, isOverride, recommendation };
  }, [form]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Page header */}
      <div className="border-b border-[#e5e5e3] pb-6">
        <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-2">
          Client-side only. No data transmitted.
        </p>
        <h1
          className="font-display italic text-[#0a0e1a] mb-1"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          ISIS Risk Calculator
        </h1>
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-wider leading-relaxed">
          Balg &amp; Boileau ISIS · JBJS 2007 &nbsp;·&nbsp; Di Giacomo Glenoid Track · Arthroscopy 2014 &nbsp;·&nbsp; Rule-based decision pathway
        </p>
      </div>

      {/* Inputs (left) + live results (right, sticky on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <RiskForm
          value={form}
          onChange={setForm}
          onReset={() => setForm(BASE_INITIAL)}
        />

        <div className="lg:sticky lg:top-24">
          <ScoreDisplay
            input={form}
            isis={derived.isis}
            recommendation={derived.recommendation}
            riskCategory={derived.riskCategory}
            isOverride={derived.isOverride}
          />
        </div>
      </div>
    </div>
  );
}

export function CalculatorClient() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-sm text-[#64748b]">Loading calculator...</div>}>
      <CalculatorClientInner />
    </Suspense>
  );
}
