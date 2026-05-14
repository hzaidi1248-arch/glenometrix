import { VendorCard } from "@/components/treatment/VendorCard";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Treatment Options" };

export default function TreatmentPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h2 className="font-display italic text-[#0a0e1a] text-xl mb-2" style={{ letterSpacing: "-0.02em" }}>
          Treatment Options
        </h2>
        <p className="font-sans text-[#64748b] text-sm leading-relaxed max-w-2xl">
          Shoulder instability implant systems and procedural solutions from
          leading surgical device manufacturers. Information provided for
          educational reference only.
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
