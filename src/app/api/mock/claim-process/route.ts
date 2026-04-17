import { claimProcess } from "@/lib/claim-process";

export const dynamic = "force-static";

export function GET() {
  return Response.json(claimProcess);
}
