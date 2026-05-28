import { useState } from "react";

export type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

export default function CriterionHeader({
  criterion,
  index,
  total,
  onPrev,
  onNext,
}: {
  criterion: Criterion;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [open, setOpen] = useState(true);
  const atStart = index <= 0;
  const atEnd = index >= total - 1;

  return (
    <section className="sticky top-0 z-10 bg-white border-b">
      <div className="px-4 py-3 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">
            Criterion {index + 1} / {total}
          </div>
          <div className="font-medium text-sm">{criterion.label}</div>
          <div className="text-xs text-gray-500">{criterion.sub}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Prev criterion"
            onClick={onPrev}
            disabled={atStart}
            className="border rounded px-3 py-1.5 text-xs disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-xs text-gray-500 px-1">{index + 1} / {total}</span>
          <button
            aria-label="Next criterion"
            onClick={onNext}
            disabled={atEnd}
            className="bg-accent text-white rounded px-3 py-1.5 text-xs disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-4 py-1 text-xs text-accent hover:underline"
      >
        {open ? "hide descriptors ▴" : "show descriptors ▾"}
      </button>
      {open && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-4 pb-3 text-xs">
          <div className="bg-good-50 text-good-800 rounded px-2 py-1.5"><b>4</b> {criterion.c4}</div>
          <div className="bg-ok-50 text-ok-800 rounded px-2 py-1.5"><b>3</b> {criterion.c3}</div>
          <div className="bg-warn-50 text-warn-800 rounded px-2 py-1.5"><b>2</b> {criterion.c2}</div>
          <div className="bg-bad-50 text-bad-800 rounded px-2 py-1.5"><b>1</b> {criterion.c1}</div>
        </div>
      )}
    </section>
  );
}
