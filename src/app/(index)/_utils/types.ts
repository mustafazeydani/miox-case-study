import type { ClaimProcess, ProcessDetail } from "./schemas";

export type ClaimNodeTone = "complete" | "report" | "current" | "pending";

export type ClaimDashboardApiNodeKind =
  | "towing-service"
  | "claim-notification"
  | "appraisal"
  | "substitute-rental-vehicle"
  | "file-review"
  | "deduction-reason"
  | "payment-information"
  | "closed";

export type ClaimDashboardLocalNodeKind =
  | "information-note"
  | "additional-attachment";

export type ClaimDashboardNodeKind =
  | ClaimDashboardApiNodeKind
  | ClaimDashboardLocalNodeKind;

export interface ClaimDashboardField {
  key: string;
  label: string;
  value: string;
}

export interface ClaimDashboardOverview {
  title: string;
  claimNumber: string;
  currentStage: string;
  estimatedRemainingTime: string;
  actionableNow: string;
  actionableStepTitle: string | null;
  completionRatio: number;
  completedCount: number;
  totalCount: number;
}

export interface ClaimDashboardApiNode {
  id: string;
  source: "api";
  order: number;
  kind: ClaimDashboardApiNodeKind;
  title: string;
  status: ProcessDetail["status"];
  tone: ClaimNodeTone;
  summary: string;
  fields: ClaimDashboardField[];
  raw: ProcessDetail;
}

export interface InformationNoteNode {
  id: string;
  source: "local";
  kind: "information-note";
  title: string;
  note: string;
  createdAtLabel: string;
}

export interface AdditionalAttachmentNode {
  id: string;
  source: "local";
  kind: "additional-attachment";
  title: string;
  fileName: string;
  description: string;
  createdAtLabel: string;
}

export type ClaimDashboardLocalNode =
  | InformationNoteNode
  | AdditionalAttachmentNode;

export type ClaimDashboardNode =
  | ClaimDashboardApiNode
  | ClaimDashboardLocalNode;

export interface TimelineInsertSlot {
  index: number;
  label: string;
}

export interface ClaimDashboardViewModel {
  process: ClaimProcess;
  overview: ClaimDashboardOverview;
  apiNodes: ClaimDashboardApiNode[];
  insertSlots: TimelineInsertSlot[];
}

export interface ExplainResult {
  heading: string;
  summary: string;
  highlights: string[];
  suggestedAction: string;
  confidenceLabel: string;
}

export type DocumentAnalysisState =
  | "idle"
  | "loading"
  | "accepted"
  | "warning"
  | "rejected";

export interface DocumentAnalysisResult {
  state: DocumentAnalysisState;
  title: string;
  summary: string;
  checks: string[];
}
