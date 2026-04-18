"use client";

import dynamic from "next/dynamic";
import {
  ClaimStepPanelFrame,
  type ClaimStepPanelProps,
} from "../claim-step-panel-frame";
import { DocumentAnalyzerSkeleton } from "../document-analyzer-skeleton";

const LazyDeductionDocumentAnalyzer = dynamic(
  () =>
    import("../deduction-document-analyzer").then(
      (mod) => mod.DeductionDocumentAnalyzer,
    ),
  {
    loading: () => <DocumentAnalyzerSkeleton />,
  },
);

export default function DeductionReasonStepPanel(props: ClaimStepPanelProps) {
  const requestLabel =
    "actionRequired" in props.node.raw ? props.node.raw.actionRequired : null;

  return (
    <ClaimStepPanelFrame {...props}>
      {requestLabel ? (
        <LazyDeductionDocumentAnalyzer requestLabel={requestLabel} />
      ) : null}
    </ClaimStepPanelFrame>
  );
}
