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

/**
 * Called by the student app when the embedded LMS reports a quiz submission.
 * Keeps the best attempt per session.
 * ponytail: the quiz is scored client-side in the vendored LMS, so values are
 * client-trusted; we bound-check them, but real anti-cheat would need the quiz
 * answers to move server-side.
 */
export const recordQuizResult = mutation({
  args: {
    year: v.string(),
    grade: v.string(),
    session: v.string(),
    score: v.number(),
    total: v.number(),
    mcqScore: v.number(),
    mcqTotal: v.number(),
    codeScore: v.number(),
    codeMax: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const profile = await requireProfile(ctx);
    if (profile.role !== "student" || !profile.studentId) {
      throw new Error("Only students can submit quiz results");
    }
    const student = await ctx.db.get(profile.studentId);
    if (!student) throw new Error("Student record missing");

    const nums = [
      args.score,
      args.total,
      args.mcqScore,
      args.mcqTotal,
      args.codeScore,
      args.codeMax,
    ];
    if (nums.some((n) => !Number.isFinite(n) || n < 0 || n > 1000)) {
      throw new Error("Invalid quiz result");
    }
    if (args.score > args.total) throw new Error("Invalid quiz result");
    const keyPart = /^[0-9]{1,2}$/;
    if (![args.year, args.grade, args.session].every((p) => keyPart.test(p))) {
      throw new Error("Invalid session key");
    }

    const sessionKey = `${args.year}-${args.grade}-${args.session}`;
    const existing = await ctx.db
      .query("lmsScores")
      .withIndex("by_student_and_sessionKey", (q) =>
        q.eq("studentId", profile.studentId!).eq("sessionKey", sessionKey),
      )
      .unique();

    const fields = {
      score: args.score,
      total: args.total,
      mcqScore: args.mcqScore,
      mcqTotal: args.mcqTotal,
      codeScore: args.codeScore,
      codeMax: args.codeMax,
      updatedAt: Date.now(),
    };
    if (!existing) {
      await ctx.db.insert("lmsScores", {
        studentId: profile.studentId,
        classId: student.classId,
        sessionKey,
        attempts: 1,
        ...fields,
      });
    } else if (args.score >= existing.score) {
      await ctx.db.patch(existing._id, {
        ...fields,
        attempts: existing.attempts + 1,
      });
    } else {
      await ctx.db.patch(existing._id, {
        attempts: existing.attempts + 1,
        updatedAt: fields.updatedAt,
      });
    }
    return null;
  },
});

/** Teacher/admin view: every stored quiz result for a class, with names. */
export const quizScoresForClass = query({
  args: { classId: v.id("classes") },
  returns: v.array(
    v.object({
      studentName: v.string(),
      sessionKey: v.string(),
      score: v.number(),
      total: v.number(),
      attempts: v.number(),
      updatedAt: v.number(),
    }),
  ),
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const rows = await ctx.db
      .query("lmsScores")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    const result = await Promise.all(
      rows.map(async (r) => {
        const student = await ctx.db.get(r.studentId);
        return {
          studentName: student?.name ?? "—",
          sessionKey: r.sessionKey,
          score: r.score,
          total: r.total,
          attempts: r.attempts,
          updatedAt: r.updatedAt,
        };
      }),
    );
    return result.sort(
      (a, b) =>
        a.studentName.localeCompare(b.studentName) ||
        a.sessionKey.localeCompare(b.sessionKey, undefined, { numeric: true }),
    );
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
