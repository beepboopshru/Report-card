---
title: Student Report Card App — Design
date: 2026-05-24
status: approved-for-planning
---

# Student Report Card App

A web app for ScienceUtsav teachers to score students against per-kit rubrics
and produce printable PDF report cards.

## 1. Goal

Replace ad-hoc paper rubrics with a single tool where:

- An **admin** decides which of the 159 C-STEM kits each teacher is allowed to teach.
- A **teacher** manages her classes, attaches a curriculum (a subset of her assigned
  kits) to each class, and scores every student against each kit's rubric.
- Teachers can download per-student and whole-class PDF report cards.

Out of scope for v1: attendance tracking, multi-school/tenant support,
parent logins, deployment automation, score history (a re-score overwrites).

## 2. Users & roles

| Role | How granted | Powers |
|------|-------------|--------|
| Admin | Email matches the `ADMIN_EMAILS` env var | Assign kits to teachers; edit any rubric; view all data |
| Teacher | Anyone who signs up via the public form | Manage own classes/students; score students on assigned kits; print reports |

No further user management UI in v1.

## 3. Domain model

The unit of work is **`scores`**: one row per `(student, kit)`. There is no
session, no history, no attendance. Re-scoring overwrites.

```
admin ──assigns──> kits ──taught by──> teacher
                    │
teacher ──creates──> classes ──has many──> students
   │                   │
   │                   └──curriculum──> kits (subset of teacher's assigned kits)
   │
   └──fills out──> scores (per student × per kit in class curriculum)
                       │
                       └──compiled into──> report card PDFs
```

## 4. Tech stack

- **Vite + React 18 + TypeScript** with **React Router v6**
- **Tailwind CSS v4** (palette mirrors `ScienceUtsav_Rubric.html`: green/lime/amber/red)
- **Convex** for database, queries, mutations
- **`@convex-dev/auth`** with the **Password** provider
- **`@react-pdf/renderer`** for client-side PDF generation (no Puppeteer, no server)
- **Node script** for one-off rubric seeding

No deployment automation in v1. README documents `npm run dev` + `npx convex dev`.

## 5. Schema

```ts
// convex/schema.ts
defineSchema({
  ...authTables,

  profiles: defineTable({
    userId: v.id("users"),
    email: v.string(),
    displayName: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher")),
  }).index("by_user", ["userId"])
    .index("by_email", ["email"]),

  kits: defineTable({
    kitNumber: v.number(),
    concept: v.string(),
    kitName: v.string(),
    category: v.union(v.literal("Explorer"), v.literal("Discoverer")),
    subject: v.string(),
    grade: v.number(),
    description: v.string(),
  }).index("by_kitNumber", ["kitNumber"])
    .index("by_category", ["category"]),

  rubrics: defineTable({
    kitId: v.id("kits"),
    criteria: v.array(v.object({
      id: v.string(),       // stable slug
      label: v.string(),
      sub: v.string(),
      c4: v.string(),
      c3: v.string(),
      c2: v.string(),
      c1: v.string(),
    })),
  }).index("by_kit", ["kitId"]),

  assignments: defineTable({
    teacherProfileId: v.id("profiles"),
    kitId: v.id("kits"),
  }).index("by_teacher", ["teacherProfileId"])
    .index("by_teacher_kit", ["teacherProfileId", "kitId"]),

  classes: defineTable({
    teacherProfileId: v.id("profiles"),
    name: v.string(),
    grade: v.number(),
    academicYear: v.string(),
  }).index("by_teacher", ["teacherProfileId"]),

  students: defineTable({
    classId: v.id("classes"),
    name: v.string(),
    rollNo: v.optional(v.string()),
  }).index("by_class", ["classId"]),

  classKits: defineTable({
    classId: v.id("classes"),
    kitId: v.id("kits"),
    order: v.number(),
  }).index("by_class", ["classId"])
    .index("by_class_kit", ["classId", "kitId"]),

  scores: defineTable({
    studentId: v.id("students"),
    kitId: v.id("kits"),
    criterionScores: v.record(v.string(), v.number()),  // {criterionId: 1..4}
    observations: v.optional(v.string()),
    scoredByProfileId: v.id("profiles"),
    updatedAt: v.number(),
  }).index("by_student_kit", ["studentId", "kitId"])
    .index("by_student", ["studentId"]),
});
```

### 5.1 Access rules (enforced inside every Convex function)

- A profile is loaded on every request; admin status is decided by checking
  the user's email against the `ADMIN_EMAILS` env var. The result is cached
  on the `profiles` row.
- **Admin** may read everything; may write `assignments`, `kits`, `rubrics`.
- **Teacher** may read/write only rows where ownership chains back to her profile.
  Specifically, `scores.upsert(studentId, kitId, ...)` verifies all three:
  - the class owning `studentId` belongs to the calling teacher,
  - the kit appears in that class's `classKits`,
  - the kit appears in the teacher's `assignments`.
- All public Convex functions (`kits.list`, `rubrics.get`, etc.) require an
  authenticated identity. There are no anonymous endpoints.

## 6. Rubric generation

### 6.1 Source data

The PDF `C-STEM_kits_2026-05-20.pdf` is parsed once (using `pdftotext -layout`)
into `data/kits.json` with shape `{kitNumber, concept, kitName, category,
subject, grade, description}[]`. That JSON is checked in.

### 6.2 Criterion template

Every rubric has exactly 6 criteria in this fixed order:

| # | Criterion | Tier |
|---|-----------|------|
| 1 | Following instructions | Universal |
| 2 | Construction / Build quality | Universal |
| 3 | Safety & material care | Universal |
| 4 | Concept understanding — *[kit's concept]* | Kit-specific |
| 5 | Scientific observation — *[kit-specific phenomenon]* | Kit-specific |
| 6 | Communicating findings | Universal |

The 4 universal criteria share verbatim descriptor text across all 159 kits.
The 2 kit-specific criteria are produced by string-injecting the kit's
concept name (and a short phenomenon noun phrase derived from the description)
into a category-aware template — Explorer phrasing leans toward build/observe,
Discoverer phrasing leans toward explore/explain.

### 6.3 Generator script

`scripts/generate-rubrics.ts`:
1. Reads `data/kits.json`.
2. For each kit, builds 4 universal criteria from a constant template and
   2 kit-specific criteria from the category-aware template.
3. Emits `convex/seed/rubrics.ts` — a typed `RUBRIC_SEED: RubricSeed[]` array.

### 6.4 Seeding into Convex

`convex/seed.ts` exposes a `seedKitsAndRubrics` internal mutation that:
1. Upserts kits from `convex/seed/kits.ts` keyed on `kitNumber + category`.
2. For each seeded kit, inserts a rubric **only if one doesn't already exist**
   for that kit (so admin edits survive re-seed).

Triggered by the admin via a one-time `/admin/seed` button (admin-only,
shown only when `kits` is empty).

## 7. Pages and routes

| Route | Role | Purpose |
|-------|------|---------|
| `/sign-in`, `/sign-up` | public | Email + password |
| `/admin` | admin | Teacher list → assign/unassign kits |
| `/admin/kits` | admin | Browse 159 kits |
| `/admin/rubrics/:kitId` | admin | Edit one kit's rubric |
| `/admin/seed` | admin | One-time seeding |
| `/` | teacher | List of classes + "New class" |
| `/class/:id` | teacher | Students + curriculum tabs |
| `/class/:id/curriculum` | teacher | Pick kits from assigned set |
| `/class/:id/students/:studentId/score/:kitId` | teacher | Rubric scoring sheet |
| `/class/:id/students/:studentId/report` | teacher | Per-student cumulative report + download PDF |
| `/class/:id/report` | teacher | Whole class report; download combined PDF |

## 8. Key interactions

### 8.1 Scoring sheet

Direct visual port of `ScienceUtsav_Rubric.html` styled with Tailwind:
- Header chips: kit name, kit number, category, student name, class
- 6 criterion rows, each with a 4-pill scorer (1–4) and the 4 descriptors
- "Observations" textarea
- Saves are debounced (500 ms) and persisted via `scores.upsert`
- Total = sum of the 6 criterion scores (each 1–4); max = 24. Unscored
  criteria contribute 0 to the running total, and the UI shows
  "N of 6 scored" until all criteria are filled, mirroring the reference design.

### 8.2 PDF report cards

Two `@react-pdf/renderer` templates:
- **`<StudentReportPdf>`** — one PDF, one page per scored kit; each page
  shows the kit's criteria with the chosen descriptor highlighted plus
  observations. Used for "Download report" on a single student.
- **`<ClassReportPdf>`** — one PDF for the whole class; one page per student
  containing a summary table (kit | 6 scores | total). Used for "Download all".

Both render in the browser; no server round trip.

## 9. Repository layout

```
report-card/
├─ package.json, vite.config.ts, tailwind.config.ts, tsconfig.json
├─ data/
│  └─ kits.json
├─ scripts/
│  └─ generate-rubrics.ts
├─ convex/
│  ├─ schema.ts
│  ├─ auth.ts, auth.config.ts
│  ├─ profiles.ts, kits.ts, rubrics.ts, assignments.ts,
│  ├─ classes.ts, students.ts, classKits.ts, scores.ts
│  ├─ seed.ts
│  └─ seed/
│     ├─ kits.ts        (generated)
│     └─ rubrics.ts     (generated)
└─ src/
   ├─ main.tsx, App.tsx
   ├─ lib/  (convexClient.ts, useCurrentProfile.ts, debounce.ts)
   ├─ routes/  (AdminRoute.tsx, TeacherRoute.tsx)
   ├─ pages/  (SignIn, SignUp, AdminDashboard, AdminKits, EditRubric,
   │           TeacherDashboard, ClassDetail, ClassCurriculum,
   │           ScoreSheet, StudentReport, ClassReport, SeedPage)
   ├─ components/  (TopBar, Breadcrumbs, ScoreRow, KitPicker,
   │                StudentReportPdf, ClassReportPdf, EmptyState)
   └─ styles.css
```

## 10. Open questions / accepted tradeoffs

- **No attendance.** Originally mentioned, but incompatible with the chosen
  no-sessions data model. Skipped for v1.
- **No score history.** Re-scoring overwrites silently. Acceptable per
  user decision to keep one row per (student, kit).
- **Universal criterion text is shared across kits.** Generated rubrics
  will look templated. Admin can edit per-kit in `/admin/rubrics/:kitId`
  if a specific kit needs hand-tuning.
- **Client-only PDF.** If file sizes get large with many kits, we can
  move to server-side rendering later; v1 keeps it simple.
- **Single admin tier.** No "super admin / school admin" distinction.
