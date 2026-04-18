import { claimProcess } from "@/app/(index)/_utils/schemas";

export const dynamic = "force-static";

export function GET() {
  return Response.json(claimProcess);
}
