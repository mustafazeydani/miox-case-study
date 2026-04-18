import { ZodError } from "zod";

import { createMockExplainResult } from "@/app/(index)/_utils/ai-server";
import {
  explainClaimStepRequestSchema,
  explainResultSchema,
  mockApiErrorSchema,
} from "@/app/(index)/_utils/schemas";

function createInvalidPayloadResponse() {
  return Response.json(
    mockApiErrorSchema.parse({
      message: "Invalid mock AI explain request payload.",
    }),
    { status: 400 },
  );
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = explainClaimStepRequestSchema.parse(json);
    const result = await createMockExplainResult(payload.detail);

    return Response.json(explainResultSchema.parse(result));
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof ZodError) {
      return createInvalidPayloadResponse();
    }

    throw error;
  }
}
