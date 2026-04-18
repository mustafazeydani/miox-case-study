---
name: domain-project-structure
description: Structure Next.js routes in a domain-first, page-local way. Use when creating, refactoring, or reviewing pages and route segments so each page keeps its own `_components` and `_utils` folders, with route-specific `types.ts`, `helpers.ts`, and related utilities colocated instead of moved into global shared folders.
---

# Domain Project Structure

## Overview

Organize code by the route or domain that owns it. Keep page-specific components and utilities next to the page, and promote code to shared folders only when it is genuinely reused across domains.

## Route Layout

For every page folder, create these files and folders:

```text
src/app/<route>/
  page.tsx
  _components/
  _utils/
```

Use `_components/` for components that belong to that route or domain.

Use `_utils/` for route-local support files such as:

- `types.ts`
- `helpers.ts`
- `constants.ts`
- `mappers.ts`
- `schemas.ts`
- `queries.ts`

Example:

```text
src/app/claims/[claimId]/
  page.tsx
  _components/
    claim-header.tsx
    claim-progress.tsx
    claim-summary-card.tsx
  _utils/
    helpers.ts
    types.ts
```

## Placement Rules

- Keep `page.tsx` thin. Let it fetch, compose, and hand off rendering to files in `_components/`.
- Put code used by only one route in that route's `_components/` or `_utils/`.
- Put code shared by sibling pages in the nearest parent route segment that owns those siblings.
- Keep only truly cross-domain or app-wide code in global folders such as `src/components/ui`, `src/components/providers`, `src/lib`, and `src/config`.
- Keep generated code and infrastructure code where they already belong, such as `src/orval/**`.
- Do not import from another route's private folders when a shared parent folder or global shared module is the better owner.

## Decision Guide

Use this rule of thumb before placing a file:

- One page or one route owns it: keep it local.
- Several pages in one domain own it: move it to the nearest shared route segment.
- Multiple unrelated domains own it: promote it to a shared global folder.

## Working Conventions

- Create both `_components/` and `_utils/` when adding a new page folder, even if one starts nearly empty.
- Prefer descriptive file names in `_components/` and reserve generic names like `types.ts` or `helpers.ts` for `_utils/`.
- Keep types, helpers, and mappers close to the route that uses them unless there is clear cross-domain reuse.
- Prefer imports within the owning domain over reaching into unrelated routes.
- When refactoring existing code out of `src/components` or `src/lib`, move it to the owning route if the usage is page-specific.

## Refactor Workflow

When organizing or cleaning up a route:

1. Identify the route or domain that owns the code.
2. Create or confirm `_components/` and `_utils/` in that route folder.
3. Move route-specific UI into `_components/`.
4. Move route-specific types, helpers, constants, and similar support code into `_utils/`.
5. Leave only truly shared code in global folders.
6. Update imports so the route reads as a self-contained domain.
