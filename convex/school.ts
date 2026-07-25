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
  args: { address: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const profile = await requireTeacher(ctx);
    const address = args.address.trim();
    if (!address) throw new Error("School address is required");
    const existing = await ctx.db
      .query("schoolDetails")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { address });
    } else {
      await ctx.db.insert("schoolDetails", {
        teacherProfileId: profile._id,
        address,
      });
    }
    return null;
  },
});
