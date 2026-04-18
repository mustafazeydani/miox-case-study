import "zod-openapi";

import { z } from "zod";

export const claimApiPath = "/api/mock/claim-process" as const;
export const explainApiPath = "/api/mock/ai/explain" as const;
export const documentAnalysisApiPath =
  "/api/mock/ai/document-analysis" as const;

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

const explainClaimStepRequestFixture = {
  detail: claimProcessFixture.processDetails[5],
} as const;

const documentAnalysisRequestFixture = {
  fileName: "occupational-certificate.pdf",
  contentType: "application/pdf",
  sizeInBytes: 245760,
  requestedDocument: "Upload Occupational Certificate",
} as const;

const explainResultFixture = {
  heading: "Deduction Reason in plain language",
  summary:
    "Outstanding deductions and the document request blocking progress. Upload Occupational Certificate. This summary is based on the latest details available for this step.",
  highlights: [
    "This step belongs to action required and is currently marked pending.",
    "Action Required: Upload Occupational Certificate",
    "Occupational Deduction: 1.250 TL",
  ],
  suggestedAction: "Upload Occupational Certificate",
  confidenceLabel: "Action-sensitive confidence until the blocker is cleared",
} as const;

const acceptedDocumentAnalysisFixture = {
  state: "accepted",
  title: "Document accepted",
  summary:
    "This file looks like a good match for the requested occupational certificate.",
  checks: [
    "Detected extension: .pdf",
    "The file name includes certificate-related terms.",
    "Your browser reported a file size of 245760 bytes.",
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

function createNamedOptionalSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  id: string,
  description: string,
  example: z.infer<TSchema>,
) {
  return schema.optional().meta({
    id,
    description,
    example,
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

const mockApiErrorMessageSchema = createNamedStringSchema(
  "MockApiErrorMessage",
  "Validation or request error message returned by a mock API route.",
  "Invalid mock AI request payload.",
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

const documentAnalysisFileNameSchema = createNamedStringSchema(
  "DocumentAnalysisFileName",
  "Name of the uploaded file being analyzed by the mock AI route.",
  documentAnalysisRequestFixture.fileName,
);

const documentAnalysisContentTypeSchema = createNamedStringSchema(
  "DocumentAnalysisContentType",
  "Optional MIME type captured from the browser file input.",
  documentAnalysisRequestFixture.contentType,
);

const documentAnalysisRequestContentTypeSchema = createNamedOptionalSchema(
  documentAnalysisContentTypeSchema,
  "DocumentAnalysisRequestContentType",
  "Optional MIME type captured from the browser file input.",
  documentAnalysisRequestFixture.contentType,
);

const documentAnalysisSizeInBytesSchema = z.number().int().nonnegative().meta({
  id: "DocumentAnalysisSizeInBytes",
  description: "Optional browser-reported size of the uploaded file.",
  example: documentAnalysisRequestFixture.sizeInBytes,
});

const documentAnalysisRequestSizeInBytesSchema = createNamedOptionalSchema(
  documentAnalysisSizeInBytesSchema,
  "DocumentAnalysisRequestSizeInBytes",
  "Optional browser-reported size of the uploaded file.",
  documentAnalysisRequestFixture.sizeInBytes,
);

const requestedDocumentSchema = createNamedStringSchema(
  "RequestedDocument",
  "The specific claimant document the mock AI route is evaluating.",
  documentAnalysisRequestFixture.requestedDocument,
);

const documentAnalysisRequestRequestedDocumentSchema =
  createNamedOptionalSchema(
    requestedDocumentSchema,
    "DocumentAnalysisRequestRequestedDocument",
    "The specific claimant document this upload is being checked against.",
    documentAnalysisRequestFixture.requestedDocument,
  );

const explainHeadingSchema = createNamedStringSchema(
  "ExplainHeading",
  "Headline returned by the mock AI explain route.",
  explainResultFixture.heading,
);

const explainSummarySchema = createNamedStringSchema(
  "ExplainSummary",
  "Narrative explanation generated for a claim step.",
  explainResultFixture.summary,
);

const explainHighlightSchema = createNamedStringSchema(
  "ExplainHighlight",
  "Single highlight returned by the mock AI explain route.",
  explainResultFixture.highlights[0],
);

const explainSuggestedActionSchema = createNamedStringSchema(
  "ExplainSuggestedAction",
  "Suggested next action returned by the mock AI explain route.",
  explainResultFixture.suggestedAction,
);

const explainConfidenceLabelSchema = createNamedStringSchema(
  "ExplainConfidenceLabel",
  "Confidence label returned by the mock AI explain route.",
  explainResultFixture.confidenceLabel,
);

const documentAnalysisAcceptedStateSchema = createNamedLiteralSchema(
  "DocumentAnalysisAcceptedState",
  "accepted",
  "The document passed the mock analyzer checks.",
);

const documentAnalysisWarningStateSchema = createNamedLiteralSchema(
  "DocumentAnalysisWarningState",
  "warning",
  "The document is usable but may need manual review.",
);

const documentAnalysisRejectedStateSchema = createNamedLiteralSchema(
  "DocumentAnalysisRejectedState",
  "rejected",
  "The document failed the mock analyzer checks.",
);

const documentAnalysisTitleSchema = createNamedStringSchema(
  "DocumentAnalysisTitle",
  "Short result title returned by the mock document-analysis route.",
  acceptedDocumentAnalysisFixture.title,
);

const documentAnalysisSummarySchema = createNamedStringSchema(
  "DocumentAnalysisSummary",
  "Narrative result summary returned by the mock document-analysis route.",
  acceptedDocumentAnalysisFixture.summary,
);

const documentAnalysisCheckSchema = createNamedStringSchema(
  "DocumentAnalysisCheck",
  "Single check line returned by the mock document-analysis route.",
  acceptedDocumentAnalysisFixture.checks[0],
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

export const mockApiErrorSchema = z
  .object({
    message: mockApiErrorMessageSchema,
  })
  .meta({
    id: "MockApiError",
    description: "Generic validation error returned by the mock AI routes.",
    example: {
      message: "Invalid mock AI request payload.",
    },
  });

export const explainClaimStepRequestSchema = z
  .object({
    detail: processDetailSchema,
  })
  .meta({
    id: "ExplainClaimStepRequest",
    description:
      "Request payload for the mock AI explanation route, built from a single claim step.",
    example: explainClaimStepRequestFixture,
  });

export const explainResultSchema = z
  .object({
    heading: explainHeadingSchema,
    summary: explainSummarySchema,
    highlights: z.array(explainHighlightSchema).meta({
      id: "ExplainHighlights",
      description: "Key bullet highlights returned by the mock AI route.",
      example: explainResultFixture.highlights,
    }),
    suggestedAction: explainSuggestedActionSchema,
    confidenceLabel: explainConfidenceLabelSchema,
  })
  .meta({
    id: "ExplainResult",
    description: "Mock explanation response returned for a claim step.",
    example: explainResultFixture,
  });

export const documentAnalysisRequestSchema = z
  .object({
    fileName: documentAnalysisFileNameSchema,
    contentType: documentAnalysisRequestContentTypeSchema,
    sizeInBytes: documentAnalysisRequestSizeInBytesSchema,
    requestedDocument: documentAnalysisRequestRequestedDocumentSchema,
  })
  .meta({
    id: "DocumentAnalysisRequest",
    description:
      "Request payload for the mock document-analysis route, based on browser file metadata.",
    example: documentAnalysisRequestFixture,
  });

export const documentAnalysisResponseSchema = z
  .object({
    state: z
      .union([
        documentAnalysisAcceptedStateSchema,
        documentAnalysisWarningStateSchema,
        documentAnalysisRejectedStateSchema,
      ])
      .meta({
        id: "DocumentAnalysisState",
        description: "Resolved state from the mock document-analysis route.",
        example: acceptedDocumentAnalysisFixture.state,
      }),
    title: documentAnalysisTitleSchema,
    summary: documentAnalysisSummarySchema,
    checks: z.array(documentAnalysisCheckSchema).meta({
      id: "DocumentAnalysisChecks",
      description:
        "Detailed checks returned by the mock document-analysis route.",
      example: acceptedDocumentAnalysisFixture.checks,
    }),
  })
  .meta({
    id: "DocumentAnalysisResult",
    description: "Mock document-analysis response for a claimant upload.",
    example: acceptedDocumentAnalysisFixture,
  });

export type ProcessDetail = z.infer<typeof processDetailSchema>;
export type ClaimProcess = z.infer<typeof claimProcessSchema>;
export type ExplainClaimStepRequest = z.infer<
  typeof explainClaimStepRequestSchema
>;
export type ExplainResult = z.infer<typeof explainResultSchema>;
export type DocumentAnalysisRequest = z.infer<
  typeof documentAnalysisRequestSchema
>;
export type DocumentAnalysisResponse = z.infer<
  typeof documentAnalysisResponseSchema
>;
export type MockApiError = z.infer<typeof mockApiErrorSchema>;

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
