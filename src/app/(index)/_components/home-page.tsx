export function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="surface-glass relative overflow-hidden rounded-[2rem] border border-white/70 px-6 py-8 shadow-[0_20px_70px_-32px_rgba(21,57,90,0.45)] ring-1 ring-black/4 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
            <div className="space-y-6">
              <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 font-semibold text-[0.7rem] text-primary uppercase tracking-[0.24em]">
                Claim Experience Foundation
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-balance font-heading font-semibold text-4xl text-foreground leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  Building a calmer way to follow every turn of a claim.
                </h1>
                <p className="max-w-2xl text-base text-muted-foreground leading-7 sm:text-lg">
                  The dashboard foundation is in place with the route-local
                  domain structure, premium visual language, and shared
                  dashboard contracts ready for the live claim experience.
                </p>
              </div>
            </div>
            <div className="surface-soft rounded-[1.75rem] border border-border/70 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.24em]">
                    Current Phase
                  </p>
                  <p className="mt-2 font-heading font-semibold text-2xl text-foreground leading-none">
                    Foundation
                  </p>
                </div>
                <div className="size-14 rounded-full border border-primary/20 bg-primary/10 p-3 text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-full"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a1 1 0 0 1 1 1v2.11a7 7 0 0 1 5.89 5.89H21a1 1 0 1 1 0 2h-2.11a7 7 0 0 1-5.89 5.89V21a1 1 0 1 1-2 0v-2.11a7 7 0 0 1-5.89-5.89H3a1 1 0 1 1 0-2h2.11A7 7 0 0 1 11 5.11V3a1 1 0 0 1 1-1m0 5a5 5 0 1 0 0 10a5 5 0 0 0 0-10"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-muted-foreground text-sm">
                <p>Global typography and theme tokens are set.</p>
                <p>
                  Dashboard-specific contracts now belong to the index route.
                </p>
                <p>The next pass will hydrate live claim data into the page.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
