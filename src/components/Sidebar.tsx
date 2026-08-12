// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  Boxes,
  Sprout,
  LogOut,
  BookOpen,
} from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { profile } = useCurrentProfile();
  const { signOut } = useAuthActions();
  const isAdmin = profile?.role === "admin";
  const lmsOnly = profile?.lmsOnly === true;
  const initials = (profile?.displayName || profile?.username || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="h-full flex flex-col bg-surface border-r border-line">
      <div className="px-5 py-5">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 font-serif text-accent-deep text-lg"
        >
          <span className="w-7 h-7 rounded-md bg-accent text-white inline-flex items-center justify-center text-sm font-sans">
            SU
          </span>
          Classroom
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wide text-ink-subtle font-semibold">
          {lmsOnly ? "Learn" : "Teach"}
        </div>
        {!lmsOnly && (
          <>
            <SidebarNavItem
              to="/"
              icon={Home}
              label="Classes"
              end
              onClick={onNavigate}
            />
            <SidebarNavItem
              to="/reports"
              icon={FileText}
              label="Reports"
              onClick={onNavigate}
            />
          </>
        )}
        <SidebarNavItem
          to="/courses"
          icon={BookOpen}
          label="LMS"
          onClick={onNavigate}
        />

        {isAdmin && (
          <>
            <div className="px-3 pt-5 pb-1 text-[10px] uppercase tracking-wide text-ink-subtle font-semibold">
              Admin
            </div>
            <SidebarNavItem
              to="/admin"
              icon={Users}
              label="Schools / Teachers"
              end
              onClick={onNavigate}
            />
            <SidebarNavItem
              to="/admin/kits"
              icon={Boxes}
              label="Kits"
              onClick={onNavigate}
            />
            <SidebarNavItem
              to="/admin/seed"
              icon={Sprout}
              label="Seed"
              onClick={onNavigate}
            />
          </>
        )}
      </nav>

      {profile && (
        <div className="border-t border-line p-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-good-50 text-good-800 inline-flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-ink truncate">
                {profile.displayName || "Teacher"}
              </div>
              <div className="text-[11px] text-ink-subtle truncate">
                @{profile.username}
              </div>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="mt-1 w-full flex items-center gap-2 px-3 h-8 text-xs text-ink-muted hover:bg-surface-muted hover:text-ink rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
