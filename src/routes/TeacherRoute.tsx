// src/routes/TeacherRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import AppShell from "../components/AppShell";
import SchoolSetupForm from "../components/SchoolSetupForm";

export default function TeacherRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  const location = useLocation();
  // First-login gate: teachers must fill school details before anything else.
  // Single-user (LMS only) accounts skip it — they never register classes.
  const school = useQuery(
    api.school.getMine,
    profile?.role === "teacher" && !profile.lmsOnly ? {} : "skip",
  );
  if (isLoading)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (profile === null)
    return (
      <div className="p-6 text-sm text-ink-muted">Setting up profile…</div>
    );
  if (profile.role === "student") return <Navigate to="/lms" replace />;
  if (profile.role === "teacher" && profile.lmsOnly) {
    // Single-user accounts only get the LMS.
    if (location.pathname !== "/courses")
      return <Navigate to="/courses" replace />;
    return <AppShell />;
  }
  if (profile.role === "teacher") {
    if (school === undefined)
      return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
    if (school === null) return <SchoolSetupForm />;
  }
  return <AppShell />;
}
