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
    explainActionLabel: "Explain towing step",
    explainPanelTitle: "AI mobility summary",
    icon: Truck,
    accentClassName: "border-sky-200/70 bg-sky-50 text-sky-700",
    spotlightFieldKey: "pickupLocation",
    metricFieldKeys: ["towingDate"],
  },
  "claim-notification": {
    eyebrow: "Claim Intake",
    description: "How the case was reported and who initiated the process.",
    explainActionLabel: "Explain intake step",
    explainPanelTitle: "AI intake summary",
    icon: Bell,
    accentClassName: "border-violet-200/70 bg-violet-50 text-violet-700",
    spotlightFieldKey: "reasonForDamage",
    metricFieldKeys: ["reportType", "dateTime"],
  },
  appraisal: {
    eyebrow: "Expert Review",
    description: "Appraisal assignment details and report completion status.",
    explainActionLabel: "Explain appraisal step",
    explainPanelTitle: "AI appraisal summary",
    icon: BadgeCheck,
    accentClassName: "border-emerald-200/70 bg-emerald-50 text-emerald-700",
    spotlightFieldKey: "expertInfo",
    metricFieldKeys: ["expertAssignmentDate", "contact"],
  },
  "substitute-rental-vehicle": {
    eyebrow: "Courtesy Mobility",
    description: "Replacement vehicle support arranged while repairs continue.",
    explainActionLabel: "Explain mobility support",
    explainPanelTitle: "AI courtesy vehicle summary",
    icon: CarFront,
    accentClassName: "border-cyan-200/70 bg-cyan-50 text-cyan-700",
    spotlightFieldKey: "vehicleModel",
    metricFieldKeys: ["vehicleDuration", "extraDuration"],
  },
  "file-review": {
    eyebrow: "Review Desk",
    description:
      "The claim file is being evaluated against the full case data.",
    explainActionLabel: "Explain review step",
    explainPanelTitle: "AI review summary",
    icon: FolderOpen,
    accentClassName: "border-amber-200/70 bg-amber-50 text-amber-700",
    spotlightFieldKey: "reviewCompletionDate",
    metricFieldKeys: ["reviewReferralDate"],
  },
  "deduction-reason": {
    eyebrow: "Action Required",
    description:
      "Outstanding deductions and the document request blocking progress.",
    explainActionLabel: "Explain deduction blocker",
    explainPanelTitle: "AI deduction summary",
    icon: ShieldAlert,
    accentClassName: "border-rose-200/70 bg-rose-50 text-rose-700",
    spotlightFieldKey: "actionRequired",
    metricFieldKeys: ["policyDeductible", "appreciationDeduction"],
    supportsDocumentAnalysis: true,
  },
  "payment-information": {
    eyebrow: "Settlement",
    description: "Payout destination and reimbursement summary before release.",
    explainActionLabel: "Explain payment step",
    explainPanelTitle: "AI payment summary",
    icon: Wallet,
    accentClassName: "border-emerald-200/70 bg-emerald-50 text-emerald-700",
    spotlightFieldKey: "paymentAmount",
    metricFieldKeys: ["paidTo", "iban"],
  },
  closed: {
    eyebrow: "Closure",
    description:
      "Final closeout details once all prior obligations are resolved.",
    explainActionLabel: "Explain closure step",
    explainPanelTitle: "AI closure summary",
    icon: Archive,
    accentClassName: "border-slate-200/70 bg-slate-100 text-slate-700",
    spotlightFieldKey: "completionDate",
    metricFieldKeys: [],
  },
} satisfies Record<ClaimDashboardApiNodeKind, ClaimNodeRegistryItem>;

export function getClaimNodeRegistryItem(kind: ClaimDashboardApiNodeKind) {
  return claimNodeRegistry[kind];
}
