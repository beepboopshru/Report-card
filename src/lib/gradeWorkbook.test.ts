import { describe, it, expect } from "vitest";
import { sheetsForExport, type ExportData } from "./gradeWorkbook";

const DATA: ExportData = {
  classId: "c1",
  className: "Grade 3",
  students: [
    { _id: "s1", name: "Alice", rollNo: "1" },
    { _id: "s2", name: "Bob", rollNo: undefined },
  ],
  kits: [
    {
      kitId: "k1",
      kitNumber: 7,
      kitName: "MAGIC SABER",
      category: "Discoverer",
      criteria: [
        { id: "foo", label: "Foo" },
        { id: "bar", label: "Bar" },
      ],
      scores: [
        { studentId: "s1", criterionScores: { foo: 4 }, absent: false, observations: "nice" },
        { studentId: "s2", criterionScores: {}, absent: true, observations: "" },
      ],
    },
  ],
};

describe("sheetsForExport", () => {
  it("produces one sheet per kit with a header row", () => {
    const { sheets, names } = sheetsForExport(DATA);
    expect(names).toEqual(["#7 MAGIC SABER"]);
    const header = sheets[0][0].map((c) => c.value);
    expect(header).toEqual([
      "class_id",
      "kit_id",
      "student_id",
      "roll_no",
      "name",
      "absent",
      "Foo ⟨foo⟩",
      "Bar ⟨bar⟩",
      "observations",
    ]);
  });

  it("pre-fills existing marks, absent, and observations", () => {
    const { sheets } = sheetsForExport(DATA);
    const alice = sheets[0][1].map((c) => c.value);
    // class_id, kit_id, student_id, roll_no, name, absent, foo, bar, observations
    expect(alice).toEqual(["c1", "k1", "s1", "1", "Alice", "", 4, null, "nice"]);
    const bob = sheets[0][2].map((c) => c.value);
    expect(bob).toEqual(["c1", "k1", "s2", null, "Bob", "x", null, null, null]);
  });

  it("truncates sheet names to Excel's 31-char limit", () => {
    const long: ExportData = {
      ...DATA,
      kits: [{ ...DATA.kits[0], kitNumber: 12, kitName: "A".repeat(40) }],
    };
    expect(sheetsForExport(long).names[0].length).toBeLessThanOrEqual(31);
  });
});
