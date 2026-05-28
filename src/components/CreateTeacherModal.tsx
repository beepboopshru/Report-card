import { useState } from "react";
import { X } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { FormField } from "./ui/FormField";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";

interface Props {
  onClose: () => void;
  onCreated: (creds: { username: string; password: string }) => void;
}

export default function CreateTeacherModal({ onClose, onCreated }: Props) {
  const createTeacher = useAction(api.admin.createTeacher);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
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
      const creds = await createTeacher({
        username: normalized,
        displayName: displayName.trim(),
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
      <div className="relative w-full max-w-md bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">
            Create teacher
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
          {error && <p className="text-sm text-danger">{error}</p>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={busy}>
              {busy ? "Creating…" : "Create teacher"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
