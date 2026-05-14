"use client";

import { useState, useRef } from "react";
import { UploadCloud, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PHIModal } from "@/components/shared/PHIModal";
import { siteConfig } from "@/config/site";

const { upload } = siteConfig;

export function UploadSection() {
  const [phiModalOpen, setPhiModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleZoneInteraction() {
    setPhiModalOpen(true);
  }

  function handlePhiConfirm() {
    setPhiModalOpen(false);
    // Phase 0: file picker opens but no processing occurs
    fileInputRef.current?.click();
  }

  function handlePhiCancel() {
    setPhiModalOpen(false);
  }

  return (
    <section
      id="upload"
      className="bg-[#f8f9fc] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="upload-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2
            id="upload-heading"
            className="font-sans font-bold text-[#0a0e1a] mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {upload.headline}
          </h2>
          <p className="font-sans text-[#64748b] text-base leading-relaxed">
            {upload.body}
          </p>
        </div>

        {/* Upload zone — max-width 640px, full-width on mobile */}
        <div className="max-w-xl mx-auto w-full">
          <div className="relative">
            <button
              type="button"
              onClick={handleZoneInteraction}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleZoneInteraction();
              }}
              aria-label="Upload de-identified CT imaging"
              className={cn(
                "w-full min-h-[220px] rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-4 p-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5fae]",
                isDragOver
                  ? "border-[#1a5fae] bg-[#1a5fae]/5"
                  : "border-[#e2e8f0] bg-white hover:border-[#1a5fae]/50 hover:bg-[#1a5fae]/2"
              )}
            >
              <UploadCloud
                size={40}
                className={cn(
                  "transition-colors duration-200",
                  isDragOver ? "text-[#1a5fae]" : "text-[#64748b]"
                )}
              />
              <div className="text-center">
                <p className="font-sans font-medium text-[#0a0e1a] text-base">
                  {upload.dropzoneText}
                </p>
                <p className="font-sans text-[#64748b] text-sm mt-1">
                  {upload.dropzoneSub}
                </p>
              </div>
            </button>

            {/* Phase 0 overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl flex items-end justify-center pb-5">
              <div className="bg-[#0f1628]/85 backdrop-blur-sm text-white text-xs font-sans font-medium px-4 py-2 rounded-full tracking-wide">
                {upload.phase0Notice}
              </div>
            </div>
          </div>

          {/* Hidden file input — Phase 0: no processing */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".dcm,image/jpeg,image/png"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />

          {/* PHI disclaimer */}
          <div className="mt-4 flex items-start gap-2 text-[#64748b] text-xs font-sans leading-relaxed">
            <AlertTriangle size={14} className="mt-0.5 flex-shrink-0 text-amber-500" />
            <span>{upload.phiWarning}</span>
          </div>
        </div>
      </div>

      <PHIModal
        open={phiModalOpen}
        onConfirm={handlePhiConfirm}
        onCancel={handlePhiCancel}
      />
    </section>
  );
}
