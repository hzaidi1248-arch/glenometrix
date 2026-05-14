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
          <h2 className="font-sans font-semibold text-[#0a0e1a] text-lg mb-1">
            Risk Calculator
          </h2>
          <p className="font-sans text-[#64748b] text-xs leading-relaxed">
            Balg &amp; Boileau ISIS (2007) · Bone Loss % · Di Giacomo Track
            Status (2014) · Rule-based decision pathway.
            All computations run locally in your browser — no data is transmitted.
          </p>
        </div>
        <RiskForm onResult={(score) => setResult(score)} />
      </div>

      {/* Result */}
      <div>
        {result ? (
          <ScoreDisplay result={result} />
        ) : (
          <div className="border-2 border-dashed border-[#e2e8f0] rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
            <p className="font-sans text-[#64748b] text-sm">
              Your Glenometrix score will appear here after calculation.
            </p>
            <p className="font-sans text-[#64748b] text-xs">
              Research Use Only — not for clinical diagnostic use
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
