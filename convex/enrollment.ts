import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
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
 */
export const approveClass = action({
  args: { classId: v.id("classes") },
  returns: v.object({ created: v.number() }),
  handler: async (ctx, { classId }) => {
    const info: { className: string; pending: { studentId: Id<"students">; name: string }[] } =
      await ctx.runQuery(internal.enrollment.getClassForApproval, { classId });

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

      const password = generatePassword();
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

    await ctx.runMutation(internal.enrollment.markApproved, { classId });
    return { created };
  },
});

export const getClassForApproval = internalQuery({
  args: { classId: v.id("classes") },
  returns: v.object({
    className: v.string(),
    pending: v.array(
      v.object({ studentId: v.id("students"), name: v.string() }),
    ),
  }),
  handler: async (ctx, { classId }) => {
    await requireAdmin(ctx);
    const cls = await ctx.db.get(classId);
    if (!cls) throw new Error("Class not found");
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    return {
      className: cls.name,
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
    if (!student) throw new Error("Student not found");
    await requireOwnsClass(ctx, student.classId);
    if (!student.username || !student.userId) {
      throw new Error("Student has no login account yet");
    }
    return { username: student.username, userId: student.userId };
  },
});

export const storeInitialPassword = internalMutation({
  args: { studentId: v.id("students"), initialPassword: v.string() },
  returns: v.null(),
  handler: async (ctx, { studentId, initialPassword }) => {
    const student = await ctx.db.get(studentId);
    if (!student) throw new Error("Student not found");
    await requireOwnsClass(ctx, student.classId);
    await ctx.db.patch(studentId, { initialPassword });
    return null;
  },
});
