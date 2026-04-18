import { ZodError } from "zod";

import {
  documentAnalysisApiPath,
  documentAnalysisRequestSchema,
  documentAnalysisResponseSchema,
  explainApiPath,
  explainClaimStepRequestSchema,
  explainResultSchema,
  type ProcessDetail,
} from "./schemas";
import type { DocumentAnalysisResult, ExplainResult } from "./types";

async function parseMockApiResponse<T>(
  response: Response,
  parser: {
    parse: (value: unknown) => T;
  },
): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "The mock AI route returned an unexpected error.";
    throw new Error(message);
  }

  try {
    return parser.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("The mock AI response failed schema validation.");
    }

    throw error;
  }
}

export async function getMockExplainResult(
  detail: ProcessDetail,
): Promise<ExplainResult> {
  const payload = explainClaimStepRequestSchema.parse({ detail });
  const response = await fetch(explainApiPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseMockApiResponse(response, explainResultSchema);
}

export async function getMockDocumentAnalysis(
  file: File,
  requestedDocument?: string,
): Promise<DocumentAnalysisResult> {
  const payload = documentAnalysisRequestSchema.parse({
    fileName: file.name,
    contentType: file.type || undefined,
    sizeInBytes: file.size,
    requestedDocument,
  });
  const response = await fetch(documentAnalysisApiPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseMockApiResponse(response, documentAnalysisResponseSchema);
}
