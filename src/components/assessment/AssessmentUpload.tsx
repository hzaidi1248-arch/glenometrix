"use client";

import { useState, useRef } from "react";
import { UploadCloud, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PHIModal } from "@/components/shared/PHIModal";
import { GlenometrixMark } from "@/components/shared/GlenometrixMark";
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
    // Phase 0: simulate a brief analysis delay then show mock output
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
          <h2 className="font-sans font-semibold text-[#0a0e1a] text-lg">
            Analysis Complete
          </h2>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#64748b]">
            RUO
          </span>
        </div>

        <div className="border border-[#e2e8f0] rounded-2xl p-8 bg-white flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
                Bone Loss
              </span>
              <span className="score-value text-[#0a0e1a]">
                {outputPreview.boneLossPercent}%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[#64748b] text-xs uppercase tracking-wider">
                ISIS Score
              </span>
              <span className="score-value text-[#0a0e1a]">
                {outputPreview.isisScore}
                <span className="text-[#64748b] text-lg font-sans font-normal ml-1">/10</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#dc2626] flex-shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#dc2626]">
                {outputPreview.riskCategory}
              </span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 flex-shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700">
                {outputPreview.trackStatus}
              </span>
            </span>
          </div>

          <div className="flex justify-center py-2">
            <GlenometrixMark size={80} color="#1a5fae" />
          </div>

          <div className="border-t border-[#e2e8f0] pt-4">
            <p className="font-sans text-[#64748b] text-xs uppercase tracking-wider mb-2">
              Decision Pathway
            </p>
            <p className="font-sans text-[#0a0e1a] text-sm leading-relaxed italic">
              {outputPreview.decisionPathway}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="font-sans text-[#64748b] text-sm underline underline-offset-4 hover:text-[#0a0e1a] transition-colors w-fit"
        >
          Upload another scan
        </button>
      </div>
    );
  }

  if (uploadState === "loading") {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 py-16">
        <Loader2 size={40} className="text-[#1a5fae] animate-spin" />
        <p className="font-sans text-[#64748b] text-sm">
          Analyzing imaging — this is a Phase 0 simulation…
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="font-sans font-semibold text-[#0a0e1a] text-lg mb-1">
          Assessment Upload
        </h2>
        <p className="font-sans text-[#64748b] text-sm">
          {upload.body}
        </p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={handleZoneInteraction}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleZoneInteraction(); }}
          aria-label="Upload CT imaging"
          className={cn(
            "w-full min-h-[200px] rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-4 p-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5fae]",
            isDragOver
              ? "border-[#1a5fae] bg-[#1a5fae]/5"
              : "border-[#e2e8f0] bg-white hover:border-[#1a5fae]/50"
          )}
        >
          <UploadCloud size={36} className={cn("transition-colors", isDragOver ? "text-[#1a5fae]" : "text-[#64748b]")} />
          <div className="text-center">
            <p className="font-sans font-medium text-[#0a0e1a] text-sm">{upload.dropzoneText}</p>
            <p className="font-sans text-[#64748b] text-xs mt-1">{upload.dropzoneSub}</p>
          </div>
        </button>

        <div className="pointer-events-none absolute inset-0 rounded-2xl flex items-end justify-center pb-4">
          <div className="bg-[#0f1628]/80 backdrop-blur-sm text-white text-xs font-sans font-medium px-3 py-1.5 rounded-full">
            {upload.phase0Notice}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".dcm,image/jpeg,image/png"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleFileChange}
      />

      <div className="flex items-start gap-2 text-[#64748b] text-xs font-sans leading-relaxed">
        <AlertTriangle size={13} className="mt-0.5 flex-shrink-0 text-amber-500" />
        <span>{upload.phiWarning}</span>
      </div>

      <PHIModal
        open={phiModalOpen}
        onConfirm={handlePhiConfirm}
        onCancel={handlePhiCancel}
      />
    </div>
  );
}
