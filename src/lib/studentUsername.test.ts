import { describe, expect, it } from "vitest";
import {
  buildStudentUsername,
  slugify,
} from "../../convex/lib/studentUsername";
import { assertValidUsername } from "../../convex/lib/username";

describe("slugify", () => {
  it("lowercases and collapses non-alphanumerics", () => {
    expect(slugify("Asha  Kumar!")).toBe("asha-kumar");
    expect(slugify("  Ravi S. ")).toBe("ravi-s");
    expect(slugify("Class 4A")).toBe("class-4a");
  });
});

describe("buildStudentUsername", () => {
  it("joins student and class slugs", () => {
    expect(buildStudentUsername("Asha Kumar", "Class 4A")).toBe(
      "asha-kumar.class-4a",
    );
  });

  it("appends the suffix for collisions", () => {
    expect(buildStudentUsername("Asha Kumar", "Class 4A", 2)).toBe(
      "asha-kumar.class-4a2",
    );
  });

  it("always produces a valid username, even for hostile input", () => {
    const cases: [string, string, number][] = [
      ["A", "B", 1],
      ["Venkatanarasimharajuvaripeta Subrahmanyam", "Class 7 Robotics Advanced", 1],
      ["Venkatanarasimharajuvaripeta Subrahmanyam", "Class 7 Robotics Advanced", 12],
      ["!!!", "???", 1],
      ["日本語", "Class 4", 3],
    ];
    for (const [name, cls, suffix] of cases) {
      const username = buildStudentUsername(name, cls, suffix);
      expect(username.length).toBeLessThanOrEqual(32);
      expect(() => assertValidUsername(username)).not.toThrow();
    }
  });
});
