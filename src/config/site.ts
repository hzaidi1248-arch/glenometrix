/**
 * All editable copy and site configuration lives here.
 * Components import from this file — no strings hardcoded in JSX.
 * Lines marked TODO: replace with Moin's clinical statements when available.
 */

export const siteConfig = {
  name: "Glenometrix",
  tagline: "Precision Shoulder Assessment. Powered by AI.",
  description:
    "AI-assisted glenoid bone loss quantification for shoulder instability research. Built by orthopedic surgeons, for orthopedic surgeons.",
  url: "https://glenometrix.com",
  copyright: `© ${new Date().getFullYear()} Glenometrix. All rights reserved.`,

  nav: {
    links: [
      { label: "The Score", href: "/#metric" },
      { label: "Research Access", href: "/#upload" },
      { label: "Dashboard", href: "/dashboard" },
    ],
    cta: { label: "Request Access", href: "/#access" },
  },

  hero: {
    badge: "Limited Research Access — Phase 0",
    // TODO: Replace headline with Moin's preferred positioning statement
    headline: "Quantify What Others",
    headlineAccent: "Estimate.",
    // TODO: Replace with Moin's clinical authority statement
    subhead:
      "Glenometrix delivers objective, reproducible glenoid bone loss quantification — the critical variable surgeons need before every shoulder instability case.",
    cta: { label: "Upload a Scan", href: "#upload" },
    ctaSecondary: { label: "See the Science", href: "#metric" },
  },

  problem: {
    // TODO: Replace with Moin's problem framing statement
    headline: "Bone loss changes everything. Most tools don't measure it.",
    // TODO: Replace with Moin's clinical paragraph
    body: "Shoulder instability outcomes hinge on a single variable — glenoid bone loss percentage. Yet most clinical assessments rely on visual estimation, X-ray approximation, or time-consuming manual segmentation. Glenometrix automates this measurement with AI-assisted precision.",
    stats: [
      // TODO: Replace values and labels with Moin's cited statistics
      {
        value: "40%",
        label: "Recurrence rate with Bankart repair when ISIS score ≥ 7",
        source: "Balg & Boileau, 2007",
      },
      {
        value: "20%",
        label: "Critical bone loss threshold that mandates a bone block procedure",
        source: "Burkhart & De Beer, 2000",
      },
      {
        value: "3×",
        label: "Faster assessment with AI segmentation vs. manual CT measurement",
        source: "TODO: Replace with Moin's figure",
      },
    ],
  },

  metric: {
    headline: "The Glenometrix Score:",
    headlineAccent: "Objective. Reproducible. Instant.",
    // TODO: Replace with Moin's description of the metric
    body: "Upload a de-identified CT scan. Glenometrix automatically segments the glenoid surface, calculates bone loss percentage against a contralateral reference, and delivers a structured clinical output — including ISIS scoring, on/off-track assessment, and a decision pathway.",
    steps: [
      {
        icon: "UploadCloud",
        title: "Upload CT Scan",
        body: "De-identified imaging only. Non-PHI DICOM, JPEG, or PNG accepted.",
      },
      {
        icon: "ScanLine",
        title: "AI Segmentation",
        body: "Automated glenoid surface analysis quantifies bone loss against the contralateral reference.",
      },
      {
        icon: "BarChart3",
        title: "Glenometrix Score",
        body: "Bone loss %, ISIS score, on/off-track status, and a rule-based decision pathway.",
      },
    ],
  },

  upload: {
    headline: "Upload Imaging. Receive Your Score.",
    body: "Research use only. Upload de-identified CT imaging to generate a Glenometrix score. Do not include any patient-identifying information.",
    phase0Notice:
      "Live AI analysis is coming soon. Join the waitlist to be notified when automated scoring goes live.",
    phiWarning:
      "Do not upload images containing patient-identifiable information (name, DOB, MRN, accession number). This tool is for research purposes only and is not a clinical diagnostic device.",
    dropzoneText: "Drop de-identified CT imaging here",
    dropzoneSub: "DICOM · JPEG · PNG · Max 50 MB",
  },

  outputPreview: {
    // Static mock values for the landing page demo card
    boneLossPercent: "18.4",
    isisScore: "7",
    trackStatus: "Off-Track",
    riskCategory: "High Risk",
    // TODO: Replace with Moin's example decision statement
    decisionPathway:
      "Bone block procedure indicated (Latarjet or Eden-Hybinette). Arthroscopic repair contraindicated at this bone loss level.",
  },

  access: {
    headline: "Join the Research Pilot.",
    body: "Apply for early access — orthopedic surgeons, sports medicine physicians, and shoulder researchers. Limited spots available.",
    successMessage:
      "You're on the list. We'll reach out when access opens in your region.",
    buttonLabel: "Apply for Access",
    emailPlaceholder: "your@institution.edu",
    institutionPlaceholder: "Hospital or research institution (optional)",
  },

  ruo: {
    banner:
      "Research Use Only — Not for Clinical Diagnostic Use",
    modal: {
      title: "PHI Warning — Research Use Only",
      body: "Do not upload images containing patient-identifiable information. This tool is for research purposes only and is not cleared or approved for clinical diagnostic use. All results are for research only.",
      confirm: "I understand — proceed with de-identified imaging only",
    },
    footer:
      "Glenometrix is a research tool only. It is not cleared or approved by the FDA, Health Canada, or any regulatory body for clinical diagnostic use. All outputs are intended for research purposes only. Do not use to guide clinical decisions.",
  },

  vendors: [
    {
      name: "Smith & Nephew",
      slug: "smith-nephew",
      tagline: "CORI Surgical System · REGENETEN · Shoulder Instability Solutions",
      description:
        "Smith & Nephew offers comprehensive shoulder instability solutions including anatomic and reverse total shoulder arthroplasty systems, bone block instrumentation, and the CORI robotic-assisted platform.",
      link: "https://www.smith-nephew.com",
      focus: "Bone block, arthroplasty, robotics",
    },
    {
      name: "Arthrex",
      slug: "arthrex",
      tagline: "Latarjet System · SutureBridge · Instability portfolio",
      description:
        "Arthrex is the global leader in arthroscopic shoulder surgery, offering the comprehensive Latarjet instrumentation system, remplissage anchors, and the full Bankart repair portfolio.",
      link: "https://www.arthrex.com",
      focus: "Latarjet, Bankart, remplissage",
    },
    {
      name: "Conmed",
      slug: "conmed",
      tagline: "Linvatec shoulder portfolio · Anchor systems",
      description:
        "Conmed's Linvatec shoulder division provides instability-focused anchor systems, cannulas, and soft tissue repair solutions for arthroscopic shoulder surgery.",
      link: "https://www.conmed.com",
      focus: "Soft tissue repair, anchors",
    },
  ],

  research: {
    headline: "Powered by Research.",
    body: "Summarized ACE-level evidence from OrthoEvidence, curated for shoulder instability and glenoid bone loss.",
    // TODO: Replace with live OrthoEvidence API feed when access is confirmed
    mockReports: [
      {
        id: "1",
        title:
          "Latarjet vs. Arthroscopic Bankart Repair for Recurrent Shoulder Instability",
        grade: "ACE Grade I",
        summary:
          "Latarjet procedure demonstrates significantly lower recurrence rates vs. Bankart repair at 5-year follow-up in patients with bone loss > 13.5%. ISIS score ≥ 7 is a strong predictor of Bankart failure.",
        year: "2024",
        source: "OrthoEvidence ACE Report",
        link: "https://myorthoevidence.com",
      },
      {
        id: "2",
        title: "On-Track vs. Off-Track Hill-Sachs Lesions: Clinical Significance",
        grade: "ACE Grade II",
        summary:
          "Off-track Hill-Sachs lesions are associated with a 4× higher recurrence rate post-Bankart repair. Glenoid track assessment is essential in all patients with prior dislocation.",
        year: "2023",
        source: "OrthoEvidence ACE Report",
        link: "https://myorthoevidence.com",
      },
      {
        id: "3",
        title:
          "Critical Glenoid Bone Loss Threshold: A Systematic Review",
        grade: "ACE Grade I",
        summary:
          "A 20% glenoid bone loss threshold is consistently supported across high-quality trials as the point at which soft-tissue repair failure rates exceed 50%. Bone block procedures are indicated beyond this threshold.",
        year: "2024",
        source: "OrthoEvidence ACE Report",
        link: "https://myorthoevidence.com",
      },
      {
        id: "4",
        title: "ISIS Score Validation in Contemporary Shoulder Instability",
        grade: "ACE Grade II",
        summary:
          "The ISIS score remains a validated, reproducible risk stratification tool. Scores ≥ 7 correlate with ≥ 60% failure rate for isolated Bankart repair regardless of bone loss percentage.",
        year: "2023",
        source: "OrthoEvidence ACE Report",
        link: "https://myorthoevidence.com",
      },
      {
        id: "5",
        title: "Remplissage in Off-Track Instability: Outcomes Meta-Analysis",
        grade: "ACE Grade II",
        summary:
          "Combined Bankart + remplissage in off-track lesions with bone loss < 20% achieves outcomes comparable to Latarjet at 2 years, with lower complication rates in select patients.",
        year: "2024",
        source: "OrthoEvidence ACE Report",
        link: "https://myorthoevidence.com",
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
