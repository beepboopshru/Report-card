import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import {
  createAccount,
  modifyAccountCredentials,
  invalidateSessions,
} from "@convex-dev/auth/server";
import { normalizeUsername, assertValidUsername } from "./lib/username";
import { generatePassword } from "./lib/passwordGen";
import { requireAdmin } from "./lib/access";
import { replaceTeacherLevelRows, teacherLevelValidator } from "./lms";

function resolvePassword(chosen: string | undefined): string {
  if (chosen === undefined) return generatePassword();
  const password = chosen.trim();
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  return password;
}

export const createTeacher = action({
  args: {
    username: v.string(),
    displayName: v.string(),
    // Admin-chosen password; omitted = generate a random one.
    password: v.optional(v.string()),
    // Single-user account: LMS access only, no class workflow.
    lmsOnly: v.optional(v.boolean()),
    // LMS courses assigned during initial setup. Later edits from the logins
    // page (lms.setTeacherLevels) are limited to single-user accounts.
    lms: v.optional(v.array(teacherLevelValidator)),
  },
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

    const password = resolvePassword(args.password);
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
      lmsOnly: args.lmsOnly,
      initialPassword: password,
      lms: args.lms,
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
    lmsOnly: v.optional(v.boolean()),
    initialPassword: v.string(),
    lms: v.optional(v.array(teacherLevelValidator)),
  },
  returns: v.id("profiles"),
  handler: async (ctx, args) => {
    const profileId = await ctx.db.insert("profiles", {
      userId: args.userId,
      username: args.username,
      displayName: args.displayName,
      role: "teacher",
      lmsOnly: args.lmsOnly || undefined,
      initialPassword: args.initialPassword,
    });
    if (args.lms && args.lms.length > 0) {
      await replaceTeacherLevelRows(ctx, profileId, args.lms);
    }
    return profileId;
  },
});

export const resetTeacherPassword = action({
  args: {
    profileId: v.id("profiles"),
    // Admin-chosen password; omitted = generate a random one.
    password: v.optional(v.string()),
  },
  returns: v.object({ username: v.string(), password: v.string() }),
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.admin.requireAdminCaller, {});
    const target: {
      role: "admin" | "teacher" | "student";
      username: string;
      userId: Id<"users">;
    } = await ctx.runQuery(internal.admin.getProfileForReset, {
      profileId: args.profileId,
    });
    if (target.role !== "teacher") {
      throw new Error("Admin password reset must be done from the dashboard");
    }
    const password = resolvePassword(args.password);
    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: target.username, secret: password },
    });
    await ctx.runMutation(internal.admin.patchProfilePassword, {
      profileId: args.profileId,
      password,
    });
    await invalidateSessions(ctx, { userId: target.userId });
    return { username: target.username, password };
  },
});

export const patchProfilePassword = internalMutation({
  args: { profileId: v.id("profiles"), password: v.string() },
  returns: v.null(),
  handler: async (ctx, { profileId, password }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(profileId, { initialPassword: password });
    return null;
  },
});

/**
 * Changes the sign-in username of a school/teacher account. The password
 * (and its hash) is untouched; existing sessions keep working since they
 * are tied to the user, not the username.
 */
export const renameTeacherLogin = mutation({
  args: { profileId: v.id("profiles"), username: v.string() },
  returns: v.string(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const target = await ctx.db.get(args.profileId);
    if (!target || target.role !== "teacher") {
      throw new Error("Not a school/teacher account");
    }
    const username = normalizeUsername(args.username);
    assertValidUsername(username);
    if (username === target.username) return username;
    const taken = await ctx.db
      .query("profiles")
      .withIndex("by_username", (q) => q.eq("username", username))
      .unique();
    if (taken) throw new Error("Username already taken");
    const account = await ctx.db
      .query("authAccounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", "password").eq("providerAccountId", target.username),
      )
      .unique();
    if (!account) throw new Error("Login account not found");
    await ctx.db.patch(account._id, { providerAccountId: username });
    await ctx.db.patch(target.userId, { email: username });
    await ctx.db.patch(args.profileId, { username });
    return username;
  },
});

/**
 * Converts a single-user (LMS only) account into a normal school/teacher
 * account: it gains the school-setup, classes, and approval workflow on next
 * login. Any courses assigned to the account are kept.
 */
export const convertToFullAccount = mutation({
  args: { profileId: v.id("profiles") },
  returns: v.null(),
  handler: async (ctx, { profileId }) => {
    await requireAdmin(ctx);
    const target = await ctx.db.get(profileId);
    if (!target || target.role !== "teacher" || target.lmsOnly !== true) {
      throw new Error("Not a single-user (LMS only) account");
    }
    await ctx.db.patch(profileId, { lmsOnly: undefined });
    return null;
  },
});

/** Admin view of every school/teacher login, with the stored password. */
export const listLogins = query({
  args: {},
  returns: v.array(
    v.object({
      profileId: v.id("profiles"),
      displayName: v.string(),
      username: v.string(),
      lmsOnly: v.boolean(),
      disabled: v.boolean(),
      // Null for accounts created before passwords were stored;
      // editing the password fills it in.
      password: v.union(v.string(), v.null()),
    }),
  ),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("profiles").collect();
    return all
      .filter((p) => p.role === "teacher")
      .map((p) => ({
        profileId: p._id,
        displayName: p.displayName,
        username: p.username,
        lmsOnly: p.lmsOnly === true,
        disabled: p.disabled === true,
        password: p.initialPassword ?? null,
      }));
  },
});

export const getProfileForReset = internalQuery({
  args: { profileId: v.id("profiles") },
  returns: v.object({
    role: v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student"),
    ),
    username: v.string(),
    userId: v.id("users"),
  }),
  handler: async (ctx, { profileId }) => {
    const p = await ctx.db.get(profileId);
    if (!p) throw new Error("Profile not found");
    return { role: p.role, username: p.username, userId: p.userId };
  },
});

export const setTeacherDisabled = action({
  args: { profileId: v.id("profiles"), disabled: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId: Id<"users"> = await ctx.runMutation(
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
