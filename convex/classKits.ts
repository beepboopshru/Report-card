import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireOwnsClass, requireProfile } from "./lib/access";

export const listForClass = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    await requireOwnsClass(ctx, classId);
    const links = await ctx.db
      .query("classKits")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    links.sort((a, b) => a.order - b.order);
    const withKits = await Promise.all(
      links.map(async (l) => ({ ...l, kit: await ctx.db.get(l.kitId) })),
    );
    return withKits.filter((x) => x.kit !== null);
  },
});

export const add = mutation({
  args: { classId: v.id("classes"), kitId: v.id("kits") },
  handler: async (ctx, { classId, kitId }) => {
    const { profile } = await requireOwnsClass(ctx, classId);

    if (profile.role !== "admin") {
      const assigned = await ctx.db
        .query("assignments")
        .withIndex("by_teacher_and_kit", (q) =>
          q.eq("teacherProfileId", profile._id).eq("kitId", kitId),
        )
        .unique();
      if (!assigned) throw new Error("This kit is not assigned to you");
    }

    const existing = await ctx.db
      .query("classKits")
      .withIndex("by_class_and_kit", (q) => q.eq("classId", classId).eq("kitId", kitId))
      .unique();
    if (existing) return existing._id;

    const all = await ctx.db
      .query("classKits")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    const maxOrder = all.reduce((m, l) => Math.max(m, l.order), -1);
    return await ctx.db.insert("classKits", { classId, kitId, order: maxOrder + 1 });
  },
});

export const remove = mutation({
  args: { classKitId: v.id("classKits") },
  handler: async (ctx, { classKitId }) => {
    const link = await ctx.db.get(classKitId);
    if (!link) return;
    await requireOwnsClass(ctx, link.classId);
    await ctx.db.delete(classKitId);
  },
});

export const assignedKitsForTeacher = query({
  args: {},
  handler: async (ctx) => {
    const profile = await requireProfile(ctx);
    if (profile.role === "admin") {
      return await ctx.db.query("kits").collect();
    }
    const links = await ctx.db
      .query("assignments")
      .withIndex("by_teacher", (q) => q.eq("teacherProfileId", profile._id))
      .collect();
    const kits = await Promise.all(links.map((l) => ctx.db.get(l.kitId)));
    return kits.filter((k): k is NonNullable<typeof k> => k !== null);
  },
});
