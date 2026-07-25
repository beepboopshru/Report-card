# Student accounts + LMS assignment — design

Date: 2026-07-25. Branch: `feat/student-lms` (off `feat/grade-sheet-import`).

## Goal

Complete the workflow: admin creates teacher ("school") logins (already exists) →
teacher uploads a class list → admin/manager approves the class, which generates a
login account for every student → teacher downloads the credential list → admin
assigns LMS level(s) to the class → students sign in and see only their assigned
LMS levels. Admin also gets a classes overview with per-class numbers.

## Context

- Auth: `@convex-dev/auth` Password provider, username-as-email. `convex/admin.ts`
  already does `createAccount` for teachers — same pattern reused for students.
- Roles today: `admin` (= the "manager"), `teacher`. New: `student`.
- LMS: https://github.com/Prem-things/SU_LMS_ROBOTICS — a static SPA with two
  levels (Level 1 "Creative Automation" classes 4–7, Level 2 "Sensational Sensors"
  classes 6–9), 10 sessions each, hash-based navigation, **no auth and no deep
  links**. GitHub Pages is currently NOT enabled (404 at
  prem-things.github.io/SU_LMS_ROBOTICS) — the site URL lives in one constant.
- Existing import precedent (AdminGrades): export `.xlsx` via `write-excel-file`,
  import filled-in `.csv` via `src/lib/csv.ts`. Class list upload follows the same
  pattern.

## Decisions / assumptions (made autonomously — flag if wrong)

1. **Manager = existing `admin` role.** No fourth role.
2. **Student usernames**: `<student-name-slug>.<class-name-slug>`, lowercased,
   `[a-z0-9.-]`, truncated to fit 32 chars, numeric suffix on collision
   (e.g. `ravi.class-4a`, `ravi.class-4a2`). Class name stands in for
   "school/class" since the teacher account is the school login.
3. **Initial passwords are stored in plaintext on the student doc** so teachers can
   re-download the credential sheet any time. Deliberate tradeoff for a school
   workflow; exposed only through teacher/admin-gated functions. Password resets
   overwrite it.
4. **Class lifecycle**: `undefined` (draft) → `submitted` (teacher clicks "Submit
   for approval") → `approved` (admin generates accounts). Approval is idempotent —
   students added later can be provisioned by re-approving.
5. **LMS assignment is per class** (not per teacher). Assigning to a teacher =
   assigning to each of their classes. Skipped teacher-level assignment (YAGNI).
6. **Students see link cards** to the LMS site for their assigned level(s). The LMS
   is a public static site with no per-level URLs, so assignment controls what the
   student is shown, not hard access. Real gating would require changes in the LMS
   repo — out of scope.

## Schema changes

- `profiles.role`: add `"student"`; add optional `studentId: v.id("students")`.
- `students`: add optional `userId`, `username`, `initialPassword` (set on approval).
- `classes`: add optional `status: "submitted" | "approved"`.
- New table `classLevels { classId, levelId: string }`, index `by_class`.

## Backend (Convex)

- `src/lib/lmsCatalog.ts` (shared, imported by convex too): `LMS_BASE_URL`,
  `LMS_LEVELS = [{id, name, classes}]`.
- `convex/lib/studentUsername.ts`: pure `buildStudentUsername(name, className)` slug
  helper (unit-tested).
- `students.bulkCreate` mutation: `{classId, rows: [{name, rollNo?}]}`,
  `requireOwnsClass`, ≤200 rows, skips exact-duplicate names already in class.
- `classes.submitForApproval` mutation: owner only, draft→submitted.
- `classes.listAllForAdmin`: also return `studentCount`, `status`, `levelIds`,
  `avgScorePct` (numbers for the admin overview).
- `enrollment.ts` (new): `approveClass` action (admin) — for each student without an
  account: build username (dedupe against `profiles.by_username`), generate
  password, `createAccount`, insert student profile, patch student doc; then mark
  class approved. `resetStudentPassword` action (teacher-owns-class or admin).
- `students.credentialsForClass` query: `requireOwnsClass` →
  `[{name, rollNo, username, initialPassword}]`.
- `lms.ts` (new): `setClassLevels` mutation (admin, replace-all), `classLevels`
  query (owner/admin), `myLms` query (student → own class → levels + class name).

## Frontend

- **Teacher — ClassDetail**: "Download sample sheet" (`.xlsx`: Name, Roll No +
  example rows), "Import class list" (`.csv` upload → `bulkCreate`), status badge,
  "Submit for approval" button, and once approved "Download credentials" (`.csv`
  of name/username/password).
- **Admin — new `/admin/classes` page**: table of all classes — teacher, student
  count, avg score, status, LMS level checkboxes, Approve button, link to the
  existing class report (admins pass `requireOwnsClass`). This is the
  "view other classes, trends and numbers" surface.
- **Student — new `/lms` page** under a `StudentRoute`: greeting, class name, one
  card per assigned level linking to the LMS site (new tab). Students hitting `/`
  are redirected to `/lms`; non-students hitting `/lms` are redirected to `/`.

## Testing

- Unit: `buildStudentUsername` (slugging, truncation, collisions handled by caller
  loop), class-list CSV row parsing, credentials CSV formatting.
- `npm test`, `tsc -b`, `eslint` must pass.

## Out of scope

- Modifying the SU_LMS_ROBOTICS repo (enable Pages, add auth/deep links).
- Per-session progress tracking inside the LMS.
- Email delivery of credentials.
