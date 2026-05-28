import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  backTo,
  backLabel = "Back",
  actions,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`mb-8 ${className}`}>
      {backTo && (
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-accent transition-colors mb-2"
        >
          <ArrowLeft aria-hidden className="w-3.5 h-3.5" />
          {backLabel}
        </Link>
      )}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs crumbs={breadcrumbs} className="mb-3" />
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="font-serif text-[28px] leading-tight text-accent-deep text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-ink-muted mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
