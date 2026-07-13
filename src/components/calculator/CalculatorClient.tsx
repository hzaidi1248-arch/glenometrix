"use client";

import { useMemo, useState } from "react";
import {
  computeISISScore,
  computeBoneLossPercent,
  computeTrackStatus,
  getIsisRecommendation,
} from "@/lib/clinical";
import type { ClinicalInput } from "@/lib/clinical/types";
import { RiskForm } from "./RiskForm";
import { ScoreDisplay } from "./ScoreDisplay";

const INITIAL: ClinicalInput = {
  ageAtFirstDislocation: 0,
  competitiveSport: false,
  contactOrOverheadSport: false,
  anteriorHyperlaxity: false,
  hillSachsOnApXray: false,
  glenoidBoneLossOnApXray: false,
  glenoidWidth: 0,
  defectWidth: 0,
  hillSachsWidth: 0,
  hslToRotatorCuffOffset: 0,
  priorDislocationCount: 1,
  sex: "male",
};

export function CalculatorClient() {
  const [form, setForm] = useState<ClinicalInput>(INITIAL);

  // All computations are pure and cheap — recompute live on every change.
  const derived = useMemo(() => {
    const isis = computeISISScore(form);
    const recommendation = getIsisRecommendation(isis.total);
    const boneLossPercent = computeBoneLossPercent(form);
    const track = computeTrackStatus(form);

    // Only surface bone loss / track once the relevant inputs are provided,
    // so we never show meaningless "0mm / on-track" defaults.
    const hasBoneLoss = form.glenoidWidth > 0 && form.defectWidth > 0;
    const hasTrack =
      form.glenoidWidth > 0 &&
      form.defectWidth > 0 &&
      form.hillSachsWidth > 0 &&
      form.hslToRotatorCuffOffset > 0;

    return { isis, recommendation, boneLossPercent, track, hasBoneLoss, hasTrack };
  }, [form]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Page header */}
      <div className="border-b border-[#e5e5e3] pb-6">
        <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-2">
          Client-Side Only — No Data Transmitted
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
          onReset={() => setForm(INITIAL)}
        />

        <div className="lg:sticky lg:top-24">
          <ScoreDisplay
            input={form}
            isis={derived.isis}
            recommendation={derived.recommendation}
            boneLossPercent={derived.boneLossPercent}
            hasBoneLoss={derived.hasBoneLoss}
            track={derived.track}
            hasTrack={derived.hasTrack}
          />
        </div>
      </div>
    </div>
  );
}
