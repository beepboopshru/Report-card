import { ConvexError } from "convex/values";
import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Id, Doc } from "../_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

export async function requireProfile(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Not authenticated");
  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();
  if (!profile) throw new ConvexError("Profile missing — sign out and back in");
  if (profile.disabled === true) throw new ConvexError("Account disabled");
  // Disabling a teacher/school account archives its classes: students in
  // those classes are locked out too, until the account is re-enabled.
  if (profile.role === "student" && profile.studentId) {
    const student = await ctx.db.get(profile.studentId);
    const cls = student && (await ctx.db.get(student.classId));
    const teacher = cls && (await ctx.db.get(cls.teacherProfileId));
    if (teacher?.disabled === true) throw new ConvexError("Account disabled");
  }
  return profile;
}

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const p = await requireProfile(ctx);
  if (p.role !== "admin") throw new ConvexError("Admin only");
  return p;
}

export async function requireTeacher(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const p = await requireProfile(ctx);
  if (p.role !== "teacher" && p.role !== "admin") throw new ConvexError("Teacher only");
  return p;
}

/** Throws if the calling profile doesn't own the class. Admins are allowed. */
export async function requireOwnsClass(
  ctx: QueryCtx | MutationCtx,
  classId: Id<"classes">,
): Promise<{ profile: Doc<"profiles">; cls: Doc<"classes"> }> {
  const profile = await requireProfile(ctx);
  const cls = await ctx.db.get(classId);
  if (!cls) throw new ConvexError("Class not found");
  if (profile.role !== "admin" && cls.teacherProfileId !== profile._id) {
    throw new ConvexError("Not your class");
  }
  return { profile, cls };
}
