import { describe, it, expect } from "vitest";
import { makeCriterionHeader, parseCriterionId, readGridTarget } from "./gradeSheet";

describe("criterion headers", () => {
  it("round-trips label + id", () => {
    const h = makeCriterionHeader("Following instructions", "following-instructions");
    expect(h).toBe("Following instructions ⟨following-instructions⟩");
    expect(parseCriterionId(h)).toBe("following-instructions");
  });

  it("returns null when no id token present", () => {
    expect(parseCriterionId("Just a label")).toBeNull();
  });
});

describe("readGridTarget", () => {
  const header = ["class_id", "kit_id", "student_id", "roll_no", "name", "absent", "obs"];

  it("reads classId/kitId from the first data row", () => {
    const grid = [header, ["c1", "k1", "s1", "1", "A", "", ""]];
    expect(readGridTarget(grid)).toEqual({ classId: "c1", kitId: "k1" });
  });

  it("errors when rows disagree on class/kit", () => {
    const grid = [
      header,
      ["c1", "k1", "s1", "1", "A", "", ""],
      ["c1", "k2", "s2", "2", "B", "", ""],
    ];
    expect(readGridTarget(grid)).toEqual({
      error: "File mixes multiple classes or kits — import one kit’s tab at a time.",
    });
  });

  it("errors when there are no data rows", () => {
    expect(readGridTarget([header])).toEqual({ error: "No student rows found in the file." });
  });
});

import { buildImportPlan } from "./gradeSheet";
import type { RubricCriterion, StudentLite, ExistingScore } from "./gradeSheet";

const CRITERIA: RubricCriterion[] = [
  { id: "foo", label: "Foo" },
  { id: "bar", label: "Bar" },
];
const STUDENTS: StudentLite[] = [
  { _id: "s1", name: "Alice", rollNo: "1" },
  { _id: "s2", name: "Bob", rollNo: "2" },
];

function header(): string[] {
  return [
    "class_id",
    "kit_id",
    "student_id",
    "roll_no",
    "name",
    "absent",
    "Foo ⟨foo⟩",
    "Bar ⟨bar⟩",
    "observations",
  ];
}

describe("buildImportPlan structural checks", () => {
  it("errors when criterion columns don't match the rubric", () => {
    const grid = [
      ["class_id", "kit_id", "student_id", "roll_no", "name", "absent", "Foo ⟨foo⟩", "observations"],
      ["c1", "k1", "s1", "1", "Alice", "", "4", ""],
    ];
    const plan = buildImportPlan(CRITERIA, STUDENTS, {}, grid);
    expect(plan.diffs).toEqual([]);
    expect(plan.errors[0].reason).toMatch(/columns do not match/i);
  });
});
