import { ApiReference } from "@scalar/nextjs-api-reference";

export const dynamic = "force-static";

export const GET = ApiReference({
  url: "/openapi.json",
});
