import { loadEnvConfig } from "@next/env";
import { defineConfig } from "orval";

loadEnvConfig(process.cwd());

const { env } = await import("./src/config/env");

export default defineConfig({
  claimProcessApi: {
    output: {
      mode: "tags",
      target: "./src/api/generated/react-query/index.ts",
      schemas: "./src/api/generated/model",
      client: "react-query",
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        query: {
          useInfinite: true,
          useInfiniteQueryParam: "page",
        },
      },
    },
    input: {
      target: `${env.NEXT_PUBLIC_API_URL}/openapi.json`,
    },
  },
});
