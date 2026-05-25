import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "react-router-dom";
import { useCurrentProfile } from "../lib/useCurrentProfile";

export default function TopBar() {
  const { signOut } = useAuthActions();
  const { profile } = useCurrentProfile();

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="font-serif text-accent text-lg">
          ScienceUtsav · Report Card
        </Link>
        {profile && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            {profile.role === "admin" && (
              <Link to="/admin" className="text-accent hover:underline">Admin</Link>
            )}
            <span>{profile.email}</span>
            <button
              onClick={() => signOut()}
              className="text-xs border rounded px-3 py-1 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
