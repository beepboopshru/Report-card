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
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { StudentReportDoc, type ScoredKit } from "../components/StudentReportPdf";
import { buildReportZip, downloadBlob } from "../lib/buildReportZip";
import { shareReportCard } from "../lib/shareReportCard";
import { Share2 } from "lucide-react";
import { formatSessionKey } from "../../convex/lib/lmsCatalog";

const TONE_BG: Record<string, string> = {
  good: "bg-good-50 text-good-800",
  ok: "bg-ok-50 text-ok-800",
  warn: "bg-warn-50 text-warn-800",
  bad: "bg-bad-50 text-bad-800",
  neutral: "bg-surface-muted text-ink-subtle",
};

/** "1-4-3" → "L1·C4·S3" for compact column headers. */
function shortSessionLabel(key: string): string {
  const [year, grade, session] = key.split("-");
  if (!year || !grade || !session) return key;
  return `L${year}·C${grade}·${session === "0" ? "Intro" : `S${session}`}`;
}

export default function ClassReport() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const blocks = useQuery(api.scores.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const quizRows = useQuery(api.lms.quizScoresForClass, { classId: id });

  const [zipProgress, setZipProgress] = useState<{ done: number; total: number } | null>(null);

  if (!cls || !blocks || !kits || !quizRows)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  // Robotics evaluate tests: one column per LMS session anyone in the class
  // has submitted, joined to students by id.
  const sessionKeys = [...new Set(quizRows.map((r) => r.sessionKey))].sort(
    (a, b) => a.localeCompare(b, undefined, { numeric: true }),
  );
  const quizByStudent = new Map<string, Map<string, { score: number; total: number }>>();
  for (const r of quizRows) {
    let perStudent = quizByStudent.get(r.studentId);
    if (!perStudent) {
      perStudent = new Map();
      quizByStudent.set(r.studentId, perStudent);
    }
    perStudent.set(r.sessionKey, { score: r.score, total: r.total });
  }

  const cleaned = blocks.map((b) => ({
    student: { _id: b.student._id, name: b.student.name },
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

  type FullKit = {
    kit: { kitNumber: number; kitName: string; concept: string; category: string };
    rubric: { criteria: Array<{
      id: string; label: string; sub: string; c4: string; c3: string; c2: string; c1: string;
    }> };
    criterionScores: Record<string, number>;
    observations?: string;
    absent?: boolean;
    _id: string;
  };

  const fullBlocks: { student: { name: string; rollNo?: string }; scores: FullKit[] }[] =
    blocks.map((b) => ({
      student: { name: b.student.name, rollNo: b.student.rollNo },
      scores: b.scores
        .filter(
          (s): s is typeof s & { kit: NonNullable<typeof s.kit>; rubric: NonNullable<typeof s.rubric> } =>
            s.kit !== null && s.rubric !== null,
        )
        .map((s) => ({
          kit: {
            kitNumber: s.kit.kitNumber,
            kitName: s.kit.kitName,
            concept: s.kit.concept,
            category: s.kit.category,
          },
          rubric: { criteria: s.rubric.criteria },
          criterionScores: s.criterionScores,
          observations: s.observations,
          absent: s.absent ?? false,
          _id: s._id,
        })),
    }));

  async function downloadAllPerStudent() {
    setZipProgress({ done: 0, total: fullBlocks.length });
    const entries: { fileLabel: string; blob: Blob }[] = [];
    for (let i = 0; i < fullBlocks.length; i++) {
      const b = fullBlocks[i];
      const pdfRows: ScoredKit[] = b.scores.map((s) => ({
        kit: s.kit,
        rubric: s.rubric,
        criterionScores: s.criterionScores,
        observations: s.observations,
        absent: s.absent,
      }));
      const blob = await pdf(
        <StudentReportDoc studentName={b.student.name} className={cls!.name} scored={pdfRows} />,
      ).toBlob();
      const prefix = b.student.rollNo ?? String(i + 1).padStart(2, "0");
      entries.push({ fileLabel: `${prefix}-${b.student.name}`, blob });
      setZipProgress({ done: i + 1, total: fullBlocks.length });
    }
    const zip = await buildReportZip(entries);
    downloadBlob(zip, `${cls!.name.replace(/\s+/g, "_")}_report_cards.zip`);
    setZipProgress(null);
  }

  async function shareStudent(block: typeof fullBlocks[number]) {
    const pdfRows: ScoredKit[] = block.scores.map((s) => ({
      kit: s.kit,
      rubric: s.rubric,
      criterionScores: s.criterionScores,
      observations: s.observations,
      absent: s.absent,
    }));
    const blob = await pdf(
      <StudentReportDoc studentName={block.student.name} className={cls!.name} scored={pdfRows} />,
    ).toBlob();
    await shareReportCard({
      blob,
      filename: `${block.student.name.replace(/\s+/g, "_")}_report.pdf`,
      title: `${block.student.name} — Report card`,
      text: `${cls!.name} — Term report`,
    });
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Report" },
        ]}
        backTo={`/class/${id}`}
        backLabel={`Back to ${cls.name}`}
        title={`${cls.name} · Class report`}
        description={cls.academicYear}
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => downloadClassReport(cls.name, fullBlocks)}
              disabled={cleaned.length === 0}
            >
              <Download className="w-4 h-4" />
              Combined PDF
            </Button>
            <Button
              onClick={downloadAllPerStudent}
              disabled={!!zipProgress || cleaned.length === 0}
            >
              <Download className="w-4 h-4" />
              {zipProgress
                ? `Generating ${zipProgress.done}/${zipProgress.total}…`
                : "Per-student ZIP"}
            </Button>
          </>
        }
      />

      {cleaned.length === 0 ? (
        <EmptyState
          title="No students"
          description="Add students to this class to generate a report."
        />
      ) : kits.length === 0 && sessionKeys.length === 0 ? (
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
                  {sessionKeys.map((key, i) => (
                    <th
                      key={key}
                      className={`px-3 py-2.5 text-[11px] font-medium text-ink-muted border-b border-line/60 text-center min-w-[80px] whitespace-nowrap ${i === 0 ? "border-l border-line/60" : ""}`}
                      title={`Evaluate test — ${formatSessionKey(key)}`}
                    >
                      {shortSessionLabel(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cleaned.map((b, i) => {
                  const fullBlock = fullBlocks[i];
                  const byKit = new Map<string, (typeof b.scores)[number]>();
                  for (const s of b.scores)
                    byKit.set(String(s.kit.kitNumber), s);
                  return (
                    <tr key={i} className="border-b border-line/60 last:border-b-0">
                      <td className="sticky left-0 bg-surface px-4 py-2.5 font-medium text-ink border-r border-line/60 truncate max-w-[200px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate">{b.student.name}</span>
                          <button
                            onClick={() => shareStudent(fullBlock)}
                            className="text-ink-subtle hover:text-accent p-1 rounded transition-colors flex-shrink-0"
                            aria-label={`Share ${b.student.name}'s report`}
                            title="Share report card"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                      {sessionKeys.map((key, si) => {
                        const q = quizByStudent.get(b.student._id)?.get(key);
                        if (!q) {
                          return (
                            <td
                              key={key}
                              className={`px-3 py-2.5 text-center text-xs text-ink-subtle ${si === 0 ? "border-l border-line/60" : ""}`}
                            >
                              —
                            </td>
                          );
                        }
                        const tone = toneFromRatio(q.total ? q.score / q.total : 0);
                        return (
                          <td
                            key={key}
                            className={`px-1.5 py-1.5 text-center ${si === 0 ? "border-l border-line/60" : ""}`}
                          >
                            <span
                              className={`inline-block min-w-[44px] rounded px-2 py-1 text-xs font-medium ${TONE_BG[tone]}`}
                            >
                              {q.score}/{q.total}
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
