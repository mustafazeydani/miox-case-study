"use client";

import {
  ClaimStepPanelFrame,
  type ClaimStepPanelProps,
} from "../claim-step-panel-frame";

export default function PaymentInformationStepPanel(
  props: ClaimStepPanelProps,
) {
  return <ClaimStepPanelFrame {...props} />;
}
