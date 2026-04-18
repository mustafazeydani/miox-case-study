import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ClaimDashboardViewModel } from "../_utils/types";

interface ClaimSummaryStripProps {
  viewModel: ClaimDashboardViewModel;
}

export function ClaimSummaryStrip({ viewModel }: ClaimSummaryStripProps) {
  const { overview } = viewModel;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="surface-glass gap-0 rounded-[1.5rem] border-white/70 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)]">
        <CardHeader className="gap-3">
          <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
            Current Status
          </CardDescription>
          <CardTitle className="font-semibold text-3xl leading-none">
            {overview.claimNumber}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              Live file
            </Badge>
            <p className="text-muted-foreground text-sm">
              Current stage:{" "}
              <span className="font-medium text-foreground">
                {overview.currentStage}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="surface-glass gap-0 rounded-[1.5rem] border-white/70 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)]">
        <CardHeader className="gap-3">
          <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
            Estimation
          </CardDescription>
          <CardTitle className="font-semibold text-3xl leading-none">
            {overview.estimatedRemainingTime}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Based on the current process state and remaining open steps.
          </p>
        </CardContent>
      </Card>

      <Card className="surface-glass gap-0 rounded-[1.5rem] border-white/70 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)]">
        <CardHeader className="gap-3">
          <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
            Actionability
          </CardDescription>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">
              {overview.actionableNow}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="font-semibold text-2xl leading-tight">
            {overview.actionableHeadline}
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
