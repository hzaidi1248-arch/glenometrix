import { ACEReportCard } from "@/components/research/ACEReportCard";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Research" };

export default function ResearchPage() {
  const { research } = siteConfig;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="border-b border-[#e5e5e3] pb-6">
        <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-2">
          OrthoEvidence ACE Reports
        </p>
        <h1
          className="font-display italic text-[#0a0e1a] mb-1"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          {research.headline}
        </h1>
        <p className="font-sans text-[#9ca3af] text-sm leading-relaxed max-w-2xl">
          {research.body}
        </p>
        <p className="font-mono text-[9px] text-[#c4c4c2] uppercase tracking-wider mt-3">
          Live OrthoEvidence feed pending API access — displaying curated reference reports
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {research.mockReports.map((report) => (
          <ACEReportCard key={report.id} {...report} />
        ))}
      </div>
    </div>
  );
}
