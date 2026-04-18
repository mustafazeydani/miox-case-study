import type { ClaimDashboardViewModel } from "../_utils/types";
import { ClaimSummaryStrip } from "./claim-summary-strip";

interface ClaimDashboardProps {
  viewModel: ClaimDashboardViewModel;
}

export function ClaimDashboard({ viewModel }: ClaimDashboardProps) {
  const { overview } = viewModel;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="surface-glass relative overflow-hidden rounded-[2rem] border border-white/70 px-6 py-8 shadow-[0_20px_70px_-32px_rgba(21,57,90,0.45)] ring-1 ring-black/4 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 font-semibold text-[0.7rem] text-primary uppercase tracking-[0.24em]">
              Live Claim Orchestration
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-balance font-heading font-semibold text-4xl text-foreground leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                {overview.title}
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground leading-7 sm:text-lg">
                Track the current stage, understand how much time remains, and
                see whether any action is needed without calling the support
                center.
              </p>
            </div>
          </div>
          <div className="surface-soft rounded-[1.75rem] border border-border/70 p-5 shadow-sm">
            <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
              Claim Snapshot
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Active stage</p>
                <p className="mt-1 font-heading font-semibold text-2xl text-foreground leading-none">
                  {overview.currentStage}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">
                    {overview.completedCount}/{overview.totalCount}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,color-mix(in_oklab,var(--primary)_78%,white),color-mix(in_oklab,var(--chart-2)_65%,white))]"
                    style={{
                      width: `${Math.max(overview.completionRatio * 100, 8)}%`,
                    }}
                  />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {overview.currentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ClaimSummaryStrip viewModel={viewModel} />
    </section>
  );
}
