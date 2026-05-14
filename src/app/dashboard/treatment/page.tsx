import { VendorCard } from "@/components/treatment/VendorCard";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Treatment Options" };

export default function TreatmentPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="border-b border-[#e5e5e3] pb-6">
        <p className="font-mono text-[9px] text-[#1a5fae] uppercase tracking-[0.24em] mb-2">
          Surgical Systems
        </p>
        <h1
          className="font-display italic text-[#0a0e1a] mb-1"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          Treatment Options
        </h1>
        <p className="font-sans text-[#9ca3af] text-sm leading-relaxed max-w-2xl">
          Shoulder instability implant systems and procedural solutions from
          leading surgical device manufacturers. For educational reference only.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {siteConfig.vendors.map((vendor) => (
          <VendorCard key={vendor.slug} {...vendor} />
        ))}
      </div>
    </div>
  );
}
