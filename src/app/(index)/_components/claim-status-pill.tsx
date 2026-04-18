import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { ClaimDashboardApiNode } from "../_utils/types";

interface ClaimStatusPillProps {
  status: ClaimDashboardApiNode["status"];
  tone: ClaimDashboardApiNode["tone"];
}

const toneClasses = {
  complete:
    "border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
  report:
    "border-sky-200/80 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200",
  current:
    "border-amber-200/80 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
  pending:
    "border-slate-200/80 bg-slate-100 text-slate-700 dark:border-slate-500/40 dark:bg-slate-500/10 dark:text-slate-200",
} as const;

export function ClaimStatusPill({ status, tone }: ClaimStatusPillProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 font-semibold text-[0.72rem] uppercase tracking-[0.18em]",
        toneClasses[tone],
      )}
    >
      {status}
    </Badge>
  );
}
