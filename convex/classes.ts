import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireOwnsClass, requireTeacher } from "./lib/access";

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const profile = await requireTeacher(ctx);
    return await ctx.db
      .query("classes")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .collect();
  },
});

export const get = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    const { cls } = await requireOwnsClass(ctx, classId);
    return cls;
  },
});

export const create = mutation({
  args: { name: v.string(), academicYear: v.string() },
  handler: async (ctx, args) => {
    const profile = await requireTeacher(ctx);
    return await ctx.db.insert("classes", { ...args, teacherProfileId: profile._id });
  },
});

export const update = mutation({
  args: { classId: v.id("classes"), name: v.string(), academicYear: v.string() },
  handler: async (ctx, { classId, name, academicYear }) => {
    await requireOwnsClass(ctx, classId);
    await ctx.db.patch(classId, { name, academicYear });
  },
});

export const remove = mutation({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    const { cls } = await requireOwnsClass(ctx, classId);
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    for (const s of students) {
      const scores = await ctx.db
        .query("scores")
        .withIndex("by_student", (q) => q.eq("studentId", s._id))
        .collect();
      for (const sc of scores) await ctx.db.delete(sc._id);
      await ctx.db.delete(s._id);
    }
    const links = await ctx.db
      .query("classKits")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    for (const l of links) await ctx.db.delete(l._id);
    await ctx.db.delete(cls._id);
  },
});
