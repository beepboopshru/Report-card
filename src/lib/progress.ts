export type Tone = "good" | "ok" | "warn" | "bad" | "neutral";

export function toneFromRatio(ratio: number): Tone {
  if (Number.isNaN(ratio)) return "neutral";
  if (ratio >= 0.9) return "good";
  if (ratio >= 0.67) return "ok";
  if (ratio >= 0.33) return "warn";
  return "bad";
}

export type Progress = { scored: number; total: number; ratio: number };

export function studentProgress(
  scoredKitIds: Set<string>,
  curriculumKitIds: string[],
): Progress {
  const total = curriculumKitIds.length;
  let scored = 0;
  for (const id of curriculumKitIds) if (scoredKitIds.has(id)) scored += 1;
  return { scored, total, ratio: total === 0 ? 0 : scored / total };
}

export function classProgress(
  scoredPairs: Set<string>, // formatted "studentId:kitId"
  studentIds: string[],
  kitIds: string[],
): Progress {
  const total = studentIds.length * kitIds.length;
  if (total === 0) return { scored: 0, total: 0, ratio: 0 };
  let scored = 0;
  for (const s of studentIds) {
    for (const k of kitIds) {
      if (scoredPairs.has(`${s}:${k}`)) scored += 1;
    }
  }
  return { scored, total, ratio: scored / total };
}

export function pairKey(studentId: string, kitId: string): string {
  return `${studentId}:${kitId}`;
}
