import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import { downloadClassReport } from "../components/ClassReportPdf";
import { totalOf, maxScore } from "../lib/totals";

export default function ClassReport() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const blocks = useQuery(api.scores.listForClass, { classId: id });

  if (!cls || !blocks) return <p className="text-sm text-gray-500">Loading…</p>;

  const cleaned = blocks.map((b) => ({
    student: { name: b.student.name },
    scores: b.scores
      .filter(
        (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
          s.kit !== null && s.rubric !== null,
      )
      .map((s) => ({
        kit: { kitNumber: s.kit.kitNumber, kitName: s.kit.kitName },
        rubric: { criteria: s.rubric.criteria.map((c) => ({ id: c.id })) },
        criterionScores: s.criterionScores,
        _id: s._id,
      })),
  }));

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Report" },
        ]}
      />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-2xl text-accent">{cls.name} · Class report</h1>
        <button
          onClick={() => downloadClassReport(cls.name, cleaned)}
          className="bg-accent text-white rounded-md px-4 py-1.5 text-sm"
        >
          Download all (PDF)
        </button>
      </div>

      <ul className="space-y-2">
        {cleaned.map((b, i) => (
          <li key={i} className="bg-white border rounded-xl p-4">
            <div className="font-medium mb-2">{b.student.name}</div>
            {b.scores.length === 0 ? (
              <p className="text-xs text-gray-500">No kits scored.</p>
            ) : (
              <ul className="text-xs text-gray-600 space-y-1">
                {b.scores.map((sk) => {
                  const total = totalOf(sk.criterionScores);
                  const max = maxScore(sk.rubric.criteria.length);
                  return (
                    <li key={sk._id} className="flex justify-between">
                      <span>
                        #{sk.kit.kitNumber} · {sk.kit.kitName}
                      </span>
                      <span className="font-medium">
                        {total}/{max}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
