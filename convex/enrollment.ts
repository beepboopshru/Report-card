import {
  action,
  internalMutation,
  internalQuery,
  type ActionCtx,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import {
  createAccount,
  modifyAccountCredentials,
  invalidateSessions,
} from "@convex-dev/auth/server";
import type { Id } from "./_generated/dataModel";
import { buildStudentUsername } from "./lib/studentUsername";
import { assertValidUsername } from "./lib/username";
import { generatePassword } from "./lib/passwordGen";
import { requireAdmin, requireOwnsClass } from "./lib/access";

/**
 * Admin approval: creates a login for every student in the class that doesn't
 * have one yet, then marks the class approved. Safe to re-run after the
 * teacher adds more students.
 *
 * All students in a class share one randomized password (easier to hand out
 * in a classroom); it's recovered from existing accounts on re-runs so
 * late-added students get the same one.
 */
async function provisionLogins(
  ctx: ActionCtx,
  classId: Id<"classes">,
): Promise<{ created: number; password: string }> {
  const info: {
    className: string;
    classPassword: string | null;
    pending: { studentId: Id<"students">; name: string }[];
  } = await ctx.runQuery(internal.enrollment.getClassForApproval, { classId });
  const password = info.classPassword ?? generatePassword();

  const taken = new Set<string>();
  const pickUsername = async (name: string): Promise<string> => {
    for (let suffix = 1; ; suffix++) {
      const candidate = buildStudentUsername(name, info.className, suffix);
      if (taken.has(candidate)) continue;
      const exists = await ctx.runQuery(internal.admin.findProfileByUsername, {
        username: candidate,
      });
      if (!exists) return candidate;
    }
  };

  let created = 0;
  for (const student of info.pending) {
    const username = await pickUsername(student.name);
    assertValidUsername(username);
    taken.add(username);

    const account = await createAccount(ctx, {
      provider: "password",
      account: { id: username, secret: password },
      profile: { email: username },
      shouldLinkViaEmail: false,
      shouldLinkViaPhone: false,
    });
    await ctx.runMutation(internal.enrollment.recordStudentAccount, {
      studentId: student.studentId,
      userId: account.user._id,
      username,
      initialPassword: password,
      displayName: student.name,
    });
    created++;
  }
  return { created, password };
}

export const approveClass = action({
  args: { classId: v.id("classes") },
  returns: v.object({ created: v.number() }),
  handler: async (ctx, { classId }) => {
    const { created } = await provisionLogins(ctx, classId);
    await ctx.runMutation(internal.enrollment.markApproved, { classId });
    return { created };
  },
});

/**
 * Deletes every student login in the class (account, user, profile, sessions)
 * and provisions fresh ones: usernames rebuilt from current student/class
 * names, one new shared password. Use after renames or to fix legacy accounts.
 */
export const recreateClassLogins = action({
  args: { classId: v.id("classes") },
  returns: v.object({ created: v.number(), password: v.string() }),
  handler: async (ctx, { classId }) => {
    const userIds: Id<"users">[] = await ctx.runMutation(
      internal.enrollment.wipeClassAccounts,
      { classId },
    );
    for (const userId of userIds) {
      await invalidateSessions(ctx, { userId });
    }
    return await provisionLogins(ctx, classId);
  },
});

/**
 * Nukes and rebuilds every student login in every class that has one.
 * Per-class isolation: one failing class is reported, the rest proceed.
 */
export const recreateAllLogins = action({
  args: {},
  returns: v.array(
    v.object({
      className: v.string(),
      teacherName: v.string(),
      created: v.number(),
      password: v.union(v.string(), v.null()),
      error: v.union(v.string(), v.null()),
    }),
  ),
  handler: async (ctx) => {
    const targets: {
      classId: Id<"classes">;
      className: string;
      teacherName: string;
    }[] = await ctx.runQuery(internal.enrollment.getClassesWithLogins, {});
    const results = [];
    for (const t of targets) {
      try {
        const userIds: Id<"users">[] = await ctx.runMutation(
          internal.enrollment.wipeClassAccounts,
          { classId: t.classId },
        );
        for (const userId of userIds) {
          await invalidateSessions(ctx, { userId });
        }
        const { created, password } = await provisionLogins(ctx, t.classId);
        results.push({
          className: t.className,
          teacherName: t.teacherName,
          created,
          password,
          error: null,
        });
      } catch (err) {
        results.push({
          className: t.className,
          teacherName: t.teacherName,
          created: 0,
          password: null,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
    return results;
  },
});

/**
 * Admin approval of a teacher's deletion request: wipes every student login
 * (accounts, sessions), then deletes the class and all data hanging off it.
 */
export const deleteClass = action({
  args: { classId: v.id("classes") },
  returns: v.null(),
  handler: async (ctx, { classId }) => {
    const userIds: Id<"users">[] = await ctx.runMutation(
      internal.enrollment.wipeClassAccounts,
      { classId },
    );
    for (const userId of userIds) {
      await invalidateSessions(ctx, { userId });
    }
    await ctx.runMutation(internal.enrollment.destroyClassData, { classId });
    return null;
  },
});

export const destroyClassData = internalMutation({
  args: { classId: v.id("classes") },
  returns: v.null(),
  handler: async (ctx, { classId }) => {
    await requireAdmin(ctx);
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
    for (const table of ["classKits", "classLevels", "lmsScores"] as const) {
      const rows = await ctx.db
        .query(table)
        .withIndex("by_class", (q) => q.eq("classId", classId))
        .collect();
      for (const r of rows) await ctx.db.delete(r._id);
    }
    if (await ctx.db.get(classId)) await ctx.db.delete(classId);
    return null;
  },
});

export const getClassesWithLogins = internalQuery({
  args: {},
  returns: v.array(
    v.object({
      classId: v.id("classes"),
      className: v.string(),
      teacherName: v.string(),
    }),
  ),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    // ponytail: bounded full scan; paginate if we ever near 1000 classes.
    const classes = await ctx.db.query("classes").take(1000);
    const out = [];
    for (const cls of classes) {
      const teacher = await ctx.db.get(cls.teacherProfileId);
      // Archived classes (disabled teacher) keep their dead logins.
      if (!teacher || teacher.disabled === true) continue;
      const students = await ctx.db
        .query("students")
        .withIndex("by_class", (q) => q.eq("classId", cls._id))
        .collect();
      if (!students.some((s) => s.userId)) continue;
      out.push({
        classId: cls._id,
        className: cls.name,
        teacherName: teacher.displayName || teacher.username,
      });
    }
    return out;
  },
});

export const wipeClassAccounts = internalMutation({
  args: { classId: v.id("classes") },
  returns: v.array(v.id("users")),
  handler: async (ctx, { classId }) => {
    await requireAdmin(ctx);
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    const userIds: Id<"users">[] = [];
    for (const s of students) {
      const userId = s.userId;
      if (!userId) continue;
      userIds.push(userId);
      const profiles = await ctx.db
        .query("profiles")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .collect();
      for (const p of profiles) await ctx.db.delete(p._id);
      const accounts = await ctx.db
        .query("authAccounts")
        .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
        .collect();
      for (const a of accounts) await ctx.db.delete(a._id);
      if (await ctx.db.get(userId)) await ctx.db.delete(userId);
      await ctx.db.patch(s._id, {
        userId: undefined,
        username: undefined,
        initialPassword: undefined,
      });
    }
    return userIds;
  },
});

export const getClassForApproval = internalQuery({
  args: { classId: v.id("classes") },
  returns: v.object({
    className: v.string(),
    classPassword: v.union(v.string(), v.null()),
    pending: v.array(
      v.object({ studentId: v.id("students"), name: v.string() }),
    ),
  }),
  handler: async (ctx, { classId }) => {
    await requireAdmin(ctx);
    const cls = await ctx.db.get(classId);
    if (!cls) throw new ConvexError("Class not found");
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return {
      className: cls.name,
      // Shared class password lives on already-provisioned students.
      classPassword:
        students.find((s) => s.userId && s.initialPassword)?.initialPassword ??
        null,
      pending: students
        .filter((s) => !s.userId)
        .map((s) => ({ studentId: s._id, name: s.name })),
    };
  },
});

export const recordStudentAccount = internalMutation({
  args: {
    studentId: v.id("students"),
    userId: v.id("users"),
    username: v.string(),
    initialPassword: v.string(),
    displayName: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.insert("profiles", {
      userId: args.userId,
      username: args.username,
      displayName: args.displayName,
      role: "student",
      studentId: args.studentId,
    });
    await ctx.db.patch(args.studentId, {
      userId: args.userId,
      username: args.username,
      initialPassword: args.initialPassword,
    });
    return null;
  },
});

export const markApproved = internalMutation({
  args: { classId: v.id("classes") },
  returns: v.null(),
  handler: async (ctx, { classId }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(classId, { status: "approved" });
    return null;
  },
});

/**
 * New shared password for every login in the class. Fixes classes approved
 * back when each student got an individual password, and rotates the shared
 * one if it leaks.
 */
export const resetClassPassword = action({
  args: { classId: v.id("classes") },
  returns: v.object({ password: v.string(), updated: v.number() }),
  handler: async (ctx, { classId }) => {
    const accounts: {
      studentId: Id<"students">;
      username: string;
      userId: Id<"users">;
    }[] = await ctx.runQuery(internal.enrollment.getClassAccounts, { classId });
    if (accounts.length === 0) {
      throw new ConvexError("No student logins in this class yet");
    }
    const password = generatePassword();
    for (const a of accounts) {
      await modifyAccountCredentials(ctx, {
        provider: "password",
        account: { id: a.username, secret: password },
      });
      await invalidateSessions(ctx, { userId: a.userId });
      await ctx.runMutation(internal.enrollment.storeInitialPassword, {
        studentId: a.studentId,
        initialPassword: password,
      });
    }
    return { password, updated: accounts.length };
  },
});

export const getClassAccounts = internalQuery({
  args: { classId: v.id("classes") },
  returns: v.array(
    v.object({
      studentId: v.id("students"),
      username: v.string(),
      userId: v.id("users"),
    }),
  ),
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return students.flatMap((s) =>
      s.username && s.userId
        ? [{ studentId: s._id, username: s.username, userId: s.userId }]
        : [],
    );
  },
});

/** Teacher (or admin) resets a student's password; new one is stored for re-download. */
export const resetStudentPassword = action({
  args: { studentId: v.id("students") },
  returns: v.object({ username: v.string(), password: v.string() }),
  handler: async (ctx, { studentId }) => {
    const target: { username: string; userId: Id<"users"> } =
      await ctx.runQuery(internal.enrollment.getStudentForReset, { studentId });
    const password = generatePassword();
    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: target.username, secret: password },
    });
    await invalidateSessions(ctx, { userId: target.userId });
    await ctx.runMutation(internal.enrollment.storeInitialPassword, {
      studentId,
      initialPassword: password,
    });
    return { username: target.username, password };
  },
});

export const getStudentForReset = internalQuery({
  args: { studentId: v.id("students") },
  returns: v.object({ username: v.string(), userId: v.id("users") }),
  handler: async (ctx, { studentId }) => {
    const student = await ctx.db.get(studentId);
    if (!student) throw new ConvexError("Student not found");
    await requireOwnsClass(ctx, student.classId);
    if (!student.username || !student.userId) {
      throw new ConvexError("Student has no login account yet");
    }
    return { username: student.username, userId: student.userId };
  },
});

export const storeInitialPassword = internalMutation({
  args: { studentId: v.id("students"), initialPassword: v.string() },
  returns: v.null(),
  handler: async (ctx, { studentId, initialPassword }) => {
    const student = await ctx.db.get(studentId);
    if (!student) throw new ConvexError("Student not found");
    await requireOwnsClass(ctx, student.classId);
    await ctx.db.patch(studentId, { initialPassword });
    return null;
  },
});
