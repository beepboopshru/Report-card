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
import { LMS_LEVELS } from "../../convex/lib/lmsCatalog";

export default function AdminClasses() {
  const classes = useQuery(api.classes.listAllForAdmin);
  const approveClass = useAction(api.enrollment.approveClass);
  const setClassLevels = useMutation(api.lms.setClassLevels);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function onApprove(classId: Id<"classes">, className: string) {
    if (
      !confirm(
        `Approve "${className}" and create a login for every student without one?`,
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

  async function toggleLevel(
    classId: Id<"classes">,
    current: string[],
    levelId: string,
  ) {
    const next = current.includes(levelId)
      ? current.filter((l) => l !== levelId)
      : [...current, levelId];
    await setClassLevels({ classId, levelIds: next });
  }

  return (
    <>
      <PageHeader
        title="Classes"
        description="Approve class lists, assign LMS levels, and keep an eye on the numbers."
      />

      {classes && classes.length === 0 ? (
        <EmptyState
          title="No classes yet"
          description="Classes appear here once teachers create them."
        />
      ) : (
        <div className="space-y-4">
          {classes?.map((c) => (
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

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <fieldset className="flex flex-wrap items-center gap-4">
                    <legend className="sr-only">LMS levels for {c.name}</legend>
                    <span className="text-xs uppercase tracking-wide text-ink-subtle font-semibold">
                      LMS
                    </span>
                    {LMS_LEVELS.map((level) => (
                      <label
                        key={level.id}
                        className="inline-flex items-center gap-1.5 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={c.levelIds.includes(level.id)}
                          onChange={() => toggleLevel(c._id, c.levelIds, level.id)}
                        />
                        {level.name}
                      </label>
                    ))}
                  </fieldset>
                  <Button
                    size="sm"
                    onClick={() => onApprove(c._id, c.name)}
                    disabled={busyId === c._id || c.studentCount === 0}
                    loading={busyId === c._id}
                  >
                    {c.status === "approved"
                      ? "Create missing logins"
                      : "Approve & create logins"}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
