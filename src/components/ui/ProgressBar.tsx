import { toneFromRatio, type Tone } from "../../lib/progress";

type Props = {
  value: number;
  max: number;
  tone?: Tone | "auto";
  size?: "sm" | "md";
  caption?: string;
  className?: string;
};

const FILL: Record<Tone, string> = {
  good: "bg-good-400",
  ok: "bg-ok-400",
  warn: "bg-warn-400",
  bad: "bg-bad-600",
  neutral: "bg-line-strong",
};

export function ProgressBar({
  value,
  max,
  tone = "auto",
  size = "md",
  caption,
  className = "",
}: Props) {
  const ratio = max === 0 ? 0 : Math.min(1, Math.max(0, value / max));
  const pct = Math.round(ratio * 100);
  const resolvedTone: Tone =
    tone === "auto" ? (max === 0 ? "neutral" : toneFromRatio(ratio)) : tone;
  const h = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full ${h} bg-line/60 rounded-full overflow-hidden`}
      >
        <div
          className={`${FILL[resolvedTone]} h-full rounded-full transition-[width] duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption && (
        <div className="text-xs text-ink-muted mt-1">{caption}</div>
      )}
    </div>
  );
}
