// src/routes/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import AppShell from "../components/AppShell";

export default function AdminRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (profile === null || profile.role !== "admin")
    return <Navigate to="/" replace />;
  return <AppShell />;
}
