import { getClaimNodeRegistryItem } from "../_utils/registry";
import type { ClaimDashboardApiNode } from "../_utils/types";
import { ClaimNodeCard } from "./claim-node-card";

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
            Each step, rendered by its domain role.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm">
          Every node now resolves through a route-local registry, which keeps
          the dashboard scalable as the step shapes vary.
        </p>
      </div>

      <ol className="mt-8 space-y-4">
        {nodes.map((node, index) => (
          <li key={node.id}>
            <ClaimNodeCard
              node={node}
              index={index}
              total={nodes.length}
              definition={getClaimNodeRegistryItem(node.kind)}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
