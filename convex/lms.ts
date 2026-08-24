import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import { ConvexError, v, type Infer } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { requireAdmin, requireOwnsClass, requireProfile } from "./lib/access";
import {
  levelSessions,
  LMS_LEVEL_BY_ID,
  PHASE_GROUPS,
  YEAR2_LEVEL_ID,
} from "./lib/lmsCatalog";

/**
 * Admin assigns which LMS levels a class can see, and which LMS classes
 * (grades) within each level (replaces the existing set). Classes can only
 * be given LMS from what the account was given in Manage LMS: anything
 * outside the account's teacherLevels rows is dropped, so stale class rows
 * self-heal on the next save instead of dead-ending the UI.
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
    if (!cls) throw new ConvexError("Class not found");
    const allowed = await ctx.db
      .query("teacherLevels")
      .withIndex("by_teacher", (q) =>
        q.eq("teacherProfileId", cls.teacherProfileId),
      )
      .collect();
    const allowedByLevel = new Map(
      allowed.map((r) => [r.levelId, new Set(r.grades)]),
    );
    const seen = new Set<string>();
    const rows = levels.flatMap(({ levelId, grades }) => {
      const level = LMS_LEVEL_BY_ID.get(levelId);
      if (!level) throw new ConvexError(`Unknown LMS level: ${levelId}`);
      if (seen.has(levelId)) throw new ConvexError(`Duplicate LMS level: ${levelId}`);
      seen.add(levelId);
      const chosen = new Set(grades);
      const valid = level.grades.filter((g) => chosen.has(g));
      if (valid.length === 0) {
        throw new ConvexError(`Pick at least one class for ${levelId}`);
      }
      const allowedGrades = allowedByLevel.get(levelId);
      const kept = valid.filter((g) => allowedGrades?.has(g));
      return kept.length ? [{ classId, levelId, grades: kept }] : [];
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

const sessionsValidator = v.optional(
  v.array(
    v.object({
      grade: v.string(),
      session: v.string(),
      groups: v.array(v.string()),
    }),
  ),
);
type Sessions = Infer<typeof sessionsValidator>;

/** Per-grade display-name overrides ("6" → "Class 5"); cosmetic only. */
const gradeNamesValidator = v.optional(v.record(v.string(), v.string()));
type GradeNames = Infer<typeof gradeNamesValidator>;

/**
 * Per-session 5E picks from the account's school-wide assignment, by levelId.
 * Classwise LMS inherits these so a class course respects the E's provided
 * on the school/teacher account.
 */
async function teacherRowsByLevel(
  ctx: QueryCtx,
  teacherProfileId: Id<"profiles">,
): Promise<Map<string, { sessions: Sessions; gradeNames: GradeNames }>> {
  const rows = await ctx.db
    .query("teacherLevels")
    .withIndex("by_teacher", (q) => q.eq("teacherProfileId", teacherProfileId))
    .collect();
  return new Map(
    rows.map((r) => [
      r.levelId,
      { sessions: r.sessions, gradeNames: r.gradeNames },
    ]),
  );
}

/** The account's session picks for a level, limited to the class's grades. */
function inheritedSessions(
  rowsByLevel: Map<string, { sessions: Sessions; gradeNames: GradeNames }>,
  levelId: string,
  grades: string[],
): Sessions {
  const sessions = rowsByLevel
    .get(levelId)
    ?.sessions?.filter((s) => grades.includes(s.grade));
  return sessions?.length ? sessions : undefined;
}

/** The account's grade renames for a level, limited to the class's grades. */
function inheritedGradeNames(
  rowsByLevel: Map<string, { sessions: Sessions; gradeNames: GradeNames }>,
  levelId: string,
  grades: string[],
): GradeNames {
  const names = rowsByLevel.get(levelId)?.gradeNames;
  if (!names) return undefined;
  const kept = Object.entries(names).filter(([g]) => grades.includes(g));
  return kept.length ? Object.fromEntries(kept) : undefined;
}

/**
 * Teacher view: their classes with the LMS levels/grades assigned by admin.
 * Classes with no assignment are omitted. Admins preview the full catalog
 * client-side and skip this query.
 */
export const myClassLms = query({
  args: {},
  returns: v.array(
    v.object({
      classId: v.id("classes"),
      className: v.string(),
      levels: v.array(
        v.object({
          levelId: v.string(),
          grades: v.array(v.string()),
          sessions: sessionsValidator,
          gradeNames: gradeNamesValidator,
        }),
      ),
    }),
  ),
  handler: async (ctx) => {
    const profile = await requireProfile(ctx);
    if (profile.role === "student") return [];
    const classes = await ctx.db
      .query("classes")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .collect();
    const rowsByLevel = await teacherRowsByLevel(ctx, profile._id);
    const out = [];
    for (const cls of classes) {
      const rows = await ctx.db
        .query("classLevels")
        .withIndex("by_class", (q) => q.eq("classId", cls._id))
        .collect();
      if (rows.length === 0) continue;
      out.push({
        classId: cls._id,
        className: cls.name,
        levels: rows.map((r) => {
          const grades =
            r.grades ?? LMS_LEVEL_BY_ID.get(r.levelId)?.grades ?? [];
          return {
            levelId: r.levelId,
            grades,
            sessions: inheritedSessions(rowsByLevel, r.levelId, grades),
            gradeNames: inheritedGradeNames(rowsByLevel, r.levelId, grades),
          };
        }),
      });
    }
    return out;
  },
});

/**
 * School-wide LMS assignment (per teacher/school account), with optional
 * per-session 5E selection. Groups club the E's: "core" = Engage · Explore ·
 * Explain, "extend" = Elaborate · Evaluate.
 */
export const teacherLevelValidator = v.object({
  levelId: v.string(),
  grades: v.array(v.string()),
  sessions: v.optional(
    v.array(
      v.object({
        grade: v.string(),
        session: v.string(),
        groups: v.array(v.string()),
      }),
    ),
  ),
  gradeNames: gradeNamesValidator,
});
export type TeacherLevelAssignment = Infer<typeof teacherLevelValidator>;

function normalizeTeacherLevels(
  levels: TeacherLevelAssignment[],
): TeacherLevelAssignment[] {
  const seen = new Set<string>();
  return levels.map(({ levelId, grades, sessions, gradeNames }) => {
    const level = LMS_LEVEL_BY_ID.get(levelId);
    if (!level) throw new ConvexError(`Unknown LMS level: ${levelId}`);
    if (seen.has(levelId)) throw new ConvexError(`Duplicate LMS level: ${levelId}`);
    seen.add(levelId);
    const chosen = new Set(grades);
    const validGrades = level.grades.filter((g) => chosen.has(g));
    if (validGrades.length === 0) {
      throw new ConvexError(`Pick at least one class for ${levelId}`);
    }
    let validSessions: TeacherLevelAssignment["sessions"];
    if (sessions && sessions.length > 0) {
      const seenSessions = new Set<string>();
      validSessions = sessions.map((s) => {
        if (!validGrades.includes(s.grade)) {
          throw new ConvexError(`Session picked for unselected class ${s.grade}`);
        }
        if (!levelSessions(level).includes(s.session)) {
          throw new ConvexError(`Unknown session: ${s.session}`);
        }
        const key = `${s.grade}-${s.session}`;
        if (seenSessions.has(key)) {
          throw new ConvexError(`Duplicate session pick: ${key}`);
        }
        seenSessions.add(key);
        const groups = PHASE_GROUPS.map((g) => g.id).filter((id) =>
          s.groups.includes(id),
        );
        if (groups.length === 0) {
          throw new ConvexError("Pick at least one 5E group per selected session");
        }
        return { grade: s.grade, session: s.session, groups };
      });
    }
    let validNames: GradeNames;
    if (gradeNames) {
      const kept = Object.entries(gradeNames)
        .map(([g, name]) => [g, name.trim()] as const)
        .filter(([g, name]) => validGrades.includes(g) && name.length > 0);
      if (kept.some(([, name]) => name.length > 60)) {
        throw new ConvexError("Display name too long (60 characters max)");
      }
      if (kept.length) validNames = Object.fromEntries(kept);
    }
    return {
      levelId,
      grades: validGrades,
      sessions: validSessions,
      gradeNames: validNames,
    };
  });
}

/** Replaces a teacher's school-wide LMS rows. Also used by admin.createTeacher. */
export async function replaceTeacherLevelRows(
  ctx: MutationCtx,
  teacherProfileId: Id<"profiles">,
  levels: TeacherLevelAssignment[],
): Promise<void> {
  const rows = normalizeTeacherLevels(levels);
  const existing = await ctx.db
    .query("teacherLevels")
    .withIndex("by_teacher", (q) => q.eq("teacherProfileId", teacherProfileId))
    .collect();
  for (const row of existing) await ctx.db.delete(row._id);
  for (const row of rows) {
    await ctx.db.insert("teacherLevels", { teacherProfileId, ...row });
  }
}

/** Admin assigns the school-wide LMS courses (replaces the existing set). */
export const setTeacherLevels = mutation({
  args: {
    teacherProfileId: v.id("profiles"),
    levels: v.array(teacherLevelValidator),
  },
  returns: v.null(),
  handler: async (ctx, { teacherProfileId, levels }) => {
    await requireAdmin(ctx);
    const target = await ctx.db.get(teacherProfileId);
    if (!target || target.role !== "teacher") {
      throw new ConvexError("Not a school/teacher account");
    }
    await replaceTeacherLevelRows(ctx, teacherProfileId, levels);
    return null;
  },
});

const teacherLevelsReturns = v.array(
  v.object({
    levelId: v.string(),
    grades: v.array(v.string()),
    sessions: v.optional(
      v.array(
        v.object({
          grade: v.string(),
          session: v.string(),
          groups: v.array(v.string()),
        }),
      ),
    ),
    gradeNames: gradeNamesValidator,
  }),
);

/**
 * Admin: every account's Manage LMS rows in one pass, joined client-side by
 * profile — constrains the classwise LMS checkboxes to what each account
 * was given.
 */
export const allTeacherLevels = query({
  args: {},
  returns: v.array(
    v.object({
      teacherProfileId: v.id("profiles"),
      levelId: v.string(),
      grades: v.array(v.string()),
    }),
  ),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const rows = await ctx.db.query("teacherLevels").collect();
    return rows.map((r) => ({
      teacherProfileId: r.teacherProfileId,
      levelId: r.levelId,
      grades: r.grades,
    }));
  },
});

/** Admin view of a school/teacher account's school-wide LMS assignment. */
export const forTeacherProfile = query({
  args: { teacherProfileId: v.id("profiles") },
  returns: teacherLevelsReturns,
  handler: async (ctx, { teacherProfileId }) => {
    await requireAdmin(ctx);
    const rows = await ctx.db
      .query("teacherLevels")
      .withIndex("by_teacher", (q) =>
        q.eq("teacherProfileId", teacherProfileId),
      )
      .collect();
    return rows.map((r) => ({
      levelId: r.levelId,
      grades: r.grades,
      sessions: r.sessions,
      gradeNames: r.gradeNames,
    }));
  },
});

/** Teacher view: LMS courses assigned to the school account itself. */
export const mySchoolLms = query({
  args: {},
  returns: teacherLevelsReturns,
  handler: async (ctx) => {
    const profile = await requireProfile(ctx);
    if (profile.role === "student") return [];
    const rows = await ctx.db
      .query("teacherLevels")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .collect();
    return rows.map((r) => ({
      levelId: r.levelId,
      grades: r.grades,
      sessions: r.sessions,
      gradeNames: r.gradeNames,
    }));
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
      throw new ConvexError("Only students can submit quiz results");
    }
    const student = await ctx.db.get(profile.studentId);
    if (!student) throw new ConvexError("Student record missing");

    const nums = [
      args.score,
      args.total,
      args.mcqScore,
      args.mcqTotal,
      args.codeScore,
      args.codeMax,
    ];
    if (nums.some((n) => !Number.isFinite(n) || n < 0 || n > 1000)) {
      throw new ConvexError("Invalid quiz result");
    }
    if (args.score > args.total) throw new ConvexError("Invalid quiz result");
    const keyPart = /^[0-9]{1,2}$/;
    // Year 2 program quizzes report the pseudo-year "year2" so their keys
    // can't collide with Level 1 (both have Classes 6 and 7).
    if (!keyPart.test(args.year) && args.year !== YEAR2_LEVEL_ID) {
      throw new ConvexError("Invalid session key");
    }
    if (![args.grade, args.session].every((p) => keyPart.test(p))) {
      throw new ConvexError("Invalid session key");
    }

    const sessionKey = `${args.year}-${args.grade}-${args.session}`;
    const existing = await ctx.db
      .query("lmsScores")
      .withIndex("by_student_and_sessionKey", (q) =>
        q.eq("studentId", profile.studentId!).eq("sessionKey", sessionKey),
      )
      .unique();

    if (existing) throw new ConvexError("Test already submitted");
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
        v.object({
          levelId: v.string(),
          grades: v.array(v.string()),
          sessions: sessionsValidator,
          gradeNames: gradeNamesValidator,
        }),
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
    const rowsByLevel = await teacherRowsByLevel(ctx, cls.teacherProfileId);
    return {
      studentName: student.name,
      className: cls.name,
      levels: rows.map((r) => {
        const grades =
          r.grades ?? LMS_LEVEL_BY_ID.get(r.levelId)?.grades ?? [];
        return {
          levelId: r.levelId,
          grades,
          sessions: inheritedSessions(rowsByLevel, r.levelId, grades),
          gradeNames: inheritedGradeNames(rowsByLevel, r.levelId, grades),
        };
      }),
    };
  },
});
