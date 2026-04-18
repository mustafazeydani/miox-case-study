import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ClaimDashboardViewModel } from "../_utils/types";
import { ClaimActionRail } from "./claim-action-rail";
import { ClaimProcessStepper } from "./claim-process-stepper";
import { ClaimSummaryStrip } from "./claim-summary-strip";
import { FloatingDocsButton } from "./floating-docs-button";
import { ThemeToggleButton } from "./theme-toggle-button";

interface ClaimDashboardProps {
  viewModel: ClaimDashboardViewModel;
}

export function ClaimDashboard({ viewModel }: ClaimDashboardProps) {
  const { overview } = viewModel;

  return (
    <section
      aria-labelledby="claim-dashboard-heading"
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 overflow-x-clip px-4 py-10 pb-32 sm:px-6 sm:pb-36 lg:px-8 lg:py-14 lg:pb-24"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <ThemeToggleButton />
        </div>

        <div className="surface-glass relative overflow-hidden rounded-[2rem] border border-border/70 px-6 py-8 shadow-[0_20px_70px_-32px_rgba(5,10,26,0.62)] ring-1 ring-primary/10 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="w-fit rounded-full border-primary/20 bg-primary/8 px-3 py-1 font-semibold text-[0.7rem] text-primary uppercase tracking-[0.24em]"
              >
                Live Claim Tracking
              </Badge>
              <div className="space-y-4">
                <h1
                  id="claim-dashboard-heading"
                  className="max-w-3xl text-balance font-heading font-semibold text-4xl text-foreground leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl"
                >
                  {overview.title}
                </h1>
                <p className="max-w-2xl text-base text-muted-foreground leading-7 sm:text-lg">
                  Track the current stage, understand how much time remains, and
                  see whether any action is needed without calling the support
                  center.
                </p>
              </div>
            </div>

            <Card className="surface-soft gap-0 rounded-[1.75rem] border-border/70 shadow-sm">
              <CardHeader className="gap-3">
                <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
                  Claim Snapshot
                </CardDescription>
                <CardTitle className="font-semibold text-2xl leading-none">
                  {overview.currentStage}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">
                      {overview.completedCount}/{overview.totalCount}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--chart-2))]"
                      style={{
                        width: `${Math.max(overview.completionRatio * 100, 8)}%`,
                      }}
                    />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {overview.currentStatus}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_22rem] xl:items-start">
        <div className="min-w-0 space-y-6">
          <ClaimSummaryStrip viewModel={viewModel} />
          <ClaimProcessStepper
            nodes={viewModel.apiNodes}
            insertSlots={viewModel.insertSlots}
            initialStepIndex={viewModel.initialStepIndex}
          />
        </div>
        <ClaimActionRail overview={overview} nodes={viewModel.apiNodes} />
      </div>

      <FloatingDocsButton />
    </section>
  );
}
