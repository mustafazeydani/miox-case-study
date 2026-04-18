"use client";

import { Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export function ClaimAiSheetSkeletonBody() {
  return (
    <>
      <Card className="rounded-[1.25rem] border-border/70 bg-background/45">
        <CardContent className="flex flex-col gap-3 px-5 py-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-2/3 rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-[1.25rem]" />
        </CardContent>
      </Card>

      <Card className="rounded-[1.25rem] border-border/70 bg-background/45">
        <CardContent className="flex flex-col gap-3 px-5 py-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </CardContent>
      </Card>
    </>
  );
}

export function ClaimAiSheetSkeleton() {
  return (
    <Sheet open>
      <SheetContent
        side="right"
        className="surface-glass flex w-full max-w-[38rem] flex-col gap-0 overflow-y-auto border-border/70"
      >
        <SheetHeader className="gap-3 border-border/70 border-b px-5 py-5 sm:px-6">
          <SheetTitle className="sr-only">Loading AI summary</SheetTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              <Bot data-icon="inline-start" />
              AI summary
            </Badge>
          </div>
          <Skeleton className="h-8 w-2/3 rounded-2xl" />
          <Skeleton className="h-5 w-full rounded-2xl" />
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6">
          <Card
            size="sm"
            className="rounded-[1.25rem] border-border/70 bg-background/45"
          >
            <CardHeader className="gap-2">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-6 w-full rounded-2xl" />
            </CardHeader>
          </Card>

          <ClaimAiSheetSkeletonBody />
        </div>

        <SheetFooter className="border-border/70 border-t px-5 py-4 sm:px-6">
          <Button type="button" variant="outline" disabled>
            Refresh summary
          </Button>
          <Button type="button" variant="ghost" disabled>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
