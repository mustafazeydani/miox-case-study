/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import {
  type DefaultOptions,
  environmentManager,
  QueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { DEFAULT_CACHE_LIFE } from "@/config/constants";

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * DEFAULT_CACHE_LIFE.stale,
  },
} satisfies DefaultOptions;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
  ErrorType = Error,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  ErrorType, // Allow custom error types
  Parameters<MutationFnType>[0]
>;
