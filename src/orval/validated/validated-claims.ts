import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { ZodError } from "zod";
import {
  type ClaimProcess,
  claimProcessSchema,
} from "@/app/(index)/_utils/schemas";
import {
  getGetMockClaimProcessQueryKey,
  getMockClaimProcess,
} from "@/orval/generated/react-query/claims";
import type { ErrorType } from "@/orval/mutator/custom-instance";

export type ValidatedMockClaimProcessError =
  | ErrorType<unknown>
  | ZodError<ClaimProcess>;

export function getValidatedMockClaimProcessQueryKey() {
  return ["validated", ...getGetMockClaimProcessQueryKey()] as const;
}

export async function getValidatedMockClaimProcess(
  request?: RequestInit,
): Promise<ClaimProcess> {
  const data = await getMockClaimProcess(request);
  return claimProcessSchema.parse(data);
}

type ValidatedMockClaimProcessOptions<
  TData = ClaimProcess,
  TError = ValidatedMockClaimProcessError,
> = {
  request?: RequestInit;
  query?: Omit<
    UseQueryOptions<ClaimProcess, TError, TData>,
    "queryFn" | "queryKey"
  >;
};

export function getValidatedMockClaimProcessQueryOptions<
  TData = ClaimProcess,
  TError = ValidatedMockClaimProcessError,
>(options?: ValidatedMockClaimProcessOptions<TData, TError>) {
  const { query, request } = options ?? {};

  return {
    ...query,
    queryKey: getValidatedMockClaimProcessQueryKey(),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getValidatedMockClaimProcess({ signal, ...request }),
  } satisfies UseQueryOptions<ClaimProcess, TError, TData>;
}

export function useValidatedMockClaimProcess<
  TData = ClaimProcess,
  TError = ValidatedMockClaimProcessError,
>(
  options?: ValidatedMockClaimProcessOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  return useQuery(getValidatedMockClaimProcessQueryOptions(options));
}
