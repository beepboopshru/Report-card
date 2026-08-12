import { describe, expect, it } from "vitest";
import {
  formatSessionKey,
  LMS_LEVELS,
  lmsLevelPath,
} from "../../convex/lib/lmsCatalog";

describe("lmsLevelPath", () => {
  it("deep-links each level into the vendored LMS with all its classes", () => {
    expect(lmsLevelPath(LMS_LEVELS[0])).toBe(
      "/lms/index.html?panel=classSelect&year=1&grades=4,5,6,7&years=1&sessions=",
    );
    expect(lmsLevelPath(LMS_LEVELS[1])).toBe(
      "/lms/index.html?panel=classSelect&year=2&grades=6,7,8,9&years=2&sessions=",
    );
  });

  it("restricts the class list to the assigned grades", () => {
    expect(lmsLevelPath(LMS_LEVELS[0], ["5", "6"])).toBe(
      "/lms/index.html?panel=classSelect&year=1&grades=5,6&years=1&sessions=",
    );
  });

  it("skips class select when a single class is assigned", () => {
    expect(lmsLevelPath(LMS_LEVELS[1], ["8"])).toBe(
      "/lms/index.html?panel=sessionSelect&year=2&grade=8&grades=8&years=2&sessions=",
    );
  });
});

describe("formatSessionKey", () => {
  it("formats year-grade-session keys", () => {
    expect(formatSessionKey("1-4-3")).toBe("Level 1 · Class 4 · Session 3");
    expect(formatSessionKey("2-9-0")).toBe("Level 2 · Class 9 · Intro session");
  });

  it("passes through malformed keys", () => {
    expect(formatSessionKey("weird")).toBe("weird");
  });
});
