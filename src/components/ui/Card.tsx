import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface rounded-xl shadow-card border border-line/60 ${className}`}
      {...rest}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line/60 ${className}`}
    >
      <div className="min-w-0">
        <div className="text-sm font-medium text-ink truncate">{title}</div>
        {description && (
          <div className="text-xs text-ink-muted mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({
  className = "",
  padding = "md",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { padding?: "none" | "sm" | "md" | "lg" }) {
  const pad = {
    none: "",
    sm: "px-4 py-3",
    md: "px-5 py-4",
    lg: "px-6 py-6",
  }[padding];
  return <div className={`${pad} ${className}`} {...rest} />;
}
