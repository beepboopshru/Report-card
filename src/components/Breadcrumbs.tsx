import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export default function Breadcrumbs({
  crumbs,
  className = "",
}: {
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs text-ink-muted flex items-center flex-wrap gap-1 ${className}`}
    >
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight aria-hidden className="w-3 h-3 text-ink-subtle" />
          )}
          {c.to ? (
            <Link
              to={c.to}
              className="hover:text-accent transition-colors"
            >
              {c.label}
            </Link>
          ) : (
            <span className="text-ink">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
