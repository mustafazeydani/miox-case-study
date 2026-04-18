import { Clock3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ClaimNodeRegistryItem } from "../_utils/registry";
import type { ClaimDashboardApiNode } from "../_utils/types";
import { ClaimStatusPill } from "./claim-status-pill";
import { DeductionDocumentAnalyzer } from "./deduction-document-analyzer";

interface ClaimNodeCardProps {
  node: ClaimDashboardApiNode;
  index: number;
  total: number;
  definition: ClaimNodeRegistryItem;
  onExplainWithAi: (
    node: ClaimDashboardApiNode,
    definition: ClaimNodeRegistryItem,
  ) => void;
}

export function ClaimNodeCard({
  node,
  index,
  total,
  definition,
  onExplainWithAi,
}: ClaimNodeCardProps) {
  const Icon = definition.icon;
  const spotlight = node.fields.find(
    (field) => field.key === definition.spotlightFieldKey,
  );
  const metricFields = definition.metricFieldKeys
    .map((fieldKey) => node.fields.find((field) => field.key === fieldKey))
    .filter((field) => field !== undefined);

  return (
    <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
      <div className="hidden lg:flex lg:flex-col lg:items-center">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/12 bg-primary/8 font-semibold text-primary text-sm">
          {index + 1}
        </div>
        {index < total - 1 ? (
          <div className="mt-3 h-full min-h-20 w-px bg-gradient-to-b from-primary/20 to-border/80" />
        ) : null}
      </div>

      <Card className="surface-soft gap-0 rounded-[1.5rem] border-border/70 shadow-sm">
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div
                className={`flex size-12 items-center justify-center rounded-2xl border ${definition.accentClassName}`}
              >
                <Icon />
              </div>
              <div className="space-y-2">
                <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
                  {definition.eyebrow}
                </CardDescription>
                <div className="flex flex-wrap items-center gap-3">
                  <CardTitle className="font-semibold text-2xl leading-none">
                    {node.title}
                  </CardTitle>
                  <ClaimStatusPill status={node.status} tone={node.tone} />
                </div>
                <CardDescription className="max-w-2xl leading-6">
                  {definition.description}
                </CardDescription>
              </div>
            </div>

            <div className="self-start">
              <Badge
                variant="outline"
                className="rounded-full border-border/60 bg-background/80 px-3 py-1.5 text-muted-foreground text-sm"
              >
                <Clock3 data-icon="inline-start" />
                Step {index + 1} of {total}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <p className="text-foreground text-sm leading-6">{node.summary}</p>

          {spotlight ? (
            <Card
              size="sm"
              className="rounded-[1.25rem] border border-primary/12 bg-primary/6"
            >
              <CardHeader className="gap-3">
                <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
                  {spotlight.label}
                </CardDescription>
                <CardTitle className="font-semibold text-2xl leading-tight">
                  {spotlight.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ) : null}

          {metricFields.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {metricFields.map((field) => (
                <Badge
                  key={field.key}
                  variant="outline"
                  className="h-auto rounded-full border-border/70 bg-background/80 px-3.5 py-2 text-foreground text-sm"
                >
                  <span className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.18em]">
                    {field.label}
                  </span>
                  <span className="font-medium">{field.value}</span>
                </Badge>
              ))}
            </div>
          ) : null}

          <Separator />

          <dl className="grid gap-3 md:grid-cols-2">
            {node.fields.map((field) => (
              <Card
                key={field.key}
                size="sm"
                className="rounded-2xl border border-border/60 bg-background/70"
              >
                <CardHeader className="gap-2">
                  <CardDescription className="font-medium text-xs uppercase tracking-[0.18em]">
                    {field.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <dd className="text-foreground text-sm leading-6">
                    {field.value}
                  </dd>
                </CardContent>
              </Card>
            ))}
          </dl>

          {definition.supportsDocumentAnalysis &&
          "actionRequired" in node.raw ? (
            <DeductionDocumentAnalyzer requestLabel={node.raw.actionRequired} />
          ) : null}
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onExplainWithAi(node, definition)}
          >
            <Sparkles data-icon="inline-start" />
            {definition.explainActionLabel}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
