import {
  LMS_LEVELS,
  LMS_SESSIONS,
  PHASE_GROUPS,
  type LmsLevel,
  type SessionPick,
} from "../../convex/lib/lmsCatalog";

export type LevelAssignment = {
  levelId: string;
  grades: string[];
  sessions?: SessionPick[];
};

interface Props {
  value: LevelAssignment[];
  onChange: (next: LevelAssignment[]) => void;
  /** Render only these levels; entries for other levels pass through untouched. */
  levelIds?: string[];
}

const sessionLabel = (s: string) => (s === "0" ? "Intro" : s);

/**
 * Level → class → session → 5E picker for school-wide course assignment.
 * Per session the E's come as two clubbed toggles: Engage · Explore · Explain
 * and Elaborate · Evaluate. Everything on = full course (stored compactly as
 * "no session restriction").
 */
export default function CourseAssignmentPicker({
  value,
  onChange,
  levelIds,
}: Props) {
  const visibleLevels = levelIds
    ? LMS_LEVELS.filter((l) => levelIds.includes(l.id))
    : LMS_LEVELS;
  const isOn = (
    entry: LevelAssignment,
    grade: string,
    session: string,
    group: string,
  ) => {
    const gradeSessions =
      entry.sessions?.filter((s) => s.grade === grade) ?? [];
    if (gradeSessions.length === 0) return true; // no restriction = full course
    return gradeSessions.some(
      (s) => s.session === session && s.groups.includes(group),
    );
  };

  const toggleLevel = (level: LmsLevel) => {
    onChange(
      value.some((l) => l.levelId === level.id)
        ? value.filter((l) => l.levelId !== level.id)
        : [...value, { levelId: level.id, grades: level.grades }],
    );
  };

  const toggleGrade = (level: LmsLevel, grade: string) => {
    const entry = value.find((l) => l.levelId === level.id);
    if (!entry) return;
    const grades = entry.grades.includes(grade)
      ? entry.grades.filter((g) => g !== grade)
      : level.grades.filter((g) => entry.grades.includes(g) || g === grade);
    const sessions = entry.sessions?.filter((s) => grades.includes(s.grade));
    onChange(
      grades.length
        ? value.map((l) =>
            l.levelId === level.id
              ? {
                  ...l,
                  grades,
                  sessions: sessions?.length ? sessions : undefined,
                }
              : l,
          )
        : value.filter((l) => l.levelId !== level.id),
    );
  };

  const toggleCell = (
    level: LmsLevel,
    grade: string,
    session: string,
    group: string,
  ) => {
    const entry = value.find((l) => l.levelId === level.id);
    if (!entry) return;
    // Materialize this class's on/off grid, flip one cell, compact back.
    const on = new Set<string>();
    for (const s of LMS_SESSIONS)
      for (const g of PHASE_GROUPS)
        if (isOn(entry, grade, s, g.id)) on.add(`${s}|${g.id}`);
    const key = `${session}|${group}`;
    if (on.has(key)) {
      // Keep at least one selection — uncheck the class to remove it entirely.
      if (on.size === 1) return;
      on.delete(key);
    } else {
      on.add(key);
    }
    const full = on.size === LMS_SESSIONS.length * PHASE_GROUPS.length;
    const gradeSessions: SessionPick[] = full
      ? []
      : LMS_SESSIONS.flatMap((s) => {
          const groups = PHASE_GROUPS.map((g) => g.id as string).filter((g) =>
            on.has(`${s}|${g}`),
          );
          return groups.length ? [{ grade, session: s, groups }] : [];
        });
    const sessions = [
      ...(entry.sessions?.filter((s) => s.grade !== grade) ?? []),
      ...gradeSessions,
    ];
    onChange(
      value.map((l) =>
        l.levelId === level.id
          ? { ...l, sessions: sessions.length ? sessions : undefined }
          : l,
      ),
    );
  };

  return (
    <div className="space-y-3">
      {visibleLevels.map((level) => {
        const entry = value.find((l) => l.levelId === level.id);
        return (
          <fieldset key={level.id}>
            <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!entry}
                onChange={() => toggleLevel(level)}
              />
              {level.name}
            </label>
            {entry && (
              <div className="ml-6 mt-1.5 space-y-2.5">
                {level.grades.map((grade) => {
                  const selected = entry.grades.includes(grade);
                  return (
                    <div key={grade}>
                      <label className="inline-flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleGrade(level, grade)}
                        />
                        Class {grade}
                      </label>
                      {selected && (
                        <div className="ml-5 mt-1 space-y-1">
                          {PHASE_GROUPS.map((group) => (
                            <div
                              key={group.id}
                              className="flex flex-wrap items-center gap-1"
                            >
                              <span className="w-40 shrink-0 text-[11px] text-ink-subtle">
                                {group.label}
                              </span>
                              {LMS_SESSIONS.map((session) => {
                                const on = isOn(entry, grade, session, group.id);
                                return (
                                  <button
                                    key={session}
                                    type="button"
                                    aria-pressed={on}
                                    title={`${session === "0" ? "Intro session" : `Session ${session}`} — ${group.label}`}
                                    onClick={() =>
                                      toggleCell(level, grade, session, group.id)
                                    }
                                    className={`min-w-7 px-1 h-6 rounded border text-[11px] font-medium transition-colors ${
                                      on
                                        ? "border-accent bg-accent/10 text-accent-deep"
                                        : "border-line bg-surface text-ink-subtle hover:text-ink"
                                    }`}
                                  >
                                    {sessionLabel(session)}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
