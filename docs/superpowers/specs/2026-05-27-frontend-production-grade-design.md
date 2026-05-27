# Frontend Production-Grade Pass — Design

**Status:** Approved (2026-05-27)
**Scope:** Visual polish & design system + UX hardening. No new features.
**Out of scope:** Accessibility audit, mobile redesign, performance/code-splitting, deployment, error tracking, analytics, new Convex mutations.

## Goal

Take the current working-but-utilitarian UI to a crisp modern SaaS look, and harden the runtime UX so saves are visible, errors don't get swallowed, destructive actions are confirmed, and loading/empty/error states look intentional rather than placeholder-y.

## Non-goals

- No mobile or tablet redesign. We won't break mobile, but we won't redesign for it.
- No a11y compliance pass beyond what the new primitives naturally give us (focus rings, semantic elements, labels).
- No deploy, monitoring, or perf work.
- No changes to Convex schema, queries, or mutations. PDF output (`@react-pdf/renderer`) is untouched.

## Design tokens (`src/index.css`)

Replace the warm/serif lean with a tight neutral palette via CSS custom properties:

| Token | Purpose |
|---|---|
| `--surface` | Page background (neutral-50) |
| `--surface-raised` | Cards, modals (white) |
| `--surface-muted` | Subtle backgrounds (neutral-100) |
| `--border` | Default borders (neutral-200) |
| `--border-strong` | Inputs, focus borders (neutral-300) |
| `--text` | Default text (neutral-900) |
| `--text-muted` | Secondary text (neutral-500) |
| `--accent` | Primary action color (kept, slightly retuned) |
| `--accent-fg` | Text on accent |
| `--danger`, `--success`, `--warning` | Status colors |
| `--focus-ring` | Single ring color used everywhere |
| `--radius` | 8px default |
| `--shadow-card` | Single shadow token |

**Typography:** system-ui sans for all UI. Serif retained only for (a) the brand wordmark in `TopBar`, and (b) inside `StudentReportPdf`/`ClassReportPdf` (separate render pipeline, no change).

**Globals:** focus-visible ring, consistent scrollbars, `body` background = `--surface`.

## New primitive components (`src/components/ui/`)

All hand-rolled, typed, variants via `class-variance-authority` (only new dep, ~2KB).

| File | Exports | Notes |
|---|---|---|
| `Button.tsx` | `Button` | Variants: primary, secondary, ghost, danger. Sizes: sm, md. Forwards ref. Supports `loading` prop. |
| `Input.tsx` | `Input`, `Textarea` | Native elements with token-driven styling. Forwards ref. |
| `FormField.tsx` | `FormField`, `Label` | Wraps label + control + error slot. Generates `id`, wires `aria-describedby` to error. |
| `Card.tsx` | `Card`, `CardHeader`, `CardBody`, `CardFooter` | Replaces every inline `bg-white border rounded-xl`. |
| `Badge.tsx` | `Badge` | Variants: neutral, accent, success, warning, danger. |
| `Skeleton.tsx` | `Skeleton`, `SkeletonText`, `SkeletonRow` | Loading shapes; animated via Tailwind `animate-pulse`. |
| `Dialog.tsx` | `Dialog`, `DialogTitle`, `DialogBody`, `DialogFooter` | Portal-mounted. Focus trap, ESC + backdrop close, body scroll lock. |
| `ConfirmDialog.tsx` | `ConfirmDialog`, `useConfirm()` | Imperative API: `const confirm = useConfirm(); if (await confirm({title, body, confirmLabel, danger})) {...}`. Wraps `Dialog`. |
| `Toast.tsx` | `ToastProvider`, `useToast()` | Top-right viewport, auto-dismiss (default 4s). Variants: success, error, info. |
| `EmptyState.tsx` | `EmptyState` | **Rewrites existing** `src/components/EmptyState.tsx`. Adds `icon` prop. |

`Dialog` and `Toast` use `createPortal` to `document.body`. Focus trap is hand-rolled using a sentinel-element approach (no `focus-trap` dep needed for the small surface area).

## App shell wiring

- **`src/main.tsx`** — wrap render tree in `ErrorBoundary` (top-level fallback page with "Reload") and `ToastProvider`. Existing `ConvexAuthProvider` + `BrowserRouter` remain.
- **`src/App.tsx`** — introduce `<Layout>` element used by `TeacherRoute` and `AdminRoute` as their wrapping element. Layout renders `TopBar`, a content container (`max-w-6xl mx-auto px-6 py-6`), and the toast viewport.
- **`src/components/TopBar.tsx`** — sticky, neutral palette, brand wordmark keeps serif accent. Role pill via `Badge`. Sign-out becomes ghost `Button`.

## Save-state on ScoreSheet

Extend `src/lib/useDebouncedMutation.ts` to also expose a status machine:

```ts
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
function useDebouncedMutation<T>(fn, delay): {
  run: (args: T) => void;
  status: SaveStatus;
  lastSavedAt: number | null;
};
```

`ScoreSheet` reads `status`, renders a pill in the header:
- `idle` — hidden
- `saving` — neutral badge, "Saving…"
- `saved` — success badge, "Saved" (auto-fades after 2s)
- `error` — danger badge, "Save failed — retry" (clicking retries; also fires toast)

## Confirm dialogs

Wire `useConfirm()` to every place a destructive mutation is invoked from the UI today:
- **`ClassDetail`** — remove student (`api.students.remove`).
- **`ClassCurriculum`** — remove kit from class (`api.classKits.remove`).

`api.classes.remove` exists in the Convex API but is **not surfaced in the UI** today. We will not add a delete-class affordance as part of this pass — that's a feature add and is out of scope.

Danger variant copy template: "Remove <name>? This can't be undone."

## Form validation

- `SignIn` / `SignUp` — surface auth errors readably under the form via `FormField` error slot. Current code swallows them.
- `TeacherDashboard` — new-class form uses `FormField`, validates non-empty name + grade 1–12 + year format.
- `EditRubric` — surface mutation errors via toast.

## Loading skeletons

Each page that consumes `useQuery` swaps its current `Loading…` / `if (!x) return null` pattern for shaped skeletons that match the final layout. Pattern:

```tsx
if (data === undefined) return <SomePageSkeleton />;
```

Skeletons are defined inline in each page (or co-located if reused).

## Error boundary

Class component at `src/components/ErrorBoundary.tsx` with a friendly fallback Card containing "Something went wrong" + a Reload button. Mounted once at root (in `main.tsx`). Logs to `console.error` (no Sentry).

## Page-level changes — checklist

| Page | Changes |
|---|---|
| `SignIn`, `SignUp` | Centered Card layout, `FormField` w/ surfaced errors, brand mark, link to other auth mode. |
| `TeacherDashboard` | Class cards via `Card`, skeleton grid, validated new-class form. |
| `ClassDetail` | Student table with kit-completion `Badge` per row, `ConfirmDialog` on remove, skeleton state. |
| `ClassCurriculum` | Kit selections via `Badge`, confirm on kit removal, skeleton. |
| `ScoreSheet` | Save pill in header, segmented `ScoreRow` 1–4, `Textarea` for observations, skeleton. |
| `StudentReport`, `ClassReport` | On-screen view wrapped in `Card`. PDF output unchanged. |
| `AdminDashboard` | Teacher list as `Card` grid, skeleton. |
| `AdminKits` | Kit list w/ filters, skeleton, primitives. |
| `EditRubric` | `FormField` inputs, toast on save error, skeleton. |
| `SeedPage` | `Button` variants for run/reset, toast on outcome. |

## File impact summary

**New:**
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/FormField.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Skeleton.tsx`
- `src/components/ui/Dialog.tsx`
- `src/components/ui/ConfirmDialog.tsx`
- `src/components/ui/Toast.tsx`
- `src/components/ErrorBoundary.tsx`
- `src/components/Layout.tsx`

**Rewritten:**
- `src/index.css` — tokens + globals
- `src/components/EmptyState.tsx` — adds icon, restyles
- `src/components/TopBar.tsx`
- `src/components/ScoreRow.tsx` — segmented control
- `src/lib/useDebouncedMutation.ts` — adds status machine

**Touched:**
- `src/main.tsx`, `src/App.tsx`
- All 12 files under `src/pages/` (SignIn, SignUp, SeedPage, AdminDashboard, AdminKits, EditRubric, TeacherDashboard, ClassDetail, ClassCurriculum, ScoreSheet, StudentReport, ClassReport)
- `src/components/Breadcrumbs.tsx`

**Dependencies added:** `class-variance-authority` only.

## Acceptance criteria

1. `npm run build` succeeds; `npm run test` passes; `npm run lint` passes.
2. Every page that calls `useQuery` shows a shaped skeleton matching its layout while data loads — no raw `Loading…` text anywhere.
3. `ScoreSheet` displays a save-state pill that transitions idle → saving → saved (or error) as a debounced mutation flies.
4. All three `*.remove` mutations are gated by `ConfirmDialog`.
5. Sign-in/up surface auth failures via inline `FormField` error.
6. Throwing in any page component renders the error boundary fallback, not a blank screen.
7. No raw `<button className="bg-accent…">` remain — every interactive control uses a primitive.
8. PDF output (`StudentReportPdf`, `ClassReportPdf`) is unchanged in content and visual layout.

## Implementation order (rough)

1. Design tokens + globals (`index.css`).
2. Primitives, one PR's worth at a time: Button → Input/FormField → Card → Badge → Skeleton → Toast → Dialog/ConfirmDialog → EmptyState.
3. App shell: `Layout`, `ErrorBoundary`, `TopBar`, `main.tsx`/`App.tsx` wiring.
4. Save-state hook + ScoreSheet integration.
5. Page-by-page swap-in, ending with admin pages.
6. Lint/build/test sweep.

Detailed step ordering is the job of the implementation plan.
