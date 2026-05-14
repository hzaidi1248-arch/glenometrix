import { ACEReportCard } from "@/components/research/ACEReportCard";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Research" };

export default function ResearchPage() {
  const { research } = siteConfig;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h2 className="font-sans font-semibold text-[#0a0e1a] text-lg mb-2">
          {research.headline}
        </h2>
        <p className="font-sans text-[#64748b] text-sm leading-relaxed max-w-2xl">
          {research.body}
        </p>
        <p className="font-sans text-[#64748b] text-xs mt-2">
          Note: Live OrthoEvidence feed pending API access. Displaying curated
          reference reports.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {research.mockReports.map((report) => (
          <ACEReportCard key={report.id} {...report} />
        ))}
      </div>
    </div>
  );
}
