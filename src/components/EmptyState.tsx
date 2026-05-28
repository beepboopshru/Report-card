// src/components/EmptyState.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="bg-surface border border-dashed border-line-strong rounded-xl px-6 py-16 text-center">
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-good-50 text-good-600 inline-flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="font-serif text-xl text-ink">{title}</h3>
      <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto text-balance">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
