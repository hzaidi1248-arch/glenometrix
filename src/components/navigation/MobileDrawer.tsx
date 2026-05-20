"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { GlenometrixLogo } from "@/components/shared/GlenometrixLogo";
import { siteConfig } from "@/config/site";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-[300px] flex flex-col bg-[#fdfcfc] px-6 py-8">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <GlenometrixLogo markSize={48} className="mb-8" />

        <nav className="flex flex-col gap-0.5 flex-1" aria-label="Mobile navigation">
          {siteConfig.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-sans text-[#0a0e1a] text-base font-medium py-3 px-2 hover:text-[#1a5fae] transition-colors border-b border-[#f0f0ee] last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={siteConfig.nav.cta.href}
          onClick={onClose}
          className="mt-6 w-full bg-[#0a0e1a] hover:bg-[#1a5fae] text-white font-sans text-sm font-medium px-4 py-3 rounded text-center transition-colors inline-block"
        >
          {siteConfig.nav.cta.label}
        </Link>
      </SheetContent>
    </Sheet>
  );
}
