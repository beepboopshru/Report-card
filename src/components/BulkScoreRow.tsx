import { useEffect, useRef } from "react";

const SCORE_STYLES: Record<number, string> = {
  4: "border-good-400 bg-good-50 text-good-800",
  3: "border-[#97C459] bg-ok-50 text-ok-800",
  2: "border-warn-400 bg-warn-50 text-warn-800",
  1: "border-bad-400 bg-bad-50 text-bad-800",
};

export default function BulkScoreRow({
  rollNo,
  name,
  currentScore,
  absent,
  focused,
  onScore,
  onAbsent,
  onFocus,
}: {
  rollNo: string;
  name: string;
  currentScore: number;
  absent: boolean;
  focused: boolean;
  onScore: (v: 1 | 2 | 3 | 4) => void;
  onAbsent: () => void;
  onFocus: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focused && ref.current?.scrollIntoView) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focused]);

  const settled = absent || currentScore > 0;

  return (
    <div
      ref={ref}
      data-focused={focused}
      onClick={onFocus}
      className={`flex items-center gap-3 px-4 py-2.5 border-b text-sm cursor-pointer ${
        focused
          ? "bg-warn-50 border-l-4 border-l-warn-400"
          : absent
            ? "opacity-70"
            : ""
      }`}
    >
      <div className="w-7 text-right text-gray-500 text-xs">{rollNo}</div>
      <div className="flex-1 font-medium">
        {name}
        {absent && <span className="text-xs text-gray-500 ml-2">· absent</span>}
      </div>
      <div className="flex gap-1.5">
        {[4, 3, 2, 1].map((v) => {
          const active = currentScore === v && !absent;
          return (
            <button
              key={v}
              aria-label={`Score ${v}`}
              aria-pressed={active}
              onClick={(e) => { e.stopPropagation(); onScore(v as 1 | 2 | 3 | 4); }}
              className={`w-9 h-8 rounded border text-xs font-medium transition ${
                active
                  ? SCORE_STYLES[v] + " border-2"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {v}
            </button>
          );
        })}
        <button
          aria-label={absent ? "Unmark absent" : "Mark absent"}
          aria-pressed={absent}
          onClick={(e) => { e.stopPropagation(); onAbsent(); }}
          className={`w-9 h-8 rounded border text-xs ${
            absent
              ? "bg-gray-700 text-white border-gray-800"
              : "border-dashed border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          ✕
        </button>
      </div>
      <div className="w-4 text-right">
        {settled && <span data-testid="settled-check" className="text-good-600">✓</span>}
      </div>
    </div>
  );
}
