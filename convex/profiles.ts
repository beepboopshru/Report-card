import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { isAdminEmail, requireProfile } from "./lib/access";

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
    if (existing) {
      const expectedRole = isAdminEmail(existing.email) ? "admin" : "teacher";
      if (existing.role !== expectedRole) {
        await ctx.db.patch(existing._id, { role: expectedRole });
      }
      return existing._id;
    }

    const email = (user.email ?? "").toLowerCase();
    return await ctx.db.insert("profiles", {
      userId,
      email,
      displayName: user.name ?? email.split("@")[0],
      role: isAdminEmail(email) ? "admin" : "teacher",
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
