import { describe, it, expect } from "vitest";
import { toneFromRatio, classProgress, studentProgress } from "./progress";

describe("toneFromRatio", () => {
  it("returns 'bad' below 0.33", () => {
    expect(toneFromRatio(0)).toBe("bad");
    expect(toneFromRatio(0.32)).toBe("bad");
  });
  it("returns 'warn' between 0.33 and 0.67", () => {
    expect(toneFromRatio(0.33)).toBe("warn");
    expect(toneFromRatio(0.66)).toBe("warn");
  });
  it("returns 'ok' between 0.67 and 0.9", () => {
    expect(toneFromRatio(0.67)).toBe("ok");
    expect(toneFromRatio(0.89)).toBe("ok");
  });
  it("returns 'good' at or above 0.9", () => {
    expect(toneFromRatio(0.9)).toBe("good");
    expect(toneFromRatio(1)).toBe("good");
  });
  it("handles divide-by-zero by returning 'neutral'", () => {
    expect(toneFromRatio(NaN)).toBe("neutral");
  });
});

describe("studentProgress", () => {
  it("counts unique scored kits", () => {
    const scoredKitIds = new Set(["k1", "k2"]);
    const curriculumKitIds = ["k1", "k2", "k3"];
    expect(studentProgress(scoredKitIds, curriculumKitIds)).toEqual({
      scored: 2,
      total: 3,
      ratio: 2 / 3,
    });
  });
  it("returns ratio 0 when curriculum is empty", () => {
    expect(studentProgress(new Set(), [])).toEqual({
      scored: 0,
      total: 0,
      ratio: 0,
    });
  });
});

describe("classProgress", () => {
  it("computes student-kit pair completion", () => {
    // 2 students × 3 kits = 6 pairs; 4 are scored
    const scoredPairs = new Set(["s1:k1", "s1:k2", "s2:k1", "s2:k3"]);
    const studentIds = ["s1", "s2"];
    const kitIds = ["k1", "k2", "k3"];
    expect(classProgress(scoredPairs, studentIds, kitIds)).toEqual({
      scored: 4,
      total: 6,
      ratio: 4 / 6,
    });
  });
  it("returns ratio 0 when no students or no kits", () => {
    expect(classProgress(new Set(), [], ["k1"])).toEqual({
      scored: 0,
      total: 0,
      ratio: 0,
    });
  });
});
