import type {
  ClaimDashboardLocalNode,
  ClaimDashboardLocalNodeKind,
} from "@/lib/stores/claim-dashboard-store";
import type {
  DocumentAnalysisResult as OrvalDocumentAnalysisResult,
  ExplainResult as OrvalExplainResult,
} from "@/orval/generated/model";
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
  currentStatus: string;
  estimatedRemainingTime: string;
  actionableNow: string;
  actionableHeadline: string;
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

export type ExplainResult = OrvalExplainResult;
export type DocumentAnalysisResult = OrvalDocumentAnalysisResult;
export type {
  AdditionalAttachmentNode,
  ClaimDashboardLocalNode,
  ClaimDashboardLocalNodeKind,
  InformationNoteNode,
} from "@/lib/stores/claim-dashboard-store";
