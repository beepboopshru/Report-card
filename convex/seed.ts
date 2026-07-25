import {
  internalMutation,
  mutation,
  type MutationCtx,
} from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/access";
import { SEED_KITS } from "./seed/kits";
import { SEED_RUBRICS } from "./seed/rubrics";
import { ROBOTICS_KITS, ROBOTICS_RUBRICS } from "./seed/robotics";

async function seedAll(ctx: MutationCtx) {
  let kitsInserted = 0;
  let kitsSkipped = 0;
  let rubricsInserted = 0;
  let rubricsSkipped = 0;

  for (const seed of [...SEED_KITS, ...ROBOTICS_KITS]) {
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

    for (const seed of [...SEED_RUBRICS, ...ROBOTICS_RUBRICS]) {
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
}

const seedResult = v.object({
  kitsInserted: v.number(),
  kitsSkipped: v.number(),
  rubricsInserted: v.number(),
  rubricsSkipped: v.number(),
});

export const seedKitsAndRubrics = mutation({
  args: {},
  returns: seedResult,
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await seedAll(ctx);
  },
});

// Same seed, runnable from the CLI/dashboard without a signed-in admin:
// `npx convex run seed:seedFromCli`
export const seedFromCli = internalMutation({
  args: {},
  returns: seedResult,
  handler: async (ctx) => {
    return await seedAll(ctx);
  },
});
