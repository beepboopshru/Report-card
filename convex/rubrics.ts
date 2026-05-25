import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, requireProfile } from "./lib/access";

export const getForKit = query({
  args: { kitId: v.id("kits") },
  handler: async (ctx, { kitId }) => {
    await requireProfile(ctx);
    return await ctx.db
      .query("rubrics")
      .withIndex("by_kit", (q) => q.eq("kitId", kitId))
      .unique();
  },
});

export const update = mutation({
  args: {
    kitId: v.id("kits"),
    criteria: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        sub: v.string(),
        c4: v.string(),
        c3: v.string(),
        c2: v.string(),
        c1: v.string(),
      }),
    ),
  },
  handler: async (ctx, { kitId, criteria }) => {
    await requireAdmin(ctx);
    if (criteria.length !== 6) throw new Error("Rubric must have exactly 6 criteria");
    const existing = await ctx.db
      .query("rubrics")
      .withIndex("by_kit", (q) => q.eq("kitId", kitId))
      .unique();
    if (existing) await ctx.db.patch(existing._id, { criteria });
    else await ctx.db.insert("rubrics", { kitId, criteria });
  },
});
