import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ACEReportCardProps {
  id: string;
  title: string;
  grade: string;
  summary: string;
  year: string;
  source: string;
  link: string;
}

export function ACEReportCard({
  title,
  grade,
  summary,
  year,
  source,
  link,
}: ACEReportCardProps) {
  const isGrade1 = grade.includes("Grade I");

  return (
    <article className="border border-[#e2e8f0] rounded-2xl p-6 bg-white flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <Badge
          className={`font-sans text-xs font-semibold flex-shrink-0 hover:opacity-100 ${
            isGrade1
              ? "bg-[#1a5fae]/10 text-[#1a5fae] border-[#1a5fae]/20"
              : "bg-[#f8f9fc] text-[#64748b] border-[#e2e8f0]"
          }`}
        >
          {grade}
        </Badge>
        <span className="font-sans text-[#64748b] text-xs flex-shrink-0">{year}</span>
      </div>

      <h3 className="font-sans font-semibold text-[#0a0e1a] text-sm leading-snug">
        {title}
      </h3>

      <p className="font-sans text-[#64748b] text-sm leading-relaxed flex-1">
        {summary}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#e2e8f0]">
        <span className="font-sans text-[#64748b] text-xs">{source}</span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[#1a5fae] hover:text-[#1550a0] transition-colors"
        >
          View report
          <ExternalLink size={11} />
        </a>
      </div>
    </article>
  );
}
