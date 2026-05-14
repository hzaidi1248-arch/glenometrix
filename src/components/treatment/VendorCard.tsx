import { ExternalLink } from "lucide-react";

interface VendorCardProps {
  name: string;
  tagline: string;
  description: string;
  link: string;
  focus?: string;
}

export function VendorCard({ name, tagline, description, link }: VendorCardProps) {
  return (
    <article
      className="bg-white flex flex-col gap-4 p-6 h-full"
      style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-sans font-semibold text-[#0a0e1a] text-[0.9375rem] leading-tight">
          {name}
        </h3>
        <p className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.18em]">
          {tagline}
        </p>
      </div>

      <p className="font-sans text-[#64748b] text-sm leading-relaxed flex-1">
        {description}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#0a0e1a] hover:text-[#1a5fae] transition-colors mt-auto border-b border-[#e5e5e3] hover:border-[#1a5fae] pb-0.5 w-fit"
      >
        Visit website
        <ExternalLink size={11} />
      </a>
    </article>
  );
}
