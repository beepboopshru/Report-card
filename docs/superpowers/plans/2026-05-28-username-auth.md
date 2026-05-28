# Username + Password Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace email-based login with username + password, drop `ADMIN_EMAILS`, remove email from the `profiles` table.

**Architecture:** Keep `@convex-dev/auth`'s `Password` provider; pass a `username` form param through its `profile` callback, which validates the format and returns `{ email: username }` so the auth account's identifier column stores the username string. Reshape the application-level `profiles` table from `email` to `username`. Sign-ups always create teachers; admins are promoted manually in the Convex dashboard.

**Tech Stack:** React 19, React Router 7, Convex 1.39, `@convex-dev/auth` 0.0.92, Vite 8, Vitest 4, TypeScript ~6.

**Spec:** [docs/superpowers/specs/2026-05-28-username-auth-design.md](../specs/2026-05-28-username-auth-design.md)

---

## File Structure

**Created**
- `convex/lib/username.ts` — Pure helpers: `normalizeUsername(raw)` and `assertValidUsername(name)`. Used by `convex/auth.ts` (server validation) and re-used by the React sign-in/sign-up forms (client validation) via the shared module import. No side effects, no Convex APIs.
- `tests/username.test.ts` — Vitest unit tests for the helpers above.

**Modified**
- `convex/auth.ts` — Wire `Password({ profile, validatePasswordRequirements })`.
- `convex/schema.ts` — `profiles`: drop `email` + `by_email`, add `username` + `by_username`.
- `convex/profiles.ts` — `ensure`: insert `{ userId, username, displayName: username, role: "teacher" }`; remove email-based role re-sync.
- `convex/lib/access.ts` — Delete `isAdminEmail` and `ADMIN_EMAILS` env-var code.
- `src/pages/SignIn.tsx` — Replace email input with username; client-side validate; call `signIn("password", { username, password, flow })`.
- `src/pages/SignUp.tsx` — Same swap as SignIn plus a username format hint.
- `src/components/Sidebar.tsx` — Show `profile.username` instead of `profile.email`; initials fallback uses `displayName || username`.
- `src/pages/AdminDashboard.tsx` — "Email" column → "Username"; uses `t.username`; drawer header uses `teacher.username`. Local type for `teacher` prop updates accordingly.

**Manual (no code)**
- Convex dashboard: clear `users`, `authAccounts`, `authSessions`, `authRefreshTokens`, `authVerificationCodes`, `authVerifiers`, `profiles` before pushing the new schema.

---

## Task 1: Username validator (TDD)

**Files:**
- Create: `convex/lib/username.ts`
- Test:   `tests/username.test.ts`

The validator is the only piece with natural unit-test coverage. Everything downstream re-uses it.

- [ ] **Step 1: Write the failing tests**

Create `tests/username.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { normalizeUsername, assertValidUsername } from "../convex/lib/username";

describe("normalizeUsername", () => {
  it("lowercases and trims whitespace", () => {
    expect(normalizeUsername("  Alice  ")).toBe("alice");
    expect(normalizeUsername("BOB.MILLER")).toBe("bob.miller");
  });
  it("returns empty string for non-string input", () => {
    expect(normalizeUsername(undefined as unknown as string)).toBe("");
    expect(normalizeUsername(null as unknown as string)).toBe("");
  });
});

describe("assertValidUsername", () => {
  it("accepts valid usernames", () => {
    for (const u of ["abc", "user_1", "a.b-c", "12345", "a".repeat(32)]) {
      expect(() => assertValidUsername(u)).not.toThrow();
    }
  });
  it("rejects too short", () => {
    expect(() => assertValidUsername("ab")).toThrow(/3-32/);
  });
  it("rejects too long", () => {
    expect(() => assertValidUsername("a".repeat(33))).toThrow(/3-32/);
  });
  it("rejects uppercase or disallowed characters", () => {
    for (const u of ["Alice", "user name", "a!", "a@b", "café"]) {
      expect(() => assertValidUsername(u)).toThrow(/lowercase letters/);
    }
  });
  it("rejects empty string", () => {
    expect(() => assertValidUsername("")).toThrow();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/username.test.ts`
Expected: FAIL — cannot find module `../convex/lib/username`.

- [ ] **Step 3: Implement the validator**

Create `convex/lib/username.ts`:

```ts
const USERNAME_RE = /^[a-z0-9._-]{3,32}$/;

export function normalizeUsername(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw.trim().toLowerCase();
}

export function assertValidUsername(name: string): void {
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("Username is required.");
  }
  if (name.length < 3 || name.length > 32) {
    throw new Error("Username must be 3-32 characters.");
  }
  if (!USERNAME_RE.test(name)) {
    throw new Error(
      "Username may only contain lowercase letters, digits, '.', '_', '-'.",
    );
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/username.test.ts`
Expected: PASS, all 6+ assertions green.

- [ ] **Step 5: Commit**

```bash
git add convex/lib/username.ts tests/username.test.ts
git commit -m "feat(auth): add username normalize+validate helpers"
```

---

## Task 2: Backend switchover (auth provider, schema, profiles, access cleanup)

These four files MUST land in a single commit — the schema change, the auth provider that produces the new shape, and the `ensure` mutation that reads it are mutually dependent. Splitting commits leaves the Convex deployment in a broken intermediate state.

**Files:**
- Modify: `convex/auth.ts` (full rewrite of the file)
- Modify: `convex/schema.ts` (lines 8-15)
- Modify: `convex/profiles.ts` (lines 5-33)
- Modify: `convex/lib/access.ts` (lines 7, 52-59 removed)

No automated tests for this task — Convex backend functions don't have a unit harness in this repo. Verification is `npm run build` (typechecks both `tsconfig.app.json` and the Convex side) + `npm run lint` + the manual smoke test in Task 5.

- [ ] **Step 1: Rewrite `convex/auth.ts`**

Replace the entire file with:

```ts
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { assertValidUsername, normalizeUsername } from "./lib/username";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const username = normalizeUsername(String(params.username ?? ""));
        assertValidUsername(username);
        return { email: username };
      },
    }),
  ],
});
```

Notes:
- The provider param is still called `email` in the SDK; we store the username string into it. This is the documented way to repurpose the Password provider (see `node_modules/@convex-dev/auth/dist/providers/Password.d.ts` — the `profile` return type requires an `email` field).
- Default password rule (`length >= 8`) is kept; no custom `validatePasswordRequirements`.

- [ ] **Step 2: Update `convex/schema.ts` — profiles table**

In `convex/schema.ts`, replace the `profiles` table block:

```ts
  profiles: defineTable({
    userId: v.id("users"),
    username: v.string(),
    displayName: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher")),
  })
    .index("by_user", ["userId"])
    .index("by_username", ["username"]),
```

(Removed `email` field and the `by_email` index. Everything else in the file is unchanged.)

- [ ] **Step 3: Rewrite `convex/profiles.ts`**

Replace the file with:

```ts
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { requireProfile } from "./lib/access";
import { normalizeUsername } from "./lib/username";

export const ensure = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User row missing");

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (existing) return existing._id;

    const username = normalizeUsername(user.email ?? "");
    if (!username) throw new Error("Auth user missing username");
    return await ctx.db.insert("profiles", {
      userId,
      username,
      displayName: username,
      role: "teacher",
    });
  },
});

export const me = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const listTeachers = query({
  args: {},
  handler: async (ctx) => {
    await requireProfile(ctx);
    return await ctx.db.query("profiles").collect();
  },
});
```

Notes:
- `user.email` on the auth `users` row now holds the username (set by the Password provider's `profile` callback).
- Role is hard-coded to `"teacher"`; admin promotion is manual via the Convex dashboard.
- No more re-sync on existing profiles — once a profile is created, `ensure` is a no-op return.

- [ ] **Step 4: Strip `isAdminEmail` from `convex/lib/access.ts`**

In `convex/lib/access.ts`:
- Delete line 7: `declare const process: { env: Record<string, string | undefined> };`
- Delete lines 52-59 (the entire `isAdminEmail` function).
- Leave `requireProfile`, `requireAdmin`, `requireTeacher`, `requireOwnsClass` untouched.

After edits, the file should end with the closing brace of `requireOwnsClass` and contain no `process.env` references.

- [ ] **Step 5: Typecheck and lint**

Run: `npm run build`
Expected: tsc completes with no errors. Vite build also succeeds.

Run: `npm run lint`
Expected: no errors.

If `npm run build` reports unused imports in `convex/profiles.ts` (e.g. leftover `isAdminEmail` import), remove them and re-run.

- [ ] **Step 6: Commit**

```bash
git add convex/auth.ts convex/schema.ts convex/profiles.ts convex/lib/access.ts
git commit -m "feat(auth): switch backend from email to username identifier"
```

---

## Task 3: Frontend switchover (SignIn, SignUp, Sidebar, AdminDashboard)

After Task 2, the frontend no longer typechecks (it references `profile.email`, which is gone). This task fixes all four call sites in one commit so the working tree compiles again.

**Files:**
- Modify: `src/pages/SignIn.tsx` (full rewrite)
- Modify: `src/pages/SignUp.tsx` (full rewrite)
- Modify: `src/components/Sidebar.tsx` (lines 19, 89)
- Modify: `src/pages/AdminDashboard.tsx` (lines 53, 66, 98, 143)

- [ ] **Step 1: Rewrite `src/pages/SignIn.tsx`**

Replace the entire file with:

```tsx
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const normalized = normalizeUsername(username);
      assertValidUsername(normalized);
      await signIn("password", {
        username: normalized,
        password,
        flow: "signIn",
      });
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
        <FormField label="Username">
          {(id, describedBy) => (
            <Input
              id={id}
              type="text"
              required
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              aria-describedby={describedBy}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

- [ ] **Step 2: Rewrite `src/pages/SignUp.tsx`**

Replace the entire file with:

```tsx
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";

export default function SignUp() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const normalized = normalizeUsername(username);
      assertValidUsername(normalized);
      await signIn("password", {
        username: normalized,
        password,
        flow: "signUp",
      });
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
        <FormField
          label="Username"
          hint="Lowercase letters, digits, '.', '_', '-'. 3-32 characters."
        >
          {(id, describedBy) => (
            <Input
              id={id}
              type="text"
              required
              minLength={3}
              maxLength={32}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              pattern="[a-z0-9._\-]{3,32}"
              aria-describedby={describedBy}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

- [ ] **Step 3: Patch `src/components/Sidebar.tsx`**

Change line 19 from:

```ts
  const initials = (profile?.displayName || profile?.email || "?")
```

to:

```ts
  const initials = (profile?.displayName || profile?.username || "?")
```

Change line 89 from:

```tsx
                {profile.email}
```

to:

```tsx
                @{profile.username}
```

(Leading `@` is a visual cue that this is a username; everything else on that line is unchanged.)

- [ ] **Step 4: Patch `src/pages/AdminDashboard.tsx`**

In `src/pages/AdminDashboard.tsx`:

1. Line 53 — change the table header label:

   From:
   ```tsx
                     <th className="px-5 py-2.5 font-medium">Email</th>
   ```
   To:
   ```tsx
                     <th className="px-5 py-2.5 font-medium">Username</th>
   ```

2. Line 66 — change the cell:

   From:
   ```tsx
                       <td className="px-5 py-3 text-ink-muted">{t.email}</td>
   ```
   To:
   ```tsx
                       <td className="px-5 py-3 text-ink-muted">@{t.username}</td>
   ```

3. Line 98 — update the drawer prop type:

   From:
   ```ts
     teacher: { _id: Id<"profiles">; displayName: string; email: string };
   ```
   To:
   ```ts
     teacher: { _id: Id<"profiles">; displayName: string; username: string };
   ```

4. Line 143 — update the drawer sub-header:

   From:
   ```tsx
               {teacher.email} · {assignedSet.size} of {kits?.length ?? 0} assigned
   ```
   To:
   ```tsx
               @{teacher.username} · {assignedSet.size} of {kits?.length ?? 0} assigned
   ```

- [ ] **Step 5: Confirm no stale email references remain in the UI**

Run: `git grep -nE "profile\.email|teacher\.email|\bt\.email" -- src`
Expected: no matches.

`user.email` reads inside `convex/profiles.ts` are intentional (the auth users row's email column now stores the username) and are NOT searched for here.

If matches appear in `src`, fix each one — they will not typecheck once Task 2 is in place.

- [ ] **Step 6: Typecheck, lint, unit tests**

Run: `npm run build`
Expected: tsc + vite build succeed with no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm test`
Expected: existing suites all pass, including the `username` test from Task 1.

- [ ] **Step 7: Commit**

```bash
git add src/pages/SignIn.tsx src/pages/SignUp.tsx src/components/Sidebar.tsx src/pages/AdminDashboard.tsx
git commit -m "feat(auth): switch frontend forms and profile UI to username"
```

---

## Task 4: Wipe Convex data (manual, before pushing schema)

This is a one-time data reset. It must happen before `npx convex dev` pushes the new schema, otherwise Convex will reject the deploy because existing `profiles` rows still carry an `email` field that no longer matches the schema.

There is no automated step in this repo for clearing tables. The Convex dashboard's "Clear table" action is the simplest path.

- [ ] **Step 1: Open the Convex dashboard for this deployment**

Run: `npx convex dashboard`
Expected: a browser tab opens to the project's deployment.

- [ ] **Step 2: Clear the following tables, in order**

For each table below, open it in the dashboard sidebar and use the "Clear table" action (three-dot menu → Clear all documents):

1. `profiles`
2. `authSessions`
3. `authRefreshTokens`
4. `authVerificationCodes`
5. `authVerifiers`
6. `authAccounts`
7. `users`

Order matters only loosely — `users` last is safest because the auth tables reference it. Confirm each table reads "0 documents" before moving on.

- [ ] **Step 3: Verify the wipe**

Spot-check in the dashboard: every table listed above should show 0 documents. Do not skip this — pushing the schema against unwiped data is the most likely failure mode of this whole plan.

---

## Task 5: Push backend and end-to-end smoke test

- [ ] **Step 1: Push the new schema and functions**

Run: `npx convex dev`
Expected: deploy succeeds; no schema-validation errors. Leave this running in one terminal.

If you see "Schema validation failed: profiles document has unexpected field 'email'", Task 4 was incomplete — clear `profiles` and re-run.

- [ ] **Step 2: Start the Vite dev server**

In a second terminal, run: `npm run dev`
Expected: server starts on the printed localhost port.

- [ ] **Step 3: Smoke test sign-up**

Open the dev URL in a browser. Navigate to `/sign-up`. Verify:

1. The form shows a **Username** field (not Email) with the format hint.
2. Submitting `Alice` (capital A) succeeds — client lowercases it before submit.
3. Submitting `ab` (too short) shows the inline 3-32 error and does NOT call the backend.
4. Submitting `bad name` (space) shows the lowercase-letters error.
5. After a successful sign-up with username `alice` + password `password1`, you land on `/` and the sidebar shows `@alice`.

- [ ] **Step 4: Smoke test sign-in**

Click "Sign out" in the sidebar. Navigate to `/sign-in`. Verify:

1. Signing in with `alice` + correct password succeeds and lands on `/`.
2. Signing in with `Alice` (capital) ALSO succeeds — client normalizes before submit.
3. Signing in with `alice` + wrong password shows an "Invalid credentials" error.

- [ ] **Step 5: Verify admin promotion path**

In the Convex dashboard, open the `profiles` table, find the `alice` row, edit its `role` field from `"teacher"` to `"admin"`, save. Refresh the app in the browser. Verify:

1. The sidebar now shows the Admin section (Teachers / Kits / Seed nav items).
2. Navigating to `/admin` opens the Teachers page. The table header reads **Username**. The `alice` row appears under it as `@alice`.
3. Opening the "Manage kits" drawer for any teacher row shows `@<username>` in the sub-header (not an email).

- [ ] **Step 6: Final commit (only if any tweaks were needed)**

If the smoke test exposed any small issues you fixed, commit them now:

```bash
git status
git add <fixed files>
git commit -m "fix(auth): <what you fixed>"
```

If no fixes were needed, skip this step — there is nothing to commit.

---

## Out of scope reminders

- No password reset, email verification, or "remember me".
- No UI for changing username or promoting admins post sign-up.
- No backfill / migration code — fresh start only.
