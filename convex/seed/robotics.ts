// Hand-written curriculum for the robotics LMS levels vendored in public/lms
// (see convex/lib/lmsCatalog.ts). One kit per level; kitNumbers 101+ stay
// clear of the auto-generated science-kit range in kits.ts/rubrics.ts.
import type { SeedRubricCriterion } from "./rubrics";

export type RoboticsSeedKit = {
  kitNumber: number;
  concept: string;
  kitName: string;
  category: "Robotics";
  subject: string;
  grade: number;
  description: string;
};

export type RoboticsSeedRubric = {
  kitNumber: number;
  category: "Robotics";
  kitName: string;
  criteria: SeedRubricCriterion[];
};

export const ROBOTICS_KITS: RoboticsSeedKit[] = [
  {
    kitNumber: 101,
    concept: "Creative Automation",
    kitName: "ROBOTICS LEVEL 1 · CREATIVE AUTOMATION",
    category: "Robotics",
    subject: "Robotics",
    grade: 4,
    description:
      "Level 1 of the ScienceUtsav robotics programme (Classes 4–7). Students build motorised machines and automations with the robotics kit, wiring circuits, assembling mechanisms, and programming simple behaviours across ten hands-on sessions. Each session ends with an Evaluate test inside the LMS; this rubric captures the teacher's in-class assessment of the same work.",
  },
  {
    kitNumber: 102,
    concept: "Sensational Sensors",
    kitName: "ROBOTICS LEVEL 2 · SENSATIONAL SENSORS",
    category: "Robotics",
    subject: "Robotics",
    grade: 6,
    description:
      "Level 2 of the ScienceUtsav robotics programme (Classes 6–9). Students work with light, sound, touch, and proximity sensors, reading sensor input in code to make their robots react to the world across ten hands-on sessions. Each session ends with an Evaluate test inside the LMS; this rubric captures the teacher's in-class assessment of the same work.",
  },
];

const sharedCriteria = (
  concept: string,
  conceptSub: string,
): SeedRubricCriterion[] => [
  {
    id: "following-instructions",
    label: "Following instructions",
    sub: "Procedural accuracy",
    c4: "Follows all steps in correct sequence independently, without reminders",
    c3: "Follows most steps correctly; needs one or two reminders",
    c2: "Follows steps with teacher guidance at several points",
    c1: "Unable to follow steps without continuous teacher support",
  },
  {
    id: "construction",
    label: "Construction quality",
    sub: "Build & assembly",
    c4: "Assembles the robot neatly and accurately; build works as intended on first try",
    c3: "Assembles adequately; minor adjustments needed; build works",
    c2: "Assembles with significant teacher help; build partially works",
    c1: "Unable to complete the build without continuous help; build fails",
  },
  {
    id: "circuit-connections",
    label: "Circuit connections",
    sub: "Electronics & wiring",
    c4: "Connects all components (battery, motors, sensors, board) correctly and can explain each connection",
    c3: "Connects components correctly with one or two fixes needed",
    c2: "Needs teacher guidance to complete or correct several connections",
    c1: "Cannot wire the circuit without the teacher doing it",
  },
  {
    id: "coding-logic",
    label: "Coding & logic",
    sub: "Programming the behaviour",
    c4: "Writes/assembles the program independently; predicts and explains what each part does",
    c3: "Completes the program with minor help; explains most of it",
    c2: "Completes the program only with step-by-step guidance",
    c1: "Cannot complete the program even with guidance",
  },
  {
    id: "concept-understanding",
    label: `Concept understanding — ${concept}`,
    sub: conceptSub,
    c4: `Accurately explains the ${concept} concept and connects it to a real-world application`,
    c3: `Explains the ${concept} concept with minor gaps`,
    c2: `Partially explains the ${concept} concept; needs prompting`,
    c1: `Cannot explain the ${concept} concept even with prompting`,
  },
  {
    id: "exploration",
    label: "Testing & debugging",
    sub: "Iterating when it doesn't work",
    c4: "Systematically tests, finds faults, and fixes them unprompted; tries improvements",
    c3: "Debugs with minor prompting; gets the build/program working",
    c2: "Attempts fixes only when directed; needs significant prompting",
    c1: "Gives up or waits for the teacher when something doesn't work",
  },
  {
    id: "communication",
    label: "Communicating findings",
    sub: "Verbal / written",
    c4: "Clearly communicates observations and conclusions using robotics vocabulary",
    c3: "Communicates findings adequately; uses some robotics vocabulary",
    c2: "Communicates in everyday language; limited robotics vocabulary",
    c1: "Cannot communicate findings clearly; very limited vocabulary",
  },
];

export const ROBOTICS_RUBRICS: RoboticsSeedRubric[] = [
  {
    kitNumber: 101,
    category: "Robotics",
    kitName: "ROBOTICS LEVEL 1 · CREATIVE AUTOMATION",
    criteria: sharedCriteria("Creative Automation", "Motors, mechanisms & automation"),
  },
  {
    kitNumber: 102,
    category: "Robotics",
    kitName: "ROBOTICS LEVEL 2 · SENSATIONAL SENSORS",
    criteria: sharedCriteria("Sensational Sensors", "Sensors & responsive machines"),
  },
];
