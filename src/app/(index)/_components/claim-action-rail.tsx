import {
  CircleAlert,
  CircleCheckBig,
  Hourglass,
  ShieldCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

import type {
  ClaimDashboardApiNode,
  ClaimDashboardOverview,
} from "../_utils/types";
import { ClaimStatusPill } from "./claim-status-pill";

interface ClaimActionRailProps {
  overview: ClaimDashboardOverview;
  nodes: ClaimDashboardApiNode[];
}

export function ClaimActionRail({ overview, nodes }: ClaimActionRailProps) {
  const activeNodes = nodes.filter(
    (node) => node.status === "In Progress" || node.status === "Pending",
  );

  return (
    <Card className="surface-glass rounded-[1.75rem] border-border/70 shadow-[0_18px_40px_-34px_rgba(5,10,26,0.58)] xl:sticky xl:top-8">
      <CardHeader className="gap-3">
        <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
          Action Rail
        </CardDescription>
        <CardTitle className="font-semibold text-2xl leading-tight">
          What the claimant should know right now.
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <Alert className="border-primary/15 bg-primary/6">
          <CircleAlert />
          <AlertTitle>Need attention</AlertTitle>
          <AlertDescription>{overview.actionableHeadline}</AlertDescription>
        </Alert>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <Card
            size="sm"
            className="rounded-[1.4rem] border border-border/70 bg-background/45"
          >
            <CardHeader className="gap-3">
              <CardDescription className="flex items-center gap-2 text-foreground text-sm">
                <Hourglass className="text-primary" />
                Remaining time
              </CardDescription>
              <CardTitle className="font-semibold text-3xl leading-none">
                {overview.estimatedRemainingTime}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card
            size="sm"
            className="rounded-[1.4rem] border border-border/70 bg-background/45"
          >
            <CardHeader className="gap-3">
              <CardDescription className="flex items-center gap-2 text-foreground text-sm">
                <CircleCheckBig className="text-emerald-400" />
                Completed
              </CardDescription>
              <CardTitle className="font-semibold text-3xl leading-none">
                {overview.completedCount}/{overview.totalCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary" />
            <p className="font-medium text-foreground text-sm">Open nodes</p>
          </div>

          {activeNodes.length > 0 ? (
            <div className="flex flex-col gap-3">
              {activeNodes.map((node) => (
                <Card
                  key={node.id}
                  size="sm"
                  className="rounded-[1.4rem] border border-border/70 bg-background/45"
                >
                  <CardHeader className="gap-2">
                    <CardTitle className="font-medium text-base">
                      {node.title}
                    </CardTitle>
                    <CardAction>
                      <ClaimStatusPill status={node.status} tone={node.tone} />
                    </CardAction>
                    <CardDescription>{node.summary}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Empty className="rounded-[1.4rem] border border-border/70 border-dashed bg-background/35 p-6">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ShieldCheck />
                </EmptyMedia>
                <EmptyTitle>No open nodes</EmptyTitle>
                <EmptyDescription>
                  All claim steps are completed or waiting on back-office
                  completion.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
