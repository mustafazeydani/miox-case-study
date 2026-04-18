import { Clock3 } from "lucide-react";
import type { ClaimNodeRegistryItem } from "../_utils/registry";
import type { ClaimDashboardApiNode } from "../_utils/types";
import { ClaimStatusPill } from "./claim-status-pill";

interface ClaimNodeCardProps {
  node: ClaimDashboardApiNode;
  index: number;
  total: number;
  definition: ClaimNodeRegistryItem;
}

export function ClaimNodeCard({
  node,
  index,
  total,
  definition,
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

      <article className="surface-soft rounded-[1.5rem] border border-border/70 p-5 shadow-sm">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div
                className={`flex size-12 items-center justify-center rounded-2xl border ${definition.accentClassName}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
                  {definition.eyebrow}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading font-semibold text-2xl text-foreground leading-none">
                    {node.title}
                  </h3>
                  <ClaimStatusPill status={node.status} tone={node.tone} />
                </div>
                <p className="max-w-2xl text-muted-foreground text-sm leading-6">
                  {definition.description}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-muted-foreground text-sm">
              <Clock3 className="size-4" />
              Step {index + 1} of {total}
            </div>
          </div>

          <p className="text-foreground text-sm leading-6">{node.summary}</p>

          {spotlight ? (
            <div className="rounded-[1.25rem] border border-primary/12 bg-primary/6 p-4">
              <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
                {spotlight.label}
              </p>
              <p className="mt-3 font-heading font-semibold text-2xl text-foreground leading-tight">
                {spotlight.value}
              </p>
            </div>
          ) : null}

          {metricFields.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {metricFields.map((field) => (
                <div
                  key={field.key}
                  className="rounded-full border border-border/70 bg-background/80 px-3.5 py-2"
                >
                  <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                    {field.label}
                  </span>
                  <span className="ml-2 font-medium text-foreground text-sm">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          <dl className="grid gap-3 md:grid-cols-2">
            {node.fields.map((field) => (
              <div
                key={field.key}
                className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3.5"
              >
                <dt className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                  {field.label}
                </dt>
                <dd className="mt-2 text-foreground text-sm leading-6">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </div>
  );
}
