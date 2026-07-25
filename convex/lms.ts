import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, requireOwnsClass, requireProfile } from "./lib/access";
import { LMS_LEVEL_BY_ID } from "./lib/lmsCatalog";

/**
 * Admin assigns which LMS levels a class can see, and which LMS classes
 * (grades) within each level (replaces the existing set).
 */
export const setClassLevels = mutation({
  args: {
    classId: v.id("classes"),
    levels: v.array(
      v.object({ levelId: v.string(), grades: v.array(v.string()) }),
    ),
  },
  returns: v.null(),
  handler: async (ctx, { classId, levels }) => {
    await requireAdmin(ctx);
    const cls = await ctx.db.get(classId);
    if (!cls) throw new Error("Class not found");
    const seen = new Set<string>();
    const rows = levels.map(({ levelId, grades }) => {
      const level = LMS_LEVEL_BY_ID.get(levelId);
      if (!level) throw new Error(`Unknown LMS level: ${levelId}`);
      if (seen.has(levelId)) throw new Error(`Duplicate LMS level: ${levelId}`);
      seen.add(levelId);
      const chosen = new Set(grades);
      const valid = level.grades.filter((g) => chosen.has(g));
      if (valid.length === 0) {
        throw new Error(`Pick at least one class for ${levelId}`);
      }
      return { classId, levelId, grades: valid };
    });
    const existing = await ctx.db
      .query("classLevels")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    for (const row of existing) await ctx.db.delete(row._id);
    for (const row of rows) await ctx.db.insert("classLevels", row);

    // Attach each assigned level's robotics curriculum kit so teachers can
    // rubric-score it and it shows on the class report. Additive only:
    // un-assigning a level keeps the kit (and any scores) on the class.
    for (const { levelId } of rows) {
      const kitNumber = LMS_LEVEL_BY_ID.get(levelId)!.kitNumber;
      const kit = await ctx.db
        .query("kits")
        .withIndex("by_kitNumber_and_category", (q) =>
          q.eq("kitNumber", kitNumber).eq("category", "Robotics"),
        )
        .unique();
      if (!kit) continue; // robotics curriculum not seeded yet
      const attached = await ctx.db
        .query("classKits")
        .withIndex("by_class_and_kit", (q) =>
          q.eq("classId", classId).eq("kitId", kit._id),
        )
        .unique();
      if (attached) continue;
      const all = await ctx.db
        .query("classKits")
        .withIndex("by_class", (q) => q.eq("classId", classId))
        .collect();
      const maxOrder = all.reduce((m, l) => Math.max(m, l.order), -1);
      await ctx.db.insert("classKits", {
        classId,
        kitId: kit._id,
        order: maxOrder + 1,
      });
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
 * One submission per session per student; repeats are rejected.
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

    if (existing) throw new Error("Test already submitted");
    await ctx.db.insert("lmsScores", {
      studentId: profile.studentId,
      classId: student.classId,
      sessionKey,
      attempts: 1,
      score: args.score,
      total: args.total,
      mcqScore: args.mcqScore,
      mcqTotal: args.mcqTotal,
      codeScore: args.codeScore,
      codeMax: args.codeMax,
      updatedAt: Date.now(),
    });
    return null;
  },
});

/** The signed-in student's submitted quiz results, for locking retakes in the LMS. */
export const myQuizScores = query({
  args: {},
  returns: v.array(
    v.object({
      sessionKey: v.string(),
      score: v.number(),
      total: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const profile = await requireProfile(ctx);
    if (profile.role !== "student" || !profile.studentId) return [];
    const rows = await ctx.db
      .query("lmsScores")
      .withIndex("by_student_and_sessionKey", (q) =>
        q.eq("studentId", profile.studentId!),
      )
      .collect();
    return rows.map((r) => ({
      sessionKey: r.sessionKey,
      score: r.score,
      total: r.total,
    }));
  },
});

/** Teacher/admin view: every stored quiz result for a class, with names. */
export const quizScoresForClass = query({
  args: { classId: v.id("classes") },
  returns: v.array(
    v.object({
      studentId: v.id("students"),
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
          studentId: r.studentId,
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

/**
 * What the signed-in student sees: their name, class, and assigned levels with
 * the LMS classes (grades) picked within each. Legacy rows without grades mean
 * the whole level.
 */
export const myLms = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      studentName: v.string(),
      className: v.string(),
      levels: v.array(
        v.object({ levelId: v.string(), grades: v.array(v.string()) }),
      ),
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
      levels: rows.map((r) => ({
        levelId: r.levelId,
        grades: r.grades ?? LMS_LEVEL_BY_ID.get(r.levelId)?.grades ?? [],
      })),
    };
  },
});
