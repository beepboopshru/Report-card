// src/pages/TeacherDashboard.tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Plus, ArrowRight, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FormField } from "../components/ui/FormField";
import { ProgressBar } from "../components/ui/ProgressBar";

export default function TeacherDashboard() {
  const classes = useQuery(api.classes.listMine);
  const create = useMutation(api.classes.create);
  const update = useMutation(api.classes.update);
  const remove = useMutation(api.classes.remove);
  const [name, setName] = useState("");
  const [year, setYear] = useState("2026-27");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"classes"> | null>(null);
  const [editName, setEditName] = useState("");
  const [editYear, setEditYear] = useState("");

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await create({ name: name.trim(), academicYear: year });
    setName("");
    setShowForm(false);
  }

  function startEdit(c: { _id: Id<"classes">; name: string; academicYear: string }) {
    setEditingId(c._id);
    setEditName(c.name);
    setEditYear(c.academicYear);
  }

  async function onSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId || !editName.trim()) return;
    await update({
      classId: editingId,
      name: editName.trim(),
      academicYear: editYear,
    });
    setEditingId(null);
  }

  const totalClasses = classes?.length ?? 0;

  return (
    <>
      <PageHeader
        title="Classes"
        description="Your classes, students, and curriculum."
        actions={
          <Button
            onClick={() => setShowForm((s) => !s)}
            variant={showForm ? "secondary" : "primary"}
          >
            {showForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="w-4 h-4" />
                New class
              </>
            )}
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <form
            onSubmit={onCreate}
            className="grid grid-cols-1 md:grid-cols-[1fr_140px_auto] gap-3 items-end p-5"
          >
            <FormField label="Name">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Grade 5A"
                />
              )}
            </FormField>
            <FormField label="Academic year">
              {(id) => (
                <Input
                  id={id}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              )}
            </FormField>
            <Button type="submit">Create</Button>
          </form>
        </Card>
      )}

      {totalClasses > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard
            label="Classes"
            value={totalClasses}
            icon={<GraduationCap className="w-5 h-5" />}
          />
          <StatCard
            label="Academic year"
            value={year}
            hint="Current term"
          />
        </div>
      )}

      {classes && classes.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No classes yet"
          description="Create your first class to add students and start scoring."
          action={
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              New class
            </Button>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {classes?.map((c) =>
            editingId === c._id ? (
              <li key={c._id}>
                <Card>
                  <form onSubmit={onSaveEdit} className="p-5 space-y-3">
                    <FormField label="Name">
                      {(id) => (
                        <Input
                          id={id}
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      )}
                    </FormField>
                    <FormField label="Academic year">
                      {(id) => (
                        <Input
                          id={id}
                          value={editYear}
                          onChange={(e) => setEditYear(e.target.value)}
                        />
                      )}
                    </FormField>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              </li>
            ) : (
              <li key={c._id} className="relative group">
                <Link
                  to={`/class/${c._id}`}
                  className="block bg-surface rounded-xl border border-line/60 shadow-card p-5 hover:shadow-pop hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-medium text-ink truncate">
                        {c.name}
                      </div>
                      <div className="text-xs text-ink-muted mt-0.5">
                        {c.academicYear}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-subtle group-hover:text-accent transition-colors" />
                  </div>
                  <ProgressBar
                    value={0}
                    max={0}
                    tone="auto"
                    className="mt-5"
                    caption="Open class to see progress"
                  />
                </Link>
                <div className="absolute top-3 right-9 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      startEdit(c);
                    }}
                    className="text-ink-subtle hover:text-accent p-1.5 rounded bg-surface/80 transition-colors"
                    aria-label={`Edit ${c.name}`}
                    title="Edit class"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        confirm(
                          `Delete ${c.name}? This also removes its students and scores.`,
                        )
                      )
                        remove({ classId: c._id });
                    }}
                    className="text-ink-subtle hover:text-danger p-1.5 rounded bg-surface/80 transition-colors"
                    aria-label={`Delete ${c.name}`}
                    title="Delete class"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </>
  );
}
