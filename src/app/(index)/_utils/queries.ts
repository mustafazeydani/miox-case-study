import { queryOptions } from "@tanstack/react-query";
import { getMockClaimProcess } from "@/orval/generated/react-query/claims";
import { type ClaimProcess, claimProcessSchema } from "./schemas";

export const claimProcessQueryKey = ["claim-process"] as const;

export async function fetchClaimProcess(
  request?: RequestInit,
): Promise<ClaimProcess> {
  const data = await getMockClaimProcess(request);

  return claimProcessSchema.parse(data);
}

export function getClaimProcessQueryOptions() {
  return queryOptions({
    queryKey: claimProcessQueryKey,
    queryFn: ({ signal }) => fetchClaimProcess({ signal }),
  });
}
