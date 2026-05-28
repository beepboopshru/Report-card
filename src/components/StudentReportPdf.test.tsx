import { describe, it, expect } from "vitest";
import { renderToString } from "@react-pdf/renderer";
import { StudentReportDoc, type ScoredKit } from "./StudentReportPdf";

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
