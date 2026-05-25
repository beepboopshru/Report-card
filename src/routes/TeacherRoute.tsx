import { Navigate, Outlet } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import TopBar from "../components/TopBar";

export default function TeacherRoute() {
  const { profile, isAuthenticated, isLoading } = useCurrentProfile();
  if (isLoading) return <div className="p-6 text-sm text-gray-500">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (profile === undefined) return <div className="p-6 text-sm text-gray-500">Loading...</div>;
  if (profile === null)
    return <div className="p-6 text-sm text-gray-500">Setting up profile…</div>;
  return (
    <>
      <TopBar />
      <main className="max-w-6xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </>
  );
}
