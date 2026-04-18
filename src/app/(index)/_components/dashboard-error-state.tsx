export function DashboardErrorState() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="surface-glass rounded-[2rem] border border-destructive/20 px-6 py-8 shadow-[0_20px_70px_-32px_rgba(21,57,90,0.45)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <p className="font-semibold text-destructive text-xs uppercase tracking-[0.24em]">
          Claim Feed Unavailable
        </p>
        <h1 className="mt-4 max-w-2xl text-balance font-heading font-semibold text-4xl text-foreground leading-none tracking-[-0.03em] sm:text-5xl">
          The claim dashboard could not load the current process.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground leading-7">
          Try refreshing the page. The mock route and reference endpoints are
          still available, so this is likely a temporary read issue.
        </p>
      </div>
    </section>
  );
}
