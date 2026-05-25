import { mutation, query } from "./_generated/server";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { requireOwnsClass } from "./lib/access";

async function assertScoringAllowed(
  ctx: QueryCtx | MutationCtx,
  studentId: Id<"students">,
  kitId: Id<"kits">,
) {
  const student = await ctx.db.get(studentId);
  if (!student) throw new Error("Student not found");
  const { profile } = await requireOwnsClass(ctx, student.classId);
  const link = await ctx.db
    .query("classKits")
    .withIndex("by_class_and_kit", (q) =>
      q.eq("classId", student.classId).eq("kitId", kitId),
    )
    .unique();
  if (!link) throw new Error("Kit not in this class's curriculum");
  if (profile.role !== "admin") {
    const assigned = await ctx.db
      .query("assignments")
      .withIndex("by_teacher_and_kit", (q) =>
        q.eq("teacherProfileId", profile._id).eq("kitId", kitId),
      )
      .unique();
    if (!assigned) throw new Error("Kit not assigned to you");
  }
  return profile;
}

export const get = query({
  args: { studentId: v.id("students"), kitId: v.id("kits") },
  handler: async (ctx, { studentId, kitId }) => {
    await assertScoringAllowed(ctx, studentId, kitId);
    return await ctx.db
      .query("scores")
      .withIndex("by_student_and_kit", (q) =>
        q.eq("studentId", studentId).eq("kitId", kitId),
      )
      .unique();
  },
});

export const upsert = mutation({
  args: {
    studentId: v.id("students"),
    kitId: v.id("kits"),
    criterionScores: v.record(v.string(), v.number()),
    observations: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const profile = await assertScoringAllowed(ctx, args.studentId, args.kitId);
    for (const [k, val] of Object.entries(args.criterionScores)) {
      if (![1, 2, 3, 4].includes(val)) throw new Error(`Score for ${k} must be 1-4`);
    }
    const existing = await ctx.db
      .query("scores")
      .withIndex("by_student_and_kit", (q) =>
        q.eq("studentId", args.studentId).eq("kitId", args.kitId),
      )
      .unique();
    const patch = {
      criterionScores: args.criterionScores,
      observations: args.observations,
      scoredByProfileId: profile._id,
      updatedAt: Date.now(),
    };
    if (existing) await ctx.db.patch(existing._id, patch);
    else await ctx.db.insert("scores", { ...args, ...patch });
  },
});

export const listForStudent = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, { studentId }) => {
    const student = await ctx.db.get(studentId);
    if (!student) return [];
    await requireOwnsClass(ctx, student.classId);
    const rows = await ctx.db
      .query("scores")
      .withIndex("by_student", (q) => q.eq("studentId", studentId))
      .collect();
    return await Promise.all(
      rows.map(async (s) => ({
        ...s,
        kit: await ctx.db.get(s.kitId),
        rubric: await ctx.db
          .query("rubrics")
          .withIndex("by_kit", (q) => q.eq("kitId", s.kitId))
          .unique(),
      })),
    );
  },
});

export const listForClass = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return await Promise.all(
      students.map(async (student) => {
        const scores = await ctx.db
          .query("scores")
          .withIndex("by_student", (q) => q.eq("studentId", student._id))
          .collect();
        const enriched = await Promise.all(
          scores.map(async (s) => ({
            ...s,
            kit: await ctx.db.get(s.kitId),
            rubric: await ctx.db
              .query("rubrics")
              .withIndex("by_kit", (q) => q.eq("kitId", s.kitId))
              .unique(),
          })),
        );
        return { student, scores: enriched };
      }),
    );
  },
});
