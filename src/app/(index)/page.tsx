import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { HomePage } from "./_components/home-page";
import { getClaimProcessQueryOptions } from "./_utils/queries";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getClaimProcessQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
