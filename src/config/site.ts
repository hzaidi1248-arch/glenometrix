/**
 * All editable copy and site configuration lives here.
 * Components import from this file — no strings hardcoded in JSX.
 *
 * Publication stats sourced from:
 * Khan M et al. "GlenometriX: A Reliable Tool for Quantifying Glenoid Bone Loss"
 * McMaster University — manuscript in submission, 2026.
 */

export const siteConfig = {
  name: "Glenometrix",
  tagline: "Glenoid Bone Loss, Measured.",
  description:
    "Glenoid bone loss quantification for shoulder instability research. Built by orthopedic surgeons, for orthopedic surgeons.",
  url: "https://glenometrix.com",
  copyright: `© ${new Date().getFullYear()} Glenometrix. All rights reserved.`,

  nav: {
    links: [
      { label: "How It Works", href: "/#how" },
      { label: "The Science", href: "/#science" },
      { label: "Try Calculator", href: "/dashboard/calculator" },
    ],
    cta: { label: "Request Access", href: "/#access" },
  },

  trustStrip: {
    label: "Evidence base",
    items: [
      "Khan et al. · GlenometriX Validation · McMaster University 2026",
      "Balg & Boileau · ISIS Score · JBJS 2007",
      "Di Giacomo et al. · Glenoid Track · Arthroscopy 2014",
      "Burkhart & De Beer · Critical Threshold · Arthroscopy 2000",
    ],
  },

  hero: {
    badge: "Research Access",
    headline: "Quantify What Others",
    headlineAccent: "Estimate.",
    subhead:
      "Glenometrix measures glenoid bone loss from 3D CT scans with ICC 0.87 agreement against expert clinicians. The objective measurement every shoulder instability case requires.",
    cta: { label: "Try the Calculator", href: "/dashboard/calculator" },
    ctaSecondary: { label: "Request Access", href: "#access" },
  },

  problem: {
    headline: "Bone loss changes everything. Most tools don't measure it reliably or accurately.",
    body: "Shoulder instability outcomes hinge on many factors. Glenoid bone loss percentage is one of the most important variables in determining recurrent instability. Yet most clinical assessments rely on visual estimation, which carries documented poor inter- and intra-rater reliability. Glenometrix measures it objectively.",
    stats: [
      {
        value: "40%",
        label: "Recurrence rate with Bankart repair when ISIS score ≥ 7",
        source: "Balg & Boileau, JBJS 2007",
      },
      {
        value: "20%",
        label: "Critical bone loss threshold mandating a bone block procedure",
        source: "Burkhart & De Beer, Arthroscopy 2000",
      },
      {
        value: "0.87",
        label: "Inter-rater ICC against 5 expert clinicians: 3 MSK radiologists, 2 orthopaedic surgeons",
        source: "Khan et al., McMaster University 2026",
      },
    ],
  },

  // Validation study results — Khan et al., McMaster University 2026 (in submission)
  science: {
    label: "The Science",
    headline: "Validated against five expert clinicians.",
    body: "GlenometriX was developed on 90 annotated 3D-CT scans and validated on a separate cohort of 121 scans against five blinded, fellowship-trained experts: three MSK radiologists and two orthopaedic surgeons.",
    stats: [
      {
        value: "ICC 1.00",
        label: "Perfect intra-rater reproducibility. Deterministic algorithm: identical output on repeat measurements.",
      },
      {
        value: "ICC 0.87",
        label: "Inter-rater agreement with the combined expert average",
        note: "95% CI 0.82–0.91",
      },
      {
        value: "88%",
        label: "Concordance across minimal, subcritical, and critical bone loss categories",
      },
      {
        value: "−0.17%",
        label: "Near-zero mean bias vs. the expert average on Bland–Altman analysis",
      },
      {
        value: "121",
        label: "3D-CT scans in the independent validation cohort, separate from training data",
      },
      {
        value: "5",
        label: "Blinded expert raters: 3 MSK radiologists and 2 orthopaedic surgeons",
      },
    ],
    method:
      "A U-Net convolutional neural network segments the glenoid and applies a best-fit circle to the affected side alone. No contralateral scan required.",
    citation:
      'Khan et al. "GlenometriX: A Reliable Tool for Quantifying Glenoid Bone Loss." McMaster University, 2026. Manuscript in submission.',
  },

  metric: {
    headline: "The Glenometrix Score:",
    headlineAccent: "Objective. Reproducible. Instant.",
    body: "Upload a de-identified 3D CT scan. GlenometriX uses a U-Net convolutional neural network to automatically segment the glenoid from the affected side alone. No contralateral imaging required. It then applies a best-fit circle algorithm, and delivers a structured clinical output including ISIS scoring, on/off-track assessment, and a decision pathway.",
    steps: [
      {
        icon: "UploadCloud",
        title: "Upload CT Scan",
        body: "De-identified 3D CT imaging only. En face glenoid reconstruction. DICOM, JPEG, or PNG accepted.",
      },
      {
        icon: "ScanLine",
        title: "AI Segmentation",
        body: "U-Net CNN segments the glenoid, identifies anterior and posterior margins, and applies a best-fit circle algorithm to calculate percentage bone loss.",
      },
      {
        icon: "BarChart3",
        title: "Glenometrix Score",
        body: "Bone loss %, ISIS score, on/off-track status, and a rule-based decision pathway: Bankart, remplissage, or bony augmentation.",
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

    // Landing-page preview copy (gated) — distinct from the dashboard tool above
    landingLabel: "Access Required",
    landingHeadline: "Automated CT Bone Loss Analysis",
    landingBody:
      "GlenometriX quantifies glenoid bone loss directly from a 3D CT scan using a validated AI model (ICC 0.87 agreement with expert clinicians). Full analysis is currently limited to research partners.",
    landingNotice:
      "AI CT analysis is rolling out to research partners. Request access to enable it at your institution.",
    landingCta: "Request Access",
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
    body: "Apply for early access. Open to orthopedic surgeons, sports medicine physicians, and shoulder researchers. Limited spots available.",
    successMessage:
      "You're on the list. We'll reach out when access opens in your region.",
    buttonLabel: "Apply for Access",
    emailPlaceholder: "your@institution.edu",
    institutionPlaceholder: "Hospital or research institution (optional)",
  },

  ruo: {
    banner:
      "Research Use Only. Not for Clinical Diagnostic Use.",
    modal: {
      title: "PHI Warning: Research Use Only",
      body: "Do not upload images containing patient-identifiable information. This tool is for research purposes only and is not cleared or approved for clinical diagnostic use. All results are for research only.",
      confirm: "I understand. Proceed with de-identified imaging only.",
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
        "Smith & Nephew provides shoulder instability solutions including anatomic and reverse total shoulder arthroplasty systems, bone block instrumentation, and the CORI robotic-assisted platform.",
      link: "https://www.smith-nephew.com",
      focus: "Bone block, arthroplasty, robotics",
    },
    {
      name: "Arthrex",
      slug: "arthrex",
      tagline: "Latarjet System · SutureBridge · Instability portfolio",
      description:
        "Arthrex offers the Latarjet instrumentation system, remplissage anchors, and the full Bankart repair portfolio for arthroscopic shoulder surgery.",
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
    headline: "Clinical Evidence Library.",
    body: "Summarized ACE-level literature from OrthoEvidence to inform treatment decisions in shoulder instability and glenoid bone loss. Separate from the GlenometriX validation study.",
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
