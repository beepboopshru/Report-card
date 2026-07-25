// Catalog of the ScienceUtsav robotics LMS. The site itself is vendored into
// public/lms (see public/lms/README.md); heavy assets are served from the
// upstream GitHub repo via jsDelivr.
export interface LmsLevel {
  id: string;
  /** `year` URL param the vendored LMS uses for this level. */
  year: "1" | "2";
  name: string;
  classes: string;
}

export const LMS_LEVELS: LmsLevel[] = [
  {
    id: "level1",
    year: "1",
    name: "Level 1 · Creative Automation",
    classes: "Classes 4–7",
  },
  {
    id: "level2",
    year: "2",
    name: "Level 2 · Sensational Sensors",
    classes: "Classes 6–9",
  },
];

export const LMS_LEVEL_IDS = new Set(LMS_LEVELS.map((l) => l.id));

/** Entry URL for a level inside the vendored LMS (relative to the app origin). */
export function lmsLevelPath(level: LmsLevel): string {
  return `/lms/index.html?panel=classSelect&year=${level.year}`;
}

/** "1-4-3" → "Level 1 · Class 4 · Session 3" (session 0 is the intro session). */
export function formatSessionKey(sessionKey: string): string {
  const [year, grade, session] = sessionKey.split("-");
  if (!year || !grade || !session) return sessionKey;
  const label = session === "0" ? "Intro session" : `Session ${session}`;
  return `Level ${year} · Class ${grade} · ${label}`;
}
