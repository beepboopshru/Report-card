// src/components/SidebarNavItem.tsx
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export default function SidebarNavItem({
  to,
  icon: Icon,
  label,
  end,
  onClick,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group flex items-center gap-2.5 px-3 h-9 rounded-md text-sm transition-colors relative",
          isActive
            ? "bg-good-50 text-good-800 font-medium"
            : "text-ink-muted hover:bg-surface-muted hover:text-ink",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              aria-hidden
              className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-accent"
            />
          )}
          <Icon
            className={`w-4 h-4 flex-shrink-0 ${
              isActive ? "text-accent" : "text-ink-subtle"
            }`}
          />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}
