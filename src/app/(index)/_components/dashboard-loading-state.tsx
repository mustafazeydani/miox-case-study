export function DashboardLoadingState() {
  const loadingCardKeys = ["status", "eta", "actionability"] as const;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="surface-glass animate-pulse rounded-[2rem] border border-white/70 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="h-4 w-40 rounded-full bg-primary/10" />
        <div className="mt-6 h-12 max-w-2xl rounded-2xl bg-primary/8" />
        <div className="mt-4 h-6 max-w-xl rounded-2xl bg-primary/6" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {loadingCardKeys.map((key) => (
          <div
            key={key}
            className="surface-glass h-44 animate-pulse rounded-[1.5rem] border border-white/70 bg-primary/5"
          />
        ))}
      </div>
    </section>
  );
}
