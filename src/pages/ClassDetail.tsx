// src/pages/ClassDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useMemo, useState } from "react";
import { Plus, Trash2, FileText, BookOpen, Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { downloadStudentReport, type ScoredKit } from "../components/StudentReportPdf";

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const removeStudent = useMutation(api.students.remove);
  const convex = useConvex();
  const [name, setName] = useState("");
  const [scoringFor, setScoringFor] = useState<string | null>(null);
  const [downloadingFor, setDownloadingFor] = useState<string | null>(null);

  const studentScores = useQuery(
    api.scores.listForStudent,
    scoringFor ? { studentId: scoringFor as Id<"students"> } : "skip",
  );

  const scoredKitStatus = useMemo(() => {
    const map = new Map<string, "complete" | "partial">();
    if (!studentScores) return map;
    for (const s of studentScores) {
      if (s.absent) {
        map.set(s.kitId, "complete");
        continue;
      }
      const criteriaCount = s.rubric?.criteria?.length ?? 0;
      const validCount = Object.values(s.criterionScores).filter(
        (v) => typeof v === "number" && v >= 1 && v <= 4,
      ).length;
      if (criteriaCount > 0 && validCount >= criteriaCount) {
        map.set(s.kitId, "complete");
      } else if (validCount > 0) {
        map.set(s.kitId, "partial");
      }
    }
    return map;
  }, [studentScores]);

  if (!cls) return <p className="text-sm text-ink-muted">Loading…</p>;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await addStudent({ classId: id, name: name.trim() });
    setName("");
  }

  async function downloadFor(studentId: Id<"students">, studentName: string) {
    if (!cls) return;
    setDownloadingFor(studentId);
    try {
      const rows = await convex.query(api.scores.listForStudent, { studentId });
      const scored: ScoredKit[] = rows
        .filter(
          (s): s is typeof s & {
            kit: NonNullable<typeof s.kit>;
            rubric: NonNullable<typeof s.rubric>;
          } => s.kit !== null && s.rubric !== null,
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
        }));
      await downloadStudentReport(studentName, cls.name, scored);
    } finally {
      setDownloadingFor(null);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Classes", to: "/" }, { label: cls.name }]}
        backTo="/"
        backLabel="Back to classes"
        title={cls.name}
        description={`Grade ${cls.grade} · ${cls.academicYear}`}
        actions={
          <>
            <Link to={`/class/${id}/curriculum`}>
              <Button variant="secondary">
                <BookOpen className="w-4 h-4" />
                Curriculum
              </Button>
            </Link>
            <Link to={`/class/${id}/report`}>
              <Button>
                <FileText className="w-4 h-4" />
                Class report
              </Button>
            </Link>
          </>
        }
      />

      <Card className="mb-6">
        <CardHeader
          title="Curriculum"
          description={`${kits?.length ?? 0} kits attached`}
          action={
            <Link
              to={`/class/${id}/curriculum`}
              className="text-xs text-accent hover:underline"
            >
              Manage
            </Link>
          }
        />
        <CardBody padding="none">
          {kits && kits.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-muted text-center">
              No kits attached. Open "Manage" to add some.
            </p>
          ) : (
            <ul className="divide-y divide-line/60">
              {kits?.map((k) => (
                <li
                  key={k._id}
                  className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      #{k.kit!.kitNumber} · {k.kit!.kitName}
                    </div>
                    <div className="text-xs text-ink-muted truncate">
                      {k.kit!.concept}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge tone={categoryTone(k.kit!.category)} size="sm">
                      {k.kit!.category}
                    </Badge>
                    <Link to={`/class/${id}/kit/${k.kitId}/score`}>
                      <Button size="sm">Score class →</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Students"
          description={`${students?.length ?? 0} enrolled`}
        />
        <CardBody padding="none">
          <form onSubmit={add} className="px-5 py-3 flex gap-2 border-b border-line/60">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
            />
            <Button type="submit" size="md">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </form>
          {students && students.length === 0 ? (
            <EmptyState
              title="No students yet"
              description="Add students above to begin scoring."
            />
          ) : (
            <ul className="divide-y divide-line/60">
              {students?.map((s) => (
                <li
                  key={s._id}
                  className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink truncate">
                      {s.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {kits && kits.length > 0 && (
                      <div className="relative">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            setScoringFor(scoringFor === s._id ? null : s._id)
                          }
                        >
                          Score
                        </Button>
                        {scoringFor === s._id && (
                          <div className="absolute right-0 top-full mt-1 z-10 bg-surface border border-line rounded-lg shadow-pop w-64 max-h-80 overflow-y-auto py-1">
                            {kits.map((k) => {
                              const status = scoredKitStatus.get(k.kitId);
                              return (
                                <Link
                                  key={k._id}
                                  to={`/class/${id}/students/${s._id}/score/${k.kitId}`}
                                  onClick={() => setScoringFor(null)}
                                  className="block px-3 py-2 text-xs hover:bg-surface-muted"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="font-medium text-ink truncate">
                                      #{k.kit!.kitNumber} · {k.kit!.kitName}
                                    </div>
                                    {status === "complete" && (
                                      <Badge tone="good" size="sm" className="flex-shrink-0">
                                        ✓ Scored
                                      </Badge>
                                    )}
                                    {status === "partial" && (
                                      <Badge tone="warn" size="sm" className="flex-shrink-0">
                                        Partial
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-ink-muted">
                                    {k.kit!.category}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                    <Link to={`/class/${id}/students/${s._id}/report`}>
                      <Button variant="ghost" size="sm">
                        Report
                      </Button>
                    </Link>
                    <button
                      onClick={() => downloadFor(s._id, s.name)}
                      disabled={downloadingFor === s._id}
                      className="text-ink-subtle hover:text-accent p-1.5 rounded transition-colors disabled:opacity-50"
                      aria-label={`Download ${s.name}'s report`}
                      title="Download report card"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${s.name}?`))
                          removeStudent({ studentId: s._id });
                      }}
                      className="text-ink-subtle hover:text-danger p-1.5 rounded transition-colors"
                      aria-label={`Delete ${s.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </>
  );
}
