import Link from "next/link";
import { siteConfig } from "@/config/site";

const { upload } = siteConfig;

/**
 * Gated AI-CT analysis preview.
 * The live, interactive upload tool lives in the dashboard (AssessmentUpload);
 * on the landing page this is a non-interactive preview whose single action is
 * to request access. No file picker or PHI modal — nothing dead-ends here.
 */
export function UploadSection() {
  return (
    <section
      id="upload"
      className="bg-[#f5f5f3] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="upload-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.24em] mb-4">
            {upload.landingLabel}
          </p>
          <h2
            id="upload-heading"
            className="font-display italic text-[#0a0e1a] mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {upload.landingHeadline}
          </h2>
          <p className="font-sans text-[#64748b] text-base leading-relaxed">
            {upload.landingBody}
          </p>
        </div>

        <div className="max-w-xl mx-auto w-full">
          {/* Static preview panel — clinical instrument aesthetic, no interaction */}
          <div className="w-full min-h-[200px] border border-[#d1d1cf] bg-white flex flex-col items-center justify-center gap-3 p-10">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="stroke-[#9ca3af]"
            >
              <circle cx="16" cy="16" r="6" strokeWidth="1" />
              <line x1="16" y1="2" x2="16" y2="10" strokeWidth="1" />
              <line x1="16" y1="22" x2="16" y2="30" strokeWidth="1" />
              <line x1="2" y1="16" x2="10" y2="16" strokeWidth="1" />
              <line x1="22" y1="16" x2="30" y2="16" strokeWidth="1" />
            </svg>
            <div className="text-center">
              <p className="font-sans font-medium text-[#0a0e1a] text-[0.9375rem]">
                {upload.dropzoneText}
              </p>
              <p className="font-mono text-[10px] text-[#9ca3af] mt-1 uppercase tracking-wider">
                {upload.dropzoneSub}
              </p>
            </div>
          </div>

          {/* Gated notice — inline, left-border accent */}
          <p className="mt-4 font-sans text-[#64748b] text-xs leading-relaxed border-l border-amber-400 pl-3">
            {upload.landingNotice}
          </p>

          {/* Single action — request access */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/#access"
              className="bg-[#0a0e1a] hover:bg-[#1a5fae] text-white font-sans font-medium px-6 py-3 rounded transition-colors inline-flex items-center justify-center text-[0.9375rem]"
            >
              {upload.landingCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
