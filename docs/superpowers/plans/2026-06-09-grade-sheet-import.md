# Grade Sheet Export / CSV Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let an admin export a multi-tab .xlsx grade workbook for a class (one tab per kit, pre-filled with students + rubric columns + existing marks), and later import a filled-in per-(class, kit) CSV back into the `scores` table with a preview/confirm step.

**Architecture:** All interpretation/validation of an uploaded grid happens server-side in pure, unit-tested functions (`convex/lib/gradeSheet.ts`) that take plain data and return diffs + errors. Convex functions (`scores.exportClassGrades`, `scores.validateImport`, `scores.applyImport`) load DB rows and delegate to those pure functions. The client parses CSV (`src/lib/csv.ts`), builds the workbook (`src/lib/gradeWorkbook.ts` via `write-excel-file`), and drives a single admin page (`src/pages/AdminGrades.tsx`).

**Tech Stack:** Convex, React 19, react-router 7, Tailwind 4, vitest, `write-excel-file` (new dep, export side only).

**Spec:** `docs/superpowers/specs/2026-06-09-grade-sheet-import-design.md`

---

## File structure

- Create `src/lib/csv.ts` — `parseCsv(text): string[][]` (RFC-4180-ish: quoted fields, embedded commas/newlines, `""` escapes). Client-side parse only.
- Create `convex/lib/gradeSheet.ts` — pure, no DB. Column constants, criterion-header build/parse, `readGridTarget`, `buildImportPlan`, and shared types. Imported by `convex/scores.ts` and by tests.
- Modify `convex/scores.ts` — add `exportClassGrades` (query), `validateImport` (query), `applyImport` (mutation).
- Modify `convex/classes.ts` — add `listAllForAdmin` (query).
- Create `src/lib/gradeWorkbook.ts` — `sheetsForExport(data)` (pure, tested) + `buildWorkbookBlob(data)` (thin `write-excel-file` wrapper).
- Create `src/pages/AdminGrades.tsx` — admin page: export section (pick class → download workbook) + import section (upload CSV → preview → apply).
- Modify `src/App.tsx` — add `/admin/grades` route under `AdminRoute`.
- Modify `src/pages/AdminDashboard.tsx` — add a header link to `/admin/grades`.
- Modify `package.json` — add `write-excel-file`.

## Shared data contracts (used across tasks)

```ts
// convex/lib/gradeSheet.ts
export type Grid = string[][]; // row 0 = header, rows 1.. = data

// Fixed leading columns (by index)
export const COL = { classId: 0, kitId: 1, studentId: 2, rollNo: 3, name: 4, absent: 5 } as const;
export const FIXED_LEADING = 6; // number of fixed columns before criterion columns
// Criterion columns occupy indices FIXED_LEADING .. (lastIndex-1); the LAST column is observations.

export type RubricCriterion = { id: string; label: string };

export type ExistingScore = {
  criterionScores: Record<string, number>;
  absent?: boolean;
  observations?: string;
};

export type StudentLite = { _id: string; name: string; rollNo?: string };

export type MarkChange = { criterionId: string; label: string; from: number | null; to: number };

export type ImportDiff = {
  studentId: string;
  name: string;
  rollNo?: string;
  markChanges: MarkChange[];
  absentChange?: { from: boolean; to: boolean };
  observationChange?: { from: string; to: string };
};

export type ImportError = { row: number; studentId?: string; reason: string };

export type ImportPlan = { diffs: ImportDiff[]; errors: ImportError[] };
```

---

## Task 1: CSV parser

**Files:**
- Create: `src/lib/csv.ts`
- Test: `src/lib/csv.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/csv.test.ts
import { describe, it, expect } from "vitest";
import { parseCsv } from "./csv";

describe("parseCsv", () => {
  it("parses simple rows", () => {
    expect(parseCsv("a,b,c\n1,2,3")).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
    ]);
  });

  it("handles quoted fields with commas", () => {
    expect(parseCsv('name,note\n"Doe, Jane","hi, there"')).toEqual([
      ["name", "note"],
      ["Doe, Jane", "hi, there"],
    ]);
  });

  it("handles escaped quotes and embedded newlines", () => {
    expect(parseCsv('a\n"line1\nline2","say ""hi"""')).toEqual([
      ["a"],
      ["line1\nline2", 'say "hi"'],
    ]);
  });

  it("handles CRLF line endings and a trailing newline", () => {
    expect(parseCsv("a,b\r\n1,2\r\n")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });

  it("returns [] for empty input", () => {
    expect(parseCsv("")).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/csv.test.ts`
Expected: FAIL — `parseCsv` is not defined.

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/csv.ts
// Minimal RFC-4180-style CSV parser. Returns rows of string cells.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const n = text.length;
  let sawAny = false;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < n) {
    const c = text[i];
    sawAny = true;
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      endField();
      i++;
      continue;
    }
    if (c === "\r") {
      // swallow; \n (or end) closes the row
      i++;
      continue;
    }
    if (c === "\n") {
      endRow();
      i++;
      continue;
    }
    field += c;
    i++;
  }

  // Flush the final field/row unless the input ended exactly on a row break
  // (i.e. field empty AND row empty AND the last char was a newline).
  const endedOnNewline = n > 0 && (text[n - 1] === "\n" || text[n - 1] === "\r");
  if (field !== "" || row.length > 0 || (sawAny && !endedOnNewline)) {
    endRow();
  }
  return rows;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/csv.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/csv.ts src/lib/csv.test.ts
git commit -m "feat: add CSV parser util"
```

---

## Task 2: Criterion-header build/parse + grid target reader

**Files:**
- Create: `convex/lib/gradeSheet.ts`
- Test: `convex/lib/gradeSheet.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// convex/lib/gradeSheet.test.ts
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
      error: "File mixes multiple classes or kits — import one kit's tab at a time.",
    });
  });

  it("errors when there are no data rows", () => {
    expect(readGridTarget([header])).toEqual({ error: "No student rows found in the file." });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run convex/lib/gradeSheet.test.ts`
Expected: FAIL — module/exports not defined.

- [ ] **Step 3: Write the implementation**

```ts
// convex/lib/gradeSheet.ts
export type Grid = string[][];

export const COL = { classId: 0, kitId: 1, studentId: 2, rollNo: 3, name: 4, absent: 5 } as const;
export const FIXED_LEADING = 6;

export type RubricCriterion = { id: string; label: string };
export type ExistingScore = {
  criterionScores: Record<string, number>;
  absent?: boolean;
  observations?: string;
};
export type StudentLite = { _id: string; name: string; rollNo?: string };
export type MarkChange = { criterionId: string; label: string; from: number | null; to: number };
export type ImportDiff = {
  studentId: string;
  name: string;
  rollNo?: string;
  markChanges: MarkChange[];
  absentChange?: { from: boolean; to: boolean };
  observationChange?: { from: string; to: string };
};
export type ImportError = { row: number; studentId?: string; reason: string };
export type ImportPlan = { diffs: ImportDiff[]; errors: ImportError[] };

const ID_RE = /⟨([^⟩]+)⟩\s*$/;

export function makeCriterionHeader(label: string, id: string): string {
  return `${label} ⟨${id}⟩`;
}

export function parseCriterionId(header: string): string | null {
  const m = header.match(ID_RE);
  return m ? m[1] : null;
}

export function readGridTarget(
  grid: Grid,
): { classId: string; kitId: string } | { error: string } {
  const rows = grid.slice(1);
  if (rows.length === 0) return { error: "No student rows found in the file." };
  const classId = rows[0][COL.classId];
  const kitId = rows[0][COL.kitId];
  for (const r of rows) {
    if (r[COL.classId] !== classId || r[COL.kitId] !== kitId) {
      return {
        error: "File mixes multiple classes or kits — import one kit's tab at a time.",
      };
    }
  }
  return { classId, kitId };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run convex/lib/gradeSheet.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add convex/lib/gradeSheet.ts convex/lib/gradeSheet.test.ts
git commit -m "feat: grade sheet header + grid target helpers"
```

---

## Task 3: `buildImportPlan` — criterion column resolution + structural check

**Files:**
- Modify: `convex/lib/gradeSheet.ts`
- Test: `convex/lib/gradeSheet.test.ts`

- [ ] **Step 1: Write the failing test (append to the existing test file)**

```ts
// append to convex/lib/gradeSheet.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run convex/lib/gradeSheet.test.ts`
Expected: FAIL — `buildImportPlan` not defined.

- [ ] **Step 3: Write the implementation (append to `convex/lib/gradeSheet.ts`)**

```ts
// append to convex/lib/gradeSheet.ts

// Resolve the criterion column indices against the rubric. Returns either an
// ordered [{ colIndex, criterion }] list or a structural error string.
function resolveCriterionColumns(
  header: string[],
  criteria: RubricCriterion[],
): { cols: { colIndex: number; criterion: RubricCriterion }[] } | { error: string } {
  const lastIndex = header.length - 1; // observations
  const critHeaders = header.slice(FIXED_LEADING, lastIndex);
  const structuralError = {
    error:
      "Criterion columns do not match this kit's rubric — re-export a fresh workbook and copy the marks across.",
  };
  if (critHeaders.length !== criteria.length) return structuralError;

  // Prefer id-token matching; fall back to positional alignment.
  const byId = new Map(criteria.map((c) => [c.id, c]));
  const ids = critHeaders.map(parseCriterionId);
  if (ids.every((id) => id !== null && byId.has(id))) {
    const seen = new Set<string>();
    const cols = critHeaders.map((_, i) => {
      const id = ids[i]!;
      seen.add(id);
      return { colIndex: FIXED_LEADING + i, criterion: byId.get(id)! };
    });
    if (seen.size !== criteria.length) return structuralError;
    return { cols };
  }
  // Positional fallback (headers may have lost their id tokens).
  const cols = criteria.map((criterion, i) => ({ colIndex: FIXED_LEADING + i, criterion }));
  return { cols };
}

export function buildImportPlan(
  criteria: RubricCriterion[],
  students: StudentLite[],
  existing: Record<string, ExistingScore>,
  grid: Grid,
): ImportPlan {
  const header = grid[0] ?? [];
  const resolved = resolveCriterionColumns(header, criteria);
  if ("error" in resolved) return { diffs: [], errors: [{ row: 0, reason: resolved.error }] };

  const studentById = new Map(students.map((s) => [s._id, s]));
  const obsIndex = header.length - 1;
  const diffs: ImportDiff[] = [];
  const errors: ImportError[] = [];

  for (let r = 1; r < grid.length; r++) {
    const rowNum = r + 1; // 1-based, matching spreadsheet row numbers
    const row = grid[r];
    const studentId = (row[COL.studentId] ?? "").trim();
    const student = studentById.get(studentId);
    if (!student) {
      errors.push({ row: rowNum, studentId, reason: "Unknown student — not in this class." });
      continue;
    }
    const prev = existing[studentId] ?? { criterionScores: {} };

    let rowHadError = false;
    const markChanges: MarkChange[] = [];
    for (const { colIndex, criterion } of resolved.cols) {
      const raw = (row[colIndex] ?? "").trim();
      if (raw === "") continue; // blank = no change
      const val = Number(raw);
      if (!Number.isInteger(val) || val < 1 || val > 4) {
        errors.push({
          row: rowNum,
          studentId,
          reason: `"${criterion.label}" must be 1-4 (got "${raw}").`,
        });
        rowHadError = true;
        continue;
      }
      const from = prev.criterionScores[criterion.id] ?? null;
      if (from !== val) {
        markChanges.push({ criterionId: criterion.id, label: criterion.label, from, to: val });
      }
    }

    let absentChange: ImportDiff["absentChange"];
    const absentRaw = (row[COL.absent] ?? "").trim().toLowerCase();
    if (absentRaw !== "") {
      const truthy = ["x", "yes", "true", "1"];
      const falsy = ["no", "false", "0"];
      let next: boolean | null = null;
      if (truthy.includes(absentRaw)) next = true;
      else if (falsy.includes(absentRaw)) next = false;
      if (next === null) {
        errors.push({ row: rowNum, studentId, reason: `Absent must be "x" or blank (got "${absentRaw}").` });
        rowHadError = true;
      } else {
        const fromAbsent = prev.absent ?? false;
        if (fromAbsent !== next) absentChange = { from: fromAbsent, to: next };
      }
    }

    let observationChange: ImportDiff["observationChange"];
    const obsRaw = (row[obsIndex] ?? "").trim();
    if (obsRaw !== "") {
      const fromObs = prev.observations ?? "";
      if (fromObs !== obsRaw) observationChange = { from: fromObs, to: obsRaw };
    }

    if (rowHadError) continue;
    if (markChanges.length > 0 || absentChange || observationChange) {
      diffs.push({
        studentId,
        name: student.name,
        rollNo: student.rollNo,
        markChanges,
        absentChange,
        observationChange,
      });
    }
  }

  return { diffs, errors };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run convex/lib/gradeSheet.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add convex/lib/gradeSheet.ts convex/lib/gradeSheet.test.ts
git commit -m "feat: buildImportPlan with criterion column resolution"
```

---

## Task 4: `buildImportPlan` — diff behavior coverage

**Files:**
- Test: `convex/lib/gradeSheet.test.ts`

- [ ] **Step 1: Write the failing tests (append)**

```ts
// append to convex/lib/gradeSheet.test.ts
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
```

- [ ] **Step 2: Run tests to verify they pass (logic already implemented in Task 3)**

Run: `npx vitest run convex/lib/gradeSheet.test.ts`
Expected: PASS. If any fail, fix `buildImportPlan` in `convex/lib/gradeSheet.ts` until green — do not change the tests' expected behavior (it encodes the spec).

- [ ] **Step 3: Commit**

```bash
git add convex/lib/gradeSheet.test.ts convex/lib/gradeSheet.ts
git commit -m "test: cover buildImportPlan diff behavior"
```

---

## Task 5: `classes.listAllForAdmin` query

**Files:**
- Modify: `convex/classes.ts`

- [ ] **Step 1: Add the query**

Add to `convex/classes.ts` (import `requireAdmin` alongside the existing access imports):

```ts
import { requireOwnsClass, requireTeacher, requireAdmin } from "./lib/access";

// ... existing functions ...

export const listAllForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const classes = await ctx.db.query("classes").collect();
    return await Promise.all(
      classes.map(async (cls) => {
        const teacher = await ctx.db.get(cls.teacherProfileId);
        return { ...cls, teacherName: teacher?.displayName ?? "—" };
      }),
    );
  },
});
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add convex/classes.ts
git commit -m "feat: listAllForAdmin classes query"
```

---

## Task 6: `scores.exportClassGrades` query

**Files:**
- Modify: `convex/scores.ts`

- [ ] **Step 1: Add the query**

Add to `convex/scores.ts` (add `requireAdmin` to the access import line):

```ts
import { requireOwnsClass, requireAdmin } from "./lib/access";

// ... existing functions ...

export const exportClassGrades = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, { classId }) => {
    await requireAdmin(ctx);
    const cls = await ctx.db.get(classId);
    if (!cls) throw new Error("Class not found");

    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    students.sort((a, b) => {
      const ra = a.rollNo, rb = b.rollNo;
      if (ra && rb) return ra.localeCompare(rb, undefined, { numeric: true });
      if (ra) return -1;
      if (rb) return 1;
      return a.name.localeCompare(b.name);
    });

    const links = await ctx.db
      .query("classKits")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    links.sort((a, b) => a.order - b.order);

    const kits = await Promise.all(
      links.map(async (link) => {
        const kit = await ctx.db.get(link.kitId);
        if (!kit) return null;
        const rubric = await ctx.db
          .query("rubrics")
          .withIndex("by_kit", (q) => q.eq("kitId", link.kitId))
          .unique();
        const scoreRows = await Promise.all(
          students.map(async (s) => {
            const score = await ctx.db
              .query("scores")
              .withIndex("by_student_and_kit", (q) =>
                q.eq("studentId", s._id).eq("kitId", link.kitId),
              )
              .unique();
            return {
              studentId: s._id,
              criterionScores: score?.criterionScores ?? {},
              absent: score?.absent ?? false,
              observations: score?.observations ?? "",
            };
          }),
        );
        return {
          kitId: link.kitId,
          kitNumber: kit.kitNumber,
          kitName: kit.kitName,
          category: kit.category,
          criteria: (rubric?.criteria ?? []).map((c) => ({ id: c.id, label: c.label })),
          scores: scoreRows,
        };
      }),
    );

    return {
      classId,
      className: cls.name,
      students: students.map((s) => ({ _id: s._id, name: s.name, rollNo: s.rollNo })),
      kits: kits.filter((k): k is NonNullable<typeof k> => k !== null),
    };
  },
});
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add convex/scores.ts
git commit -m "feat: exportClassGrades query"
```

---

## Task 7: `scores.validateImport` + `scores.applyImport`

**Files:**
- Modify: `convex/scores.ts`

- [ ] **Step 1: Add a shared loader helper and the two functions**

Add to `convex/scores.ts` (import the pure module at the top):

```ts
import {
  readGridTarget,
  buildImportPlan,
  type Grid,
  type ExistingScore,
} from "./lib/gradeSheet";

// Loads the class/kit/rubric/students/existing-scores referenced by a grid and
// runs the pure planner. Shared by validateImport and applyImport.
async function planFromGrid(ctx: QueryCtx | MutationCtx, grid: Grid) {
  const target = readGridTarget(grid);
  if ("error" in target) throw new Error(target.error);
  const classId = target.classId as Id<"classes">;
  const kitId = target.kitId as Id<"kits">;

  const cls = await ctx.db.get(classId);
  if (!cls) throw new Error("Class not found");
  const kit = await ctx.db.get(kitId);
  if (!kit) throw new Error("Kit not found");

  const link = await ctx.db
    .query("classKits")
    .withIndex("by_class_and_kit", (q) => q.eq("classId", classId).eq("kitId", kitId))
    .unique();
  if (!link) throw new Error("This kit is not in the class's curriculum — add it first.");

  const rubric = await ctx.db
    .query("rubrics")
    .withIndex("by_kit", (q) => q.eq("kitId", kitId))
    .unique();
  const criteria = (rubric?.criteria ?? []).map((c) => ({ id: c.id, label: c.label }));

  const students = await ctx.db
    .query("students")
    .withIndex("by_class", (q) => q.eq("classId", classId))
    .collect();

  const existing: Record<string, ExistingScore> = {};
  for (const s of students) {
    const score = await ctx.db
      .query("scores")
      .withIndex("by_student_and_kit", (q) => q.eq("studentId", s._id).eq("kitId", kitId))
      .unique();
    if (score) {
      existing[s._id] = {
        criterionScores: score.criterionScores,
        absent: score.absent,
        observations: score.observations,
      };
    }
  }

  const plan = buildImportPlan(
    criteria,
    students.map((s) => ({ _id: s._id, name: s.name, rollNo: s.rollNo })),
    existing,
    grid,
  );
  return { classId, kitId, className: cls.name, kitName: kit.kitName, plan, existing };
}

export const validateImport = query({
  args: { grid: v.array(v.array(v.string())) },
  handler: async (ctx, { grid }) => {
    await requireAdmin(ctx);
    const { className, kitName, plan } = await planFromGrid(ctx, grid as Grid);
    return { className, kitName, diffs: plan.diffs, errors: plan.errors };
  },
});

export const applyImport = mutation({
  args: { grid: v.array(v.array(v.string())) },
  handler: async (ctx, { grid }) => {
    const profile = await requireAdmin(ctx);
    const { kitId, plan, existing } = await planFromGrid(ctx, grid as Grid);
    const updatedAt = Date.now();

    for (const diff of plan.diffs) {
      const studentId = diff.studentId as Id<"students">;
      const prev = existing[studentId] ?? { criterionScores: {} };
      const criterionScores = { ...prev.criterionScores };
      for (const mc of diff.markChanges) criterionScores[mc.criterionId] = mc.to;
      const absent = diff.absentChange ? diff.absentChange.to : prev.absent;
      const observations = diff.observationChange ? diff.observationChange.to : prev.observations;

      const existingRow = await ctx.db
        .query("scores")
        .withIndex("by_student_and_kit", (q) => q.eq("studentId", studentId).eq("kitId", kitId))
        .unique();
      const patch = {
        criterionScores,
        absent,
        observations,
        scoredByProfileId: profile._id,
        updatedAt,
      };
      if (existingRow) await ctx.db.patch(existingRow._id, patch);
      else await ctx.db.insert("scores", { studentId, kitId, ...patch });
    }

    return { applied: plan.diffs.length, skipped: plan.errors.length };
  },
});
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc -b --noEmit`
Expected: no errors. (`QueryCtx`/`MutationCtx`/`Id` are already imported at the top of `convex/scores.ts`.)

- [ ] **Step 3: Manual smoke test against the dev backend**

Run: `npx convex dev --once` (pushes functions). Expected: deploys with no errors.

- [ ] **Step 4: Commit**

```bash
git add convex/scores.ts
git commit -m "feat: validateImport and applyImport mutations"
```

---

## Task 8: Add `write-excel-file` dependency

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install**

Run: `npm install write-excel-file`
Expected: adds `write-excel-file` to `dependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add write-excel-file dependency"
```

---

## Task 9: Workbook builder — pure sheet shaping

**Files:**
- Create: `src/lib/gradeWorkbook.ts`
- Test: `src/lib/gradeWorkbook.test.ts`

The export query returns `{ classId, className, students, kits }`. Each sheet (one per kit) is a 2-D array of cell objects. We test the *shaping* (header row + a sample data row), not the xlsx bytes.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/gradeWorkbook.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/gradeWorkbook.test.ts`
Expected: FAIL — module not defined.

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/gradeWorkbook.ts
import writeXlsxFile from "write-excel-file";
import { makeCriterionHeader } from "../../convex/lib/gradeSheet";

export type ExportKit = {
  kitId: string;
  kitNumber: number;
  kitName: string;
  category: string;
  criteria: { id: string; label: string }[];
  scores: {
    studentId: string;
    criterionScores: Record<string, number>;
    absent: boolean;
    observations: string;
  }[];
};

export type ExportData = {
  classId: string;
  className: string;
  students: { _id: string; name: string; rollNo?: string }[];
  kits: ExportKit[];
};

// write-excel-file cell objects. `null` = empty cell.
type Cell = { value: string | number | null; type?: typeof String | typeof Number; readOnly?: boolean };

function sheetName(kit: ExportKit): string {
  const raw = `#${kit.kitNumber} ${kit.kitName}`;
  // Excel sheet names: max 31 chars, no : \ / ? * [ ]
  return raw.replace(/[:\\/?*[\]]/g, "").slice(0, 31);
}

export function sheetsForExport(data: ExportData): { sheets: Cell[][][]; names: string[] } {
  const names: string[] = [];
  const sheets: Cell[][][] = [];

  for (const kit of data.kits) {
    names.push(sheetName(kit));
    const scoreByStudent = new Map(kit.scores.map((s) => [s.studentId, s]));

    const header: Cell[] = [
      { value: "class_id" },
      { value: "kit_id" },
      { value: "student_id" },
      { value: "roll_no" },
      { value: "name" },
      { value: "absent" },
      ...kit.criteria.map((c) => ({ value: makeCriterionHeader(c.label, c.id) })),
      { value: "observations" },
    ];

    const rows: Cell[][] = data.students.map((s) => {
      const sc = scoreByStudent.get(s._id);
      const markCells: Cell[] = kit.criteria.map((c) => {
        const v = sc?.criterionScores[c.id];
        return { value: typeof v === "number" ? v : null, type: Number };
      });
      return [
        { value: data.classId, readOnly: true },
        { value: kit.kitId, readOnly: true },
        { value: s._id, readOnly: true },
        { value: s.rollNo ?? null },
        { value: s.name },
        { value: sc?.absent ? "x" : "" },
        ...markCells,
        { value: sc?.observations ? sc.observations : null },
      ];
    });

    sheets.push([header, ...rows]);
  }

  return { sheets, names };
}

export async function buildWorkbookBlob(data: ExportData): Promise<Blob> {
  const { sheets, names } = sheetsForExport(data);
  // write-excel-file (browser) returns a Blob when no fileName is given.
  // Multi-sheet: pass an array of sheet datas + matching `sheets` names.
  const blob = await writeXlsxFile(sheets, { sheets: names });
  return blob as Blob;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/gradeWorkbook.test.ts`
Expected: PASS. (Only `sheetsForExport` is exercised; `buildWorkbookBlob` is verified manually in Task 11.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/gradeWorkbook.ts src/lib/gradeWorkbook.test.ts
git commit -m "feat: grade workbook sheet shaping"
```

> **Note for the engineer:** `write-excel-file`'s browser entry and multi-sheet/blob signature should be confirmed against the installed version's README during Task 11. If `writeXlsxFile(sheets, { sheets: names })` does not return a Blob in the browser build, adjust `buildWorkbookBlob` only (the pure `sheetsForExport` and its tests stay unchanged). The import path: `import writeXlsxFile from "write-excel-file"` may need to be `"write-excel-file/browser"` depending on the version.

---

## Task 10: Admin grades page (export + import UI)

**Files:**
- Create: `src/pages/AdminGrades.tsx`
- Modify: `src/App.tsx`, `src/pages/AdminDashboard.tsx`

- [ ] **Step 1: Create the page**

```tsx
// src/pages/AdminGrades.tsx
import { useState } from "react";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Download, Upload } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { parseCsv } from "../lib/csv";
import { buildWorkbookBlob } from "../lib/gradeWorkbook";
import { downloadBlob, sanitizeFilename } from "../lib/buildReportZip";

type Preview = {
  className: string;
  kitName: string;
  diffs: {
    studentId: string;
    name: string;
    rollNo?: string;
    markChanges: { criterionId: string; label: string; from: number | null; to: number }[];
    absentChange?: { from: boolean; to: boolean };
    observationChange?: { from: string; to: string };
  }[];
  errors: { row: number; studentId?: string; reason: string }[];
};

export default function AdminGrades() {
  const convex = useConvex();
  const classes = useQuery(api.classes.listAllForAdmin);
  const applyImport = useMutation(api.scores.applyImport);

  const [exportClassId, setExportClassId] = useState<string>("");
  const [exporting, setExporting] = useState(false);

  const [grid, setGrid] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function doExport() {
    if (!exportClassId) return;
    setExporting(true);
    setError(null);
    try {
      const data = await convex.query(api.scores.exportClassGrades, {
        classId: exportClassId as Id<"classes">,
      });
      const blob = await buildWorkbookBlob(data);
      downloadBlob(blob, `${sanitizeFilename(data.className)}_grades.xlsx`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPreview(null);
    setDone(null);
    setError(null);
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    const parsed = parseCsv(text);
    setGrid(parsed);
    setBusy(true);
    try {
      const result = await convex.query(api.scores.validateImport, { grid: parsed });
      setPreview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this file");
    } finally {
      setBusy(false);
    }
  }

  async function onApply() {
    if (!grid) return;
    setBusy(true);
    setError(null);
    try {
      const res = await applyImport({ grid });
      setDone(`Imported ${res.applied} student${res.applied === 1 ? "" : "s"}; skipped ${res.skipped}.`);
      setPreview(null);
      setGrid(null);
      setFileName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Grade sheets"
        description="Export a class workbook for offline marking, then import the filled-in CSV."
        backTo="/admin"
        backLabel="Back to admin"
      />

      <Card className="mb-6">
        <CardHeader title="Export workbook" description="One tab per kit, pre-filled with students and any existing marks." />
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={exportClassId}
              onChange={(e) => setExportClassId(e.target.value)}
              className="flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="">Select a class…</option>
              {classes?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} · {c.academicYear} ({c.teacherName})
                </option>
              ))}
            </select>
            <Button onClick={doExport} disabled={!exportClassId || exporting}>
              <Download className="w-4 h-4" />
              {exporting ? "Preparing…" : "Download workbook"}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Import marks (CSV)" description="Download one kit's tab as CSV from Google Sheets, then upload it here." />
        <CardBody>
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-accent hover:underline">
            <Upload className="w-4 h-4" />
            <span>{fileName || "Choose a CSV file"}</span>
            <input type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
          </label>

          {busy && <p className="mt-3 text-sm text-ink-muted">Working…</p>}
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
          {done && <p className="mt-3 text-sm text-good">{done}</p>}

          {preview && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{preview.className}</span> · {preview.kitName}
              </p>

              {preview.errors.length > 0 && (
                <div className="rounded-lg border border-danger/40 bg-danger/5 p-3">
                  <p className="text-xs font-medium text-danger mb-1">
                    {preview.errors.length} row(s) will be skipped:
                  </p>
                  <ul className="text-xs text-ink-muted list-disc pl-4 space-y-0.5">
                    {preview.errors.map((er, i) => (
                      <li key={i}>Row {er.row}: {er.reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {preview.diffs.length === 0 ? (
                <p className="text-sm text-ink-muted">No changes detected.</p>
              ) : (
                <ul className="divide-y divide-line/60 border border-line/60 rounded-lg">
                  {preview.diffs.map((d) => (
                    <li key={d.studentId} className="px-4 py-2 text-sm">
                      <div className="font-medium text-ink">
                        {d.name}{d.rollNo ? ` · ${d.rollNo}` : ""}
                      </div>
                      <div className="text-xs text-ink-muted">
                        {d.markChanges.map((m) => (
                          <span key={m.criterionId} className="mr-3">
                            {m.label}: {m.from ?? "—"} → {m.to}
                          </span>
                        ))}
                        {d.absentChange && <span className="mr-3">Absent: {String(d.absentChange.to)}</span>}
                        {d.observationChange && <span className="mr-3">Observations updated</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <Button onClick={onApply} disabled={busy || preview.diffs.length === 0}>
                Apply {preview.diffs.length} change{preview.diffs.length === 1 ? "" : "s"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
```

- [ ] **Step 2: Add the route in `src/App.tsx`**

Add the import near the other admin page imports:

```tsx
import AdminGrades from "./pages/AdminGrades";
```

Add the route inside the `<Route element={<AdminRoute />}>` block:

```tsx
<Route path="/admin/grades" element={<AdminGrades />} />
```

- [ ] **Step 3: Add a nav link in `src/pages/AdminDashboard.tsx`**

In the `PageHeader` `actions` block (next to the existing `<Link to="/admin/kits">`), add:

```tsx
<Link to="/admin/grades">
  <Button variant="secondary">Grade sheets</Button>
</Link>
```

- [ ] **Step 4: Verify build + types**

Run: `npx tsc -b --noEmit && npm run build`
Expected: no type errors; Vite build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/pages/AdminGrades.tsx src/App.tsx src/pages/AdminDashboard.tsx
git commit -m "feat: admin grade sheet export/import page"
```

---

## Task 11: End-to-end manual verification

**Files:** none (manual)

- [ ] **Step 1: Run the app**

Run: `npm run dev` (and `npx convex dev` in a second terminal if not already running).

- [ ] **Step 2: Export round-trip**

As an admin: open **Grade sheets**, pick a class with ≥1 kit and ≥2 students, click **Download workbook**. Open the `.xlsx` (Excel/Google Sheets) and confirm: one tab per curriculum kit; header row with `class_id`/`kit_id`/`student_id`/criterion columns (`Label ⟨id⟩`)/`observations`; existing marks pre-filled. If the file fails to open or `buildWorkbookBlob` throws, fix the `write-excel-file` call per the note in Task 9 (adjust only `buildWorkbookBlob`).

- [ ] **Step 3: Import round-trip**

In one tab, enter some 1-4 marks, an `x` in `absent` for one student, and an observation. Download that tab as CSV. Back in **Grade sheets → Import marks**, upload the CSV. Confirm the preview shows the expected changes and that any tampered/out-of-range rows appear under "skipped". Click **Apply**.

- [ ] **Step 4: Confirm persistence**

Open the in-app score sheet for that class+kit (`/class/:classId/kit/:kitId/score`) and confirm the imported marks/absent/observations are present. Re-import the same unchanged CSV and confirm the preview reports **No changes detected** (blank = no change; equal marks = no diff).

- [ ] **Step 5: Final full test + lint**

Run: `npm test && npm run lint`
Expected: all tests pass; lint clean.

---

## Self-review notes

- **Spec coverage:** export workbook (Tasks 6, 9, 10) · one tab per kit (Task 9) · self-describing file with baked ids (Tasks 2, 9) · criterion-id-in-header + positional fallback (Tasks 2, 3) · blank = no change for marks/absent/observations (Tasks 3, 4) · preview + confirm, overwrite on apply (Tasks 7, 10) · admin-only (Tasks 5, 6, 7 via `requireAdmin`) · kit-in-curriculum check (Task 7) · admin attribution (Task 7, `scoredByProfileId = profile._id`) · validation/rejection rules (Tasks 3, 7) · `write-excel-file` dep (Task 8) · CSV parser, no heavy dep (Task 1) · tests for pure logic (Tasks 1–4, 9).
- **Type consistency:** `Grid`, `ImportDiff`, `ExistingScore`, `RubricCriterion`, `MarkChange` defined in Task 2/3 and reused verbatim in Tasks 7, 9, 10. `exportClassGrades` return shape (Task 6) matches `ExportData` (Task 9). `validateImport`/`applyImport` take `{ grid }` and the page sends `grid` (Task 10).
- **Known follow-up flagged to user:** imported scores are attributed to the importing admin, not the teacher.
```
