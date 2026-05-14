"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface PHIModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PHIModal({ open, onConfirm, onCancel }: PHIModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const { modal } = siteConfig.ruo;

  function handleConfirm() {
    setAcknowledged(false);
    onConfirm();
  }

  function handleCancel() {
    setAcknowledged(false);
    onCancel();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#0a0e1a] font-sans font-semibold">
            {modal.title}
          </DialogTitle>
          <DialogDescription className="text-[#64748b] font-sans text-sm leading-relaxed mt-2">
            {modal.body}
          </DialogDescription>
        </DialogHeader>

        <label className="flex items-start gap-3 cursor-pointer mt-2 border-l border-amber-400 pl-3">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#1a5fae] cursor-pointer flex-shrink-0"
          />
          <span className="text-[#0a0e1a] text-sm font-sans leading-snug">
            {modal.confirm}
          </span>
        </label>

        <DialogFooter className="mt-4 gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="rounded-none font-sans"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!acknowledged}
            className="rounded-none bg-[#0a0e1a] hover:bg-[#1a5fae] text-white font-sans disabled:opacity-40"
          >
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
