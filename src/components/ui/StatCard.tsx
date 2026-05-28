import type { ReactNode } from "react";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="px-5 py-4 flex items-start gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-good-50 text-good-600 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wide text-ink-muted font-medium">
            {label}
          </div>
          <div className="font-serif text-3xl text-ink mt-1 leading-none">
            {value}
          </div>
          {hint && (
            <div className="text-xs text-ink-subtle mt-2">{hint}</div>
          )}
        </div>
      </div>
    </Card>
  );
}
