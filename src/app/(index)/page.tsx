import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { getGetMockClaimProcessQueryOptions } from "@/orval/generated/react-query/claims";
import { DashboardErrorState } from "./_components/dashboard-error-state";
import { HomePage } from "./_components/home-page";
import { createClaimDashboardViewModel } from "./_utils/mappers";
import { claimProcessSchema } from "./_utils/schemas";

export default async function Page() {
  const queryClient = getQueryClient();
  const claimProcessQueryOptions = getGetMockClaimProcessQueryOptions();

  try {
    const process = claimProcessSchema.parse(
      await queryClient.fetchQuery(claimProcessQueryOptions),
    );
    const viewModel = createClaimDashboardViewModel(process);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage viewModel={viewModel} />
      </HydrationBoundary>
    );
  } catch {
    return <DashboardErrorState />;
  }
}
