# Student Report PDF — Certificate Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain student PDF with a two-page certificate-styled report card (formal cover + color-tinted per-criterion results grid) using ScienceUtsav · C-STEM branding.

**Architecture:** Single-file rewrite of `src/components/StudentReportPdf.tsx`. The exported `StudentReportDoc` now composes two sub-components: a `CertificatePage` cover and `ResultsPages` (one or more pages of a per-criterion score grid). The exported `downloadStudentReport` function's signature is unchanged so `src/pages/StudentReport.tsx` does not need to be touched. DM Serif Display + DM Sans are registered with `@react-pdf/renderer`'s `Font.register` at module load, with automatic fallback to Helvetica on failure.

**Tech Stack:** React 19, `@react-pdf/renderer` ^4.5.1 (already a dep), TypeScript, Vitest (jsdom).

**Spec:** [docs/superpowers/specs/2026-05-28-student-report-pdf-certificate-design.md](../specs/2026-05-28-student-report-pdf-certificate-design.md)

---

## File Structure

- **Modify:** `src/components/StudentReportPdf.tsx` (full rewrite; keep public exports `StudentReportDoc`, `downloadStudentReport`, type `ScoredKit`)
- **Create:** `src/components/StudentReportPdf.test.tsx` (smoke tests + helper unit tests)

All other files unchanged.

---

## Task 1: Test scaffolding + baseline regression test

**Files:**
- Create: `src/components/StudentReportPdf.test.tsx`

Smoke test against the *current* implementation. It must pass before we change anything, so we have a regression baseline.

- [ ] **Step 1: Write the failing test**

Create `src/components/StudentReportPdf.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { renderToString } from "@react-pdf/renderer";
import { StudentReportDoc, type ScoredKit } from "./StudentReportPdf";

const sampleKit: ScoredKit = {
  kit: { kitNumber: 3, kitName: "Solar Oven", concept: "Energy", category: "Build" },
  rubric: {
    criteria: [
      { id: "c1", label: "Observation", c4: "Sharp", c3: "Good", c2: "Some", c1: "Few" },
      { id: "c2", label: "Reasoning",   c4: "Clear", c3: "Some", c2: "Weak", c1: "None" },
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
```

- [ ] **Step 2: Run test to verify it passes against current code**

Run: `npm test -- StudentReportPdf`
Expected: 2 tests pass. (We are testing against the existing implementation; this establishes the regression baseline.)

If `renderToString` is not exported from `@react-pdf/renderer` v4, substitute `renderToBuffer` and assert `out.length > 0`. Both APIs exist in v4; pick whichever resolves at import time.

- [ ] **Step 3: Commit**

```bash
git add src/components/StudentReportPdf.test.tsx
git commit -m "test: baseline smoke tests for StudentReportPdf"
```

---

## Task 2: Pure helper — buildCriterionUnion

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`
- Modify: `src/components/StudentReportPdf.test.tsx`

Adds the helper that normalizes criterion columns across kits with heterogeneous rubrics. Pure function — easy TDD.

- [ ] **Step 1: Write the failing tests**

Append to `src/components/StudentReportPdf.test.tsx`:

```tsx
import { __test } from "./StudentReportPdf";

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
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- StudentReportPdf`
Expected: 3 new tests fail with import error for `__test`.

- [ ] **Step 3: Implement the helper**

In `src/components/StudentReportPdf.tsx`, add (near the top, after existing imports and types):

```tsx
type CriterionRef = { id: string; label: string };

function buildCriterionUnion(scored: ScoredKit[]): CriterionRef[] {
  const out: CriterionRef[] = [];
  const seen = new Set<string>();
  for (const sk of scored) {
    for (const c of sk.rubric.criteria) {
      if (!seen.has(c.id)) {
        seen.add(c.id);
        out.push({ id: c.id, label: c.label });
      }
    }
  }
  return out;
}

export const __test = { buildCriterionUnion };
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test -- StudentReportPdf`
Expected: all 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/StudentReportPdf.tsx src/components/StudentReportPdf.test.tsx
git commit -m "feat(pdf): buildCriterionUnion helper for heterogeneous rubrics"
```

---

## Task 3: Pure helpers — formatIssueDate, formatClassPrefix, chipStyle

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`
- Modify: `src/components/StudentReportPdf.test.tsx`

Three more pure functions used by the new layout.

- [ ] **Step 1: Write the failing tests**

Append to `src/components/StudentReportPdf.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- StudentReportPdf`
Expected: 5 new tests fail with `__test.formatIssueDate is not a function`.

- [ ] **Step 3: Implement the helpers**

In `src/components/StudentReportPdf.tsx`, add (next to `buildCriterionUnion`):

```tsx
function formatIssueDate(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

function formatClassPrefix(name: string): string {
  return `of ${name}`;
}

type ChipStyle = { backgroundColor: string; color: string };

function chipStyle(score: number): ChipStyle {
  switch (score) {
    case 4: return { backgroundColor: "#E1F5EE", color: "#1D9E75" }; // good-50 / good-400
    case 3: return { backgroundColor: "#EAF3DE", color: "#3B6D11" }; // ok-50 / ok-600
    case 2: return { backgroundColor: "#FAEEDA", color: "#854F0B" }; // warn-50 / warn-600
    case 1: return { backgroundColor: "#FCEBEB", color: "#A32D2D" }; // bad-50 / bad-600
    default: return { backgroundColor: "transparent", color: "#8A93A0" }; // ink-subtle
  }
}
```

Then extend the test-only export:

```tsx
export const __test = { buildCriterionUnion, formatIssueDate, formatClassPrefix, chipStyle };
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test -- StudentReportPdf`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/StudentReportPdf.tsx src/components/StudentReportPdf.test.tsx
git commit -m "feat(pdf): date, class-prefix, and chip-color helpers"
```

---

## Task 4: Register DM Serif Display + DM Sans

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`

Module-load font registration so the PDF text uses the brand fonts. Failure silently falls back to Helvetica.

- [ ] **Step 1: Add font registration**

Add to the top of `src/components/StudentReportPdf.tsx`, after the existing `import { Document, Page, ... }` line:

```tsx
import { Font } from "@react-pdf/renderer";

// Use the v1 endpoint which returns stable raw font URLs.
// If these ever 404, @react-pdf/renderer silently falls back to Helvetica
// and the document still renders — that's the documented degraded state.
try {
  Font.register({
    family: "DM Serif Display",
    src: "https://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.ttf",
  });
  Font.register({
    family: "DM Sans",
    fonts: [
      { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8C.ttf" },
      { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZawIIBSFFOZ-Lo3.ttf", fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
} catch {
  // ignored — fall back to Helvetica
}
```

> **Note on font URLs:** the exact `v15` path may have advanced. During implementation, confirm by opening `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=DM+Serif+Display&display=swap` in a browser and copying the `.ttf` URLs from the CSS response. The fallback path means a stale URL degrades gracefully — the document still renders.

- [ ] **Step 2: Run smoke tests to verify nothing broke**

Run: `npm test -- StudentReportPdf`
Expected: all tests still pass. (Tests render in jsdom; network requests for fonts won't resolve, but `Font.register` is non-blocking and `@react-pdf/renderer` falls back to Helvetica.)

- [ ] **Step 3: Commit**

```bash
git add src/components/StudentReportPdf.tsx
git commit -m "feat(pdf): register DM Serif Display + DM Sans fonts"
```

---

## Task 5: CertificatePage component

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`

Build the page-1 certificate. We keep `StudentReportDoc` rendering the *old* results layout for now — only the cover changes. Smoke tests stay green.

- [ ] **Step 1: Add CertificatePage and supporting styles**

Replace the existing `s = StyleSheet.create(...)` block with the expanded one below, and add `CertificatePage` after the existing `Criterion` / `ScoredKit` types. **Keep** the existing `StudentReportDoc` export and the per-kit `Page` map for now — we'll wire `CertificatePage` into it in Step 3.

```tsx
const s = StyleSheet.create({
  // shared
  page:         { padding: 36, fontSize: 10, fontFamily: "DM Sans" },
  serif:        { fontFamily: "DM Serif Display" },

  // certificate page
  certPage:     { padding: 0, fontSize: 10, fontFamily: "DM Sans" },
  certOuter:    { flex: 1, margin: 18, borderWidth: 1.5, borderColor: "#085041", padding: 18 },
  certInner:    { flex: 1, borderWidth: 0.5, borderColor: "#085041", padding: 28,
                  alignItems: "center", justifyContent: "center" },
  certProgram:  { fontFamily: "DM Serif Display", fontSize: 16, color: "#085041",
                  letterSpacing: 2, marginBottom: 4 },
  certRule:     { width: 80, height: 1, backgroundColor: "#0F6E56", marginBottom: 28 },
  certTitle:    { fontFamily: "DM Serif Display", fontSize: 26, color: "#0F1115",
                  marginBottom: 36 },
  certIntro:    { fontSize: 11, color: "#5B6470", marginBottom: 16 },
  certName:     { fontFamily: "DM Serif Display", fontSize: 32, color: "#0F1115",
                  letterSpacing: 2, marginBottom: 24, textAlign: "center" },
  certBody:     { fontSize: 11, color: "#5B6470", textAlign: "center",
                  marginBottom: 28, maxWidth: 360, lineHeight: 1.5 },
  certScore:    { fontFamily: "DM Serif Display", fontSize: 56, color: "#0F6E56",
                  marginBottom: 4 },
  certBand:     { fontFamily: "DM Serif Display", fontSize: 16, color: "#085041",
                  marginBottom: 28 },
  certMeta:     { fontSize: 10, color: "#5B6470", marginBottom: 6 },

  // results page (unchanged for now — placeholder; Task 6 replaces this)
  h1:           { fontSize: 18, marginBottom: 4 },
  h2:           { fontSize: 13, marginTop: 18, marginBottom: 6 },
  meta:         { fontSize: 9, color: "#555", marginBottom: 10 },
  row:          { flexDirection: "row", borderBottomWidth: 0.5, borderColor: "#ccc",
                  paddingVertical: 4 },
  cellLabel:    { width: 160 },
  cellScore:    { width: 40, textAlign: "center" },
  cellDesc:     { flex: 1, color: "#444" },
  totalBar:     { marginTop: 8, fontSize: 11, fontWeight: 700 },
});

function CertificatePage({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  const isEmpty = scored.length === 0;

  let overallTotal = 0;
  let overallMax = 0;
  for (const sk of scored) {
    overallTotal += totalOf(sk.criterionScores);
    overallMax += maxScore(sk.rubric.criteria.length);
  }
  const pct = overallMax ? Math.round((overallTotal / overallMax) * 100) : 0;
  const band = gradeBand(pct);

  return (
    <Page size="A4" style={s.certPage}>
      <View style={s.certOuter}>
        <View style={s.certInner}>
          <Text style={s.certProgram}>SCIENCEUTSAV · C-STEM</Text>
          <View style={s.certRule} />

          <Text style={s.certTitle}>Certificate of Assessment</Text>

          {isEmpty ? (
            <Text style={s.certIntro}>This certifies enrolment of</Text>
          ) : (
            <Text style={s.certIntro}>This certifies that</Text>
          )}

          <Text style={s.certName}>{studentName.toUpperCase()}</Text>

          {isEmpty ? (
            <Text style={s.certBody}>
              {formatClassPrefix(className)} is currently enrolled in the C-STEM program.
            </Text>
          ) : (
            <>
              <Text style={s.certBody}>
                {formatClassPrefix(className)} has completed the C-STEM assessment
                with an overall score of
              </Text>
              <Text style={s.certScore}>{pct}%</Text>
              <Text style={s.certBand}>{band}</Text>
              <Text style={s.certMeta}>{scored.length} kits assessed</Text>
            </>
          )}

          <Text style={s.certMeta}>Issued {formatIssueDate()}</Text>
        </View>
      </View>
    </Page>
  );
}
```

- [ ] **Step 2: Wire `CertificatePage` as the first page of the document**

Replace the existing `StudentReportDoc` function body. The certificate becomes page 1; the old per-kit pages follow as page 2+ for now (Task 6 replaces them with the new results grid).

```tsx
export function StudentReportDoc({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  return (
    <Document>
      <CertificatePage studentName={studentName} className={className} scored={scored} />
      {scored.map((sk, i) => {
        const total = totalOf(sk.criterionScores);
        const max = maxScore(sk.rubric.criteria.length);
        const pct = max ? Math.round((total / max) * 100) : 0;
        return (
          <Page key={i} size="A4" style={s.page}>
            <Text style={s.h1}>{studentName}</Text>
            <Text style={s.meta}>
              {className} · #{sk.kit.kitNumber} · {sk.kit.kitName} · {sk.kit.category} ·{" "}
              {sk.kit.concept}
            </Text>
            {sk.rubric.criteria.map((c) => {
              const v = sk.criterionScores[c.id] ?? 0;
              const desc =
                v === 4 ? c.c4 : v === 3 ? c.c3 : v === 2 ? c.c2 : v === 1 ? c.c1 : "—";
              return (
                <View key={c.id} style={s.row} wrap={false}>
                  <Text style={s.cellLabel}>{c.label}</Text>
                  <Text style={s.cellScore}>{v || "—"}/4</Text>
                  <Text style={s.cellDesc}>{desc}</Text>
                </View>
              );
            })}
            <Text style={s.totalBar}>
              Total: {total}/{max} ({pct}% · {gradeBand(pct)})
            </Text>
            {sk.observations && (
              <>
                <Text style={s.h2}>Observations</Text>
                <Text>{sk.observations}</Text>
              </>
            )}
          </Page>
        );
      })}
    </Document>
  );
}
```

- [ ] **Step 3: Run smoke tests**

Run: `npm test -- StudentReportPdf`
Expected: all tests pass (rendering certificate + old per-kit pages, no throw).

- [ ] **Step 4: Commit**

```bash
git add src/components/StudentReportPdf.tsx
git commit -m "feat(pdf): certificate cover page with brand mark + overall score"
```

---

## Task 6: ResultsPages — basic grid (single page, no chunking)

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`
- Modify: `src/components/StudentReportPdf.test.tsx`

Build the results table. Replaces the existing per-kit `Page` map in `StudentReportDoc`. No multi-page chunking yet — rows live on a single results page.

- [ ] **Step 1: Add a smoke test for mixed-rubric kits**

Append to `src/components/StudentReportPdf.test.tsx`:

```tsx
it("renders without throwing for kits with mixed rubric shapes", async () => {
  const kitA: ScoredKit = {
    kit: { kitNumber: 3, kitName: "Solar Oven", concept: "Energy", category: "Build" },
    rubric: { criteria: [
      { id: "c1", label: "Observation", c4: "", c3: "", c2: "", c1: "" },
      { id: "c2", label: "Reasoning",   c4: "", c3: "", c2: "", c1: "" },
    ] },
    criterionScores: { c1: 4, c2: 3 },
  };
  const kitB: ScoredKit = {
    kit: { kitNumber: 5, kitName: "Hydraulic Arm", concept: "Pressure", category: "Build" },
    rubric: { criteria: [
      { id: "c2", label: "Reasoning", c4: "", c3: "", c2: "", c1: "" },
      { id: "c3", label: "Build",     c4: "", c3: "", c2: "", c1: "" },
      { id: "c4", label: "Teamwork",  c4: "", c3: "", c2: "", c1: "" },
    ] },
    criterionScores: { c2: 2, c3: 4, c4: 3 },
  };
  const out = await renderToString(
    <StudentReportDoc studentName="Aarav" className="V-B" scored={[kitA, kitB]} />,
  );
  expect(out).toBeTruthy();
});
```

- [ ] **Step 2: Run test to confirm it passes against current code**

Run: `npm test -- StudentReportPdf`
Expected: passes (we haven't broken anything yet).

- [ ] **Step 3: Add results-grid styles**

Add to the `s = StyleSheet.create(...)` block (next to the existing entries; you can drop the old `h1`/`h2`/`meta`/`row`/`cellLabel`/`cellScore`/`cellDesc`/`totalBar` entries when you finish wiring this task — they become unused).

```tsx
// results page
resPage:      { padding: 0, fontSize: 9, fontFamily: "DM Sans" },
resBand:      { backgroundColor: "#0F6E56", paddingHorizontal: 36, paddingVertical: 12,
                flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
resBandTitle: { fontFamily: "DM Serif Display", fontSize: 16, color: "#FFFFFF",
                letterSpacing: 1 },
resBandName:  { fontSize: 10, color: "#FFFFFF", textAlign: "right" },
resBandClass: { fontSize: 8, color: "#E1F5EE", textAlign: "right" },

resBody:      { paddingHorizontal: 36, paddingVertical: 18 },
resHeader:    { flexDirection: "row", borderBottomWidth: 1, borderColor: "#0F1115",
                paddingBottom: 4, marginBottom: 4 },
resHeaderTxt: { fontSize: 8, color: "#5B6470", textTransform: "uppercase",
                letterSpacing: 0.5 },
resRow:       { flexDirection: "row", alignItems: "center", paddingVertical: 6,
                borderBottomWidth: 0.5, borderColor: "#E5E7EB" },
resKit:       { flex: 1, paddingRight: 8 },
resKitNum:    { fontFamily: "DM Serif Display", fontSize: 10, color: "#0F1115" },
resKitName:   { fontSize: 10, color: "#0F1115" },
resCategory:  { width: 60, fontSize: 8, color: "#5B6470", textTransform: "uppercase",
                letterSpacing: 0.5 },
resChipCol:   { width: 28, alignItems: "center" },
resChip:      { width: 22, height: 16, borderRadius: 4, alignItems: "center",
                justifyContent: "center" },
resChipTxt:   { fontSize: 9, fontFamily: "DM Sans" },
resTotal:     { width: 50, textAlign: "right", fontSize: 10, color: "#0F1115" },
resGrade:     { width: 80, textAlign: "right", fontSize: 9 },

resOverall:   { flexDirection: "row", alignItems: "center", paddingVertical: 8,
                borderTopWidth: 1, borderColor: "#0F1115", marginTop: 4 },
resOverallLbl:{ flex: 1, fontFamily: "DM Serif Display", fontSize: 11, color: "#0F1115" },

resLegend:    { marginTop: 24, paddingTop: 12, borderTopWidth: 0.5, borderColor: "#E5E7EB" },
resLegendRow: { flexDirection: "row", justifyContent: "center", marginBottom: 4 },
resLegendDot: { width: 8, height: 8, borderRadius: 2, marginRight: 4, marginLeft: 12 },
resLegendTxt: { fontSize: 8, color: "#5B6470" },
```

- [ ] **Step 4: Add a `ScoreChip` sub-component and `ResultsPages`**

In `src/components/StudentReportPdf.tsx`, add below `CertificatePage`:

```tsx
function ScoreChip({ score }: { score: number }) {
  const cs = chipStyle(score);
  return (
    <View style={[s.resChip, { backgroundColor: cs.backgroundColor }]}>
      <Text style={[s.resChipTxt, { color: cs.color }]}>{score > 0 ? score : "—"}</Text>
    </View>
  );
}

function ResultsHeaderBand({
  studentName,
  className,
}: { studentName: string; className: string }) {
  return (
    <View style={s.resBand}>
      <Text style={s.resBandTitle}>RESULTS</Text>
      <View>
        <Text style={s.resBandName}>{studentName}</Text>
        <Text style={s.resBandClass}>{className}</Text>
      </View>
    </View>
  );
}

function ResultsRow({
  sk,
  criterionUnion,
}: {
  sk: ScoredKit;
  criterionUnion: CriterionRef[];
}) {
  const ownIds = new Set(sk.rubric.criteria.map((c) => c.id));
  const total = totalOf(sk.criterionScores);
  const max = maxScore(sk.rubric.criteria.length);
  const pct = max ? Math.round((total / max) * 100) : 0;
  return (
    <View style={s.resRow} wrap={false}>
      <View style={s.resKit}>
        <Text>
          <Text style={s.resKitNum}>#{sk.kit.kitNumber}  </Text>
          <Text style={s.resKitName}>{sk.kit.kitName}</Text>
        </Text>
      </View>
      <Text style={s.resCategory}>{sk.kit.category}</Text>
      {criterionUnion.map((c) => (
        <View key={c.id} style={s.resChipCol}>
          {ownIds.has(c.id)
            ? <ScoreChip score={sk.criterionScores[c.id] ?? 0} />
            : <Text style={{ color: "#8A93A0", fontSize: 9 }}>—</Text>}
        </View>
      ))}
      <Text style={s.resTotal}>{total}/{max}</Text>
      <Text style={[s.resGrade, { color: chipStyle(Math.ceil(pct / 25)).color }]}>
        {gradeBand(pct)}
      </Text>
    </View>
  );
}

function ResultsPages({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  if (scored.length === 0) {
    return (
      <Page size="A4" style={s.resPage}>
        <ResultsHeaderBand studentName={studentName} className={className} />
        <View style={s.resBody}>
          <Text style={{ color: "#5B6470", fontSize: 10 }}>No kits assessed yet.</Text>
        </View>
      </Page>
    );
  }

  const criterionUnion = buildCriterionUnion(scored);
  const overallTotal = scored.reduce((a, sk) => a + totalOf(sk.criterionScores), 0);
  const overallMax = scored.reduce((a, sk) => a + maxScore(sk.rubric.criteria.length), 0);
  const overallPct = overallMax ? Math.round((overallTotal / overallMax) * 100) : 0;

  return (
    <Page size="A4" style={s.resPage}>
      <ResultsHeaderBand studentName={studentName} className={className} />
      <View style={s.resBody}>
        <View style={s.resHeader}>
          <Text style={[s.resKit, s.resHeaderTxt]}>Kit</Text>
          <Text style={[s.resCategory, s.resHeaderTxt]}>Category</Text>
          {criterionUnion.map((_, i) => (
            <Text key={i} style={[s.resChipCol, s.resHeaderTxt, { textAlign: "center" }]}>
              C{i + 1}
            </Text>
          ))}
          <Text style={[s.resTotal, s.resHeaderTxt]}>Total</Text>
          <Text style={[s.resGrade, s.resHeaderTxt]}>Grade</Text>
        </View>

        {scored.map((sk) => (
          <ResultsRow key={sk.kit.kitNumber} sk={sk} criterionUnion={criterionUnion} />
        ))}

        <View style={s.resOverall}>
          <Text style={s.resOverallLbl}>Overall</Text>
          <Text style={s.resTotal}>{overallTotal}/{overallMax}</Text>
          <Text style={[s.resGrade, { color: "#085041" }]}>
            {overallPct}%  {gradeBand(overallPct)}
          </Text>
        </View>

        <View style={s.resLegend}>
          <View style={s.resLegendRow}>
            <Text style={s.resLegendTxt}>Scores:</Text>
            {[
              { n: 4, label: "Excellent" },
              { n: 3, label: "Good" },
              { n: 2, label: "Developing" },
              { n: 1, label: "Needs support" },
            ].map((d) => (
              <View key={d.n} style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[s.resLegendDot, { backgroundColor: chipStyle(d.n).color }]} />
                <Text style={s.resLegendTxt}>{d.n} {d.label}</Text>
              </View>
            ))}
          </View>
          <View style={s.resLegendRow}>
            <Text style={s.resLegendTxt}>
              Criteria:  {criterionUnion.map((c, i) => `C${i + 1} = ${c.label}`).join("  ·  ")}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
}
```

- [ ] **Step 5: Wire `ResultsPages` into `StudentReportDoc`**

Replace the body of `StudentReportDoc` (the per-kit `Page` map) so the doc is exactly two children: the certificate then the results page.

```tsx
export function StudentReportDoc({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  return (
    <Document>
      <CertificatePage studentName={studentName} className={className} scored={scored} />
      <ResultsPages studentName={studentName} className={className} scored={scored} />
    </Document>
  );
}
```

Drop the now-unused style entries (`h1`, `h2`, `meta`, `row`, `cellLabel`, `cellScore`, `cellDesc`, `totalBar`) from the `StyleSheet.create` call to keep the file tidy.

- [ ] **Step 6: Run smoke tests**

Run: `npm test -- StudentReportPdf`
Expected: all tests pass (zero kits, one kit, mixed-rubric kits, helper tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/StudentReportPdf.tsx src/components/StudentReportPdf.test.tsx
git commit -m "feat(pdf): results grid with color-tinted score chips and legend"
```

---

## Task 7: Multi-page chunking + wide-rubric fallback

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`

Two safety nets from the spec: (1) if rows overflow one page, chunk them; (2) if the criterion union exceeds 8 columns, degrade to a per-kit-total column.

- [ ] **Step 1: Add the chunker + wide-rubric branch**

In `src/components/StudentReportPdf.tsx`, replace `ResultsPages` with:

```tsx
const ROWS_PER_PAGE = 14;
const MAX_CRITERION_COLUMNS = 8;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out.length ? out : [[]];
}

function ResultsPages({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  if (scored.length === 0) {
    return (
      <Page size="A4" style={s.resPage}>
        <ResultsHeaderBand studentName={studentName} className={className} />
        <View style={s.resBody}>
          <Text style={{ color: "#5B6470", fontSize: 10 }}>No kits assessed yet.</Text>
        </View>
      </Page>
    );
  }

  const fullUnion = buildCriterionUnion(scored);
  const wide = fullUnion.length > MAX_CRITERION_COLUMNS;
  const criterionUnion = wide ? [] : fullUnion;

  const overallTotal = scored.reduce((a, sk) => a + totalOf(sk.criterionScores), 0);
  const overallMax = scored.reduce((a, sk) => a + maxScore(sk.rubric.criteria.length), 0);
  const overallPct = overallMax ? Math.round((overallTotal / overallMax) * 100) : 0;
  const pages = chunk(scored, ROWS_PER_PAGE);

  return (
    <>
      {pages.map((rows, pageIdx) => {
        const isLast = pageIdx === pages.length - 1;
        return (
          <Page key={pageIdx} size="A4" style={s.resPage}>
            <ResultsHeaderBand studentName={studentName} className={className} />
            <View style={s.resBody}>
              <View style={s.resHeader}>
                <Text style={[s.resKit, s.resHeaderTxt]}>Kit</Text>
                <Text style={[s.resCategory, s.resHeaderTxt]}>Category</Text>
                {criterionUnion.map((_, i) => (
                  <Text key={i} style={[s.resChipCol, s.resHeaderTxt, { textAlign: "center" }]}>
                    C{i + 1}
                  </Text>
                ))}
                <Text style={[s.resTotal, s.resHeaderTxt]}>Total</Text>
                <Text style={[s.resGrade, s.resHeaderTxt]}>Grade</Text>
              </View>

              {rows.map((sk) => (
                <ResultsRow key={sk.kit.kitNumber} sk={sk} criterionUnion={criterionUnion} />
              ))}

              {isLast && (
                <>
                  <View style={s.resOverall}>
                    <Text style={s.resOverallLbl}>Overall</Text>
                    <Text style={s.resTotal}>{overallTotal}/{overallMax}</Text>
                    <Text style={[s.resGrade, { color: "#085041" }]}>
                      {overallPct}%  {gradeBand(overallPct)}
                    </Text>
                  </View>

                  <View style={s.resLegend}>
                    <View style={s.resLegendRow}>
                      <Text style={s.resLegendTxt}>Scores:</Text>
                      {[
                        { n: 4, label: "Excellent" },
                        { n: 3, label: "Good" },
                        { n: 2, label: "Developing" },
                        { n: 1, label: "Needs support" },
                      ].map((d) => (
                        <View key={d.n} style={{ flexDirection: "row", alignItems: "center" }}>
                          <View style={[s.resLegendDot, { backgroundColor: chipStyle(d.n).color }]} />
                          <Text style={s.resLegendTxt}>{d.n} {d.label}</Text>
                        </View>
                      ))}
                    </View>
                    {!wide && (
                      <View style={s.resLegendRow}>
                        <Text style={s.resLegendTxt}>
                          Criteria:  {criterionUnion.map((c, i) => `C${i + 1} = ${c.label}`).join("  ·  ")}
                        </Text>
                      </View>
                    )}
                    {wide && (
                      <View style={s.resLegendRow}>
                        <Text style={s.resLegendTxt}>
                          Per-criterion detail omitted — rubric exceeds {MAX_CRITERION_COLUMNS} criteria.
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
          </Page>
        );
      })}
    </>
  );
}
```

- [ ] **Step 2: Add a smoke test for an overflowing kit list**

Append to `src/components/StudentReportPdf.test.tsx`:

```tsx
it("renders without throwing for 20 scored kits (multi-page)", async () => {
  const many: ScoredKit[] = Array.from({ length: 20 }, (_, i) => ({
    kit: { kitNumber: i + 1, kitName: `Kit ${i + 1}`, concept: "C", category: "Build" },
    rubric: { criteria: [
      { id: "c1", label: "Observation", c4: "", c3: "", c2: "", c1: "" },
      { id: "c2", label: "Reasoning",   c4: "", c3: "", c2: "", c1: "" },
    ] },
    criterionScores: { c1: 3, c2: 4 },
  }));
  const out = await renderToString(
    <StudentReportDoc studentName="Aarav" className="V-B" scored={many} />,
  );
  expect(out).toBeTruthy();
});
```

- [ ] **Step 3: Run all tests**

Run: `npm test -- StudentReportPdf`
Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/StudentReportPdf.tsx src/components/StudentReportPdf.test.tsx
git commit -m "feat(pdf): multi-page chunking and wide-rubric fallback"
```

---

## Task 8: Visual QA — generate a real PDF and eyeball it

**Files:** none (verification step)

Smoke tests prove the doc renders without throwing — they don't catch visual regressions. This step generates an actual PDF and reviews it.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite logs a local URL (typically `http://localhost:5173`).

- [ ] **Step 2: Open a student report in the browser**

Sign in if required, navigate to a class with at least one scored student, click into a student. The URL is `/class/<classId>/student/<studentId>`.

- [ ] **Step 3: Click "Download PDF" and open the file**

Verify the certificate page:
- Double accent-deep border framing the page.
- "SCIENCEUTSAV · C-STEM" wordmark with horizontal accent rule below.
- "Certificate of Assessment" in serif.
- Student name in serif, upper case, letter-spaced.
- Large accent-color percentage and grade-band label below it.
- "N kits assessed" and "Issued DD MMM YYYY".
- DM Serif Display + DM Sans actually applied (not Helvetica). If the fonts are Helvetica, see Step 5 below.

Verify the results page:
- Accent header band reading "RESULTS" with student name + class on the right in white.
- Table with one row per kit, per-criterion chips tinted by score color.
- Total and grade band per row.
- "Overall" footer row with bold serif label.
- Score legend (4 Excellent / 3 Good / 2 Developing / 1 Needs support) + criterion mapping line.

- [ ] **Step 4: Repeat for an unscored student**

Navigate to a student with no scored kits. Download. Verify:
- Cover replaces the percentage block with "is currently enrolled in the C-STEM program."
- Results page reads "No kits assessed yet."

- [ ] **Step 5: If brand fonts didn't load**

Open browser devtools → Network tab, re-download the PDF, and check requests to `fonts.gstatic.com`. If they 404, refresh the URLs in `Font.register(...)` by:

1. Visiting `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=DM+Serif+Display&display=swap` in the browser.
2. Copying the `.ttf` URLs from the CSS response (look for `src: url(...)` lines).
3. Pasting them into the `Font.register` calls in `src/components/StudentReportPdf.tsx`.
4. Re-running this Visual QA pass.

Don't add error handling for the network failure — the documented fallback is Helvetica, and that's fine if it ever happens in the field.

- [ ] **Step 6: Commit any font-URL refreshes (if needed)**

If you updated font URLs in Step 5:

```bash
git add src/components/StudentReportPdf.tsx
git commit -m "fix(pdf): refresh Google Fonts URLs"
```

If no changes, skip the commit.

---

## Self-Review

After writing this plan I checked the spec against it:

- **Spec §1 Goal (two-page certificate + results, scope = student PDF only):** covered by Tasks 5–7.
- **Spec §2 Visual direction (brand colors, DM fonts):** covered by Task 4 (fonts) and Tasks 5/6 (palette tokens hard-coded — see note below).
- **Spec §3 Certificate page (layout, empty state, overall %):** Task 5 + empty-state branches.
- **Spec §4 Results grid (chips, heterogeneous rubrics, overall row, footer, multi-page, 8-col cap):** Tasks 6 and 7.
- **Spec §5 Components (file structure):** Task 5/6 — no new files, only internal components and helpers as the spec requires.
- **Spec §6 Font registration with Helvetica fallback:** Task 4 (try/catch noted; the existing `@react-pdf/renderer` registration is synchronous and the runtime fall-back happens automatically when fonts fail to load).
- **Spec §7 Tests (3 smoke tests + zero/one/mixed):** zero-kits and one-kit are in Task 1, mixed-rubric is in Task 6, multi-page is an extra in Task 7. Helper tests are in Tasks 2–3.
- **Spec §8 Risks/mitigations:** wide-rubric cap (Task 7), font fallback (Task 4 + Task 8 step 5), `wrap={false}` on each row (Task 6 `ResultsRow`).

**Note on color tokens:** the PDF uses literal hex values rather than reading from CSS custom properties because `@react-pdf/renderer` renders in a separate context with no access to the DOM `:root` variables. The values are pinned to the tokens in [src/index.css](src/index.css) and the spec calls this out as the expected approach.

**Placeholder scan:** no TBDs, no "implement later", every code step has the actual code. The note about possibly-stale font URLs is bounded with an explicit fallback (Helvetica) and an explicit refresh procedure (Task 8 Step 5).

**Type consistency:** `CriterionRef`, `ChipStyle`, `ScoredKit`, `__test` exports are referenced consistently across tasks 2, 3, 6, 7.
