"use client";

import { Bot, LoaderCircle, RefreshCcw, WandSparkles } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { getMockExplainResult } from "../_utils/ai";
import type { ClaimNodeRegistryItem } from "../_utils/registry";
import type { ClaimDashboardApiNode, ExplainResult } from "../_utils/types";
import { ClaimStatusPill } from "./claim-status-pill";

interface ClaimAiSheetProps {
  node: ClaimDashboardApiNode | null;
  definition: ClaimNodeRegistryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClaimAiSheet({
  node,
  definition,
  open,
  onOpenChange,
}: ClaimAiSheetProps) {
  const [result, setResult] = useState<ExplainResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadExplanation() {
      if (!open || !node || !definition) {
        setResult(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setResult(null);
      const nextResult = await getMockExplainResult(node.raw);

      if (isCancelled) {
        return;
      }

      startTransition(() => {
        setResult(nextResult);
        setIsLoading(false);
      });
    }

    void loadExplanation();

    return () => {
      isCancelled = true;
    };
  }, [definition, node, open]);

  async function handleRetry() {
    if (!node || !definition) {
      return;
    }

    setIsLoading(true);
    setResult(null);
    const nextResult = await getMockExplainResult(node.raw);
    startTransition(() => {
      setResult(nextResult);
      setIsLoading(false);
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="surface-glass flex w-full max-w-[38rem] flex-col gap-0 overflow-y-auto border-border/70"
      >
        <SheetHeader className="gap-3 border-border/70 border-b px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              <Bot data-icon="inline-start" />
              {definition?.explainPanelTitle ?? "AI summary"}
            </Badge>
            {node ? (
              <ClaimStatusPill status={node.status} tone={node.tone} />
            ) : null}
          </div>
          <SheetTitle className="font-semibold text-2xl leading-tight">
            {node?.title ?? "Claim step"}
          </SheetTitle>
          <SheetDescription>
            {definition?.description ??
              "See a plain-language summary of this claim step."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6">
          {node ? (
            <Card
              size="sm"
              className="rounded-[1.25rem] border-border/70 bg-background/45"
            >
              <CardHeader className="gap-2">
                <CardDescription>Current step summary</CardDescription>
                <CardTitle className="font-semibold text-base">
                  {node.summary}
                </CardTitle>
              </CardHeader>
            </Card>
          ) : null}

          {isLoading ? (
            <>
              <Card className="rounded-[1.25rem] border-border/70 bg-background/45">
                <CardContent className="flex flex-col gap-3 px-5 py-5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
              <Card className="rounded-[1.25rem] border-border/70 bg-background/45">
                <CardContent className="flex flex-col gap-3 px-5 py-5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            </>
          ) : result ? (
            <>
              <Card className="rounded-[1.25rem] border-border/70 bg-background/45">
                <CardHeader className="gap-3">
                  <CardDescription>AI interpretation</CardDescription>
                  <CardTitle className="font-semibold text-xl leading-tight">
                    {result.heading}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-6">
                    {result.summary}
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-[1.25rem] border-border/70 bg-background/45">
                <CardHeader className="gap-3">
                  <CardDescription>Key highlights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex list-disc flex-col gap-2 pl-4 text-muted-foreground text-sm leading-6">
                    {result.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Alert className="border-primary/15 bg-primary/6">
                <WandSparkles />
                <AlertTitle>Suggested next action</AlertTitle>
                <AlertDescription>{result.suggestedAction}</AlertDescription>
              </Alert>

              <Separator />

              <Card
                size="sm"
                className="rounded-[1.25rem] border-border/70 bg-background/45"
              >
                <CardHeader className="gap-2">
                  <CardDescription>Confidence label</CardDescription>
                  <CardTitle className="font-semibold text-base">
                    {result.confidenceLabel}
                  </CardTitle>
                </CardHeader>
              </Card>
            </>
          ) : null}
        </div>

        <SheetFooter className="border-border/70 border-t px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading || !node}
            onClick={handleRetry}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
            ) : (
              <RefreshCcw data-icon="inline-start" />
            )}
            Retry explanation
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
