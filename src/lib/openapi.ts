import { createDocument } from "zod-openapi";

import {
  claimApiPath,
  claimProcessSchema,
  documentAnalysisApiPath,
  documentAnalysisRequestSchema,
  documentAnalysisResponseSchema,
  explainApiPath,
  explainClaimStepRequestSchema,
  explainResultSchema,
  mockApiErrorSchema,
} from "@/app/(index)/_utils/schemas";

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
        [explainApiPath]: {
          post: {
            operationId: "postMockAiExplain",
            tags: ["Mock AI"],
            summary: "Explain a claim step with the mock AI service",
            description:
              "Accepts a single claim-process step and returns a deterministic explanation used by the dashboard AI sheet.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: explainClaimStepRequestSchema,
                },
              },
            },
            responses: {
              "200": {
                description: "Mock AI explanation result",
                content: {
                  "application/json": {
                    schema: explainResultSchema,
                  },
                },
              },
              "400": {
                description: "Invalid mock AI request payload",
                content: {
                  "application/json": {
                    schema: mockApiErrorSchema,
                  },
                },
              },
            },
          },
        },
        [documentAnalysisApiPath]: {
          post: {
            operationId: "postMockAiDocumentAnalysis",
            tags: ["Mock AI"],
            summary: "Analyze a claimant document with the mock AI service",
            description:
              "Accepts browser file metadata and returns a deterministic accepted, warning, or rejected document-analysis result.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: documentAnalysisRequestSchema,
                },
              },
            },
            responses: {
              "200": {
                description: "Mock AI document-analysis result",
                content: {
                  "application/json": {
                    schema: documentAnalysisResponseSchema,
                  },
                },
              },
              "400": {
                description: "Invalid mock document-analysis payload",
                content: {
                  "application/json": {
                    schema: mockApiErrorSchema,
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
