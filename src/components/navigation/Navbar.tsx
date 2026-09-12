"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlenometrixLogo } from "@/components/shared/GlenometrixLogo";
import { MobileDrawer } from "./MobileDrawer";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-9 z-40 w-full transition-all duration-200",
          scrolled
            ? "bg-[#fdfcfc]/95 backdrop-blur-sm border-b border-[#e5e5e3]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Glenometrix home" className="flex-shrink-0">
            <GlenometrixLogo markSize={48} />
          </Link>

          {/* Desktop nav — centered links */}
          <nav
            className="hidden md:flex items-center gap-7 ml-10"
            aria-label="Main navigation"
          >
            {siteConfig.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-[#64748b] hover:text-[#0a0e1a] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right-side CTAs */}
          <div className="hidden md:flex items-center gap-3 ml-auto pl-6">
            <Link
              href={siteConfig.nav.cta.href}
              className="font-sans text-sm font-medium text-[#64748b] hover:text-[#0a0e1a] transition-colors whitespace-nowrap"
            >
              {siteConfig.nav.cta.label}
            </Link>
            <a
              href={siteConfig.nav.toolCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a5fae] hover:bg-[#1550a0] text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-md transition-all shadow-md shadow-[#1a5fae]/25 hover:shadow-lg hover:shadow-[#1a5fae]/30 inline-flex items-center gap-2 whitespace-nowrap"
            >
              {siteConfig.nav.toolCta.label}
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#0a0e1a] hover:bg-[#f5f5f3] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
