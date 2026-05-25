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
): "Outstanding" | "Proficient" | "Developing" | "Beginning" {
  if (pct >= 90) return "Outstanding";
  if (pct >= 75) return "Proficient";
  if (pct >= 50) return "Developing";
  return "Beginning";
}
