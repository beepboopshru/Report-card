# Frontend Production-Grade Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take the working-but-utilitarian frontend to a crisp modern SaaS look with proper UX hardening (skeletons, save indicator, toasts, confirms, error boundary), via hand-rolled primitives and a page-by-page migration. No new features.

**Architecture:** Introduce `src/components/ui/` housing small typed primitives (Button, Input, FormField, Card, Badge, Skeleton, Dialog, ConfirmDialog, Toast) styled with class-variance-authority. Retune `tailwind.config.ts` with semantic color tokens. Wire `ErrorBoundary` + `ToastProvider` at the root and `Layout` into routes. Extend `useDebouncedMutation` with a save-state machine. Migrate every page to consume primitives and render shaped skeletons while `useQuery` is loading.

**Tech Stack:** Vite 8, React 19, TypeScript, Tailwind CSS 4 (config-based), Convex 1.39, React Router 7, `class-variance-authority` (new), Vitest + Testing Library.

**Reference spec:** [docs/superpowers/specs/2026-05-27-frontend-production-grade-design.md](../specs/2026-05-27-frontend-production-grade-design.md)

---

## Conventions

- **Commit cadence:** after every task that ends green (build/lint/tests). Multiple commits per page migration are fine.
- **Commit message format:** `ui: <short imperative>` (matches recent commits in this repo).
- **All tests:** in `tests/` mirroring `src/` paths, e.g. `tests/components/ui/button.test.tsx`.
- **Path style in code:** import via relative paths (`../components/ui/Button`), the repo has no path alias today.
- **No new deps beyond `class-variance-authority`.** If you reach for one, stop and re-read the spec.

---

## Task 1: Setup — add cva, delete unused App.css, scaffold ui/ folder

**Files:**
- Modify: `package.json` (add dep)
- Delete: `src/App.css` (unused Vite template leftover; no import references it)
- Create: `src/components/ui/.gitkeep`

- [ ] **Step 1: Install class-variance-authority**

Run:
```powershell
npm install class-variance-authority@^0.7.1
```
Expected: `package.json` now lists `class-variance-authority` under `dependencies`. `npm ls class-variance-authority` resolves cleanly.

- [ ] **Step 2: Verify `src/App.css` is unused**

Run:
```powershell
Select-String -Path src\**\*.ts,src\**\*.tsx -Pattern "App\.css" -SimpleMatch
```
Expected: no matches.

- [ ] **Step 3: Delete `src/App.css`**

Run:
```powershell
Remove-Item -Path "src/App.css"
```

- [ ] **Step 4: Create empty ui/ folder marker**

Create `src/components/ui/.gitkeep` with empty content.

- [ ] **Step 5: Verify build still passes**

Run: `npm run build`
Expected: build succeeds, no references to deleted file.

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json src/components/ui/.gitkeep
git rm src/App.css
git commit -m "ui: add cva, remove unused App.css, scaffold ui/"
```

---

## Task 2: Add semantic color tokens to Tailwind config

**Files:**
- Modify: `tailwind.config.ts`

**Context:** Existing palette (`accent`, `good`, `ok`, `warn`, `bad`) is preserved because `ScoreRow` and the PDFs depend on it. We ADD semantic neutral tokens for surfaces/borders/text and danger/success aliases.

- [ ] **Step 1: Replace `tailwind.config.ts` with new tokens**

Replace the entire file contents with:

```ts
import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#0F6E56", deep: "#085041" },
        // Semantic neutrals for crisp SaaS look
        surface: { DEFAULT: "#FFFFFF", muted: "#F7F7F8", sunken: "#FAFAF8" },
        ink: { DEFAULT: "#0F1115", muted: "#5B6470", subtle: "#8A93A0" },
        line: { DEFAULT: "#E5E7EB", strong: "#D1D5DB" },
        // Existing scoring palette (used by ScoreRow + PDFs — do not remove)
        good: { 50: "#E1F5EE", 200: "#9FE1CB", 400: "#1D9E75", 600: "#0F6E56", 800: "#085041" },
        ok:   { 50: "#EAF3DE", 400: "#639922", 600: "#3B6D11", 800: "#27500A" },
        warn: { 50: "#FAEEDA", 400: "#EF9F27", 600: "#854F0B", 800: "#633806" },
        bad:  { 50: "#FCEBEB", 200: "#F09595", 600: "#A32D2D", 800: "#791F1F" },
        // Status aliases for primitives
        danger:  { DEFAULT: "#A32D2D", soft: "#FCEBEB" },
        success: { DEFAULT: "#0F6E56", soft: "#E1F5EE" },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15, 17, 21, 0.04), 0 1px 3px 0 rgba(15, 17, 21, 0.06)",
        pop:  "0 8px 24px -8px rgba(15, 17, 21, 0.18), 0 2px 6px -2px rgba(15, 17, 21, 0.08)",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
} satisfies Config;
```

- [ ] **Step 2: Build to confirm no class-name collisions**

Run: `npm run build`
Expected: success. (We added classes; existing classes still resolve.)

- [ ] **Step 3: Commit**

```powershell
git add tailwind.config.ts
git commit -m "ui: add semantic neutral + status tokens to tailwind config"
```

---

## Task 3: Refresh global stylesheet (`index.css`)

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace `src/index.css` with**

```css
@import "tailwindcss";

@layer base {
  html { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  body { @apply bg-surface-sunken text-ink font-sans antialiased; }

  /* Consistent focus ring */
  :where(button, a, input, textarea, select, [tabindex]):focus-visible {
    @apply outline-none ring-2 ring-accent/40 ring-offset-2 ring-offset-surface-sunken rounded;
  }

  /* Inputs get a subtle hover/focus border */
  input, textarea, select { @apply border-line; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
}
```

- [ ] **Step 2: Run app, verify nothing visually exploded**

Run: `npm run dev` and open `http://localhost:5173/sign-in`.
Expected: page renders with new neutral background, focus ring appears on tabbed inputs. Stop the dev server.

- [ ] **Step 3: Commit**

```powershell
git add src/index.css
git commit -m "ui: global tokens, focus ring, body styles"
```

---

## Task 4: `Button` primitive + test

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `tests/components/ui/button.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ui/button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../../../src/components/ui/Button";

describe("Button", () => {
  it("renders children and is a button by default", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button", { name: "Save" });
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("BUTTON");
  });

  it("applies the danger variant class", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-danger");
  });

  it("renders a spinner and disables when loading", () => {
    render(<Button loading>Save</Button>);
    const el = screen.getByRole("button");
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-busy", "true");
  });
});
```

- [ ] **Step 2: Run test, confirm it fails**

Run: `npm run test -- button`
Expected: fails — `Button` module not found.

- [ ] **Step 3: Implement `Button`**

Create `src/components/ui/Button.tsx`:

```tsx
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center gap-1.5 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary:   "bg-accent text-white hover:bg-accent-deep",
        secondary: "bg-surface border border-line text-ink hover:bg-surface-muted",
        ghost:     "text-ink hover:bg-surface-muted",
        danger:    "bg-danger text-white hover:bg-danger/90",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & { loading?: boolean };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant, size, loading, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={button({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="w-3 h-3 rounded-full border-2 border-current border-r-transparent animate-spin"
        />
      )}
      {children}
    </button>
  );
});
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `npm run test -- button`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add src/components/ui/Button.tsx tests/components/ui/button.test.tsx
git commit -m "ui: Button primitive (cva variants, loading state)"
```

---

## Task 5: `Input`, `Textarea`, `Label`, `FormField` primitives + test

**Files:**
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/FormField.tsx`
- Create: `tests/components/ui/form-field.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ui/form-field.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "../../../src/components/ui/FormField";
import { Input } from "../../../src/components/ui/Input";

describe("FormField", () => {
  it("links label, control, and error via aria", () => {
    render(
      <FormField label="Email" error="Required">
        {(id, describedBy) => <Input id={id} aria-describedby={describedBy} />}
      </FormField>,
    );
    const input = screen.getByLabelText("Email");
    const desc = input.getAttribute("aria-describedby");
    expect(desc).toBeTruthy();
    expect(screen.getByText("Required").id).toBe(desc);
  });

  it("omits aria-describedby when no error", () => {
    render(
      <FormField label="Name">
        {(id, describedBy) => <Input id={id} aria-describedby={describedBy} />}
      </FormField>,
    );
    expect(screen.getByLabelText("Name").getAttribute("aria-describedby")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test, confirm fails**

Run: `npm run test -- form-field`
Expected: modules not found.

- [ ] **Step 3: Implement `Input.tsx`**

Create `src/components/ui/Input.tsx`:

```tsx
import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle " +
  "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className = "", ...rest }, ref) {
    return <input ref={ref} className={`${base} ${className}`} {...rest} />;
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className = "", ...rest }, ref) {
    return <textarea ref={ref} className={`${base} ${className}`} {...rest} />;
  },
);
```

- [ ] **Step 4: Implement `FormField.tsx`**

Create `src/components/ui/FormField.tsx`:

```tsx
import { useId, type ReactNode } from "react";

export function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium uppercase tracking-wide text-ink-muted"
    >
      {children}
    </label>
  );
}

export function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      {children(id, describedBy)}
      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Run tests, confirm pass**

Run: `npm run test -- form-field`
Expected: both tests pass.

- [ ] **Step 6: Commit**

```powershell
git add src/components/ui/Input.tsx src/components/ui/FormField.tsx tests/components/ui/form-field.test.tsx
git commit -m "ui: Input, Textarea, FormField, Label primitives"
```

---

## Task 6: `Card` primitives

**Files:**
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 1: Implement `Card.tsx`**

Create `src/components/ui/Card.tsx`:

```tsx
import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface border border-line rounded-lg shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-3 border-b border-line flex items-center justify-between">
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-3 border-t border-line flex items-center justify-end gap-2">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Build to confirm syntax**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add src/components/ui/Card.tsx
git commit -m "ui: Card, CardHeader, CardBody, CardFooter"
```

---

## Task 7: `Badge` primitive

**Files:**
- Create: `src/components/ui/Badge.tsx`

- [ ] **Step 1: Implement `Badge.tsx`**

Create `src/components/ui/Badge.tsx`:

```tsx
import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border",
  {
    variants: {
      variant: {
        neutral: "bg-surface-muted text-ink-muted border-line",
        accent:  "bg-success-soft text-accent-deep border-good-200",
        success: "bg-success-soft text-success border-good-200",
        warning: "bg-warn-50 text-warn-800 border-warn-400",
        danger:  "bg-danger-soft text-danger border-bad-200",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

type Props = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>;

export function Badge({ className, variant, ...rest }: Props) {
  return <span className={badge({ variant, className })} {...rest} />;
}
```

- [ ] **Step 2: Build to confirm**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add src/components/ui/Badge.tsx
git commit -m "ui: Badge primitive"
```

---

## Task 8: `Skeleton` primitives

**Files:**
- Create: `src/components/ui/Skeleton.tsx`

- [ ] **Step 1: Implement `Skeleton.tsx`**

Create `src/components/ui/Skeleton.tsx`:

```tsx
import type { HTMLAttributes } from "react";

export function Skeleton({
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={`animate-pulse bg-surface-muted rounded ${className}`}
      {...rest}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3"
          style={{ width: `${100 - i * 8}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-3">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add src/components/ui/Skeleton.tsx
git commit -m "ui: Skeleton, SkeletonText, SkeletonRow"
```

---

## Task 9: Rewrite `EmptyState` with icon support

**Files:**
- Modify: `src/components/EmptyState.tsx`

- [ ] **Step 1: Replace `src/components/EmptyState.tsx`**

```tsx
import type { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-line rounded-lg p-10 text-center bg-surface">
      {icon && (
        <div className="mx-auto mb-3 text-ink-subtle w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="text-sm text-ink-muted mt-1 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success — `EmptyState` is consumed by `TeacherDashboard` and `ClassDetail`, both still type-check because we only added an optional prop.

- [ ] **Step 3: Commit**

```powershell
git add src/components/EmptyState.tsx
git commit -m "ui: EmptyState with optional icon, neutral palette"
```

---

## Task 10: `Dialog` primitive (portal, ESC, backdrop, focus)

**Files:**
- Create: `src/components/ui/Dialog.tsx`
- Create: `tests/components/ui/dialog.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ui/dialog.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Dialog, DialogTitle, DialogBody } from "../../../src/components/ui/Dialog";

describe("Dialog", () => {
  it("renders content when open and not when closed", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Dialog open={false} onClose={onClose}>
        <DialogTitle>Hi</DialogTitle>
        <DialogBody>Body</DialogBody>
      </Dialog>,
    );
    expect(screen.queryByText("Hi")).toBeNull();
    rerender(
      <Dialog open onClose={onClose}>
        <DialogTitle>Hi</DialogTitle>
        <DialogBody>Body</DialogBody>
      </Dialog>,
    );
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("calls onClose on Escape", () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose}>
        <DialogTitle>Hi</DialogTitle>
      </Dialog>,
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop clicked", () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose}>
        <DialogTitle>Hi</DialogTitle>
      </Dialog>,
    );
    fireEvent.click(screen.getByTestId("dialog-backdrop"));
    expect(onClose).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test, confirm fails**

Run: `npm run test -- dialog`
Expected: module not found.

- [ ] **Step 3: Implement `Dialog.tsx`**

Create `src/components/ui/Dialog.tsx`:

```tsx
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Dialog({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the dialog container after mount
    queueMicrotask(() => ref.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        data-testid="dialog-backdrop"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative bg-surface rounded-lg shadow-pop border border-line w-full max-w-md outline-none"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="px-5 pt-5 pb-2 text-base font-semibold text-ink">{children}</h2>
  );
}

export function DialogBody({ children }: { children: ReactNode }) {
  return <div className="px-5 pb-4 text-sm text-ink-muted">{children}</div>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-3 border-t border-line flex justify-end gap-2 bg-surface-muted rounded-b-lg">
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `npm run test -- dialog`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add src/components/ui/Dialog.tsx tests/components/ui/dialog.test.tsx
git commit -m "ui: Dialog with portal, ESC + backdrop close, body scroll lock"
```

---

## Task 11: `ConfirmDialog` + `useConfirm` imperative hook

**Files:**
- Create: `src/components/ui/ConfirmDialog.tsx`
- Create: `tests/components/ui/confirm-dialog.test.tsx`

**Approach:** A `ConfirmProvider` mounts a single `Dialog` and exposes `useConfirm()` returning `(opts) => Promise<boolean>`. The provider keeps a ref to the resolver of the pending promise.

- [ ] **Step 1: Write the failing test**

Create `tests/components/ui/confirm-dialog.test.tsx`:

```tsx
import { act, render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  ConfirmProvider,
  useConfirm,
} from "../../../src/components/ui/ConfirmDialog";

function Harness({ onResult }: { onResult: (v: boolean) => void }) {
  const confirm = useConfirm();
  return (
    <button
      onClick={async () => {
        const ok = await confirm({ title: "Remove?", body: "Sure?" });
        onResult(ok);
      }}
    >
      open
    </button>
  );
}

describe("useConfirm", () => {
  it("resolves true when Confirm clicked", async () => {
    const onResult = vi.fn();
    render(
      <ConfirmProvider>
        <Harness onResult={onResult} />
      </ConfirmProvider>,
    );
    fireEvent.click(screen.getByText("open"));
    expect(await screen.findByText("Remove?")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    await act(() => Promise.resolve());
    expect(onResult).toHaveBeenCalledWith(true);
  });

  it("resolves false when Cancel clicked", async () => {
    const onResult = vi.fn();
    render(
      <ConfirmProvider>
        <Harness onResult={onResult} />
      </ConfirmProvider>,
    );
    fireEvent.click(screen.getByText("open"));
    await screen.findByText("Remove?");
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    await act(() => Promise.resolve());
    expect(onResult).toHaveBeenCalledWith(false);
  });
});
```

- [ ] **Step 2: Run test, confirm fails**

Run: `npm run test -- confirm-dialog`
Expected: module not found.

- [ ] **Step 3: Implement `ConfirmDialog.tsx`**

Create `src/components/ui/ConfirmDialog.tsx`:

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Dialog, DialogTitle, DialogBody, DialogFooter } from "./Dialog";
import { Button } from "./Button";

type ConfirmOptions = {
  title: string;
  body?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

type Ctx = (opts: ConfirmOptions) => Promise<boolean>;
const ConfirmCtx = createContext<Ctx | null>(null);

export function useConfirm(): Ctx {
  const ctx = useContext(ConfirmCtx);
  if (!ctx) throw new Error("useConfirm requires <ConfirmProvider>");
  return ctx;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback<Ctx>((o) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setOpts(o);
    });
  }, []);

  function close(v: boolean) {
    resolverRef.current?.(v);
    resolverRef.current = null;
    setOpts(null);
  }

  return (
    <ConfirmCtx.Provider value={confirm}>
      {children}
      <Dialog open={opts !== null} onClose={() => close(false)}>
        {opts && (
          <>
            <DialogTitle>{opts.title}</DialogTitle>
            {opts.body && <DialogBody>{opts.body}</DialogBody>}
            <DialogFooter>
              <Button variant="ghost" onClick={() => close(false)}>
                {opts.cancelLabel ?? "Cancel"}
              </Button>
              <Button
                variant={opts.danger ? "danger" : "primary"}
                onClick={() => close(true)}
              >
                {opts.confirmLabel ?? "Confirm"}
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </ConfirmCtx.Provider>
  );
}
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `npm run test -- confirm-dialog`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add src/components/ui/ConfirmDialog.tsx tests/components/ui/confirm-dialog.test.tsx
git commit -m "ui: ConfirmDialog + useConfirm imperative hook"
```

---

## Task 12: `Toast` + `ToastProvider` + `useToast`

**Files:**
- Create: `src/components/ui/Toast.tsx`
- Create: `tests/components/ui/toast.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ui/toast.test.tsx`:

```tsx
import { act, render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToastProvider, useToast } from "../../../src/components/ui/Toast";

function Harness() {
  const toast = useToast();
  return (
    <>
      <button onClick={() => toast.success("Saved")}>fire-success</button>
      <button onClick={() => toast.error("Boom")}>fire-error</button>
    </>
  );
}

describe("Toast", () => {
  it("shows a success toast on demand", () => {
    render(<ToastProvider><Harness /></ToastProvider>);
    fireEvent.click(screen.getByText("fire-success"));
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("auto-dismisses after timeout", async () => {
    vi.useFakeTimers();
    render(<ToastProvider><Harness /></ToastProvider>);
    fireEvent.click(screen.getByText("fire-error"));
    expect(screen.getByText("Boom")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(5000); });
    expect(screen.queryByText("Boom")).toBeNull();
    vi.useRealTimers();
  });
});
```

- [ ] **Step 2: Run test, confirm fails**

Run: `npm run test -- toast`
Expected: module not found.

- [ ] **Step 3: Implement `Toast.tsx`**

Create `src/components/ui/Toast.tsx`:

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type Variant = "success" | "error" | "info";
type ToastItem = { id: number; text: string; variant: Variant };

type Ctx = {
  success: (text: string) => void;
  error: (text: string) => void;
  info: (text: string) => void;
};
const ToastCtx = createContext<Ctx | null>(null);

export function useToast(): Ctx {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast requires <ToastProvider>");
  return ctx;
}

const DURATION_MS = 4000;
let nextId = 1;

const variantClass: Record<Variant, string> = {
  success: "bg-success-soft text-success border-good-200",
  error:   "bg-danger-soft text-danger border-bad-200",
  info:    "bg-surface-muted text-ink border-line",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((text: string, variant: Variant) => {
    const id = nextId++;
    setItems((xs) => [...xs, { id, text, variant }]);
    setTimeout(() => {
      setItems((xs) => xs.filter((t) => t.id !== id));
    }, DURATION_MS);
  }, []);

  const ctx: Ctx = {
    success: (t) => push(t, "success"),
    error:   (t) => push(t, "error"),
    info:    (t) => push(t, "info"),
  };

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-72">
          {items.map((t) => (
            <div
              key={t.id}
              role="status"
              className={`border rounded shadow-pop px-3 py-2 text-sm ${variantClass[t.variant]}`}
            >
              {t.text}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastCtx.Provider>
  );
}
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `npm run test -- toast`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add src/components/ui/Toast.tsx tests/components/ui/toast.test.tsx
git commit -m "ui: Toast + ToastProvider + useToast hook"
```

---

## Task 13: `ErrorBoundary`

**Files:**
- Create: `src/components/ErrorBoundary.tsx`

- [ ] **Step 1: Implement `ErrorBoundary.tsx`**

Create `src/components/ErrorBoundary.tsx`:

```tsx
import { Component, type ReactNode } from "react";
import { Button } from "./ui/Button";
import { Card, CardBody } from "./ui/Card";

type State = { error: Error | null };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-surface-sunken">
          <Card className="max-w-md w-full">
            <CardBody className="space-y-3 text-center">
              <h1 className="text-lg font-semibold text-ink">Something went wrong</h1>
              <p className="text-sm text-ink-muted">
                The page hit an unexpected error. You can try reloading.
              </p>
              <p className="text-xs text-ink-subtle font-mono break-all">
                {this.state.error.message}
              </p>
              <Button onClick={() => window.location.reload()}>Reload</Button>
            </CardBody>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add src/components/ErrorBoundary.tsx
git commit -m "ui: top-level ErrorBoundary with friendly fallback"
```

---

## Task 14: `Layout` component

**Files:**
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: Implement `Layout.tsx`**

Create `src/components/Layout.tsx`:

```tsx
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface-sunken">
      <TopBar />
      <main className="max-w-6xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Layout.tsx
git commit -m "ui: shared Layout (TopBar + content container)"
```

---

## Task 15: Rewrite `TopBar`

**Files:**
- Modify: `src/components/TopBar.tsx`

- [ ] **Step 1: Replace `src/components/TopBar.tsx`**

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export default function TopBar() {
  const { signOut } = useAuthActions();
  const { profile } = useCurrentProfile();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
        <Link to="/" className="font-serif text-accent text-lg">
          ScienceUtsav · Report Card
        </Link>
        {profile && (
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            {profile.role === "admin" && (
              <>
                <Link to="/admin" className="text-accent hover:underline">
                  Admin
                </Link>
                <Badge variant="accent">admin</Badge>
              </>
            )}
            <span className="hidden sm:inline">{profile.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add src/components/TopBar.tsx
git commit -m "ui: TopBar restyle (sticky, badge, primitive button)"
```

---

## Task 16: Wire providers + use `Layout` in routes

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/routes/TeacherRoute.tsx`
- Modify: `src/routes/AdminRoute.tsx`

- [ ] **Step 1: Replace `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ToastProvider } from "./components/ui/Toast";
import { ConfirmProvider } from "./components/ui/ConfirmDialog";
import { ErrorBoundary } from "./components/ErrorBoundary";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <ToastProvider>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </ToastProvider>
        </BrowserRouter>
      </ConvexAuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
```

- [ ] **Step 2: Strip the `<TopBar>` + `<main>` wrappers from both route guards**

Replace `src/routes/TeacherRoute.tsx`:

```tsx
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";

export default function TeacherRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined) return null;
  if (profile === null)
    return (
      <p className="p-6 text-sm text-ink-muted">Setting up profile…</p>
    );
  return <Outlet />;
}
```

Replace `src/routes/AdminRoute.tsx`:

```tsx
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";

export default function AdminRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined) return null;
  if (profile === null || profile.role !== "admin")
    return <Navigate to="/" replace />;
  return <Outlet />;
}
```

- [ ] **Step 3: Wrap routed pages in `Layout`**

Replace `src/App.tsx`:

```tsx
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminRoute from "./routes/AdminRoute";
import TeacherRoute from "./routes/TeacherRoute";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminKits from "./pages/AdminKits";
import EditRubric from "./pages/EditRubric";
import SeedPage from "./pages/SeedPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ClassDetail from "./pages/ClassDetail";
import ClassCurriculum from "./pages/ClassCurriculum";
import ScoreSheet from "./pages/ScoreSheet";
import StudentReport from "./pages/StudentReport";
import ClassReport from "./pages/ClassReport";

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<TeacherRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<TeacherDashboard />} />
          <Route path="/class/:classId" element={<ClassDetail />} />
          <Route path="/class/:classId/curriculum" element={<ClassCurriculum />} />
          <Route
            path="/class/:classId/students/:studentId/score/:kitId"
            element={<ScoreSheet />}
          />
          <Route
            path="/class/:classId/students/:studentId/report"
            element={<StudentReport />}
          />
          <Route path="/class/:classId/report" element={<ClassReport />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/kits" element={<AdminKits />} />
          <Route path="/admin/rubrics/:kitId" element={<EditRubric />} />
          <Route path="/admin/seed" element={<SeedPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

- [ ] **Step 4: Run app and click around**

Run: `npm run dev`
Expected:
- `/sign-in` and `/sign-up` render WITHOUT a TopBar (correct — they were never inside the layout).
- Once signed in, `/` shows the new sticky TopBar with admin badge if applicable.
- No console errors. Stop the dev server.

- [ ] **Step 5: Commit**

```powershell
git add src/main.tsx src/App.tsx src/routes/TeacherRoute.tsx src/routes/AdminRoute.tsx
git commit -m "ui: wire ErrorBoundary, Toast, Confirm providers; nest Layout in routes"
```

---

## Task 17: Extend `useDebouncedMutation` with save-state machine

**Files:**
- Modify: `src/lib/useDebouncedMutation.ts`
- Create: `tests/lib/useDebouncedMutation.test.tsx`

**API change:** Existing call sites use `const debouncedSave = useDebounce(fn, 500); debouncedSave(args)`. We'll keep that callable shape **and** add a status property. We rename the export internally but keep the named export `useDebounce` for backwards-compat (other pages may add usage).

Decision: expose a new `useDebouncedSave` hook returning `{ run, status, lastSavedAt }`. Keep the old `useDebounce` untouched. `ScoreSheet` will migrate to the new hook (only call site that needs status).

- [ ] **Step 1: Write the failing test**

Create `tests/lib/useDebouncedMutation.test.tsx`:

```tsx
import { act, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebouncedSave } from "../../src/lib/useDebouncedMutation";

function Probe({ fn }: { fn: (n: number) => Promise<void> }) {
  const { run, status } = useDebouncedSave(fn, 100);
  return (
    <>
      <span data-testid="status">{status}</span>
      <button onClick={() => run(1)}>fire</button>
    </>
  );
}

describe("useDebouncedSave", () => {
  it("transitions idle -> saving -> saved", async () => {
    vi.useFakeTimers();
    let resolveFn!: () => void;
    const fn = vi.fn(
      () => new Promise<void>((res) => { resolveFn = res; }),
    );
    render(<Probe fn={fn} />);
    expect(screen.getByTestId("status").textContent).toBe("idle");

    act(() => { screen.getByText("fire").click(); });
    act(() => { vi.advanceTimersByTime(100); });
    expect(fn).toHaveBeenCalledWith(1);
    expect(screen.getByTestId("status").textContent).toBe("saving");

    await act(async () => { resolveFn(); });
    expect(screen.getByTestId("status").textContent).toBe("saved");

    act(() => { vi.advanceTimersByTime(2100); });
    expect(screen.getByTestId("status").textContent).toBe("idle");
    vi.useRealTimers();
  });

  it("sets status=error when fn rejects", async () => {
    vi.useFakeTimers();
    const fn = vi.fn(() => Promise.reject(new Error("nope")));
    render(<Probe fn={fn} />);
    act(() => { screen.getByText("fire").click(); });
    act(() => { vi.advanceTimersByTime(100); });
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByTestId("status").textContent).toBe("error");
    vi.useRealTimers();
  });
});
```

- [ ] **Step 2: Run test, confirm fails**

Run: `npm run test -- useDebouncedMutation`
Expected: `useDebouncedSave` not exported.

- [ ] **Step 3: Add `useDebouncedSave` to `src/lib/useDebouncedMutation.ts`**

Replace `src/lib/useDebouncedMutation.ts` with:

```ts
import { useEffect, useRef, useState } from "react";

export function useDebounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay = 500,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fnRef.current(...args), delay);
  };
}

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useDebouncedSave<A extends unknown[]>(
  fn: (...args: A) => Promise<unknown>,
  delay = 500,
) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);
  useEffect(() => { fnRef.current = fn; }, [fn]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  function run(...args: A) {
    if (timer.current) clearTimeout(timer.current);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    timer.current = setTimeout(async () => {
      setStatus("saving");
      try {
        await fnRef.current(...args);
        setStatus("saved");
        setLastSavedAt(Date.now());
        resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
      } catch {
        setStatus("error");
      }
    }, delay);
  }

  return { run, status, lastSavedAt };
}
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `npm run test -- useDebouncedMutation`
Expected: both tests pass. Re-run `npm run test` to confirm full suite stays green.

- [ ] **Step 5: Commit**

```powershell
git add src/lib/useDebouncedMutation.ts tests/lib/useDebouncedMutation.test.tsx
git commit -m "ui: useDebouncedSave hook with save-status machine"
```

---

## Task 18: Refresh `SignIn` and `SignUp` with primitives

**Files:**
- Modify: `src/pages/SignIn.tsx`
- Modify: `src/pages/SignUp.tsx`

- [ ] **Step 1: Replace `src/pages/SignIn.tsx`**

```tsx
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FormField } from "../components/ui/FormField";
import { Card, CardBody } from "../components/ui/Card";

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-sunken">
      <Card className="w-full max-w-sm">
        <CardBody className="space-y-5">
          <div>
            <h1 className="font-serif text-2xl text-accent">Sign in</h1>
            <p className="text-sm text-ink-muted mt-1">
              ScienceUtsav Report Card
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField label="Email">
              {(id, describedBy) => (
                <Input
                  id={id}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby={describedBy}
                />
              )}
            </FormField>
            <FormField label="Password" error={error}>
              {(id, describedBy) => (
                <Input
                  id={id}
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby={describedBy}
                />
              )}
            </FormField>
            <Button type="submit" loading={busy} className="w-full">
              Sign in
            </Button>
          </form>
          <p className="text-xs text-ink-muted text-center">
            No account?{" "}
            <Link to="/sign-up" className="text-accent underline">
              Sign up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/pages/SignUp.tsx` (same structure)**

```tsx
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FormField } from "../components/ui/FormField";
import { Card, CardBody } from "../components/ui/Card";

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-sunken">
      <Card className="w-full max-w-sm">
        <CardBody className="space-y-5">
          <div>
            <h1 className="font-serif text-2xl text-accent">Create account</h1>
            <p className="text-sm text-ink-muted mt-1">
              ScienceUtsav Report Card
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField label="Email">
              {(id, describedBy) => (
                <Input
                  id={id}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby={describedBy}
                />
              )}
            </FormField>
            <FormField
              label="Password"
              hint="Minimum 8 characters."
              error={error}
            >
              {(id, describedBy) => (
                <Input
                  id={id}
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby={describedBy}
                />
              )}
            </FormField>
            <Button type="submit" loading={busy} className="w-full">
              Create account
            </Button>
          </form>
          <p className="text-xs text-ink-muted text-center">
            Already have one?{" "}
            <Link to="/sign-in" className="text-accent underline">
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Manual smoke**

Run: `npm run dev` → open `http://localhost:5173/sign-in`.
Expected: card-centered form, label+input pairs render, intentionally submitting empty fields shows native validation; a bad password renders the error in red via FormField. Stop dev server.

- [ ] **Step 4: Commit**

```powershell
git add src/pages/SignIn.tsx src/pages/SignUp.tsx
git commit -m "ui: SignIn/SignUp use Card + FormField primitives"
```

---

## Task 19: Refresh `TeacherDashboard`

**Files:**
- Modify: `src/pages/TeacherDashboard.tsx`

- [ ] **Step 1: Replace `src/pages/TeacherDashboard.tsx`**

```tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FormField } from "../components/ui/FormField";
import { Card, CardBody } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { Badge } from "../components/ui/Badge";
import { useToast } from "../components/ui/Toast";

function DashboardSkeleton() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <Card>
            <CardBody className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function TeacherDashboard() {
  const classes = useQuery(api.classes.listMine);
  const create = useMutation(api.classes.create);
  const toast = useToast();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(4);
  const [year, setYear] = useState("2025-26");
  const [showForm, setShowForm] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setNameError("Name is required.");
      return;
    }
    try {
      await create({ name: name.trim(), grade, academicYear: year });
      setName("");
      setShowForm(false);
      setNameError(null);
      toast.success("Class created");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not create class");
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-accent">My classes</h1>
        <Button onClick={() => setShowForm((s) => !s)} variant={showForm ? "secondary" : "primary"}>
          {showForm ? "Cancel" : "New class"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardBody>
            <form
              onSubmit={onCreate}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <div className="md:col-span-2">
                <FormField label="Name" error={nameError}>
                  {(id, describedBy) => (
                    <Input
                      id={id}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError(null);
                      }}
                      aria-describedby={describedBy}
                    />
                  )}
                </FormField>
              </div>
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
              <div className="md:col-span-4">
                <Button type="submit">Create</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {classes === undefined ? (
        <DashboardSkeleton />
      ) : classes.length === 0 ? (
        <EmptyState
          title="No classes yet"
          description="Create your first class to add students and start scoring."
          action={<Button onClick={() => setShowForm(true)}>New class</Button>}
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {classes.map((c) => (
            <li key={c._id}>
              <Link to={`/class/${c._id}`} className="block group">
                <Card className="group-hover:border-line-strong transition-colors">
                  <CardBody className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-ink">{c.name}</div>
                      <div className="text-xs text-ink-muted mt-0.5">
                        Grade {c.grade} · {c.academicYear}
                      </div>
                    </div>
                    <Badge variant="neutral">→</Badge>
                  </CardBody>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
```

- [ ] **Step 2: Manual smoke**

Run: `npm run dev` → sign in → `/`.
Expected: skeleton flashes briefly, then class cards render. Click **New class**, submit empty → "Name is required." appears. Submit valid → success toast pops top-right.

- [ ] **Step 3: Commit**

```powershell
git add src/pages/TeacherDashboard.tsx
git commit -m "ui: TeacherDashboard with skeleton, primitive form, toast"
```

---

## Task 20: Refresh `ClassDetail` (skeleton + ConfirmDialog)

**Files:**
- Modify: `src/pages/ClassDetail.tsx`

- [ ] **Step 1: Replace `src/pages/ClassDetail.tsx`**

```tsx
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton, SkeletonRow } from "../components/ui/Skeleton";
import { useConfirm } from "../components/ui/ConfirmDialog";
import { useToast } from "../components/ui/Toast";

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const removeStudent = useMutation(api.students.remove);
  const [name, setName] = useState("");
  const confirm = useConfirm();
  const toast = useToast();

  if (cls === undefined) {
    return (
      <>
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-7 w-64 mb-2" />
        <Skeleton className="h-3 w-40 mb-6" />
        <Card className="mb-6">
          <SkeletonRow />
          <SkeletonRow />
        </Card>
      </>
    );
  }
  if (cls === null) return <p className="text-sm text-ink-muted">Class not found.</p>;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addStudent({ classId: id, name: name.trim() });
      setName("");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not add student");
    }
  }

  async function onRemove(studentId: Id<"students">, studentName: string) {
    const ok = await confirm({
      title: `Remove ${studentName}?`,
      body: "This will delete the student and all their scores. This can't be undone.",
      confirmLabel: "Remove",
      danger: true,
    });
    if (!ok) return;
    try {
      await removeStudent({ studentId });
      toast.success(`Removed ${studentName}`);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Remove failed");
    }
  }

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Classes", to: "/" }, { label: cls.name }]} />
      <div className="flex items-baseline justify-between mb-1">
        <h1 className="font-serif text-2xl text-accent">{cls.name}</h1>
        <Link to={`/class/${id}/report`} className="text-sm text-accent hover:underline">
          Class report →
        </Link>
      </div>
      <p className="text-sm text-ink-muted mb-6">
        Grade {cls.grade} · {cls.academicYear}
      </p>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-sm font-medium">
            Curriculum ({kits?.length ?? 0} kits)
          </h2>
          <Link
            to={`/class/${id}/curriculum`}
            className="text-xs text-accent hover:underline"
          >
            Manage curriculum
          </Link>
        </CardHeader>
        {kits === undefined ? (
          <><SkeletonRow /><SkeletonRow /></>
        ) : kits.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-muted">
            No kits attached. Add some from "Manage curriculum".
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {kits.map((k) => (
              <li key={k._id} className="px-4 py-2.5 text-sm">
                #{k.kit!.kitNumber} · {k.kit!.kitName}{" "}
                <span className="text-xs text-ink-muted">({k.kit!.category})</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium">
            Students ({students?.length ?? 0})
          </h2>
        </CardHeader>
        <form onSubmit={add} className="px-4 py-3 flex gap-2 border-b border-line">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student name"
            className="flex-1"
          />
          <Button type="submit" size="sm">Add</Button>
        </form>
        {students === undefined ? (
          <><SkeletonRow /><SkeletonRow /></>
        ) : students.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No students"
              description="Add students above to begin scoring."
            />
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {students.map((s) => (
              <li
                key={s._id}
                className="px-4 py-2.5 flex items-center justify-between text-sm gap-3 flex-wrap"
              >
                <span className="font-medium text-ink">{s.name}</span>
                <div className="flex items-center gap-3 flex-wrap justify-end">
                  {kits && kits.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {kits.slice(0, 3).map((k) => (
                        <Link
                          key={k._id}
                          to={`/class/${id}/students/${s._id}/score/${k.kitId}`}
                        >
                          <Badge variant="neutral" className="hover:bg-success-soft hover:border-good-200 cursor-pointer">
                            Score{" "}
                            {k.kit!.kitName.length > 16
                              ? k.kit!.kitName.slice(0, 16) + "…"
                              : k.kit!.kitName}
                          </Badge>
                        </Link>
                      ))}
                      {kits.length > 3 && (
                        <span className="text-xs text-ink-subtle">
                          +{kits.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  <Link
                    to={`/class/${id}/students/${s._id}/report`}
                    className="text-xs text-accent hover:underline"
                  >
                    Report
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(s._id, s.name)}
                    className="text-danger"
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
```

- [ ] **Step 2: Manual smoke**

Run: `npm run dev` → open a class. Add a dummy student. Click **Remove** → confirm dialog appears with danger styling; confirming fires a success toast and the row vanishes.

- [ ] **Step 3: Commit**

```powershell
git add src/pages/ClassDetail.tsx
git commit -m "ui: ClassDetail with skeletons, ConfirmDialog, toasts"
```

---

## Task 21: Refresh `ClassCurriculum` + `KitPicker` (confirm on kit removal)

**Files:**
- Modify: `src/pages/ClassCurriculum.tsx`
- Modify: `src/components/KitPicker.tsx`

- [ ] **Step 1: Replace `src/components/KitPicker.tsx`**

The picker stays a controlled checkbox list but uses primitives and a skeleton:

```tsx
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Card } from "./ui/Card";
import { SkeletonRow } from "./ui/Skeleton";

export default function KitPicker({
  selectedKitIds,
  onToggle,
}: {
  selectedKitIds: Set<string>;
  onToggle: (kitId: Id<"kits">, selected: boolean) => void | Promise<void>;
}) {
  const assigned = useQuery(api.classKits.assignedKitsForTeacher);

  if (assigned === undefined) {
    return (
      <Card className="max-h-[60vh] overflow-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </Card>
    );
  }
  if (assigned.length === 0)
    return (
      <p className="text-sm text-ink-muted">
        You haven't been assigned any kits. Ask the admin.
      </p>
    );

  return (
    <Card className="max-h-[60vh] overflow-auto">
      <ul className="divide-y divide-line">
        {assigned.map((k) => {
          const selected = selectedKitIds.has(k._id);
          return (
            <li
              key={k._id}
              className="px-4 py-2.5 flex items-center justify-between text-sm"
            >
              <div>
                <span className="font-medium">#{k.kitNumber} · {k.kitName}</span>
                <span className="ml-2 text-xs text-ink-muted">
                  {k.category} · {k.subject} · Grade {k.grade}
                </span>
              </div>
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onToggle(k._id, e.target.checked)}
                aria-label={`Select ${k.kitName}`}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
```

- [ ] **Step 2: Replace `src/pages/ClassCurriculum.tsx`**

```tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import KitPicker from "../components/KitPicker";
import { Skeleton } from "../components/ui/Skeleton";
import { useConfirm } from "../components/ui/ConfirmDialog";
import { useToast } from "../components/ui/Toast";

export default function ClassCurriculum() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const links = useQuery(api.classKits.listForClass, { classId: id });
  const add = useMutation(api.classKits.add);
  const remove = useMutation(api.classKits.remove);
  const confirm = useConfirm();
  const toast = useToast();

  if (cls === undefined || links === undefined) {
    return (
      <>
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-3 w-80 mb-6" />
        <Skeleton className="h-64 w-full" />
      </>
    );
  }
  if (cls === null) return <p className="text-sm text-ink-muted">Class not found.</p>;

  const selectedIds = new Set<string>(links.map((l) => l.kitId as unknown as string));

  async function onToggle(kitId: Id<"kits">, selected: boolean) {
    if (selected) {
      try {
        await add({ classId: id, kitId });
      } catch (e: unknown) {
        toast.error(e instanceof Error ? e.message : "Could not add kit");
      }
      return;
    }
    const link = links!.find((l) => l.kitId === kitId);
    if (!link) return;
    const ok = await confirm({
      title: "Remove kit from class?",
      body: "Existing scores for this kit will stay, but the kit will no longer appear in this class's curriculum.",
      confirmLabel: "Remove",
      danger: true,
    });
    if (!ok) return;
    try {
      await remove({ classKitId: link._id });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Remove failed");
    }
  }

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Curriculum" },
        ]}
      />
      <h1 className="font-serif text-2xl text-accent mb-1">Curriculum</h1>
      <p className="text-sm text-ink-muted mb-6">
        Pick the kits you'll teach this class. Only your assigned kits are shown.
      </p>
      <KitPicker selectedKitIds={selectedIds} onToggle={onToggle} />
    </>
  );
}
```

- [ ] **Step 3: Manual smoke**

Run: `npm run dev` → open class → Manage curriculum. Unchecking a previously-checked kit triggers a confirm dialog; checking a new one doesn't.

- [ ] **Step 4: Commit**

```powershell
git add src/pages/ClassCurriculum.tsx src/components/KitPicker.tsx
git commit -m "ui: ClassCurriculum confirms kit removal, skeleton on load"
```

---

## Task 22: Refresh `ScoreSheet` (save pill + segmented ScoreRow)

**Files:**
- Modify: `src/components/ScoreRow.tsx`
- Modify: `src/pages/ScoreSheet.tsx`

- [ ] **Step 1: Restyle `src/components/ScoreRow.tsx` as a segmented control**

```tsx
type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

const PILL: Record<number, string> = {
  4: "bg-good-50 text-good-800 border-good-200",
  3: "bg-ok-50 text-ok-800 border-ok-400/40",
  2: "bg-warn-50 text-warn-800 border-warn-400/60",
  1: "bg-bad-50 text-bad-800 border-bad-200",
};
const PILL_ACTIVE: Record<number, string> = {
  4: "bg-good-400 text-white border-good-600",
  3: "bg-ok-400 text-white border-ok-600",
  2: "bg-warn-400 text-white border-warn-600",
  1: "bg-bad-600 text-white border-bad-800",
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
  const cells: Array<{ key: "c4" | "c3" | "c2" | "c1"; cls: string }> = [
    { key: "c4", cls: "bg-good-50/40 text-good-800" },
    { key: "c3", cls: "bg-ok-50/40 text-ok-800" },
    { key: "c2", cls: "bg-warn-50/40 text-warn-800" },
    { key: "c1", cls: "bg-bad-50/40 text-bad-800" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_1fr_1fr_140px] bg-surface border border-line rounded-lg overflow-hidden mb-2 text-xs">
      <div className="bg-surface-muted border-r border-line px-4 py-3">
        <div className="font-medium text-sm text-ink">{criterion.label}</div>
        <div className="text-xs text-ink-muted">{criterion.sub}</div>
      </div>
      {cells.map(({ key, cls }) => (
        <div key={key} className={`${cls} border-r border-line px-3 py-3 leading-snug`}>
          {criterion[key]}
        </div>
      ))}
      <div
        role="radiogroup"
        aria-label={`Score for ${criterion.label}`}
        className="flex items-center justify-center bg-surface px-2 py-2"
      >
        <div className="grid grid-cols-4 gap-1 w-full">
          {[4, 3, 2, 1].map((v) => {
            const active = score === v;
            return (
              <button
                key={v}
                role="radio"
                aria-checked={active}
                onClick={() => onChange(v)}
                className={`h-8 rounded border text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  active ? PILL_ACTIVE[v] : PILL[v] + " hover:brightness-95"
                }`}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/pages/ScoreSheet.tsx`**

```tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import ScoreRow from "../components/ScoreRow";
import { useDebouncedSave } from "../lib/useDebouncedMutation";
import { useEffect, useMemo, useState } from "react";
import { gradeBand, maxScore, scoredCount, totalOf } from "../lib/totals";
import { Card, CardBody } from "../components/ui/Card";
import { Textarea } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { useToast } from "../components/ui/Toast";

function SavePill({
  status,
}: {
  status: "idle" | "saving" | "saved" | "error";
}) {
  if (status === "idle") return null;
  if (status === "saving") return <Badge variant="neutral">Saving…</Badge>;
  if (status === "saved") return <Badge variant="success">Saved</Badge>;
  return <Badge variant="danger">Save failed</Badge>;
}

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
  const toast = useToast();

  const [criterionScores, setCriterionScores] = useState<Record<string, number>>({});
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (score === undefined) return;
    setCriterionScores(score?.criterionScores ?? {});
    setObservations(score?.observations ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score?._id]);

  const { run: scheduleSave, status } = useDebouncedSave(
    (cs: Record<string, number>, obs: string) =>
      upsert({ studentId: sid, kitId: kid, criterionScores: cs, observations: obs }),
    500,
  );

  useEffect(() => {
    if (status === "error") toast.error("Couldn't save your changes. Retrying when you edit again.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function setScore(criterionId: string, v: number) {
    setCriterionScores((prev) => {
      const next = { ...prev, [criterionId]: v };
      scheduleSave(next, observations);
      return next;
    });
  }

  function setObs(v: string) {
    setObservations(v);
    scheduleSave(criterionScores, v);
  }

  const total = useMemo(() => totalOf(criterionScores), [criterionScores]);
  const criteriaCount = rubric?.criteria.length ?? 6;
  const max = maxScore(criteriaCount);
  const pct = max ? Math.round((total / max) * 100) : 0;
  const scored = scoredCount(criterionScores, criteriaCount);

  if (!student || !cls || !kit || !rubric) {
    return (
      <>
        <Skeleton className="h-4 w-64 mb-4" />
        <Skeleton className="h-8 w-72 mb-2" />
        <Skeleton className="h-3 w-40 mb-6" />
        <Skeleton className="h-16 mb-2" />
        <Skeleton className="h-16 mb-2" />
        <Skeleton className="h-16 mb-2" />
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          {
            label: student.name,
            to: `/class/${cls._id}/students/${student._id}/report`,
          },
          { label: kit.kitName },
        ]}
      />

      <header className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl text-accent">{kit.kitName}</h1>
          <p className="text-sm text-ink-muted">
            #{kit.kitNumber} · {kit.concept} · {kit.category} · Grade {kit.grade}
          </p>
          <p className="text-sm mt-2 flex items-center gap-2">
            <span className="text-ink-muted">Student:</span>
            <strong>{student.name}</strong>
            <SavePill status={status} />
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wide text-ink-muted">Total</div>
          <div className="font-serif text-4xl text-ink">
            {total}
            <span className="text-base text-ink-subtle">/{max}</span>
          </div>
          <div className="text-xs text-ink-muted">
            {scored === criteriaCount
              ? `${pct}% · ${gradeBand(pct)}`
              : `${scored} of ${criteriaCount} scored`}
          </div>
        </div>
      </header>

      {rubric.criteria.map((c) => (
        <ScoreRow
          key={c.id}
          criterion={c}
          score={criterionScores[c.id] ?? 0}
          onChange={(v) => setScore(c.id, v)}
        />
      ))}

      <Card className="mt-6">
        <CardBody>
          <h3 className="text-xs uppercase tracking-wide text-ink-muted mb-2">
            Teacher observations
          </h3>
          <Textarea
            rows={4}
            value={observations}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Notes on this session, things to revisit, safety observations..."
          />
        </CardBody>
      </Card>
    </>
  );
}
```

- [ ] **Step 3: Manual smoke**

Run: `npm run dev` → open a score sheet → click a score button. Save pill flashes "Saving…" then "Saved" within ~1s. Disconnect Convex (stop `npx convex dev` temporarily) to verify error toast. Restart Convex.

- [ ] **Step 4: Commit**

```powershell
git add src/components/ScoreRow.tsx src/pages/ScoreSheet.tsx
git commit -m "ui: ScoreSheet save pill, neutral palette, segmented ScoreRow"
```

---

## Task 23: Refresh `StudentReport` + `ClassReport` (Cards, skeletons)

**Files:**
- Modify: `src/pages/StudentReport.tsx`
- Modify: `src/pages/ClassReport.tsx`

- [ ] **Step 1: Replace `src/pages/StudentReport.tsx`**

```tsx
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  downloadStudentReport,
  type ScoredKit,
} from "../components/StudentReportPdf";
import { totalOf, maxScore, gradeBand } from "../lib/totals";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";

export default function StudentReport() {
  const { classId, studentId } = useParams<{ classId: string; studentId: string }>();
  const sid = studentId as Id<"students">;
  const cls = useQuery(api.classes.get, { classId: classId as Id<"classes"> });
  const student = useQuery(api.students.get, { studentId: sid });
  const scored = useQuery(api.scores.listForStudent, { studentId: sid });

  if (!cls || !student || !scored) {
    return (
      <>
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-8 w-72 mb-6" />
        <Skeleton className="h-24 mb-3" />
        <Skeleton className="h-24 mb-3" />
      </>
    );
  }

  const filtered = scored.filter(
    (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
      s.kit !== null && s.rubric !== null,
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
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          { label: student.name },
        ]}
      />
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="font-serif text-2xl text-accent">{student.name} · Report</h1>
        <Button onClick={() => downloadStudentReport(student.name, cls.name, pdfRows)}>
          Download PDF
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-muted">No assessments yet.</p>
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
                    <div className="flex justify-between mb-2 gap-2">
                      <div>
                        <div className="font-medium text-ink">
                          #{sk.kit.kitNumber} · {sk.kit.kitName}
                        </div>
                        <div className="text-xs text-ink-muted">
                          {sk.kit.concept} · {sk.kit.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-xl text-ink">
                          {total}
                          <span className="text-sm text-ink-subtle">/{max}</span>
                        </div>
                        <div className="text-xs text-ink-muted">
                          {pct}% · {gradeBand(pct)}
                        </div>
                      </div>
                    </div>
                    <ul className="text-xs text-ink-muted grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4">
                      {sk.rubric.criteria.map((c) => (
                        <li key={c.id} className="flex justify-between">
                          <span>{c.label}</span>
                          <span className="font-medium text-ink">
                            {sk.criterionScores[c.id] ?? "—"}/4
                          </span>
                        </li>
                      ))}
                    </ul>
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

- [ ] **Step 2: Replace `src/pages/ClassReport.tsx`**

```tsx
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import { downloadClassReport } from "../components/ClassReportPdf";
import { totalOf, maxScore } from "../lib/totals";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";

export default function ClassReport() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const blocks = useQuery(api.scores.listForClass, { classId: id });

  if (!cls || !blocks) {
    return (
      <>
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-8 w-72 mb-6" />
        <Skeleton className="h-32 mb-3" />
        <Skeleton className="h-32 mb-3" />
      </>
    );
  }

  const cleaned = blocks.map((b) => ({
    student: { name: b.student.name },
    scores: b.scores
      .filter(
        (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
          s.kit !== null && s.rubric !== null,
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
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Report" },
        ]}
      />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-2xl text-accent">{cls.name} · Class report</h1>
        <Button onClick={() => downloadClassReport(cls.name, cleaned)}>
          Download all (PDF)
        </Button>
      </div>

      <ul className="space-y-2">
        {cleaned.map((b, i) => (
          <li key={i}>
            <Card>
              <CardBody>
                <div className="font-medium mb-2 text-ink">{b.student.name}</div>
                {b.scores.length === 0 ? (
                  <p className="text-xs text-ink-muted">No kits scored.</p>
                ) : (
                  <ul className="text-xs text-ink-muted space-y-1">
                    {b.scores.map((sk) => {
                      const total = totalOf(sk.criterionScores);
                      const max = maxScore(sk.rubric.criteria.length);
                      return (
                        <li key={sk._id} className="flex justify-between">
                          <span>
                            #{sk.kit.kitNumber} · {sk.kit.kitName}
                          </span>
                          <span className="font-medium text-ink">
                            {total}/{max}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
```

- [ ] **Step 3: Manual smoke**

Run: `npm run dev` → open `/class/:id/students/:id/report` and `/class/:id/report`. PDF buttons still trigger downloads identical to before.

- [ ] **Step 4: Commit**

```powershell
git add src/pages/StudentReport.tsx src/pages/ClassReport.tsx
git commit -m "ui: report pages use Card + Button primitives + skeletons"
```

---

## Task 24: Refresh `AdminDashboard` + `AdminKits`

**Files:**
- Modify: `src/pages/AdminDashboard.tsx`
- Modify: `src/pages/AdminKits.tsx`

- [ ] **Step 1: Replace `src/pages/AdminDashboard.tsx`**

```tsx
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";
import { Card, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton, SkeletonRow } from "../components/ui/Skeleton";

export default function AdminDashboard() {
  const teachers = useQuery(api.profiles.listTeachers);
  const [selectedTeacher, setSelected] = useState<Id<"profiles"> | null>(null);

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Admin" }]} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-accent">Admin dashboard</h1>
        <Link to="/admin/seed">
          <Button variant="secondary" size="sm">Seed kits & rubrics</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <Card>
          <CardHeader>
            <span className="text-xs uppercase tracking-wide text-ink-muted">
              Teachers
            </span>
            <Link
              to="/admin/kits"
              className="text-xs text-accent hover:underline"
            >
              All kits →
            </Link>
          </CardHeader>
          {teachers === undefined ? (
            <><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
          ) : (
            <ul className="divide-y divide-line">
              {teachers
                .filter((t) => t.role === "teacher")
                .map((t) => (
                  <li key={t._id}>
                    <button
                      onClick={() => setSelected(t._id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedTeacher === t._id
                          ? "bg-success-soft"
                          : "hover:bg-surface-muted"
                      }`}
                    >
                      <div className="font-medium text-ink">{t.displayName}</div>
                      <div className="text-xs text-ink-muted">{t.email}</div>
                    </button>
                  </li>
                ))}
              {teachers.filter((t) => t.role === "teacher").length === 0 && (
                <li className="px-4 py-6 text-xs text-ink-muted">
                  No teachers yet — share the sign-up link.
                </li>
              )}
            </ul>
          )}
        </Card>
        <section>
          {selectedTeacher ? (
            <TeacherAssignments teacherProfileId={selectedTeacher} />
          ) : (
            <p className="text-sm text-ink-muted">
              Select a teacher to manage their kit assignments.
            </p>
          )}
        </section>
      </div>
    </>
  );
}

function TeacherAssignments({ teacherProfileId }: { teacherProfileId: Id<"profiles"> }) {
  const kits = useQuery(api.kits.list);
  const assigned = useQuery(api.assignments.listForTeacher, { teacherProfileId });
  const setAssign = useMutation(api.assignments.set);
  if (!kits || !assigned) {
    return (
      <Card>
        <Skeleton className="h-8 m-4" />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </Card>
    );
  }
  const assignedSet = new Set(assigned.map((a) => a.kitId));

  return (
    <Card>
      <CardHeader>
        <span className="text-xs uppercase tracking-wide text-ink-muted">
          Assignable kits
        </span>
        <span className="text-xs text-ink-muted">
          {assignedSet.size} assigned of {kits.length}
        </span>
      </CardHeader>
      <ul className="divide-y divide-line max-h-[600px] overflow-auto">
        {kits.map((k) => {
          const checked = assignedSet.has(k._id);
          return (
            <li key={k._id} className="px-4 py-2.5 flex items-center justify-between text-sm">
              <div>
                <span className="font-medium text-ink">#{k.kitNumber} · {k.kitName}</span>
                <span className="ml-2 text-xs text-ink-muted">
                  {k.category} · {k.subject} · Grade {k.grade}
                </span>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    setAssign({ teacherProfileId, kitId: k._id, assigned: e.target.checked })
                  }
                  aria-label={`Assign ${k.kitName}`}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
```

- [ ] **Step 2: Replace `src/pages/AdminKits.tsx`**

```tsx
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Breadcrumbs from "../components/Breadcrumbs";
import { Card } from "../components/ui/Card";
import { SkeletonRow } from "../components/ui/Skeleton";

export default function AdminKits() {
  const kits = useQuery(api.kits.list);
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Admin", to: "/admin" }, { label: "Kits" }]} />
      <h1 className="font-serif text-2xl text-accent mb-4">
        All kits ({kits?.length ?? "…"})
      </h1>
      <Card>
        {kits === undefined ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <ul className="divide-y divide-line">
            {kits.map((k) => (
              <li key={k._id}>
                <Link
                  to={`/admin/rubrics/${k._id}`}
                  className="block px-4 py-3 hover:bg-surface-muted text-sm"
                >
                  <div className="font-medium text-ink">
                    #{k.kitNumber} · {k.kitName}
                  </div>
                  <div className="text-xs text-ink-muted">
                    {k.concept} · {k.category} · {k.subject} · Grade {k.grade}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```powershell
git add src/pages/AdminDashboard.tsx src/pages/AdminKits.tsx
git commit -m "ui: admin pages use Card + skeletons"
```

---

## Task 25: Refresh `EditRubric` + `SeedPage` (toast on save)

**Files:**
- Modify: `src/pages/EditRubric.tsx`
- Modify: `src/pages/SeedPage.tsx`

- [ ] **Step 1: Replace `src/pages/EditRubric.tsx`**

```tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { Card, CardBody } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { useToast } from "../components/ui/Toast";

type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

export default function EditRubric() {
  const { kitId } = useParams<{ kitId: string }>();
  const kit = useQuery(api.kits.get, { kitId: kitId as Id<"kits"> });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kitId as Id<"kits"> });
  const update = useMutation(api.rubrics.update);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (rubric) setCriteria(rubric.criteria);
  }, [rubric]);

  if (!kit || !rubric) {
    return (
      <>
        <Skeleton className="h-4 w-64 mb-4" />
        <Skeleton className="h-8 w-72 mb-2" />
        <Skeleton className="h-3 w-40 mb-6" />
        <Skeleton className="h-40 mb-3" />
        <Skeleton className="h-40 mb-3" />
      </>
    );
  }

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
      toast.success("Rubric saved");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Admin", to: "/admin" },
          { label: "Kits", to: "/admin/kits" },
          { label: kit.kitName },
        ]}
      />
      <h1 className="font-serif text-2xl text-accent mb-1">{kit.kitName}</h1>
      <p className="text-sm text-ink-muted mb-6">
        #{kit.kitNumber} · {kit.concept} · {kit.category} · Grade {kit.grade}
      </p>

      <div className="space-y-3">
        {criteria.map((c, i) => (
          <Card key={c.id}>
            <CardBody className="space-y-2">
              <Input
                value={c.label}
                onChange={(e) => patch(i, "label", e.target.value)}
                className="font-medium"
              />
              <Input
                value={c.sub}
                onChange={(e) => patch(i, "sub", e.target.value)}
                className="text-xs"
              />
              {(["c4", "c3", "c2", "c1"] as const).map((k) => (
                <label key={k} className="block">
                  <span className="text-[10px] uppercase tracking-wide text-ink-muted">
                    {k.toUpperCase()}
                  </span>
                  <Textarea
                    rows={2}
                    value={c[k]}
                    onChange={(e) => patch(i, k, e.target.value)}
                  />
                </label>
              ))}
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={save} loading={saving}>Save rubric</Button>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Replace `src/pages/SeedPage.tsx`**

```tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { useToast } from "../components/ui/Toast";

export default function SeedPage() {
  const count = useQuery(api.kits.count);
  const seed = useMutation(api.seed.seedKitsAndRubrics);
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const toast = useToast();

  async function run() {
    setBusy(true);
    setLastResult(null);
    try {
      const r = await seed({});
      const msg = `Inserted ${r.kitsInserted} kits (${r.kitsSkipped} skipped), ${r.rubricsInserted} rubrics (${r.rubricsSkipped} skipped).`;
      setLastResult(msg);
      toast.success("Seed complete");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setLastResult(msg);
      toast.error(`Seed failed: ${msg}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Admin", to: "/admin" }, { label: "Seed" }]} />
      <h1 className="font-serif text-2xl text-accent mb-4">
        Seed kits & rubrics
      </h1>
      <Card>
        <CardBody className="space-y-4">
          <p className="text-sm text-ink-muted">
            Current kit count in database: <strong>{count ?? "…"}</strong>. Running this
            is safe — it inserts only missing rows and never overwrites existing rubrics.
          </p>
          <Button onClick={run} loading={busy}>Run seed</Button>
          {lastResult && (
            <p className="text-sm text-ink">{lastResult}</p>
          )}
        </CardBody>
      </Card>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```powershell
git add src/pages/EditRubric.tsx src/pages/SeedPage.tsx
git commit -m "ui: EditRubric + SeedPage with Card, toast feedback"
```

---

## Task 26: Refresh `Breadcrumbs` styling

**Files:**
- Modify: `src/components/Breadcrumbs.tsx`

- [ ] **Step 1: Replace `src/components/Breadcrumbs.tsx`**

```tsx
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="text-xs text-ink-muted mb-4">
      {crumbs.map((c, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-ink-subtle">/</span>}
          {c.to ? (
            <Link to={c.to} className="hover:text-accent">
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

- [ ] **Step 2: Commit**

```powershell
git add src/components/Breadcrumbs.tsx
git commit -m "ui: Breadcrumbs use semantic ink tokens"
```

---

## Task 27: Final verification sweep

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: clean. If anything trips, fix inline (most likely unused imports from older code).

- [ ] **Step 2: Tests**

Run: `npm run test`
Expected: all tests pass — existing `tests/totals.test.ts` and `tests/rubric-generator.test.ts` plus new component/hook tests.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success, no TS errors. Note bundle size — should not have grown dramatically (cva is ~2KB).

- [ ] **Step 4: Manual end-to-end smoke**

Run `npm run dev` + `npx convex dev`. Walk through:

1. `/sign-in` — card layout, focus ring on tab.
2. Sign in as teacher → `/` shows skeleton then class cards.
3. Create a new class → toast appears.
4. Open class → skeleton then content; remove a student → confirm dialog → success toast.
5. Manage curriculum → uncheck a kit → confirm dialog appears; check a new one → no confirm.
6. Score a kit → save pill flashes saving → saved.
7. `/class/:id/students/:id/report` → Download PDF still works.
8. Sign out → back to sign-in. Sign in as admin → admin badge visible in TopBar.
9. `/admin` shows skeleton then teacher list. Open a teacher → assignable kits load.
10. Edit a rubric → click save → success toast.

Acceptance criteria from spec re-check:
- [ ] All builds/tests/lint green.
- [ ] Every `useQuery` page shows a shaped skeleton.
- [ ] ScoreSheet shows save pill.
- [ ] `students.remove` and `classKits.remove` both confirm.
- [ ] SignIn/SignUp surface auth errors via FormField.
- [ ] Throwing in a page renders the ErrorBoundary fallback. **Verify manually:** temporarily add `throw new Error("boom")` to the top of `TeacherDashboard.tsx`, reload `/`, confirm the friendly "Something went wrong" Card appears. Revert.
- [ ] No raw `<button className="bg-accent...">` remain. Grep to verify:

  Run:
  ```powershell
  Select-String -Path src\**\*.tsx -Pattern "bg-accent text-white rounded" -SimpleMatch
  ```
  Expected: no matches.
- [ ] PDF output visually unchanged — open a student PDF and compare to a pre-pass screenshot if available.

- [ ] **Step 5: Final commit**

If any small fixes came out of the sweep:

```powershell
git add -A
git commit -m "ui: post-sweep cleanups"
```

Otherwise, no commit needed.

---

## Summary

After Task 27, the frontend is:

- Built from a small set of typed primitives, no shadcn/Radix needed.
- Visually consistent with semantic neutral tokens, single shadow/radius scale.
- Loading-state-correct — no `Loading…` placeholders anywhere.
- Save-aware — ScoreSheet shows what's happening; errors surface as toasts.
- Destructive-safe — student and kit removals require confirmation.
- Crash-tolerant — top-level ErrorBoundary catches render errors.

What's deliberately still pending and would be the next pass:
- A11y deep dive (keyboard nav for ScoreRow radio group is partial; focus trap in Dialog is minimal).
- Mobile-first layout pass.
- Code-splitting (especially `@react-pdf/renderer` which is large).
- Sentry / analytics / deploy config.
