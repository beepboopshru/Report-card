# Admin provisions teachers — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an admin-only flow to create teacher accounts (with a one-time copyable credentials bundle), reset passwords, and disable/enable accounts. Remove public sign-up.

**Architecture:** Three admin-only Convex functions in `convex/admin.ts` wrap `@convex-dev/auth/server` helpers (`createAccount`, `modifyAccountCredentials`, `invalidateSessions`). A `profiles.disabled` flag is added and checked by `requireProfile`. The existing `AdminDashboard.tsx` (already titled "Teachers") is extended with a Create button, row actions for Reset/Disable, and a shared one-time `CredentialsModal`. `SignUp.tsx` and its route are deleted.

**Tech Stack:** Convex (backend, schema, auth), React 19 + react-router-dom (frontend), Tailwind v4, vitest for unit tests, `@convex-dev/auth/server` helpers.

**Spec:** [`docs/superpowers/specs/2026-05-28-admin-provisions-teachers-design.md`](../specs/2026-05-28-admin-provisions-teachers-design.md)

**Scope deviation from spec:** Instead of creating a new `/admin/teachers` page, we extend the existing `AdminDashboard.tsx` (route `/admin`) which is already titled "Teachers" and lists them. The `setTeacherDisabled` function is implemented as a Convex **action** (not a mutation) because it calls `invalidateSessions` which requires `ActionCtx`. The action delegates the row patch to an internal mutation.

---

## Phase 0 — Finish the in-progress username migration

These steps are manual deploy steps, not code edits. They are the prerequisite to Phase 1. **Do not start Phase 1 until Phase 0 is complete.**

### Task 0.1: Push the widened schema

The widened schema is already in your working tree at `convex/schema.ts` (lines 8-16). The new field `email: v.optional(v.string())` and `username: v.optional(v.string())` allow existing rows to pass validation.

**Files:**
- Already modified: `convex/schema.ts`
- Already created: `convex/migrations.ts`

- [ ] **Step 1: Start convex dev**

Run: `npx convex dev`

Expected output ends with: `Convex functions ready!` and a watcher running. Leave this terminal open.

If you instead see `Schema validation failed`, paste the error — Phase 0 is blocked.

- [ ] **Step 2: In a SECOND terminal, run the backfill**

Run: `npx convex run migrations:backfillProfileUsernames`

Expected output: a JSON array of `{id, username}` entries, one per existing profile. For example:
```json
[
  { "id": "kd7eny2aqt1hb38vv98fae...", "username": "shreyanshu.jais" },
  { "id": "kd797jnj46sjds87ge6aje...", "username": "shashankaikarnam" }
]
```

If any row throws (e.g., derived username fails `assertValidUsername`), fix the offending profile via the Convex dashboard (open `Data → profiles`, edit the row's `displayName` to a valid username-shaped string, save, rerun the backfill).

### Task 0.2: Narrow the schema and add the `disabled` field

**Files:**
- Modify: `convex/schema.ts:8-16`

- [ ] **Step 1: Replace the `profiles` table definition**

Edit `convex/schema.ts` to make `username` required again, remove the temporary `email` field, and add `disabled`:

```ts
  profiles: defineTable({
    userId: v.id("users"),
    username: v.string(),
    displayName: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher")),
    disabled: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_username", ["username"]),
```

- [ ] **Step 2: Verify the push succeeds**

Look at the `convex dev` terminal from Task 0.1 — it watches the file and auto-pushes. Expected: another `Convex functions ready!` line, no errors.

If you see a schema validation error mentioning `email` still being present on some doc, the backfill didn't clear it — investigate that doc and re-run the backfill before proceeding.

### Task 0.3: Delete the one-shot migration script and commit

**Files:**
- Delete: `convex/migrations.ts`

- [ ] **Step 1: Delete the file**

Run: `git rm convex/migrations.ts`

- [ ] **Step 2: Verify convex dev re-pushes cleanly**

The watcher should re-push. Expected: `Convex functions ready!`, no errors.

- [ ] **Step 3: Commit Phase 0**

```bash
git add convex/schema.ts convex/_generated/api.d.ts
git commit -m "$(cat <<'EOF'
chore(auth): complete username migration

Backfilled profiles.username from legacy email field via one-shot
migration, dropped the temporary email field, narrowed username back
to required. Added profiles.disabled flag in preparation for admin-
managed teacher accounts.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance for Phase 0:** Sign-in works end-to-end. Open the app at `/sign-in`, sign in with one of the backfilled usernames + that account's password. You land on `/`. If sign-in still fails, do NOT proceed — debug the auth deployment first.

---

## Phase 1 — Implement the admin-provisions-teachers feature

### Task 1.1: Password generator utility (TDD)

A pure function that returns a 12-char random password from an unambiguous alphabet. Used by `createTeacher` and `resetTeacherPassword`.

**Files:**
- Create: `convex/lib/passwordGen.ts`
- Create: `tests/passwordGen.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/passwordGen.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  generatePassword,
  PASSWORD_ALPHABET,
  PASSWORD_LENGTH,
} from "../convex/lib/passwordGen";

describe("generatePassword", () => {
  it("returns a string of PASSWORD_LENGTH characters", () => {
    const pw = generatePassword();
    expect(pw).toHaveLength(PASSWORD_LENGTH);
  });

  it("uses only characters from the unambiguous alphabet", () => {
    for (let i = 0; i < 100; i++) {
      const pw = generatePassword();
      for (const ch of pw) {
        expect(PASSWORD_ALPHABET).toContain(ch);
      }
    }
  });

  it("excludes ambiguous characters 0, O, l, 1, I", () => {
    for (const ch of "0Ol1I") {
      expect(PASSWORD_ALPHABET).not.toContain(ch);
    }
  });

  it("produces distinct values across draws (probabilistic)", () => {
    const draws = new Set<string>();
    for (let i = 0; i < 200; i++) draws.add(generatePassword());
    expect(draws.size).toBeGreaterThan(195);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/passwordGen.test.ts`

Expected: FAIL with "Cannot find module ... passwordGen".

- [ ] **Step 3: Implement the generator**

Create `convex/lib/passwordGen.ts`:

```ts
export const PASSWORD_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
export const PASSWORD_LENGTH = 12;

export function generatePassword(): string {
  const bytes = new Uint32Array(PASSWORD_LENGTH);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < PASSWORD_LENGTH; i++) {
    out += PASSWORD_ALPHABET[bytes[i] % PASSWORD_ALPHABET.length];
  }
  return out;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/passwordGen.test.ts`

Expected: 4 passing tests.

- [ ] **Step 5: Commit**

```bash
git add convex/lib/passwordGen.ts tests/passwordGen.test.ts
git commit -m "feat(admin): add password generator for admin-provisioned accounts

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.2: Credential bundle formatter (TDD)

A pure function that returns the multi-line bundle text. Used by the credentials modal.

**Files:**
- Create: `src/lib/credentialBundle.ts`
- Create: `src/lib/credentialBundle.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/credentialBundle.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { formatCredentialBundle } from "./credentialBundle";

describe("formatCredentialBundle", () => {
  it("includes the sign-in URL built from origin", () => {
    const text = formatCredentialBundle({
      origin: "https://example.com",
      username: "alice",
      password: "Abc23xyzPQR9",
    });
    expect(text).toContain("Sign in: https://example.com/sign-in");
  });

  it("includes the username and password", () => {
    const text = formatCredentialBundle({
      origin: "https://x.test",
      username: "alice",
      password: "Abc23xyzPQR9",
    });
    expect(text).toContain("Username: alice");
    expect(text).toContain("Password: Abc23xyzPQR9");
  });

  it("includes usage instructions and the lost-password note", () => {
    const text = formatCredentialBundle({
      origin: "https://x.test",
      username: "alice",
      password: "p",
    });
    expect(text).toContain("How to use:");
    expect(text).toContain('Go to "My Classes"');
    expect(text).toMatch(/admin to reset/);
  });

  it("strips a trailing slash from origin so URL has no double slash", () => {
    const text = formatCredentialBundle({
      origin: "https://x.test/",
      username: "u",
      password: "p",
    });
    expect(text).toContain("Sign in: https://x.test/sign-in");
    expect(text).not.toContain("//sign-in");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/credentialBundle.test.ts`

Expected: FAIL with "Cannot find module ... credentialBundle".

- [ ] **Step 3: Implement the formatter**

Create `src/lib/credentialBundle.ts`:

```ts
export interface CredentialBundleInput {
  origin: string;
  username: string;
  password: string;
}

export function formatCredentialBundle({
  origin,
  username,
  password,
}: CredentialBundleInput): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  return [
    "Welcome to Report Card!",
    "",
    "Your teacher account is ready.",
    "",
    `Sign in: ${cleanOrigin}/sign-in`,
    `Username: ${username}`,
    `Password: ${password}`,
    "",
    "How to use:",
    "1. Open the link above and sign in with these credentials.",
    '2. Go to "My Classes" to create a class and add students.',
    "3. Open a class to choose kits and enter scores.",
    "4. Use the class report to share scores with parents.",
    "",
    "Keep this message — your password won't be shown again.",
    "If you lose it, ask your admin to reset it for you.",
  ].join("\n");
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/credentialBundle.test.ts`

Expected: 4 passing tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/credentialBundle.ts src/lib/credentialBundle.test.ts
git commit -m "feat(admin): add credential bundle formatter

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.3: Enforce `disabled` in `requireProfile`

So that disabled teachers get rejected on every query/mutation without per-call changes.

**Files:**
- Modify: `convex/lib/access.ts:5-16`

- [ ] **Step 1: Update `requireProfile`**

Replace the function body in `convex/lib/access.ts`:

```ts
export async function requireProfile(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();
  if (!profile) throw new Error("Profile missing — sign out and back in");
  if (profile.disabled === true) throw new Error("Account disabled");
  return profile;
}
```

- [ ] **Step 2: Verify convex dev re-pushes cleanly**

Watch your `convex dev` terminal. Expected: `Convex functions ready!`, no type errors.

- [ ] **Step 3: Commit**

```bash
git add convex/lib/access.ts
git commit -m "feat(auth): reject disabled profiles in requireProfile

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.4: Backend `createTeacher` action

Creates the auth account, user row, and profile row in one atomic action.

**Files:**
- Create: `convex/admin.ts`

- [ ] **Step 1: Create the file with the action**

Create `convex/admin.ts`:

```ts
import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { createAccount } from "@convex-dev/auth/server";
import { normalizeUsername, assertValidUsername } from "./lib/username";
import { generatePassword } from "./lib/passwordGen";
import { requireAdmin } from "./lib/access";

export const createTeacher = action({
  args: { username: v.string(), displayName: v.string() },
  returns: v.object({ username: v.string(), password: v.string() }),
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.admin.requireAdminCaller, {});

    const username = normalizeUsername(args.username);
    assertValidUsername(username);
    const displayName = args.displayName.trim();
    if (displayName.length === 0) throw new Error("Display name is required");

    const taken = await ctx.runQuery(internal.admin.findProfileByUsername, {
      username,
    });
    if (taken) throw new Error("Username already taken");

    const password = generatePassword();
    const created = await createAccount(ctx, {
      provider: "password",
      account: { id: username, secret: password },
      profile: { email: username },
      shouldLinkViaEmail: false,
      shouldLinkViaPhone: false,
    });

    await ctx.runMutation(internal.admin.insertTeacherProfile, {
      userId: created.user._id,
      username,
      displayName,
    });

    return { username, password };
  },
});

export const requireAdminCaller = internalQuery({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return null;
  },
});

export const findProfileByUsername = internalQuery({
  args: { username: v.string() },
  returns: v.union(v.id("profiles"), v.null()),
  handler: async (ctx, { username }) => {
    const doc = await ctx.db
      .query("profiles")
      .withIndex("by_username", (q) => q.eq("username", username))
      .unique();
    return doc ? doc._id : null;
  },
});

export const insertTeacherProfile = internalMutation({
  args: {
    userId: v.id("users"),
    username: v.string(),
    displayName: v.string(),
  },
  returns: v.id("profiles"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("profiles", {
      userId: args.userId,
      username: args.username,
      displayName: args.displayName,
      role: "teacher",
    });
  },
});
```

- [ ] **Step 2: Verify convex dev re-pushes cleanly**

Watch the `convex dev` terminal. Expected: `Convex functions ready!`.

- [ ] **Step 3: Manual acceptance test**

In a second terminal, run:

```bash
npx convex run admin:createTeacher '{"username": "test.teacher", "displayName": "Test Teacher"}'
```

Note: this will fail with `"Not authenticated"` because CLI calls don't carry an auth session. That's expected and proves the admin gate works. We'll exercise the happy path from the UI in Task 1.10's manual test.

- [ ] **Step 4: Commit**

```bash
git add convex/admin.ts
git commit -m "feat(admin): add createTeacher action

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.5: Backend `resetTeacherPassword` action

**Files:**
- Modify: `convex/admin.ts` (append)

- [ ] **Step 1: Add the action**

Append to `convex/admin.ts`:

```ts
import { modifyAccountCredentials, invalidateSessions } from "@convex-dev/auth/server";

export const resetTeacherPassword = action({
  args: { profileId: v.id("profiles") },
  returns: v.object({ username: v.string(), password: v.string() }),
  handler: async (ctx, { profileId }) => {
    await ctx.runQuery(internal.admin.requireAdminCaller, {});
    const target = await ctx.runQuery(internal.admin.getProfileForReset, {
      profileId,
    });
    if (target.role !== "teacher") {
      throw new Error("Admin password reset must be done from the dashboard");
    }
    const password = generatePassword();
    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: target.username, secret: password },
    });
    await invalidateSessions(ctx, { userId: target.userId });
    return { username: target.username, password };
  },
});

export const getProfileForReset = internalQuery({
  args: { profileId: v.id("profiles") },
  returns: v.object({
    role: v.union(v.literal("admin"), v.literal("teacher")),
    username: v.string(),
    userId: v.id("users"),
  }),
  handler: async (ctx, { profileId }) => {
    const p = await ctx.db.get(profileId);
    if (!p) throw new Error("Profile not found");
    return { role: p.role, username: p.username, userId: p.userId };
  },
});
```

Move the existing `import { createAccount } from "@convex-dev/auth/server";` line to merge with the new import so it becomes a single line:

```ts
import {
  createAccount,
  modifyAccountCredentials,
  invalidateSessions,
} from "@convex-dev/auth/server";
```

- [ ] **Step 2: Verify convex dev re-pushes cleanly**

Watch the terminal. Expected: `Convex functions ready!`.

- [ ] **Step 3: Commit**

```bash
git add convex/admin.ts
git commit -m "feat(admin): add resetTeacherPassword action

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.6: Backend `setTeacherDisabled` action

**Files:**
- Modify: `convex/admin.ts` (append)

- [ ] **Step 1: Add the action and its helper mutation**

Append to `convex/admin.ts`:

```ts
export const setTeacherDisabled = action({
  args: { profileId: v.id("profiles"), disabled: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await ctx.runMutation(
      internal.admin.patchTeacherDisabled,
      args,
    );
    if (args.disabled) {
      await invalidateSessions(ctx, { userId });
    }
    return null;
  },
});

export const patchTeacherDisabled = internalMutation({
  args: { profileId: v.id("profiles"), disabled: v.boolean() },
  returns: v.id("users"),
  handler: async (ctx, { profileId, disabled }) => {
    const caller = await requireAdmin(ctx);
    if (caller._id === profileId) throw new Error("Cannot disable yourself");
    const target = await ctx.db.get(profileId);
    if (!target) throw new Error("Profile not found");
    if (target.role === "admin") throw new Error("Cannot disable an admin");
    await ctx.db.patch(profileId, { disabled: disabled || undefined });
    return target.userId;
  },
});
```

- [ ] **Step 2: Verify convex dev re-pushes cleanly**

Watch the terminal. Expected: `Convex functions ready!`.

- [ ] **Step 3: Commit**

```bash
git add convex/admin.ts
git commit -m "feat(admin): add setTeacherDisabled action

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.7: Extend `profiles.listTeachers` to return `disabled` status

The existing query at `convex/profiles.ts:43-49` returns full docs already, so `disabled` flows through automatically. But the response type used by the existing AdminDashboard doesn't currently destructure `disabled`. We don't need to change the query — it returns whole docs. This task is verification only.

**Files:**
- Verify only: `convex/profiles.ts:43-49`

- [ ] **Step 1: Confirm the query returns `disabled`**

Read `convex/profiles.ts` lines 43-49. It does `return await ctx.db.query("profiles").collect();` which returns full docs including the new optional `disabled` field. No change needed.

- [ ] **Step 2: No commit (no changes)**

### Task 1.8: `CredentialsModal` component

Shared modal shown after Create and Reset Password.

**Files:**
- Create: `src/components/CredentialsModal.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/CredentialsModal.tsx`:

```tsx
import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { Button } from "./ui/Button";
import { formatCredentialBundle } from "../lib/credentialBundle";

interface Props {
  username: string;
  password: string;
  onClose: () => void;
}

export default function CredentialsModal({
  username,
  password,
  onClose,
}: Props) {
  const [copied, setCopied] = useState(false);
  const text = formatCredentialBundle({
    origin: window.location.origin,
    username,
    password,
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked — user can still select manually.
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-lg bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">
            Share these credentials
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="p-5 space-y-4">
          <p className="text-sm text-ink-muted">
            This password is shown only once. Copy the whole bundle and send it
            to <strong className="text-ink">{username}</strong>.
          </p>
          <pre className="font-mono text-xs whitespace-pre-wrap bg-surface-muted rounded border border-line p-3 max-h-80 overflow-y-auto">
            {text}
          </pre>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={onClose}>
              Done
            </Button>
            <Button onClick={copy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy bundle
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CredentialsModal.tsx
git commit -m "feat(admin): add CredentialsModal component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.9: `CreateTeacherModal` component

Form modal: username + display name.

**Files:**
- Create: `src/components/CreateTeacherModal.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/CreateTeacherModal.tsx`:

```tsx
import { useState } from "react";
import { X } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { FormField } from "./ui/FormField";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";

interface Props {
  onClose: () => void;
  onCreated: (creds: { username: string; password: string }) => void;
}

export default function CreateTeacherModal({ onClose, onCreated }: Props) {
  const createTeacher = useAction(api.admin.createTeacher);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const normalized = normalizeUsername(username);
      assertValidUsername(normalized);
      if (displayName.trim().length === 0) {
        throw new Error("Display name is required");
      }
      const creds = await createTeacher({
        username: normalized,
        displayName: displayName.trim(),
      });
      onCreated(creds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">
            Create teacher
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <FormField
            label="Username"
            hint="Letters, digits, '.', '_', '-'. 3-32 characters. Lowercased."
          >
            {(id, describedBy) => (
              <Input
                id={id}
                type="text"
                required
                minLength={3}
                maxLength={32}
                autoCapitalize="none"
                spellCheck={false}
                aria-describedby={describedBy}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
          </FormField>
          <FormField label="Display name" hint="Shown in lists and reports.">
            {(id, describedBy) => (
              <Input
                id={id}
                type="text"
                required
                aria-describedby={describedBy}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            )}
          </FormField>
          {error && <p className="text-sm text-danger">{error}</p>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={busy}>
              {busy ? "Creating…" : "Create teacher"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CreateTeacherModal.tsx
git commit -m "feat(admin): add CreateTeacherModal component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.10: Integrate Create / Reset / Disable into AdminDashboard

**Files:**
- Modify: `src/pages/AdminDashboard.tsx`

- [ ] **Step 1: Add new state, action hooks, and row actions**

Replace the top of `src/pages/AdminDashboard.tsx` (lines 1-92) with this new version. Keep the existing `AssignmentsDrawer` function (lines 94+) unchanged.

```tsx
// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState, useMemo } from "react";
import { Boxes, Search, X, Plus, KeyRound, Ban, RotateCcw } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import CreateTeacherModal from "../components/CreateTeacherModal";
import CredentialsModal from "../components/CredentialsModal";

export default function AdminDashboard() {
  const teachers = useQuery(api.profiles.listTeachers);
  const resetPassword = useAction(api.admin.resetTeacherPassword);
  const setDisabled = useAction(api.admin.setTeacherDisabled);

  const [selectedTeacher, setSelected] = useState<Id<"profiles"> | null>(null);
  const [creating, setCreating] = useState(false);
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);

  const teacherRows = useMemo(
    () => teachers?.filter((t) => t.role === "teacher") ?? [],
    [teachers],
  );
  const selected = teacherRows.find((t) => t._id === selectedTeacher);

  async function onReset(profileId: Id<"profiles">, username: string) {
    if (!confirm(`Reset password for ${username}? Their active sessions will be signed out.`)) return;
    setRowError(null);
    try {
      const creds = await resetPassword({ profileId });
      setCredentials(creds);
    } catch (err) {
      setRowError(err instanceof Error ? err.message : "Reset failed");
    }
  }

  async function onToggleDisabled(
    profileId: Id<"profiles">,
    username: string,
    nextDisabled: boolean,
  ) {
    const verb = nextDisabled ? "Disable" : "Enable";
    if (!confirm(`${verb} ${username}?`)) return;
    setRowError(null);
    try {
      await setDisabled({ profileId, disabled: nextDisabled });
    } catch (err) {
      setRowError(err instanceof Error ? err.message : `${verb} failed`);
    }
  }

  return (
    <>
      <PageHeader
        title="Teachers"
        description="Create teacher accounts, assign kits, and manage access."
        actions={
          <div className="flex gap-2">
            <Link to="/admin/kits">
              <Button variant="secondary">
                <Boxes className="w-4 h-4" />
                Browse kits
              </Button>
            </Link>
            <Button onClick={() => setCreating(true)}>
              <Plus className="w-4 h-4" />
              Create teacher
            </Button>
          </div>
        }
      />

      {rowError && (
        <p className="text-sm text-danger mb-3" role="alert">
          {rowError}
        </p>
      )}

      {teacherRows.length === 0 ? (
        <EmptyState
          title="No teachers yet"
          description='Click "Create teacher" above to provision the first account.'
        />
      ) : (
        <Card>
          <CardBody padding="none">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-ink-muted border-b border-line/60">
                  <th className="px-5 py-2.5 font-medium">Name</th>
                  <th className="px-5 py-2.5 font-medium">Username</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teacherRows.map((t) => {
                  const isDisabled = t.disabled === true;
                  return (
                    <tr
                      key={t._id}
                      className="border-b border-line/60 last:border-b-0 hover:bg-surface-muted/50"
                    >
                      <td className="px-5 py-3 font-medium text-ink">
                        {t.displayName}
                      </td>
                      <td className="px-5 py-3 text-ink-muted">
                        @{t.username}
                      </td>
                      <td className="px-5 py-3">
                        {isDisabled ? (
                          <Badge tone="bad" size="sm">
                            Disabled
                          </Badge>
                        ) : (
                          <Badge tone="good" size="sm">
                            Active
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex gap-1.5">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelected(t._id)}
                          >
                            Manage kits
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => onReset(t._id, t.username!)}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            Reset
                          </Button>
                          <Button
                            size="sm"
                            variant={isDisabled ? "secondary" : "danger"}
                            onClick={() =>
                              onToggleDisabled(t._id, t.username!, !isDisabled)
                            }
                          >
                            {isDisabled ? (
                              <>
                                <RotateCcw className="w-3.5 h-3.5" />
                                Enable
                              </>
                            ) : (
                              <>
                                <Ban className="w-3.5 h-3.5" />
                                Disable
                              </>
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
      {creating && (
        <CreateTeacherModal
          onClose={() => setCreating(false)}
          onCreated={(creds) => {
            setCreating(false);
            setCredentials(creds);
          }}
        />
      )}
      {credentials && (
        <CredentialsModal
          username={credentials.username}
          password={credentials.password}
          onClose={() => setCredentials(null)}
        />
      )}
    </>
  );
}
```

Notes on the change:
- `teacher` callback param in `AssignmentsDrawer` typing currently destructures `{ _id, displayName, username }`. After this task, `t.username` may be `string | undefined` per the type (since `listTeachers` returns whole docs and `username` was optional during migration but is now required). Use `t.username!` non-null assertions in the action handlers since the narrowed schema guarantees it.
- The `AssignmentsDrawer` props type at the bottom of the file expects `username: string` — that stays compatible because, again, the field is now required at the schema level.

- [ ] **Step 2: Verify build + types**

Run: `npm run build`

Expected: build succeeds. If TypeScript complains about `t.username` being `string | undefined`, the `!` assertion on it resolves it. If it complains about `t.disabled`, add `?` checks (`t.disabled === true`).

- [ ] **Step 3: Manual acceptance test (golden path)**

In the running dev server (`npm run dev`):
1. Sign in as admin (your `shashankaikarnam` account).
2. You land on `/admin`. Click "Create teacher".
3. Type username `priya.s`, display name `Priya S`, click "Create teacher".
4. The credentials modal appears with a 12-char password. Click "Copy bundle". Confirm the clipboard contains the formatted text starting with "Welcome to Report Card!".
5. Close the modal. The row appears in the table with "Active" status.
6. Click "Disable" on the new row → confirm. The row shows "Disabled".
7. Open `/sign-in` in a private/incognito window. Try signing in as `priya.s` with the copied password. Expect failure ("Account disabled" or similar — surfaced via any query, not necessarily sign-in itself; sign-in will succeed but the first query in `/` will throw and the route guard will route to sign-in).
8. Back in the admin tab, click "Enable" on the same row.
9. In the private window, retry sign-in — succeed and land on `/`.
10. Back in admin, click "Reset" on the row → confirm. Get a new credentials bundle with a different password.
11. Sign out in the private window. Sign in with the new password — succeeds. Old password fails.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AdminDashboard.tsx
git commit -m "feat(admin): add create/reset/disable teacher actions to AdminDashboard

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.11: Remove public sign-up

**Files:**
- Delete: `src/pages/SignUp.tsx`
- Modify: `src/App.tsx:3,23`
- Modify: `src/pages/SignIn.tsx:88-93`

- [ ] **Step 1: Delete the SignUp page**

Run: `git rm src/pages/SignUp.tsx`

- [ ] **Step 2: Remove the import and route in App.tsx**

In `src/App.tsx`, delete line 3 (`import SignUp from "./pages/SignUp";`) and line 23 (`<Route path="/sign-up" element={<SignUp />} />`).

- [ ] **Step 3: Remove the "Create one" link block in SignIn.tsx**

Open `src/pages/SignIn.tsx`. Delete lines 88-93 (the `<p>` block with the link to `/sign-up`):

```tsx
        <p className="text-xs text-ink-muted text-center pt-1">
          No account?{" "}
          <Link to="/sign-up" className="text-accent hover:underline">
            Create one
          </Link>
        </p>
```

Also remove the now-unused `Link` import from `react-router-dom` at the top of the file if no other `<Link>` usage remains (check the file first).

- [ ] **Step 4: Verify build**

Run: `npm run build`

Expected: success. If TypeScript flags an unused `Link` import in `SignIn.tsx`, remove it.

- [ ] **Step 5: Manual smoke test**

1. Navigate to `/sign-up` in the browser — expect a redirect to `/sign-in` (caught by the `*` catch-all route).
2. Confirm `/sign-in` no longer shows the "Create one" link.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/pages/SignIn.tsx
git commit -m "feat(auth): remove public sign-up; admin provisions accounts only

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Task 1.12: Update README

**Files:**
- Modify: `README.md:7-14`
- Modify: `README.md:25-28`

- [ ] **Step 1: Replace the `Roles` section**

In `README.md`, replace lines 7-14 (the current "Roles" bullet list) with:

```markdown
- **Admin** — a profile with `role: "admin"`. Admins manage kit
  assignments per teacher, edit any rubric, and provision teacher
  accounts (see "Teacher accounts" below). The first admin is
  promoted manually in the Convex dashboard (`profiles` table → set
  `role` to `"admin"`).
- **Teacher** — provisioned by an admin from the dashboard. Teachers
  can create classes, attach kits the admin has assigned them, add
  students, score them, and download report cards.
```

- [ ] **Step 2: Replace the first-time-setup tail and add Teacher accounts section**

Replace lines 25-28 (the paragraph starting "After the schema is deployed…") with:

```markdown
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
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs(readme): document admin-provisions-teachers flow

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Final verification

After all tasks complete, run from a clean state:

- [ ] `npm run test` — all unit tests pass (`passwordGen`, `credentialBundle`, plus existing `totals`).
- [ ] `npm run build` — TypeScript + Vite build succeeds.
- [ ] `npx convex dev` — `Convex functions ready!`, no schema errors.
- [ ] End-to-end manual flow from Task 1.10 Step 3 — golden path + disable + reset all work.
- [ ] `git log --oneline` shows commits for Phase 0 + each Phase 1 task.

**Done.** The admin is now the sole gatekeeper for teacher accounts.
