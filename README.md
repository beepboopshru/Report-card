# ScienceUtsav Report Card

A Vite + React + Convex web app for scoring students against per-kit rubrics
for all C-STEM kits and producing PDF report cards.

## Roles

- **Admin** — a profile with `role: "admin"`. Admins manage kit
  assignments per teacher, edit any rubric, and provision teacher
  accounts (see "Teacher accounts" below). The first admin is
  promoted manually in the Convex dashboard (`profiles` table → set
  `role` to `"admin"`).
- **Teacher** — provisioned by an admin from the dashboard. Teachers
  can create classes, attach kits the admin has assigned them, add
  students, score them, and download report cards.

## First-time setup

```powershell
npm install
npx convex dev --once
npm run parse-kits           # PDF → data/kits.json (already committed)
npm run generate-rubrics     # → convex/seed/*.ts (already committed)
```

After the schema is deployed, manually create the first profile in
the Convex dashboard: insert a row into `profiles` with your `userId`
(from the `users` table), a `username` (3–32 chars, lowercase letters
/ digits / `.` / `_` / `-`), a `displayName`, and `role: "admin"`.
Then sign in at `/sign-in`, visit `/admin/seed`, and click **Run seed**
once to insert all 157 kits and their generated rubrics. Re-running
is safe — it never overwrites edited rubrics.

## Teacher accounts

Teachers do not sign up themselves; there is no `/sign-up` page. From
the admin dashboard (`/admin`):

- **Create teacher** — enter a username and display name. The admin
  receives a one-time copyable bundle (URL, username, generated
  password, usage instructions) to share with the teacher.
- **Reset** — generates a new password and shows the same bundle.
  The teacher's active sessions are signed out.
- **Disable / Enable** — revokes or restores access without deleting
  the account. Disabled teachers cannot sign in or run any query.

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
