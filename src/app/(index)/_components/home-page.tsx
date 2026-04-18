"use client";

import { useQuery } from "@tanstack/react-query";
import { createClaimDashboardViewModel } from "../_utils/mappers";
import { getClaimProcessQueryOptions } from "../_utils/queries";
import { ClaimDashboard } from "./claim-dashboard";
import { DashboardErrorState } from "./dashboard-error-state";
import { DashboardLoadingState } from "./dashboard-loading-state";

export function HomePage() {
  const claimProcessQuery = useQuery(getClaimProcessQueryOptions());

  if (claimProcessQuery.isPending) {
    return <DashboardLoadingState />;
  }

  if (claimProcessQuery.isError || !claimProcessQuery.data) {
    return <DashboardErrorState />;
  }

  const viewModel = createClaimDashboardViewModel(claimProcessQuery.data);

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <ClaimDashboard viewModel={viewModel} />
    </main>
  );
}
