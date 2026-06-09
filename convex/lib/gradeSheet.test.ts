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

describe("buildImportPlan diffs", () => {
  it("records new marks and leaves blanks untouched", () => {
    const grid = [
      header(),
      ["c1", "k1", "s1", "1", "Alice", "", "4", "", ""], // bar blank = no change
    ];
    const plan = buildImportPlan(CRITERIA, STUDENTS, {}, grid);
    expect(plan.errors).toEqual([]);
    expect(plan.diffs).toEqual([
      {
        studentId: "s1",
        name: "Alice",
        rollNo: "1",
        markChanges: [{ criterionId: "foo", label: "Foo", from: null, to: 4 }],
        absentChange: undefined,
        observationChange: undefined,
      },
    ]);
  });

  it("records changed marks with from→to", () => {
    const existing: Record<string, ExistingScore> = { s1: { criterionScores: { foo: 2 } } };
    const grid = [header(), ["c1", "k1", "s1", "1", "Alice", "", "3", "", ""]];
    const plan = buildImportPlan(CRITERIA, STUDENTS, existing, grid);
    expect(plan.diffs[0].markChanges).toEqual([{ criterionId: "foo", label: "Foo", from: 2, to: 3 }]);
  });

  it("emits no diff when marks equal existing", () => {
    const existing: Record<string, ExistingScore> = { s1: { criterionScores: { foo: 4 } } };
    const grid = [header(), ["c1", "k1", "s1", "1", "Alice", "", "4", "", ""]];
    const plan = buildImportPlan(CRITERIA, STUDENTS, existing, grid);
    expect(plan.diffs).toEqual([]);
  });

  it("records absent toggle and observations", () => {
    const grid = [header(), ["c1", "k1", "s2", "2", "Bob", "x", "", "", "Great effort"]];
    const plan = buildImportPlan(CRITERIA, STUDENTS, {}, grid);
    expect(plan.diffs[0].absentChange).toEqual({ from: false, to: true });
    expect(plan.diffs[0].observationChange).toEqual({ from: "", to: "Great effort" });
  });

  it("flags out-of-range marks and unknown students", () => {
    const grid = [
      header(),
      ["c1", "k1", "s1", "1", "Alice", "", "5", "", ""],
      ["c1", "k1", "sX", "9", "Ghost", "", "3", "", ""],
    ];
    const plan = buildImportPlan(CRITERIA, STUDENTS, {}, grid);
    expect(plan.errors).toEqual([
      { row: 2, studentId: "s1", reason: '"Foo" must be 1-4 (got "5").' },
      { row: 3, studentId: "sX", reason: "Unknown student — not in this class." },
    ]);
    expect(plan.diffs).toEqual([]);
  });
});
