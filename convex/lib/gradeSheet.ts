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
