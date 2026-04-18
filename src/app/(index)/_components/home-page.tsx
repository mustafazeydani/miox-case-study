import type { ClaimDashboardViewModel } from "../_utils/types";
import { ClaimDashboard } from "./claim-dashboard";
import { DashboardEmptyState } from "./dashboard-empty-state";

interface HomePageProps {
  viewModel: ClaimDashboardViewModel;
}

export function HomePage({ viewModel }: HomePageProps) {
  if (viewModel.apiNodes.length === 0) {
    return <DashboardEmptyState />;
  }

  return (
    <>
      <a
        href="#claim-dashboard-main"
        className="sr-only top-4 left-4 z-50 rounded-full bg-background px-4 py-2 font-medium text-foreground text-sm shadow-sm focus:not-sr-only focus:fixed focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
      >
        Skip to claim dashboard
      </a>
      <main
        id="claim-dashboard-main"
        className="relative flex flex-1 flex-col overflow-hidden"
      >
        <ClaimDashboard viewModel={viewModel} />
      </main>
    </>
  );
}
