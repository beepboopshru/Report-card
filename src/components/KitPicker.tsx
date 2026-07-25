// src/components/KitPicker.tsx
import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Search } from "lucide-react";
import { Badge } from "./ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Card, CardBody } from "./ui/Card";
import { Input } from "./ui/Input";

export default function KitPicker({
  selectedKitIds,
  onToggle,
}: {
  selectedKitIds: Set<string>;
  onToggle: (kitId: Id<"kits">, selected: boolean) => void;
}) {
  const assigned = useQuery(api.classKits.assignedKitsForTeacher);
  const [filter, setFilter] = useState<
    "all" | "Explorer" | "Discoverer" | "Robotics"
  >("all");
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    if (!assigned) return [];
    const lq = q.trim().toLowerCase();
    return assigned.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        k.concept.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq)
      );
    });
  }, [assigned, filter, q]);

  if (!assigned) return <p className="text-sm text-ink-subtle">Loading…</p>;
  if (assigned.length === 0)
    return (
      <Card>
        <CardBody>
          <p className="text-sm text-ink-muted">
            You haven't been assigned any kits. Ask the admin.
          </p>
        </CardBody>
      </Card>
    );

  return (
    <Card>
      <div className="px-5 py-3 border-b border-line/60 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search kits…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 bg-surface-muted rounded-md p-1">
          {(["all", "Explorer", "Discoverer", "Robotics"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 h-7 rounded text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-surface text-ink shadow-card"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <span className="text-xs text-ink-muted ml-auto">
          {selectedKitIds.size} selected
        </span>
      </div>
      <ul className="divide-y divide-line/60 max-h-[60vh] overflow-auto">
        {visible.map((k) => {
          const selected = selectedKitIds.has(k._id);
          return (
            <li
              key={k._id}
              className="px-5 py-3 flex items-center justify-between gap-3 text-sm hover:bg-surface-muted/50 transition-colors"
            >
              <label className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => onToggle(k._id, e.target.checked)}
                  className="mt-0.5 accent-accent"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-ink truncate">
                    #{k.kitNumber} · {k.kitName}
                  </div>
                  <div className="text-xs text-ink-muted truncate">
                    {k.concept} · Grade {k.grade} · {k.subject}
                  </div>
                </div>
              </label>
              <Badge tone={categoryTone(k.category)} size="sm">
                {k.category}
              </Badge>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="px-5 py-8 text-center text-sm text-ink-muted">
            No kits match this filter.
          </li>
        )}
      </ul>
    </Card>
  );
}
