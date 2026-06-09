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
        error: "File mixes multiple classes or kits — import one kit’s tab at a time.",
      };
    }
  }
  return { classId, kitId };
}

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
      "Criterion columns do not match this kit’s rubric — re-export a fresh workbook and copy the marks across.",
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
