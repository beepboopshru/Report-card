import { LMS_LEVEL_BY_ID, LMS_LEVELS } from "../../convex/lib/lmsCatalog";

export type LevelGrades = { levelId: string; grades: string[] };

export type LmsChange = {
  kind: "added" | "removed" | "changed";
  levelId: string;
  label: string;
  detail: string;
};

// BLIX's single pseudo-grade "all" isn't a class the admin picked.
export function gradesLabel(grades: string[]): string {
  if (grades.length === 1 && grades[0] === "all") return "whole course";
  const sorted = [...grades].sort((a, b) => Number(a) - Number(b));
  return `Class ${sorted.join(", ")}`;
}

const sameGrades = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");

/**
 * What changes if `after` is saved over `before`, in catalog order, so the
 * confirm step can spell out the effect before it hits students.
 */
export function diffLmsAssignment(
  before: LevelGrades[],
  after: LevelGrades[],
): LmsChange[] {
  const from = new Map(before.map((l) => [l.levelId, l.grades]));
  const to = new Map(after.map((l) => [l.levelId, l.grades]));
  const changes: LmsChange[] = [];
  for (const levelId of LMS_LEVELS.map((l) => l.id)) {
    const was = from.get(levelId);
    const now = to.get(levelId);
    const label = LMS_LEVEL_BY_ID.get(levelId)?.name ?? levelId;
    if (!was && now) {
      changes.push({ kind: "added", levelId, label, detail: gradesLabel(now) });
    } else if (was && !now) {
      changes.push({
        kind: "removed",
        levelId,
        label,
        detail: gradesLabel(was),
      });
    } else if (was && now && !sameGrades(was, now)) {
      changes.push({
        kind: "changed",
        levelId,
        label,
        detail: `${gradesLabel(now)} — was ${gradesLabel(was)}`,
      });
    }
  }
  return changes;
}
