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
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Card className="surface-glass relative overflow-hidden rounded-[2rem] border-white/70 shadow-[0_20px_70px_-32px_rgba(21,57,90,0.45)]">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <CardHeader className="px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <CardTitle className="font-semibold text-primary text-xs uppercase tracking-[0.24em]">
            No Process Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
          <Empty className="rounded-[1.75rem] border border-border/70 border-dashed bg-white/35 p-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Files />
              </EmptyMedia>
              <EmptyTitle className="max-w-2xl text-balance text-4xl leading-none sm:text-5xl">
                The claim exists, but there are no process details to display
                yet.
              </EmptyTitle>
              <EmptyDescription className="max-w-xl text-base leading-7">
                As soon as the orchestration feed publishes steps, this
                dashboard will populate them automatically.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline">
                <Link href={floatingDocsHref}>
                  <BookOpenText data-icon="inline-start" />
                  View API reference
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </section>
  );
}
