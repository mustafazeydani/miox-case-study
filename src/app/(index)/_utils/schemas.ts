import "zod-openapi";

import { z } from "zod";

export const claimApiPath = "/api/mock/claim-process" as const;

const claimProcessFixture = {
  title: "Claim Process",
  fileNo: "9239182380",
  estimatedRemainingTime: "20 Days",
  currentStatus: "File Review Process Continues",
  processDetails: [
    {
      title: "Towing Service",
      status: "Completed",
      pickupLocation: "Istanbul/Kadikoy",
      towingDate: "10/09/2025 14:30",
    },
    {
      title: "Claim Notification",
      status: "Completed",
      dateTime: "10/09/2025 16:00",
      reportType: "Agreed Minutes",
      reasonForDamage: "Collision",
      reportingParty: "Grand Auto Services",
      contact: "0 (555) 000 00 00",
    },
    {
      title: "Appraisal",
      status: "Report Completed",
      expertAssignmentDate: "24.09.2025 10:30",
      expertInfo: "John Doe Appraisal Services",
      contact: "0 216 555 55 55, 0 555 555 55 55",
    },
    {
      title: "Substitute Rental Vehicle",
      status: "Completed",
      vehicleDuration: "15 Days",
      vehicleModel: "Volkswagen - Polo 1.4 TDI 90 Comf.",
      extraDuration: "0 days",
    },
    {
      title: "File Review",
      status: "In Progress",
      reviewReferralDate: "25.09.2025 09:00",
      reviewCompletionDate: "dd/mm/yyyy 00:00",
    },
    {
      title: "Deduction Reason",
      status: "Pending",
      actionRequired: "Upload Occupational Certificate",
      occupationalDeduction: "1.250 TL",
      appreciationDeduction: "3.400 TL",
      policyDeductible: "2.500 TL",
      nonDamageAmount: "0 TL",
    },
    {
      title: "Payment Information",
      status: "Pending",
      paidTo: "Jane Smith",
      iban: "TR823179327817000021",
      paymentAmount: "45.750 TL",
      note: "Payment Refunded",
    },
    {
      title: "Closed",
      status: "Pending",
      completionDate: "23.09.2025 23:30",
    },
  ],
} as const;

const [
  towingServiceFixture,
  claimNotificationFixture,
  appraisalFixture,
  substituteRentalVehicleFixture,
  fileReviewFixture,
  deductionReasonFixture,
  paymentInformationFixture,
  closedFixture,
] = claimProcessFixture.processDetails;

function createNamedStringSchema(
  id: string,
  description: string,
  example: string,
) {
  return z.string().meta({
    id,
    description,
    example,
  });
}

function createNamedLiteralSchema<const Value extends string>(
  id: string,
  value: Value,
  description: string,
) {
  return z.literal(value).meta({
    id,
    description,
    example: value,
  });
}

const claimProcessTitleSchema = createNamedLiteralSchema(
  "ClaimProcessTitle",
  "Claim Process",
  "Root title for the claim process payload.",
);

const claimFileNumberSchema = createNamedStringSchema(
  "ClaimFileNumber",
  "Claim file number shown to the claimant.",
  claimProcessFixture.fileNo,
);

const claimEstimatedRemainingTimeSchema = createNamedStringSchema(
  "ClaimEstimatedRemainingTime",
  "Estimated remaining processing time.",
  claimProcessFixture.estimatedRemainingTime,
);

const claimCurrentStatusSchema = createNamedStringSchema(
  "ClaimCurrentStatus",
  "Current high-level claim status.",
  claimProcessFixture.currentStatus,
);

const completedStepStatusSchema = createNamedLiteralSchema(
  "CompletedStepStatus",
  "Completed",
  "Indicates that a process step has been completed.",
);

const reportCompletedStepStatusSchema = createNamedLiteralSchema(
  "ReportCompletedStepStatus",
  "Report Completed",
  "Indicates that the appraisal report has been completed.",
);

const inProgressStepStatusSchema = createNamedLiteralSchema(
  "InProgressStepStatus",
  "In Progress",
  "Indicates that the process step is currently underway.",
);

const pendingStepStatusSchema = createNamedLiteralSchema(
  "PendingStepStatus",
  "Pending",
  "Indicates that the process step is waiting for action or completion.",
);

const towingServiceStepTitleSchema = createNamedLiteralSchema(
  "TowingServiceStepTitle",
  "Towing Service",
  "Title for the towing service claim step.",
);

const towingPickupLocationSchema = createNamedStringSchema(
  "TowingPickupLocation",
  "Where the vehicle was collected.",
  towingServiceFixture.pickupLocation,
);

const towingDateSchema = createNamedStringSchema(
  "TowingDateTime",
  "Scheduled towing timestamp from the case-study payload.",
  towingServiceFixture.towingDate,
);

const claimNotificationStepTitleSchema = createNamedLiteralSchema(
  "ClaimNotificationStepTitle",
  "Claim Notification",
  "Title for the claim notification step.",
);

const claimNotificationDateTimeSchema = createNamedStringSchema(
  "ClaimNotificationDateTime",
  "Notification timestamp from the case-study payload.",
  claimNotificationFixture.dateTime,
);

const claimNotificationReportTypeSchema = createNamedStringSchema(
  "ClaimNotificationReportType",
  "How the claim was reported.",
  claimNotificationFixture.reportType,
);

const claimNotificationReasonForDamageSchema = createNamedStringSchema(
  "ClaimNotificationReasonForDamage",
  "Reported reason for the claim.",
  claimNotificationFixture.reasonForDamage,
);

const claimNotificationReportingPartySchema = createNamedStringSchema(
  "ClaimNotificationReportingParty",
  "Who submitted the notification.",
  claimNotificationFixture.reportingParty,
);

const claimNotificationContactSchema = createNamedStringSchema(
  "ClaimNotificationContact",
  "Contact number for the reporting party.",
  claimNotificationFixture.contact,
);

const appraisalStepTitleSchema = createNamedLiteralSchema(
  "AppraisalStepTitle",
  "Appraisal",
  "Title for the appraisal step.",
);

const appraisalExpertAssignmentDateSchema = createNamedStringSchema(
  "AppraisalExpertAssignmentDate",
  "When the appraiser was assigned.",
  appraisalFixture.expertAssignmentDate,
);

const appraisalExpertInfoSchema = createNamedStringSchema(
  "AppraisalExpertInfo",
  "Assigned appraisal provider.",
  appraisalFixture.expertInfo,
);

const appraisalContactSchema = createNamedStringSchema(
  "AppraisalContact",
  "Appraiser contact numbers.",
  appraisalFixture.contact,
);

const substituteRentalVehicleStepTitleSchema = createNamedLiteralSchema(
  "SubstituteRentalVehicleStepTitle",
  "Substitute Rental Vehicle",
  "Title for the substitute rental vehicle step.",
);

const substituteRentalVehicleDurationSchema = createNamedStringSchema(
  "SubstituteRentalVehicleDuration",
  "Rental coverage duration.",
  substituteRentalVehicleFixture.vehicleDuration,
);

const substituteRentalVehicleModelSchema = createNamedStringSchema(
  "SubstituteRentalVehicleModel",
  "Provided rental vehicle model.",
  substituteRentalVehicleFixture.vehicleModel,
);

const substituteRentalVehicleExtraDurationSchema = createNamedStringSchema(
  "SubstituteRentalVehicleExtraDuration",
  "Any extra rental duration granted.",
  substituteRentalVehicleFixture.extraDuration,
);

const fileReviewStepTitleSchema = createNamedLiteralSchema(
  "FileReviewStepTitle",
  "File Review",
  "Title for the file review step.",
);

const fileReviewReferralDateSchema = createNamedStringSchema(
  "FileReviewReferralDate",
  "When the file entered review.",
  fileReviewFixture.reviewReferralDate,
);

const fileReviewCompletionDateSchema = createNamedStringSchema(
  "FileReviewCompletionDate",
  "Expected review completion placeholder from the brief.",
  fileReviewFixture.reviewCompletionDate,
);

const deductionReasonStepTitleSchema = createNamedLiteralSchema(
  "DeductionReasonStepTitle",
  "Deduction Reason",
  "Title for the deduction reason step.",
);

const deductionReasonActionRequiredSchema = createNamedStringSchema(
  "DeductionReasonActionRequired",
  "Immediate action the claimant must take.",
  deductionReasonFixture.actionRequired,
);

const deductionReasonOccupationalDeductionSchema = createNamedStringSchema(
  "DeductionReasonOccupationalDeduction",
  "Occupational deduction amount.",
  deductionReasonFixture.occupationalDeduction,
);

const deductionReasonAppreciationDeductionSchema = createNamedStringSchema(
  "DeductionReasonAppreciationDeduction",
  "Appreciation deduction amount.",
  deductionReasonFixture.appreciationDeduction,
);

const deductionReasonPolicyDeductibleSchema = createNamedStringSchema(
  "DeductionReasonPolicyDeductible",
  "Policy deductible amount.",
  deductionReasonFixture.policyDeductible,
);

const deductionReasonNonDamageAmountSchema = createNamedStringSchema(
  "DeductionReasonNonDamageAmount",
  "Non-damage amount.",
  deductionReasonFixture.nonDamageAmount,
);

const paymentInformationStepTitleSchema = createNamedLiteralSchema(
  "PaymentInformationStepTitle",
  "Payment Information",
  "Title for the payment information step.",
);

const paymentInformationPaidToSchema = createNamedStringSchema(
  "PaymentInformationPaidTo",
  "Payment recipient.",
  paymentInformationFixture.paidTo,
);

const paymentInformationIbanSchema = createNamedStringSchema(
  "PaymentInformationIban",
  "Destination account number.",
  paymentInformationFixture.iban,
);

const paymentInformationPaymentAmountSchema = createNamedStringSchema(
  "PaymentInformationPaymentAmount",
  "Payment amount from the claim payload.",
  paymentInformationFixture.paymentAmount,
);

const paymentInformationNoteSchema = createNamedStringSchema(
  "PaymentInformationNote",
  "Payment note from the claim payload.",
  paymentInformationFixture.note,
);

const closedStepTitleSchema = createNamedLiteralSchema(
  "ClosedStepTitle",
  "Closed",
  "Title for the final closure step.",
);

const closedCompletionDateSchema = createNamedStringSchema(
  "ClosedCompletionDate",
  "Planned closure timestamp.",
  closedFixture.completionDate,
);

const towingServiceStepSchema = z
  .object({
    title: towingServiceStepTitleSchema,
    status: completedStepStatusSchema,
    pickupLocation: towingPickupLocationSchema,
    towingDate: towingDateSchema,
  })
  .meta({
    id: "TowingServiceStep",
    description: "Towing service step details.",
    example: towingServiceFixture,
  });

const claimNotificationStepSchema = z
  .object({
    title: claimNotificationStepTitleSchema,
    status: completedStepStatusSchema,
    dateTime: claimNotificationDateTimeSchema,
    reportType: claimNotificationReportTypeSchema,
    reasonForDamage: claimNotificationReasonForDamageSchema,
    reportingParty: claimNotificationReportingPartySchema,
    contact: claimNotificationContactSchema,
  })
  .meta({
    id: "ClaimNotificationStep",
    description: "Claim notification details.",
    example: claimNotificationFixture,
  });

const appraisalStepSchema = z
  .object({
    title: appraisalStepTitleSchema,
    status: reportCompletedStepStatusSchema,
    expertAssignmentDate: appraisalExpertAssignmentDateSchema,
    expertInfo: appraisalExpertInfoSchema,
    contact: appraisalContactSchema,
  })
  .meta({
    id: "AppraisalStep",
    description: "Appraisal completion details.",
    example: appraisalFixture,
  });

const substituteRentalVehicleStepSchema = z
  .object({
    title: substituteRentalVehicleStepTitleSchema,
    status: completedStepStatusSchema,
    vehicleDuration: substituteRentalVehicleDurationSchema,
    vehicleModel: substituteRentalVehicleModelSchema,
    extraDuration: substituteRentalVehicleExtraDurationSchema,
  })
  .meta({
    id: "SubstituteRentalVehicleStep",
    description: "Temporary replacement vehicle details.",
    example: substituteRentalVehicleFixture,
  });

const fileReviewStepSchema = z
  .object({
    title: fileReviewStepTitleSchema,
    status: inProgressStepStatusSchema,
    reviewReferralDate: fileReviewReferralDateSchema,
    reviewCompletionDate: fileReviewCompletionDateSchema,
  })
  .meta({
    id: "FileReviewStep",
    description: "Current file review status.",
    example: fileReviewFixture,
  });

const deductionReasonStepSchema = z
  .object({
    title: deductionReasonStepTitleSchema,
    status: pendingStepStatusSchema,
    actionRequired: deductionReasonActionRequiredSchema,
    occupationalDeduction: deductionReasonOccupationalDeductionSchema,
    appreciationDeduction: deductionReasonAppreciationDeductionSchema,
    policyDeductible: deductionReasonPolicyDeductibleSchema,
    nonDamageAmount: deductionReasonNonDamageAmountSchema,
  })
  .meta({
    id: "DeductionReasonStep",
    description: "Pending deduction and upload requirements.",
    example: deductionReasonFixture,
  });

const paymentInformationStepSchema = z
  .object({
    title: paymentInformationStepTitleSchema,
    status: pendingStepStatusSchema,
    paidTo: paymentInformationPaidToSchema,
    iban: paymentInformationIbanSchema,
    paymentAmount: paymentInformationPaymentAmountSchema,
    note: paymentInformationNoteSchema,
  })
  .meta({
    id: "PaymentInformationStep",
    description: "Pending payment details.",
    example: paymentInformationFixture,
  });

const closedStepSchema = z
  .object({
    title: closedStepTitleSchema,
    status: pendingStepStatusSchema,
    completionDate: closedCompletionDateSchema,
  })
  .meta({
    id: "ClosedStep",
    description: "Final closure step details.",
    example: closedFixture,
  });

export const processDetailSchema = z
  .discriminatedUnion("title", [
    towingServiceStepSchema,
    claimNotificationStepSchema,
    appraisalStepSchema,
    substituteRentalVehicleStepSchema,
    fileReviewStepSchema,
    deductionReasonStepSchema,
    paymentInformationStepSchema,
    closedStepSchema,
  ])
  .meta({
    id: "ProcessDetail",
    description: "A single polymorphic claim-process node from the case study.",
  });

const processDetailListSchema = z.array(processDetailSchema).meta({
  id: "ProcessDetailList",
  description: "Ordered process nodes returned by the mock API.",
});

export const claimProcessSchema = z
  .object({
    title: claimProcessTitleSchema,
    fileNo: claimFileNumberSchema,
    estimatedRemainingTime: claimEstimatedRemainingTimeSchema,
    currentStatus: claimCurrentStatusSchema,
    processDetails: processDetailListSchema,
  })
  .meta({
    id: "ClaimProcess",
    description: "Mock claim orchestration payload taken from the case study.",
    example: claimProcessFixture,
  });

export type ProcessDetail = z.infer<typeof processDetailSchema>;
export type ClaimProcess = z.infer<typeof claimProcessSchema>;

export const claimProcess = claimProcessSchema.parse(claimProcessFixture);

export function getActionableStep(process: ClaimProcess) {
  return (
    process.processDetails.find((detail) => "actionRequired" in detail) ?? null
  );
}

export function getCompletedStepCount(process: ClaimProcess) {
  return process.processDetails.filter(
    (detail) =>
      detail.status === "Completed" || detail.status === "Report Completed",
  ).length;
}

export function getProcessDetailFields(detail: ProcessDetail) {
  return Object.entries(detail)
    .filter(([key]) => key !== "title" && key !== "status")
    .map(([key, value]) => ({
      key,
      label: key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/^./, (char) => char.toUpperCase()),
      value: String(value),
    }));
}
