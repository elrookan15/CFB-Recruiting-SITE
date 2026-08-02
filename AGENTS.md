# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Gridiron Gateway is a **single Node/TypeScript service**. `server.ts` (an Express app run via `tsx`) serves a React 19 + Vite SPA using Vite in **middleware mode**, and also hosts the JSON API. Everything — the SPA and all `/api/*` routes — runs on **port 3000** (there is no separate Vite dev port). The frontend lives in `src/` and uses mock data from `src/data/mockData.ts`. There is no external database: the NCAA compliance gate (`src/complianceEngine.ts`) keeps its `recruiting_periods` / `messages` / `message_send_attempts` data in **in-memory server-side stores** that reset on restart.

### Commands (defined in `package.json`)
- Dev server: `npm run dev` (runs `tsx server.ts`, serves on http://0.0.0.0:3000).
- Lint / typecheck: `npm run lint` (runs `tsc --noEmit`; this is the only "lint").
- Production build: `npm run build` (Vite build of the SPA + esbuild bundle of the server into `dist/`).
- Run production build: `npm start` (`node dist/server.cjs`, expects `NODE_ENV=production`).

Tests: the root `npm test` script is a placeholder (`echo "No tests defined"`). The real automated coverage is the **compliance suite** in `src/complianceTestSuite.ts`, executed server-side by `POST /api/compliance/run-tests` (returns per-test PASS/FAIL for the fail-closed, server-independence, and positive-path cases). Run it against the dev server, e.g. `curl -X POST http://localhost:3000/api/compliance/run-tests`.

### Non-obvious caveats
- **Lockfile present.** `package-lock.json` is committed, so use `npm ci` (or `npm install`) to install dependencies.
- **Gemini API key is optional for most of the app.** Only the two AI endpoints — `POST /api/ai/draft-email` and `POST /api/ai/scout-evaluation` (used by the "AI Pitcher" / AI Recruiting Assistant tab) — require `GEMINI_API_KEY`. Without it the server still starts and every other feature works; those two endpoints return HTTP 500 `"GEMINI_API_KEY environment variable is missing."`. Provide it via a gitignored `.env` file (see `.env.example`) or an env var. Note the code targets model `gemini-3.6-flash`.
- **HMR toggle:** setting `DISABLE_HMR=true` disables Vite HMR and file watching (used in AI Studio to avoid flicker during agent edits). Default dev has HMR on.
- **NCAA compliance gate:** `POST /api/messages/send` re-derives the allow/block decision server-side on every call (fail-closed) and ignores any client-supplied compliance claims; `GET /api/compliance/status` is the read-only pre-check. Supporting endpoints: `GET /api/compliance/recruiting-periods`, `GET /api/compliance/audit-logs`, `POST /api/compliance/run-tests`. Boundaries are inclusive (`now >= start && now <= end`).
- **Onboarding Wizard:** the "Profile Builder" wizard now accepts both prop conventions (`initialProfile`/`onComplete`/`onClose` and `profile`/`onSaveProfile`/`onNavigateToProfile`) via a dual-prop shim in `src/components/OnboardingWizard.tsx`, so it renders and completes correctly. (It previously crashed to a white screen from a prop-name mismatch; that is fixed.)
