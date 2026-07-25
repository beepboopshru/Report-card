// src/routes/TeacherRoute.tsx
import { Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import AppShell from "../components/AppShell";
import SchoolSetupForm from "../components/SchoolSetupForm";

export default function TeacherRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  // First-login gate: teachers must fill school details before anything else.
  const school = useQuery(
    api.school.getMine,
    profile?.role === "teacher" ? {} : "skip",
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
  if (profile.role === "teacher") {
    if (school === undefined)
      return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
    if (school === null) return <SchoolSetupForm />;
  }
  return <AppShell />;
}
