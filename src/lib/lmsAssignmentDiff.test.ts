import { describe, it, expect } from "vitest";
import { diffLmsAssignment } from "./lmsAssignmentDiff";

describe("diffLmsAssignment", () => {
  it("reports nothing when the assignment is untouched", () => {
    const same = [{ levelId: "level1", grades: ["5", "4"] }];
    expect(diffLmsAssignment(same, [{ levelId: "level1", grades: ["4", "5"] }]))
      .toEqual([]);
  });

  it("names added, removed, and narrowed levels", () => {
    const changes = diffLmsAssignment(
      [
        { levelId: "level1", grades: ["4", "5"] },
        { levelId: "level2", grades: ["6"] },
      ],
      [
        { levelId: "level1", grades: ["4"] },
        { levelId: "blix", grades: ["all"] },
      ],
    );
    expect(changes.map((c) => [c.kind, c.levelId, c.detail])).toEqual([
      ["changed", "level1", "Class 4 — was Class 4, 5"],
      ["removed", "level2", "Class 6"],
      ["added", "blix", "whole course"],
    ]);
  });
});
