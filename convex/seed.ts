import { mutation } from "./_generated/server";
import { requireAdmin } from "./lib/access";
import { SEED_KITS } from "./seed/kits";
import { SEED_RUBRICS } from "./seed/rubrics";

export const seedKitsAndRubrics = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    let kitsInserted = 0;
    let kitsSkipped = 0;
    let rubricsInserted = 0;
    let rubricsSkipped = 0;

    for (const seed of SEED_KITS) {
      const existing = await ctx.db
        .query("kits")
        .withIndex("by_kitNumber_and_category", (q) =>
          q.eq("kitNumber", seed.kitNumber).eq("category", seed.category),
        )
        .unique();
      if (!existing) {
        await ctx.db.insert("kits", seed);
        kitsInserted++;
      } else {
        kitsSkipped++;
      }
    }

    for (const seed of SEED_RUBRICS) {
      const kit = await ctx.db
        .query("kits")
        .withIndex("by_kitNumber_and_category", (q) =>
          q.eq("kitNumber", seed.kitNumber).eq("category", seed.category),
        )
        .unique();
      if (!kit) continue;
      const existing = await ctx.db
        .query("rubrics")
        .withIndex("by_kit", (q) => q.eq("kitId", kit._id))
        .unique();
      if (!existing) {
        await ctx.db.insert("rubrics", { kitId: kit._id, criteria: seed.criteria });
        rubricsInserted++;
      } else {
        rubricsSkipped++;
      }
    }

    return { kitsInserted, kitsSkipped, rubricsInserted, rubricsSkipped };
  },
});
