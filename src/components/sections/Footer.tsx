import Link from "next/link";
import { GlenometrixLogo } from "@/components/shared/GlenometrixLogo";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[#0f1628] border-t border-white/10 px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <GlenometrixLogo variant="light" markSize={32} />
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Nav links — stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-sans text-white/40 text-xs uppercase tracking-widest font-medium">
                Navigation
              </p>
              {siteConfig.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-white/40 text-xs uppercase tracking-widest font-medium">
                Research
              </p>
              {[
                { label: "Upload Imaging", href: "/#upload" },
                { label: "Request Access", href: "/#access" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RUO legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col gap-4">
          <p className="font-sans text-white/40 text-xs leading-relaxed max-w-3xl">
            {siteConfig.ruo.footer}
          </p>
          <p className="font-sans text-white/30 text-xs">
            {siteConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
