# AI-Powered Claim Orchestrator

> Important: Regarding the case study has a 2-hour duration rule. I spent some initial time setting up the codebase and workspace so I could be comfortable working in the environment I am used to. To reflect the actual timed case work, my timestamp starts from the commit where I began implementation: [aed5c6c
](https://github.com/mustafazeydani/miox-case-study/commit/aed5c6c19da7385c90c533fb5be56d00c5269d0b).

## What This Solves

The home route is implemented as a premium enterprise claim dashboard that answers the 3 key case-study questions immediately:

- What is the current status?
- How much time is left?
- What action is required right now?

The supporting public routes remain available:

- `/api/mock/claim-process`
- `/openapi.json`
- `/reference`

There is also a persistent floating button at the bottom-right of the dashboard that links directly to the Scalar documentation page at `/reference`.

## Design Direction

The UI intentionally avoids a generic dashboard treatment. The visual direction uses a warm light surface, editorial heading moments, and a slightly more premium control panel feel instead of a flat utility layout.

- Typography: `Manrope` for interface copy and `Fraunces` for display moments.
- Layout: mobile-first stack that expands into a desktop two-column shell with a sticky action rail.
- Visual system: soft glass cards, warm neutrals, teal progress accents, amber in-progress states, and red deduction blockers.
- Navigation support: a skip link, route-level loading state, keyboard-safe overlays, and extra bottom spacing so the floating docs CTA does not obscure controls.

## Architecture Decisions

The implementation follows the route-local domain structure requested for the case study.

- `src/app/(index)` owns the dashboard route.
- `src/app/(index)/_components` contains page-specific UI.
- `src/app/(index)/_utils` contains schemas, mappers, registry logic, AI simulators, and local state helpers.
- Orval-generated API code remains in `src/orval` instead of being re-grouped per domain.

The route is now split along server/client boundaries intentionally:

- The page and dashboard shell are server-rendered.
- The interactive timeline is the main client island.
- React Query is still prefetched and hydrated at the route boundary.
- Route-level `loading.tsx` provides the polished skeleton state without forcing the whole page into the client bundle.

## Registry Pattern

Every API process node is mapped into a route-local `ClaimDashboardApiNode` and rendered through a registry in `src/app/(index)/_utils/registry.tsx`.

That registry controls:

- labels and descriptions
- iconography and accent treatment
- spotlight and metric fields
- AI explanation labels
- whether a node supports the simulated document analyzer

This keeps the timeline extensible without growing a large `switch` or `if/else` tree in the UI layer.

## Dynamic Timeline Features

The dashboard supports local-only timeline augmentation between steps and after the final step.

- Users can insert `Information Note` nodes.
- Users can insert `Additional Attachment` nodes.
- Inserted nodes are stored in Zustand and rendered inline in the timeline.
- These nodes are intentionally not persisted to the backend because the case-study API is mock-only.

## AI Simulation

The AI layer is deliberately simulated but structured to feel production-ready.

- Every API-backed timeline step has an `Explain with AI` action.
- Explanations open in a shadcn `Sheet`.
- Results are deterministic and generated from the node kind, status, registry metadata, and current field values.
- The deduction step includes a simulated occupational certificate analyzer.
- Document analysis returns `accepted`, `warning`, or `rejected` states based on local filename and extension heuristics.

This means the experience demonstrates interaction design and orchestration without pretending that an external model or backend classifier is actually integrated.

## shadcn/ui Usage

The dashboard primitives were refactored to use shadcn components rather than hand-rolled shells.

- `Card`, `Badge`, `Alert`, `Empty`, `Skeleton`
- `Field`, `Input`, `Textarea`, `ToggleGroup`
- `Sheet` for the AI explanation panel
- existing `Button` variants for all actions

Components were added through the shadcn CLI and adapted to the current project structure and linting rules.

## Validation

The implementation was verified repeatedly with:

- `pnpm check-types`
- `pnpm lint`
- `pnpm build`

The final result keeps `/`, `/api/mock/claim-process`, `/openapi.json`, and `/reference` working.

## Commit Strategy

The work was intentionally delivered in reviewable milestones:

1. `chore(case-study): stabilize baseline and dashboard foundation`
2. `feat(claims): prefetch and hydrate claim dashboard data`
3. `feat(claims): build the responsive dashboard shell`
4. `feat(claims): render claim steps with a registry pattern`
5. `feat(claims): support dynamic note and attachment nodes`
6. `feat(ai): add simulated AI assistant and document analysis`
7. `fix(claims): harden UX, accessibility, and performance`
8. `docs(readme): document the case-study solution`

The repository’s Husky hook also auto-bumps `package.json` after `feat` and `fix` commits, so version changes in the history are expected.

## AI Tools Used

- OpenAI Codex for implementation, refactoring, and commit-by-commit delivery
- shadcn CLI and component docs for UI primitives and composition patterns

## What I Would Improve Next

- Persist local note and attachment insertions behind a real API.
- Replace the simulated AI and document heuristics with actual services.
- Add Playwright coverage for the happy path, mobile layout, and keyboard navigation.
- Add dedicated accessibility and interaction regression checks for the floating docs CTA and the AI sheet flows.
