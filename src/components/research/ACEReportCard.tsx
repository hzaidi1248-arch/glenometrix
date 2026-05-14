import { ExternalLink } from "lucide-react";

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
    <article
      className="bg-white flex flex-col gap-4 p-6"
      style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        {/* Grade — left border accent (no pill, no badge) */}
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] border-l-[1.5px] pl-2.5 flex-shrink-0 leading-none py-0.5 ${
            isGrade1
              ? "text-[#1a5fae] border-[#1a5fae]"
              : "text-[#9ca3af] border-[#d1d5db]"
          }`}
        >
          {grade}
        </span>
        <span className="font-mono text-[10px] text-[#9ca3af] flex-shrink-0 tracking-wider">
          {year}
        </span>
      </div>

      <h3 className="font-sans font-semibold text-[#0a0e1a] text-sm leading-snug">
        {title}
      </h3>

      <p className="font-sans text-[#64748b] text-sm leading-relaxed flex-1">
        {summary}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#ebebea]">
        <span className="font-sans text-[#9ca3af] text-xs">{source}</span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[#0a0e1a] hover:text-[#1a5fae] transition-colors"
        >
          View report
          <ExternalLink size={11} />
        </a>
      </div>
    </article>
  );
}
