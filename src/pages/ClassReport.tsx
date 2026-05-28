// src/pages/ClassReport.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { downloadClassReport } from "../components/ClassReportPdf";
import { totalOf, maxScore } from "../lib/totals";
import { toneFromRatio } from "../lib/progress";

const TONE_BG: Record<string, string> = {
  good: "bg-good-50 text-good-800",
  ok: "bg-ok-50 text-ok-800",
  warn: "bg-warn-50 text-warn-800",
  bad: "bg-bad-50 text-bad-800",
  neutral: "bg-surface-muted text-ink-subtle",
};

export default function ClassReport() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const blocks = useQuery(api.scores.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });

  if (!cls || !blocks || !kits)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  const cleaned = blocks.map((b) => ({
    student: { name: b.student.name },
    scores: b.scores
      .filter(
        (s): s is typeof s & {
          kit: NonNullable<typeof s.kit>;
          rubric: NonNullable<typeof s.rubric>;
        } => s.kit !== null && s.rubric !== null,
      )
      .map((s) => ({
        kit: { kitNumber: s.kit.kitNumber, kitName: s.kit.kitName },
        rubric: { criteria: s.rubric.criteria.map((c) => ({ id: c.id })) },
        criterionScores: s.criterionScores,
        absent: s.absent ?? false,
        _id: s._id,
      })),
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Report" },
        ]}
        title={`${cls.name} · Class report`}
        description={`Grade ${cls.grade} · ${cls.academicYear}`}
        actions={
          <Button
            onClick={() => downloadClassReport(cls.name, cleaned)}
            disabled={cleaned.length === 0}
          >
            <Download className="w-4 h-4" />
            Download all (PDF)
          </Button>
        }
      />

      {cleaned.length === 0 ? (
        <EmptyState
          title="No students"
          description="Add students to this class to generate a report."
        />
      ) : kits.length === 0 ? (
        <EmptyState
          title="No curriculum"
          description="Attach kits to this class to start scoring."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-muted">
                  <th className="sticky left-0 bg-surface-muted text-left px-4 py-2.5 text-xs uppercase tracking-wide font-medium text-ink-muted border-b border-r border-line/60 min-w-[180px]">
                    Student
                  </th>
                  {kits.map((k) => (
                    <th
                      key={k._id}
                      className="px-3 py-2.5 text-[11px] font-medium text-ink-muted border-b border-line/60 text-center min-w-[80px]"
                      title={k.kit!.kitName}
                    >
                      #{k.kit!.kitNumber}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cleaned.map((b, i) => {
                  const byKit = new Map<string, (typeof b.scores)[number]>();
                  for (const s of b.scores)
                    byKit.set(String(s.kit.kitNumber), s);
                  return (
                    <tr key={i} className="border-b border-line/60 last:border-b-0">
                      <td className="sticky left-0 bg-surface px-4 py-2.5 font-medium text-ink border-r border-line/60 truncate max-w-[200px]">
                        {b.student.name}
                      </td>
                      {kits.map((k) => {
                        const s = byKit.get(String(k.kit!.kitNumber));
                        if (!s) {
                          return (
                            <td
                              key={k._id}
                              className="px-3 py-2.5 text-center text-xs text-ink-subtle"
                            >
                              —
                            </td>
                          );
                        }
                        if (s.absent) {
                          return (
                            <td key={k._id} className="px-1.5 py-1.5 text-center">
                              <span className="inline-block min-w-[44px] rounded px-2 py-1 text-xs font-medium text-bad-800">
                                Absent
                              </span>
                            </td>
                          );
                        }
                        const total = totalOf(s.criterionScores);
                        const max = maxScore(s.rubric.criteria.length);
                        const ratio = max ? total / max : 0;
                        const tone = toneFromRatio(ratio);
                        return (
                          <td key={k._id} className="px-1.5 py-1.5 text-center">
                            <span
                              className={`inline-block min-w-[44px] rounded px-2 py-1 text-xs font-medium ${TONE_BG[tone]}`}
                            >
                              {total}/{max}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
