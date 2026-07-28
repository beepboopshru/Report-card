import { useState } from "react";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Download, Upload } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { parseCsv } from "../lib/csv";
import { buildWorkbookBlob } from "../lib/gradeWorkbook";
import { downloadBlob, sanitizeFilename } from "../lib/buildReportZip";

type Preview = {
  className: string;
  kitName: string;
  diffs: {
    studentId: string;
    name: string;
    rollNo?: string;
    markChanges: { criterionId: string; label: string; from: number | null; to: number }[];
    absentChange?: { from: boolean; to: boolean };
    observationChange?: { from: string; to: string };
  }[];
  errors: { row: number; studentId?: string; reason: string }[];
};

export default function AdminGrades() {
  const convex = useConvex();
  const classes = useQuery(api.classes.listAllForAdmin);
  const applyImport = useMutation(api.scores.applyImport);

  const [exportClassId, setExportClassId] = useState<string>("");
  const [exporting, setExporting] = useState(false);

  const [grid, setGrid] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function doExport() {
    if (!exportClassId) return;
    setExporting(true);
    setError(null);
    try {
      const data = await convex.query(api.scores.exportClassGrades, {
        classId: exportClassId as Id<"classes">,
      });
      const blob = await buildWorkbookBlob(data);
      downloadBlob(blob, `${sanitizeFilename(data.className)}_grades.xlsx`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPreview(null);
    setDone(null);
    setError(null);
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    const parsed = parseCsv(text);
    setGrid(parsed);
    setBusy(true);
    try {
      const result = await convex.query(api.scores.validateImport, { grid: parsed });
      setPreview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this file");
    } finally {
      setBusy(false);
    }
  }

  async function onApply() {
    if (!grid) return;
    setBusy(true);
    setError(null);
    try {
      const res = await applyImport({ grid });
      setDone(`Imported ${res.applied} student${res.applied === 1 ? "" : "s"}; skipped ${res.skipped}.`);
      setPreview(null);
      setGrid(null);
      setFileName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Grade sheets"
        description="Export a class workbook for offline marking, then import the filled-in CSV."
        backTo="/admin"
        backLabel="Back to admin"
      />

      <Card className="mb-6">
        <CardHeader title="Export workbook" description="One tab per kit, pre-filled with students and any existing marks." />
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={exportClassId}
              onChange={(e) => setExportClassId(e.target.value)}
              className="flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="">Select a class…</option>
              {classes?.filter((c) => !c.archived).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} · {c.academicYear} ({c.teacherName})
                </option>
              ))}
            </select>
            <Button onClick={doExport} disabled={!exportClassId || exporting}>
              <Download className="w-4 h-4" />
              {exporting ? "Preparing…" : "Download workbook"}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Import marks (CSV)" description="Download one kit's tab as CSV from Google Sheets, then upload it here." />
        <CardBody>
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-accent hover:underline">
            <Upload className="w-4 h-4" />
            <span>{fileName || "Choose a CSV file"}</span>
            <input type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
          </label>

          {busy && <p className="mt-3 text-sm text-ink-muted">Working…</p>}
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
          {done && <p className="mt-3 text-sm text-good-600">{done}</p>}

          {preview && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{preview.className}</span> · {preview.kitName}
              </p>

              {preview.errors.length > 0 && (
                <div className="rounded-lg border border-danger/40 bg-danger/5 p-3">
                  <p className="text-xs font-medium text-danger mb-1">
                    {preview.errors.length} row(s) will be skipped:
                  </p>
                  <ul className="text-xs text-ink-muted list-disc pl-4 space-y-0.5">
                    {preview.errors.map((er, i) => (
                      <li key={i}>Row {er.row}: {er.reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {preview.diffs.length === 0 ? (
                <p className="text-sm text-ink-muted">No changes detected.</p>
              ) : (
                <ul className="divide-y divide-line/60 border border-line/60 rounded-lg">
                  {preview.diffs.map((d) => (
                    <li key={d.studentId} className="px-4 py-2 text-sm">
                      <div className="font-medium text-ink">
                        {d.name}{d.rollNo ? ` · ${d.rollNo}` : ""}
                      </div>
                      <div className="text-xs text-ink-muted">
                        {d.markChanges.map((m) => (
                          <span key={m.criterionId} className="mr-3">
                            {m.label}: {m.from ?? "—"} → {m.to}
                          </span>
                        ))}
                        {d.absentChange && <span className="mr-3">Absent: {String(d.absentChange.to)}</span>}
                        {d.observationChange && <span className="mr-3">Observations updated</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <Button onClick={onApply} disabled={busy || preview.diffs.length === 0}>
                Apply {preview.diffs.length} change{preview.diffs.length === 1 ? "" : "s"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
