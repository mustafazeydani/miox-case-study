# AI-Powered Claim Orchestrator

> Important: Regarding the case study 2-hour duration rule. I spent some initial time setting up the codebase and workspace so I could be comfortable working in the environment I am used to. To reflect the actual timed case work, my timestamp starts from the commit where I began implementation: [aed5c6c
](https://github.com/mustafazeydani/miox-case-study/commit/aed5c6c19da7385c90c533fb5be56d00c5269d0b).
>
> Note: This project was built heavily with OpenAI GPT-5.4 through the Codex extension, but the main design decisions, project structure, tool choices, and overall implementation direction were guided by me.

## Table Of Contents

- [Running Locally](#running-locally)
- [Overview](#overview)
- [Design Decisions](#design-decisions)
- [API, Docs, And Code Generation](#api-docs-and-code-generation)
- [Project Structure](#project-structure)
- [Advanced Patterns Used](#advanced-patterns-used)
- [What I Would Improve With More Time](#what-i-would-improve-with-more-time)

## Running Locally

This is a case-study project built around local mock routes, not a real deployed backend, so before running it you should create a local `.env` file in the project root using the same localhost value shown in `.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Then run the project with:

1. Install dependencies:

```bash
pnpm install
```

2. Start the Next.js app:

```bash
pnpm dev
```

3. Open the app locally:

```bash
http://localhost:3000
```

Useful local routes:

- `/` for the claim dashboard
- `/reference` for the Scalar API reference
- `/openapi.json` for the generated OpenAPI document

If you update the Zod/OpenAPI contracts and want to regenerate the typed clients, keep the app running locally and run:

```bash
pnpm orval:generate
```

## Overview

This project is a case-study implementation of an AI-powered claim dashboard built with Next.js App Router, TanStack Query, Zod, Zustand, Tailwind CSS v4, and shadcn/ui.

The main goal was not only to render the provided JSON, but to structure the application in a way that would still make sense if the mock services later became real backend services. Because of that, I treated the API contract, route ownership, generated clients, and rendering architecture as first-class decisions rather than shortcuts.

The dashboard is designed to answer the 3 most important questions immediately:

- What is the current claim status?
- How much longer will the process take?
- Is there anything the user needs to do right now?

It also supports:

- step-by-step claim navigation
- dynamic insertion of local notes and attachments between steps
- mock AI explanations per step
- mock AI document analysis for the occupational certificate flow
- a fully documented mock API exposed through OpenAPI and Scalar

## Design Decisions

### 1. Route-domain pattern over a flat shared-component structure

I intentionally used a route-domain pattern instead of pushing everything into `src/components` or `src/lib`.

In this project, the homepage domain lives under `src/app/(index)` and owns:

- `_components` for route-specific UI
- `_utils` for route-specific schemas, helpers, mappers, registry metadata, and types
- `page.tsx` as a thin server entry point

That decision keeps the route self-contained and makes ownership obvious. The claim dashboard should not need to import private implementation details from unrelated routes, and unrelated routes should not need to depend on dashboard-only code.

I only promoted code to global locations when it was truly shared:

- `src/components/ui` for shadcn primitives
- `src/lib` for app-wide concerns like the React Query setup, OpenAPI document builder, utility helpers, and the shared Zustand store
- `src/config` for environment and configuration concerns
- `src/orval` for generated client code and API infrastructure

This keeps the codebase modular without falling into the common trap of creating a global "utils graveyard".

### 2. Separate raw API shapes from UI-facing view models

The incoming payload is heterogeneous by design. Each `processDetails` node has different fields depending on its title and status.

Instead of letting the UI consume those raw shapes directly, I added a mapping layer that transforms API data into a stable dashboard view model. That layer is responsible for:

- deriving the summary strip data
- normalizing each step into a stable `ClaimDashboardApiNode`
- generating the initial active step
- formatting fields into a consistent renderable structure
- creating insert slots for local timeline updates

This creates an intentional boundary between transport models and presentation models. The UI becomes simpler, more predictable, and easier to refactor because rendering components depend on a stable internal shape rather than a backend-specific wire format.

### 3. Registry-driven rendering instead of branching render logic

Because the case-study payload contains multiple step variants, I avoided long `if/else` or `switch` trees in the rendering layer.

I used a registry-based approach in two places:

- a metadata registry for labels, icons, descriptions, AI text, spotlight fields, and step-level presentation decisions
- a step-panel registry for resolving the correct lazy-loaded component for each claim step kind

This makes the UI polymorphic without making it fragile. Adding a new step type becomes an additive operation: define its metadata, map its kind, and provide its panel. That scales much better than scattering conditional rendering rules across the component tree.

### 4. Keep the server/client boundary intentional

I did not treat the whole route as a client page.

The route entry remains a server component that:

- prefetches claim data using the generated React Query options
- validates the result with Zod
- creates the dashboard view model
- hydrates the client side through `HydrationBoundary`

Interactive behavior stays on the client only where it actually belongs:

- step navigation
- AI sheet behavior
- local note and attachment insertion
- document analysis interaction
- theme toggle

This gives a better rendering split and keeps the dashboard shell fast and predictable.

### 5. State is placed by ownership, not by habit

I used Zustand selectively rather than using it as a general-purpose application store.

Fetched server data stays in the React Query layer. Derived dashboard data stays in the mapping layer. Zustand is only used for local, user-created timeline nodes that do not belong to the backend contract yet.

That separation matters:

- server state stays in the server-state tool
- local ephemeral UI state stays local
- shared client-only inserted-node state lives in a focused global store

This avoids the anti-pattern of turning the whole app into one large mutable client store.

## API, Docs, And Code Generation

One of the core architectural decisions in this project was to treat even the mock backend as a real contract boundary.

The flow is:

1. Zod schemas define the request and response contracts.
2. `zod-openapi` generates the OpenAPI document exposed at `/openapi.json`.
3. Scalar consumes the same document at `/reference`.
4. Orval generates typed models and React Query clients from that OpenAPI contract.
5. The app uses the generated clients instead of handwritten request wrappers.

This gives me a single contract source of truth for:

- runtime validation
- API documentation
- client generation
- request typing
- response typing

That eliminates documentation drift and keeps the mocked routes, docs page, and frontend data layer aligned.

I also explicitly moved the mock AI behaviors behind real Next.js route handlers instead of leaving them as local-only simulations, so the AI explain flow and the document analysis flow are both part of the documented API surface.

## Project Structure

```text
src/
  app/
    (index)/
      page.tsx
      loading.tsx
      _components/
      _utils/
    api/
      mock/
        claim-process/
        ai/
          explain/
          document-analysis/
  components/
    ui/
  config/
  lib/
    openapi.ts
    react-query.ts
    stores/
  orval/
    generated/
    mutator/
```

### Structure rationale

- `src/app/(index)` is the owning domain for the dashboard route.
- `src/app/api/mock/**` contains the mock backend surface exposed to the app and docs.
- `src/components/ui` contains only reusable shadcn primitives.
- `src/lib` contains cross-domain infrastructure and shared runtime utilities.
- `src/orval/generated` is generated code only, kept separate from handwritten application logic.

Within the route domain itself, the structure is also deliberate:

- `_utils/schemas.ts` owns the contract definitions and fixtures
- `_utils/mappers.ts` owns transformation into UI-facing models
- `_utils/registry.tsx` owns rendering metadata
- `_components/steps/*` owns per-step rendering modules
- `claim-process-stepper.tsx` owns the interactive orchestration of the step experience

That keeps behavior close to the route that owns it, while still preserving separation between contracts, transformations, state, and rendering.

## Advanced Patterns Used

The implementation intentionally uses a few patterns that I consider important for a production-grade frontend:

- Contract-first mock architecture: the mock API is documented and consumed like a real backend.
- View-model mapping layer: raw transport data is transformed before it reaches the UI.
- Registry-based polymorphism: heterogeneous process steps are handled without branching sprawl.
- Selective globalization: only truly shared concerns were moved to `src/lib`; everything else remains route-owned.
- Generated client consumption: the UI uses Orval-generated clients and query options rather than duplicating request logic.
- Server/client boundary discipline: server prefetch + hydration for data, client islands for interactive flows.
- Lazy-loaded step panels and tools: the stepper, AI sheet, and document analyzer use dynamic loading and localized skeleton states.

These patterns were chosen to keep the codebase scalable, reviewable, and easy to extend beyond the scope of the case study.

## What I Would Improve With More Time

- Add automated tests around the mapping layer, stepper navigation, and dynamic insert flows.
- Add persistence rules for locally inserted notes and attachments if those become real backend features.
- Strengthen the mobile stepper interaction even further with gesture affordances and more compact progressive disclosure.
- Add contract regression checks so OpenAPI, Zod schemas, and generated clients stay in sync automatically in CI.
- Introduce visual regression coverage for the dashboard states and step variants.
