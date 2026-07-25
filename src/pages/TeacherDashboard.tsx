// src/pages/TeacherDashboard.tsx
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  GraduationCap,
  Plus,
  ArrowRight,
  Pencil,
  Trash2,
  X,
  Download,
  Upload,
  Hourglass,
  ClipboardList,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FormField } from "../components/ui/FormField";
import { ProgressBar } from "../components/ui/ProgressBar";
import {
  buildClassListTemplateBlob,
  parseClassListCsv,
} from "../lib/classListSheet";
import { downloadBlob } from "../lib/buildReportZip";

type RosterRow = { name: string; rollNo?: string };

function RegisterClassDialog({ onClose }: { onClose: () => void }) {
  const register = useMutation(api.classes.register);
  const [name, setName] = useState("");
  const [year, setYear] = useState("2026-27");
  const [rows, setRows] = useState<RosterRow[]>([]);
  const [manualName, setManualName] = useState("");
  const [manualRoll, setManualRoll] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function downloadTemplate() {
    const blob = await buildClassListTemplateBlob();
    downloadBlob(blob, "class_list_template.xlsx");
  }

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const parsed = parseClassListCsv(await file.text());
    if (parsed.length === 0) {
      setError("No students found in that file. Expected columns: Name, Roll No.");
      return;
    }
    setError(null);
    setRows((rs) => {
      const seen = new Set(rs.map((r) => r.name.trim().toLowerCase()));
      const fresh = parsed.filter((r) => {
        const key = r.name.trim().toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return [...rs, ...fresh];
    });
  }

  function addManual(e: React.FormEvent) {
    e.preventDefault();
    const n = manualName.trim();
    if (!n) return;
    if (rows.some((r) => r.name.trim().toLowerCase() === n.toLowerCase())) {
      setError(`"${n}" is already in the list`);
      return;
    }
    setError(null);
    const roll = manualRoll.trim();
    setRows((rs) => [...rs, { name: n, rollNo: roll === "" ? undefined : roll }]);
    setManualName("");
    setManualRoll("");
  }

  async function onSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      await register({ name: name.trim(), academicYear: year, students: rows });
      onClose();
      alert(
        "Class submitted for approval. It will appear on your Classes page — with every student's login — once an admin approves it. Check \"Pending requests\" for its status.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-xl bg-surface rounded-lg shadow-pop max-h-[90vh] flex flex-col">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">Register a class</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="p-5 space-y-4 overflow-y-auto">
          <p className="text-sm text-ink-muted">
            Name the class, add its students (upload the filled sample sheet or
            type them in), and submit. An admin approves the class and creates a
            login for every student — only then does it appear in your classes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3">
            <FormField label="Class name">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Grade 5A"
                  title="The grade and section, e.g. Grade 5A"
                />
              )}
            </FormField>
            <FormField label="Academic year">
              {(id) => (
                <Input
                  id={id}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  title="School year this class runs in"
                />
              )}
            </FormField>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={downloadTemplate}
              title="Download an empty spreadsheet to fill in your class list"
            >
              <Download className="w-4 h-4" />
              Sample sheet (.xlsx)
            </Button>
            <label
              className="inline-flex items-center gap-2 cursor-pointer text-sm text-accent hover:underline px-2"
              title="Upload the filled sheet saved as CSV — columns: Name, Roll No"
            >
              <Upload className="w-4 h-4" />
              <span>Import class list (.csv)</span>
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={onImportFile}
              />
            </label>
          </div>

          <form onSubmit={addManual} className="flex flex-col sm:flex-row gap-2">
            <Input
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="Or add a student by name"
              className="flex-1"
            />
            <Input
              value={manualRoll}
              onChange={(e) => setManualRoll(e.target.value)}
              placeholder="Roll no (optional)"
              className="sm:w-40"
            />
            <Button type="submit" variant="secondary" size="md" title="Add this student to the list">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </form>

          {rows.length > 0 && (
            <div className="rounded-lg border border-line/60 max-h-56 overflow-y-auto">
              <ul className="divide-y divide-line/60 text-sm">
                {rows.map((r, i) => (
                  <li
                    key={`${r.name}-${i}`}
                    className="px-3 py-2 flex items-center justify-between gap-2"
                  >
                    <span className="min-w-0 truncate text-ink">
                      {r.name}
                      {r.rollNo && (
                        <span className="text-ink-muted"> · Roll {r.rollNo}</span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))}
                      className="text-ink-subtle hover:text-danger p-1 rounded"
                      aria-label={`Remove ${r.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <p className="text-sm text-danger">{error}</p>}
        </div>
        <footer className="px-5 py-4 border-t border-line/60 flex items-center justify-between gap-3">
          <span className="text-xs text-ink-muted">
            {rows.length} student{rows.length === 1 ? "" : "s"} in the list
          </span>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              loading={submitting}
              disabled={submitting || !name.trim() || rows.length === 0}
              title="Send this class to your admin for approval"
            >
              Submit for approval
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function PendingRequestsDialog({
  pending,
  onClose,
}: {
  pending: { _id: Id<"classes">; name: string; academicYear: string; status?: "submitted" | "approved" }[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">Pending requests</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="p-5">
          {pending.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Nothing waiting for approval. Registered classes show up on your
              Classes page as soon as an admin approves them.
            </p>
          ) : (
            <>
              <p className="text-sm text-ink-muted mb-3">
                These classes are waiting for admin approval. Once approved,
                each appears on your Classes page with student logins ready to
                download.
              </p>
              <ul className="divide-y divide-line/60 rounded-lg border border-line/60">
                {pending.map((c) => (
                  <li
                    key={c._id}
                    className="px-4 py-3 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-ink truncate">{c.name}</div>
                      <div className="text-xs text-ink-muted">{c.academicYear}</div>
                    </div>
                    <Badge tone="warn" size="sm">
                      <Hourglass className="w-3 h-3" />
                      Awaiting approval
                    </Badge>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  const classes = useQuery(api.classes.listMine);
  const update = useMutation(api.classes.update);
  const remove = useMutation(api.classes.remove);
  const [showRegister, setShowRegister] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [editingId, setEditingId] = useState<Id<"classes"> | null>(null);
  const [editName, setEditName] = useState("");
  const [editYear, setEditYear] = useState("");

  // Only approved classes appear on the dashboard; the rest sit in "Pending
  // requests" until an admin approves them.
  const approved = useMemo(
    () => classes?.filter((c) => c.status === "approved"),
    [classes],
  );
  const pending = useMemo(
    () => classes?.filter((c) => c.status !== "approved") ?? [],
    [classes],
  );

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

  const totalClasses = approved?.length ?? 0;

  return (
    <>
      <PageHeader
        title="Classes"
        description="Your approved classes. Register a new class to get student logins."
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowPending(true)}
              title="See which registered classes are still waiting for admin approval"
            >
              <Hourglass className="w-4 h-4" />
              Pending requests
              {pending.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-warn-50 text-warn-600 text-xs font-medium">
                  {pending.length}
                </span>
              )}
            </Button>
            <Button
              onClick={() => setShowRegister(true)}
              title="Upload your class list and submit it for approval — logins are generated when the admin approves"
            >
              <ClipboardList className="w-4 h-4" />
              Register a class
            </Button>
          </>
        }
      />

      {showRegister && <RegisterClassDialog onClose={() => setShowRegister(false)} />}
      {showPending && (
        <PendingRequestsDialog pending={pending} onClose={() => setShowPending(false)} />
      )}

      {totalClasses > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard
            label="Classes"
            value={totalClasses}
            icon={<GraduationCap className="w-5 h-5" />}
          />
          <StatCard
            label="Awaiting approval"
            value={pending.length}
            hint={pending.length > 0 ? "Check pending requests" : "All caught up"}
          />
        </div>
      )}

      {approved && approved.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title={pending.length > 0 ? "Waiting for approval" : "No classes yet"}
          description={
            pending.length > 0
              ? "Your registered class is with the admin. It appears here, with student logins, once approved."
              : "Register your class — upload the student list, submit it for approval, and it appears here with logins once approved."
          }
          action={
            pending.length > 0 ? (
              <Button variant="secondary" onClick={() => setShowPending(true)}>
                <Hourglass className="w-4 h-4" />
                View pending requests
              </Button>
            ) : (
              <Button onClick={() => setShowRegister(true)}>
                <ClipboardList className="w-4 h-4" />
                Register a class
              </Button>
            )
          }
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {approved?.map((c) =>
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
                    caption="Open class to see students & scores"
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
