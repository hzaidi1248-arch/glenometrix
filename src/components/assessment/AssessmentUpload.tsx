"use client";

import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PHIModal } from "@/components/shared/PHIModal";
import { siteConfig } from "@/config/site";

type UploadState = "idle" | "confirmed" | "loading" | "done";

export function AssessmentUpload() {
  const [phiModalOpen, setPhiModalOpen] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, outputPreview } = siteConfig;

  function handleZoneInteraction() {
    if (uploadState !== "idle") return;
    setPhiModalOpen(true);
  }

  function handlePhiConfirm() {
    setPhiModalOpen(false);
    fileInputRef.current?.click();
  }

  function handlePhiCancel() {
    setPhiModalOpen(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setUploadState("loading");
    setTimeout(() => setUploadState("done"), 2200);
  }

  function handleReset() {
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (uploadState === "done") {
    return (
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display italic text-[#0a0e1a] text-xl" style={{ letterSpacing: "-0.02em" }}>
            Analysis Complete
          </h2>
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#c4c4c2]">
            RUO
          </span>
        </div>

        <div
          className="bg-white flex flex-col gap-6 p-8"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}
        >
          <div className="grid grid-cols-2 gap-6 border-b border-[#ebebea] pb-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                Bone Loss
              </span>
              <span className="score-value text-[#0a0e1a]">
                {outputPreview.boneLossPercent}%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em]">
                ISIS Score
              </span>
              <span className="score-value text-[#0a0e1a]">
                {outputPreview.isisScore}
                <span className="text-[#c4c4c2] text-base font-sans font-normal ml-1">/10</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#dc2626] flex-shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#dc2626]">
                {outputPreview.riskCategory}
              </span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400 flex-shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-600">
                {outputPreview.trackStatus}
              </span>
            </span>
          </div>

          <div className="border-l border-[#1a5fae] pl-4 flex flex-col gap-1">
            <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] mb-1">
              Decision Pathway
            </p>
            <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed italic">
              {outputPreview.decisionPathway}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-[0.2em] hover:text-[#0a0e1a] transition-colors w-fit"
        >
          Upload another scan
        </button>
      </div>
    );
  }

  if (uploadState === "loading") {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 py-16">
        <Loader2 size={32} className="text-[#1a5fae] animate-spin" />
        <p className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-wider">
          Analyzing imaging — Phase 0 simulation
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <div>
        <h2
          className="font-display italic text-[#0a0e1a] text-xl mb-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          Assessment Upload
        </h2>
        <p className="font-sans text-[#64748b] text-sm">
          {upload.body}
        </p>
      </div>

      {/* Upload zone — clinical instrument, sharp edges */}
      <button
        type="button"
        onClick={handleZoneInteraction}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleZoneInteraction(); }}
        aria-label="Upload CT imaging"
        className={cn(
          "w-full min-h-[190px] border transition-all duration-150 flex flex-col items-center justify-center gap-3 p-8 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1a5fae] focus-visible:ring-offset-1",
          isDragOver
            ? "border-[#1a5fae] bg-white"
            : "border-[#d1d1cf] bg-[#fdfcfc] hover:border-[#1a5fae]"
        )}
      >
        <svg
          width="28"
          height="28"
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
          <p className="font-sans font-medium text-[#0a0e1a] text-[0.875rem]">{upload.dropzoneText}</p>
          <p className="font-mono text-[9px] text-[#9ca3af] mt-1 uppercase tracking-wider">{upload.dropzoneSub}</p>
        </div>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".dcm,image/jpeg,image/png"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleFileChange}
      />

      <div className="flex items-start gap-3 text-[#64748b] text-xs font-sans leading-relaxed border-l border-amber-400 pl-3">
        <span>{upload.phiWarning}</span>
      </div>

      <p className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-wider">
        {upload.phase0Notice}
      </p>

      <PHIModal
        open={phiModalOpen}
        onConfirm={handlePhiConfirm}
        onCancel={handlePhiCancel}
      />
    </div>
  );
}
