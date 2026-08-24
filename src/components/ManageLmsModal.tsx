import { errorMessage } from "../lib/errors";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/Button";
import CourseAssignmentPicker, {
  type LevelAssignment,
} from "./CourseAssignmentPicker";

/**
 * Edits the LMS courses assigned to a school/teacher or single-user account:
 * levels → classes → sessions → clubbed 5E groups.
 */
export default function ManageLmsModal({
  teacherProfileId,
  name,
  onClose,
}: {
  teacherProfileId: Id<"profiles">;
  name: string;
  onClose: () => void;
}) {
  const current = useQuery(api.lms.forTeacherProfile, { teacherProfileId });
  const setTeacherLevels = useMutation(api.lms.setTeacherLevels);
  const [edited, setEdited] = useState<LevelAssignment[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const value = edited ?? current;

  async function onSave() {
    if (!value) return;
    setBusy(true);
    setError(null);
    try {
      await setTeacherLevels({ teacherProfileId, levels: value });
      onClose();
    } catch (err) {
      setError(errorMessage(err, "Saving failed"));
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60">
          <h2 className="font-serif text-lg text-accent-deep">
            LMS courses — {name}
          </h2>
          <p className="mt-1 text-xs text-ink-muted">
            LMS content the account can see. Untick sessions or a 5E group to
            hide them.
          </p>
        </header>
        <div className="p-5 space-y-4">
          {value === undefined ? (
            <p className="text-sm text-ink-muted">Loading…</p>
          ) : (
            <CourseAssignmentPicker value={value} onChange={setEdited} />
          )}
          {error && <p className="text-sm text-danger">{error}</p>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave} loading={busy} disabled={!value}>
              {busy ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
