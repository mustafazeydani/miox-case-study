"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ClaimDashboardApiNodeKind } from "../_utils/types";
import type { ClaimStepPanelProps } from "./claim-step-panel-frame";
import { ClaimStepPanelSkeleton } from "./claim-step-panel-skeleton";

type ClaimStepPanelComponent = ComponentType<ClaimStepPanelProps>;

const TowingServiceStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/towing-service-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const ClaimNotificationStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/claim-notification-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const AppraisalStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/appraisal-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const SubstituteRentalVehicleStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/substitute-rental-vehicle-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const FileReviewStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/file-review-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const DeductionReasonStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/deduction-reason-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const PaymentInformationStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/payment-information-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);
const ClosedStepPanel = dynamic<ClaimStepPanelProps>(
  () => import("./steps/closed-step-panel"),
  { loading: () => <ClaimStepPanelSkeleton /> },
);

const claimStepPanelRegistry = {
  "towing-service": TowingServiceStepPanel,
  "claim-notification": ClaimNotificationStepPanel,
  appraisal: AppraisalStepPanel,
  "substitute-rental-vehicle": SubstituteRentalVehicleStepPanel,
  "file-review": FileReviewStepPanel,
  "deduction-reason": DeductionReasonStepPanel,
  "payment-information": PaymentInformationStepPanel,
  closed: ClosedStepPanel,
} satisfies Record<ClaimDashboardApiNodeKind, ClaimStepPanelComponent>;

export function getClaimStepPanelComponent(kind: ClaimDashboardApiNodeKind) {
  return claimStepPanelRegistry[kind];
}
