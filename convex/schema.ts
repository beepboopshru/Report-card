import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  profiles: defineTable({
    userId: v.id("users"),
    username: v.string(),
    displayName: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher")),
    disabled: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_username", ["username"]),

  kits: defineTable({
    kitNumber: v.number(),
    concept: v.string(),
    kitName: v.string(),
    category: v.union(v.literal("Explorer"), v.literal("Discoverer")),
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
    grade: v.number(),
    academicYear: v.string(),
  }).index("by_teacher", ["teacherProfileId"]),

  students: defineTable({
    classId: v.id("classes"),
    name: v.string(),
    rollNo: v.optional(v.string()),
  }).index("by_class", ["classId"]),

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
