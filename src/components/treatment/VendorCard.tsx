import { ExternalLink } from "lucide-react";

interface VendorCardProps {
  name: string;
  tagline: string;
  description: string;
  link: string;
  focus: string;
}

export function VendorCard({ name, tagline, description, link, focus }: VendorCardProps) {
  return (
    <article className="border border-[#e2e8f0] rounded-2xl p-6 bg-white flex flex-col gap-4 h-full">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-sans font-bold text-[#0a0e1a] text-base leading-tight">
          {name}
        </h3>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#64748b] flex-shrink-0 whitespace-nowrap">
          {focus}
        </span>
      </div>

      <p className="font-sans text-[#1a5fae] text-xs font-medium">
        {tagline}
      </p>

      <p className="font-sans text-[#64748b] text-sm leading-relaxed flex-1">
        {description}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#1a5fae] hover:text-[#1550a0] transition-colors mt-auto"
      >
        Visit website
        <ExternalLink size={13} />
      </a>
    </article>
  );
}
