import { ZodError } from "zod";

import { createMockDocumentAnalysisResult } from "@/app/(index)/_utils/ai-server";
import {
  documentAnalysisRequestSchema,
  documentAnalysisResponseSchema,
  mockApiErrorSchema,
} from "@/app/(index)/_utils/schemas";

function createInvalidPayloadResponse() {
  return Response.json(
    mockApiErrorSchema.parse({
      message: "Invalid mock document-analysis request payload.",
    }),
    { status: 400 },
  );
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = documentAnalysisRequestSchema.parse(json);
    const result = await createMockDocumentAnalysisResult(payload);

    return Response.json(documentAnalysisResponseSchema.parse(result));
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof ZodError) {
      return createInvalidPayloadResponse();
    }

    throw error;
  }
}
