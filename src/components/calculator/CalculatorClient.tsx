"use client";

import { useState } from "react";
import { RiskForm } from "./RiskForm";
import { ScoreDisplay } from "./ScoreDisplay";
import type { RiskScore } from "@/lib/clinical/types";

export function CalculatorClient() {
  const [result, setResult] = useState<RiskScore | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl">
      {/* Form */}
      <div className="flex flex-col gap-4">
        <div>
          <h2
            className="font-display italic text-[#0a0e1a] text-xl mb-1"
            style={{ letterSpacing: "-0.02em" }}
          >
            Risk Calculator
          </h2>
          <p className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-wider leading-relaxed">
            Balg &amp; Boileau ISIS (2007) · Bone Loss % · Di Giacomo Track
            Status (2014) · Rule-based decision pathway.
            All computations run locally — no data transmitted.
          </p>
        </div>
        <RiskForm onResult={(score) => setResult(score)} />
      </div>

      {/* Result */}
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
              Research Use Only — not for clinical diagnostic use
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
