# Rules for any coding agent working in this repo

Gide, Claude, Cursor, Copilot: read this before you change anything.

## What this app is
A Next.js 16 app with four safety layers. Keep all four, whatever the app turns into.

1. **Sign-in** (Better Auth, `lib/auth.ts`, `lib/session.ts`). Every API route checks `getSession()` first and returns 401 without it.
2. **Row rules** (Postgres row-level security, `scripts/setup-db.mjs`). Every table that holds user data has a `user_id` column, `enable row level security`, an "own rows only" policy, and grants for `app_user`. All app queries go through `asUser()` in `lib/db.ts`. Never query user data with the raw `pool`.
3. **The AI route** (`app/api/plan/route.ts`). The model is called only on the server with `generateText` from `ai` and a plain AI Gateway model id. The key never reaches the browser.
4. **The guardrail** (`lib/guardrail.ts`). `checkInput` runs before the model, `checkOutput` runs after. Add checks; never delete or loosen existing ones.

## How to work
- **Show a plan and wait for OK** before editing files, adding packages, or running commands that change the database.
- **Secrets:** keys go in `.env.local` only. Never ask the user to paste a key into chat, never print one, never write one into code or a commit.
- **Data:** made-up data only. Use the files in `data/`. If the user's own idea needs data, create a new fake CSV in `data/` first. No real names, emails, phone numbers, addresses, or ID numbers.
- **New tables:** copy the `suggestions` pattern in `scripts/setup-db.mjs` exactly (user_id default, index, grants to `app_user`, enable RLS, "own rows only" policy with both `using` and `with check`). Use `create table if not exists` and `add column if not exists` so `npm run db:setup` stays safe to re-run and never wipes data.
- **New routes:** session check, then `checkInput`, then the model, then `checkOutput`, then save with `asUser`. Copy `app/api/plan/route.ts`.
- **Tests:** when you add a table, add it to `scripts/rls-test.mjs` (user B cannot read, change, or delete user A's rows). When you add a guardrail check, add an input that used to slip through and is now blocked.

## Done means
Run these and show the output:
```bash
npm run typecheck
npm run test:rls
```
Then make one real request in the browser and confirm it works signed in, and fails signed out.

## Project briefs
Each build has a full brief in `projects/`. If the user names a build, read its brief first and follow it.
