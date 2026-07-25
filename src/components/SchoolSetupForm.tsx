import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { FormField } from "./ui/FormField";

type Row = { grade: string; section: string; attendance: string };

const emptyRow: Row = { grade: "", section: "", attendance: "" };

/** Blocking first-login setup: school details + one row per grade-section. */
export default function SchoolSetupForm() {
  const save = useMutation(api.school.save);
  const [address, setAddress] = useState("");
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [rows, setRows] = useState<Row[]>([{ ...emptyRow }]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const totalUnits = rows.reduce((n, r) => n + (parseInt(r.attendance, 10) || 0), 0);
  const totalGrades = new Set(rows.map((r) => r.grade.trim()).filter(Boolean)).size;

  function setRow(i: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await save({
        address: address.trim(),
        academicYear: academicYear.trim(),
        sections: rows.map((r) => ({
          grade: r.grade.trim(),
          section: r.section.trim(),
          attendance: parseInt(r.attendance, 10) || 0,
        })),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-sunken flex items-start justify-center p-6">
      <Card className="w-full max-w-2xl mt-10">
        <CardHeader
          title="Set up your school"
          description="A one-time step before you start"
        />
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-5">
            <p className="text-sm text-ink-muted">
              Tell us about your school: the address, and one row for every
              grade-section (e.g. Grade 5 · A) with the number of students
              attending it. Each grade-section is created as a class for you —
              no need to create them again.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
              <FormField label="School address">
                {(id) => (
                  <Input
                    id={id}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, city, pincode"
                  />
                )}
              </FormField>
              <FormField label="Academic year">
                {(id) => (
                  <Input
                    id={id}
                    required
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  />
                )}
              </FormField>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-medium uppercase tracking-wide text-ink-muted">
                Grade-sections and attendance
              </span>
              {rows.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_1fr_120px_auto] gap-2 items-center"
                >
                  <Input
                    required
                    value={r.grade}
                    onChange={(e) => setRow(i, { grade: e.target.value })}
                    placeholder="Grade (e.g. 5)"
                    aria-label={`Row ${i + 1} grade`}
                  />
                  <Input
                    required
                    value={r.section}
                    onChange={(e) => setRow(i, { section: e.target.value })}
                    placeholder="Section (e.g. A)"
                    aria-label={`Row ${i + 1} section`}
                  />
                  <Input
                    required
                    type="number"
                    min={0}
                    max={1000}
                    value={r.attendance}
                    onChange={(e) => setRow(i, { attendance: e.target.value })}
                    placeholder="Students"
                    aria-label={`Row ${i + 1} attendance`}
                  />
                  <button
                    type="button"
                    onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))}
                    disabled={rows.length === 1}
                    className="text-ink-subtle hover:text-danger p-1.5 rounded disabled:opacity-40"
                    aria-label={`Remove row ${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setRows((rs) => [...rs, { ...emptyRow }])}
              >
                <Plus className="w-4 h-4" />
                Add grade-section
              </Button>
            </div>

            <div className="rounded-lg border border-line/60 bg-surface-sunken p-4 text-sm text-ink-muted">
              <span className="font-medium text-ink">{totalUnits}</span> total
              students (units) across{" "}
              <span className="font-medium text-ink">{rows.length}</span>{" "}
              {rows.length === 1 ? "class" : "classes"} in{" "}
              <span className="font-medium text-ink">{totalGrades}</span>{" "}
              {totalGrades === 1 ? "grade" : "grades"}. This is the number of
              kids that will be in use.
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" loading={saving} disabled={saving}>
              Save and continue
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
