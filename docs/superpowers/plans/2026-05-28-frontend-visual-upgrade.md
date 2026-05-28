# Frontend Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the functional MVP frontend into a confident, daily-use education SaaS product — new app shell with persistent sidebar, shared UI primitives, and visual rework of every signed-in page plus auth.

**Architecture:** Introduce a small set of shared primitives (`Card`, `PageHeader`, `Badge`, `StatCard`, `ProgressBar`, `SaveStatus`, `Sidebar`) in `src/components/ui/` and `src/components/`. Replace the current top-bar layout with an `AppShell` that wraps every authenticated route. Then walk page-by-page, rewriting visuals to use the primitives. Zero changes to routing, data model, Convex functions, or PDF templates.

**Tech Stack:** Vite + React 19 + TypeScript, Tailwind CSS v4 (with `@theme` tokens), React Router v7, Convex (queries unchanged), `class-variance-authority` for variants, `lucide-react` (new dependency) for icons, Vitest for the few unit tests.

**Reference docs:**
- Spec: [docs/superpowers/specs/2026-05-28-frontend-visual-upgrade-design.md](../specs/2026-05-28-frontend-visual-upgrade-design.md)
- Existing primitives: [src/components/ui/Button.tsx](../../../src/components/ui/Button.tsx), [src/components/ui/Input.tsx](../../../src/components/ui/Input.tsx), [src/components/ui/FormField.tsx](../../../src/components/ui/FormField.tsx)
- Token file: [src/index.css](../../../src/index.css)

**Per-task verification:** Every task ends with `npm run build` (runs `tsc -b && vite build`) to catch type errors and bundler failures. Pages with logic add Vitest unit tests. Visual results are smoke-checked in `npm run dev` before the commit step on UI-touching tasks.

---

## File Structure

**New files:**

| Path | Responsibility |
|------|---|
| `src/components/ui/Card.tsx` | `Card`, `CardHeader`, `CardBody` — white card surface |
| `src/components/ui/Badge.tsx` | Tone-colored pill (good/ok/warn/bad/neutral) |
| `src/components/ui/ProgressBar.tsx` | Bar with auto-tone option |
| `src/components/ui/StatCard.tsx` | Big number + label dashboard tile |
| `src/components/PageHeader.tsx` | Breadcrumbs + title + description + actions |
| `src/components/SaveStatus.tsx` | "Saving / Saved / Failed" inline indicator |
| `src/components/Sidebar.tsx` | Sidebar shell with logo + nav slots + profile footer |
| `src/components/SidebarNavItem.tsx` | One nav row, auto-active via `useMatch` |
| `src/components/AppShell.tsx` | Layout wrapping sidebar + main area, handles mobile drawer |
| `src/lib/progress.ts` | Pure helpers: `classProgress`, `studentProgress`, `toneFromRatio` |
| `src/lib/progress.test.ts` | Vitest unit tests for the helpers |
| `src/components/ui/ProgressBar.test.tsx` | Vitest unit tests for tone-auto rendering |
| `src/pages/ReportsIndex.tsx` | New `/reports` top-level page |

**Modified files:**

| Path | Change |
|------|---|
| `src/index.css` | Token additions (shadows + score aliases) |
| `src/App.tsx` | Add `/reports` route inside `TeacherRoute` |
| `src/routes/TeacherRoute.tsx` | Render through `AppShell` instead of `TopBar` |
| `src/routes/AdminRoute.tsx` | Render through `AppShell` instead of `TopBar` |
| `src/components/Breadcrumbs.tsx` | Use new token classes, slot into `PageHeader` |
| `src/components/EmptyState.tsx` | Use new primitives + icon support |
| `src/components/ScoreRow.tsx` | Per-row state, bigger pills, score-token colors |
| `src/components/KitPicker.tsx` | Use Card + Badge primitives |
| `src/pages/SignIn.tsx`, `src/pages/SignUp.tsx` | Two-column auth layout |
| `src/pages/TeacherDashboard.tsx` | Stats row, real class cards, polished empty state |
| `src/pages/ClassDetail.tsx` | PageHeader, overview/curriculum/students cards, table |
| `src/pages/ClassCurriculum.tsx` | PageHeader + refreshed KitPicker |
| `src/pages/ScoreSheet.tsx` | Sticky header, per-row scorer, SaveStatus |
| `src/pages/StudentReport.tsx` | PageHeader, score-pill rows |
| `src/pages/ClassReport.tsx` | PageHeader, colored matrix table |
| `src/pages/AdminDashboard.tsx` | Table + drawer for assignments |
| `src/pages/AdminKits.tsx` | Search + filter + card grid |
| `src/pages/EditRubric.tsx` | PageHeader + Card per criterion |
| `src/pages/SeedPage.tsx` | PageHeader + single explanation card |

**Deleted files:**

| Path | Why |
|------|---|
| `src/components/TopBar.tsx` | Replaced by `AppShell` + `Sidebar` |

---

## Task 1: Dependencies and tokens

**Files:**
- Modify: `package.json`
- Modify: `src/index.css`

- [ ] **Step 1: Install lucide-react**

Run: `npm install lucide-react@^0.474.0`

Expected: package added, no peer warnings.

- [ ] **Step 2: Add token additions to `src/index.css`**

In `src/index.css`, inside the `@theme { … }` block, **after** the existing `--shadow-pop` line, insert:

```css
  --shadow-soft: 0 1px 3px 0 rgba(15, 17, 21, 0.05);

  /* Semantic score tokens — alias to existing palette so ScoreRow + PDFs stay consistent */
  --color-score-1: var(--color-bad-600);
  --color-score-2: var(--color-warn-600);
  --color-score-3: var(--color-ok-600);
  --color-score-4: var(--color-good-400);
  --color-score-1-soft: var(--color-bad-50);
  --color-score-2-soft: var(--color-warn-50);
  --color-score-3-soft: var(--color-ok-50);
  --color-score-4-soft: var(--color-good-50);
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: no errors. The new tokens will generate Tailwind utilities like `bg-score-3`, `shadow-soft`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/index.css
git commit -m "ui: add lucide-react, score-color and soft-shadow tokens"
```

---

## Task 2: `Card`, `CardHeader`, `CardBody` primitives

**Files:**
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/Card.tsx
import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface rounded-xl shadow-card border border-line/60 ${className}`}
      {...rest}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line/60 ${className}`}
    >
      <div className="min-w-0">
        <div className="text-sm font-medium text-ink truncate">{title}</div>
        {description && (
          <div className="text-xs text-ink-muted mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({
  className = "",
  padding = "md",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { padding?: "none" | "sm" | "md" | "lg" }) {
  const pad = {
    none: "",
    sm: "px-4 py-3",
    md: "px-5 py-4",
    lg: "px-6 py-6",
  }[padding];
  return <div className={`${pad} ${className}`} {...rest} />;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "ui: Card, CardHeader, CardBody primitives"
```

---

## Task 3: `Badge` primitive

**Files:**
- Create: `src/components/ui/Badge.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/Badge.tsx
import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva(
  "inline-flex items-center gap-1 rounded-full font-medium leading-none whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-ink-muted",
        accent: "bg-good-50 text-good-800",
        good: "bg-good-50 text-good-800",
        ok: "bg-ok-50 text-ok-800",
        warn: "bg-warn-50 text-warn-800",
        bad: "bg-bad-50 text-bad-800",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
      },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  },
);

type Props = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>;

export function Badge({ tone, size, className, ...rest }: Props) {
  return <span className={badge({ tone, size, className })} {...rest} />;
}

export function categoryTone(category: string): "ok" | "accent" {
  return category === "Explorer" ? "ok" : "accent";
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "ui: Badge primitive with category tone helper"
```

---

## Task 4: `progress.ts` helpers (with tests)

**Files:**
- Create: `src/lib/progress.ts`
- Create: `src/lib/progress.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/progress.test.ts
import { describe, it, expect } from "vitest";
import { toneFromRatio, classProgress, studentProgress } from "./progress";

describe("toneFromRatio", () => {
  it("returns 'bad' below 0.33", () => {
    expect(toneFromRatio(0)).toBe("bad");
    expect(toneFromRatio(0.32)).toBe("bad");
  });
  it("returns 'warn' between 0.33 and 0.67", () => {
    expect(toneFromRatio(0.33)).toBe("warn");
    expect(toneFromRatio(0.66)).toBe("warn");
  });
  it("returns 'ok' between 0.67 and 0.9", () => {
    expect(toneFromRatio(0.67)).toBe("ok");
    expect(toneFromRatio(0.89)).toBe("ok");
  });
  it("returns 'good' at or above 0.9", () => {
    expect(toneFromRatio(0.9)).toBe("good");
    expect(toneFromRatio(1)).toBe("good");
  });
  it("handles divide-by-zero by returning 'neutral'", () => {
    expect(toneFromRatio(NaN)).toBe("neutral");
  });
});

describe("studentProgress", () => {
  it("counts unique scored kits", () => {
    const scoredKitIds = new Set(["k1", "k2"]);
    const curriculumKitIds = ["k1", "k2", "k3"];
    expect(studentProgress(scoredKitIds, curriculumKitIds)).toEqual({
      scored: 2,
      total: 3,
      ratio: 2 / 3,
    });
  });
  it("returns ratio 0 when curriculum is empty", () => {
    expect(studentProgress(new Set(), [])).toEqual({
      scored: 0,
      total: 0,
      ratio: 0,
    });
  });
});

describe("classProgress", () => {
  it("computes student-kit pair completion", () => {
    // 2 students × 3 kits = 6 pairs; 4 are scored
    const scoredPairs = new Set(["s1:k1", "s1:k2", "s2:k1", "s2:k3"]);
    const studentIds = ["s1", "s2"];
    const kitIds = ["k1", "k2", "k3"];
    expect(classProgress(scoredPairs, studentIds, kitIds)).toEqual({
      scored: 4,
      total: 6,
      ratio: 4 / 6,
    });
  });
  it("returns ratio 0 when no students or no kits", () => {
    expect(classProgress(new Set(), [], ["k1"])).toEqual({
      scored: 0,
      total: 0,
      ratio: 0,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- progress`
Expected: FAIL with "Cannot find module './progress'" or similar.

- [ ] **Step 3: Implement `progress.ts`**

```ts
// src/lib/progress.ts
export type Tone = "good" | "ok" | "warn" | "bad" | "neutral";

export function toneFromRatio(ratio: number): Tone {
  if (Number.isNaN(ratio)) return "neutral";
  if (ratio >= 0.9) return "good";
  if (ratio >= 0.67) return "ok";
  if (ratio >= 0.33) return "warn";
  return "bad";
}

export type Progress = { scored: number; total: number; ratio: number };

export function studentProgress(
  scoredKitIds: Set<string>,
  curriculumKitIds: string[],
): Progress {
  const total = curriculumKitIds.length;
  let scored = 0;
  for (const id of curriculumKitIds) if (scoredKitIds.has(id)) scored += 1;
  return { scored, total, ratio: total === 0 ? 0 : scored / total };
}

export function classProgress(
  scoredPairs: Set<string>, // formatted "studentId:kitId"
  studentIds: string[],
  kitIds: string[],
): Progress {
  const total = studentIds.length * kitIds.length;
  if (total === 0) return { scored: 0, total: 0, ratio: 0 };
  let scored = 0;
  for (const s of studentIds) {
    for (const k of kitIds) {
      if (scoredPairs.has(`${s}:${k}`)) scored += 1;
    }
  }
  return { scored, total, ratio: scored / total };
}

export function pairKey(studentId: string, kitId: string): string {
  return `${studentId}:${kitId}`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- progress`
Expected: PASS, all 8 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/progress.ts src/lib/progress.test.ts
git commit -m "lib: progress helpers (toneFromRatio, classProgress, studentProgress)"
```

---

## Task 5: `ProgressBar` primitive (with tests)

**Files:**
- Create: `src/components/ui/ProgressBar.tsx`
- Create: `src/components/ui/ProgressBar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/ProgressBar.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders the percentage in aria-valuenow", () => {
    const { getByRole } = render(<ProgressBar value={7} max={10} />);
    const bar = getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "70");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });
  it("clamps over-max to 100%", () => {
    const { getByRole } = render(<ProgressBar value={20} max={10} />);
    expect(getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
  it("renders 0% when max is 0", () => {
    const { getByRole } = render(<ProgressBar value={5} max={0} />);
    expect(getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });
  it("uses neutral fill for tone='auto' with max=0", () => {
    const { getByRole } = render(<ProgressBar value={5} max={0} tone="auto" />);
    const fill = getByRole("progressbar").firstElementChild!;
    expect(fill.className).toContain("bg-line-strong");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ProgressBar`
Expected: FAIL with "Cannot find module './ProgressBar'".

- [ ] **Step 3: Implement `ProgressBar.tsx`**

```tsx
// src/components/ui/ProgressBar.tsx
import { toneFromRatio, type Tone } from "../../lib/progress";

type Props = {
  value: number;
  max: number;
  tone?: Tone | "auto";
  size?: "sm" | "md";
  caption?: string;
  className?: string;
};

const FILL: Record<Tone, string> = {
  good: "bg-good-400",
  ok: "bg-ok-400",
  warn: "bg-warn-400",
  bad: "bg-bad-600",
  neutral: "bg-line-strong",
};

export function ProgressBar({
  value,
  max,
  tone = "auto",
  size = "md",
  caption,
  className = "",
}: Props) {
  const ratio = max === 0 ? 0 : Math.min(1, Math.max(0, value / max));
  const pct = Math.round(ratio * 100);
  const resolvedTone: Tone =
    tone === "auto" ? (max === 0 ? "neutral" : toneFromRatio(ratio)) : tone;
  const h = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full ${h} bg-line/60 rounded-full overflow-hidden`}
      >
        <div
          className={`${FILL[resolvedTone]} h-full rounded-full transition-[width] duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption && (
        <div className="text-xs text-ink-muted mt-1">{caption}</div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- ProgressBar`
Expected: PASS, all 4 tests green.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/ProgressBar.tsx src/components/ui/ProgressBar.test.tsx
git commit -m "ui: ProgressBar primitive with auto-tone"
```

---

## Task 6: `StatCard` primitive

**Files:**
- Create: `src/components/ui/StatCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/StatCard.tsx
import type { ReactNode } from "react";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="px-5 py-4 flex items-start gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-good-50 text-good-600 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wide text-ink-muted font-medium">
            {label}
          </div>
          <div className="font-serif text-3xl text-ink mt-1 leading-none">
            {value}
          </div>
          {hint && (
            <div className="text-xs text-ink-subtle mt-2">{hint}</div>
          )}
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/StatCard.tsx
git commit -m "ui: StatCard primitive"
```

---

## Task 7: `PageHeader` + refreshed `Breadcrumbs`

**Files:**
- Modify: `src/components/Breadcrumbs.tsx`
- Create: `src/components/PageHeader.tsx`

- [ ] **Step 1: Refresh `Breadcrumbs.tsx`**

Replace the entire contents of `src/components/Breadcrumbs.tsx` with:

```tsx
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export default function Breadcrumbs({
  crumbs,
  className = "",
}: {
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs text-ink-muted flex items-center flex-wrap gap-1 ${className}`}
    >
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight aria-hidden className="w-3 h-3 text-ink-subtle" />
          )}
          {c.to ? (
            <Link
              to={c.to}
              className="hover:text-accent transition-colors"
            >
              {c.label}
            </Link>
          ) : (
            <span className="text-ink">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Create `PageHeader.tsx`**

```tsx
// src/components/PageHeader.tsx
import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`mb-8 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs crumbs={breadcrumbs} className="mb-3" />
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="font-serif text-[28px] leading-tight text-accent-deep text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-ink-muted mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success. Existing pages still use the old `Breadcrumbs` API — it's compatible (added optional `className`).

- [ ] **Step 4: Commit**

```bash
git add src/components/Breadcrumbs.tsx src/components/PageHeader.tsx
git commit -m "ui: PageHeader + refreshed Breadcrumbs with chevron"
```

---

## Task 8: `SaveStatus` component

**Files:**
- Create: `src/components/SaveStatus.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/SaveStatus.tsx
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export type SaveState = "idle" | "saving" | "saved" | "error";

export default function SaveStatus({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  if (state === "saving")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Saving…
      </span>
    );
  if (state === "saved")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-good-600">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Saved
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-danger">
      <AlertCircle className="w-3.5 h-3.5" />
      Failed to save
    </span>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/SaveStatus.tsx
git commit -m "ui: SaveStatus inline indicator"
```

---

## Task 9: `Sidebar` + `SidebarNavItem`

**Files:**
- Create: `src/components/SidebarNavItem.tsx`
- Create: `src/components/Sidebar.tsx`

- [ ] **Step 1: Create `SidebarNavItem.tsx`**

```tsx
// src/components/SidebarNavItem.tsx
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export default function SidebarNavItem({
  to,
  icon: Icon,
  label,
  end,
  onClick,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group flex items-center gap-2.5 px-3 h-9 rounded-md text-sm transition-colors relative",
          isActive
            ? "bg-good-50 text-good-800 font-medium"
            : "text-ink-muted hover:bg-surface-muted hover:text-ink",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              aria-hidden
              className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-accent"
            />
          )}
          <Icon
            className={`w-4 h-4 flex-shrink-0 ${
              isActive ? "text-accent" : "text-ink-subtle"
            }`}
          />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}
```

- [ ] **Step 2: Create `Sidebar.tsx`**

```tsx
// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  Boxes,
  Sprout,
  LogOut,
} from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { profile } = useCurrentProfile();
  const { signOut } = useAuthActions();
  const isAdmin = profile?.role === "admin";
  const initials = (profile?.displayName || profile?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="h-full flex flex-col bg-surface border-r border-line">
      <div className="px-5 py-5">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 font-serif text-accent-deep text-lg"
        >
          <span className="w-7 h-7 rounded-md bg-accent text-white inline-flex items-center justify-center text-sm font-sans">
            SU
          </span>
          Report Card
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wide text-ink-subtle font-semibold">
          Teach
        </div>
        <SidebarNavItem to="/" icon={Home} label="Classes" end onClick={onNavigate} />
        <SidebarNavItem
          to="/reports"
          icon={FileText}
          label="Reports"
          onClick={onNavigate}
        />

        {isAdmin && (
          <>
            <div className="px-3 pt-5 pb-1 text-[10px] uppercase tracking-wide text-ink-subtle font-semibold">
              Admin
            </div>
            <SidebarNavItem
              to="/admin"
              icon={Users}
              label="Teachers"
              end
              onClick={onNavigate}
            />
            <SidebarNavItem
              to="/admin/kits"
              icon={Boxes}
              label="Kits"
              onClick={onNavigate}
            />
            <SidebarNavItem
              to="/admin/seed"
              icon={Sprout}
              label="Seed"
              onClick={onNavigate}
            />
          </>
        )}
      </nav>

      {profile && (
        <div className="border-t border-line p-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-good-50 text-good-800 inline-flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-ink truncate">
                {profile.displayName || "Teacher"}
              </div>
              <div className="text-[11px] text-ink-subtle truncate">
                {profile.email}
              </div>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="mt-1 w-full flex items-center gap-2 px-3 h-8 text-xs text-ink-muted hover:bg-surface-muted hover:text-ink rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/Sidebar.tsx src/components/SidebarNavItem.tsx
git commit -m "ui: Sidebar shell with role-aware nav + profile footer"
```

---

## Task 10: `AppShell` + wire into routes; delete `TopBar`

**Files:**
- Create: `src/components/AppShell.tsx`
- Modify: `src/routes/TeacherRoute.tsx`
- Modify: `src/routes/AdminRoute.tsx`
- Delete: `src/components/TopBar.tsx`

- [ ] **Step 1: Create `AppShell.tsx`**

```tsx
// src/components/AppShell.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[240px] flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="relative w-[240px] z-50">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 h-12 border-b border-line bg-surface sticky top-0 z-30">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif text-accent-deep">Report Card</span>
          <span className="w-7" />
        </div>

        <main className="max-w-[1080px] mx-auto px-5 md:px-8 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `TeacherRoute.tsx`**

Replace the entire file with:

```tsx
// src/routes/TeacherRoute.tsx
import { Navigate } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import AppShell from "../components/AppShell";

export default function TeacherRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (profile === null)
    return (
      <div className="p-6 text-sm text-ink-muted">Setting up profile…</div>
    );
  return <AppShell />;
}
```

- [ ] **Step 3: Update `AdminRoute.tsx`**

Replace the entire file with:

```tsx
// src/routes/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import AppShell from "../components/AppShell";

export default function AdminRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (profile === null || profile.role !== "admin")
    return <Navigate to="/" replace />;
  return <AppShell />;
}
```

- [ ] **Step 4: Delete `TopBar.tsx`**

```bash
git rm src/components/TopBar.tsx
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: success. If TS complains about an unused `TopBar` import anywhere, search for `import TopBar` and remove any stragglers.

- [ ] **Step 6: Smoke check in dev**

Run: `npm run dev`
Expected: sign-in flow still works; after signing in the sidebar appears, all existing routes navigate, mobile drawer toggles. Stop the server with Ctrl-C before committing.

- [ ] **Step 7: Commit**

```bash
git add src/components/AppShell.tsx src/routes/TeacherRoute.tsx src/routes/AdminRoute.tsx
git commit -m "ui: AppShell layout with sidebar + mobile drawer, retire TopBar"
```

---

## Task 11: Refresh `EmptyState`

**Files:**
- Modify: `src/components/EmptyState.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/components/EmptyState.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="bg-surface border border-dashed border-line-strong rounded-xl px-6 py-16 text-center">
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-good-50 text-good-600 inline-flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="font-serif text-xl text-ink">{title}</h3>
      <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto text-balance">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success (existing call sites omit the new optional `icon` prop, which is fine).

- [ ] **Step 3: Commit**

```bash
git add src/components/EmptyState.tsx
git commit -m "ui: EmptyState supports lucide icon, refreshed styling"
```

---

## Task 12: Auth pages — two-column layout

**Files:**
- Modify: `src/pages/SignIn.tsx`
- Modify: `src/pages/SignUp.tsx`
- Create: `src/components/AuthLayout.tsx`

- [ ] **Step 1: Create `AuthLayout.tsx`**

```tsx
// src/components/AuthLayout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-surface-sunken">
      {/* Brand panel */}
      <aside className="hidden md:flex flex-col justify-between w-1/2 lg:w-[45%] bg-accent-deep text-white p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <Link
          to="/"
          className="relative font-serif text-2xl inline-flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-md bg-white/15 inline-flex items-center justify-center text-sm font-sans font-semibold">
            SU
          </span>
          ScienceUtsav
        </Link>

        <div className="relative space-y-6 max-w-md">
          <h2 className="font-serif text-4xl leading-tight text-balance">
            Score 159 STEM kits.<br />Print real report cards.
          </h2>
          <ul className="space-y-3 text-white/85">
            {[
              "Score every student against every kit's rubric.",
              "Download per-student and full-class PDF report cards.",
              "Built for ScienceUtsav teachers.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-good-200" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/60">
          © {new Date().getFullYear()} ScienceUtsav
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Replace `SignIn.tsx`**

```tsx
// src/pages/SignIn.tsx
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-accent-deep">Welcome back</h1>
        <p className="text-sm text-ink-muted mt-1">Sign in to keep scoring.</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Email">
          {(id, describedBy) => (
            <Input
              id={id}
              type="email"
              required
              autoComplete="email"
              aria-describedby={describedBy}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </FormField>
        <FormField label="Password">
          {(id, describedBy) => (
            <Input
              id={id}
              type="password"
              required
              autoComplete="current-password"
              aria-describedby={describedBy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </FormField>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={busy} className="w-full">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-xs text-ink-muted text-center pt-1">
          No account?{" "}
          <Link to="/sign-up" className="text-accent hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
```

- [ ] **Step 3: Replace `SignUp.tsx`**

```tsx
// src/pages/SignUp.tsx
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignUp() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn("password", { email, password, flow: "signUp" });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-accent-deep">Create account</h1>
        <p className="text-sm text-ink-muted mt-1">
          Start scoring your first class in minutes.
        </p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Email">
          {(id, describedBy) => (
            <Input
              id={id}
              type="email"
              required
              autoComplete="email"
              aria-describedby={describedBy}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </FormField>
        <FormField label="Password" hint="At least 8 characters.">
          {(id, describedBy) => (
            <Input
              id={id}
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              aria-describedby={describedBy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </FormField>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={busy} className="w-full">
          {busy ? "Creating…" : "Create account"}
        </Button>
        <p className="text-xs text-ink-muted text-center pt-1">
          Already have one?{" "}
          <Link to="/sign-in" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Smoke check**

Run: `npm run dev`. Visit `/sign-in` and `/sign-up`. Confirm the two-column layout on desktop and single column on mobile (resize <768px). Stop server.

- [ ] **Step 6: Commit**

```bash
git add src/components/AuthLayout.tsx src/pages/SignIn.tsx src/pages/SignUp.tsx
git commit -m "ui: two-column auth layout with brand panel"
```

---

## Task 13: Teacher Dashboard redesign

**Files:**
- Modify: `src/pages/TeacherDashboard.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/pages/TeacherDashboard.tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Plus, ArrowRight, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FormField } from "../components/ui/FormField";
import { ProgressBar } from "../components/ui/ProgressBar";

export default function TeacherDashboard() {
  const classes = useQuery(api.classes.listMine);
  const create = useMutation(api.classes.create);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(4);
  const [year, setYear] = useState("2025-26");
  const [showForm, setShowForm] = useState(false);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await create({ name: name.trim(), grade, academicYear: year });
    setName("");
    setShowForm(false);
  }

  const totalClasses = classes?.length ?? 0;

  return (
    <>
      <PageHeader
        title="Classes"
        description="Your classes, students, and curriculum."
        actions={
          <Button
            onClick={() => setShowForm((s) => !s)}
            variant={showForm ? "secondary" : "primary"}
          >
            {showForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="w-4 h-4" />
                New class
              </>
            )}
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <form
            onSubmit={onCreate}
            className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_auto] gap-3 items-end p-5"
          >
            <FormField label="Name">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Grade 5A"
                />
              )}
            </FormField>
            <FormField label="Grade">
              {(id) => (
                <Input
                  id={id}
                  type="number"
                  min={1}
                  max={12}
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                />
              )}
            </FormField>
            <FormField label="Academic year">
              {(id) => (
                <Input
                  id={id}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              )}
            </FormField>
            <Button type="submit">Create</Button>
          </form>
        </Card>
      )}

      {totalClasses > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Classes"
            value={totalClasses}
            icon={<GraduationCap className="w-5 h-5" />}
          />
          <StatCard
            label="Academic year"
            value={year}
            hint="Current term"
          />
          <StatCard
            label="Curriculum"
            value="View kits"
            hint={
              <Link to="/admin/kits" className="text-accent hover:underline">
                Browse all kits →
              </Link>
            }
            icon={<Users className="w-5 h-5" />}
          />
        </div>
      )}

      {classes && classes.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No classes yet"
          description="Create your first class to add students and start scoring."
          action={
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              New class
            </Button>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {classes?.map((c) => (
            <li key={c._id}>
              <Link
                to={`/class/${c._id}`}
                className="group block bg-surface rounded-xl border border-line/60 shadow-card p-5 hover:shadow-pop hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      {c.name}
                    </div>
                    <div className="text-xs text-ink-muted mt-0.5">
                      Grade {c.grade} · {c.academicYear}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-accent transition-colors" />
                </div>
                <ProgressBar
                  value={0}
                  max={0}
                  tone="auto"
                  className="mt-5"
                  caption="Open class to see progress"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Smoke check**

Run: `npm run dev`, visit `/`. Confirm: PageHeader with title + New class action, stat row (if any classes), class cards with hover lift, empty state with icon when no classes. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/TeacherDashboard.tsx
git commit -m "ui: redesigned teacher dashboard with stats + class cards"
```

---

## Task 14: New `/reports` route — `ReportsIndex` page

**Files:**
- Create: `src/pages/ReportsIndex.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `ReportsIndex.tsx`**

```tsx
// src/pages/ReportsIndex.tsx
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FileText, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader } from "../components/ui/Card";

export default function ReportsIndex() {
  const classes = useQuery(api.classes.listMine);

  return (
    <>
      <PageHeader
        title="Reports"
        description="Download per-class or per-student report cards."
      />
      {classes && classes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No classes yet"
          description="Create a class first — then come back here to generate report cards."
          action={
            <Link to="/" className="text-sm text-accent hover:underline">
              Go to Classes →
            </Link>
          }
        />
      ) : (
        <Card>
          <CardHeader title="Your classes" />
          <ul className="divide-y divide-line/60">
            {classes?.map((c) => (
              <li key={c._id}>
                <Link
                  to={`/class/${c._id}/report`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-muted transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-ink">
                      {c.name}
                    </div>
                    <div className="text-xs text-ink-muted">
                      Grade {c.grade} · {c.academicYear}
                    </div>
                  </div>
                  <span className="text-xs text-accent inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open report
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
```

- [ ] **Step 2: Add the route in `App.tsx`**

In `src/App.tsx`, find the `<Route element={<TeacherRoute />}>` block. Add the new route line between `<Route path="/" …>` and `<Route path="/class/:classId" …>`. Also add the import at the top.

Add this import after `import TeacherDashboard from "./pages/TeacherDashboard";`:

```tsx
import ReportsIndex from "./pages/ReportsIndex";
```

Add this `<Route>` inside the TeacherRoute block, right after the `path="/"` route:

```tsx
<Route path="/reports" element={<ReportsIndex />} />
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Smoke check**

Run: `npm run dev`, click "Reports" in the sidebar. Confirm the page loads and lists classes. Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ReportsIndex.tsx src/App.tsx
git commit -m "ui: new /reports top-level page"
```

---

## Task 15: Class Detail redesign

**Files:**
- Modify: `src/pages/ClassDetail.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/pages/ClassDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState } from "react";
import { Plus, Trash2, FileText, BookOpen } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const removeStudent = useMutation(api.students.remove);
  const [name, setName] = useState("");
  const [scoringFor, setScoringFor] = useState<string | null>(null);

  if (!cls) return <p className="text-sm text-ink-muted">Loading…</p>;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await addStudent({ classId: id, name: name.trim() });
    setName("");
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Classes", to: "/" }, { label: cls.name }]}
        title={cls.name}
        description={`Grade ${cls.grade} · ${cls.academicYear}`}
        actions={
          <>
            <Link to={`/class/${id}/curriculum`}>
              <Button variant="secondary">
                <BookOpen className="w-4 h-4" />
                Curriculum
              </Button>
            </Link>
            <Link to={`/class/${id}/report`}>
              <Button>
                <FileText className="w-4 h-4" />
                Class report
              </Button>
            </Link>
          </>
        }
      />

      <Card className="mb-6">
        <CardHeader
          title="Curriculum"
          description={`${kits?.length ?? 0} kits attached`}
          action={
            <Link
              to={`/class/${id}/curriculum`}
              className="text-xs text-accent hover:underline"
            >
              Manage
            </Link>
          }
        />
        <CardBody padding="none">
          {kits && kits.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-muted text-center">
              No kits attached. Open "Manage" to add some.
            </p>
          ) : (
            <ul className="divide-y divide-line/60">
              {kits?.map((k) => (
                <li
                  key={k._id}
                  className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      #{k.kit!.kitNumber} · {k.kit!.kitName}
                    </div>
                    <div className="text-xs text-ink-muted truncate">
                      {k.kit!.concept}
                    </div>
                  </div>
                  <Badge tone={categoryTone(k.kit!.category)} size="sm">
                    {k.kit!.category}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Students"
          description={`${students?.length ?? 0} enrolled`}
        />
        <CardBody padding="none">
          <form onSubmit={add} className="px-5 py-3 flex gap-2 border-b border-line/60">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
            />
            <Button type="submit" size="md">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </form>
          {students && students.length === 0 ? (
            <EmptyState
              title="No students yet"
              description="Add students above to begin scoring."
            />
          ) : (
            <ul className="divide-y divide-line/60">
              {students?.map((s) => (
                <li
                  key={s._id}
                  className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink truncate">
                      {s.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {kits && kits.length > 0 && (
                      <div className="relative">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            setScoringFor(scoringFor === s._id ? null : s._id)
                          }
                        >
                          Score
                        </Button>
                        {scoringFor === s._id && (
                          <div className="absolute right-0 top-full mt-1 z-10 bg-surface border border-line rounded-lg shadow-pop w-64 max-h-80 overflow-y-auto py-1">
                            {kits.map((k) => (
                              <Link
                                key={k._id}
                                to={`/class/${id}/students/${s._id}/score/${k.kitId}`}
                                onClick={() => setScoringFor(null)}
                                className="block px-3 py-2 text-xs hover:bg-surface-muted"
                              >
                                <div className="font-medium text-ink truncate">
                                  #{k.kit!.kitNumber} · {k.kit!.kitName}
                                </div>
                                <div className="text-[11px] text-ink-muted">
                                  {k.kit!.category}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <Link to={`/class/${id}/students/${s._id}/report`}>
                      <Button variant="ghost" size="sm">
                        Report
                      </Button>
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${s.name}?`))
                          removeStudent({ studentId: s._id });
                      }}
                      className="text-ink-subtle hover:text-danger p-1.5 rounded transition-colors"
                      aria-label={`Delete ${s.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Smoke check**

Run: `npm run dev`, open a class. Confirm: PageHeader with breadcrumbs + two actions, Curriculum card with category badges, Students card with add form + table, Score dropdown opens and links work. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ClassDetail.tsx
git commit -m "ui: redesigned class detail with curriculum + students cards"
```

---

## Task 16: Class Curriculum + refreshed `KitPicker`

**Files:**
- Modify: `src/pages/ClassCurriculum.tsx`
- Modify: `src/components/KitPicker.tsx`

- [ ] **Step 1: Update `KitPicker.tsx`**

```tsx
// src/components/KitPicker.tsx
import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Search } from "lucide-react";
import { Badge, categoryTone } from "./ui/Badge";
import { Card, CardBody } from "./ui/Card";
import { Input } from "./ui/Input";

export default function KitPicker({
  selectedKitIds,
  onToggle,
}: {
  selectedKitIds: Set<string>;
  onToggle: (kitId: Id<"kits">, selected: boolean) => void;
}) {
  const assigned = useQuery(api.classKits.assignedKitsForTeacher);
  const [filter, setFilter] = useState<"all" | "Explorer" | "Discoverer">(
    "all",
  );
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    if (!assigned) return [];
    const lq = q.trim().toLowerCase();
    return assigned.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        k.concept.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq)
      );
    });
  }, [assigned, filter, q]);

  if (!assigned) return <p className="text-sm text-ink-subtle">Loading…</p>;
  if (assigned.length === 0)
    return (
      <Card>
        <CardBody>
          <p className="text-sm text-ink-muted">
            You haven't been assigned any kits. Ask the admin.
          </p>
        </CardBody>
      </Card>
    );

  return (
    <Card>
      <div className="px-5 py-3 border-b border-line/60 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search kits…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 bg-surface-muted rounded-md p-1">
          {(["all", "Explorer", "Discoverer"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 h-7 rounded text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-surface text-ink shadow-card"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <span className="text-xs text-ink-muted ml-auto">
          {selectedKitIds.size} selected
        </span>
      </div>
      <ul className="divide-y divide-line/60 max-h-[60vh] overflow-auto">
        {visible.map((k) => {
          const selected = selectedKitIds.has(k._id);
          return (
            <li
              key={k._id}
              className="px-5 py-3 flex items-center justify-between gap-3 text-sm hover:bg-surface-muted/50 transition-colors"
            >
              <label className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => onToggle(k._id, e.target.checked)}
                  className="mt-0.5 accent-accent"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-ink truncate">
                    #{k.kitNumber} · {k.kitName}
                  </div>
                  <div className="text-xs text-ink-muted truncate">
                    {k.concept} · Grade {k.grade} · {k.subject}
                  </div>
                </div>
              </label>
              <Badge tone={categoryTone(k.category)} size="sm">
                {k.category}
              </Badge>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="px-5 py-8 text-center text-sm text-ink-muted">
            No kits match this filter.
          </li>
        )}
      </ul>
    </Card>
  );
}
```

- [ ] **Step 2: Update `ClassCurriculum.tsx`**

```tsx
// src/pages/ClassCurriculum.tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import PageHeader from "../components/PageHeader";
import KitPicker from "../components/KitPicker";

export default function ClassCurriculum() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const links = useQuery(api.classKits.listForClass, { classId: id });
  const add = useMutation(api.classKits.add);
  const remove = useMutation(api.classKits.remove);

  if (!cls || !links) return <p className="text-sm text-ink-muted">Loading…</p>;
  const selectedIds = new Set<string>(links.map((l) => l.kitId as unknown as string));

  function onToggle(kitId: Id<"kits">, selected: boolean) {
    if (selected) {
      add({ classId: id, kitId });
    } else {
      const link = links!.find((l) => l.kitId === kitId);
      if (link) remove({ classKitId: link._id });
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Curriculum" },
        ]}
        title="Curriculum"
        description="Pick the kits you'll teach this class. Only your assigned kits are shown."
      />
      <KitPicker selectedKitIds={selectedIds} onToggle={onToggle} />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Smoke check**

Run: `npm run dev`, open a class's "Curriculum" page. Confirm: search filters, category toggle, badges shown, checkboxes toggle and persist. Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ClassCurriculum.tsx src/components/KitPicker.tsx
git commit -m "ui: KitPicker with search + category filter, polished curriculum page"
```

---

## Task 17: Score Sheet redesign — `ScoreRow` + `ScoreSheet`

**Files:**
- Modify: `src/components/ScoreRow.tsx`
- Modify: `src/pages/ScoreSheet.tsx`

- [ ] **Step 1: Replace `ScoreRow.tsx`**

```tsx
// src/components/ScoreRow.tsx
type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

const PILL_INACTIVE: Record<number, string> = {
  4: "border-good-200 text-good-800 hover:bg-good-50",
  3: "border-ok-50 text-ok-800 hover:bg-ok-50",
  2: "border-warn-50 text-warn-800 hover:bg-warn-50",
  1: "border-bad-200 text-bad-800 hover:bg-bad-50",
};
const PILL_ACTIVE: Record<number, string> = {
  4: "bg-good-400 text-white border-good-600 shadow-sm",
  3: "bg-ok-400 text-white border-ok-600 shadow-sm",
  2: "bg-warn-400 text-white border-warn-600 shadow-sm",
  1: "bg-bad-600 text-white border-bad-800 shadow-sm",
};
const PANEL: Record<number, string> = {
  4: "bg-good-50 border-good-200 text-good-800",
  3: "bg-ok-50 border-ok-400/30 text-ok-800",
  2: "bg-warn-50 border-warn-400/30 text-warn-800",
  1: "bg-bad-50 border-bad-200 text-bad-800",
};
const LABEL: Record<number, string> = {
  4: "Outstanding",
  3: "Proficient",
  2: "Developing",
  1: "Beginning",
};

export default function ScoreRow({
  criterion,
  score,
  onChange,
}: {
  criterion: Criterion;
  score: number;
  onChange: (v: number) => void;
}) {
  const chosen = score >= 1 && score <= 4 ? (score as 1 | 2 | 3 | 4) : null;
  const chosenText = chosen
    ? criterion[`c${chosen}` as "c1" | "c2" | "c3" | "c4"]
    : null;

  return (
    <div className="bg-surface border border-line/60 rounded-xl p-5 mb-3 shadow-card">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-ink">{criterion.label}</div>
          <div className="text-xs text-ink-muted">{criterion.sub}</div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`w-11 h-10 rounded-lg border-2 text-sm font-semibold transition-all ${
                chosen === v ? PILL_ACTIVE[v] : PILL_INACTIVE[v] + " bg-surface"
              }`}
              aria-label={`Score ${v} — ${LABEL[v]}`}
              aria-pressed={chosen === v}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {chosen ? (
        <div
          className={`border rounded-lg px-4 py-3 text-sm leading-snug ${PANEL[chosen]}`}
        >
          <div className="text-[11px] uppercase tracking-wide font-medium opacity-80 mb-1">
            {chosen} · {LABEL[chosen]}
          </div>
          {chosenText}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`text-left text-xs leading-snug border rounded-lg px-3 py-2.5 transition-colors ${PANEL[v]} hover:brightness-95`}
            >
              <div className="text-[10px] uppercase tracking-wide font-semibold opacity-80 mb-1">
                {v} · {LABEL[v]}
              </div>
              {criterion[`c${v}` as "c1" | "c2" | "c3" | "c4"]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Replace `ScoreSheet.tsx`**

```tsx
// src/pages/ScoreSheet.tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import ScoreRow from "../components/ScoreRow";
import SaveStatus, { type SaveState } from "../components/SaveStatus";
import { useDebounce } from "../lib/useDebouncedMutation";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Textarea } from "../components/ui/Input";
import { gradeBand, maxScore, scoredCount, totalOf } from "../lib/totals";

export default function ScoreSheet() {
  const { classId, studentId, kitId } = useParams<{
    classId: string;
    studentId: string;
    kitId: string;
  }>();
  const sid = studentId as Id<"students">;
  const kid = kitId as Id<"kits">;
  const cid = classId as Id<"classes">;

  const student = useQuery(api.students.get, { studentId: sid });
  const cls = useQuery(api.classes.get, { classId: cid });
  const kit = useQuery(api.kits.get, { kitId: kid });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kid });
  const score = useQuery(api.scores.get, { studentId: sid, kitId: kid });
  const upsert = useMutation(api.scores.upsert);

  const [criterionScores, setCriterionScores] = useState<Record<string, number>>({});
  const [observations, setObservations] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    if (score === undefined) return;
    setCriterionScores(score?.criterionScores ?? {});
    setObservations(score?.observations ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score?._id]);

  const debouncedSave = useDebounce(
    async (cs: Record<string, number>, obs: string) => {
      setSaveState("saving");
      try {
        await upsert({
          studentId: sid,
          kitId: kid,
          criterionScores: cs,
          observations: obs,
        });
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    },
    500,
  );

  function setScore(criterionId: string, v: number) {
    setCriterionScores((prev) => {
      const next = { ...prev, [criterionId]: v };
      debouncedSave(next, observations);
      return next;
    });
  }

  function setObs(v: string) {
    setObservations(v);
    debouncedSave(criterionScores, v);
  }

  const total = useMemo(() => totalOf(criterionScores), [criterionScores]);
  const criteriaCount = rubric?.criteria.length ?? 6;
  const max = maxScore(criteriaCount);
  const pct = max ? Math.round((total / max) * 100) : 0;
  const scored = scoredCount(criterionScores, criteriaCount);

  if (!student || !cls || !kit || !rubric)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          {
            label: student.name,
            to: `/class/${cls._id}/students/${student._id}/report`,
          },
          { label: kit.kitName },
        ]}
        title={student.name}
        description={
          <span className="inline-flex items-center gap-2 flex-wrap">
            <Badge tone={categoryTone(kit.category)} size="sm">
              {kit.category}
            </Badge>
            <span>
              #{kit.kitNumber} · {kit.kitName} · {kit.concept}
            </span>
          </span>
        }
      />

      <div className="sticky top-0 md:top-0 z-20 -mx-5 md:-mx-8 px-5 md:px-8 py-3 mb-5 bg-surface-sunken/95 backdrop-blur border-b border-line/60 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-serif text-3xl text-ink leading-none">
              {total}
              <span className="text-base text-ink-subtle">/{max}</span>
            </div>
            <div className="text-xs text-ink-muted mt-1">
              {scored === criteriaCount
                ? `${pct}% · ${gradeBand(pct)}`
                : `${scored} of ${criteriaCount} scored`}
            </div>
          </div>
        </div>
        <SaveStatus state={saveState} />
      </div>

      <div className="space-y-0">
        {rubric.criteria.map((c) => (
          <ScoreRow
            key={c.id}
            criterion={c}
            score={criterionScores[c.id] ?? 0}
            onChange={(v) => setScore(c.id, v)}
          />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader title="Teacher observations" />
        <CardBody>
          <Textarea
            rows={4}
            value={observations}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Notes on this session, things to revisit, safety observations…"
          />
        </CardBody>
      </Card>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Smoke check**

Run: `npm run dev`, open a score sheet from a student. Confirm:
- PageHeader with breadcrumbs, student name title, category badge in description
- Sticky total bar shows running total and SaveStatus
- Each criterion row shows the 4-column descriptor grid until you pick a score; after picking, only the chosen descriptor panel is shown
- Picking a score shows "Saving…" then "Saved" within a second
- Observations textarea persists

Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/components/ScoreRow.tsx src/pages/ScoreSheet.tsx
git commit -m "ui: score sheet — sticky total, SaveStatus, per-row descriptor reveal"
```

---

## Task 18: Student Report redesign

**Files:**
- Modify: `src/pages/StudentReport.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/pages/StudentReport.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  downloadStudentReport,
  type ScoredKit,
} from "../components/StudentReportPdf";
import { totalOf, maxScore, gradeBand } from "../lib/totals";

const SCORE_BADGE: Record<number, "good" | "ok" | "warn" | "bad" | "neutral"> = {
  4: "good",
  3: "ok",
  2: "warn",
  1: "bad",
  0: "neutral",
};

export default function StudentReport() {
  const { classId, studentId } = useParams<{ classId: string; studentId: string }>();
  const sid = studentId as Id<"students">;
  const cls = useQuery(api.classes.get, { classId: classId as Id<"classes"> });
  const student = useQuery(api.students.get, { studentId: sid });
  const scored = useQuery(api.scores.listForStudent, { studentId: sid });

  if (!cls || !student || !scored)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  const filtered = scored.filter(
    (s): s is typeof s & {
      kit: NonNullable<typeof s.kit>;
      rubric: NonNullable<typeof s.rubric>;
    } => s.kit !== null && s.rubric !== null,
  );

  const pdfRows: ScoredKit[] = filtered.map((s) => ({
    kit: {
      kitNumber: s.kit.kitNumber,
      kitName: s.kit.kitName,
      concept: s.kit.concept,
      category: s.kit.category,
    },
    rubric: { criteria: s.rubric.criteria },
    criterionScores: s.criterionScores,
    observations: s.observations,
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          { label: student.name },
        ]}
        title={`${student.name} · Report`}
        description={`Grade ${cls.grade} · ${cls.academicYear}`}
        actions={
          <Button
            onClick={() => downloadStudentReport(student.name, cls.name, pdfRows)}
            disabled={filtered.length === 0}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No assessments yet"
          description="Score this student against at least one kit to generate a report."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((sk) => {
            const total = totalOf(sk.criterionScores);
            const max = maxScore(sk.rubric.criteria.length);
            const pct = max ? Math.round((total / max) * 100) : 0;
            return (
              <li key={sk._id}>
                <Card>
                  <CardBody>
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="font-medium text-ink">
                          #{sk.kit.kitNumber} · {sk.kit.kitName}
                        </div>
                        <div className="text-xs text-ink-muted mt-0.5 inline-flex items-center gap-2">
                          <Badge tone={categoryTone(sk.kit.category)} size="sm">
                            {sk.kit.category}
                          </Badge>
                          {sk.kit.concept}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-2xl text-ink leading-none">
                          {total}
                          <span className="text-sm text-ink-subtle">/{max}</span>
                        </div>
                        <div className="text-xs text-ink-muted mt-1">
                          {pct}% · {gradeBand(pct)}
                        </div>
                      </div>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                      {sk.rubric.criteria.map((c) => {
                        const v = sk.criterionScores[c.id] ?? 0;
                        return (
                          <li
                            key={c.id}
                            className="flex items-center justify-between gap-2 text-xs"
                          >
                            <span className="text-ink-muted truncate">
                              {c.label}
                            </span>
                            <Badge tone={SCORE_BADGE[v]} size="sm">
                              {v > 0 ? `${v}/4` : "—"}
                            </Badge>
                          </li>
                        );
                      })}
                    </ul>
                    {sk.observations && (
                      <p className="text-xs text-ink-muted mt-3 italic border-t border-line/60 pt-3">
                        "{sk.observations}"
                      </p>
                    )}
                  </CardBody>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Smoke check**

Run: `npm run dev`, open a student report. Confirm: PageHeader with Download action, kit cards with score badges per criterion, observations shown when present. Click Download to verify PDF still works. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/StudentReport.tsx
git commit -m "ui: student report — score badges per criterion, polished cards"
```

---

## Task 19: Class Report redesign — colored matrix

**Files:**
- Modify: `src/pages/ClassReport.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/pages/ClassReport.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { downloadClassReport } from "../components/ClassReportPdf";
import { totalOf, maxScore } from "../lib/totals";
import { toneFromRatio } from "../lib/progress";

const TONE_BG: Record<string, string> = {
  good: "bg-good-50 text-good-800",
  ok: "bg-ok-50 text-ok-800",
  warn: "bg-warn-50 text-warn-800",
  bad: "bg-bad-50 text-bad-800",
  neutral: "bg-surface-muted text-ink-subtle",
};

export default function ClassReport() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const blocks = useQuery(api.scores.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });

  if (!cls || !blocks || !kits)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  const cleaned = blocks.map((b) => ({
    student: { name: b.student.name },
    scores: b.scores
      .filter(
        (s): s is typeof s & {
          kit: NonNullable<typeof s.kit>;
          rubric: NonNullable<typeof s.rubric>;
        } => s.kit !== null && s.rubric !== null,
      )
      .map((s) => ({
        kit: { kitNumber: s.kit.kitNumber, kitName: s.kit.kitName },
        rubric: { criteria: s.rubric.criteria.map((c) => ({ id: c.id })) },
        criterionScores: s.criterionScores,
        _id: s._id,
      })),
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Report" },
        ]}
        title={`${cls.name} · Class report`}
        description={`Grade ${cls.grade} · ${cls.academicYear}`}
        actions={
          <Button
            onClick={() => downloadClassReport(cls.name, cleaned)}
            disabled={cleaned.length === 0}
          >
            <Download className="w-4 h-4" />
            Download all (PDF)
          </Button>
        }
      />

      {cleaned.length === 0 ? (
        <EmptyState
          title="No students"
          description="Add students to this class to generate a report."
        />
      ) : kits.length === 0 ? (
        <EmptyState
          title="No curriculum"
          description="Attach kits to this class to start scoring."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-muted">
                  <th className="sticky left-0 bg-surface-muted text-left px-4 py-2.5 text-xs uppercase tracking-wide font-medium text-ink-muted border-b border-r border-line/60 min-w-[180px]">
                    Student
                  </th>
                  {kits.map((k) => (
                    <th
                      key={k._id}
                      className="px-3 py-2.5 text-[11px] font-medium text-ink-muted border-b border-line/60 text-center min-w-[80px]"
                      title={k.kit!.kitName}
                    >
                      #{k.kit!.kitNumber}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cleaned.map((b, i) => {
                  const byKit = new Map<string, (typeof b.scores)[number]>();
                  for (const s of b.scores)
                    byKit.set(String(s.kit.kitNumber), s);
                  return (
                    <tr key={i} className="border-b border-line/60 last:border-b-0">
                      <td className="sticky left-0 bg-surface px-4 py-2.5 font-medium text-ink border-r border-line/60 truncate max-w-[200px]">
                        {b.student.name}
                      </td>
                      {kits.map((k) => {
                        const s = byKit.get(String(k.kit!.kitNumber));
                        if (!s) {
                          return (
                            <td
                              key={k._id}
                              className="px-3 py-2.5 text-center text-xs text-ink-subtle"
                            >
                              —
                            </td>
                          );
                        }
                        const total = totalOf(s.criterionScores);
                        const max = maxScore(s.rubric.criteria.length);
                        const ratio = max ? total / max : 0;
                        const tone = toneFromRatio(ratio);
                        return (
                          <td key={k._id} className="px-1.5 py-1.5 text-center">
                            <span
                              className={`inline-block min-w-[44px] rounded px-2 py-1 text-xs font-medium ${TONE_BG[tone]}`}
                            >
                              {total}/{max}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Smoke check**

Run: `npm run dev`, open a class report. Confirm: colored matrix with sticky student column, "—" for unscored cells, Download still works. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ClassReport.tsx
git commit -m "ui: class report matrix — sticky columns, color-coded totals"
```

---

## Task 20: Admin Dashboard redesign

**Files:**
- Modify: `src/pages/AdminDashboard.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState, useMemo } from "react";
import { Boxes, Search, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function AdminDashboard() {
  const teachers = useQuery(api.profiles.listTeachers);
  const [selectedTeacher, setSelected] = useState<Id<"profiles"> | null>(null);
  const teacherRows = useMemo(
    () => teachers?.filter((t) => t.role === "teacher") ?? [],
    [teachers],
  );

  const selected = teacherRows.find((t) => t._id === selectedTeacher);

  return (
    <>
      <PageHeader
        title="Teachers"
        description="Assign kits to teachers. They can only score against their assigned kits."
        actions={
          <Link to="/admin/kits">
            <Button variant="secondary">
              <Boxes className="w-4 h-4" />
              Browse kits
            </Button>
          </Link>
        }
      />

      {teacherRows.length === 0 ? (
        <EmptyState
          title="No teachers yet"
          description="Share the sign-up link with your teachers."
        />
      ) : (
        <Card>
          <CardBody padding="none">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-ink-muted border-b border-line/60">
                  <th className="px-5 py-2.5 font-medium">Name</th>
                  <th className="px-5 py-2.5 font-medium">Email</th>
                  <th className="px-5 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacherRows.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-line/60 last:border-b-0 hover:bg-surface-muted/50"
                  >
                    <td className="px-5 py-3 font-medium text-ink">
                      {t.displayName}
                    </td>
                    <td className="px-5 py-3 text-ink-muted">{t.email}</td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelected(t._id)}
                      >
                        Manage kits
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}

      {selected && (
        <AssignmentsDrawer
          teacher={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

function AssignmentsDrawer({
  teacher,
  onClose,
}: {
  teacher: { _id: Id<"profiles">; displayName: string; email: string };
  onClose: () => void;
}) {
  const kits = useQuery(api.kits.list);
  const assigned = useQuery(api.assignments.listForTeacher, {
    teacherProfileId: teacher._id,
  });
  const setAssign = useMutation(api.assignments.set);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "Explorer" | "Discoverer">(
    "all",
  );

  const assignedSet = useMemo(
    () => new Set(assigned?.map((a) => a.kitId) ?? []),
    [assigned],
  );

  const visible = useMemo(() => {
    if (!kits) return [];
    const lq = q.trim().toLowerCase();
    return kits.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq)
      );
    });
  }, [kits, q, filter]);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div
        className="absolute inset-0 bg-ink/30"
        onClick={onClose}
        aria-hidden
      />
      <aside className="relative w-full max-w-md bg-surface shadow-pop h-full flex flex-col">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <div className="min-w-0">
            <div className="font-medium text-ink truncate">
              {teacher.displayName}
            </div>
            <div className="text-xs text-ink-muted truncate">
              {teacher.email} · {assignedSet.size} of {kits?.length ?? 0} assigned
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="px-5 py-3 border-b border-line/60 flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[150px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search kits…"
              className="pl-9"
            />
          </div>
          <div className="flex gap-1 bg-surface-muted rounded-md p-1">
            {(["all", "Explorer", "Discoverer"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 h-7 rounded text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-surface text-ink shadow-card"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y divide-line/60">
          {visible.map((k) => {
            const checked = assignedSet.has(k._id);
            return (
              <li
                key={k._id}
                className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
              >
                <label className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setAssign({
                        teacherProfileId: teacher._id,
                        kitId: k._id,
                        assigned: e.target.checked,
                      })
                    }
                    className="mt-0.5 accent-accent"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      #{k.kitNumber} · {k.kitName}
                    </div>
                    <div className="text-xs text-ink-muted truncate">
                      Grade {k.grade} · {k.subject}
                    </div>
                  </div>
                </label>
                <Badge tone={categoryTone(k.category)} size="sm">
                  {k.category}
                </Badge>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Smoke check**

Sign in as admin (an email in `ADMIN_EMAILS`). Visit `/admin`. Click "Manage kits" — drawer slides in, search + filter work, checkbox toggle persists. Close drawer via X or backdrop. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AdminDashboard.tsx
git commit -m "ui: admin dashboard — teacher table with side-drawer assignment"
```

---

## Task 21: Admin Kits redesign — search + filter + grid

**Files:**
- Modify: `src/pages/AdminKits.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/pages/AdminKits.tsx
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";

export default function AdminKits() {
  const kits = useQuery(api.kits.list);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "Explorer" | "Discoverer">(
    "all",
  );

  const visible = useMemo(() => {
    if (!kits) return [];
    const lq = q.trim().toLowerCase();
    return kits.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        k.concept.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq) ||
        k.subject.toLowerCase().includes(lq)
      );
    });
  }, [kits, q, filter]);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Kits" }]}
        title="Kits"
        description={`${kits?.length ?? "…"} total · click any kit to edit its rubric.`}
      />

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, concept, number, or subject…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 bg-surface-muted rounded-md p-1">
          {(["all", "Explorer", "Discoverer"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 h-8 rounded text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-surface text-ink shadow-card"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <span className="text-xs text-ink-muted ml-auto">
          {visible.length} shown
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {visible.map((k) => (
          <Link key={k._id} to={`/admin/rubrics/${k._id}`} className="group">
            <Card className="hover:shadow-pop hover:-translate-y-0.5 transition-all h-full">
              <CardBody>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-xs text-ink-subtle font-medium">
                    #{k.kitNumber}
                  </div>
                  <Badge tone={categoryTone(k.category)} size="sm">
                    {k.category}
                  </Badge>
                </div>
                <div className="font-medium text-ink mb-1 group-hover:text-accent transition-colors">
                  {k.kitName}
                </div>
                <div className="text-xs text-ink-muted line-clamp-2">
                  {k.concept}
                </div>
                <div className="text-[11px] text-ink-subtle mt-3 pt-3 border-t border-line/60">
                  Grade {k.grade} · {k.subject}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
        {visible.length === 0 && kits && (
          <p className="col-span-full text-center text-sm text-ink-muted py-12">
            No kits match these filters.
          </p>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Smoke check**

As admin, visit `/admin/kits`. Confirm: search filters by name/concept/subject/number, category toggle, card grid, hover lift, click → edit rubric page. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AdminKits.tsx
git commit -m "ui: admin kits — searchable card grid with category filter"
```

---

## Task 22: Edit Rubric + Seed Page polish

**Files:**
- Modify: `src/pages/EditRubric.tsx`
- Modify: `src/pages/SeedPage.tsx`

- [ ] **Step 1: Replace `EditRubric.tsx`**

```tsx
// src/pages/EditRubric.tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";

type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

const LEVEL_LABELS: Record<string, string> = {
  c4: "4 · Outstanding",
  c3: "3 · Proficient",
  c2: "2 · Developing",
  c1: "1 · Beginning",
};

export default function EditRubric() {
  const { kitId } = useParams<{ kitId: string }>();
  const kit = useQuery(api.kits.get, { kitId: kitId as Id<"kits"> });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kitId as Id<"kits"> });
  const update = useMutation(api.rubrics.update);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (rubric) setCriteria(rubric.criteria);
  }, [rubric]);

  if (!kit || !rubric)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  function patch(idx: number, key: keyof Criterion, value: string) {
    setCriteria((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)),
    );
  }

  async function save() {
    if (!kit) return;
    setSaving(true);
    try {
      await update({ kitId: kit._id, criteria });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", to: "/admin" },
          { label: "Kits", to: "/admin/kits" },
          { label: kit.kitName },
        ]}
        title={kit.kitName}
        description={
          <span className="inline-flex items-center gap-2">
            <Badge tone={categoryTone(kit.category)} size="sm">
              {kit.category}
            </Badge>
            <span>
              #{kit.kitNumber} · {kit.concept} · Grade {kit.grade}
            </span>
          </span>
        }
        actions={
          <>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm text-good-600">
                <CheckCircle2 className="w-4 h-4" />
                Saved
              </span>
            )}
            <Button onClick={save} loading={saving}>
              Save rubric
            </Button>
          </>
        }
      />

      <div className="space-y-4">
        {criteria.map((c, i) => (
          <Card key={c.id}>
            <CardBody>
              <div className="space-y-2 mb-4">
                <Input
                  value={c.label}
                  onChange={(e) => patch(i, "label", e.target.value)}
                  className="font-medium"
                  placeholder="Criterion label"
                />
                <Input
                  value={c.sub}
                  onChange={(e) => patch(i, "sub", e.target.value)}
                  className="text-xs"
                  placeholder="Subtitle"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(["c4", "c3", "c2", "c1"] as const).map((k) => (
                  <label key={k} className="block">
                    <span className="text-[10px] uppercase tracking-wide font-medium text-ink-muted">
                      {LEVEL_LABELS[k]}
                    </span>
                    <Textarea
                      rows={3}
                      value={c[k]}
                      onChange={(e) => patch(i, k, e.target.value)}
                      className="mt-1"
                    />
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Replace `SeedPage.tsx`**

```tsx
// src/pages/SeedPage.tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Sprout } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function SeedPage() {
  const count = useQuery(api.kits.count);
  const seed = useMutation(api.seed.seedKitsAndRubrics);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    try {
      const r = await seed({});
      setResult(
        `Inserted ${r.kitsInserted} kits (${r.kitsSkipped} skipped), ${r.rubricsInserted} rubrics (${r.rubricsSkipped} skipped).`,
      );
    } catch (e: unknown) {
      setResult(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Seed" }]}
        title="Seed kits & rubrics"
        description="One-time setup. Safe to re-run — only missing rows are inserted."
      />
      <Card>
        <CardBody>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-good-50 text-good-600 inline-flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-ink">
                Current kit count in database:{" "}
                <strong className="text-ink">{count ?? "…"}</strong>
              </p>
              <p className="text-xs text-ink-muted mt-1">
                Inserts kits from <code>convex/seed/kits.ts</code> and rubrics
                from <code>convex/seed/rubrics.ts</code>. Existing rubrics are
                preserved.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={run} loading={busy}>
                  Run seed
                </Button>
                {result && (
                  <span className="text-sm text-ink-muted">{result}</span>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Smoke check**

As admin: open `/admin/seed` and `/admin/rubrics/<any-kit-id>`. Confirm: PageHeader present; rubric editor shows criteria in cards with 2-col grid of level descriptors; Save button shows loading and "Saved" indicator. Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/EditRubric.tsx src/pages/SeedPage.tsx
git commit -m "ui: polished edit rubric + seed pages"
```

---

## Task 23: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run the build**

Run: `npm run build`
Expected: success, no TypeScript errors, no warnings other than expected ones.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: clean (or only pre-existing warnings unrelated to this work).

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: all tests pass (`progress` + `ProgressBar` suites).

- [ ] **Step 4: Manual page walk-through**

Run: `npm run dev` and click through, end-to-end, in this order. Confirm each page renders with no console errors:

1. `/sign-in` — two-column layout, brand panel left.
2. `/sign-up` — same, with hint text under password.
3. `/` (Classes) — stats row + class cards (or empty state).
4. Create a new class via "New class" button.
5. Open a class → curriculum + students cards, breadcrumbs.
6. `/class/:id/curriculum` — search + category toggle work.
7. Add a student. Click "Score" dropdown → pick a kit → score sheet.
8. `ScoreSheet` — sticky total bar, click pills, see SaveStatus go saving→saved, observations save.
9. `/class/:id/students/:id/report` — kit cards with score badges; Download PDF works.
10. `/class/:id/report` — colored matrix; Download all (PDF) works.
11. `/reports` — list of classes.
12. As admin: `/admin` — teacher table + drawer.
13. `/admin/kits` — search + filter + card grid.
14. `/admin/rubrics/:id` — Save + Saved indicator.
15. `/admin/seed` — render + Run seed.
16. Resize browser <768px — sidebar collapses, hamburger opens drawer, all pages still readable.

Stop server.

- [ ] **Step 5: Confirm `TopBar` is gone**

Run: `Get-ChildItem src -Recurse -Filter TopBar.tsx`
Expected: no results.

Search for any leftover imports:

Run a grep via your tool of choice for `TopBar` across `src/`. Expected: no matches.

- [ ] **Step 6: Final commit (only if anything still uncommitted)**

```bash
git status
```

If there are stray changes (e.g. unused imports caught during the walk-through), fix them and commit:

```bash
git add -p
git commit -m "ui: cleanup stragglers from visual upgrade"
```

If `git status` is clean, no final commit is needed.

---

## Self-Review Notes (filled in after writing)

**Spec coverage check:** Every spec section maps to a task:
- §3 App shell → Tasks 9–10
- §4.1 Card → Task 2
- §4.2 PageHeader → Task 7
- §4.3 Badge → Task 3
- §4.4 StatCard → Task 6
- §4.5 ProgressBar → Tasks 4–5
- §4.6 SaveStatus → Task 8
- §4.7 Sidebar → Task 9
- §5 Routes (`/reports`) → Task 14
- §6.1 Auth pages → Task 12
- §6.2 Teacher Dashboard → Task 13
- §6.3 Class Detail → Task 15
- §6.4 Score Sheet → Task 17
- §6.5 Student Report → Task 18
- §6.6 Class Report → Task 19
- §6.7 Reports Index → Task 14
- §6.8 Admin Dashboard → Task 20
- §6.9 Admin Kits → Task 21
- §6.10 Edit Rubric → Task 22
- §6.11 Seed Page → Task 22
- §7 Token additions → Task 1
- §8 Repo layout → covered across tasks
- §9 Implementation order → matches task order
