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
