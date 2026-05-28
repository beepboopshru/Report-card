// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState, useMemo } from "react";
import { Boxes, Search, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function AdminDashboard() {
  const teachers = useQuery(api.profiles.listTeachers);
  const [selectedTeacher, setSelected] = useState<Id<"profiles"> | null>(null);
  const teacherRows = useMemo(
    () => teachers?.filter((t) => t.role === "teacher") ?? [],
    [teachers],
  );

  const selected = teacherRows.find((t) => t._id === selectedTeacher);

  return (
    <>
      <PageHeader
        title="Teachers"
        description="Assign kits to teachers. They can only score against their assigned kits."
        actions={
          <Link to="/admin/kits">
            <Button variant="secondary">
              <Boxes className="w-4 h-4" />
              Browse kits
            </Button>
          </Link>
        }
      />

      {teacherRows.length === 0 ? (
        <EmptyState
          title="No teachers yet"
          description="Share the sign-up link with your teachers."
        />
      ) : (
        <Card>
          <CardBody padding="none">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-ink-muted border-b border-line/60">
                  <th className="px-5 py-2.5 font-medium">Name</th>
                  <th className="px-5 py-2.5 font-medium">Email</th>
                  <th className="px-5 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacherRows.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-line/60 last:border-b-0 hover:bg-surface-muted/50"
                  >
                    <td className="px-5 py-3 font-medium text-ink">
                      {t.displayName}
                    </td>
                    <td className="px-5 py-3 text-ink-muted">{t.email}</td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelected(t._id)}
                      >
                        Manage kits
                      </Button>
                    </td>
                  </tr>
                ))}
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
    </>
  );
}

function AssignmentsDrawer({
  teacher,
  onClose,
}: {
  teacher: { _id: Id<"profiles">; displayName: string; email: string };
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
              {teacher.email} · {assignedSet.size} of {kits?.length ?? 0} assigned
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
