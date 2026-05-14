"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Assessment", href: "/dashboard/assessment" },
  { label: "Calculator", href: "/dashboard/calculator" },
  { label: "Treatment", href: "/dashboard/treatment" },
  { label: "Research", href: "/dashboard/research" },
] as const;

export function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard sections"
      className="w-full border-b border-[#e2e8f0] bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll on mobile — no wrapping */}
        <div className="flex overflow-x-auto scrollbar-hide gap-0 -mb-px">
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex-shrink-0 inline-flex items-center px-5 py-4 font-sans text-sm font-medium border-b-2 transition-colors whitespace-nowrap min-h-[44px]",
                  active
                    ? "border-[#1a5fae] text-[#1a5fae]"
                    : "border-transparent text-[#64748b] hover:text-[#0a0e1a] hover:border-[#e2e8f0]"
                )}
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
