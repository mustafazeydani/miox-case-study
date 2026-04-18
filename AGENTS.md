<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Local Skills

Each local skill should live at `.agents/skills/<skill-name>/SKILL.md`. Keep supporting files optional and add them only when the skill actually needs `scripts/`, `references/`, or `assets/`.

Use the smallest relevant set of skills from `.agents/skills`, and combine them only when the task clearly spans multiple areas.

- `accessibility`: Use for WCAG reviews, keyboard navigation, screen reader support, focus states, contrast, and general a11y fixes.
- `domain-project-structure`: Use when creating or refactoring pages and route segments so each page follows the domain-first pattern with local `_components` and `_utils` folders.
- `frontend-design`: Use when building or restyling UI and the task needs strong visual design, layout, polish, or a more distinctive frontend result.
- `next-best-practices`: Use when writing or reviewing Next.js code, especially file conventions, App Router structure, async APIs, metadata, route handlers, and RSC boundaries.
- `next-cache-components`: Use when working on Next.js Cache Components, Partial Prerendering, `use cache`, cache lifetimes, tags, or invalidation.
- `next-upgrade`: Use when upgrading Next.js versions, applying migration guidance, or running codemods for breaking changes.
- `shadcn`: Use when adding, searching, debugging, customizing, or composing shadcn/ui components, registries, presets, or `components.json`-based setups.
- `tailwind-css-patterns`: Use when styling with Tailwind CSS, building responsive layouts, or choosing utility patterns for spacing, grid, typography, and component styling.
- `tailwind-v4-shadcn`: Use when setting up or debugging Tailwind CSS v4 with shadcn/ui, especially theming, dark mode, CSS variables, and migration issues.
- `typescript-advanced-types`: Use when implementing complex TypeScript types, generics, conditional types, mapped types, or reusable type utilities.
- `vercel-composition-patterns`: Use when component APIs are getting rigid and the task calls for compound components, render props, context, or better composition patterns.
- `vercel-react-best-practices`: Use when optimizing React or Next.js code for performance, rendering behavior, bundle size, data fetching, or rerender patterns.
