// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState, useMemo } from "react";
import { Boxes, Search, X, Plus, KeyRound, Ban, RotateCcw } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import CreateTeacherModal from "../components/CreateTeacherModal";
import CredentialsModal from "../components/CredentialsModal";

export default function AdminDashboard() {
  const teachers = useQuery(api.profiles.listTeachers);
  const resetPassword = useAction(api.admin.resetTeacherPassword);
  const setDisabled = useAction(api.admin.setTeacherDisabled);

  const [selectedTeacher, setSelected] = useState<Id<"profiles"> | null>(null);
  const [creating, setCreating] = useState(false);
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);

  const teacherRows = useMemo(
    () => teachers?.filter((t) => t.role === "teacher") ?? [],
    [teachers],
  );
  const selected = teacherRows.find((t) => t._id === selectedTeacher);

  async function onReset(profileId: Id<"profiles">, username: string) {
    if (!confirm(`Reset password for ${username}? Their active sessions will be signed out.`)) return;
    setRowError(null);
    try {
      const creds = await resetPassword({ profileId });
      setCredentials(creds);
    } catch (err) {
      setRowError(err instanceof Error ? err.message : "Reset failed");
    }
  }

  async function onToggleDisabled(
    profileId: Id<"profiles">,
    username: string,
    nextDisabled: boolean,
  ) {
    const verb = nextDisabled ? "Disable" : "Enable";
    if (!confirm(`${verb} ${username}?`)) return;
    setRowError(null);
    try {
      await setDisabled({ profileId, disabled: nextDisabled });
    } catch (err) {
      setRowError(err instanceof Error ? err.message : `${verb} failed`);
    }
  }

  return (
    <>
      <PageHeader
        title="Teachers"
        description="Create teacher accounts, assign kits, and manage access."
        actions={
          <div className="flex gap-2">
            <Link to="/admin/kits">
              <Button variant="secondary">
                <Boxes className="w-4 h-4" />
                Browse kits
              </Button>
            </Link>
            <Button onClick={() => setCreating(true)}>
              <Plus className="w-4 h-4" />
              Create teacher
            </Button>
          </div>
        }
      />

      {rowError && (
        <p className="text-sm text-danger mb-3" role="alert">
          {rowError}
        </p>
      )}

      {teacherRows.length === 0 ? (
        <EmptyState
          title="No teachers yet"
          description='Click "Create teacher" above to provision the first account.'
        />
      ) : (
        <Card>
          <CardBody padding="none">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-ink-muted border-b border-line/60">
                  <th className="px-5 py-2.5 font-medium">Name</th>
                  <th className="px-5 py-2.5 font-medium">Username</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teacherRows.map((t) => {
                  const isDisabled = t.disabled === true;
                  return (
                    <tr
                      key={t._id}
                      className="border-b border-line/60 last:border-b-0 hover:bg-surface-muted/50"
                    >
                      <td className="px-5 py-3 font-medium text-ink">
                        {t.displayName}
                      </td>
                      <td className="px-5 py-3 text-ink-muted">
                        @{t.username}
                      </td>
                      <td className="px-5 py-3">
                        {isDisabled ? (
                          <Badge tone="bad" size="sm">
                            Disabled
                          </Badge>
                        ) : (
                          <Badge tone="good" size="sm">
                            Active
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex gap-1.5">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelected(t._id)}
                          >
                            Manage kits
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => onReset(t._id, t.username)}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            Reset
                          </Button>
                          <Button
                            size="sm"
                            variant={isDisabled ? "secondary" : "danger"}
                            onClick={() =>
                              onToggleDisabled(t._id, t.username, !isDisabled)
                            }
                          >
                            {isDisabled ? (
                              <>
                                <RotateCcw className="w-3.5 h-3.5" />
                                Enable
                              </>
                            ) : (
                              <>
                                <Ban className="w-3.5 h-3.5" />
                                Disable
                              </>
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}

      {selected && (
        <AssignmentsDrawer
          teacher={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {creating && (
        <CreateTeacherModal
          onClose={() => setCreating(false)}
          onCreated={(creds) => {
            setCreating(false);
            setCredentials(creds);
          }}
        />
      )}
      {credentials && (
        <CredentialsModal
          username={credentials.username}
          password={credentials.password}
          onClose={() => setCredentials(null)}
        />
      )}
    </>
  );
}

function AssignmentsDrawer({
  teacher,
  onClose,
}: {
  teacher: { _id: Id<"profiles">; displayName: string; username: string };
  onClose: () => void;
}) {
  const kits = useQuery(api.kits.list);
  const assigned = useQuery(api.assignments.listForTeacher, {
    teacherProfileId: teacher._id,
  });
  const setAssign = useMutation(api.assignments.set);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "Explorer" | "Discoverer">(
    "all",
  );

  const assignedSet = useMemo(
    () => new Set(assigned?.map((a) => a.kitId) ?? []),
    [assigned],
  );

  const visible = useMemo(() => {
    if (!kits) return [];
    const lq = q.trim().toLowerCase();
    return kits.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq)
      );
    });
  }, [kits, q, filter]);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div
        className="absolute inset-0 bg-ink/30"
        onClick={onClose}
        aria-hidden
      />
      <aside className="relative w-full max-w-md bg-surface shadow-pop h-full flex flex-col">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <div className="min-w-0">
            <div className="font-medium text-ink truncate">
              {teacher.displayName}
            </div>
            <div className="text-xs text-ink-muted truncate">
              @{teacher.username} · {assignedSet.size} of {kits?.length ?? 0} assigned
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="px-5 py-3 border-b border-line/60 flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[150px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search kits…"
              className="pl-9"
            />
          </div>
          <div className="flex gap-1 bg-surface-muted rounded-md p-1">
            {(["all", "Explorer", "Discoverer"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 h-7 rounded text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-surface text-ink shadow-card"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y divide-line/60">
          {visible.map((k) => {
            const checked = assignedSet.has(k._id);
            return (
              <li
                key={k._id}
                className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
              >
                <label className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setAssign({
                        teacherProfileId: teacher._id,
                        kitId: k._id,
                        assigned: e.target.checked,
                      })
                    }
                    className="mt-0.5 accent-accent"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      #{k.kitNumber} · {k.kitName}
                    </div>
                    <div className="text-xs text-ink-muted truncate">
                      Grade {k.grade} · {k.subject}
                    </div>
                  </div>
                </label>
                <Badge tone={categoryTone(k.category)} size="sm">
                  {k.category}
                </Badge>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
