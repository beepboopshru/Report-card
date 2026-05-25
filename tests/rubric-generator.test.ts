import { describe, it, expect } from "vitest";
import { SEED_RUBRICS } from "../convex/seed/rubrics";
import { SEED_KITS } from "../convex/seed/kits";

describe("seed rubrics", () => {
  it("has matching counts for kits and rubrics", () => {
    expect(SEED_RUBRICS.length).toBe(SEED_KITS.length);
    expect(SEED_KITS.length).toBeGreaterThanOrEqual(150);
  });

  it("every rubric has exactly 6 criteria, each with 4 descriptors", () => {
    for (const r of SEED_RUBRICS) {
      expect(r.criteria).toHaveLength(6);
      for (const c of r.criteria) {
        expect(c.c1).toBeTruthy();
        expect(c.c2).toBeTruthy();
        expect(c.c3).toBeTruthy();
        expect(c.c4).toBeTruthy();
      }
    }
  });

  it("Explorer kits use the 'observation' criterion, Discoverer kits use 'exploration'", () => {
    for (const r of SEED_RUBRICS) {
      const id5 = r.criteria[4].id;
      if (r.category === "Explorer") expect(id5).toBe("observation");
      else expect(id5).toBe("exploration");
    }
  });
});
