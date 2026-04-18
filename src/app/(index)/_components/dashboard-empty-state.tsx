import { BookOpenText, Files } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { floatingDocsHref } from "../_utils/constants";

export function DashboardEmptyState() {
  return (
    <section
      aria-live="polite"
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <Card className="surface-glass relative overflow-hidden rounded-[2rem] border-border/70 shadow-[0_20px_70px_-32px_rgba(5,10,26,0.62)]">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <CardHeader className="px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <CardTitle className="font-semibold text-primary text-xs uppercase tracking-[0.24em]">
            No Claim Steps Yet
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
          <Empty className="rounded-[1.75rem] border border-border/70 border-dashed bg-background/35 p-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Files />
              </EmptyMedia>
              <EmptyTitle className="max-w-2xl text-balance text-4xl leading-none sm:text-5xl">
                The claim is ready, but there are no step details to show yet.
              </EmptyTitle>
              <EmptyDescription className="max-w-xl text-base leading-7">
                As soon as step details are available, this dashboard will
                populate automatically.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline">
                <Link href={floatingDocsHref}>
                  <BookOpenText data-icon="inline-start" />
                  Learn more
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </section>
  );
}
