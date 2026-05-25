import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import ScoreRow from "../components/ScoreRow";
import { useDebounce } from "../lib/useDebouncedMutation";
import { useEffect, useMemo, useState } from "react";
import { gradeBand, maxScore, scoredCount, totalOf } from "../lib/totals";

export default function ScoreSheet() {
  const { classId, studentId, kitId } = useParams<{
    classId: string;
    studentId: string;
    kitId: string;
  }>();
  const sid = studentId as Id<"students">;
  const kid = kitId as Id<"kits">;
  const cid = classId as Id<"classes">;

  const student = useQuery(api.students.get, { studentId: sid });
  const cls = useQuery(api.classes.get, { classId: cid });
  const kit = useQuery(api.kits.get, { kitId: kid });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kid });
  const score = useQuery(api.scores.get, { studentId: sid, kitId: kid });
  const upsert = useMutation(api.scores.upsert);

  const [criterionScores, setCriterionScores] = useState<Record<string, number>>({});
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (score === undefined) return;
    setCriterionScores(score?.criterionScores ?? {});
    setObservations(score?.observations ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score?._id]);

  const debouncedSave = useDebounce(
    (cs: Record<string, number>, obs: string) => {
      upsert({ studentId: sid, kitId: kid, criterionScores: cs, observations: obs });
    },
    500,
  );

  function setScore(criterionId: string, v: number) {
    setCriterionScores((prev) => {
      const next = { ...prev, [criterionId]: v };
      debouncedSave(next, observations);
      return next;
    });
  }

  function setObs(v: string) {
    setObservations(v);
    debouncedSave(criterionScores, v);
  }

  const total = useMemo(() => totalOf(criterionScores), [criterionScores]);
  const criteriaCount = rubric?.criteria.length ?? 6;
  const max = maxScore(criteriaCount);
  const pct = max ? Math.round((total / max) * 100) : 0;
  const scored = scoredCount(criterionScores, criteriaCount);

  if (!student || !cls || !kit || !rubric)
    return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          {
            label: student.name,
            to: `/class/${cls._id}/students/${student._id}/report`,
          },
          { label: kit.kitName },
        ]}
      />

      <header className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl text-accent">{kit.kitName}</h1>
          <p className="text-sm text-gray-500">
            #{kit.kitNumber} · {kit.concept} · {kit.category} · Grade {kit.grade}
          </p>
          <p className="text-sm mt-2">
            <span className="text-gray-500">Student:</span>{" "}
            <strong>{student.name}</strong>
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wide text-gray-500">Total</div>
          <div className="font-serif text-4xl">
            {total}
            <span className="text-base text-gray-400">/{max}</span>
          </div>
          <div className="text-xs text-gray-500">
            {scored === criteriaCount
              ? `${pct}% · ${gradeBand(pct)}`
              : `${scored} of ${criteriaCount} scored`}
          </div>
        </div>
      </header>

      {rubric.criteria.map((c) => (
        <ScoreRow
          key={c.id}
          criterion={c}
          score={criterionScores[c.id] ?? 0}
          onChange={(v) => setScore(c.id, v)}
        />
      ))}

      <section className="mt-6 bg-white border rounded-xl p-4">
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          Teacher observations
        </h3>
        <textarea
          rows={4}
          value={observations}
          onChange={(e) => setObs(e.target.value)}
          placeholder="Notes on this session, things to revisit, safety observations..."
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </section>
    </>
  );
}
