"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
            ? "bg-white/90 backdrop-blur-sm border-b border-[#e2e8f0]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Glenometrix home">
            <GlenometrixLogo markSize={32} />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {siteConfig.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-[#64748b] hover:text-[#0a0e1a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href={siteConfig.nav.cta.href}
              className="bg-[#1a5fae] hover:bg-[#1550a0] text-white font-sans text-sm font-medium px-4 py-2 rounded-lg transition-colors inline-block"
            >
              {siteConfig.nav.cta.label}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[#0a0e1a] hover:bg-[#f8f9fc] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
