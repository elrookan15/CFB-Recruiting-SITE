# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Gridiron Gateway is a **single Node/TypeScript service**. `server.ts` (an Express app run via `tsx`) serves a React 19 + Vite SPA using Vite in **middleware mode**, and also hosts the JSON API. Everything — the SPA and all `/api/*` routes — runs on **port 3000** (there is no separate Vite dev port). The frontend lives in `src/` and uses mock data from `src/data/mockData.ts`; there is no database.

### Commands (defined in `package.json`)
- Dev server: `npm run dev` (runs `tsx server.ts`, serves on http://0.0.0.0:3000).
- Lint / typecheck: `npm run lint` (runs `tsc --noEmit`; this is the only "lint").
- Production build: `npm run build` (Vite build of the SPA + esbuild bundle of the server into `dist/`).
- Run production build: `npm start` (`node dist/server.cjs`, expects `NODE_ENV=production`).

There is no automated test suite in this repo.

### Non-obvious caveats
- **No lockfile.** Dependencies are installed with `npm install` against the version ranges in `package.json`.
- **Gemini API key is optional for most of the app.** Only the two AI endpoints — `POST /api/ai/draft-email` and `POST /api/ai/scout-evaluation` (used by the "AI Pitcher" / AI Recruiting Assistant tab) — require `GEMINI_API_KEY`. Without it the server still starts and every other feature works; those two endpoints return HTTP 500 `"GEMINI_API_KEY environment variable is missing."`. Provide it via a gitignored `.env` file (see `.env.example`) or an env var. Note the code targets model `gemini-3.6-flash`.
- **HMR toggle:** setting `DISABLE_HMR=true` disables Vite HMR and file watching (used in AI Studio to avoid flicker during agent edits). Default dev has HMR on.
- **Pre-existing app bug (not an environment issue):** the Onboarding Wizard ("Profile Builder" tab / "Edit Profile" / footer "25-30 Question Profile Builder") crashes to a white screen. Cause is a prop-name mismatch between `src/App.tsx` (passes `initialProfile` / `onComplete` / `onClose`) and `src/components/OnboardingWizard.tsx` (expects `profile` / `onSaveProfile` / `onNavigateToProfile`). All other tabs (Top 250 leaderboard, Camps, Coaches, Messaging, etc.) work — prefer those for smoke tests until the wizard is fixed.
