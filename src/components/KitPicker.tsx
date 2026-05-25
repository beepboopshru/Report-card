import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export default function KitPicker({
  selectedKitIds,
  onToggle,
}: {
  selectedKitIds: Set<string>;
  onToggle: (kitId: Id<"kits">, selected: boolean) => void;
}) {
  const assigned = useQuery(api.classKits.assignedKitsForTeacher);
  if (!assigned) return <p className="text-sm text-gray-400">Loading…</p>;
  if (assigned.length === 0)
    return (
      <p className="text-sm text-gray-500">
        You haven't been assigned any kits. Ask the admin.
      </p>
    );

  return (
    <ul className="bg-white border rounded-xl divide-y max-h-[60vh] overflow-auto">
      {assigned.map((k) => {
        const selected = selectedKitIds.has(k._id);
        return (
          <li
            key={k._id}
            className="px-4 py-2.5 flex items-center justify-between text-sm"
          >
            <div>
              <span className="font-medium">#{k.kitNumber} · {k.kitName}</span>
              <span className="ml-2 text-xs text-gray-500">
                {k.category} · {k.subject} · Grade {k.grade}
              </span>
            </div>
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => onToggle(k._id, e.target.checked)}
            />
          </li>
        );
      })}
    </ul>
  );
}
