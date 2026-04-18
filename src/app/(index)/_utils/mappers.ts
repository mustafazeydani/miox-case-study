import {
  createTimelineInsertSlots,
  formatProcessFields,
  formatRelativeActionableLabel,
  getClaimNodeKind,
  getClaimNodeTone,
} from "./helpers";
import {
  type ClaimProcess,
  getActionableStep,
  getCompletedStepCount,
  type ProcessDetail,
} from "./schemas";
import type {
  ClaimDashboardApiNode,
  ClaimDashboardOverview,
  ClaimDashboardViewModel,
} from "./types";

function getStepSummary(detail: ProcessDetail) {
  switch (detail.title) {
    case "Towing Service":
      return `Vehicle picked up from ${detail.pickupLocation}.`;
    case "Claim Notification":
      return `${detail.reportingParty} reported a ${detail.reasonForDamage.toLowerCase()} claim.`;
    case "Appraisal":
      return `Report completed by ${detail.expertInfo}.`;
    case "Substitute Rental Vehicle":
      return `${detail.vehicleModel} is approved for ${detail.vehicleDuration}.`;
    case "File Review":
      return `Review referred on ${detail.reviewReferralDate}.`;
    case "Deduction Reason":
      return detail.actionRequired;
    case "Payment Information":
      return `Pending payment to ${detail.paidTo}.`;
    case "Closed":
      return `Claim is waiting for closure confirmation.`;
  }
}

export function mapProcessDetailToApiNode(
  detail: ProcessDetail,
  order: number,
): ClaimDashboardApiNode {
  const kind = getClaimNodeKind(detail.title);

  return {
    id: `${kind}-${order + 1}`,
    source: "api",
    order,
    kind,
    title: detail.title,
    status: detail.status,
    tone: getClaimNodeTone(detail.status),
    summary: getStepSummary(detail),
    fields: formatProcessFields(detail),
    raw: detail,
  };
}

function createClaimDashboardOverview(
  process: ClaimProcess,
  apiNodes: ClaimDashboardApiNode[],
): ClaimDashboardOverview {
  const actionableStep = getActionableStep(process);
  const completedCount = getCompletedStepCount(process);
  const totalCount = process.processDetails.length;
  const completionRatio = completedCount / totalCount;
  const activeNode =
    apiNodes.find(
      (node) => node.status === "In Progress" || node.status === "Pending",
    ) ?? apiNodes.at(-1);

  return {
    title: process.title,
    claimNumber: process.fileNo,
    currentStage: activeNode?.title ?? process.currentStatus,
    currentStatus: process.currentStatus,
    estimatedRemainingTime: process.estimatedRemainingTime,
    actionableNow: formatRelativeActionableLabel(actionableStep?.title ?? null),
    actionableHeadline:
      actionableStep?.actionRequired ??
      "Everything needed is already in motion.",
    actionableStepTitle: actionableStep?.title ?? null,
    completionRatio,
    completedCount,
    totalCount,
  };
}

export function createClaimDashboardViewModel(
  process: ClaimProcess,
): ClaimDashboardViewModel {
  const apiNodes = process.processDetails.map(mapProcessDetailToApiNode);
  const overview = createClaimDashboardOverview(process, apiNodes);

  return {
    process,
    overview,
    apiNodes,
    insertSlots: createTimelineInsertSlots(apiNodes.length),
  };
}
