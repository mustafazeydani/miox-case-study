"use client";

import { FileText, Paperclip, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useClaimDashboardStore } from "../_utils/store";
import type { ClaimDashboardLocalNode } from "../_utils/types";

interface ClaimLocalNodeCardProps {
  node: ClaimDashboardLocalNode;
}

const localNodeStyles = {
  "information-note": {
    icon: FileText,
    container: "border-cyan-200/70 bg-cyan-50/80",
    iconWrap: "border-cyan-200/80 bg-white text-cyan-700",
    accent: "text-cyan-700",
    detail: (currentNode: ClaimDashboardLocalNode) =>
      currentNode.kind === "information-note" ? currentNode.note : "",
    metadata: (currentNode: ClaimDashboardLocalNode) =>
      currentNode.createdAtLabel,
  },
  "additional-attachment": {
    icon: Paperclip,
    container: "border-indigo-200/70 bg-indigo-50/80",
    iconWrap: "border-indigo-200/80 bg-white text-indigo-700",
    accent: "text-indigo-700",
    detail: (currentNode: ClaimDashboardLocalNode) =>
      currentNode.kind === "additional-attachment"
        ? currentNode.description
        : "",
    metadata: (currentNode: ClaimDashboardLocalNode) =>
      currentNode.kind === "additional-attachment"
        ? `${currentNode.fileName} • ${currentNode.createdAtLabel}`
        : currentNode.createdAtLabel,
  },
} as const;

export function ClaimLocalNodeCard({ node }: ClaimLocalNodeCardProps) {
  const removeInsertedNode = useClaimDashboardStore(
    (state) => state.removeInsertedNode,
  );
  const style = localNodeStyles[node.kind];
  const Icon = style.icon;

  return (
    <Card
      className={cn(
        "gap-0 rounded-[1.35rem] border shadow-sm transition-colors",
        style.container,
      )}
    >
      <CardHeader className="gap-4">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl border",
              style.iconWrap,
            )}
          >
            <Icon />
          </div>
          <div className="space-y-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full font-semibold text-[0.72rem] uppercase tracking-[0.18em]",
                style.accent,
              )}
            >
              {node.kind === "information-note"
                ? "Inserted Note"
                : "Attachment"}
            </Badge>
            <CardTitle className="font-semibold text-base">
              {node.title}
            </CardTitle>
            <CardDescription>{style.metadata(node)}</CardDescription>
          </div>
        </div>

        <CardAction>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => removeInsertedNode(node.id)}
            aria-label={`Remove ${node.title}`}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm leading-6">
          {style.detail(node)}
        </p>
      </CardContent>
    </Card>
  );
}
