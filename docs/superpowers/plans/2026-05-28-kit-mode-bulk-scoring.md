# Kit-mode Bulk Scoring + Per-Student PDFs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a per-criterion bulk scoring page so a teacher can score a whole class for one kit in under 5 minutes, and add per-student PDF downloads (ZIP + per-row share) so each parent can receive their own child's report card.

**Architecture:** New `KitScoreSheet` page mounted at `/class/:classId/kit/:kitId/score?c=N`. Vertical roster (one student per row) with five action buttons (1, 2, 3, 4, ✕ absent). Per-tap optimistic updates with 250ms confirmation flash before auto-advancing focus. New Convex mutations `setCriterion` and `setAbsent` write a single field each so rapid taps don't race. A new `absent: optional<boolean>` field on the `scores` table flows through totals, both PDF templates, and report read paths. `ClassReport` gains a ZIP-of-PDFs button (via `jszip`) and a per-row Share button (Web Share API with files, falling back to download + WhatsApp Web).

**Tech Stack:** React 19, react-router-dom 7, Convex 1.39, `@react-pdf/renderer` 4.5, `jszip` ^3.10 (new), TypeScript, Vitest (jsdom).

**Spec:** [docs/superpowers/specs/2026-05-28-kit-mode-bulk-scoring-design.md](../specs/2026-05-28-kit-mode-bulk-scoring-design.md)

---

## File Structure

**Modify:**
- `convex/schema.ts` — add `absent` to `scores`
- `convex/scores.ts` — add `setCriterion`, `setAbsent`, `listForClassAndKit`
- `src/lib/totals.ts` — `isResolved` helper, `scoredCount` honors absent
- `src/components/StudentReportPdf.tsx` — render "Absent" state per kit page
- `src/components/ClassReportPdf.tsx` — render "Absent" in row
- `src/pages/StudentReport.tsx` — pass `absent` through; add Share button
- `src/pages/ClassReport.tsx` — ZIP button + per-row Share button
- `src/pages/ClassDetail.tsx` — "Score class →" button per kit row; remove per-student inline "Score X" links
- `src/App.tsx` — new route for `KitScoreSheet`
- `package.json` — add `jszip`

**Create:**
- `src/pages/KitScoreSheet.tsx` — the bulk-scoring page
- `src/components/CriterionHeader.tsx` — sticky criterion descriptors + prev/next
- `src/components/BulkScoreRow.tsx` — single student row in the roster
- `src/lib/shareReportCard.ts` — Web Share API + WhatsApp fallback
- `src/lib/buildReportZip.ts` — JSZip helper for per-student PDF bundle
- `src/lib/totals.test.ts` — unit tests for absent handling
- `src/lib/shareReportCard.test.ts` — fallback behavior
- `src/lib/buildReportZip.test.ts` — zip contents
- `src/components/BulkScoreRow.test.tsx` — row interaction + a11y
- `src/components/CriterionHeader.test.tsx` — prev/next, collapse

Each file has one clear responsibility. `KitScoreSheet.tsx` orchestrates; `BulkScoreRow.tsx` owns row visuals and tap behavior; `CriterionHeader.tsx` owns the criterion descriptor strip and prev/next nav.

---

## Task 1: Add `absent` field to `scores` schema

**Files:**
- Modify: `convex/schema.ts`

- [ ] **Step 1: Add the optional field**

Edit `convex/schema.ts`. In the `scores` defineTable call, add `absent` after `observations`:

```ts
scores: defineTable({
  studentId: v.id("students"),
  kitId: v.id("kits"),
  criterionScores: v.record(v.string(), v.number()),
  observations: v.optional(v.string()),
  absent: v.optional(v.boolean()),
  scoredByProfileId: v.id("profiles"),
  updatedAt: v.number(),
})
  .index("by_student_and_kit", ["studentId", "kitId"])
  .index("by_student", ["studentId"]),
```

- [ ] **Step 2: Regenerate Convex types**

Run: `npx convex codegen`
Expected: regenerates `convex/_generated/*` files. No errors.

- [ ] **Step 3: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add convex/schema.ts convex/_generated/
git commit -m "feat(convex): add absent flag to scores"
```

---

## Task 2: Add `setCriterion` mutation

**Files:**
- Modify: `convex/scores.ts`

- [ ] **Step 1: Add the mutation at the end of the file**

Append to `convex/scores.ts`:

```ts
export const setCriterion = mutation({
  args: {
    studentId: v.id("students"),
    kitId: v.id("kits"),
    criterionId: v.string(),
    value: v.union(v.literal(1), v.literal(2), v.literal(3), v.literal(4)),
  },
  handler: async (ctx, args) => {
    const profile = await assertScoringAllowed(ctx, args.studentId, args.kitId);
    const existing = await ctx.db
      .query("scores")
      .withIndex("by_student_and_kit", (q) =>
        q.eq("studentId", args.studentId).eq("kitId", args.kitId),
      )
      .unique();
    const updatedAt = Date.now();
    if (existing) {
      const nextScores = {
        ...existing.criterionScores,
        [args.criterionId]: args.value,
      };
      await ctx.db.patch(existing._id, {
        criterionScores: nextScores,
        scoredByProfileId: profile._id,
        updatedAt,
      });
    } else {
      await ctx.db.insert("scores", {
        studentId: args.studentId,
        kitId: args.kitId,
        criterionScores: { [args.criterionId]: args.value },
        scoredByProfileId: profile._id,
        updatedAt,
      });
    }
  },
});
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 3: Smoke-test the mutation in the Convex dashboard**

Run: `npm run convex` (in another terminal)

In the Convex dashboard's Functions tab, run `scores.setCriterion` with a real `studentId`, `kitId`, `criterionId: "c1"`, `value: 3`. Then re-run with `value: 4`. Open the `scores` table — the row should exist with `criterionScores.c1 = 4`.

- [ ] **Step 4: Commit**

```bash
git add convex/scores.ts
git commit -m "feat(convex): scores.setCriterion mutation"
```

---

## Task 3: Add `setAbsent` mutation

**Files:**
- Modify: `convex/scores.ts`

- [ ] **Step 1: Append `setAbsent`**

```ts
export const setAbsent = mutation({
  args: {
    studentId: v.id("students"),
    kitId: v.id("kits"),
    absent: v.boolean(),
  },
  handler: async (ctx, args) => {
    const profile = await assertScoringAllowed(ctx, args.studentId, args.kitId);
    const existing = await ctx.db
      .query("scores")
      .withIndex("by_student_and_kit", (q) =>
        q.eq("studentId", args.studentId).eq("kitId", args.kitId),
      )
      .unique();
    const updatedAt = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        absent: args.absent,
        scoredByProfileId: profile._id,
        updatedAt,
      });
    } else {
      await ctx.db.insert("scores", {
        studentId: args.studentId,
        kitId: args.kitId,
        criterionScores: {},
        absent: args.absent,
        scoredByProfileId: profile._id,
        updatedAt,
      });
    }
  },
});
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add convex/scores.ts
git commit -m "feat(convex): scores.setAbsent mutation"
```

---

## Task 4: Add `listForClassAndKit` query

**Files:**
- Modify: `convex/scores.ts`

- [ ] **Step 1: Append the query**

```ts
export const listForClassAndKit = query({
  args: { classId: v.id("classes"), kitId: v.id("kits") },
  handler: async (ctx, { classId, kitId }) => {
    await requireOwnsClass(ctx, classId);
    const students = await ctx.db
      .query("students")
      .withIndex("by_class", (q) => q.eq("classId", classId))
      .collect();
    const studentScores = await Promise.all(
      students.map(async (student) => {
        const score = await ctx.db
          .query("scores")
          .withIndex("by_student_and_kit", (q) =>
            q.eq("studentId", student._id).eq("kitId", kitId),
          )
          .unique();
        return {
          student: { _id: student._id, name: student.name, rollNo: student.rollNo },
          criterionScores: score?.criterionScores ?? {},
          absent: score?.absent ?? false,
        };
      }),
    );
    studentScores.sort((a, b) => {
      const ra = a.student.rollNo;
      const rb = b.student.rollNo;
      if (ra && rb) return ra.localeCompare(rb, undefined, { numeric: true });
      if (ra) return -1;
      if (rb) return 1;
      return a.student.name.localeCompare(b.student.name);
    });
    return studentScores;
  },
});
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 3: Smoke-test in Convex dashboard**

Call `scores.listForClassAndKit` with a real `classId` + `kitId`. Expect an array of `{student, criterionScores, absent}` ordered by roll number.

- [ ] **Step 4: Commit**

```bash
git add convex/scores.ts
git commit -m "feat(convex): scores.listForClassAndKit query"
```

---

## Task 5: Honor `absent` in `lib/totals.ts`

**Files:**
- Modify: `src/lib/totals.ts`
- Create: `src/lib/totals.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/lib/totals.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { totalOf, maxScore, scoredCount, gradeBand, isResolved } from "./totals";

describe("totals", () => {
  it("totalOf sums the values", () => {
    expect(totalOf({ c1: 4, c2: 3, c3: 2 })).toBe(9);
  });

  it("maxScore is 4× criteria count", () => {
    expect(maxScore(6)).toBe(24);
  });

  it("scoredCount counts non-zero entries up to criteriaCount", () => {
    expect(scoredCount({ c1: 4, c2: 3 }, 6)).toBe(2);
  });

  it("gradeBand maps percentages", () => {
    expect(gradeBand(95)).toBe("Outstanding");
    expect(gradeBand(80)).toBe("Proficient");
    expect(gradeBand(60)).toBe("Developing");
    expect(gradeBand(20)).toBe("Beginning");
  });

  describe("isResolved", () => {
    it("returns true when absent is true even with no scores", () => {
      expect(isResolved({ criterionScores: {}, absent: true }, "c1")).toBe(true);
    });

    it("returns true when the criterion has a 1-4 score", () => {
      expect(isResolved({ criterionScores: { c1: 3 }, absent: false }, "c1")).toBe(true);
    });

    it("returns false when neither absent nor scored", () => {
      expect(isResolved({ criterionScores: {}, absent: false }, "c1")).toBe(false);
    });

    it("treats missing absent as false", () => {
      expect(isResolved({ criterionScores: {} }, "c1")).toBe(false);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/totals.test.ts`
Expected: FAIL — `isResolved` is not exported.

- [ ] **Step 3: Add `isResolved` to `src/lib/totals.ts`**

Append to `src/lib/totals.ts`:

```ts
export type StudentScoreState = {
  criterionScores: CriterionScores;
  absent?: boolean;
};

export function isResolved(state: StudentScoreState, criterionId: string): boolean {
  if (state.absent) return true;
  const v = state.criterionScores[criterionId];
  return typeof v === "number" && v >= 1 && v <= 4;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/totals.test.ts`
Expected: PASS for all 8 cases.

- [ ] **Step 5: Commit**

```bash
git add src/lib/totals.ts src/lib/totals.test.ts
git commit -m "feat(totals): isResolved helper for absent + scored state"
```

---

## Task 6: Render "Absent" in `StudentReportPdf`

**Files:**
- Modify: `src/components/StudentReportPdf.tsx`
- Modify: `src/pages/StudentReport.tsx`

- [ ] **Step 1: Add `absent` to the `ScoredKit` type**

In `src/components/StudentReportPdf.tsx`, update the exported type:

```ts
export type ScoredKit = {
  kit: { kitNumber: number; kitName: string; concept: string; category: string };
  rubric: { criteria: Criterion[] };
  criterionScores: Record<string, number>;
  observations?: string;
  absent?: boolean;
};
```

- [ ] **Step 2: Render an Absent page when `absent` is true**

Inside `StudentReportDoc`'s `scored.map((sk, i) => { ... })`, replace the `<Page>` body with a guard at the top:

```tsx
{scored.map((sk, i) => {
  if (sk.absent) {
    return (
      <Page key={i} size="A4" style={s.page}>
        <Text style={s.h1}>{studentName}</Text>
        <Text style={s.meta}>
          {className} · #{sk.kit.kitNumber} · {sk.kit.kitName} · {sk.kit.category} · {sk.kit.concept}
        </Text>
        <Text style={s.totalBar}>Absent for this kit</Text>
      </Page>
    );
  }
  const total = totalOf(sk.criterionScores);
  // ... unchanged ...
})}
```

- [ ] **Step 3: Pass `absent` through in `StudentReport.tsx`**

In `src/pages/StudentReport.tsx`, update the `pdfRows` mapping to include `absent`:

```ts
const pdfRows: ScoredKit[] = filtered.map((s) => ({
  kit: {
    kitNumber: s.kit.kitNumber,
    kitName: s.kit.kitName,
    concept: s.kit.concept,
    category: s.kit.category,
  },
  rubric: { criteria: s.rubric.criteria },
  criterionScores: s.criterionScores,
  observations: s.observations,
  absent: s.absent ?? false,
}));
```

Also in the on-screen list, render an "Absent" badge in place of the criterion grid when `sk.absent`:

```tsx
{sk.absent ? (
  <p className="text-sm text-bad-700">Absent for this kit</p>
) : (
  <ul className="text-xs text-gray-600 grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4">
    {sk.rubric.criteria.map((c) => (
      <li key={c.id} className="flex justify-between">
        <span>{c.label}</span>
        <span className="font-medium">
          {sk.criterionScores[c.id] ?? "—"}/4
        </span>
      </li>
    ))}
  </ul>
)}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 5: Manual sanity check**

Run: `npm run dev` (and `npm run convex` in another terminal). In a test browser session: mark a student absent for a kit via the Convex dashboard (set `scores.absent = true`), navigate to their report, download the PDF. The kit's page should read "Absent for this kit".

- [ ] **Step 6: Commit**

```bash
git add src/components/StudentReportPdf.tsx src/pages/StudentReport.tsx
git commit -m "feat(pdf): student report shows Absent for absent kits"
```

---

## Task 7: Render "Absent" in `ClassReportPdf` and on-screen list

**Files:**
- Modify: `src/components/ClassReportPdf.tsx`
- Modify: `src/pages/ClassReport.tsx`

- [ ] **Step 1: Add `absent` to the row type in `ClassReportPdf.tsx`**

```ts
type StudentBlock = {
  student: { name: string };
  scores: {
    kit: { kitNumber: number; kitName: string };
    rubric: { criteria: { id: string }[] };
    criterionScores: Record<string, number>;
    absent?: boolean;
  }[];
};
```

- [ ] **Step 2: Render "Absent" in the row**

Inside the `b.scores.map((sk, j) => { ... })`, branch on absent:

```tsx
b.scores.map((sk, j) => {
  if (sk.absent) {
    return (
      <View key={j} style={s.tr}>
        <Text style={s.cellKit}>#{sk.kit.kitNumber} · {sk.kit.kitName}</Text>
        <Text style={{ ...s.cellTotal, color: "#a32d2d" }}>Absent</Text>
      </View>
    );
  }
  const total = totalOf(sk.criterionScores);
  // ... unchanged ...
})
```

- [ ] **Step 3: Pass `absent` through in `ClassReport.tsx`**

In `src/pages/ClassReport.tsx`, update the `cleaned` mapping to include `absent`:

```ts
const cleaned = blocks.map((b) => ({
  student: { name: b.student.name },
  scores: b.scores
    .filter(
      (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
        s.kit !== null && s.rubric !== null,
    )
    .map((s) => ({
      kit: { kitNumber: s.kit.kitNumber, kitName: s.kit.kitName },
      rubric: { criteria: s.rubric.criteria.map((c) => ({ id: c.id })) },
      criterionScores: s.criterionScores,
      absent: s.absent ?? false,
      _id: s._id,
    })),
}));
```

Then in the on-screen `<li>` render:

```tsx
{b.scores.map((sk) => {
  if (sk.absent) {
    return (
      <li key={sk._id} className="flex justify-between">
        <span>#{sk.kit.kitNumber} · {sk.kit.kitName}</span>
        <span className="text-bad-700">Absent</span>
      </li>
    );
  }
  const total = totalOf(sk.criterionScores);
  const max = maxScore(sk.rubric.criteria.length);
  return (
    <li key={sk._id} className="flex justify-between">
      <span>#{sk.kit.kitNumber} · {sk.kit.kitName}</span>
      <span className="font-medium">{total}/{max}</span>
    </li>
  );
})}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ClassReportPdf.tsx src/pages/ClassReport.tsx
git commit -m "feat(pdf): class report shows Absent for absent kits"
```

---

## Task 8: Add `jszip` dependency

**Files:**
- Modify: `package.json` (auto-updated by npm)
- Modify: `package-lock.json` (auto-updated)

- [ ] **Step 1: Install**

Run: `npm install jszip@^3.10.1`
Expected: installs without warnings; `package.json` shows `"jszip": "^3.10.1"` under `dependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(deps): add jszip"
```

---

## Task 9: Build `lib/buildReportZip.ts`

**Files:**
- Create: `src/lib/buildReportZip.ts`
- Create: `src/lib/buildReportZip.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/buildReportZip.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";
import JSZip from "jszip";
import { buildReportZip, sanitizeFilename } from "./buildReportZip";

describe("sanitizeFilename", () => {
  it("replaces whitespace with underscores", () => {
    expect(sanitizeFilename("Aanya Sharma")).toBe("Aanya_Sharma");
  });

  it("strips path separators", () => {
    expect(sanitizeFilename("foo/bar\\baz")).toBe("foobarbaz");
  });

  it("keeps Unicode letters", () => {
    expect(sanitizeFilename("आन्या शर्मा")).toBe("आन्या_शर्मा");
  });
});

describe("buildReportZip", () => {
  it("builds a zip with one entry per input, named by index + sanitized name", async () => {
    const entries = [
      { fileLabel: "01-Aanya Sharma", blob: new Blob(["a"], { type: "application/pdf" }) },
      { fileLabel: "02-Rahul Iyer",   blob: new Blob(["b"], { type: "application/pdf" }) },
    ];
    const onProgress = vi.fn();
    const out = await buildReportZip(entries, onProgress);
    const zip = await JSZip.loadAsync(out);
    const names = Object.keys(zip.files).sort();
    expect(names).toEqual(["01-Aanya_Sharma.pdf", "02-Rahul_Iyer.pdf"]);
    expect(onProgress).toHaveBeenCalledWith(1, 2);
    expect(onProgress).toHaveBeenCalledWith(2, 2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/buildReportZip.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `src/lib/buildReportZip.ts`:

```ts
import JSZip from "jszip";

export type ZipEntry = { fileLabel: string; blob: Blob };

export function sanitizeFilename(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "_");
}

export async function buildReportZip(
  entries: ZipEntry[],
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const zip = new JSZip();
  for (let i = 0; i < entries.length; i++) {
    const { fileLabel, blob } = entries[i];
    zip.file(`${sanitizeFilename(fileLabel)}.pdf`, blob);
    onProgress?.(i + 1, entries.length);
  }
  return zip.generateAsync({ type: "blob" });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/buildReportZip.test.ts`
Expected: PASS for both describes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/buildReportZip.ts src/lib/buildReportZip.test.ts
git commit -m "feat(lib): buildReportZip + sanitizeFilename"
```

---

## Task 10: Build `lib/shareReportCard.ts`

**Files:**
- Create: `src/lib/shareReportCard.ts`
- Create: `src/lib/shareReportCard.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/shareReportCard.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { canShareFiles, shareReportCard } from "./shareReportCard";

describe("canShareFiles", () => {
  it("returns false when navigator.canShare is missing", () => {
    expect(canShareFiles({} as Navigator)).toBe(false);
  });

  it("returns true when navigator.canShare reports support for files", () => {
    const nav = { canShare: vi.fn(() => true), share: vi.fn() } as unknown as Navigator;
    expect(canShareFiles(nav)).toBe(true);
  });

  it("returns false when navigator.canShare returns false", () => {
    const nav = { canShare: vi.fn(() => false), share: vi.fn() } as unknown as Navigator;
    expect(canShareFiles(nav)).toBe(false);
  });
});

describe("shareReportCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window.URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:mock"),
    });
    Object.defineProperty(window.URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("invokes navigator.share with a File when canShareFiles is true", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const nav = { canShare: () => true, share } as unknown as Navigator;
    const blob = new Blob(["x"], { type: "application/pdf" });
    await shareReportCard({
      blob,
      filename: "Aanya.pdf",
      title: "Aanya — Report",
      text: "Grade 4 report",
      navigator: nav,
      openUrl: vi.fn(),
    });
    expect(share).toHaveBeenCalled();
    const arg = share.mock.calls[0][0];
    expect(arg.files[0].name).toBe("Aanya.pdf");
    expect(arg.title).toBe("Aanya — Report");
  });

  it("falls back to download + openUrl when canShareFiles is false", async () => {
    const nav = {} as Navigator;
    const openUrl = vi.fn();
    const click = vi.fn();
    const a = document.createElement("a");
    a.click = click;
    vi.spyOn(document, "createElement").mockReturnValue(a);
    await shareReportCard({
      blob: new Blob(["x"], { type: "application/pdf" }),
      filename: "Aanya.pdf",
      title: "t",
      text: "x",
      navigator: nav,
      openUrl,
    });
    expect(click).toHaveBeenCalled();
    expect(openUrl).toHaveBeenCalledWith("https://web.whatsapp.com/");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/shareReportCard.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `src/lib/shareReportCard.ts`:

```ts
export function canShareFiles(nav: Navigator): boolean {
  const c = (nav as Navigator & { canShare?: (data: unknown) => boolean }).canShare;
  if (typeof c !== "function") return false;
  try {
    return c.call(nav, { files: [] });
  } catch {
    return false;
  }
}

export async function shareReportCard(opts: {
  blob: Blob;
  filename: string;
  title: string;
  text: string;
  navigator?: Navigator;
  openUrl?: (url: string) => void;
}): Promise<"shared" | "downloaded"> {
  const nav = opts.navigator ?? globalThis.navigator;
  const open = opts.openUrl ?? ((url: string) => window.open(url, "_blank"));
  if (canShareFiles(nav)) {
    const file = new File([opts.blob], opts.filename, { type: "application/pdf" });
    try {
      await (nav as Navigator & {
        share: (data: { files: File[]; title: string; text: string }) => Promise<void>;
      }).share({ files: [file], title: opts.title, text: opts.text });
      return "shared";
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return "downloaded";
    }
  }
  const url = URL.createObjectURL(opts.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = opts.filename;
  a.click();
  URL.revokeObjectURL(url);
  open("https://web.whatsapp.com/");
  return "downloaded";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/shareReportCard.test.ts`
Expected: PASS for all cases.

- [ ] **Step 5: Commit**

```bash
git add src/lib/shareReportCard.ts src/lib/shareReportCard.test.ts
git commit -m "feat(lib): shareReportCard with Web Share API + WhatsApp fallback"
```

---

## Task 11: Build `CriterionHeader` component

**Files:**
- Create: `src/components/CriterionHeader.tsx`
- Create: `src/components/CriterionHeader.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/CriterionHeader.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CriterionHeader from "./CriterionHeader";

const sample = {
  id: "c2",
  label: "Observation skills",
  sub: "Records what they notice",
  c4: "Notices subtle details",
  c3: "Notices most",
  c2: "Notices few",
  c1: "Misses major",
};

describe("CriterionHeader", () => {
  it("renders label, sub, position, and four descriptors", () => {
    render(
      <CriterionHeader
        criterion={sample}
        index={1}
        total={6}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByText("Observation skills")).toBeInTheDocument();
    expect(screen.getByText(/Criterion 2 \/ 6/i)).toBeInTheDocument();
    expect(screen.getByText("Notices subtle details")).toBeInTheDocument();
    expect(screen.getByText("Misses major")).toBeInTheDocument();
  });

  it("calls onPrev and onNext when buttons clicked", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <CriterionHeader
        criterion={sample}
        index={1}
        total={6}
        onPrev={onPrev}
        onNext={onNext}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /prev/i }));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(onPrev).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("disables prev when index is 0 and next when index is total - 1", () => {
    const { rerender } = render(
      <CriterionHeader
        criterion={sample}
        index={0}
        total={6}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
    rerender(
      <CriterionHeader
        criterion={sample}
        index={5}
        total={6}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/CriterionHeader.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `src/components/CriterionHeader.tsx`:

```tsx
import { useState } from "react";

export type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

export default function CriterionHeader({
  criterion,
  index,
  total,
  onPrev,
  onNext,
}: {
  criterion: Criterion;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [open, setOpen] = useState(true);
  const atStart = index <= 0;
  const atEnd = index >= total - 1;

  return (
    <section className="sticky top-0 z-10 bg-white border-b">
      <div className="px-4 py-3 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">
            Criterion {index + 1} / {total}
          </div>
          <div className="font-medium text-sm">{criterion.label}</div>
          <div className="text-xs text-gray-500">{criterion.sub}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Prev criterion"
            onClick={onPrev}
            disabled={atStart}
            className="border rounded px-3 py-1.5 text-xs disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-xs text-gray-500 px-1">{index + 1} / {total}</span>
          <button
            aria-label="Next criterion"
            onClick={onNext}
            disabled={atEnd}
            className="bg-accent text-white rounded px-3 py-1.5 text-xs disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-4 py-1 text-xs text-accent hover:underline"
      >
        {open ? "hide descriptors ▴" : "show descriptors ▾"}
      </button>
      {open && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-4 pb-3 text-xs">
          <div className="bg-good-50 text-good-800 rounded px-2 py-1.5"><b>4</b> {criterion.c4}</div>
          <div className="bg-ok-50 text-ok-800 rounded px-2 py-1.5"><b>3</b> {criterion.c3}</div>
          <div className="bg-warn-50 text-warn-800 rounded px-2 py-1.5"><b>2</b> {criterion.c2}</div>
          <div className="bg-bad-50 text-bad-800 rounded px-2 py-1.5"><b>1</b> {criterion.c1}</div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/CriterionHeader.test.tsx`
Expected: PASS for all three cases.

- [ ] **Step 5: Commit**

```bash
git add src/components/CriterionHeader.tsx src/components/CriterionHeader.test.tsx
git commit -m "feat(ui): CriterionHeader with descriptors + prev/next"
```

---

## Task 12: Build `BulkScoreRow` component

**Files:**
- Create: `src/components/BulkScoreRow.tsx`
- Create: `src/components/BulkScoreRow.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/BulkScoreRow.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BulkScoreRow from "./BulkScoreRow";

const baseProps = {
  rollNo: "12",
  name: "Aanya Sharma",
  currentScore: 0,
  absent: false,
  focused: false,
  onScore: vi.fn(),
  onAbsent: vi.fn(),
  onFocus: vi.fn(),
};

describe("BulkScoreRow", () => {
  it("renders roll, name, and 1-4 buttons + absent", () => {
    render(<BulkScoreRow {...baseProps} />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Aanya Sharma")).toBeInTheDocument();
    for (const v of ["4", "3", "2", "1"]) {
      expect(screen.getByRole("button", { name: `Score ${v}` })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /absent/i })).toBeInTheDocument();
  });

  it("calls onScore with the value when a score button is clicked", () => {
    const onScore = vi.fn();
    render(<BulkScoreRow {...baseProps} onScore={onScore} />);
    fireEvent.click(screen.getByRole("button", { name: "Score 3" }));
    expect(onScore).toHaveBeenCalledWith(3);
  });

  it("calls onAbsent when absent button clicked", () => {
    const onAbsent = vi.fn();
    render(<BulkScoreRow {...baseProps} onAbsent={onAbsent} />);
    fireEvent.click(screen.getByRole("button", { name: /absent/i }));
    expect(onAbsent).toHaveBeenCalledOnce();
  });

  it("shows a check when currentScore > 0", () => {
    render(<BulkScoreRow {...baseProps} currentScore={3} />);
    expect(screen.getByTestId("settled-check")).toBeInTheDocument();
  });

  it("shows a check when absent", () => {
    render(<BulkScoreRow {...baseProps} absent />);
    expect(screen.getByTestId("settled-check")).toBeInTheDocument();
  });

  it("applies focused styling when focused=true", () => {
    const { container } = render(<BulkScoreRow {...baseProps} focused />);
    expect(container.firstChild).toHaveAttribute("data-focused", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/BulkScoreRow.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `src/components/BulkScoreRow.tsx`:

```tsx
import { useEffect, useRef } from "react";

const SCORE_STYLES: Record<number, string> = {
  4: "border-good-400 bg-good-50 text-good-800",
  3: "border-[#97C459] bg-ok-50 text-ok-800",
  2: "border-warn-400 bg-warn-50 text-warn-800",
  1: "border-bad-400 bg-bad-50 text-bad-800",
};

export default function BulkScoreRow({
  rollNo,
  name,
  currentScore,
  absent,
  focused,
  onScore,
  onAbsent,
  onFocus,
}: {
  rollNo: string;
  name: string;
  currentScore: number;
  absent: boolean;
  focused: boolean;
  onScore: (v: 1 | 2 | 3 | 4) => void;
  onAbsent: () => void;
  onFocus: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focused) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [focused]);

  const settled = absent || currentScore > 0;

  return (
    <div
      ref={ref}
      data-focused={focused}
      onClick={onFocus}
      className={`flex items-center gap-3 px-4 py-2.5 border-b text-sm cursor-pointer ${
        focused
          ? "bg-warn-50 border-l-4 border-l-warn-400"
          : absent
            ? "opacity-70"
            : ""
      }`}
    >
      <div className="w-7 text-right text-gray-500 text-xs">{rollNo}</div>
      <div className="flex-1 font-medium">
        {name}
        {absent && <span className="text-xs text-gray-500 ml-2">· absent</span>}
      </div>
      <div className="flex gap-1.5">
        {[4, 3, 2, 1].map((v) => {
          const active = currentScore === v && !absent;
          return (
            <button
              key={v}
              aria-label={`Score ${v}`}
              aria-pressed={active}
              onClick={(e) => { e.stopPropagation(); onScore(v as 1 | 2 | 3 | 4); }}
              className={`w-9 h-8 rounded border text-xs font-medium transition ${
                active
                  ? SCORE_STYLES[v] + " border-2"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {v}
            </button>
          );
        })}
        <button
          aria-label={absent ? "Unmark absent" : "Mark absent"}
          aria-pressed={absent}
          onClick={(e) => { e.stopPropagation(); onAbsent(); }}
          className={`w-9 h-8 rounded border text-xs ${
            absent
              ? "bg-gray-700 text-white border-gray-800"
              : "border-dashed border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          ✕
        </button>
      </div>
      <div className="w-4 text-right">
        {settled && <span data-testid="settled-check" className="text-good-600">✓</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/BulkScoreRow.test.tsx`
Expected: PASS for all six cases.

- [ ] **Step 5: Commit**

```bash
git add src/components/BulkScoreRow.tsx src/components/BulkScoreRow.test.tsx
git commit -m "feat(ui): BulkScoreRow with 1-4 + absent buttons"
```

---

## Task 13: Build `KitScoreSheet` page (scaffold + data)

**Files:**
- Create: `src/pages/KitScoreSheet.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the route in `src/App.tsx`**

Add the import:

```tsx
import KitScoreSheet from "./pages/KitScoreSheet";
```

Add the route inside the `TeacherRoute` block, near the existing `ScoreSheet` route:

```tsx
<Route
  path="/class/:classId/kit/:kitId/score"
  element={<KitScoreSheet />}
/>
```

- [ ] **Step 2: Create `src/pages/KitScoreSheet.tsx` (data + layout shell)**

```tsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import CriterionHeader from "../components/CriterionHeader";
import BulkScoreRow from "../components/BulkScoreRow";

export default function KitScoreSheet() {
  const { classId, kitId } = useParams<{ classId: string; kitId: string }>();
  const cid = classId as Id<"classes">;
  const kid = kitId as Id<"kits">;
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const cIndex = Math.max(0, parseInt(params.get("c") ?? "0", 10) || 0);

  const cls = useQuery(api.classes.get, { classId: cid });
  const kit = useQuery(api.kits.get, { kitId: kid });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kid });
  const rows = useQuery(api.scores.listForClassAndKit, { classId: cid, kitId: kid });

  const setCriterion = useMutation(api.scores.setCriterion);
  const setAbsent = useMutation(api.scores.setAbsent);

  const [focusIndex, setFocusIndex] = useState(0);
  const [flashRow, setFlashRow] = useState<number | null>(null);

  const criteria = rubric?.criteria ?? [];
  const total = criteria.length;
  const criterion = criteria[cIndex];

  useEffect(() => {
    if (!rows || !criterion) return;
    const firstUnsettled = rows.findIndex(
      (r) => !r.absent && (r.criterionScores[criterion.id] ?? 0) < 1,
    );
    setFocusIndex(firstUnsettled === -1 ? 0 : firstUnsettled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cIndex, rubric?._id]);

  const onPickScore = useCallback(
    (rowIdx: number, value: 1 | 2 | 3 | 4) => {
      if (!rows || !criterion) return;
      const row = rows[rowIdx];
      setCriterion({
        studentId: row.student._id,
        kitId: kid,
        criterionId: criterion.id,
        value,
      });
      setFlashRow(rowIdx);
      setTimeout(() => {
        setFlashRow(null);
        if (rowIdx < rows.length - 1) setFocusIndex(rowIdx + 1);
        else document.getElementById("next-criterion-btn")?.focus();
      }, 250);
    },
    [rows, criterion, kid, setCriterion],
  );

  const onToggleAbsent = useCallback(
    (rowIdx: number) => {
      if (!rows) return;
      const row = rows[rowIdx];
      setAbsent({ studentId: row.student._id, kitId: kid, absent: !row.absent });
      setFlashRow(rowIdx);
      setTimeout(() => {
        setFlashRow(null);
        if (rowIdx < rows.length - 1) setFocusIndex(rowIdx + 1);
      }, 250);
    },
    [rows, kid, setAbsent],
  );

  const onPrev = () => setParams({ c: String(Math.max(0, cIndex - 1)) });
  const onNext = () => setParams({ c: String(Math.min(total - 1, cIndex + 1)) });

  const settledCount = useMemo(() => {
    if (!rows || !criterion) return 0;
    return rows.filter(
      (r) => r.absent || (r.criterionScores[criterion.id] ?? 0) >= 1,
    ).length;
  }, [rows, criterion]);

  if (!cls || !kit || !rubric || !rows) return <p className="text-sm text-gray-500">Loading…</p>;
  if (rows.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No students in this class yet.{" "}
        <Link to={`/class/${cid}`} className="text-accent underline">
          Add students
        </Link>.
      </div>
    );
  }
  if (!criterion) {
    return <p className="text-sm text-bad-700">This kit has no rubric set up yet.</p>;
  }

  const allSettled = settledCount === rows.length && cIndex === total - 1;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          { label: `Kit #${kit.kitNumber} · ${kit.kitName}` },
        ]}
      />
      <h1 className="font-serif text-2xl text-accent mb-4">
        Score class — {kit.kitName}
      </h1>

      {allSettled ? (
        <CompletionSummary
          className={cls.name}
          kitName={kit.kitName}
          absentCount={rows.filter((r) => r.absent).length}
          classId={cid}
          onNextKit={() => navigate(`/class/${cid}`)}
        />
      ) : (
        <>
          <CriterionHeader
            criterion={criterion}
            index={cIndex}
            total={total}
            onPrev={onPrev}
            onNext={onNext}
          />
          <div className="bg-white border-x">
            {rows.map((r, i) => (
              <BulkScoreRow
                key={r.student._id}
                rollNo={r.student.rollNo ?? String(i + 1)}
                name={r.student.name}
                currentScore={r.criterionScores[criterion.id] ?? 0}
                absent={r.absent}
                focused={i === focusIndex || flashRow === i}
                onScore={(v) => onPickScore(i, v)}
                onAbsent={() => onToggleAbsent(i)}
                onFocus={() => setFocusIndex(i)}
              />
            ))}
          </div>
          <div className="sticky bottom-0 bg-white border-t px-4 py-3">
            <div className="h-1.5 bg-gray-100 rounded overflow-hidden mb-1.5">
              <div
                className="h-full bg-good-400 transition-all"
                style={{ width: `${(settledCount / rows.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{settledCount} / {rows.length} settled</span>
              <button
                id="next-criterion-btn"
                onClick={onNext}
                disabled={cIndex >= total - 1}
                className="bg-accent text-white rounded px-3 py-1 text-xs disabled:opacity-40"
              >
                Next criterion →
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function CompletionSummary({
  className,
  kitName,
  absentCount,
  classId,
  onNextKit,
}: {
  className: string;
  kitName: string;
  absentCount: number;
  classId: Id<"classes">;
  onNextKit: () => void;
}) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center">
      <div className="text-2xl font-serif text-accent mb-2">All students settled ✓</div>
      <p className="text-sm text-gray-600 mb-4">
        {kitName} is fully scored for {className}.
        {absentCount > 0 && (
          <span className="block text-xs text-gray-500 mt-1">
            ({absentCount} marked absent)
          </span>
        )}
      </p>
      <div className="flex gap-2 justify-center">
        <Link to={`/class/${classId}`} className="border rounded px-4 py-1.5 text-sm">
          Back to class
        </Link>
        <Link to={`/class/${classId}/report`} className="border rounded px-4 py-1.5 text-sm">
          Class report →
        </Link>
        <button onClick={onNextKit} className="bg-accent text-white rounded px-4 py-1.5 text-sm">
          Score next kit →
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 4: Manual sanity check**

Run: `npm run dev` and `npm run convex` in another terminal. In the browser, manually navigate to `/class/<id>/kit/<kitId>/score`. Verify roster loads, tapping a score writes (check Convex dashboard), focus auto-advances after ~250ms.

- [ ] **Step 5: Commit**

```bash
git add src/pages/KitScoreSheet.tsx src/App.tsx
git commit -m "feat(kit-mode): KitScoreSheet page with auto-advance"
```

---

## Task 14: Keyboard shortcuts in `KitScoreSheet`

**Files:**
- Modify: `src/pages/KitScoreSheet.tsx`

- [ ] **Step 1: Add a `useEffect` for keydown handlers**

Inside `KitScoreSheet`, after the `onToggleAbsent` callback, add:

```tsx
useEffect(() => {
  function handler(e: KeyboardEvent) {
    if (!rows || !criterion) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
    if (e.key >= "1" && e.key <= "4") {
      e.preventDefault();
      onPickScore(focusIndex, parseInt(e.key, 10) as 1 | 2 | 3 | 4);
    } else if (e.key === "0") {
      e.preventDefault();
      onToggleAbsent(focusIndex);
    } else if (e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      setFocusIndex((i) => Math.min(rows.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "PageDown") {
      e.preventDefault();
      setFocusIndex((i) => Math.min(rows.length - 1, i + 10));
    } else if (e.key === "PageUp") {
      e.preventDefault();
      setFocusIndex((i) => Math.max(0, i - 10));
    } else if (e.key === "Escape") {
      navigate(`/class/${cid}`);
    }
  }
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [rows, criterion, focusIndex, onPickScore, onToggleAbsent, navigate, cid]);
```

- [ ] **Step 2: Add a small keyboard hint to the UI**

Just below the `<CriterionHeader>` element, insert:

```tsx
<div className="bg-gray-50 px-4 py-1.5 text-xs text-gray-500 border-b hidden md:block">
  Keyboard: <b>1</b>–<b>4</b> score · <b>0</b> absent · <b>↓</b>/<b>↑</b> navigate · <b>Esc</b> exit
</div>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 4: Manual check**

In a desktop browser: open kit-mode, press `3` → row gets a score, focus jumps. Press `↓`/`↑` → focus moves. Press `Esc` → returns to ClassDetail.

- [ ] **Step 5: Commit**

```bash
git add src/pages/KitScoreSheet.tsx
git commit -m "feat(kit-mode): keyboard shortcuts (1-4, 0, arrows, Esc)"
```

---

## Task 15: Entry point on `ClassDetail`

**Files:**
- Modify: `src/pages/ClassDetail.tsx`

- [ ] **Step 1: Replace the curriculum row layout**

In `src/pages/ClassDetail.tsx`, replace the curriculum-list `<li>` block (the one inside the Curriculum section) with:

```tsx
<ul className="divide-y">
  {kits?.map((k) => (
    <li key={k._id} className="px-4 py-2.5 text-sm flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        #{k.kit!.kitNumber} · {k.kit!.kitName}{" "}
        <span className="text-xs text-gray-500">({k.kit!.category})</span>
      </div>
      <Link
        to={`/class/${id}/kit/${k.kitId}/score`}
        className="bg-accent text-white rounded-md px-3 py-1 text-xs whitespace-nowrap"
      >
        Score class →
      </Link>
    </li>
  ))}
</ul>
```

- [ ] **Step 2: Remove the per-student inline "Score X" links**

In the Students section's `<li>` block, replace the inner `<div className="flex items-center gap-3 flex-wrap justify-end">` (lines roughly 96–130) with:

```tsx
<div className="flex items-center gap-3 flex-wrap justify-end">
  <Link
    to={`/class/${id}/students/${s._id}/report`}
    className="text-xs text-accent hover:underline"
  >
    Report
  </Link>
  <button
    onClick={() => {
      if (confirm(`Delete ${s.name}?`)) removeStudent({ studentId: s._id });
    }}
    className="text-xs text-bad-600 hover:underline"
  >
    Delete
  </button>
</div>
```

(The 3 inline kit "Score X" links are deleted; per-kit scoring now goes through kit-mode.)

- [ ] **Step 3: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 4: Manual check**

In the browser, open a class. Each kit row now has a "Score class →" button that links into `KitScoreSheet`. Student rows are cleaner.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ClassDetail.tsx
git commit -m "feat(class): kit-mode entry on ClassDetail; remove per-student inline score links"
```

---

## Task 16: ZIP download button on `ClassReport`

**Files:**
- Modify: `src/pages/ClassReport.tsx`

- [ ] **Step 1: Wire up the new button**

In `src/pages/ClassReport.tsx`, add these imports at the top:

```tsx
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { StudentReportDoc, type ScoredKit } from "../components/StudentReportPdf";
import { buildReportZip, downloadBlob } from "../lib/buildReportZip";
```

We need the full per-student data (with rubric criteria) to render individual PDFs. The current `listForClass` query already returns that — keep the `blocks` query as-is. Update `cleaned` to also keep the rubric's full criterion objects (not just `{id}`), which `StudentReportPdf` needs:

```tsx
type FullKit = {
  kit: { kitNumber: number; kitName: string; concept: string; category: string };
  rubric: { criteria: Array<{
    id: string; label: string; sub: string; c4: string; c3: string; c2: string; c1: string;
  }> };
  criterionScores: Record<string, number>;
  observations?: string;
  absent?: boolean;
  _id: string;
};

const fullBlocks: { student: { name: string; rollNo?: string }; scores: FullKit[] }[] =
  blocks.map((b) => ({
    student: { name: b.student.name, rollNo: b.student.rollNo },
    scores: b.scores
      .filter(
        (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
          s.kit !== null && s.rubric !== null,
      )
      .map((s) => ({
        kit: {
          kitNumber: s.kit.kitNumber,
          kitName: s.kit.kitName,
          concept: s.kit.concept,
          category: s.kit.category,
        },
        rubric: { criteria: s.rubric.criteria },
        criterionScores: s.criterionScores,
        observations: s.observations,
        absent: s.absent ?? false,
        _id: s._id,
      })),
  }));
```

Keep the existing `cleaned` used by the combined `downloadClassReport`; `fullBlocks` is the new structure used by the per-student ZIP.

Add state and handler inside the component:

```tsx
const [zipProgress, setZipProgress] = useState<{ done: number; total: number } | null>(null);

async function downloadAllPerStudent() {
  setZipProgress({ done: 0, total: fullBlocks.length });
  const entries: { fileLabel: string; blob: Blob }[] = [];
  for (let i = 0; i < fullBlocks.length; i++) {
    const b = fullBlocks[i];
    const pdfRows: ScoredKit[] = b.scores.map((s) => ({
      kit: s.kit,
      rubric: s.rubric,
      criterionScores: s.criterionScores,
      observations: s.observations,
      absent: s.absent,
    }));
    const blob = await pdf(
      <StudentReportDoc studentName={b.student.name} className={cls!.name} scored={pdfRows} />,
    ).toBlob();
    const prefix = b.student.rollNo ?? String(i + 1).padStart(2, "0");
    entries.push({ fileLabel: `${prefix}-${b.student.name}`, blob });
    setZipProgress({ done: i + 1, total: fullBlocks.length });
  }
  const zip = await buildReportZip(entries);
  downloadBlob(zip, `${cls!.name.replace(/\s+/g, "_")}_report_cards.zip`);
  setZipProgress(null);
}
```

Add the new button in the header next to the existing one:

```tsx
<div className="flex gap-2 flex-wrap">
  <button
    onClick={() => downloadClassReport(cls.name, cleaned)}
    className="border rounded-md px-4 py-1.5 text-sm"
  >
    Combined PDF
  </button>
  <button
    onClick={downloadAllPerStudent}
    disabled={!!zipProgress}
    className="bg-accent text-white rounded-md px-4 py-1.5 text-sm disabled:opacity-50"
  >
    {zipProgress
      ? `Generating ${zipProgress.done}/${zipProgress.total}…`
      : "Per-student ZIP"}
  </button>
</div>
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 3: Manual check**

In a class with 2–3 students that have scores, click "Per-student ZIP". A `<class>_report_cards.zip` downloads containing one PDF per student. Open one — verify it's the right student's data, including "Absent" rows where applicable.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ClassReport.tsx
git commit -m "feat(reports): ClassReport ZIP of per-student PDFs"
```

---

## Task 17: Per-row Share button on `ClassReport`

**Files:**
- Modify: `src/pages/ClassReport.tsx`

- [ ] **Step 1: Add the per-row share handler**

In `ClassReport.tsx`, import:

```tsx
import { shareReportCard } from "../lib/shareReportCard";
```

Add inside the component:

```tsx
async function shareStudent(block: typeof fullBlocks[number]) {
  const pdfRows: ScoredKit[] = block.scores.map((s) => ({
    kit: s.kit,
    rubric: s.rubric,
    criterionScores: s.criterionScores,
    observations: s.observations,
    absent: s.absent,
  }));
  const blob = await pdf(
    <StudentReportDoc studentName={block.student.name} className={cls!.name} scored={pdfRows} />,
  ).toBlob();
  await shareReportCard({
    blob,
    filename: `${block.student.name.replace(/\s+/g, "_")}_report.pdf`,
    title: `${block.student.name} — Report card`,
    text: `${cls!.name} — Term report`,
  });
}
```

- [ ] **Step 2: Add the button to each student row**

In the student list `<ul>`, change each `<li>` to use `fullBlocks` and include a Share button:

```tsx
<ul className="space-y-2">
  {fullBlocks.map((b, i) => (
    <li key={i} className="bg-white border rounded-xl p-4">
      <div className="flex justify-between items-start mb-2 gap-2">
        <div className="font-medium">{b.student.name}</div>
        <button
          onClick={() => shareStudent(b)}
          className="text-xs bg-accent text-white rounded px-3 py-1"
        >
          Share
        </button>
      </div>
      {b.scores.length === 0 ? (
        <p className="text-xs text-gray-500">No kits scored.</p>
      ) : (
        <ul className="text-xs text-gray-600 space-y-1">
          {b.scores.map((sk) => {
            if (sk.absent) {
              return (
                <li key={sk._id} className="flex justify-between">
                  <span>#{sk.kit.kitNumber} · {sk.kit.kitName}</span>
                  <span className="text-bad-700">Absent</span>
                </li>
              );
            }
            const total = Object.values(sk.criterionScores).reduce((a, v) => a + (Number(v) || 0), 0);
            const max = sk.rubric.criteria.length * 4;
            return (
              <li key={sk._id} className="flex justify-between">
                <span>#{sk.kit.kitNumber} · {sk.kit.kitName}</span>
                <span className="font-medium">{total}/{max}</span>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  ))}
</ul>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 4: Manual check on phone + desktop**

- Desktop: click Share → file downloads, WhatsApp Web opens in a new tab.
- Mobile (Chrome Android or Safari iOS): click Share → OS share sheet appears with WhatsApp/Gmail/AirDrop options.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ClassReport.tsx
git commit -m "feat(reports): per-student Share button on ClassReport"
```

---

## Task 18: Share button on `StudentReport`

**Files:**
- Modify: `src/pages/StudentReport.tsx`

- [ ] **Step 1: Wire up share**

In `src/pages/StudentReport.tsx`, add imports:

```tsx
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { StudentReportDoc } from "../components/StudentReportPdf";
import { shareReportCard } from "../lib/shareReportCard";
```

Add a handler:

```tsx
const [sharing, setSharing] = useState(false);
async function onShare() {
  setSharing(true);
  try {
    const blob = await pdf(
      <StudentReportDoc studentName={student.name} className={cls.name} scored={pdfRows} />,
    ).toBlob();
    await shareReportCard({
      blob,
      filename: `${student.name.replace(/\s+/g, "_")}_report.pdf`,
      title: `${student.name} — Report card`,
      text: `${cls.name} — Term report`,
    });
  } finally {
    setSharing(false);
  }
}
```

Replace the Download PDF button row with two buttons:

```tsx
<div className="flex gap-2">
  <button
    onClick={() => downloadStudentReport(student.name, cls.name, pdfRows)}
    className="border rounded-md px-4 py-1.5 text-sm"
  >
    Download PDF
  </button>
  <button
    onClick={onShare}
    disabled={sharing}
    className="bg-accent text-white rounded-md px-4 py-1.5 text-sm disabled:opacity-50"
  >
    {sharing ? "Preparing…" : "Share"}
  </button>
</div>
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/StudentReport.tsx
git commit -m "feat(reports): Share button on StudentReport"
```

---

## Task 19: Final QA pass + lint + test

**Files:** none

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors. If warnings, judge each — fix any that are real issues.

- [ ] **Step 2: Full test suite**

Run: `npm test`
Expected: PASS for all new tests (totals, buildReportZip, shareReportCard, CriterionHeader, BulkScoreRow) and any existing tests.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: completes without errors. `dist/` populated.

- [ ] **Step 4: Manual end-to-end with seeded data**

In a browser session with `npm run dev` + `npm run convex`:

1. Create a class with 5 students (use real Indian names with roll numbers).
2. Attach a kit to the curriculum via `/class/<id>/curriculum`.
3. From ClassDetail, click "Score class →" on that kit.
4. Score criterion 1 by tapping different values per student — confirm auto-advance, 250ms flash, all 5 settled.
5. Press `Next criterion →`. Score criterion 2 with mostly absent. Confirm absent badge persists.
6. Press `1`, `2`, `3`, `4` on a focused row — confirm score applied + focus advanced.
7. Press `Esc` — returns to ClassDetail.
8. Reload kit-mode mid-scoring — confirm previous scores reloaded.
9. Go to ClassReport. Click "Per-student ZIP" — open one PDF, verify absent rows render "Absent".
10. Click per-row "Share" on desktop — confirms download + opens WhatsApp Web tab.
11. (Optional) Open on a phone via local IP and repeat — confirm OS share sheet opens.

- [ ] **Step 5: Commit any final fixes if needed; otherwise we're done.**

```bash
# (only if anything was tweaked during QA)
git add -u
git commit -m "fix: QA fixes for kit-mode + per-student PDFs"
```

---

## Self-Review Notes

**Spec coverage map:**

| Spec section | Covered by |
|---|---|
| §2.1 Layout (breadcrumb, criterion header, roster, progress bar) | Tasks 11, 12, 13 |
| §2.2 Row anatomy | Task 12 |
| §2.3 Scoring interaction + auto-advance + 250ms flash | Task 13 (steps 2) |
| §2.4 Keyboard | Task 14 |
| §2.5 Criterion navigation + completion summary | Task 13 |
| §2.6 Empty / error states | Task 13 (no students / no rubric guards) |
| §3.1 `absent` field | Task 1 |
| §3.2 setCriterion / setAbsent | Tasks 2, 3 |
| §3.3 listForClassAndKit | Task 4 |
| §4.1 ClassDetail entry point | Task 15 |
| §5.1 ZIP + Share | Tasks 16, 17, 18 |
| §5.2 jszip dep | Task 8 |
| §5.3 Progress text during PDF gen | Task 16 |
| §6 edge cases | Manually checked in Task 19; absent toggle preserves criterionScores via patch semantics in Task 3 |

**Type consistency:**
- `setCriterion` value union `1|2|3|4` matches `onScore: (v: 1|2|3|4)` in `BulkScoreRow.tsx`.
- `listForClassAndKit` returns `{student: {_id, name, rollNo}, criterionScores, absent}` — consumed identically by `KitScoreSheet`.
- `ScoredKit.absent?: boolean` added in Task 6, consumed in Tasks 16, 17, 18.

**Out of scope (documented in spec §1):**
- Offline-first / PWA, localization, bulk student onboarding, class heatmap — separate specs.
