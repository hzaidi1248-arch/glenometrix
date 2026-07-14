import { AssessmentUpload } from "@/components/assessment/AssessmentUpload";

export const metadata = { title: "Assessment Upload" };

export default function AssessmentPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="border-b border-[#e5e5e3] pb-6">
        <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-2">
          Phase 0 Simulation
        </p>
        <h1
          className="font-display italic text-[#0a0e1a] mb-1"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          Assessment Upload
        </h1>
        <p className="font-sans text-[#9ca3af] text-sm max-w-lg">
          Upload de-identified CT imaging to generate a Glenometrix score.
          All processing is simulated in Phase 0. No data is stored or transmitted.
        </p>
      </div>

      <AssessmentUpload />
    </div>
  );
}
