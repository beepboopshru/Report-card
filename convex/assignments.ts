import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { requireAdmin, requireProfile } from "./lib/access";

export const listForTeacher = query({
  args: { teacherProfileId: v.id("profiles") },
  handler: async (ctx, { teacherProfileId }) => {
    const caller = await requireProfile(ctx);
    if (caller.role !== "admin" && caller._id !== teacherProfileId) {
      throw new ConvexError("Forbidden");
    }
    return await ctx.db
      .query("assignments")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", teacherProfileId))
      .collect();
  },
});

export const set = mutation({
  args: {
    teacherProfileId: v.id("profiles"),
    kitId: v.id("kits"),
    assigned: v.boolean(),
  },
  handler: async (ctx, { teacherProfileId, kitId, assigned }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("assignments")
      .withIndex("by_teacher_and_kit", (q) =>
        q.eq("teacherProfileId", teacherProfileId).eq("kitId", kitId),
      )
      .unique();
    if (assigned && !existing) {
      await ctx.db.insert("assignments", { teacherProfileId, kitId });
    } else if (!assigned && existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
