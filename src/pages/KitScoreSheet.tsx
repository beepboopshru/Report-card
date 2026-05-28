import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { isResolved } from "../lib/totals";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import CriterionHeader from "../components/CriterionHeader";
import BulkScoreRow from "../components/BulkScoreRow";

export default function KitScoreSheet() {
  const { classId, kitId } = useParams<{ classId: string; kitId: string }>();
  const cid = classId as Id<"classes">;
  const kid = kitId as Id<"kits">;
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const cIndex = Math.max(0, parseInt(params.get("c") ?? "0", 10) || 0);

  const cls = useQuery(api.classes.get, { classId: cid });
  const kit = useQuery(api.kits.get, { kitId: kid });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kid });
  const rows = useQuery(api.scores.listForClassAndKit, { classId: cid, kitId: kid });

  const setCriterion = useMutation(api.scores.setCriterion);
  const setAbsent = useMutation(api.scores.setAbsent);

  const [focusIndex, setFocusIndex] = useState(0);
  const [flashRow, setFlashRow] = useState<number | null>(null);

  const criteria = rubric?.criteria ?? [];
  const total = criteria.length;
  const criterion = criteria[cIndex];

  useEffect(() => {
    if (!rows || !criterion) return;
    const firstUnsettled = rows.findIndex((r) => !isResolved(r, criterion.id));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusIndex(firstUnsettled === -1 ? 0 : firstUnsettled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cIndex, rubric?._id]);

  const onPickScore = useCallback(
    (rowIdx: number, value: 1 | 2 | 3 | 4) => {
      if (!rows || !criterion) return;
      const row = rows[rowIdx];
      setCriterion({
        studentId: row.student._id,
        kitId: kid,
        criterionId: criterion.id,
        value,
      });
      setFlashRow(rowIdx);
      setTimeout(() => {
        setFlashRow(null);
        if (rowIdx < rows.length - 1) setFocusIndex(rowIdx + 1);
        else document.getElementById("next-criterion-btn")?.focus();
      }, 250);
    },
    [rows, criterion, kid, setCriterion],
  );

  const onToggleAbsent = useCallback(
    (rowIdx: number) => {
      if (!rows) return;
      const row = rows[rowIdx];
      setAbsent({ studentId: row.student._id, kitId: kid, absent: !row.absent });
      setFlashRow(rowIdx);
      setTimeout(() => {
        setFlashRow(null);
        if (rowIdx < rows.length - 1) setFocusIndex(rowIdx + 1);
        else document.getElementById("next-criterion-btn")?.focus();
      }, 250);
    },
    [rows, kid, setAbsent],
  );

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!rows || !criterion) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key >= "1" && e.key <= "4") {
        e.preventDefault();
        onPickScore(focusIndex, parseInt(e.key, 10) as 1 | 2 | 3 | 4);
      } else if (e.key === "0") {
        e.preventDefault();
        onToggleAbsent(focusIndex);
      } else if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setFocusIndex((i) => Math.min(rows.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "PageDown") {
        e.preventDefault();
        setFocusIndex((i) => Math.min(rows.length - 1, i + 10));
      } else if (e.key === "PageUp") {
        e.preventDefault();
        setFocusIndex((i) => Math.max(0, i - 10));
      } else if (e.key === "Escape") {
        navigate(`/class/${cid}`);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rows, criterion, focusIndex, onPickScore, onToggleAbsent, navigate, cid]);

  const onPrev = () => setParams({ c: String(Math.max(0, cIndex - 1)) });
  const onNext = () => setParams({ c: String(Math.min(total - 1, cIndex + 1)) });

  const settledCount = useMemo(() => {
    if (!rows || !criterion) return 0;
    return rows.filter((r) => isResolved(r, criterion.id)).length;
  }, [rows, criterion]);

  if (!cls || !kit || !rubric || !rows) return <p className="text-sm text-gray-500">Loading…</p>;
  if (rows.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No students in this class yet.{" "}
        <Link to={`/class/${cid}`} className="text-accent underline">
          Add students
        </Link>.
      </div>
    );
  }
  if (!criterion) {
    return <p className="text-sm text-bad-800">This kit has no rubric set up yet.</p>;
  }

  const allSettled = settledCount === rows.length && cIndex === total - 1;

  return (
    <>
      <Link
        to={`/class/${cls._id}`}
        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-accent transition-colors mb-2"
      >
        <ArrowLeft aria-hidden className="w-3.5 h-3.5" />
        Back to {cls.name}
      </Link>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          { label: `Kit #${kit.kitNumber} · ${kit.kitName}` },
        ]}
      />
      <h1 className="font-serif text-2xl text-accent mb-4">
        Score class — {kit.kitName}
      </h1>

      {allSettled ? (
        <CompletionSummary
          className={cls.name}
          kitName={kit.kitName}
          absentCount={rows.filter((r) => r.absent).length}
          classId={cid}
          onNextKit={() => navigate(`/class/${cid}`)}
        />
      ) : (
        <>
          <CriterionHeader
            criterion={criterion}
            index={cIndex}
            total={total}
            onPrev={onPrev}
            onNext={onNext}
          />
          <div className="bg-gray-50 px-4 py-1.5 text-xs text-gray-500 border-b hidden md:block">
            Keyboard: <b>1</b>–<b>4</b> score · <b>0</b> absent · <b>↓</b>/<b>↑</b> navigate · <b>Esc</b> exit
          </div>
          <div className="bg-white border-x">
            {rows.map((r, i) => (
              <BulkScoreRow
                key={r.student._id}
                rollNo={r.student.rollNo ?? String(i + 1)}
                name={r.student.name}
                currentScore={r.criterionScores[criterion.id] ?? 0}
                absent={r.absent}
                focused={i === focusIndex || flashRow === i}
                onScore={(v) => onPickScore(i, v)}
                onAbsent={() => onToggleAbsent(i)}
                onFocus={() => setFocusIndex(i)}
              />
            ))}
          </div>
          <div className="sticky bottom-0 bg-white border-t px-4 py-3">
            <div className="h-1.5 bg-gray-100 rounded overflow-hidden mb-1.5">
              <div
                className="h-full bg-good-400 transition-all"
                style={{ width: `${(settledCount / rows.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{settledCount} / {rows.length} settled</span>
              <button
                id="next-criterion-btn"
                onClick={onNext}
                disabled={cIndex >= total - 1}
                className="bg-accent text-white rounded px-3 py-1 text-xs disabled:opacity-40"
              >
                Next criterion →
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function CompletionSummary({
  className,
  kitName,
  absentCount,
  classId,
  onNextKit,
}: {
  className: string;
  kitName: string;
  absentCount: number;
  classId: Id<"classes">;
  onNextKit: () => void;
}) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center">
      <div className="text-2xl font-serif text-accent mb-2">All students settled ✓</div>
      <p className="text-sm text-gray-600 mb-4">
        {kitName} is fully scored for {className}.
        {absentCount > 0 && (
          <span className="block text-xs text-gray-500 mt-1">
            ({absentCount} marked absent)
          </span>
        )}
      </p>
      <div className="flex gap-2 justify-center">
        <Link to={`/class/${classId}`} className="border rounded px-4 py-1.5 text-sm">
          Back to class
        </Link>
        <Link to={`/class/${classId}/report`} className="border rounded px-4 py-1.5 text-sm">
          Class report →
        </Link>
        <button onClick={onNextKit} className="bg-accent text-white rounded px-4 py-1.5 text-sm">
          Score next kit →
        </button>
      </div>
    </div>
  );
}
