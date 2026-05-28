// src/pages/ClassDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState } from "react";
import { Plus, Trash2, FileText, BookOpen } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const removeStudent = useMutation(api.students.remove);
  const [name, setName] = useState("");
  const [scoringFor, setScoringFor] = useState<string | null>(null);

  if (!cls) return <p className="text-sm text-ink-muted">Loading…</p>;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await addStudent({ classId: id, name: name.trim() });
    setName("");
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Classes", to: "/" }, { label: cls.name }]}
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
                  <Badge tone={categoryTone(k.kit!.category)} size="sm">
                    {k.kit!.category}
                  </Badge>
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
                            {kits.map((k) => (
                              <Link
                                key={k._id}
                                to={`/class/${id}/students/${s._id}/score/${k.kitId}`}
                                onClick={() => setScoringFor(null)}
                                className="block px-3 py-2 text-xs hover:bg-surface-muted"
                              >
                                <div className="font-medium text-ink truncate">
                                  #{k.kit!.kitNumber} · {k.kit!.kitName}
                                </div>
                                <div className="text-[11px] text-ink-muted">
                                  {k.kit!.category}
                                </div>
                              </Link>
                            ))}
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
