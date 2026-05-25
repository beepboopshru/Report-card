import { query } from "./_generated/server";
import { v } from "convex/values";
import { requireProfile } from "./lib/access";

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireProfile(ctx);
    const all = await ctx.db.query("kits").collect();
    return all.sort(
      (a, b) => a.kitNumber - b.kitNumber || a.category.localeCompare(b.category),
    );
  },
});

export const get = query({
  args: { kitId: v.id("kits") },
  handler: async (ctx, { kitId }) => {
    await requireProfile(ctx);
    return await ctx.db.get(kitId);
  },
});

export const count = query({
  args: {},
  handler: async (ctx) => {
    await requireProfile(ctx);
    const all = await ctx.db.query("kits").collect();
    return all.length;
  },
});
