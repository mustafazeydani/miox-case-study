import { ArrowUpRight, BookOpenText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { floatingDocsHref } from "../_utils/constants";

export function FloatingDocsButton() {
  return (
    <Button
      asChild
      size="lg"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 h-auto max-w-[calc(100vw-2rem)] rounded-full border border-primary/18 bg-primary px-4 py-3 text-primary-foreground shadow-[0_24px_44px_-24px_rgba(39,97,135,0.85)] hover:bg-primary/90 sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:max-w-none"
    >
      <Link href={floatingDocsHref} aria-label="Open the documentation">
        <BookOpenText className="size-4" />
        <span>Open Docs</span>
        <ArrowUpRight className="size-4" />
      </Link>
    </Button>
  );
}
