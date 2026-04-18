import { claimNodeKindByTitle, claimStatusToneMap } from "./constants";
import { getProcessDetailFields, type ProcessDetail } from "./schemas";
import type {
  ClaimDashboardApiNodeKind,
  ClaimDashboardField,
  ClaimNodeTone,
  TimelineInsertSlot,
} from "./types";

export function getClaimNodeTone(
  status: ProcessDetail["status"],
): ClaimNodeTone {
  return claimStatusToneMap[status];
}

export function getClaimNodeKind(
  title: ProcessDetail["title"],
): ClaimDashboardApiNodeKind {
  return claimNodeKindByTitle[title];
}

export function formatProcessField(
  field: ReturnType<typeof getProcessDetailFields>[number],
): ClaimDashboardField {
  return {
    key: field.key,
    label: field.label,
    value: field.value,
  };
}

export function formatProcessFields(
  detail: ProcessDetail,
): ClaimDashboardField[] {
  return getProcessDetailFields(detail).map(formatProcessField);
}

export function createTimelineInsertSlots(
  length: number,
): TimelineInsertSlot[] {
  return Array.from({ length: length + 1 }, (_, index) => ({
    index,
    label:
      index === length
        ? "Add after the final step"
        : `Add after step ${index + 1}`,
  }));
}

export function formatRelativeActionableLabel(stepTitle: string | null) {
  if (!stepTitle) {
    return "No immediate action is required right now.";
  }

  return `Action is waiting in ${stepTitle}.`;
}
