# Admin provisions teacher accounts

**Date:** 2026-05-28
**Status:** Design approved, pending implementation
**Depends on:** Completion of the in-progress username-auth schema migration (widen → backfill → narrow)

## Problem

Teachers should not self-register. Today `/sign-up` is publicly open, which means anyone who lands on the site can create a teacher account and access the admin's view of classes/kits. The admin needs to be the single gatekeeper: provision teachers, hand them credentials, and revoke access when someone leaves.

## Goal

An admin-only page where the admin can:

1. Create a teacher account by typing a username + display name. The system generates the password and shows a one-time copyable bundle (page URL + username + password + how-to instructions) the admin shares with the teacher.
2. Reset an existing teacher's password (same one-time bundle UX).
3. Disable / re-enable a teacher so they can no longer sign in or perform mutations.

Public sign-up is removed entirely. The first admin is bootstrapped manually via the Convex dashboard (already documented in the README).

## Non-goals

- Magic-link sign-in or invite tokens. Plain credentials only.
- Self-service password reset by the teacher. They must ask the admin.
- Email delivery of credentials. Admin pastes the bundle into whatever channel they choose.
- Promoting teachers to admins, or creating other admins from the UI. Admin promotion stays a manual Convex-dashboard step.
- Audit log of admin actions. Out of scope for v1.

## Architecture

Three layers:

1. **Backend (`convex/admin.ts`)** — three admin-gated functions that wrap `@convex-dev/auth/server` helpers (`createAccount`, `modifyAccountCredentials`, `invalidateSessions`).
2. **Schema change** — `profiles.disabled: v.optional(v.boolean())` flag, checked by the existing `requireProfile` helper.
3. **Frontend (`src/pages/AdminTeachers.tsx` + a credentials modal)** — list of teachers with row actions, a "Create teacher" modal, and a one-time credentials panel triggered by both Create and Reset Password flows.

The public `/sign-up` route and `SignUp.tsx` are deleted; the "Create one" link is removed from `SignIn.tsx`.

## Data model

Extend the existing `profiles` table:

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

`disabled` omitted ↔ active. No new tables. No new indexes.

Note: this addition is purely additive on the already-narrowed schema (post-migration). It does not require its own widen-migrate-narrow because the field is optional.

## Backend functions

All three live in `convex/admin.ts`. Each calls `requireProfile(ctx)` and asserts `role === "admin"`. Non-admin callers get `"Forbidden"`.

### `createTeacher` (action)

```ts
args: { username: v.string(), displayName: v.string() }
returns: { username: string, password: string }
```

Steps:

1. Admin gate.
2. `assertValidUsername(normalizeUsername(args.username))`.
3. Reject `displayName` shorter than 1 char after trim.
4. Look up existing profile by `by_username` index → throw `"Username already taken"` if any.
5. Generate password: 12 chars sampled from an unambiguous alphabet (no `0/O/l/1/I`) — `[A-HJ-NP-Z2-9a-km-z]`. Use `crypto.getRandomValues`.
6. Call `createAccount(ctx, { provider: "password", account: { id: username, secret: password }, profile: { email: username }, shouldLinkViaEmail: false, shouldLinkViaPhone: false })`. The helper creates the `authAccount`, hashes the secret, and creates the `users` row.
7. Insert the `profiles` row: `{ userId: created.user._id, username, displayName, role: "teacher" }`.
8. Return `{ username, password }`. Password is never persisted.

### `resetTeacherPassword` (action)

```ts
args: { profileId: v.id("profiles") }
returns: { username: string, password: string }
```

Steps:

1. Admin gate.
2. Load the target profile. If role is not `"teacher"` → throw (admin password reset stays manual).
3. Generate a new password (same alphabet).
4. Call `modifyAccountCredentials(ctx, { provider: "password", account: { id: profile.username, secret: newPassword } })`.
5. Call `invalidateSessions(ctx, { userId: profile.userId })` so any open tabs get kicked.
6. Return `{ username: profile.username, password: newPassword }`.

### `setTeacherDisabled` (mutation)

```ts
args: { profileId: v.id("profiles"), disabled: v.boolean() }
returns: null
```

Steps:

1. Admin gate.
2. Load target profile. Reject if it's the caller's own profile (`"Cannot disable yourself"`).
3. Reject if target role is `"admin"` (admin disable stays manual).
4. `ctx.db.patch(profileId, { disabled: args.disabled || undefined })` — store `true` or remove the field.
5. On disable, call `invalidateSessions(ctx, { userId: profile.userId })`.

### `listTeachers` (query)

```ts
args: {}
returns: Array<{ _id, username, displayName, disabled }>
```

Admin-gated. Returns all profiles with `role === "teacher"`, sorted by `username`.

## Access-control changes

Extend `convex/lib/access.ts` `requireProfile` so it throws `"Account disabled"` when `profile.disabled === true`. This blocks disabled teachers from every existing query/mutation without per-call changes.

## Frontend

### New page: `src/pages/AdminTeachers.tsx`, route `/admin/teachers`

Route is admin-gated by the existing admin guard pattern used for `AdminKits`. Layout:

- Page header: "Teachers".
- Primary action button: "Create teacher" (top-right).
- Table: username, display name, status (Active / Disabled), row actions (Reset password, Disable / Enable). The admin's own row is excluded from the listing (already handled by `role === "teacher"` filter).

Wire into the existing navigation alongside `AdminKits` so admins can reach it.

### Create modal

Two text inputs (Username, Display name) + Create button. Client-side validates username via the existing `normalizeUsername` + `assertValidUsername` helpers before submit. On success, closes itself and opens the credentials panel with the returned `{username, password}`.

### Credentials panel (shared by Create and Reset)

A modal that displays the bundle text in a monospace box and a single "Copy" button (uses `navigator.clipboard.writeText`). Bundle template:

```
Welcome to Report Card!

Your teacher account is ready.

Sign in: {origin}/sign-in
Username: {username}
Password: {password}

How to use:
1. Open the link above and sign in with these credentials.
2. Go to "My Classes" to create a class and add students.
3. Open a class to choose kits and enter scores.
4. Use the class report to share scores with parents.

Keep this message — your password won't be shown again.
If you lose it, ask your admin to reset it for you.
```

`{origin}` resolves at render time via `window.location.origin`. On close, the password is dropped from React state — there's no second chance to view it.

### Reset / Disable row actions

- Reset password → confirm prompt → call `resetTeacherPassword` → open credentials panel with the new password.
- Disable → confirm prompt → call `setTeacherDisabled(profileId, true)`. Row updates to "Disabled" state with an Enable action.
- Enable → call `setTeacherDisabled(profileId, false)`. Row updates back to Active.

### Removals

- Delete `src/pages/SignUp.tsx`.
- Remove its route registration from the router.
- Remove the "No account? Create one" link block from `SignIn.tsx`.
- Update README to reflect that teacher accounts are admin-provisioned and there is no public sign-up.

## Error handling

- Username taken → `"Username already taken"` surfaced inline in the Create modal.
- Invalid username chars/length → the existing `assertValidUsername` error surfaced inline.
- `createAccount` failure (e.g., race on username) → bubbled to the modal as a generic error; admin can retry.
- Disabled-self attempt → `"Cannot disable yourself"`, surfaced as a row error toast.
- Clipboard write failure → fall back to selecting the text in the panel and showing "Press Ctrl/Cmd+C".
- Non-admin opening `/admin/teachers` → redirect to home (same pattern as `AdminKits`).

## Testing

- Unit: password generator produces 12-char strings from the allowed alphabet, statistical sanity check (no character collisions in 10k draws beyond what's expected by chance).
- Unit: bundle-template formatter produces the expected string given a fixed origin/username/password.
- Integration (Convex): `createTeacher` then sign-in with the returned credentials succeeds.
- Integration: `resetTeacherPassword` then sign-in with the new password succeeds; sign-in with the old password fails.
- Integration: `setTeacherDisabled(true)` then any teacher query throws `"Account disabled"`; re-enable restores access.
- Integration: non-admin calls to all three admin functions throw `"Forbidden"`.
- Integration: admin cannot disable their own profile.

## Sequencing

This feature ships in two phases:

### Phase 0 — Finish the in-progress migration (blocker)

The current branch is mid-migration to username auth. Schema is widened, `convex/migrations.ts` writes the backfill, but the backfill has not yet run and the schema has not been narrowed. Order:

1. `npx convex dev` — push the widened schema.
2. `npx convex run migrations:backfillProfileUsernames` — backfill `username`, clear `email`.
3. Narrow `schema.ts` back: `username: v.string()` required, `email` field removed (but keep `disabled: v.optional(v.boolean())` from this design).
4. `npx convex dev` again to push the narrowed schema.
5. Delete `convex/migrations.ts` (one-shot script) and remove the `email` field references it touched.

Until Phase 0 is done, password sign-in is broken and this feature can't be tested.

### Phase 1 — This feature

Schema (`disabled`), backend (`convex/admin.ts`), access-control update (`requireProfile`), frontend (`AdminTeachers.tsx` + credentials modal), removal of `/sign-up`, README update.

## Open questions

None blocking. Future work that's intentionally out of scope: audit log of admin actions, self-service password reset, email-delivered credentials, multi-tenant admin scoping.
