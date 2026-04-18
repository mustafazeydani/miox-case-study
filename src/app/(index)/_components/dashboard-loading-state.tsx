import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingState() {
  const loadingCardKeys = ["status", "eta", "actionability"] as const;

  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 pb-28 sm:px-6 lg:px-8 lg:py-14 lg:pb-24"
    >
      <Card className="surface-glass rounded-[2rem] border-white/70 shadow-[0_20px_70px_-32px_rgba(21,57,90,0.45)]">
        <CardHeader className="gap-4 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="h-12 max-w-2xl rounded-2xl" />
          <Skeleton className="h-6 max-w-xl rounded-2xl" />
        </CardHeader>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_22rem]">
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {loadingCardKeys.map((key) => (
              <Card
                key={key}
                className="surface-glass rounded-[1.5rem] border-white/70 bg-primary/5"
              >
                <CardContent className="px-5 py-5">
                  <Skeleton className="h-32 rounded-[1.25rem]" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="surface-glass rounded-[1.75rem] border-white/70 bg-primary/5">
            <CardContent className="px-5 py-5 sm:px-6">
              <Skeleton className="h-[26rem] rounded-[1.5rem]" />
            </CardContent>
          </Card>
        </div>
        <Card className="surface-glass rounded-[1.75rem] border-white/70 bg-primary/5">
          <CardContent className="px-5 py-5 sm:px-6">
            <Skeleton className="h-72 rounded-[1.5rem]" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
