// Catalog of the ScienceUtsav robotics LMS. The site itself is vendored into
// public/lms (see public/lms/README.md); heavy assets are served from the
// upstream GitHub repo via jsDelivr.
export interface LmsLevel {
  id: string;
  /** `year` URL param the vendored LMS uses for this level. */
  year: "1" | "2";
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
];

export const LMS_LEVEL_BY_ID = new Map(LMS_LEVELS.map((l) => [l.id, l]));

/**
 * Entry URL for a level inside the vendored LMS (relative to the app origin).
 * `grades` restricts which classes the LMS shows (it reads the param and
 * filters its class cards); a single grade deep-links straight to its sessions.
 */
export function lmsLevelPath(
  level: LmsLevel,
  grades: string[] = level.grades,
): string {
  const gradesParam = `&grades=${grades.join(",")}`;
  if (grades.length === 1) {
    return `/lms/index.html?panel=sessionSelect&year=${level.year}&grade=${grades[0]}${gradesParam}`;
  }
  return `/lms/index.html?panel=classSelect&year=${level.year}${gradesParam}`;
}

/** "1-4-3" → "Level 1 · Class 4 · Session 3" (session 0 is the intro session). */
export function formatSessionKey(sessionKey: string): string {
  const [year, grade, session] = sessionKey.split("-");
  if (!year || !grade || !session) return sessionKey;
  const label = session === "0" ? "Intro session" : `Session ${session}`;
  return `Level ${year} · Class ${grade} · ${label}`;
}
