// src/pages/TeacherDashboard.tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Plus, ArrowRight, Users } from "lucide-react";
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
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(4);
  const [year, setYear] = useState("2025-26");
  const [showForm, setShowForm] = useState(false);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await create({ name: name.trim(), grade, academicYear: year });
    setName("");
    setShowForm(false);
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
            className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_auto] gap-3 items-end p-5"
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
            <FormField label="Grade">
              {(id) => (
                <Input
                  id={id}
                  type="number"
                  min={1}
                  max={12}
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
          <StatCard
            label="Curriculum"
            value="View kits"
            hint={
              <Link to="/admin/kits" className="text-accent hover:underline">
                Browse all kits →
              </Link>
            }
            icon={<Users className="w-5 h-5" />}
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
          {classes?.map((c) => (
            <li key={c._id}>
              <Link
                to={`/class/${c._id}`}
                className="group block bg-surface rounded-xl border border-line/60 shadow-card p-5 hover:shadow-pop hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      {c.name}
                    </div>
                    <div className="text-xs text-ink-muted mt-0.5">
                      Grade {c.grade} · {c.academicYear}
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
