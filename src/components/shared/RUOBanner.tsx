import { siteConfig } from "@/config/site";

/**
 * Non-dismissible Research Use Only banner.
 * Sticky top-0, z-50. Regulatory constraint — cannot be toggled or removed.
 */
export function RUOBanner() {
  return (
    <aside
      role="banner"
      aria-label="Regulatory notice"
      className="sticky top-0 z-50 w-full bg-[#0a0e1a] text-white text-center py-2 px-4"
      style={{ fontSize: 11, letterSpacing: "0.04em" }}
    >
      <span className="font-mono uppercase tracking-[0.2em]" style={{ fontSize: 10 }}>
        {siteConfig.ruo.banner}
      </span>
    </aside>
  );
}
