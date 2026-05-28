export type CriterionScores = Record<string, number>;

export function totalOf(scores: CriterionScores): number {
  return Object.values(scores).reduce((sum, v) => sum + (Number(v) || 0), 0);
}

export function maxScore(criteriaCount: number): number {
  return criteriaCount * 4;
}

export function scoredCount(scores: CriterionScores, criteriaCount: number): number {
  const ids = Object.keys(scores).filter((k) => scores[k] > 0);
  return Math.min(ids.length, criteriaCount);
}

export function gradeBand(
  pct: number,
): "Advanced" | "Proficient" | "Developing" | "Emerging" {
  if (pct >= 90) return "Advanced";
  if (pct >= 75) return "Proficient";
  if (pct >= 50) return "Developing";
  return "Emerging";
}

export type StudentScoreState = {
  criterionScores: CriterionScores;
  absent?: boolean;
};

export function isResolved(state: StudentScoreState, criterionId: string): boolean {
  if (state.absent) return true;
  const v = state.criterionScores[criterionId];
  return typeof v === "number" && v >= 1 && v <= 4;
}
