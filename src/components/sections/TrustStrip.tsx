import { siteConfig } from "@/config/site";

const { trustStrip } = siteConfig;

/**
 * Slim evidence authority strip between Hero and Problem.
 * Shows the academic foundations the algorithms are built on.
 * Inspired by Mercury/Attio: proof before narrative.
 */
export function TrustStrip() {
  return (
    <div className="bg-[#f5f5f3] border-y border-[#e5e5e3] py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.24em] flex-shrink-0">
          {trustStrip.label}
        </span>

        {/* Scrollable on mobile */}
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {trustStrip.items.map((item, i) => (
            <span key={item} className="flex items-center flex-shrink-0">
              {i > 0 && (
                <span className="mx-4 text-[#d1d1cf] select-none" aria-hidden="true">
                  /
                </span>
              )}
              <span className="font-mono text-[10px] text-[#64748b] tracking-wide whitespace-nowrap">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
