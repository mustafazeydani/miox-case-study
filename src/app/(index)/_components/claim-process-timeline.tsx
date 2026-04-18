"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useClaimDashboardStore } from "@/lib/stores/claim-dashboard-store";
import {
  type ClaimNodeRegistryItem,
  getClaimNodeRegistryItem,
} from "../_utils/registry";
import type {
  ClaimDashboardApiNode,
  TimelineInsertSlot,
} from "../_utils/types";
import { ClaimAiSheet } from "./claim-ai-sheet";
import { ClaimLocalNodeCard } from "./claim-local-node-card";
import { ClaimNodeCard } from "./claim-node-card";
import { TimelineInsertComposer } from "./timeline-insert-composer";

interface ClaimProcessTimelineProps {
  nodes: ClaimDashboardApiNode[];
  insertSlots: TimelineInsertSlot[];
}

export function ClaimProcessTimeline({
  nodes,
  insertSlots,
}: ClaimProcessTimelineProps) {
  const insertedNodes = useClaimDashboardStore((state) => state.insertedNodes);
  const [selectedAiNode, setSelectedAiNode] =
    useState<ClaimDashboardApiNode | null>(null);
  const [selectedAiDefinition, setSelectedAiDefinition] =
    useState<ClaimNodeRegistryItem | null>(null);
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);

  return (
    <>
      <Card className="surface-glass rounded-[1.75rem] border-border/70 shadow-[0_18px_40px_-34px_rgba(5,10,26,0.58)]">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CardDescription
                id="claim-timeline-label"
                className="font-semibold text-xs uppercase tracking-[0.24em]"
              >
                Process Timeline
              </CardDescription>
              <CardTitle
                id="claim-timeline-heading"
                className="mt-3 font-semibold text-3xl leading-none"
              >
                Follow each claim step as it happens.
              </CardTitle>
            </div>
            <CardDescription className="max-w-sm text-sm">
              See the current stage, recent updates, and any added notes or
              attachments in one place.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <Separator />

          <ol
            aria-describedby="claim-timeline-label"
            aria-labelledby="claim-timeline-heading"
            className="flex flex-col gap-4"
          >
            {nodes.map((node, index) => {
              const definition = getClaimNodeRegistryItem(node.kind);
              const localNodesAfterStep = insertedNodes.filter(
                (localNode) => localNode.afterIndex === index,
              );
              const slot = insertSlots[index];

              return (
                <li key={node.id} className="list-none">
                  <div className="flex flex-col gap-4">
                    <ClaimNodeCard
                      node={node}
                      index={index}
                      total={nodes.length}
                      definition={definition}
                      onExplainWithAi={(currentNode, currentDefinition) => {
                        setSelectedAiNode(currentNode);
                        setSelectedAiDefinition(currentDefinition);
                        setIsAiSheetOpen(true);
                      }}
                    />

                    {localNodesAfterStep.map((localNode) => (
                      <ClaimLocalNodeCard key={localNode.id} node={localNode} />
                    ))}

                    {slot ? <TimelineInsertComposer slot={slot} /> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      <ClaimAiSheet
        node={selectedAiNode}
        definition={selectedAiDefinition}
        open={isAiSheetOpen}
        onOpenChange={setIsAiSheetOpen}
      />
    </>
  );
}
