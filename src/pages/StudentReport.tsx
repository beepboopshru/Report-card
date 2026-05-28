// src/pages/StudentReport.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  downloadStudentReport,
  type ScoredKit,
} from "../components/StudentReportPdf";
import { totalOf, maxScore, gradeBand } from "../lib/totals";

const SCORE_BADGE: Record<number, "good" | "ok" | "warn" | "bad" | "neutral"> = {
  4: "good",
  3: "ok",
  2: "warn",
  1: "bad",
  0: "neutral",
};

export default function StudentReport() {
  const { classId, studentId } = useParams<{ classId: string; studentId: string }>();
  const sid = studentId as Id<"students">;
  const cls = useQuery(api.classes.get, { classId: classId as Id<"classes"> });
  const student = useQuery(api.students.get, { studentId: sid });
  const scored = useQuery(api.scores.listForStudent, { studentId: sid });

  if (!cls || !student || !scored)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  const filtered = scored.filter(
    (s): s is typeof s & {
      kit: NonNullable<typeof s.kit>;
      rubric: NonNullable<typeof s.rubric>;
    } => s.kit !== null && s.rubric !== null,
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
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          { label: student.name },
        ]}
        title={`${student.name} · Report`}
        description={`Grade ${cls.grade} · ${cls.academicYear}`}
        actions={
          <Button
            onClick={() => downloadStudentReport(student.name, cls.name, pdfRows)}
            disabled={filtered.length === 0}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No assessments yet"
          description="Score this student against at least one kit to generate a report."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((sk) => {
            const total = totalOf(sk.criterionScores);
            const max = maxScore(sk.rubric.criteria.length);
            const pct = max ? Math.round((total / max) * 100) : 0;
            return (
              <li key={sk._id}>
                <Card>
                  <CardBody>
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="font-medium text-ink">
                          #{sk.kit.kitNumber} · {sk.kit.kitName}
                        </div>
                        <div className="text-xs text-ink-muted mt-0.5 inline-flex items-center gap-2">
                          <Badge tone={categoryTone(sk.kit.category)} size="sm">
                            {sk.kit.category}
                          </Badge>
                          {sk.kit.concept}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-2xl text-ink leading-none">
                          {total}
                          <span className="text-sm text-ink-subtle">/{max}</span>
                        </div>
                        <div className="text-xs text-ink-muted mt-1">
                          {pct}% · {gradeBand(pct)}
                        </div>
                      </div>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                      {sk.rubric.criteria.map((c) => {
                        const v = sk.criterionScores[c.id] ?? 0;
                        return (
                          <li
                            key={c.id}
                            className="flex items-center justify-between gap-2 text-xs"
                          >
                            <span className="text-ink-muted truncate">
                              {c.label}
                            </span>
                            <Badge tone={SCORE_BADGE[v]} size="sm">
                              {v > 0 ? `${v}/4` : "—"}
                            </Badge>
                          </li>
                        );
                      })}
                    </ul>
                    {sk.observations && (
                      <p className="text-xs text-ink-muted mt-3 italic border-t border-line/60 pt-3">
                        "{sk.observations}"
                      </p>
                    )}
                  </CardBody>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
