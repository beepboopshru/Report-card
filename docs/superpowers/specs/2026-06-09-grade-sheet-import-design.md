# Grade Sheet Export / CSV Import — Design

**Date:** 2026-06-09
**Status:** Approved (pending spec review)

## Problem

Teachers want to enter student grades and rubric marks offline in a spreadsheet,
not only through the in-app scoring screen. We need an ongoing workflow where an
admin exports a pre-structured Google Sheet for a class, teachers fill in marks
offline, and the admin later imports the results back into the database.

## Goals

- App-generated template (not hand-made) so identifiers are baked in and matching
  is reliable.
- One workbook per class, one tab per kit (the authoring experience).
- Import is always one (class, kit) CSV at a time.
- Preview + confirm before any write; overwrite on apply; **blank = no change**.
- Admin-only export/import. No new permission logic (admins may already write
  scores into any class via `requireOwnsClass` / `assertScoringAllowed`).

## Non-goals

- Programmatic Google Sheets API / OAuth (user uploads the .xlsx to Drive manually).
- Clearing a mark by blanking a cell (stays an in-app action).
- Per-teacher import (v1 is admin-only).

## Data model context

The relevant table is `scores` (one row per student+kit):

```
scores: {
  studentId, kitId,
  criterionScores: Record<criterionId, 1|2|3|4>,
  observations?: string,
  absent?: boolean,
  scoredByProfileId, updatedAt,
}
```

Each kit has a `rubrics` row with an ordered `criteria[]` array, each criterion
having a stable `id`. Scoring requires the kit to be in the class's `classKits`
(curriculum). `assertScoringAllowed` already permits admins on any class.

## Overall flow

```
Admin clicks "Download grade workbook" on a class
  → app generates an .xlsx: one tab per curriculum kit, each tab pre-filled with
    students + that kit's rubric columns + any existing marks
Admin uploads the .xlsx to Google Drive  (opens as a Google Sheet with tabs)
  → teachers fill 1-4 marks / absent / observations offline
Later: admin downloads the relevant tab as CSV
  → uploads CSV in the app → preview/diff → confirm → scores written to DB
```

The multi-tab workbook is just a convenient way to author the per-(class, kit)
CSVs that the importer consumes one at a time.

## File format (per tab / per CSV)

Columns, left to right:

| col   | header           | role                                                              |
|-------|------------------|-------------------------------------------------------------------|
| A     | `class_id`       | constant, do-not-edit (self-identifies the file)                  |
| B     | `kit_id`         | constant, do-not-edit                                             |
| C     | `student_id`     | constant per row, do-not-edit (the match key)                     |
| D     | `roll_no`        | reference only                                                    |
| E     | `name`           | reference only                                                    |
| F     | `absent`         | `x` = absent; blank = no change                                   |
| G..N  | one per criterion (rubric order) | header is `<label> ⟨<criterionId>⟩`; cell = 1-4 or blank          |
| last  | `observations`   | free text                                                         |

- The file is **self-describing**: `class_id` / `kit_id` / `student_id` baked in,
  so the importer never relies on the admin remembering which file is which, and
  every row matches the right student/kit even if rows are re-sorted.
- Criterion columns are matched by the **embedded criterion id** in the header,
  with column **position** as a fallback.
- Mark columns get a 1-4 dropdown (data validation) in the exported xlsx.

### Blank = no change (everywhere)

- Blank mark → that criterion is left untouched in the DB.
- Blank `absent` → absent flag left untouched. `x` (or `yes`/`true`) → absent = true.
- Blank observation → observation left untouched; non-blank → set.

Trade-off: a mark cannot be *cleared* by blanking its cell. Clearing remains an
in-app action. Documented for the admin.

## Backend (Convex)

- **`scores.exportClassGrades`** (query, admin-gated)
  - Args: `{ classId }`.
  - Returns: class name, sorted students (by rollNo then name), and for each
    curriculum kit (ordered by `classKits.order`): kit info, ordered rubric
    criteria, and existing `criterionScores` / `absent` / `observations` per
    student. The frontend turns this into the workbook.

- **`buildImportPlan(students, rubric, existingScores, rows)`** — a **pure**
  function in a plain module (no DB), unit-testable. Produces:
  - `diffs`: per student — marks newly set, marks changed (old → new),
    absent change, observation change.
  - `errors`: per-row reasons for skipped rows.

- **`scores.validateImport`** (query, admin-gated)
  - Args: already-parsed `rows` (parsing happens client-side).
  - Loads class / kit / rubric / students / existing scores from the
    `class_id` + `kit_id` declared in the rows, runs `buildImportPlan`,
    returns `{ diffs, errors, className, kitName }` for the preview.

- **`scores.applyImport`** (mutation, admin-gated)
  - Args: parsed `rows`.
  - Re-runs `buildImportPlan` (never trusts the preview). For each valid row:
    merges non-blank marks into the existing `criterionScores`, sets
    `absent` / `observations` where specified, `scoredByProfileId` = the
    importing admin, `updatedAt = Date.now()`. Reuses the existing
    kit-in-curriculum check.

### Validation / rejection rules (clear per-row reasons)

- File must have ≥1 data row.
- All rows must share one `class_id` and one `kit_id`.
- `class_id` is a real class; `kit_id` is a real kit and is in that class's
  `classKits` curriculum (else hard error — scoring not allowed).
- Each `student_id` exists and belongs to `class_id` (else row skipped).
- The criterion-column structure matches the kit's rubric (ids present, or
  position+count match); otherwise a hard "file structure doesn't match kit"
  error.
- Each non-blank mark parses to an integer 1-4 (else that cell is a row error).

### Attribution note

Imported scores are attributed to the **admin** who ran the import (the `scores`
row stores a single `scoredByProfileId`), not the teacher who filled the sheet.
Accepted trade-off for v1.

## Frontend

- React 19 / react-router 7 / Tailwind, matching existing pages.
- **Export**: a "Download grade workbook" button on the admin class view
  (`ClassDetail`). Builds the .xlsx with **`write-excel-file`** (multi-sheet +
  1-4 dropdown data validation; write-only — imports are CSV).
- **Import**: a new admin page — file picker → parse CSV → call
  `scores.validateImport` → preview table (new marks, changed old → new,
  absent/observation changes, and a skipped-rows list with reasons) → "Apply"
  button calling `scores.applyImport`.
- **CSV parsing**: a small tested util that handles quoted commas/newlines — no
  heavy dependency.

## Dependencies

- Add **`write-excel-file`** (export side only).
- Reuse existing `jszip` only if needed; not required by this design.

## Testing

- Unit (vitest, pure functions — the bulk of the coverage):
  - CSV parse util (quoted fields, commas, newlines, trailing newline).
  - Header criterion-id token parsing + position fallback.
  - Mark validation (1-4, blank, out-of-range, non-numeric).
  - `buildImportPlan` diff/error generation across: new marks, changed marks,
    blank = no change, absent toggles, unknown/foreign student, kit-structure
    mismatch.
- Workbook builder: a small test asserting tab count = curriculum kits and
  header layout per tab (data shaping is pure; xlsx bytes are not asserted).

## Open questions

None outstanding. Workbook format decided: multi-tab .xlsx via `write-excel-file`.
