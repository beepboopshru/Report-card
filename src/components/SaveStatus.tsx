// src/components/SaveStatus.tsx
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export type SaveState = "idle" | "saving" | "saved" | "error";

export default function SaveStatus({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  if (state === "saving")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Saving…
      </span>
    );
  if (state === "saved")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-good-600">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Saved
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-danger">
      <AlertCircle className="w-3.5 h-3.5" />
      Failed to save
    </span>
  );
}
