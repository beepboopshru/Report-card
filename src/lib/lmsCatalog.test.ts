import { describe, expect, it } from "vitest";
import {
  formatSessionKey,
  LMS_LEVELS,
  lmsLevelPath,
} from "../../convex/lib/lmsCatalog";

describe("lmsLevelPath", () => {
  it("deep-links each level into the vendored LMS", () => {
    expect(lmsLevelPath(LMS_LEVELS[0])).toBe(
      "/lms/index.html?panel=classSelect&year=1",
    );
    expect(lmsLevelPath(LMS_LEVELS[1])).toBe(
      "/lms/index.html?panel=classSelect&year=2",
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
