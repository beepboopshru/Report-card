import { describe, it, expect } from "vitest";
import { totalOf, maxScore, scoredCount, gradeBand } from "../src/lib/totals";

describe("totals", () => {
  it("sums valid scores", () => {
    expect(totalOf({ a: 4, b: 3, c: 2 })).toBe(9);
    expect(totalOf({})).toBe(0);
  });
  it("scoredCount ignores zeros", () => {
    expect(scoredCount({ a: 4, b: 0, c: 2 }, 3)).toBe(2);
  });
  it("maxScore = 6 * 4 = 24", () => {
    expect(maxScore(6)).toBe(24);
  });
  it("gradeBand thresholds", () => {
    expect(gradeBand(95)).toBe("Outstanding");
    expect(gradeBand(80)).toBe("Proficient");
    expect(gradeBand(60)).toBe("Developing");
    expect(gradeBand(30)).toBe("Beginning");
  });
});
