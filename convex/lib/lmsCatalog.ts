// Catalog of the ScienceUtsav robotics LMS. The site itself is vendored into
// public/lms (see public/lms/README.md); heavy assets are served from the
// upstream GitHub repo via jsDelivr.
export interface LmsLevel {
  id: string;
  /** `year` URL param the vendored LMS uses for this level ("blix" is off-URL). */
  year: "1" | "2" | "blix";
  name: string;
  classes: string;
  /** `grade` URL params of the classes inside this level, in display order. */
  grades: string[];
  /**
   * kitNumber of the level's "Robotics" catalog kit (convex/seed/robotics.ts),
   * which carries the teacher-scoring rubric for this level's curriculum.
   */
  kitNumber: number;
}

export const LMS_LEVELS: LmsLevel[] = [
  {
    id: "level1",
    year: "1",
    name: "Level 1 · Creative Automation",
    classes: "Classes 4–7",
    grades: ["4", "5", "6", "7"],
    kitNumber: 101,
  },
  {
    id: "level2",
    year: "2",
    name: "Level 2 · Sensational Sensors",
    classes: "Classes 6–9",
    grades: ["6", "7", "8", "9"],
    kitNumber: 102,
  },
  {
    // Shared course: no per-class split, no 5E phases, no quiz. The single
    // pseudo-grade "all" keeps the level/grade/session assignment machinery
    // (teacherLevels rows, classLevels, session inheritance) working unchanged.
    id: "blix",
    year: "blix",
    name: "BLIX · Rack and Pinion",
    classes: "Shared course · 10 sessions",
    grades: ["all"],
    kitNumber: 0, // no robotics rubric kit for BLIX
  },
];

export const BLIX_LEVEL_ID = "blix";

/** BLIX session numbers ("1".."10"); no intro session, no 5E phases. */
export const BLIX_SESSIONS = Array.from({ length: 10 }, (_, i) =>
  String(i + 1),
);

/**
 * "Class 4 · Class 5" for the levels, "Shared course" for BLIX.
 * `gradeNames` are per-school display overrides ("6" → "Class 5") for when a
 * higher-level course runs under the school's own class name.
 */
export function gradesLabel(
  level: LmsLevel,
  grades: string[],
  gradeNames?: Record<string, string>,
): string {
  if (level.id === BLIX_LEVEL_ID) return "Shared course · all classes";
  return grades.map((g) => gradeNames?.[g] ?? `Class ${g}`).join(" · ");
}

export const LMS_LEVEL_BY_ID = new Map(LMS_LEVELS.map((l) => [l.id, l]));

/** Sessions per LMS class; "0" is the common intro session. */
export const LMS_SESSIONS = Array.from({ length: 11 }, (_, i) => String(i));

/**
 * The 5 E's are assigned as two clubbed groups: the first three
 * (Engage · Explore · Explain) and the last two (Elaborate · Evaluate).
 * The vendored LMS maps these ids back to phases (main.js).
 */
export const PHASE_GROUPS = [
  { id: "core", label: "Engage · Explore · Explain" },
  { id: "extend", label: "Elaborate · Evaluate" },
] as const;
export type PhaseGroupId = (typeof PHASE_GROUPS)[number]["id"];

/** Per-session 5E selection inside an assigned grade. */
export interface SessionPick {
  grade: string;
  session: string;
  groups: string[];
}

/**
 * Entry URL for a level inside the vendored LMS (relative to the app origin).
 * `grades` restricts which classes the LMS shows (it reads the param and
 * filters its class cards); a single grade deep-links straight to its sessions.
 */
export function lmsLevelPath(
  level: LmsLevel,
  grades: string[] = level.grades,
  sessions?: SessionPick[],
  gradeNames?: Record<string, string>,
): string {
  if (level.id === BLIX_LEVEL_ID) {
    // BLIX is its own page; `sessions` (comma list of session numbers)
    // restricts which sessions its nav shows. Empty/absent = full course.
    const picked = sessions?.map((s) => s.session) ?? [];
    return `/lms/pages/blix.html${picked.length ? `?sessions=${picked.join(",")}` : ""}`;
  }
  // `years` locks the LMS to this level: backing out to its level picker
  // can't reach other levels. Each course card opens one level.
  const gradesParam = `&grades=${grades.join(",")}&years=${level.year}`;
  // JSON so main.js can parse it without a bespoke format. Grades with no
  // entries are unrestricted; an empty/absent list means the full course.
  const sessionsParam = sessions?.length
    ? `&sessions=${encodeURIComponent(JSON.stringify(sessions))}`
    : "&sessions=";
  // Per-school class-name overrides for the LMS's class cards and headers.
  // Empty clears any earlier override, mirroring the sessions param.
  const namesParam = `&gradeNames=${
    gradeNames && Object.keys(gradeNames).length
      ? encodeURIComponent(JSON.stringify(gradeNames))
      : ""
  }`;
  if (grades.length === 1) {
    return `/lms/index.html?panel=sessionSelect&year=${level.year}&grade=${grades[0]}${gradesParam}${sessionsParam}${namesParam}`;
  }
  return `/lms/index.html?panel=classSelect&year=${level.year}${gradesParam}${sessionsParam}${namesParam}`;
}

/** "1-4-3" → "Level 1 · Class 4 · Session 3" (session 0 is the intro session). */
export function formatSessionKey(sessionKey: string): string {
  const [year, grade, session] = sessionKey.split("-");
  if (!year || !grade || !session) return sessionKey;
  const label = session === "0" ? "Intro session" : `Session ${session}`;
  return `Level ${year} · Class ${grade} · ${label}`;
}
