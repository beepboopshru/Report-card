// src/pages/ClassDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useMemo, useState } from "react";
import { Plus, Trash2, FileText, BookOpen, Download, Pencil, ArrowUp, ArrowDown, Upload, KeyRound } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { downloadStudentReport, type ScoredKit } from "../components/StudentReportPdf";
import {
  buildClassListTemplateBlob,
  buildCredentialsCsv,
  parseClassListCsv,
} from "../lib/classListSheet";
import { downloadBlob, sanitizeFilename } from "../lib/buildReportZip";

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const bulkCreate = useMutation(api.students.bulkCreate);
  const submitForApproval = useMutation(api.classes.submitForApproval);
  const removeStudent = useMutation(api.students.remove);
  const updateStudent = useMutation(api.students.update);
  const convex = useConvex();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [scoringFor, setScoringFor] = useState<string | null>(null);
  const [downloadingFor, setDownloadingFor] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Id<"students"> | null>(null);
  const [editStudentName, setEditStudentName] = useState("");
  const [editStudentRoll, setEditStudentRoll] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "rollNo">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

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

  async function downloadTemplate() {
    const blob = await buildClassListTemplateBlob();
    downloadBlob(blob, "class_list_template.xlsx");
  }

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const rows = parseClassListCsv(await file.text());
    if (rows.length === 0) {
      alert("No students found in that file. Expected columns: Name, Roll No.");
      return;
    }
    const result = await bulkCreate({ classId: id, rows });
    alert(
      `Imported ${result.added} student${result.added === 1 ? "" : "s"}` +
        (result.skipped > 0 ? ` (${result.skipped} skipped as duplicates/blank)` : "") +
        ".",
    );
  }

  async function onSubmitForApproval() {
    if (!confirm("Submit this class list for approval? An admin will then generate student logins.")) return;
    try {
      await submitForApproval({ classId: id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not submit");
    }
  }

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

      <Card className="mb-6">
        <CardHeader
          title="Class list & student logins"
          description="Upload your class list, submit it for approval, then hand out the generated logins."
          action={
            cls.status === "approved" ? (
              <Badge tone="good">Approved</Badge>
            ) : cls.status === "submitted" ? (
              <Badge tone="warn">Awaiting approval</Badge>
            ) : (
              <Badge>Draft</Badge>
            )
          }
        />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={downloadTemplate}>
              <Download className="w-4 h-4" />
              Sample sheet (.xlsx)
            </Button>
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-accent hover:underline px-2">
              <Upload className="w-4 h-4" />
              <span>Import class list (.csv)</span>
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={onImportFile}
              />
            </label>
            {cls.status !== "approved" && (
              <Button
                size="sm"
                onClick={onSubmitForApproval}
                disabled={cls.status === "submitted" || (students?.length ?? 0) === 0}
              >
                {cls.status === "submitted" ? "Submitted" : "Submit for approval"}
              </Button>
            )}
            {cls.status === "approved" && (
              <Button size="sm" onClick={downloadCredentials}>
                <KeyRound className="w-4 h-4" />
                Download student logins
              </Button>
            )}
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Fill the sample sheet, save it as CSV, and import it here. Once you
            submit, an admin approves the class and creates a login for every
            student.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Students"
          description={`${students?.length ?? 0} enrolled`}
          action={
            students && students.length > 1 ? (
              <div className="flex items-center gap-1 text-xs">
                <span className="text-ink-subtle">Sort:</span>
                {(["name", "rollNo"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleSort(key)}
                    className={`inline-flex items-center gap-0.5 px-2 py-1 rounded transition-colors ${
                      sortKey === key
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {key === "name" ? "Name" : "Roll no"}
                    {sortKey === key &&
                      (sortDir === "asc" ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      ))}
                  </button>
                ))}
              </div>
            ) : undefined
          }
        />
        <CardBody padding="none">
          <form onSubmit={add} className="px-5 py-3 flex flex-col sm:flex-row gap-2 border-b border-line/60">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
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
            <ul className="divide-y divide-line/60">
              {sortedStudents?.map((s) =>
                editingStudent === s._id ? (
                  <li key={s._id} className="px-5 py-3">
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
                  </li>
                ) : (
                <li
                  key={s._id}
                  className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink truncate">
                      {s.name}
                    </div>
                    {s.rollNo && (
                      <div className="text-xs text-ink-muted truncate">
                        Roll no. {s.rollNo}
                      </div>
                    )}
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
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
                ),
              )}
            </ul>
          )}
        </CardBody>
      </Card>
    </>
  );
}
