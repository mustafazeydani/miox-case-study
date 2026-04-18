import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BadgeCheck,
  Bell,
  CarFront,
  FolderOpen,
  ShieldAlert,
  Truck,
  Wallet,
} from "lucide-react";

import type { ClaimDashboardApiNodeKind } from "./types";

export interface ClaimNodeRegistryItem {
  eyebrow: string;
  description: string;
  stepperLabel: string;
  explainActionLabel: string;
  explainPanelTitle: string;
  icon: LucideIcon;
  accentClassName: string;
  spotlightFieldKey: string | null;
  metricFieldKeys: string[];
  supportsDocumentAnalysis?: boolean;
}

export const claimNodeRegistry = {
  "towing-service": {
    eyebrow: "Mobility Service",
    description: "Vehicle pickup, transport timing, and handoff details.",
    stepperLabel: "Mobility",
    explainActionLabel: "Explain towing step",
    explainPanelTitle: "AI mobility summary",
    icon: Truck,
    accentClassName: "border-sky-400/25 bg-sky-500/10 text-sky-300",
    spotlightFieldKey: "pickupLocation",
    metricFieldKeys: ["towingDate"],
  },
  "claim-notification": {
    eyebrow: "Claim Intake",
    description: "How the case was reported and who initiated the process.",
    stepperLabel: "Intake",
    explainActionLabel: "Explain intake step",
    explainPanelTitle: "AI intake summary",
    icon: Bell,
    accentClassName: "border-violet-400/25 bg-violet-500/10 text-violet-300",
    spotlightFieldKey: "reasonForDamage",
    metricFieldKeys: ["reportType", "dateTime"],
  },
  appraisal: {
    eyebrow: "Expert Review",
    description: "Appraisal assignment details and report completion status.",
    stepperLabel: "Appraisal",
    explainActionLabel: "Explain appraisal step",
    explainPanelTitle: "AI appraisal summary",
    icon: BadgeCheck,
    accentClassName: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
    spotlightFieldKey: "expertInfo",
    metricFieldKeys: ["expertAssignmentDate", "contact"],
  },
  "substitute-rental-vehicle": {
    eyebrow: "Courtesy Mobility",
    description: "Replacement vehicle support arranged while repairs continue.",
    stepperLabel: "Courtesy Car",
    explainActionLabel: "Explain mobility support",
    explainPanelTitle: "AI courtesy vehicle summary",
    icon: CarFront,
    accentClassName: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
    spotlightFieldKey: "vehicleModel",
    metricFieldKeys: ["vehicleDuration", "extraDuration"],
  },
  "file-review": {
    eyebrow: "Review Desk",
    description:
      "The claim file is being evaluated against the full case data.",
    stepperLabel: "Review",
    explainActionLabel: "Explain review step",
    explainPanelTitle: "AI review summary",
    icon: FolderOpen,
    accentClassName: "border-amber-400/25 bg-amber-500/10 text-amber-300",
    spotlightFieldKey: "reviewCompletionDate",
    metricFieldKeys: ["reviewReferralDate"],
  },
  "deduction-reason": {
    eyebrow: "Action Required",
    description:
      "Outstanding deductions and the document request blocking progress.",
    stepperLabel: "Deduction",
    explainActionLabel: "Explain deduction blocker",
    explainPanelTitle: "AI deduction summary",
    icon: ShieldAlert,
    accentClassName: "border-rose-400/25 bg-rose-500/10 text-rose-300",
    spotlightFieldKey: "actionRequired",
    metricFieldKeys: ["policyDeductible", "appreciationDeduction"],
    supportsDocumentAnalysis: true,
  },
  "payment-information": {
    eyebrow: "Settlement",
    description: "Payout destination and reimbursement summary before release.",
    stepperLabel: "Payment",
    explainActionLabel: "Explain payment step",
    explainPanelTitle: "AI payment summary",
    icon: Wallet,
    accentClassName: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
    spotlightFieldKey: "paymentAmount",
    metricFieldKeys: ["paidTo", "iban"],
  },
  closed: {
    eyebrow: "Closure",
    description:
      "Final closeout details once all prior obligations are resolved.",
    stepperLabel: "Closure",
    explainActionLabel: "Explain closure step",
    explainPanelTitle: "AI closure summary",
    icon: Archive,
    accentClassName: "border-slate-400/20 bg-slate-500/10 text-slate-200",
    spotlightFieldKey: "completionDate",
    metricFieldKeys: [],
  },
} satisfies Record<ClaimDashboardApiNodeKind, ClaimNodeRegistryItem>;

export function getClaimNodeRegistryItem(kind: ClaimDashboardApiNodeKind) {
  return claimNodeRegistry[kind];
}
