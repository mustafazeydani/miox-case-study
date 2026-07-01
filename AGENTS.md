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

<!-- BEGIN:codex-shared-skill-usage -->
## Shared Codex Skill Usage

This section supplements any repository-specific guidance in this file. AGENTS.md is treated as a README for automated coding agents: read it before editing, use the nearest nested AGENTS.md when one exists, and keep instructions local to the files you touch.

### Skill Selection Rules

- If the user names a skill, use that skill for the turn and read its `SKILL.md` before taking action.
- Prefer the most specific applicable skill. Repository-local `.agents/skills` beat global skills; framework-specific skills beat broad language skills.
- Use one primary skill first. Add another only when the task genuinely spans multiple domains.
- Setup, installer, migration, and creator skills are for those workflows only; do not use them for routine feature work.
- If a skill source is missing or cannot be read, say so briefly and continue with the best available approach.

### Project-Local Skills

These skills live under `.agents/skills`. Use them before the global catalog when they match the task:

- `accessibility`: use when its local description matches the task: Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigatio... Read `.agents/skills/accessibility/SKILL.md` fully before acting.
- `domain-project-structure`: use when its local description matches the task: Structure Next.js routes in a domain-first, page-local way. Use when creating, refactoring, or reviewing pages and route segments so each page keeps its own `_components` and `_utils` fol... Read `.agents/skills/domain-project-structure/SKILL.md` fully before acting.
- `frontend-design`: use when its local description matches the task: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (e... Read `.agents/skills/frontend-design/SKILL.md` fully before acting.
- `next-best-practices`: use when its local description matches the task: Next.js best practices - file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization, bundling Read `.agents/skills/next-best-practices/SKILL.md` fully before acting.
- `next-cache-components`: use when its local description matches the task: Next.js 16 Cache Components - PPR, use cache directive, cacheLife, cacheTag, updateTag Read `.agents/skills/next-cache-components/SKILL.md` fully before acting.
- `next-upgrade`: use when its local description matches the task: Upgrade Next.js to the latest version following official migration guides and codemods Read `.agents/skills/next-upgrade/SKILL.md` fully before acting.
- `shadcn`: use when its local description matches the task: Manages shadcn components and projects - adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when workin... Read `.agents/skills/shadcn/SKILL.md` fully before acting.
- `tailwind-css-patterns`: use when its local description matches the task: Provides comprehensive Tailwind CSS utility-first styling patterns including responsive design, layout utilities, flexbox, grid, spacing, typography, colors, and modern CSS best practices... Read `.agents/skills/tailwind-css-patterns/SKILL.md` fully before acting.
- `tailwind-v4-shadcn`: use when its local description matches the task: Production-tested setup for Tailwind CSS v4 with shadcn/ui, Vite, and React. Use when: initializing React projects with Tailwind v4, setting up shadcn/ui, implementing dark mode, debuggin... Read `.agents/skills/tailwind-v4-shadcn/SKILL.md` fully before acting.
- `typescript-advanced-types`: use when its local description matches the task: Master TypeScript's advanced type system including generics, conditional types, mapped types, template literals, and utility types for building type-safe applications. Use when implementi... Read `.agents/skills/typescript-advanced-types/SKILL.md` fully before acting.
- `vercel-composition-patterns`: use when its local description matches the task: React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries, or designing reusable APIs. Triggers on task... Read `.agents/skills/vercel-composition-patterns/SKILL.md` fully before acting.
- `vercel-react-best-practices`: use when its local description matches the task: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal perfo... Read `.agents/skills/vercel-react-best-practices/SKILL.md` fully before acting.

### Global Skills

- `imagegen`: use for generating or editing raster images, illustrations, textures, sprites, mockups, and transparent-background bitmap assets. Do not use for repo-native SVGs, icons, CSS, or code-built visuals.
- `openai-docs`: use for current OpenAI API, model, SDK, product, migration, or prompt-upgrade questions. Use official OpenAI sources and cite them when answering.
- `plugin-creator`: use when creating or scaffolding a Codex plugin, including `.codex-plugin/plugin.json`, plugin folders, and marketplace metadata.
- `skill-creator`: use when creating or updating a Codex skill with a `SKILL.md`, workflow guidance, references, scripts, or assets.
- `skill-installer`: use when listing curated skills or installing a skill into `$CODEX_HOME/skills` from a curated source or GitHub repo.
- `browser:browser`: use for in-app browser automation, local app testing, screenshots, UI inspection, clicking, typing, or verifying localhost and web pages.
- `documents:documents`: use for creating, editing, redlining, or verifying `.docx`, Word, or Google Docs-targeted documents. Render and visually verify before delivery.
- `find-skills`: use when the user asks whether a skill exists, asks how to extend capabilities, or wants to discover/install a skill for a task.
- `presentations:Presentations`: use for creating or editing PowerPoint `.pptx` decks, slide layouts, speaker notes, and presentation artifacts.
- `spreadsheets:Spreadsheets`: use for `.xlsx`, `.xls`, `.csv`, `.tsv`, or Google Sheets-targeted work involving formulas, formatting, charts, tables, cleanup, or analysis.
<!-- END:codex-shared-skill-usage -->
