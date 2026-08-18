import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  profiles: defineTable({
    userId: v.id("users"),
    username: v.string(),
    displayName: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student"),
    ),
    disabled: v.optional(v.boolean()),
    // Single-user account: no classes/approval workflow, LMS access only.
    lmsOnly: v.optional(v.boolean()),
    // ponytail: plaintext by design, same as students.initialPassword —
    // admins view/share logins from /admin/logins. Only exposed via
    // admin-gated functions; editing the password overwrites it.
    initialPassword: v.optional(v.string()),
    // Set only for role "student" — links the login to the class-roster row.
    studentId: v.optional(v.id("students")),
  })
    .index("by_user", ["userId"])
    .index("by_username", ["username"]),

  // One row per teacher/school account, filled on first login.
  // `sections` is legacy from the old grade-section setup; new rows omit it.
  schoolDetails: defineTable({
    teacherProfileId: v.id("profiles"),
    address: v.string(),
    // First-login details; optional so legacy address-only rows validate.
    schoolName: v.optional(v.string()),
    principalName: v.optional(v.string()),
    coordinatorName: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    studentsRegistered: v.optional(v.number()),
    timings: v.optional(v.string()),
    sections: v.optional(
      v.array(
        v.object({
          grade: v.string(),
          section: v.string(),
          attendance: v.number(),
        }),
      ),
    ),
  }).index("by_teacher", ["teacherProfileId"]),

  kits: defineTable({
    kitNumber: v.number(),
    concept: v.string(),
    kitName: v.string(),
    category: v.union(
      v.literal("Explorer"),
      v.literal("Discoverer"),
      v.literal("Robotics"),
    ),
    subject: v.string(),
    grade: v.number(),
    description: v.string(),
  })
    .index("by_kitNumber_and_category", ["kitNumber", "category"])
    .index("by_category", ["category"]),

  rubrics: defineTable({
    kitId: v.id("kits"),
    criteria: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        sub: v.string(),
        c4: v.string(),
        c3: v.string(),
        c2: v.string(),
        c1: v.string(),
      }),
    ),
  }).index("by_kit", ["kitId"]),

  assignments: defineTable({
    teacherProfileId: v.id("profiles"),
    kitId: v.id("kits"),
  })
    .index("by_teacher", ["teacherProfileId"])
    .index("by_teacher_and_kit", ["teacherProfileId", "kitId"]),

  classes: defineTable({
    teacherProfileId: v.id("profiles"),
    name: v.string(),
    // Legacy field — no longer set on new classes; kept optional so existing
    // documents continue to validate.
    grade: v.optional(v.number()),
    academicYear: v.string(),
    // undefined = draft (teacher still editing the roster)
    status: v.optional(v.union(v.literal("submitted"), v.literal("approved"))),
    // Teacher asked for deletion; an admin must approve (or deny) it.
    deleteRequested: v.optional(v.boolean()),
  }).index("by_teacher", ["teacherProfileId"]),

  students: defineTable({
    classId: v.id("classes"),
    name: v.string(),
    rollNo: v.optional(v.string()),
    // Set when an admin approves the class and accounts are generated.
    userId: v.optional(v.id("users")),
    username: v.optional(v.string()),
    // ponytail: plaintext by design — teachers re-download credential sheets.
    // Only exposed via teacher/admin-gated functions; reset overwrites it.
    initialPassword: v.optional(v.string()),
  }).index("by_class", ["classId"]),

  // School-wide LMS course assignment, set by admin when creating the
  // school/teacher account (editable from the logins page). Class-specific
  // assignment lives in classLevels.
  teacherLevels: defineTable({
    teacherProfileId: v.id("profiles"),
    levelId: v.string(),
    grades: v.array(v.string()),
    // Per-session 5E selection: groups are "core" (Engage·Explore·Explain)
    // and "extend" (Elaborate·Evaluate). A grade with no entries here gets
    // the full course; a listed session shows only its chosen groups.
    // Bounded: ≤ 4 grades × 11 sessions per level.
    sessions: v.optional(
      v.array(
        v.object({
          grade: v.string(),
          session: v.string(),
          groups: v.array(v.string()),
        }),
      ),
    ),
    // Display-name override per grade ("6" → "Class 5") for when a school runs
    // a higher-level course under its own class name. Cosmetic only: grade
    // keys, session keys, and quiz scores keep the real grade.
    gradeNames: v.optional(v.record(v.string(), v.string())),
  }).index("by_teacher", ["teacherProfileId"]),

  classLevels: defineTable({
    classId: v.id("classes"),
    levelId: v.string(),
    // Selected LMS classes (grades) within the level; missing = all (legacy rows).
    grades: v.optional(v.array(v.string())),
  }).index("by_class", ["classId"]),

  // One row per student per LMS session quiz; keeps the student's best attempt.
  lmsScores: defineTable({
    studentId: v.id("students"),
    classId: v.id("classes"),
    // "<year>-<grade>-<session>" as used by the vendored LMS, e.g. "1-4-3"
    sessionKey: v.string(),
    score: v.number(),
    total: v.number(),
    mcqScore: v.number(),
    mcqTotal: v.number(),
    codeScore: v.number(),
    codeMax: v.number(),
    attempts: v.number(),
    updatedAt: v.number(),
  })
    .index("by_student_and_sessionKey", ["studentId", "sessionKey"])
    .index("by_class", ["classId"]),

  classKits: defineTable({
    classId: v.id("classes"),
    kitId: v.id("kits"),
    order: v.number(),
  })
    .index("by_class", ["classId"])
    .index("by_class_and_kit", ["classId", "kitId"]),

  scores: defineTable({
    studentId: v.id("students"),
    kitId: v.id("kits"),
    criterionScores: v.record(v.string(), v.number()),
    observations: v.optional(v.string()),
    absent: v.optional(v.boolean()),
    scoredByProfileId: v.id("profiles"),
    updatedAt: v.number(),
  })
    .index("by_student_and_kit", ["studentId", "kitId"])
    .index("by_student", ["studentId"]),
});
