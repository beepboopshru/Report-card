type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

const PILL: Record<number, string> = {
  4: "bg-good-50 text-good-800 border-good-200",
  3: "bg-ok-50 text-ok-800 border-[#97C459]",
  2: "bg-warn-50 text-warn-800 border-warn-400",
  1: "bg-bad-50 text-bad-800 border-bad-200",
};
const PILL_ACTIVE: Record<number, string> = {
  4: "bg-good-400 text-white border-good-600",
  3: "bg-ok-400 text-white border-ok-600",
  2: "bg-warn-400 text-white border-warn-600",
  1: "bg-bad-600 text-white border-bad-800",
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
  const cells: Array<{ key: "c4" | "c3" | "c2" | "c1"; cls: string }> = [
    { key: "c4", cls: "bg-good-50/40 text-good-800" },
    { key: "c3", cls: "bg-ok-50/40 text-ok-800" },
    { key: "c2", cls: "bg-warn-50/40 text-warn-800" },
    { key: "c1", cls: "bg-bad-50/40 text-bad-800" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_1fr_1fr_120px] bg-white border rounded-lg overflow-hidden mb-2 text-xs">
      <div className="bg-gray-50 border-r px-4 py-3">
        <div className="font-medium text-sm">{criterion.label}</div>
        <div className="text-xs text-gray-500">{criterion.sub}</div>
      </div>
      {cells.map(({ key, cls }) => (
        <div key={key} className={`${cls} border-r px-3 py-3 leading-snug`}>
          {criterion[key]}
        </div>
      ))}
      <div className="flex items-center justify-center bg-white px-2 py-2">
        <div className="grid grid-cols-2 gap-1 w-full">
          {[4, 3, 2, 1].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`h-7 rounded border text-xs font-medium transition ${
                score === v
                  ? PILL_ACTIVE[v] + " border-2"
                  : PILL[v] + " hover:scale-105"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
