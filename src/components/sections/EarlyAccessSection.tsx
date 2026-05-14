"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

const { access } = siteConfig;

export function EarlyAccessSection() {
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError("Email address is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="access"
      className="bg-[#0a0e1a] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="access-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg mx-auto text-center mb-10">
          <p className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.24em] mb-5">
            Limited Access — Phase 0
          </p>
          <h2
            id="access-heading"
            className="font-display italic text-white mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {access.headline}
          </h2>
          <p className="font-sans text-white/50 text-base leading-relaxed">
            {access.body}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="access-email"
                    className="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em]"
                  >
                    Email address <span className="text-[#1a5fae]">*</span>
                  </Label>
                  <Input
                    id="access-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder={access.emailPlaceholder}
                    className="rounded-none bg-white/5 border-white/15 text-white placeholder:text-white/25 font-sans focus-visible:ring-0 focus-visible:border-[#1a5fae] h-11"
                    aria-describedby={emailError ? "access-email-error" : undefined}
                    aria-invalid={!!emailError}
                  />
                  {emailError && (
                    <p id="access-email-error" className="text-red-400 text-xs font-sans">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="access-institution"
                    className="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em]"
                  >
                    Institution{" "}
                    <span className="text-white/25 normal-case">(optional)</span>
                  </Label>
                  <Textarea
                    id="access-institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={access.institutionPlaceholder}
                    rows={2}
                    className="rounded-none bg-white/5 border-white/15 text-white placeholder:text-white/25 font-sans resize-none focus-visible:ring-0 focus-visible:border-[#1a5fae]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-none bg-white text-[#0a0e1a] hover:bg-[#f5f5f3] font-sans font-medium mt-2 disabled:opacity-60 h-11 text-[0.9375rem]"
                >
                  {loading ? "Submitting..." : access.buttonLabel}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-5 py-10 text-center border-l-2 border-[#1a5fae] pl-6"
              >
                <span className="font-mono text-[10px] text-[#1a5fae] uppercase tracking-[0.24em]">
                  Submitted
                </span>
                <p
                  className="font-display italic text-white"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}
                >
                  {access.successMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
