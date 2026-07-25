import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, requireOwnsClass, requireProfile } from "./lib/access";
import { LMS_LEVEL_IDS } from "./lib/lmsCatalog";

/** Admin assigns which LMS levels a class can see (replaces existing set). */
export const setClassLevels = mutation({
  args: { classId: v.id("classes"), levelIds: v.array(v.string()) },
  returns: v.null(),
  handler: async (ctx, { classId, levelIds }) => {
    await requireAdmin(ctx);
    const cls = await ctx.db.get(classId);
    if (!cls) throw new Error("Class not found");
    for (const id of levelIds) {
      if (!LMS_LEVEL_IDS.has(id)) throw new Error(`Unknown LMS level: ${id}`);
    }
    const existing = await ctx.db
      .query("classLevels")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    for (const row of existing) await ctx.db.delete(row._id);
    for (const levelId of new Set(levelIds)) {
      await ctx.db.insert("classLevels", { classId, levelId });
    }
    return null;
  },
});

export const forClass = query({
  args: { classId: v.id("classes") },
  returns: v.array(v.string()),
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const rows = await ctx.db
      .query("classLevels")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return rows.map((r) => r.levelId);
  },
});

/** What the signed-in student sees: their name, class, and assigned levels. */
export const myLms = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      studentName: v.string(),
      className: v.string(),
      levelIds: v.array(v.string()),
    }),
  ),
  handler: async (ctx) => {
    const profile = await requireProfile(ctx);
    if (profile.role !== "student" || !profile.studentId) return null;
    const student = await ctx.db.get(profile.studentId);
    if (!student) return null;
    const cls = await ctx.db.get(student.classId);
    if (!cls) return null;
    const rows = await ctx.db
      .query("classLevels")
      .withIndex("by_class", (q) => q.eq("classId", student.classId))
      .collect();
    return {
      studentName: student.name,
      className: cls.name,
      levelIds: rows.map((r) => r.levelId),
    };
  },
});
