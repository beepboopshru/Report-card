import { errorMessage } from "../lib/errors";
import { useState } from "react";
import { LMS_LEVELS } from "../../convex/lib/lmsCatalog";
import {
  diffLmsAssignment,
  gradesLabel,
  type LevelGrades,
} from "../lib/lmsAssignmentDiff";
import { Button } from "./ui/Button";

/**
 * Assigns LMS courses to a single class. Edits are staged locally and shown
 * as a plain-English change list before saving — an unnoticed unassign here
 * silently removes content from every student in the class.
 */
export default function AssignClassLmsModal({
  className,
  current,
  allowed,
  onSave,
  onClose,
}: {
  className: string;
  current: LevelGrades[];
  /** Level → classes the parent account was granted; nothing else is offerable. */
  allowed: Map<string, string[]>;
  onSave: (levels: LevelGrades[]) => Promise<void>;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<LevelGrades[]>(current);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changes = diffLmsAssignment(current, draft);
  const levels = LMS_LEVELS.filter((l) => allowed.has(l.id));

  function toggleLevel(levelId: string, allowedGrades: string[]) {
    setDraft((d) =>
      d.some((l) => l.levelId === levelId)
        ? d.filter((l) => l.levelId !== levelId)
        : [...d, { levelId, grades: allowedGrades }],
    );
  }

  function toggleGrade(
    level: (typeof LMS_LEVELS)[number],
    grade: string,
    allowedGrades: string[],
  ) {
    setDraft((d) => {
      const entry = d.find((l) => l.levelId === level.id);
      if (!entry) return d;
      const grades = entry.grades.includes(grade)
        ? entry.grades.filter((g) => g !== grade)
        : level.grades.filter(
            (g) =>
              allowedGrades.includes(g) &&
              (entry.grades.includes(g) || g === grade),
          );
      // Unticking the last class unassigns the level outright.
      return grades.length
        ? d.map((l) => (l.levelId === level.id ? { ...l, grades } : l))
        : d.filter((l) => l.levelId !== level.id);
    });
  }

  async function onConfirm() {
    setBusy(true);
    setError(null);
    try {
      await onSave(draft);
      onClose();
    } catch (err) {
      setError(errorMessage(err, "Saving failed"));
      setBusy(false);
      setConfirming(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={busy ? undefined : onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-class-lms-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface rounded-lg shadow-pop"
      >
        <header className="px-5 py-4 border-b border-line/60">
          <h2
            id="assign-class-lms-title"
            className="font-serif text-lg text-accent-deep"
          >
            Assign LMS — {className}
          </h2>
          <p className="mt-1 text-xs text-ink-muted">
            {confirming
              ? "Check the changes below, then confirm."
              : "Pick the courses and classes this class can open. Nothing is saved until you confirm."}
          </p>
        </header>

        <div className="p-5 space-y-4">
          {confirming ? (
            <ul className="space-y-1.5 text-sm">
              {changes.map((c) => (
                <li key={c.levelId} className="flex gap-2">
                  <span
                    aria-hidden
                    className={
                      c.kind === "removed"
                        ? "text-danger"
                        : c.kind === "added"
                          ? "text-accent"
                          : "text-ink-muted"
                    }
                  >
                    {c.kind === "removed" ? "−" : c.kind === "added" ? "+" : "±"}
                  </span>
                  <span>
                    <span className="sr-only">{c.kind}: </span>
                    <span className="font-medium text-ink">{c.label}</span>{" "}
                    <span className="text-ink-muted">{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : levels.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Give the account LMS courses via "Manage LMS" first.
            </p>
          ) : (
            <fieldset className="space-y-3">
              <legend className="sr-only">LMS courses for {className}</legend>
              {levels.map((level) => {
                const allowedGrades = allowed.get(level.id)!;
                const assigned = draft.find((l) => l.levelId === level.id);
                return (
                  <div key={level.id}>
                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!assigned}
                        onChange={() => toggleLevel(level.id, allowedGrades)}
                      />
                      {level.name}
                    </label>
                    {/* BLIX's single pseudo-grade "all" needs no per-class row */}
                    {assigned && level.grades.length > 1 && (
                      <div className="ml-6 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        {level.grades
                          .filter((g) => allowedGrades.includes(g))
                          .map((grade) => (
                            <label
                              key={grade}
                              className="inline-flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={assigned.grades.includes(grade)}
                                onChange={() =>
                                  toggleGrade(level, grade, allowedGrades)
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
          )}

          {!confirming && changes.length > 0 && (
            <p className="text-xs text-ink-muted">
              {changes.length} change{changes.length === 1 ? "" : "s"} pending —
              currently assigned:{" "}
              {current.length
                ? current
                    .map((l) => gradesLabel(l.grades).toLowerCase())
                    .join(" · ")
                : "nothing"}
              .
            </p>
          )}
          {error && <p className="text-sm text-danger">{error}</p>}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={() => (confirming ? setConfirming(false) : onClose())}
            >
              {confirming ? "Back" : "Cancel"}
            </Button>
            {confirming ? (
              <Button onClick={onConfirm} loading={busy}>
                {busy ? "Saving…" : "Confirm"}
              </Button>
            ) : (
              <Button
                disabled={changes.length === 0}
                onClick={() => setConfirming(true)}
              >
                Review {changes.length || ""} change
                {changes.length === 1 ? "" : "s"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
