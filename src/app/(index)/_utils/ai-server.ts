import { aiSimulationDelayMs, documentSimulationDelayMs } from "./constants";
import { mapProcessDetailToApiNode } from "./mappers";
import { getClaimNodeRegistryItem } from "./registry";
import type {
  DocumentAnalysisRequest,
  DocumentAnalysisResponse,
  ExplainResult,
  ProcessDetail,
} from "./schemas";

function wait(durationMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

function getExplainSuggestedAction(detail: ProcessDetail) {
  if ("actionRequired" in detail) {
    return detail.actionRequired;
  }

  if (detail.status === "Pending") {
    return "Keep this step visible and wait for the owning team to complete it.";
  }

  if (detail.status === "In Progress") {
    return "No new claimant upload is needed yet, but this stage should stay monitored.";
  }

  return "No immediate claimant action is required for this step.";
}

function getExplainConfidence(detail: ProcessDetail) {
  switch (detail.status) {
    case "Completed":
    case "Report Completed":
      return "High confidence from completed claim data";
    case "In Progress":
      return "Medium confidence while the step is still moving";
    case "Pending":
      return "Action-sensitive confidence until the blocker is cleared";
  }
}

export async function createMockExplainResult(
  detail: ProcessDetail,
): Promise<ExplainResult> {
  await wait(aiSimulationDelayMs);

  const node = mapProcessDetailToApiNode(detail, 0);
  const definition = getClaimNodeRegistryItem(node.kind);
  const spotlight =
    node.fields.find((field) => field.key === definition.spotlightFieldKey) ??
    node.fields[0];
  const highlights = [
    `This step belongs to ${definition.eyebrow.toLowerCase()} and is currently marked ${node.status.toLowerCase()}.`,
    spotlight
      ? `${spotlight.label}: ${spotlight.value}`
      : "More detail will appear here when this step includes additional information.",
    node.fields[1]
      ? `${node.fields[1].label}: ${node.fields[1].value}`
      : "Additional details will appear here when they become available.",
  ];

  return {
    heading: `${node.title} in plain language`,
    summary: `${definition.description} ${node.summary} This summary is based on the latest details available for this step.`,
    highlights,
    suggestedAction: getExplainSuggestedAction(detail),
    confidenceLabel: getExplainConfidence(detail),
  };
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").at(-1);
  return extension?.toLowerCase() ?? "";
}

export async function createMockDocumentAnalysisResult(
  input: DocumentAnalysisRequest,
): Promise<DocumentAnalysisResponse> {
  await wait(documentSimulationDelayMs);

  const normalizedName = input.fileName.toLowerCase();
  const extension = getFileExtension(normalizedName);
  const contentType = input.contentType?.toLowerCase() ?? "";
  const allowedExtensions = new Set(["pdf", "png", "jpg", "jpeg", "webp"]);
  const allowedContentTypes = new Set([
    "application/pdf",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
  ]);
  const hasCertificateKeyword =
    normalizedName.includes("certificate") ||
    normalizedName.includes("occupational") ||
    normalizedName.includes("occupation") ||
    normalizedName.includes("belge");
  const looksLikeDraft =
    normalizedName.includes("draft") ||
    normalizedName.includes("scan") ||
    normalizedName.includes("photo");

  if (
    !allowedExtensions.has(extension) ||
    (contentType && !allowedContentTypes.has(contentType))
  ) {
    return {
      state: "rejected",
      title: "Document rejected",
      summary:
        "Please upload the occupational certificate as a PDF or common image file.",
      checks: [
        `Detected extension: .${extension || "unknown"}`,
        input.contentType
          ? `Detected content type: ${input.contentType}`
          : "Your browser did not provide a file type.",
        "Supported formats: PDF, PNG, JPG, JPEG, WEBP",
      ],
    };
  }

  if (!hasCertificateKeyword || looksLikeDraft) {
    return {
      state: "warning",
      title: "Manual review recommended",
      summary:
        "The file format is supported, but the file name does not clearly show that this is the final occupational certificate.",
      checks: [
        `Detected extension: .${extension}`,
        looksLikeDraft
          ? "The file name suggests this may be a draft, scan, or photo."
          : "The file name does not include certificate-related terms.",
        input.requestedDocument
          ? `Requested document: ${input.requestedDocument}`
          : "A claims handler may need to confirm this document before the next step can continue.",
      ],
    };
  }

  return {
    state: "accepted",
    title: "Document accepted",
    summary:
      "This file looks like a good match for the requested occupational certificate.",
    checks: [
      `Detected extension: .${extension}`,
      "The file name includes certificate-related terms.",
      input.sizeInBytes
        ? `Your browser reported a file size of ${input.sizeInBytes} bytes.`
        : "Your browser did not provide a file size.",
    ],
  };
}
