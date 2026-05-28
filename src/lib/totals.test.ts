import { describe, it, expect } from "vitest";
import { totalOf, maxScore, scoredCount, gradeBand, isResolved } from "./totals";

describe("totals", () => {
  it("totalOf sums the values", () => {
    expect(totalOf({ c1: 4, c2: 3, c3: 2 })).toBe(9);
  });

  it("maxScore is 4× criteria count", () => {
    expect(maxScore(6)).toBe(24);
  });

  it("scoredCount counts non-zero entries up to criteriaCount", () => {
    expect(scoredCount({ c1: 4, c2: 3 }, 6)).toBe(2);
  });

  it("gradeBand maps percentages", () => {
    expect(gradeBand(95)).toBe("Advanced");
    expect(gradeBand(80)).toBe("Proficient");
    expect(gradeBand(60)).toBe("Developing");
    expect(gradeBand(20)).toBe("Emerging");
  });

  describe("isResolved", () => {
    it("returns true when absent is true even with no scores", () => {
      expect(isResolved({ criterionScores: {}, absent: true }, "c1")).toBe(true);
    });

    it("returns true when the criterion has a 1-4 score", () => {
      expect(isResolved({ criterionScores: { c1: 3 }, absent: false }, "c1")).toBe(true);
    });

    it("returns false when neither absent nor scored", () => {
      expect(isResolved({ criterionScores: {}, absent: false }, "c1")).toBe(false);
    });

    it("treats missing absent as false", () => {
      expect(isResolved({ criterionScores: {} }, "c1")).toBe(false);
    });
  });
});
