// Catalog of the ScienceUtsav robotics LMS hosted from
// https://github.com/Prem-things/SU_LMS_ROBOTICS (static GitHub Pages site).
// The site has no per-level URLs, so every level links to the same entry page.
export const LMS_BASE_URL = "https://prem-things.github.io/SU_LMS_ROBOTICS/";

export interface LmsLevel {
  id: string;
  name: string;
  classes: string;
  url: string;
}

export const LMS_LEVELS: LmsLevel[] = [
  {
    id: "level1",
    name: "Level 1 · Creative Automation",
    classes: "Classes 4–7",
    url: LMS_BASE_URL,
  },
  {
    id: "level2",
    name: "Level 2 · Sensational Sensors",
    classes: "Classes 6–9",
    url: LMS_BASE_URL,
  },
];

export const LMS_LEVEL_IDS = new Set(LMS_LEVELS.map((l) => l.id));
