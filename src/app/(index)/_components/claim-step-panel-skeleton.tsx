import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const stepFieldSkeletonKeys = [
  "claim-field-a",
  "claim-field-b",
  "claim-field-c",
  "claim-field-d",
] as const;

export function ClaimStepPanelSkeleton() {
  return (
    <Card className="surface-soft gap-0 rounded-[1.5rem] border-border/70 shadow-sm">
      <CardHeader className="gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <Skeleton className="size-12 rounded-2xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-8 w-48 rounded-2xl" />
              <Skeleton className="h-5 w-full max-w-2xl rounded-2xl" />
            </div>
          </div>
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <Skeleton className="h-5 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-[1.25rem]" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        <Separator />

        <div className="grid gap-3 md:grid-cols-2">
          {stepFieldSkeletonKeys.map((key) => (
            <Card
              key={key}
              size="sm"
              className="gap-0 rounded-2xl border border-border/60 bg-background/70 py-3"
            >
              <CardHeader className="gap-1 pb-1">
                <Skeleton className="h-4 w-24 rounded-full" />
              </CardHeader>
              <CardContent className="pt-0">
                <Skeleton className="h-5 w-full rounded-2xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-5">
        <Skeleton className="h-10 w-40 rounded-full" />
      </CardFooter>
    </Card>
  );
}
