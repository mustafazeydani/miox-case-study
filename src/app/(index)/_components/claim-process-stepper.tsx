"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClaimDashboardStore } from "@/lib/stores/claim-dashboard-store";
import {
  type ClaimNodeRegistryItem,
  getClaimNodeRegistryItem,
} from "../_utils/registry";
import type {
  ClaimDashboardApiNode,
  TimelineInsertSlot,
} from "../_utils/types";
import { ClaimAiSheetSkeleton } from "./claim-ai-sheet-skeleton";
import { ClaimLocalNodeCard } from "./claim-local-node-card";
import { ClaimStatusPill } from "./claim-status-pill";
import { getClaimStepPanelComponent } from "./step-panel-registry";
import { TimelineInsertComposer } from "./timeline-insert-composer";

interface ClaimProcessStepperProps {
  nodes: ClaimDashboardApiNode[];
  insertSlots: TimelineInsertSlot[];
  initialStepIndex: number;
}

const LazyClaimAiSheet = dynamic(
  () => import("./claim-ai-sheet").then((mod) => mod.ClaimAiSheet),
  {
    loading: () => <ClaimAiSheetSkeleton />,
  },
);

function clampStepIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

export function ClaimProcessStepper({
  nodes,
  insertSlots,
  initialStepIndex,
}: ClaimProcessStepperProps) {
  const insertedNodes = useClaimDashboardStore((state) => state.insertedNodes);
  const [activeStepIndex, setActiveStepIndex] = useState(() =>
    clampStepIndex(initialStepIndex, nodes.length),
  );
  const [selectedAiNode, setSelectedAiNode] =
    useState<ClaimDashboardApiNode | null>(null);
  const [selectedAiDefinition, setSelectedAiDefinition] =
    useState<ClaimNodeRegistryItem | null>(null);
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);

  const activeNode = nodes[activeStepIndex];
  const activeDefinition = getClaimNodeRegistryItem(activeNode.kind);
  const ActiveStepPanel = getClaimStepPanelComponent(activeNode.kind);
  const localNodesAfterStep = insertedNodes.filter(
    (localNode) => localNode.afterIndex === activeStepIndex,
  );
  const activeSlot = insertSlots[activeStepIndex];

  function resetAiSheet() {
    setIsAiSheetOpen(false);
    setSelectedAiNode(null);
    setSelectedAiDefinition(null);
  }

  function handleStepChange(nextIndex: number) {
    const clampedStepIndex = clampStepIndex(nextIndex, nodes.length);

    if (clampedStepIndex === activeStepIndex) {
      return;
    }

    resetAiSheet();
    startTransition(() => {
      setActiveStepIndex(clampedStepIndex);
    });
  }

  return (
    <>
      <Card className="surface-glass overflow-hidden rounded-[1.75rem] border-border/70 shadow-[0_18px_40px_-34px_rgba(5,10,26,0.58)]">
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
                Claim Steps
              </CardDescription>
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="font-semibold text-3xl leading-none">
                  {activeNode.title}
                </CardTitle>
                <ClaimStatusPill
                  status={activeNode.status}
                  tone={activeNode.tone}
                />
              </div>
              <CardDescription className="max-w-2xl text-sm leading-6">
                Move between the claim stages without losing sight of the
                dashboard summary and the actions waiting on this case.
              </CardDescription>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
              <CardDescription className="text-sm">
                Step {activeStepIndex + 1} of {nodes.length}
              </CardDescription>
              <div className="flex flex-nowrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 whitespace-nowrap"
                  disabled={activeStepIndex === 0}
                  onClick={() => handleStepChange(activeStepIndex - 1)}
                >
                  <ChevronLeft data-icon="inline-start" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 whitespace-nowrap"
                  disabled={activeStepIndex === nodes.length - 1}
                  onClick={() => handleStepChange(activeStepIndex + 1)}
                >
                  Next
                  <ChevronRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex min-w-0 flex-col gap-6 overflow-hidden">
          <Separator />

          <Tabs
            value={activeNode.id}
            onValueChange={(value) => {
              const nextIndex = nodes.findIndex((node) => node.id === value);

              if (nextIndex !== -1) {
                handleStepChange(nextIndex);
              }
            }}
            className="min-w-0 gap-6 overflow-hidden"
          >
            <div className="dashboard-scrollbar w-full min-w-0 max-w-full touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain p-px pb-1.5">
              <TabsList
                variant="line"
                aria-label="Claim process steps"
                className="h-auto min-h-0 w-max min-w-full flex-nowrap items-stretch justify-start gap-2 rounded-none p-0 pr-1 pb-0.5 group-data-horizontal/tabs:h-auto"
              >
                {nodes.map((node, index) => {
                  const definition = getClaimNodeRegistryItem(node.kind);

                  return (
                    <TabsTrigger
                      key={node.id}
                      value={node.id}
                      className="group/step h-auto min-h-[4.9rem] min-w-[10.5rem] max-w-[10.5rem] flex-none shrink-0 flex-col items-start justify-start gap-1 whitespace-normal rounded-[1.1rem] border border-border/70 bg-background/45 px-4 py-3 text-left text-foreground/80 transition-colors after:hidden data-[state=active]:border-primary/40 data-[state=active]:bg-primary/18 data-[state=active]:text-foreground data-[state=active]:shadow-[0_16px_28px_-22px_color-mix(in_oklab,var(--primary)_80%,transparent)] data-[state=active]:ring-1 data-[state=active]:ring-primary/30 sm:min-w-44 sm:max-w-44"
                    >
                      <span className="font-medium text-[0.68rem] uppercase leading-none tracking-[0.18em]">
                        Step {index + 1}
                      </span>
                      <span className="line-clamp-1 w-full font-medium text-sm leading-5">
                        {definition.stepperLabel}
                      </span>
                      <span className="line-clamp-1 w-full text-[0.72rem] text-muted-foreground leading-4 transition-colors group-data-[state=active]/step:text-foreground/72">
                        {definition.eyebrow}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <TabsContent
              value={activeNode.id}
              className="mt-0 min-w-0 outline-none"
            >
              <div className="flex flex-col gap-4">
                <ActiveStepPanel
                  node={activeNode}
                  index={activeStepIndex}
                  total={nodes.length}
                  definition={activeDefinition}
                  onExplainWithAi={(currentNode, currentDefinition) => {
                    setSelectedAiNode(currentNode);
                    setSelectedAiDefinition(currentDefinition);
                    setIsAiSheetOpen(true);
                  }}
                />

                {localNodesAfterStep.map((localNode) => (
                  <ClaimLocalNodeCard key={localNode.id} node={localNode} />
                ))}

                {activeSlot ? (
                  <TimelineInsertComposer
                    key={activeNode.id}
                    slot={activeSlot}
                  />
                ) : null}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedAiNode && selectedAiDefinition ? (
        <LazyClaimAiSheet
          node={selectedAiNode}
          definition={selectedAiDefinition}
          open={isAiSheetOpen}
          onOpenChange={(open) => {
            if (open) {
              setIsAiSheetOpen(true);
              return;
            }

            resetAiSheet();
          }}
        />
      ) : null}
    </>
  );
}
