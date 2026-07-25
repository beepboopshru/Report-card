import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireTeacher } from "./lib/access";

const sectionValidator = v.object({
  grade: v.string(),
  section: v.string(),
  attendance: v.number(),
});

/** Null until the teacher completes first-login school setup. */
export const getMine = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("schoolDetails"),
      _creationTime: v.number(),
      teacherProfileId: v.id("profiles"),
      address: v.string(),
      sections: v.array(sectionValidator),
    }),
  ),
  handler: async (ctx) => {
    const profile = await requireTeacher(ctx);
    return await ctx.db
      .query("schoolDetails")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .unique();
  },
});

/** "5" + "A" → "Grade 5A"; "Grade 5" + "A" → "Grade 5 A". */
export function sectionClassName(grade: string, section: string): string {
  const g = grade.trim();
  const s = section.trim();
  return /^\d+$/.test(g) ? `Grade ${g}${s}` : `${g} ${s}`;
}

export const save = mutation({
  args: {
    address: v.string(),
    academicYear: v.string(),
    sections: v.array(sectionValidator),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const profile = await requireTeacher(ctx);
    const address = args.address.trim();
    if (!address) throw new Error("School address is required");
    if (args.sections.length === 0) {
      throw new Error("Add at least one grade-section");
    }
    for (const s of args.sections) {
      if (!s.grade.trim() || !s.section.trim()) {
        throw new Error("Every row needs a grade and a section");
      }
      if (!Number.isInteger(s.attendance) || s.attendance < 0 || s.attendance > 1000) {
        throw new Error("Attendance must be a whole number between 0 and 1000");
      }
    }
    const existing = await ctx.db
      .query("schoolDetails")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { address, sections: args.sections });
    } else {
      await ctx.db.insert("schoolDetails", {
        teacherProfileId: profile._id,
        address,
        sections: args.sections,
      });
    }

    // Each grade-section becomes a real class so the teacher doesn't have to
    // create them again. Re-saving only adds ones that don't exist yet.
    const myClasses = await ctx.db
      .query("classes")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .collect();
    const existingNames = new Set(myClasses.map((c) => c.name));
    for (const s of args.sections) {
      const name = sectionClassName(s.grade, s.section);
      if (existingNames.has(name)) continue;
      existingNames.add(name);
      await ctx.db.insert("classes", {
        teacherProfileId: profile._id,
        name,
        academicYear: args.academicYear.trim() || "2026-27",
      });
    }
    return null;
  },
});
