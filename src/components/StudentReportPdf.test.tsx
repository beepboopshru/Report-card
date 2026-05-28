import { describe, it, expect } from "vitest";
import { renderToString } from "@react-pdf/renderer";
import { StudentReportDoc, type ScoredKit, __test } from "./StudentReportPdf";

const sampleKit: ScoredKit = {
  kit: { kitNumber: 3, kitName: "Solar Oven", concept: "Energy", category: "Build" },
  rubric: {
    criteria: [
      { id: "c1", label: "Observation", c4: "Sharp", c3: "Good", c2: "Some", c1: "Few" },
      { id: "c2", label: "Reasoning", c4: "Clear", c3: "Some", c2: "Weak", c1: "None" },
    ],
  },
  criterionScores: { c1: 4, c2: 3 },
  observations: "Engaged and curious throughout.",
};

describe("StudentReportDoc", () => {
  it("renders without throwing for zero kits", async () => {
    const out = await renderToString(
      <StudentReportDoc studentName="Aarav Sharma" className="Class V" scored={[]} />,
    );
    expect(out).toBeTruthy();
  });

  it("renders without throwing for one scored kit", async () => {
    const out = await renderToString(
      <StudentReportDoc studentName="Aarav Sharma" className="Class V" scored={[sampleKit]} />,
    );
    expect(out).toBeTruthy();
  });
});

describe("buildCriterionUnion", () => {
  it("returns empty array for no kits", () => {
    expect(__test.buildCriterionUnion([])).toEqual([]);
  });

  it("returns the rubric of a single kit in original order", () => {
    const kits: ScoredKit[] = [sampleKit];
    expect(__test.buildCriterionUnion(kits)).toEqual([
      { id: "c1", label: "Observation" },
      { id: "c2", label: "Reasoning" },
    ]);
  });

  it("merges criteria across kits preserving first-seen order", () => {
    const kitA: ScoredKit = {
      ...sampleKit,
      rubric: { criteria: [
        { id: "c1", label: "Observation", c4: "", c3: "", c2: "", c1: "" },
        { id: "c2", label: "Reasoning",   c4: "", c3: "", c2: "", c1: "" },
      ] },
    };
    const kitB: ScoredKit = {
      ...sampleKit,
      rubric: { criteria: [
        { id: "c2", label: "Reasoning", c4: "", c3: "", c2: "", c1: "" },
        { id: "c3", label: "Build",     c4: "", c3: "", c2: "", c1: "" },
      ] },
    };
    expect(__test.buildCriterionUnion([kitA, kitB])).toEqual([
      { id: "c1", label: "Observation" },
      { id: "c2", label: "Reasoning" },
      { id: "c3", label: "Build" },
    ]);
  });
});

describe("formatIssueDate", () => {
  it("formats a date as DD MMM YYYY (en-IN)", () => {
    // freeze on a known date
    const d = new Date("2026-05-28T12:00:00Z");
    expect(__test.formatIssueDate(d)).toBe("28 May 2026");
  });
});

describe("formatClassPrefix", () => {
  it("always prepends 'of '", () => {
    expect(__test.formatClassPrefix("Class V")).toBe("of Class V");
    expect(__test.formatClassPrefix("V-B")).toBe("of V-B");
  });
});

describe("chipStyle", () => {
  it("returns no background for score 0", () => {
    const s = __test.chipStyle(0);
    expect(s.backgroundColor).toBe("transparent");
  });

  it("returns score-4 colors for score 4", () => {
    const s = __test.chipStyle(4);
    expect(s.backgroundColor).toBe("#E1F5EE"); // good-50
    expect(s.color).toBe("#1D9E75");           // good-400
  });

  it("returns score-1 colors for score 1", () => {
    const s = __test.chipStyle(1);
    expect(s.backgroundColor).toBe("#FCEBEB"); // bad-50
    expect(s.color).toBe("#A32D2D");           // bad-600
  });
});
