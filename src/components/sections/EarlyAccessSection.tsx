"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
    // Phase 0: no API call — simulate brief delay
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="access"
      className="bg-[#0f1628] py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="access-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg mx-auto text-center mb-10">
          <h2
            id="access-heading"
            className="font-sans font-bold text-white mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {access.headline}
          </h2>
          <p className="font-sans text-white/70 text-base leading-relaxed">
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
                  <Label htmlFor="access-email" className="font-sans text-white/80 text-sm">
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
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 font-sans focus-visible:ring-[#1a5fae] focus-visible:border-[#1a5fae]"
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
                  <Label htmlFor="access-institution" className="font-sans text-white/80 text-sm">
                    Institution{" "}
                    <span className="text-white/40 text-xs">(optional)</span>
                  </Label>
                  <Textarea
                    id="access-institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={access.institutionPlaceholder}
                    rows={2}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 font-sans resize-none focus-visible:ring-[#1a5fae] focus-visible:border-[#1a5fae]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a5fae] hover:bg-[#1550a0] text-white font-sans font-medium mt-2 disabled:opacity-60"
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
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <CheckCircle size={40} className="text-[#1a5fae]" />
                <p
                  className="font-display italic text-white"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)" }}
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
