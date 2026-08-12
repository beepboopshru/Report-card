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
      schoolName: v.optional(v.string()),
      principalName: v.optional(v.string()),
      coordinatorName: v.optional(v.string()),
      contactPhone: v.optional(v.string()),
      contactEmail: v.optional(v.string()),
      studentsRegistered: v.optional(v.number()),
      timings: v.optional(v.string()),
      // Legacy field from the old grade-section setup; new rows omit it.
      sections: v.optional(v.array(sectionValidator)),
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

export const save = mutation({
  args: {
    schoolName: v.string(),
    principalName: v.string(),
    coordinatorName: v.string(),
    contactPhone: v.string(),
    contactEmail: v.optional(v.string()),
    studentsRegistered: v.number(),
    address: v.string(),
    timings: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const profile = await requireTeacher(ctx);
    const details = {
      schoolName: args.schoolName.trim(),
      principalName: args.principalName.trim(),
      coordinatorName: args.coordinatorName.trim(),
      contactPhone: args.contactPhone.trim(),
      contactEmail: args.contactEmail?.trim() || undefined,
      studentsRegistered: args.studentsRegistered,
      address: args.address.trim(),
      timings: args.timings.trim(),
    };
    const required: Array<[keyof typeof details, string]> = [
      ["schoolName", "School name"],
      ["principalName", "Principal name"],
      ["coordinatorName", "Coordinator name"],
      ["contactPhone", "Contact number"],
      ["address", "School address"],
      ["timings", "School timings"],
    ];
    for (const [key, label] of required) {
      if (!details[key]) throw new Error(`${label} is required`);
    }
    if (
      !Number.isInteger(details.studentsRegistered) ||
      details.studentsRegistered < 1
    ) {
      throw new Error("Number of students registered must be a positive number");
    }
    const existing = await ctx.db
      .query("schoolDetails")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, details);
    } else {
      await ctx.db.insert("schoolDetails", {
        teacherProfileId: profile._id,
        ...details,
      });
    }
    return null;
  },
});
