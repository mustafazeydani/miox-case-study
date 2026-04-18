import { Clock3 } from "lucide-react";

import type { ClaimDashboardApiNode } from "../_utils/types";
import { ClaimStatusPill } from "./claim-status-pill";

interface ClaimProcessTimelineProps {
  nodes: ClaimDashboardApiNode[];
}

export function ClaimProcessTimeline({ nodes }: ClaimProcessTimelineProps) {
  return (
    <section className="surface-glass rounded-[1.75rem] border border-white/70 p-5 shadow-[0_18px_40px_-34px_rgba(21,57,90,0.38)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
            Process Timeline
          </p>
          <h2 className="mt-3 font-heading font-semibold text-3xl text-foreground leading-none">
            Each step, arranged for quick reading.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm">
          The shell is now in place. The next pass will convert these steps into
          the final registry-driven cards.
        </p>
      </div>

      <ol className="mt-8 space-y-4">
        {nodes.map((node, index) => (
          <li
            key={node.id}
            className="grid gap-4 rounded-[1.4rem] border border-border/70 bg-white/55 p-4 shadow-sm md:grid-cols-[auto_minmax(0,1fr)_auto]"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-primary/12 bg-primary/8 font-semibold text-primary text-sm">
                {index + 1}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold text-base text-foreground">
                    {node.title}
                  </h3>
                  <ClaimStatusPill status={node.status} tone={node.tone} />
                </div>
                <p className="text-muted-foreground text-sm leading-6">
                  {node.summary}
                </p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2">
                {node.fields.slice(0, 4).map((field) => (
                  <div
                    key={field.key}
                    className="rounded-2xl border border-border/60 bg-background/70 px-3.5 py-3"
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

            <div className="flex items-start md:justify-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-muted-foreground text-sm">
                <Clock3 className="size-4" />
                Step {index + 1}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
