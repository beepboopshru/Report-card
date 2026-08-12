import { useState } from "react";
import { X, RefreshCw } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { FormField } from "./ui/FormField";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";
import { generatePassword } from "../../convex/lib/passwordGen";
import CourseAssignmentPicker, {
  type LevelAssignment,
} from "./CourseAssignmentPicker";

interface Props {
  onClose: () => void;
  onCreated: (creds: { username: string; password: string }) => void;
}

export default function CreateTeacherModal({ onClose, onCreated }: Props) {
  const createTeacher = useAction(api.admin.createTeacher);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState(() => generatePassword());
  const [lmsOnly, setLmsOnly] = useState(false);
  const [lms, setLms] = useState<LevelAssignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const normalized = normalizeUsername(username);
      assertValidUsername(normalized);
      if (displayName.trim().length === 0) {
        throw new Error("Display name is required");
      }
      if (password.trim().length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      const creds = await createTeacher({
        username: normalized,
        displayName: displayName.trim(),
        password: password.trim(),
        lmsOnly: lmsOnly || undefined,
        lms: lms.length ? lms : undefined,
      });
      onCreated(creds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
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
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">
            Create account
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <FormField
            label="Account type"
            hint={
              lmsOnly
                ? "LMS access only — no classes, reports, or admin approval."
                : "Full account: registers classes, sent to admin for approval."
            }
          >
            {() => (
              <div className="flex gap-1 bg-surface-muted rounded-md p-1">
                {(
                  [
                    [false, "School / teacher"],
                    [true, "Single user (LMS only)"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setLmsOnly(value)}
                    className={`flex-1 px-2.5 h-8 rounded text-xs font-medium transition-colors ${
                      lmsOnly === value
                        ? "bg-surface text-ink shadow-card"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </FormField>
          <FormField
            label="Username"
            hint="Letters, digits, '.', '_', '-'. 3-32 characters. Lowercased."
          >
            {(id, describedBy) => (
              <Input
                id={id}
                type="text"
                required
                minLength={3}
                maxLength={32}
                autoCapitalize="none"
                spellCheck={false}
                aria-describedby={describedBy}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
          </FormField>
          <FormField label="Display name" hint="Shown in lists and reports.">
            {(id, describedBy) => (
              <Input
                id={id}
                type="text"
                required
                aria-describedby={describedBy}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            )}
          </FormField>
          <FormField
            label="Password"
            hint="Edit before creating, or keep the generated one. Min 8 characters."
          >
            {(id, describedBy) => (
              <div className="flex gap-1.5">
                <Input
                  id={id}
                  type="text"
                  required
                  minLength={8}
                  autoCapitalize="none"
                  spellCheck={false}
                  className="font-mono"
                  aria-describedby={describedBy}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPassword(generatePassword())}
                  aria-label="Generate new password"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            )}
          </FormField>
          <FormField
            label="Courses"
            hint="LMS content assigned to the account. Untick sessions or a 5E group to hide them. Class-specific courses are assigned later from the Classes page."
          >
            {() => <CourseAssignmentPicker value={lms} onChange={setLms} />}
          </FormField>
          {error && <p className="text-sm text-danger">{error}</p>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={busy}>
              {busy ? "Creating…" : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
