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
