# AI Claim Orchestrator Setup

This repo now includes the case-study API plumbing with:

- Next.js App Router
- One mock route at `/api/mock/claim-process`
- One generated OpenAPI document at `/openapi.json`
- One Scalar reference page at `/reference`

The OpenAPI document is generated from Zod schemas via [`zod-openapi`](https://www.npmjs.com/package/zod-openapi), and the mock route validates the returned payload against the same schema before responding.

## Getting Started

```bash
pnpm dev
```

Open `http://localhost:3000` to see the landing page, then inspect:

- `http://localhost:3000/api/mock/claim-process`
- `http://localhost:3000/openapi.json`
- `http://localhost:3000/reference`

## Notes

- The mock data mirrors the JSON embedded in the provided case study.
- The response and documentation share the same source of truth in [src/lib/claim-process.ts](/C:/Users/musta/Desktop/projects/miox-case-study/src/lib/claim-process.ts).
- Scalar is mounted through the App Router using `@scalar/nextjs-api-reference`.

## Scripts

- `pnpm dev` runs the local Next.js app
- `pnpm lint` runs Biome
- `pnpm check-types` runs the TypeScript check helper
- `pnpm build` verifies the production build
