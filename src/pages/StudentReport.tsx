import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  downloadStudentReport,
  type ScoredKit,
} from "../components/StudentReportPdf";
import { totalOf, maxScore, gradeBand } from "../lib/totals";

export default function StudentReport() {
  const { classId, studentId } = useParams<{ classId: string; studentId: string }>();
  const sid = studentId as Id<"students">;
  const cls = useQuery(api.classes.get, { classId: classId as Id<"classes"> });
  const student = useQuery(api.students.get, { studentId: sid });
  const scored = useQuery(api.scores.listForStudent, { studentId: sid });

  if (!cls || !student || !scored)
    return <p className="text-sm text-gray-500">Loading…</p>;

  const filtered = scored.filter(
    (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
      s.kit !== null && s.rubric !== null,
  );

  const pdfRows: ScoredKit[] = filtered.map((s) => ({
    kit: {
      kitNumber: s.kit.kitNumber,
      kitName: s.kit.kitName,
      concept: s.kit.concept,
      category: s.kit.category,
    },
    rubric: { criteria: s.rubric.criteria },
    criterionScores: s.criterionScores,
    observations: s.observations,
  }));

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          { label: student.name },
        ]}
      />
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="font-serif text-2xl text-accent">{student.name} · Report</h1>
        <button
          onClick={() => downloadStudentReport(student.name, cls.name, pdfRows)}
          className="bg-accent text-white rounded-md px-4 py-1.5 text-sm"
        >
          Download PDF
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No assessments yet.</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((sk) => {
            const total = totalOf(sk.criterionScores);
            const max = maxScore(sk.rubric.criteria.length);
            const pct = max ? Math.round((total / max) * 100) : 0;
            return (
              <li key={sk._id} className="bg-white border rounded-xl p-4">
                <div className="flex justify-between mb-2 gap-2">
                  <div>
                    <div className="font-medium">
                      #{sk.kit.kitNumber} · {sk.kit.kitName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {sk.kit.concept} · {sk.kit.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-xl">
                      {total}
                      <span className="text-sm text-gray-400">/{max}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {pct}% · {gradeBand(pct)}
                    </div>
                  </div>
                </div>
                <ul className="text-xs text-gray-600 grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4">
                  {sk.rubric.criteria.map((c) => (
                    <li key={c.id} className="flex justify-between">
                      <span>{c.label}</span>
                      <span className="font-medium">
                        {sk.criterionScores[c.id] ?? "—"}/4
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
