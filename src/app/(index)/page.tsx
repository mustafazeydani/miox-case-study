import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { DashboardErrorState } from "./_components/dashboard-error-state";
import { HomePage } from "./_components/home-page";
import { createClaimDashboardViewModel } from "./_utils/mappers";
import { getClaimProcessQueryOptions } from "./_utils/queries";

export default async function Page() {
  const queryClient = getQueryClient();
  const claimProcessQueryOptions = getClaimProcessQueryOptions();

  try {
    const process = await queryClient.fetchQuery(claimProcessQueryOptions);
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
