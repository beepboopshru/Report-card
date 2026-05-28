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
