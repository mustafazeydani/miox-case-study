import { createDocument } from "zod-openapi";

import { claimApiPath, claimProcessSchema } from "@/app/(index)/_utils/schemas";

export function getOpenApiDocument() {
  return createDocument(
    {
      openapi: "3.1.0",
      info: {
        title: "AI Claim Orchestrator API",
        version: "1.0.0",
        description:
          "Generated from Zod schemas for the mock claim route used in the AI-powered claim orchestrator case study.",
      },
      servers: [{ url: "/" }],
      paths: {
        [claimApiPath]: {
          get: {
            operationId: "getMockClaimProcess",
            tags: ["Claims"],
            summary: "Get the mock claim process payload",
            description:
              "Returns the heterogeneous case-study JSON that powers the dashboard, the mock route, and the Scalar reference page.",
            responses: {
              "200": {
                description: "Mock claim process payload",
                content: {
                  "application/json": {
                    schema: claimProcessSchema,
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      reused: "ref",
    },
  );
}
