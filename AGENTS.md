# Agent Notes

## Stack + Boundaries

- Single-package Next.js 16 + Payload CMS 3 app (not a monorepo); use `pnpm` (lockfile is `pnpm-lock.yaml`).
- Main wiring lives in `src/payload.config.ts` (collections/globals/locales/db); register new collections/globals there or they will not exist.
- Frontend lives under `src/app/(frontend)/[locale]/...`; admin/API live under `src/app/(payload)/...`.
- Locale middleware is `src/proxy.ts`; it applies to non-admin/non-API routes only.

## Generated / Do-Not-Edit Files

- Do not hand-edit Payload-generated app files in `src/app/(payload)/...` (`layout.tsx`, admin page, API route) - they state they may be overwritten.
- Do not hand-edit `src/payload-types.ts`; regenerate it.
- If you add/change custom admin components referenced via `components: { ... }` in schema fields, run `pnpm generate:importmap` to refresh `src/app/(payload)/admin/importMap.js`.

## Commands That Matter

- Install + dev: `pnpm install`, then `pnpm dev`.
- Lint: `pnpm lint`.
- Typecheck: `pnpm exec tsc --noEmit` (no script exists for this).
- Payload codegen: `pnpm generate:types` and `pnpm generate:importmap`.
- Tests: `pnpm test:int` (Vitest), `pnpm test:e2e` (Playwright), `pnpm test` runs both in order.

## Focused Test Runs

- Single integration spec: `pnpm vitest run tests/int/api.int.spec.ts --config ./vitest.config.mts`.
- Single e2e spec: `pnpm playwright test tests/e2e/admin.e2e.spec.ts --config playwright.config.ts --project=chromium`.

## Env + Runtime Prereqs

- Required env vars are in `.env.example`: `DATABASE_URL`, `PAYLOAD_SECRET`.
- Integration and e2e tests use real Payload DB access (`getPayload`), so Mongo must be reachable at `DATABASE_URL`.
- Playwright config starts web server via `pnpm dev` at `http://localhost:3000`.

## Repo-Specific Gotchas

- `tests/e2e/frontend.e2e.spec.ts` still asserts template title/content (`Payload Blank Template` / `Welcome to your new project.`); update it when homepage copy changes.
- In Payload local API calls where you pass `user`, set `overrideAccess: false` explicitly to avoid silent access bypass.
- In hooks, pass `req` into nested `req.payload.*` operations to keep transaction context.
