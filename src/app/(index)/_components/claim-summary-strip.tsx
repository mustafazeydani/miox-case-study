import type { ClaimDashboardViewModel } from "../_utils/types";

interface ClaimSummaryStripProps {
  viewModel: ClaimDashboardViewModel;
}

export function ClaimSummaryStrip({ viewModel }: ClaimSummaryStripProps) {
  const { overview } = viewModel;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <article className="surface-glass rounded-[1.5rem] border border-white/70 p-5 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)]">
        <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
          Current Status
        </p>
        <p className="mt-4 font-heading font-semibold text-3xl text-foreground leading-none">
          {overview.claimNumber}
        </p>
        <p className="mt-3 text-muted-foreground text-sm">
          Current stage:{" "}
          <span className="font-medium text-foreground">
            {overview.currentStage}
          </span>
        </p>
      </article>

      <article className="surface-glass rounded-[1.5rem] border border-white/70 p-5 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)]">
        <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
          Estimation
        </p>
        <p className="mt-4 font-heading font-semibold text-3xl text-foreground leading-none">
          {overview.estimatedRemainingTime}
        </p>
        <p className="mt-3 text-muted-foreground text-sm">
          Based on the current process state and remaining open steps.
        </p>
      </article>

      <article className="surface-glass rounded-[1.5rem] border border-white/70 p-5 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)]">
        <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
          Actionability
        </p>
        <p className="mt-4 font-medium text-primary text-sm">
          {overview.actionableNow}
        </p>
        <p className="mt-3 font-heading font-semibold text-2xl text-foreground leading-tight">
          {overview.actionableHeadline}
        </p>
      </article>
    </div>
  );
}
