import { describe, expect, it } from "vitest";
import {
  formatSessionKey,
  gradesLabel,
  LMS_LEVELS,
  lmsLevelPath,
} from "../../convex/lib/lmsCatalog";

describe("lmsLevelPath", () => {
  it("deep-links each level into the vendored LMS with all its classes", () => {
    expect(lmsLevelPath(LMS_LEVELS[0])).toBe(
      "/lms/index.html?panel=classSelect&year=1&grades=4,5,6,7&years=1&sessions=&gradeNames=",
    );
    expect(lmsLevelPath(LMS_LEVELS[1])).toBe(
      "/lms/index.html?panel=classSelect&year=2&grades=6,7,8,9&years=2&sessions=&gradeNames=",
    );
  });

  it("restricts the class list to the assigned grades", () => {
    expect(lmsLevelPath(LMS_LEVELS[0], ["5", "6"])).toBe(
      "/lms/index.html?panel=classSelect&year=1&grades=5,6&years=1&sessions=&gradeNames=",
    );
  });

  it("skips class select when a single class is assigned", () => {
    expect(lmsLevelPath(LMS_LEVELS[1], ["8"])).toBe(
      "/lms/index.html?panel=sessionSelect&year=2&grade=8&grades=8&years=2&sessions=&gradeNames=",
    );
  });

  it("passes per-school class renames to the LMS", () => {
    expect(
      lmsLevelPath(LMS_LEVELS[1], ["6"], undefined, { "6": "Class 5" }),
    ).toBe(
      `/lms/index.html?panel=sessionSelect&year=2&grade=6&grades=6&years=2&sessions=&gradeNames=${encodeURIComponent('{"6":"Class 5"}')}`,
    );
  });

  it("links Year 2 to its own page with the assignment filters", () => {
    const year2 = LMS_LEVELS.find((l) => l.id === "year2")!;
    expect(lmsLevelPath(year2)).toBe(
      "/lms/pages/year2.html?grades=6,7,8,9&sessions=&gradeNames=",
    );
    expect(
      lmsLevelPath(year2, ["7"], [{ grade: "7", session: "3", groups: ["core"] }], {
        "7": "Class 6",
      }),
    ).toBe(
      `/lms/pages/year2.html?grades=7&sessions=${encodeURIComponent(
        '[{"grade":"7","session":"3","groups":["core"]}]',
      )}&gradeNames=${encodeURIComponent('{"7":"Class 6"}')}&grade=7`,
    );
  });

  it("links BLIX to its own page, with picked sessions as a comma list", () => {
    const blix = LMS_LEVELS.find((l) => l.id === "blix")!;
    expect(lmsLevelPath(blix)).toBe("/lms/pages/blix.html");
    expect(
      lmsLevelPath(blix, ["all"], [
        { grade: "all", session: "2", groups: ["core"] },
        { grade: "all", session: "5", groups: ["core"] },
      ]),
    ).toBe("/lms/pages/blix.html?sessions=2,5");
  });
});

describe("gradesLabel", () => {
  it("uses per-school renames, falling back to the real class name", () => {
    expect(gradesLabel(LMS_LEVELS[1], ["6", "7"], { "6": "Class 5" })).toBe(
      "Class 5 · Class 7",
    );
    expect(gradesLabel(LMS_LEVELS[1], ["6", "7"])).toBe("Class 6 · Class 7");
  });
});

describe("formatSessionKey", () => {
  it("formats year-grade-session keys", () => {
    expect(formatSessionKey("1-4-3")).toBe("Level 1 · Class 4 · Session 3");
    expect(formatSessionKey("2-9-0")).toBe("Level 2 · Class 9 · Intro session");
    expect(formatSessionKey("year2-6-3")).toBe("Year 2 · Class 6 · Session 3");
  });

  it("passes through malformed keys", () => {
    expect(formatSessionKey("weird")).toBe("weird");
  });
});
