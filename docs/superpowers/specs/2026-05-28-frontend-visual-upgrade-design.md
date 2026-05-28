---
title: Frontend Visual Upgrade — Design
date: 2026-05-28
status: approved-for-planning
---

# Frontend Visual Upgrade

Turn the functional MVP frontend into a confident, daily-use education SaaS
product. App-shell redesign + page-level polish, no changes to routes,
data model, Convex functions, or PDF templates.

## 1. Goal

Today the app works but feels like an MVP: thin borders, no real visual
hierarchy, inline ad-hoc styling, no app shell. Teachers will live in this
tool — it should feel like Notion / Linear with a teacher-friendly warmth.

In scope:
- New app shell with persistent left sidebar.
- Shared UI primitives (Card, PageHeader, Badge, StatCard, ProgressBar, Toast).
- Visual upgrade of every signed-in page and the auth pages.
- Token additions for shadows, radii, and score-color semantics.

Out of scope:
- Routing, data model, or Convex function changes.
- PDF report templates (`StudentReportPdf`, `ClassReportPdf`) — left as-is.
- New features (filters, search, bulk actions) beyond what's explicitly listed.
- A marketing/landing surface for signed-out visitors.

## 2. Visual direction

Confident education SaaS:
- Brand teal (`--color-accent: #0F6E56`) used assertively for nav, primary
  actions, and headlines. Existing token palette stays — we add to it, we
  don't reshuffle it.
- DM Serif Display for page titles (28px) and brand wordmark; DM Sans for
  everything else. Both already in tokens.
- Surfaces: warm `#F7F7F8` page background, white cards with soft shadow,
  1px `--color-line` borders only where shadows aren't enough.
- Motion: 150ms transitions on hover/active/focus only. No bouncy animations.

## 3. App shell

A new `AppShell` component wraps every authenticated route. Replaces the
current `TopBar`-on-top pattern for signed-in pages. `TopBar` is deleted.

```
┌──────────┬───────────────────────────────────────────┐
│ SU       │ Breadcrumbs                               │
│ ──────── │ ─────────────────────────────────────     │
│ NAV      │  Page Title (serif)         [Action btn]  │
│ ▸ Classes│  Optional description                     │
│   Reports│                                           │
│   ────── │  ┌─ Card ──────────────────────────────┐  │
│   Admin  │  │  content                            │  │
│   Seed   │  └─────────────────────────────────────┘  │
│          │                                           │
│ ──────── │                                           │
│ 👤 user  │                                           │
│ sign out │                                           │
└──────────┴───────────────────────────────────────────┘
```

Spec:
- 240px wide sidebar, full height, white surface, `--shadow-soft` on right edge.
- SU wordmark at top (serif, brand teal).
- Nav items: icon (lucide-react) + label, 36px tall rows. Active state =
  soft accent background (`--color-good-50`) + 2px left accent border + ink-bold text.
- Sections (separated by hairline rule):
  - **Teacher section**: Classes (`/`), Reports (`/reports`).
  - **Admin section** (admin role only): Teachers (`/admin`), Kits
    (`/admin/kits`), Seed (`/admin/seed`).
- Profile footer: avatar circle (initials), display name, email muted,
  "Sign out" link.
- Below 768px: sidebar collapses; a slim mobile topbar appears with
  hamburger that opens the sidebar as a drawer.

**New top-level route**: `/reports` — lists all classes the teacher owns
with a link to each class's report. (Routes section §5.)

## 4. Shared primitives

All under `src/components/ui/`. Each is a thin, presentational component
built with `cva` (same convention as the existing `Button.tsx`).

### 4.1 `Card`

```tsx
<Card>
  <CardHeader title="Curriculum" action={<Link>Manage</Link>} />
  <CardBody>...</CardBody>
</Card>
```

- White surface, `rounded-lg` (12px), `--shadow-card`, no border by default.
- `CardHeader`: title (text-sm font-medium) + optional action slot on the right.
- `CardBody`: padding-4 by default; `padding="none"` variant for tables/lists
  that want flush content.

### 4.2 `PageHeader`

```tsx
<PageHeader
  title="Grade 5A"
  description="Grade 5 · 2025-26"
  breadcrumbs={[{label:"Classes", to:"/"}, {label:"Grade 5A"}]}
  actions={<Button>New student</Button>}
/>
```

- Breadcrumbs (small, ink-muted) above title.
- Title: DM Serif Display, 28px, brand teal.
- Description: ink-muted, 14px.
- Action slot: right-aligned, vertically centered with title.
- 32px bottom margin before page content.

### 4.3 `Badge`

```tsx
<Badge tone="good|ok|warn|bad|neutral" size="sm|md">Explorer</Badge>
```

Used for category pills, score pills in tables, status indicators.

### 4.4 `StatCard`

```tsx
<StatCard label="Classes" value={6} hint="2 this term" />
```

- Card surface; label small uppercase ink-muted; value big serif 32px;
  optional hint line below in ink-subtle.

### 4.5 `ProgressBar`

```tsx
<ProgressBar value={14} max={24} tone="auto" />
```

- Track: `--color-line` background, 6px tall, rounded.
- Fill: tone-colored. `tone="auto"` picks color from value/max ratio
  (<33% bad, <67% warn, <90% ok, ≥90% good). Explicit tones override.
- Optional caption below, "14 of 24 scored".

### 4.6 `Toast` / save indicator

For the score sheet's debounced save. Lightweight inline indicator (not a
portal-mounted notification system):

```tsx
<SaveStatus state="idle|saving|saved|error" />
```

Renders "Saved · just now" (ink-subtle), "Saving…" (spinner + ink-muted),
or "Failed to save · retry" (bad).

### 4.7 `Sidebar`, `SidebarNavItem`

The two pieces of the shell. `SidebarNavItem` takes `to`, `icon`, `label`,
auto-detects active via `useMatch`.

## 5. Routes

Only addition: `/reports` (TeacherRoute) — a top-level list of the teacher's
classes with links to each `/class/:id/report`. Implemented as a new page
`ReportsIndex.tsx`. Everything else stays identical.

## 6. Page-by-page changes

### 6.1 Auth pages (`/sign-in`, `/sign-up`)

Two-column on `md+`, single centered column on mobile:

- **Left (brand panel)**: `--color-accent-deep` background, white text.
  Serif headline: "Score 159 STEM kits. Print real report cards."
  Three bullets:
  - "Score every student against every kit's rubric."
  - "Download per-student and full-class PDF report cards."
  - "Built for ScienceUtsav teachers."
  Subtle SVG pattern background (low opacity dots or circuit motif).
- **Right (form panel)**: white surface, form built from existing
  `FormField` + `Button` primitives. Same fields as today.

### 6.2 Teacher Dashboard (`/`)

- `PageHeader title="Classes"` with "+ New class" action button.
- **Stats row** (only shown when classes exist): three `StatCard`s
  - Classes (count)
  - Students (sum across classes)
  - Scored (% of student-kit pairs that have a saved score across all
    curricula). Pulled via a new selector in `src/lib/` that reads
    existing queries; if it'd require a new Convex function, drop the
    third card for v1 — must not require Convex changes.
- **Class grid**: 2-column on `md+`, 3-column on `xl`. Each card shows:
  - Class name (font-medium)
  - "Grade {n} · {year}" (ink-muted)
  - Student count badge
  - `ProgressBar` (scored kit-student pairs / total kit-student pairs)
  - Hover → soft shadow lift.
- **Empty state**: centered illustration-style icon (lucide
  `GraduationCap` in a soft-tinted circle), heading, description, primary
  CTA.

### 6.3 Class Detail (`/class/:id`)

- `PageHeader` with title, grade·year description, breadcrumbs, and two
  actions: "Manage curriculum" (ghost) and "Class report" (primary).
- **Overview card** (top): two columns of stat-style metrics — Students,
  Curriculum kits, Scored %, and a big progress bar.
- **Curriculum card**: lists kits in curriculum as chips/rows showing
  `#kit · name`, category `Badge`, and a small `ProgressBar` of how many
  students have a score for this kit. Header has "Manage" link.
- **Students card**: proper `<table>` with columns: Name | Roll | Scored
  (mini progress bar) | Actions. Actions column has a "Score" dropdown
  (kit picker) and "Report" / "Delete" icons. Replaces today's truncated
  three buttons.
- Add-student form moves into the Students card header.

### 6.4 Score Sheet (`/class/.../score/:kitId`)

- **Sticky header bar** (sticky to top of main area): student name (serif
  H2), kit info row (category badge + `#kit · name` + class chip), and
  on the right a circular progress indicator "4 of 6" with `SaveStatus`
  below it.
- **6 criterion rows**, each a `Card`:
  - Criterion label + sub-label.
  - 4-pill scorer: bigger pills (40px tall), color-coded with score
    tokens (1=bad, 2=warn, 3=ok, 4=good). Selected pill filled; others
    outlined.
  - Descriptor panel below the pills, per-row state:
    - If no score chosen for this criterion: render all four descriptors
      in a 4-column compact grid, each tinted with its score-soft color.
    - If a score is chosen: render only the chosen descriptor in a single
      soft-tinted panel matching that score's color.
- **Observations**: full-width labelled textarea, 4 rows tall.
- Debounced save (existing behavior) wired to `SaveStatus` in header.

### 6.5 Student Report (`/class/.../students/.../report`)

- `PageHeader` with student name, "Class › Student" breadcrumbs, and
  primary action "Download PDF".
- One `Card` per scored kit showing kit name, category badge, a row of
  six score pills (one per criterion, color-coded), total badge "21/24",
  and observations preview underneath.

### 6.6 Class Report (`/class/.../report`)

- `PageHeader` with class name, "Download class PDF" action.
- A colored matrix table: rows = students, columns = kits in curriculum.
  Cells show total/24 with cell-background color tone matching the score.
  Sticky header row + sticky student-name column.

### 6.7 Reports Index (`/reports`, new)

Simple list of the teacher's classes, each linking to its `/class/:id/report`.
Built from existing `api.classes.listMine` query.

### 6.8 Admin Dashboard (`/admin`)

- `PageHeader title="Teachers"`.
- Table of teachers: Name | Email | Assigned kits (count) | Actions.
- Clicking a row opens a side drawer with the kit assignment UI
  (searchable list, category filter, checkbox per kit). Keeps existing
  assign/unassign mutations.

### 6.9 Admin Kits (`/admin/kits`)

- `PageHeader title="Kits"` with search input as an action.
- Filter row: category (All / Explorer / Discoverer), grade (chip group), subject.
- Kit card grid: each card shows `#kit`, name, category badge, grade,
  subject, "Edit rubric" link.

### 6.10 Edit Rubric (`/admin/rubrics/:kitId`)

Layout polish only: `PageHeader` with kit name + back breadcrumb, each
criterion as a `Card`, descriptor textareas labelled and roomy. No
functional changes.

### 6.11 Seed Page (`/admin/seed`)

`PageHeader` + single card with explanation and "Run seed" button.
Minor cleanup only.

## 7. Token additions

Added to `src/index.css` `@theme` block:

```css
--shadow-soft: 0 1px 3px 0 rgba(15, 17, 21, 0.05);
--radius-lg: 12px;
--radius-xl: 16px;

/* Semantic score tokens (alias existing score palette) */
--color-score-1: var(--color-bad-600);
--color-score-2: var(--color-warn-600);
--color-score-3: var(--color-ok-600);
--color-score-4: var(--color-good-600);
--color-score-1-soft: var(--color-bad-50);
--color-score-2-soft: var(--color-warn-50);
--color-score-3-soft: var(--color-ok-50);
--color-score-4-soft: var(--color-good-50);
```

No existing tokens are renamed or removed. `ScoreRow` and the PDF
templates keep working unchanged.

## 8. Repository layout (additions)

```
src/
  components/
    AppShell.tsx              (new)
    Sidebar.tsx               (new)
    SidebarNavItem.tsx        (new)
    PageHeader.tsx            (new)
    SaveStatus.tsx            (new)
    ui/
      Card.tsx                (new)
      Badge.tsx               (new)
      StatCard.tsx            (new)
      ProgressBar.tsx         (new)
  pages/
    ReportsIndex.tsx          (new)
  lib/
    progress.ts               (new — pure helpers, no Convex changes)
```

Files deleted:
- `src/components/TopBar.tsx` — replaced by `AppShell` + `Sidebar`.

Files modified (visual rework, behavior unchanged):
- `src/index.css` (token additions, base styles refinement)
- `src/App.tsx` (route for `/reports`, app shell wrapping)
- `src/routes/TeacherRoute.tsx`, `src/routes/AdminRoute.tsx`
  (render through `AppShell`)
- Every page in `src/pages/*` and `src/components/ScoreRow.tsx`
  (visual rewrite using new primitives).

## 9. Implementation order

1. Token additions + new primitives in `src/components/ui/` (Card,
   PageHeader, Badge, StatCard, ProgressBar, Toast). Stand-alone, no
   page changes yet.
2. `AppShell` + `Sidebar` + `SidebarNavItem`; wire through `TeacherRoute`
   and `AdminRoute`; delete `TopBar`.
3. Auth pages (`SignIn`, `SignUp`) — isolated, low-risk visual win.
4. Teacher dashboard + Reports index.
5. Class Detail + Curriculum + Score Sheet.
6. Student Report + Class Report (web previews; PDF untouched).
7. Admin pages (Dashboard, Kits, Edit Rubric, Seed).

Each step is independently verifiable in the dev server.

## 10. Accepted tradeoffs

- **No new Convex functions.** Stats and progress are computed
  client-side from existing queries. If a derivation would require a new
  query, the affected element (e.g., dashboard "Scored %" stat) is
  dropped rather than expanding scope.
- **No mobile-first redesign.** App is responsive down to 360px but
  designed around the desktop teacher workflow.
- **Lucide icons** are added as a dependency for sidebar + empty states.
- **PDF templates unchanged.** Web previews of reports get the visual
  upgrade; PDFs keep their current look. A separate pass can align them
  if needed.
- **No dark mode.** Single light theme.
