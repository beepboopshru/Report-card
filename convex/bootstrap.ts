import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { createAccount } from "@convex-dev/auth/server";
import { normalizeUsername, assertValidUsername } from "./lib/username";
import { generatePassword } from "./lib/passwordGen";

// Creates the first admin profile. Refuses if any admin already exists, so it
// is safe to leave deployed — it can only run once per deployment lifetime.
export const createFirstAdmin = action({
  args: { username: v.string(), displayName: v.string() },
  returns: v.object({ username: v.string(), password: v.string() }),
  handler: async (ctx, args) => {
    const adminExists = await ctx.runQuery(internal.bootstrap.anyAdminExists, {});
    if (adminExists) {
      throw new Error(
        "An admin already exists. Use the admin dashboard to provision new users.",
      );
    }

    const username = normalizeUsername(args.username);
    assertValidUsername(username);
    const displayName = args.displayName.trim();
    if (displayName.length === 0) throw new Error("Display name is required");

    const taken = await ctx.runQuery(internal.bootstrap.findProfileByUsername, {
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

    await ctx.runMutation(internal.bootstrap.insertAdminProfile, {
      userId: created.user._id,
      username,
      displayName,
    });

    return { username, password };
  },
});

export const anyAdminExists = internalQuery({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const admin = await ctx.db
      .query("profiles")
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();
    return admin !== null;
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

export const insertAdminProfile = internalMutation({
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
      role: "admin",
    });
  },
});
