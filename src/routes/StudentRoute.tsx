// src/routes/StudentRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";

export default function StudentRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (profile === null)
    return (
      <div className="p-6 text-sm text-ink-muted">Setting up profile…</div>
    );
  if (profile.role !== "student") return <Navigate to="/" replace />;
  return <Outlet />;
}
