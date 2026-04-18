export const claimStatusToneMap = {
  Completed: "complete",
  "Report Completed": "report",
  "In Progress": "current",
  Pending: "pending",
} as const;

export const claimNodeKindByTitle = {
  "Towing Service": "towing-service",
  "Claim Notification": "claim-notification",
  Appraisal: "appraisal",
  "Substitute Rental Vehicle": "substitute-rental-vehicle",
  "File Review": "file-review",
  "Deduction Reason": "deduction-reason",
  "Payment Information": "payment-information",
  Closed: "closed",
} as const;

export const floatingDocsHref = "/reference" as const;

export const aiSimulationDelayMs = 900;
export const documentSimulationDelayMs = 1300;
