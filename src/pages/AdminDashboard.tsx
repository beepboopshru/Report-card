import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";

export default function AdminDashboard() {
  const teachers = useQuery(api.profiles.listTeachers);
  const [selectedTeacher, setSelected] = useState<Id<"profiles"> | null>(null);

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Admin" }]} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-accent">Admin dashboard</h1>
        <Link to="/admin/seed" className="text-sm border rounded px-3 py-1.5 hover:bg-gray-50">
          Seed kits & rubrics
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <aside className="bg-white border rounded-xl">
          <div className="px-4 py-2 text-xs uppercase tracking-wide text-gray-500 border-b flex items-center justify-between">
            <span>Teachers</span>
            <Link to="/admin/kits" className="text-accent hover:underline normal-case tracking-normal">
              All kits →
            </Link>
          </div>
          <ul className="divide-y">
            {teachers
              ?.filter((t) => t.role === "teacher")
              .map((t) => (
                <li key={t._id}>
                  <button
                    onClick={() => setSelected(t._id)}
                    className={`w-full text-left px-4 py-3 text-sm ${
                      selectedTeacher === t._id ? "bg-good-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium">{t.displayName}</div>
                    <div className="text-xs text-gray-500">{t.email}</div>
                  </button>
                </li>
              ))}
            {teachers && teachers.filter((t) => t.role === "teacher").length === 0 && (
              <li className="px-4 py-6 text-xs text-gray-500">
                No teachers yet — share the sign-up link.
              </li>
            )}
          </ul>
        </aside>
        <section>
          {selectedTeacher ? (
            <TeacherAssignments teacherProfileId={selectedTeacher} />
          ) : (
            <p className="text-sm text-gray-500">
              Select a teacher to manage their kit assignments.
            </p>
          )}
        </section>
      </div>
    </>
  );
}

function TeacherAssignments({ teacherProfileId }: { teacherProfileId: Id<"profiles"> }) {
  const kits = useQuery(api.kits.list);
  const assigned = useQuery(api.assignments.listForTeacher, { teacherProfileId });
  const setAssign = useMutation(api.assignments.set);
  if (!kits || !assigned) return <p className="text-sm text-gray-400">Loading...</p>;
  const assignedSet = new Set(assigned.map((a) => a.kitId));

  return (
    <div className="bg-white border rounded-xl">
      <div className="px-4 py-2 text-xs uppercase tracking-wide text-gray-500 border-b flex justify-between">
        <span>Assignable kits</span>
        <span>
          {assignedSet.size} assigned of {kits.length}
        </span>
      </div>
      <ul className="divide-y max-h-[600px] overflow-auto">
        {kits.map((k) => {
          const checked = assignedSet.has(k._id);
          return (
            <li key={k._id} className="px-4 py-2.5 flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">#{k.kitNumber} · {k.kitName}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {k.category} · {k.subject} · Grade {k.grade}
                </span>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    setAssign({ teacherProfileId, kitId: k._id, assigned: e.target.checked })
                  }
                />
                <span className="text-xs text-gray-500">{checked ? "Assigned" : ""}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
