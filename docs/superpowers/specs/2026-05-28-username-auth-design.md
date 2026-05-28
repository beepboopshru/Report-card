# Switch auth from email to username + password

**Date:** 2026-05-28
**Status:** Approved (fresh-start migration; no backward compatibility)

## Problem

The app currently authenticates via email + password using `@convex-dev/auth`'s `Password` provider. Admin status is derived from an `ADMIN_EMAILS` env var. We want to replace email with a username as the login identifier.

## Decisions

- **Fresh start.** No real users to preserve. All auth tables and `profiles` get wiped as part of the switch. No dual-login transition.
- **Admin promotion is manual.** Every new sign-up is created with `role: "teacher"`. Admins are promoted by editing the profile row's `role` to `"admin"` in the Convex dashboard. `ADMIN_EMAILS` env var and `isAdminEmail()` helper are removed.
- **Email is removed from the profile entirely.** No optional contact email. Profile keys off `username` + `displayName` only.
- **Username rules:** 3–32 characters, `[a-z0-9._-]+`, lowercase. Input is lowercased and trimmed before storage and validation. Same rule on client and server.

## Architecture

We keep the `Password` provider and the `authTables` schema unchanged. The provider's identifier column is named `email` internally, but we repurpose it to hold the username string — no migration of the auth tables is needed beyond wiping data.

The application-level `profiles` table is reshaped to store `username` instead of `email`.

### Backend

**`convex/auth.ts`**

- Continue exporting `auth`, `signIn`, `signOut`, `store`, `isAuthenticated` from `convexAuth({ providers: [Password({...})] })`.
- Override the `Password` provider's `profile` callback so it accepts `username` from form params, validates the format, lowercases it, and returns `{ email: username }`. The Convex Auth account row will store the username string in its `email` column.
- Reject invalid usernames with a clear error (server-side defense; client validates too).

**`convex/schema.ts`**

- `profiles` table:
  - Remove `email: v.string()` field and `by_email` index.
  - Add `username: v.string()` field and `by_username` index.
  - Keep `userId`, `displayName`, `role` unchanged.
- `authTables` spread stays as-is.

**`convex/profiles.ts`**

- `ensure` mutation:
  - Read `user.email` from the auth users row (it now holds the username string).
  - If a profile exists for `userId`, return it. No more email-based role re-sync.
  - Otherwise insert `{ userId, username, displayName: username, role: "teacher" }`.
- `me` query unchanged.
- `listTeachers` query unchanged.

**`convex/lib/access.ts`**

- Remove `isAdminEmail()` and the `ADMIN_EMAILS` env var read.
- `requireProfile`, `requireAdmin`, `requireTeacher`, `requireOwnsClass` stay as-is — they already key off `role`, not email.

**One-time data reset**

- Manually clear these tables in the Convex dashboard (or via a single internal mutation run once): `users`, `authAccounts`, `authSessions`, `authRefreshTokens`, `authVerificationCodes`, `authVerifiers`, `profiles`. No code path for backward compatibility.

### Frontend

**`src/pages/SignIn.tsx` and `src/pages/SignUp.tsx`**

- Replace `email` state and input with `username`. Input is `<Input type="text" autoComplete="username">`.
- Client-side validation: 3–32 chars, `[a-z0-9._-]+` after lowercasing+trimming. Show inline error if invalid before submit.
- Call `signIn("password", { email: username.toLowerCase().trim(), password, flow })`. The SDK parameter remains named `email` — we just pass the username through it.
- SignUp page shows a hint under the username field: "Lowercase letters, digits, `.`, `_`, `-`. 3–32 characters."

**Other UI touch-points**

- `src/pages/AdminDashboard.tsx` — any "Email" column header or label becomes "Username". Underlying field reference becomes `profile.username`.
- `src/components/Sidebar.tsx` — if the user's email is displayed, swap to `profile.username` (or `profile.displayName`).
- Any other reference to `profile.email` becomes `profile.username`. (Grep for `profile.email` and `\.email` within src/ to confirm.)

## Out of scope

- Password reset, email verification, "remember me".
- A UI for changing username post-signup.
- A UI for editing displayName (untouched; if such UI exists today it continues to work).
- A UI for promoting users to admin — promotion is done in the Convex dashboard.

## Risks / notes

- The Convex Auth `Password` provider has built-in email-format validation behavior in some configurations. The custom `profile` callback must fully override this and we must verify locally that sign-up with a non-email username succeeds end-to-end before considering implementation done.
- The auth `users.email` column will hold non-email strings — this is internal to Convex Auth and acceptable. Anything in the app that previously inferred semantics from `users.email` being an email address must now treat it as a username.
