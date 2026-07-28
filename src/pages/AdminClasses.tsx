import { useState } from "react";
import { Link } from "react-router-dom";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { LMS_LEVELS } from "../../convex/lib/lmsCatalog";

export default function AdminClasses() {
  const classes = useQuery(api.classes.listAllForAdmin);
  const approveClass = useAction(api.enrollment.approveClass);
  const resetClassPassword = useAction(api.enrollment.resetClassPassword);
  const recreateClassLogins = useAction(api.enrollment.recreateClassLogins);
  const setClassLevels = useMutation(api.lms.setClassLevels);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const years = [...new Set(classes?.map((c) => c.academicYear) ?? [])].sort();
  const q = search.trim().toLowerCase();
  const archived = classes?.filter((c) => c.archived) ?? [];
  const filtered = classes
    ?.filter((c) => !c.archived)
    .filter(
      (c) =>
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.teacherName.toLowerCase().includes(q)) &&
        (!statusFilter || c.status === statusFilter) &&
        (!yearFilter || c.academicYear === yearFilter),
    )
    // Awaiting-approval classes first, newest created first within each group.
    .sort(
      (a, b) =>
        Number(b.status === "submitted") - Number(a.status === "submitted") ||
        b._creationTime - a._creationTime,
    );

  async function onApprove(
    classId: Id<"classes">,
    className: string,
    declared: { students: number; sections: number; grades: number } | null,
  ) {
    const declaredLine = declared
      ? `The school's setup declares ${declared.students} students across ${declared.sections} grade-section${declared.sections === 1 ? "" : "s"} (${declared.grades} grade${declared.grades === 1 ? "" : "s"}). Match this against your sales record to proceed.`
      : "This school has not filled in its setup details yet, so there is no declared student count to match against your sales record.";
    if (
      !confirm(
        `Approve "${className}" and create a login for every student without one?\n\n${declaredLine}`,
      )
    )
      return;
    setBusyId(classId);
    try {
      const { created } = await approveClass({ classId });
      alert(
        created === 0
          ? "All students already have logins."
          : `Created ${created} student login${created === 1 ? "" : "s"}. The teacher can now download them from the class page.`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Approval failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onResetPassword(classId: Id<"classes">, className: string) {
    if (
      !confirm(
        `Give every student in "${className}" one new shared password?\n\nOld passwords stop working and students are signed out. The teacher can re-download the credential sheet afterwards.`,
      )
    )
      return;
    setBusyId(classId);
    try {
      const { password, updated } = await resetClassPassword({ classId });
      alert(
        `Set shared password for ${updated} student${updated === 1 ? "" : "s"}:\n\n${password}`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Password reset failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onRecreateLogins(classId: Id<"classes">, className: string) {
    if (
      !confirm(
        `Recreate ALL student logins in "${className}"?\n\nEvery existing login is deleted and rebuilt from the current roster: new usernames, one new shared password, all students signed out. Report card and quiz data is kept.\n\nThis cannot be undone.`,
      )
    )
      return;
    setBusyId(classId);
    try {
      const { created, password } = await recreateClassLogins({ classId });
      alert(
        `Recreated ${created} login${created === 1 ? "" : "s"}. New shared password:\n\n${password}\n\nThe teacher can re-download the credential sheet from the class page.`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Recreating logins failed");
    } finally {
      setBusyId(null);
    }
  }

  type LevelAssignment = { levelId: string; grades: string[] };

  async function toggleLevel(
    classId: Id<"classes">,
    current: LevelAssignment[],
    level: (typeof LMS_LEVELS)[number],
  ) {
    // Checking a level assigns all its classes; uncheck individual ones below.
    const next = current.some((l) => l.levelId === level.id)
      ? current.filter((l) => l.levelId !== level.id)
      : [...current, { levelId: level.id, grades: level.grades }];
    await setClassLevels({ classId, levels: next });
  }

  async function toggleGrade(
    classId: Id<"classes">,
    current: LevelAssignment[],
    level: (typeof LMS_LEVELS)[number],
    grade: string,
  ) {
    const entry = current.find((l) => l.levelId === level.id);
    if (!entry) return;
    const grades = entry.grades.includes(grade)
      ? entry.grades.filter((g) => g !== grade)
      : level.grades.filter((g) => entry.grades.includes(g) || g === grade);
    // Unchecking the last class unassigns the level.
    const next = grades.length
      ? current.map((l) => (l.levelId === level.id ? { ...l, grades } : l))
      : current.filter((l) => l.levelId !== level.id);
    await setClassLevels({ classId, levels: next });
  }

  return (
    <>
      <PageHeader
        title="Classes"
        description="Approve class lists, assign LMS levels, and keep an eye on the numbers."
      />

      {classes && classes.length > 0 && (
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <Input
            type="search"
            placeholder="Search by class or teacher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-line bg-surface px-3 py-2 text-sm"
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="submitted">Awaiting approval</option>
            <option value="approved">Approved</option>
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded border border-line bg-surface px-3 py-2 text-sm"
            aria-label="Filter by academic year"
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      {classes && classes.length === 0 ? (
        <EmptyState
          title="No classes yet"
          description="Classes appear here once teachers create them."
        />
      ) : filtered && filtered.length === 0 ? (
        <EmptyState
          title="No matching classes"
          description="Try a different search or clear the filters."
        />
      ) : (
        <div className="space-y-4">
          {filtered?.map((c) => (
            <Card key={c._id}>
              <CardHeader
                title={c.name}
                description={`${c.teacherName} · ${c.academicYear}`}
                action={
                  c.status === "approved" ? (
                    <Badge tone="good">Approved</Badge>
                  ) : c.status === "submitted" ? (
                    <Badge tone="warn">Awaiting approval</Badge>
                  ) : (
                    <Badge>Draft</Badge>
                  )
                }
              />
              <CardBody>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
                  <span>
                    <span className="font-medium text-ink">{c.studentCount}</span>{" "}
                    students
                  </span>
                  <span>
                    <span className="font-medium text-ink">{c.accountCount}</span>{" "}
                    logins
                  </span>
                  <span>
                    Declared:{" "}
                    <span className="font-medium text-ink">
                      {c.declared
                        ? `${c.declared.students} students · ${c.declared.sections} sections`
                        : "—"}
                    </span>
                  </span>
                  <span>
                    Avg score:{" "}
                    <span className="font-medium text-ink">
                      {c.avgScorePct === null ? "—" : `${c.avgScorePct}%`}
                    </span>
                  </span>
                  <Link
                    to={`/class/${c._id}/report`}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Class report
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                  <fieldset className="space-y-2">
                    <legend className="sr-only">LMS levels for {c.name}</legend>
                    <span className="text-xs uppercase tracking-wide text-ink-subtle font-semibold">
                      LMS
                    </span>
                    {LMS_LEVELS.map((level) => {
                      const assigned = c.lmsLevels.find(
                        (l) => l.levelId === level.id,
                      );
                      return (
                        <div key={level.id}>
                          <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!assigned}
                              onChange={() =>
                                toggleLevel(c._id, c.lmsLevels, level)
                              }
                            />
                            {level.name}
                          </label>
                          {assigned && (
                            <div className="ml-6 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                              {level.grades.map((grade) => (
                                <label
                                  key={grade}
                                  className="inline-flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={assigned.grades.includes(grade)}
                                    onChange={() =>
                                      toggleGrade(
                                        c._id,
                                        c.lmsLevels,
                                        level,
                                        grade,
                                      )
                                    }
                                  />
                                  Class {grade}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </fieldset>
                  <div className="flex flex-wrap gap-2">
                    {c.accountCount > 0 && (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onResetPassword(c._id, c.name)}
                          disabled={busyId === c._id}
                        >
                          New class password
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onRecreateLogins(c._id, c.name)}
                          disabled={busyId === c._id}
                        >
                          Recreate all logins
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      onClick={() => onApprove(c._id, c.name, c.declared)}
                      disabled={busyId === c._id || c.studentCount === 0}
                      loading={busyId === c._id}
                    >
                      {c.status === "approved"
                        ? "Create missing logins"
                        : "Approve & create logins"}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {archived.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm font-medium text-ink-muted hover:text-ink">
            Archived ({archived.length}) — classes of disabled accounts
          </summary>
          <div className="mt-3 space-y-2">
            {archived.map((c) => (
              <div
                key={c._id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-sm"
              >
                <div>
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="text-ink-muted">
                    {" "}
                    · {c.teacherName} · {c.academicYear} · {c.studentCount}{" "}
                    students
                  </span>
                </div>
                <Link
                  to={`/class/${c._id}/report`}
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Class report
                </Link>
              </div>
            ))}
          </div>
        </details>
      )}
    </>
  );
}
