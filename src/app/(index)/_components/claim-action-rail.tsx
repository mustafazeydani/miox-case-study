import {
  CircleAlert,
  CircleCheckBig,
  Hourglass,
  ShieldCheck,
} from "lucide-react";

import type {
  ClaimDashboardApiNode,
  ClaimDashboardOverview,
} from "../_utils/types";

interface ClaimActionRailProps {
  overview: ClaimDashboardOverview;
  nodes: ClaimDashboardApiNode[];
}

export function ClaimActionRail({ overview, nodes }: ClaimActionRailProps) {
  const activeNodes = nodes.filter(
    (node) => node.status === "In Progress" || node.status === "Pending",
  );

  return (
    <aside className="surface-glass rounded-[1.75rem] border border-white/70 p-5 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)] sm:p-6 xl:sticky xl:top-8">
      <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
        Action Rail
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-[1.4rem] border border-primary/12 bg-primary/8 p-4">
          <div className="flex items-center gap-3">
            <CircleAlert className="size-5 text-primary" />
            <p className="font-semibold text-foreground">Need attention</p>
          </div>
          <p className="mt-3 text-muted-foreground text-sm leading-6">
            {overview.actionableHeadline}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[1.4rem] border border-border/70 bg-white/50 p-4">
            <div className="flex items-center gap-3">
              <Hourglass className="size-5 text-primary" />
              <p className="font-semibold text-foreground">Remaining time</p>
            </div>
            <p className="mt-3 font-heading font-semibold text-3xl text-foreground leading-none">
              {overview.estimatedRemainingTime}
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-border/70 bg-white/50 p-4">
            <div className="flex items-center gap-3">
              <CircleCheckBig className="size-5 text-emerald-600" />
              <p className="font-semibold text-foreground">Completed</p>
            </div>
            <p className="mt-3 font-heading font-semibold text-3xl text-foreground leading-none">
              {overview.completedCount}/{overview.totalCount}
            </p>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-border/70 bg-white/50 p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary" />
            <p className="font-semibold text-foreground">Open nodes</p>
          </div>
          <ul className="mt-4 space-y-3">
            {activeNodes.map((node) => (
              <li
                key={node.id}
                className="rounded-2xl border border-border/60 bg-background/70 px-3.5 py-3"
              >
                <p className="font-medium text-foreground text-sm">
                  {node.title}
                </p>
                <p className="mt-1 text-muted-foreground text-sm">
                  {node.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
