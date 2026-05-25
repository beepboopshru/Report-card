# ScienceUtsav Report Card

A Vite + React + Convex web app for scoring students against per-kit rubrics
for all C-STEM kits and producing PDF report cards.

## Roles

- **Admin** — email is in `ADMIN_EMAILS` (set via `npx convex env set`).
  Admins can manage kit assignments per teacher and edit any rubric.
- **Teacher** — anyone who signs up via `/sign-up`. Teachers can create
  classes, attach kits the admin has assigned them, add students, score
  them, and download report cards.

## First-time setup

```powershell
npm install
npx convex dev --once
npx convex env set ADMIN_EMAILS "you@example.com"
npm run parse-kits           # PDF → data/kits.json (already committed)
npm run generate-rubrics     # → convex/seed/*.ts (already committed)
```

After the schema is deployed and you've signed in as the admin email,
visit `/admin/seed` and click **Run seed** once to insert all 157 kits and
their generated rubrics. Re-running is safe — it never overwrites edited
rubrics.

## Daily dev

Two shells:

```powershell
npm run dev          # Vite on http://localhost:5173
npx convex dev       # Convex local dev server
```

## Workflow

1. Sign in as admin → `/admin` → pick a teacher → assign kits.
2. Sign in as the teacher → `/` → create a class → add students.
3. Open class → **Manage curriculum** → pick the kits this class will do.
4. From class detail, click any **Score <kit>** chip on a student row.
5. Score 6 criteria (1–4 each, max 24). Saves are debounced and live.
6. Per-student report at `/class/:id/students/:studentId/report` — has a
   **Download PDF** button.
7. Whole-class report at `/class/:id/report` — **Download all (PDF)**
   produces one file with one page per student.

## Rubric structure

Every kit has 6 criteria, each scored 1–4 (total 24):

1. Following instructions
2. Construction quality
3. Safety & material care
4. Concept understanding — *kit's concept*
5. Scientific observation (Explorer) or exploration (Discoverer) — *kit's name*
6. Communicating findings

Criteria 4 and 5 are generated from each kit's metadata; the others are
universal. Admins can edit any criterion at `/admin/rubrics/:kitId`.

## Tests

```powershell
npm run test
```

Covers the rubric seed shape and the score-totals math.

## Tech stack

- Vite 8 + React 19 + TypeScript
- React Router 7
- Tailwind CSS 4
- Convex + `@convex-dev/auth` (Password provider)
- `@react-pdf/renderer` for client-side PDFs
- Vitest + Testing Library

## Deployment

Out of scope for v1. The natural target is Vercel (frontend) + Convex's
hosted backend.
