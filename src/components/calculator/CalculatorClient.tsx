"use client";

import { useState } from "react";
import { RiskForm } from "./RiskForm";
import { ScoreDisplay } from "./ScoreDisplay";
import type { RiskScore } from "@/lib/clinical/types";

export function CalculatorClient() {
  const [result, setResult] = useState<RiskScore | null>(null);

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
          Risk Calculator
        </h1>
        <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-wider leading-relaxed">
          Balg &amp; Boileau ISIS · JBJS 2007 &nbsp;·&nbsp; Di Giacomo Glenoid Track · Arthroscopy 2014 &nbsp;·&nbsp; Rule-based decision pathway
        </p>
      </div>

      {/* Two-column form + result */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <RiskForm onResult={(score) => setResult(score)} />

        <div>
          {result ? (
            <ScoreDisplay result={result} />
          ) : (
            <div
              className="bg-white p-10 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]"
              style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.06)" }}
            >
              <div className="w-6 h-px bg-[#e5e5e3] mx-auto mb-2" />
              <p className="font-sans text-[#9ca3af] text-sm">
                Your Glenometrix score will appear here after calculation.
              </p>
              <p className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-wider">
                Research Use Only
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
