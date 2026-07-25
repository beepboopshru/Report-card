import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireOwnsClass } from "./lib/access";

export const listForClass = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const rows = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return rows.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const get = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, { studentId }) => {
    const student = await ctx.db.get(studentId);
    if (!student) return null;
    await requireOwnsClass(ctx, student.classId);
    return student;
  },
});

export const credentialsForClass = query({
  args: { classId: v.id("classes") },
  returns: v.array(
    v.object({
      name: v.string(),
      rollNo: v.string(),
      username: v.string(),
      password: v.string(),
    }),
  ),
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const rows = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return rows
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((s) => ({
        name: s.name,
        rollNo: s.rollNo ?? "",
        username: s.username ?? "",
        password: s.initialPassword ?? "",
      }));
  },
});

export const bulkCreate = mutation({
  args: {
    classId: v.id("classes"),
    rows: v.array(
      v.object({ name: v.string(), rollNo: v.optional(v.string()) }),
    ),
  },
  returns: v.object({ added: v.number(), skipped: v.number() }),
  handler: async (ctx, { classId, rows }) => {
    await requireOwnsClass(ctx, classId);
    if (rows.length > 200) throw new Error("Too many rows (max 200)");
    const existing = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    const seen = new Set(existing.map((s) => s.name.trim().toLowerCase()));
    let added = 0;
    for (const row of rows) {
      const name = row.name.trim();
      if (!name || seen.has(name.toLowerCase())) continue;
      seen.add(name.toLowerCase());
      const rollNo = row.rollNo?.trim();
      await ctx.db.insert("students", {
        classId,
        name,
        rollNo: rollNo === "" ? undefined : rollNo,
      });
      added++;
    }
    return { added, skipped: rows.length - added };
  },
});

export const create = mutation({
  args: { classId: v.id("classes"), name: v.string(), rollNo: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await requireOwnsClass(ctx, args.classId);
    return await ctx.db.insert("students", args);
  },
});

export const update = mutation({
  args: { studentId: v.id("students"), name: v.string(), rollNo: v.optional(v.string()) },
  handler: async (ctx, { studentId, name, rollNo }) => {
    const student = await ctx.db.get(studentId);
    if (!student) throw new Error("Student not found");
    await requireOwnsClass(ctx, student.classId);
    await ctx.db.patch(studentId, { name, rollNo });
  },
});

export const remove = mutation({
  args: { studentId: v.id("students") },
  handler: async (ctx, { studentId }) => {
    const student = await ctx.db.get(studentId);
    if (!student) return;
    await requireOwnsClass(ctx, student.classId);
    const scores = await ctx.db
      .query("scores")
      .withIndex("by_student", (q) => q.eq("studentId", studentId))
      .collect();
    for (const s of scores) await ctx.db.delete(s._id);
    await ctx.db.delete(studentId);
  },
});
