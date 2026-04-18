import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DocumentAnalyzerSkeleton() {
  return (
    <Card
      size="sm"
      className="rounded-[1.25rem] border border-primary/12 bg-primary/4"
    >
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            Document review
          </Badge>
          <Skeleton className="h-4 w-40 rounded-full" />
        </div>
        <Skeleton className="h-7 w-2/3 rounded-2xl" />
        <Skeleton className="h-5 w-full rounded-2xl" />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-24 w-full rounded-[1.25rem]" />
        <Skeleton className="h-9 w-36 rounded-full" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
