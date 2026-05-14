"use client";

import { useState, useRef } from "react";
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
    fileInputRef.current?.click();
  }

  function handlePhiCancel() {
    setPhiModalOpen(false);
  }

  return (
    <section
      id="upload"
      className="bg-[#f5f5f3] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="upload-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.24em] mb-4">
            Phase 0 — Research Only
          </p>
          <h2
            id="upload-heading"
            className="font-display italic text-[#0a0e1a] mb-4"
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

        {/* Upload zone — sharp edges, minimal, Attio clinical instrument */}
        <div className="max-w-xl mx-auto w-full">
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
              "w-full min-h-[200px] border transition-all duration-150 flex flex-col items-center justify-center gap-3 p-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1a5fae] focus-visible:ring-offset-2",
              isDragOver
                ? "border-[#1a5fae] bg-white"
                : "border-[#d1d1cf] bg-white hover:border-[#1a5fae]"
            )}
          >
            {/* Crosshair mark — clinical, no stock icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className={cn(
                "transition-colors duration-150",
                isDragOver ? "stroke-[#1a5fae]" : "stroke-[#9ca3af]"
              )}
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
          </button>

          {/* Hidden file input — Phase 0: no processing */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".dcm,image/jpeg,image/png"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />

          {/* PHI notice — inline text, no pill */}
          <div className="mt-4 flex items-start gap-3 text-[#64748b] text-xs font-sans leading-relaxed border-l border-amber-400 pl-3">
            <span>{upload.phiWarning}</span>
          </div>

          <p className="mt-3 font-mono text-[10px] text-[#9ca3af] uppercase tracking-wider">
            {upload.phase0Notice}
          </p>
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
