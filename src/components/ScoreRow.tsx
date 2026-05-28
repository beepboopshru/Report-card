// src/components/ScoreRow.tsx
type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

const PILL_INACTIVE: Record<number, string> = {
  4: "border-good-200 text-good-800 hover:bg-good-50",
  3: "border-ok-50 text-ok-800 hover:bg-ok-50",
  2: "border-warn-50 text-warn-800 hover:bg-warn-50",
  1: "border-bad-200 text-bad-800 hover:bg-bad-50",
};
const PILL_ACTIVE: Record<number, string> = {
  4: "bg-good-400 text-white border-good-600 shadow-sm",
  3: "bg-ok-400 text-white border-ok-600 shadow-sm",
  2: "bg-warn-400 text-white border-warn-600 shadow-sm",
  1: "bg-bad-600 text-white border-bad-800 shadow-sm",
};
const PANEL: Record<number, string> = {
  4: "bg-good-50 border-good-200 text-good-800",
  3: "bg-ok-50 border-ok-400/30 text-ok-800",
  2: "bg-warn-50 border-warn-400/30 text-warn-800",
  1: "bg-bad-50 border-bad-200 text-bad-800",
};
const LABEL: Record<number, string> = {
  4: "Outstanding",
  3: "Proficient",
  2: "Developing",
  1: "Beginning",
};

export default function ScoreRow({
  criterion,
  score,
  onChange,
}: {
  criterion: Criterion;
  score: number;
  onChange: (v: number) => void;
}) {
  const chosen = score >= 1 && score <= 4 ? (score as 1 | 2 | 3 | 4) : null;
  const chosenText = chosen
    ? criterion[`c${chosen}` as "c1" | "c2" | "c3" | "c4"]
    : null;

  return (
    <div className="bg-surface border border-line/60 rounded-xl p-5 mb-3 shadow-card">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-ink">{criterion.label}</div>
          <div className="text-xs text-ink-muted">{criterion.sub}</div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`w-11 h-10 rounded-lg border-2 text-sm font-semibold transition-all ${
                chosen === v ? PILL_ACTIVE[v] : PILL_INACTIVE[v] + " bg-surface"
              }`}
              aria-label={`Score ${v} — ${LABEL[v]}`}
              aria-pressed={chosen === v}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {chosen ? (
        <div
          className={`border rounded-lg px-4 py-3 text-sm leading-snug ${PANEL[chosen]}`}
        >
          <div className="text-[11px] uppercase tracking-wide font-medium opacity-80 mb-1">
            {chosen} · {LABEL[chosen]}
          </div>
          {chosenText}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`text-left text-xs leading-snug border rounded-lg px-3 py-2.5 transition-colors ${PANEL[v]} hover:brightness-95`}
            >
              <div className="text-[10px] uppercase tracking-wide font-semibold opacity-80 mb-1">
                {v} · {LABEL[v]}
              </div>
              {criterion[`c${v}` as "c1" | "c2" | "c3" | "c4"]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
