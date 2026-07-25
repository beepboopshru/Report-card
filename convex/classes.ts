import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireOwnsClass, requireTeacher, requireAdmin } from "./lib/access";
import { LMS_LEVEL_BY_ID } from "./lib/lmsCatalog";

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

export const listAllForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const classes = await ctx.db.query("classes").collect();
    return await Promise.all(
      classes.map(async (cls) => {
        const teacher = await ctx.db.get(cls.teacherProfileId);
        const students = await ctx.db
          .query("students")
          .withIndex("by_class", (q) => q.eq("classId", cls._id))
          .collect();
        const levels = await ctx.db
          .query("classLevels")
          .withIndex("by_class", (q) => q.eq("classId", cls._id))
          .collect();
        const school = await ctx.db
          .query("schoolDetails")
          .withIndex("by_teacher", (q) =>
            q.eq("teacherProfileId", cls.teacherProfileId),
          )
          .unique();
        // Average of all criterion scores (1-4 scale) across the class, as %.
        let sum = 0;
        let count = 0;
        for (const s of students) {
          const scores = await ctx.db
            .query("scores")
            .withIndex("by_student", (q) => q.eq("studentId", s._id))
            .collect();
          for (const sc of scores) {
            if (sc.absent) continue;
            for (const val of Object.values(sc.criterionScores)) {
              if (val >= 1 && val <= 4) {
                sum += val;
                count++;
              }
            }
          }
        }
        return {
          ...cls,
          teacherName: teacher?.displayName ?? "—",
          // From the teacher's first-login school setup; null if not filled yet
          // (new setups only collect the address, not grade-sections).
          declared: school?.sections
            ? {
                students: school.sections.reduce((n, s) => n + s.attendance, 0),
                sections: school.sections.length,
                grades: new Set(school.sections.map((s) => s.grade)).size,
              }
            : null,
          studentCount: students.length,
          accountCount: students.filter((s) => s.userId).length,
          lmsLevels: levels.map((l) => ({
            levelId: l.levelId,
            // Legacy rows without grades mean the whole level.
            grades: l.grades ?? LMS_LEVEL_BY_ID.get(l.levelId)?.grades ?? [],
          })),
          avgScorePct: count === 0 ? null : Math.round((sum / (count * 4)) * 100),
        };
      }),
    );
  },
});

export const submitForApproval = mutation({
  args: { classId: v.id("classes") },
  returns: v.null(),
  handler: async (ctx, { classId }) => {
    const { cls } = await requireOwnsClass(ctx, classId);
    if (cls.status === "approved") throw new Error("Class already approved");
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    if (students.length === 0) {
      throw new Error("Add students before submitting for approval");
    }
    await ctx.db.patch(classId, { status: "submitted" });
    return null;
  },
});

export const get = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    const { cls } = await requireOwnsClass(ctx, classId);
    const teacher = await ctx.db.get(cls.teacherProfileId);
    return { ...cls, teacherName: teacher?.displayName ?? "—" };
  },
});

/**
 * One-shot class registration: creates the class with its roster and submits
 * it for admin approval immediately. The class only appears on the teacher's
 * dashboard once an admin approves it and generates student logins.
 */
export const register = mutation({
  args: {
    name: v.string(),
    academicYear: v.string(),
    students: v.array(
      v.object({ name: v.string(), rollNo: v.optional(v.string()) }),
    ),
  },
  returns: v.id("classes"),
  handler: async (ctx, args) => {
    const profile = await requireTeacher(ctx);
    const name = args.name.trim();
    if (!name) throw new Error("Class name is required");
    if (args.students.length === 0) {
      throw new Error("Add at least one student before submitting");
    }
    if (args.students.length > 200) throw new Error("Too many students (max 200)");
    const classId = await ctx.db.insert("classes", {
      teacherProfileId: profile._id,
      name,
      academicYear: args.academicYear.trim() || "2026-27",
      status: "submitted",
    });
    const seen = new Set<string>();
    for (const row of args.students) {
      const studentName = row.name.trim();
      if (!studentName || seen.has(studentName.toLowerCase())) continue;
      seen.add(studentName.toLowerCase());
      const rollNo = row.rollNo?.trim();
      await ctx.db.insert("students", {
        classId,
        name: studentName,
        rollNo: rollNo === "" ? undefined : rollNo,
      });
    }
    return classId;
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
