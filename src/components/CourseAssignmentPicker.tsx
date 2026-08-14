import {
  BLIX_LEVEL_ID,
  BLIX_SESSIONS,
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
  /** Display override per grade ("6" → "Class 5"); content stays the same. */
  gradeNames?: Record<string, string>;
};

interface Props {
  value: LevelAssignment[];
  onChange: (next: LevelAssignment[]) => void;
  /** Render only these levels; entries for other levels pass through untouched. */
  levelIds?: string[];
}

const sessionLabel = (s: string) => (s === "0" ? "Intro" : s);

// ponytail: BLIX has one pseudo-grade "all", no 5E phases; a stored pick with
// groups ["core"] just means "this session is on".
const isBlix = (level: LmsLevel) => level.id === BLIX_LEVEL_ID;
const sessionsOf = (level: LmsLevel) =>
  isBlix(level) ? BLIX_SESSIONS : LMS_SESSIONS;
const groupsOf = (level: LmsLevel) =>
  isBlix(level) ? ["core"] : PHASE_GROUPS.map((g) => g.id as string);

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
    const gradeNames = entry.gradeNames
      ? Object.fromEntries(
          Object.entries(entry.gradeNames).filter(([g]) => grades.includes(g)),
        )
      : undefined;
    onChange(
      grades.length
        ? value.map((l) =>
            l.levelId === level.id
              ? {
                  ...l,
                  grades,
                  sessions: sessions?.length ? sessions : undefined,
                  gradeNames:
                    gradeNames && Object.keys(gradeNames).length
                      ? gradeNames
                      : undefined,
                }
              : l,
          )
        : value.filter((l) => l.levelId !== level.id),
    );
  };

  const setGradeName = (level: LmsLevel, grade: string, name: string) => {
    onChange(
      value.map((l) => {
        if (l.levelId !== level.id) return l;
        const gradeNames = { ...l.gradeNames };
        if (name) gradeNames[grade] = name;
        else delete gradeNames[grade];
        return {
          ...l,
          gradeNames: Object.keys(gradeNames).length ? gradeNames : undefined,
        };
      }),
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
    const allSessions = sessionsOf(level);
    const allGroups = groupsOf(level);
    const on = new Set<string>();
    for (const s of allSessions)
      for (const g of allGroups)
        if (isOn(entry, grade, s, g)) on.add(`${s}|${g}`);
    const key = `${session}|${group}`;
    if (on.has(key)) {
      // Keep at least one selection — uncheck the class to remove it entirely.
      if (on.size === 1) return;
      on.delete(key);
    } else {
      on.add(key);
    }
    const full = on.size === allSessions.length * allGroups.length;
    const gradeSessions: SessionPick[] = full
      ? []
      : allSessions.flatMap((s) => {
          const groups = allGroups.filter((g) => on.has(`${s}|${g}`));
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
            {entry && isBlix(level) && (
              <div className="ml-6 mt-1.5 flex flex-wrap items-center gap-1">
                <span className="w-40 shrink-0 text-[11px] text-ink-subtle">
                  Sessions
                </span>
                {BLIX_SESSIONS.map((session) => {
                  const on = isOn(entry, "all", session, "core");
                  return (
                    <button
                      key={session}
                      type="button"
                      aria-pressed={on}
                      title={`Session ${session}`}
                      onClick={() => toggleCell(level, "all", session, "core")}
                      className={`min-w-7 px-1 h-6 rounded border text-[11px] font-medium transition-colors ${
                        on
                          ? "border-accent bg-accent/10 text-accent-deep"
                          : "border-line bg-surface text-ink-subtle hover:text-ink"
                      }`}
                    >
                      {session}
                    </button>
                  );
                })}
              </div>
            )}
            {entry && !isBlix(level) && (
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
                        <span className="ml-3 inline-flex items-center gap-1 text-[11px] text-ink-subtle">
                          shown as
                          <input
                            type="text"
                            maxLength={60}
                            value={entry.gradeNames?.[grade] ?? ""}
                            placeholder={`Class ${grade}`}
                            title="Display name the school and students see; the course content stays the same."
                            onChange={(e) =>
                              setGradeName(level, grade, e.target.value)
                            }
                            className="w-24 h-6 px-1.5 rounded border border-line bg-surface text-[11px] text-ink placeholder:text-ink-subtle/60"
                          />
                        </span>
                      )}
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
