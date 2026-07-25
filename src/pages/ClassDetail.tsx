// src/pages/ClassDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  FileText,
  BookOpen,
  Download,
  Pencil,
  ArrowUp,
  ArrowDown,
  KeyRound,
  X,
  ClipboardCheck,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { downloadStudentReport, type ScoredKit } from "../components/StudentReportPdf";
import { buildCredentialsCsv } from "../lib/classListSheet";
import { downloadBlob, sanitizeFilename } from "../lib/buildReportZip";
import { formatSessionKey } from "../../convex/lib/lmsCatalog";

type QuizRow = {
  studentId: Id<"students">;
  studentName: string;
  sessionKey: string;
  score: number;
  total: number;
  attempts: number;
};

function QuizScoresDialog({
  studentName,
  rows,
  onClose,
}: {
  studentName: string;
  rows: QuizRow[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">
            {studentName} · Quiz scores
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="p-5">
          {rows.length === 0 ? (
            <p className="text-sm text-ink-muted">
              No quiz submissions yet. Scores appear here when the student
              submits an evaluate quiz in the LMS.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle border-b border-line/60">
                  <th className="py-2 font-medium">Session</th>
                  <th className="py-2 font-medium">Score</th>
                  <th className="py-2 font-medium">Attempts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {rows.map((r) => (
                  <tr key={r.sessionKey}>
                    <td className="py-2.5 text-ink-muted">
                      {formatSessionKey(r.sessionKey)}
                    </td>
                    <td className="py-2.5 font-medium text-ink">
                      {r.score} / {r.total}
                    </td>
                    <td className="py-2.5 text-ink-muted">{r.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const quizScores = useQuery(api.lms.quizScoresForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const removeStudent = useMutation(api.students.remove);
  const updateStudent = useMutation(api.students.update);
  const convex = useConvex();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [scoringFor, setScoringFor] = useState<string | null>(null);
  const [downloadingFor, setDownloadingFor] = useState<string | null>(null);
  const [quizFor, setQuizFor] = useState<Id<"students"> | null>(null);
  const [editingStudent, setEditingStudent] = useState<Id<"students"> | null>(null);
  const [editStudentName, setEditStudentName] = useState("");
  const [editStudentRoll, setEditStudentRoll] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "rollNo">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const hasRobotics = kits?.some((k) => k.kit!.category === "Robotics") ?? false;

  const quizByStudent = useMemo(() => {
    const map = new Map<Id<"students">, QuizRow[]>();
    for (const r of quizScores ?? []) {
      const list = map.get(r.studentId) ?? [];
      list.push(r);
      map.set(r.studentId, list);
    }
    return map;
  }, [quizScores]);

  const sortedStudents = useMemo(() => {
    if (!students) return students;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...students].sort((a, b) => {
      const av = (sortKey === "name" ? a.name : a.rollNo) ?? "";
      const bv = (sortKey === "name" ? b.name : b.rollNo) ?? "";
      // Blank values always sort to the end, regardless of direction.
      if (av === "" && bv !== "") return 1;
      if (bv === "" && av !== "") return -1;
      return av.localeCompare(bv, undefined, { numeric: true }) * dir;
    });
  }, [students, sortKey, sortDir]);

  function toggleSort(key: "name" | "rollNo") {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

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

  async function downloadCredentials() {
    if (!cls) return;
    const rows = await convex.query(api.students.credentialsForClass, {
      classId: id,
    });
    const withLogins = rows.filter((r) => r.username !== "");
    if (withLogins.length === 0) {
      alert("No student logins yet — ask your admin to approve the class.");
      return;
    }
    const csv = buildCredentialsCsv(withLogins, `${location.origin}/sign-in`);
    downloadBlob(
      new Blob([csv], { type: "text/csv" }),
      `${sanitizeFilename(cls.name)}_student_logins.csv`,
    );
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const roll = rollNo.trim();
    await addStudent({
      classId: id,
      name: name.trim(),
      rollNo: roll === "" ? undefined : roll,
    });
    setName("");
    setRollNo("");
  }

  function startEditStudent(s: { _id: Id<"students">; name: string; rollNo?: string }) {
    setEditingStudent(s._id);
    setEditStudentName(s.name);
    setEditStudentRoll(s.rollNo ?? "");
  }

  async function saveStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!editingStudent || !editStudentName.trim()) return;
    const roll = editStudentRoll.trim();
    await updateStudent({
      studentId: editingStudent,
      name: editStudentName.trim(),
      rollNo: roll === "" ? undefined : roll,
    });
    setEditingStudent(null);
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

  const quizStudent = quizFor ? students?.find((s) => s._id === quizFor) : null;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Classes", to: "/" }, { label: cls.name }]}
        backTo="/"
        backLabel="Back to classes"
        title={cls.name}
        description={cls.academicYear}
        actions={
          <>
            {!hasRobotics && (
              <Link to={`/class/${id}/curriculum`}>
                <Button variant="secondary" title="Manage and score the kits attached to this class">
                  <BookOpen className="w-4 h-4" />
                  Curriculum
                </Button>
              </Link>
            )}
            <Link to={`/class/${id}/report`}>
              <Button title="The whole class's scores in one report">
                <FileText className="w-4 h-4" />
                Class report
              </Button>
            </Link>
          </>
        }
      />

      {quizFor && quizStudent && (
        <QuizScoresDialog
          studentName={quizStudent.name}
          rows={quizByStudent.get(quizFor) ?? []}
          onClose={() => setQuizFor(null)}
        />
      )}

      {cls.status !== "approved" && (
        <div className="mb-6 rounded-lg border border-line/60 bg-surface-sunken px-4 py-3 text-sm text-ink-muted">
          This class is awaiting admin approval — student logins appear here
          once it's approved.
        </div>
      )}

      <Card>
        <CardHeader
          title="Students"
          description={`${students?.length ?? 0} enrolled — logins, scores, and reports in one place`}
          action={
            cls.status === "approved" ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={downloadCredentials}
                title="Download every student's username and password as a CSV"
              >
                <KeyRound className="w-4 h-4" />
                Download logins
              </Button>
            ) : undefined
          }
        />
        <CardBody padding="none">
          <form
            onSubmit={add}
            className="px-6 py-4 flex flex-col sm:flex-row gap-2 border-b border-line/60"
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add a student (name)"
              className="flex-1"
            />
            <Input
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Roll no (optional)"
              className="sm:w-40"
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
            <div className="overflow-x-auto pb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-ink-subtle border-b border-line/60">
                    {(["name", "rollNo"] as const).map((key) => (
                      <th key={key} className="px-6 py-3 font-medium">
                        <button
                          type="button"
                          onClick={() => toggleSort(key)}
                          className={`inline-flex items-center gap-0.5 transition-colors ${
                            sortKey === key ? "text-accent" : "hover:text-ink"
                          }`}
                          title={`Sort by ${key === "name" ? "name" : "roll number"}`}
                        >
                          {key === "name" ? "Student" : "Roll no"}
                          {sortKey === key &&
                            (sortDir === "asc" ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            ))}
                        </button>
                      </th>
                    ))}
                    <th className="px-6 py-3 font-medium">Login</th>
                    <th className="px-6 py-3 font-medium">Password</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {sortedStudents?.map((s) =>
                    editingStudent === s._id ? (
                      <tr key={s._id}>
                        <td colSpan={5} className="px-5 py-3">
                          <form
                            onSubmit={saveStudent}
                            className="flex flex-col sm:flex-row sm:items-center gap-2"
                          >
                            <Input
                              value={editStudentName}
                              onChange={(e) => setEditStudentName(e.target.value)}
                              placeholder="Student name"
                              className="flex-1"
                            />
                            <Input
                              value={editStudentRoll}
                              onChange={(e) => setEditStudentRoll(e.target.value)}
                              placeholder="Roll no (optional)"
                              className="sm:w-40"
                            />
                            <div className="flex gap-2">
                              <Button type="submit" size="sm">
                                Save
                              </Button>
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => setEditingStudent(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    ) : (
                      <tr key={s._id}>
                        <td className="px-6 py-4 font-medium text-ink">
                          {s.name}
                        </td>
                        <td className="px-6 py-4 text-ink-muted">
                          {s.rollNo ?? "—"}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-ink-muted">
                          {s.username ?? "—"}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-ink-muted">
                          {s.initialPassword ?? "—"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setQuizFor(s._id)}
                              title="This student's LMS quiz scores, one row per session"
                            >
                              <ClipboardCheck className="w-3.5 h-3.5" />
                              Quizzes
                              {(quizByStudent.get(s._id)?.length ?? 0) > 0 && (
                                <span className="text-xs text-ink-subtle">
                                  ({quizByStudent.get(s._id)!.length})
                                </span>
                              )}
                            </Button>
                            {kits && kits.length > 0 && (
                              <div className="relative">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    setScoringFor(
                                      scoringFor === s._id ? null : s._id,
                                    )
                                  }
                                  title="Score this student on a kit"
                                >
                                  Score
                                </Button>
                                {scoringFor === s._id && (
                                  <div className="absolute right-0 top-full mt-1 z-10 bg-surface border border-line rounded-lg shadow-pop w-64 max-h-80 overflow-y-auto py-1 text-left">
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
                                              <Badge
                                                tone="good"
                                                size="sm"
                                                className="flex-shrink-0"
                                              >
                                                ✓ Scored
                                              </Badge>
                                            )}
                                            {status === "partial" && (
                                              <Badge
                                                tone="warn"
                                                size="sm"
                                                className="flex-shrink-0"
                                              >
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
                              <Button
                                variant="ghost"
                                size="sm"
                                title="View this student's report card"
                              >
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
                              onClick={() => startEditStudent(s)}
                              className="text-ink-subtle hover:text-accent p-1.5 rounded transition-colors"
                              aria-label={`Edit ${s.name}`}
                              title="Edit student"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${s.name}?`))
                                  removeStudent({ studentId: s._id });
                              }}
                              className="text-ink-subtle hover:text-danger p-1.5 rounded transition-colors"
                              aria-label={`Delete ${s.name}`}
                              title="Delete student"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
