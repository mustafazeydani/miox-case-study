import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardErrorState() {
  return (
    <section
      aria-live="assertive"
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <Card className="surface-glass relative overflow-hidden rounded-[2rem] border-destructive/20 shadow-[0_20px_70px_-32px_rgba(5,10,26,0.62)]">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-destructive/40 to-transparent" />
        <CardHeader className="gap-4 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <CardTitle className="font-semibold text-destructive text-xs uppercase tracking-[0.24em]">
            Claim Feed Unavailable
          </CardTitle>
          <h1 className="max-w-2xl text-balance font-heading font-semibold text-4xl text-foreground leading-none tracking-[-0.03em] sm:text-5xl">
            The claim dashboard could not load the current process.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground leading-7">
            Try refreshing the page. The mock route and reference endpoints are
            still available, so this is likely a temporary read issue.
          </p>
        </CardHeader>
        <CardContent className="grid gap-3 px-6 pb-8 text-sm sm:grid-cols-3 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
          <Alert className="border-border/70 bg-background/40">
            <CircleAlert />
            <AlertTitle>Mock route</AlertTitle>
            <AlertDescription>Remains available.</AlertDescription>
          </Alert>
          <Alert className="border-border/70 bg-background/40">
            <CircleAlert />
            <AlertTitle>OpenAPI</AlertTitle>
            <AlertDescription>Is still statically generated.</AlertDescription>
          </Alert>
          <Alert className="border-border/70 bg-background/40">
            <CircleAlert />
            <AlertTitle>Scalar docs</AlertTitle>
            <AlertDescription>
              Stay reachable from the floating action.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </section>
  );
}
