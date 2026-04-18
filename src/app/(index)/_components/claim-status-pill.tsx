import { cn } from "@/lib/utils";

import type { ClaimDashboardApiNode } from "../_utils/types";

interface ClaimStatusPillProps {
  status: ClaimDashboardApiNode["status"];
  tone: ClaimDashboardApiNode["tone"];
}

const toneClasses = {
  complete: "border-emerald-200/70 bg-emerald-50 text-emerald-700",
  report: "border-sky-200/70 bg-sky-50 text-sky-700",
  current: "border-amber-200/70 bg-amber-50 text-amber-700",
  pending: "border-slate-200/70 bg-slate-100 text-slate-600",
} as const;

export function ClaimStatusPill({ status, tone }: ClaimStatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-semibold text-[0.72rem] uppercase tracking-[0.18em]",
        toneClasses[tone],
      )}
    >
      {status}
    </span>
  );
}
