import { QueryCtx, MutationCtx } from "../_generated/server";
import { Id, Doc } from "../_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

export async function requireProfile(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();
  if (!profile) throw new Error("Profile missing — sign out and back in");
  return profile;
}

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const p = await requireProfile(ctx);
  if (p.role !== "admin") throw new Error("Admin only");
  return p;
}

export async function requireTeacher(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"profiles">> {
  const p = await requireProfile(ctx);
  if (p.role !== "teacher" && p.role !== "admin") throw new Error("Teacher only");
  return p;
}

/** Throws if the calling profile doesn't own the class. Admins are allowed. */
export async function requireOwnsClass(
  ctx: QueryCtx | MutationCtx,
  classId: Id<"classes">,
): Promise<{ profile: Doc<"profiles">; cls: Doc<"classes"> }> {
  const profile = await requireProfile(ctx);
  const cls = await ctx.db.get(classId);
  if (!cls) throw new Error("Class not found");
  if (profile.role !== "admin" && cls.teacherProfileId !== profile._id) {
    throw new Error("Not your class");
  }
  return { profile, cls };
}

export function isAdminEmail(email: string): boolean {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
