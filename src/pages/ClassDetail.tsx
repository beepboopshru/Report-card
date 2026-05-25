import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";
import { useState } from "react";

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const students = useQuery(api.students.listForClass, { classId: id });
  const kits = useQuery(api.classKits.listForClass, { classId: id });
  const addStudent = useMutation(api.students.create);
  const removeStudent = useMutation(api.students.remove);
  const [name, setName] = useState("");

  if (!cls) return <p className="text-sm text-gray-500">Loading…</p>;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await addStudent({ classId: id, name: name.trim() });
    setName("");
  }

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Classes", to: "/" }, { label: cls.name }]} />
      <div className="flex items-baseline justify-between mb-1">
        <h1 className="font-serif text-2xl text-accent">{cls.name}</h1>
        <Link
          to={`/class/${id}/report`}
          className="text-sm text-accent hover:underline"
        >
          Class report →
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Grade {cls.grade} · {cls.academicYear}
      </p>

      <section className="bg-white border rounded-xl mb-6">
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-medium">Curriculum ({kits?.length ?? 0} kits)</h2>
          <Link
            to={`/class/${id}/curriculum`}
            className="text-xs text-accent hover:underline"
          >
            Manage curriculum
          </Link>
        </header>
        {kits && kits.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-500">
            No kits attached. Add some from "Manage curriculum".
          </p>
        ) : (
          <ul className="divide-y">
            {kits?.map((k) => (
              <li key={k._id} className="px-4 py-2.5 text-sm">
                #{k.kit!.kitNumber} · {k.kit!.kitName}{" "}
                <span className="text-xs text-gray-500">({k.kit!.category})</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white border rounded-xl">
        <header className="px-4 py-3 border-b text-sm font-medium">
          Students ({students?.length ?? 0})
        </header>
        <form onSubmit={add} className="px-4 py-3 flex gap-2 border-b">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student name"
            className="flex-1 border rounded px-3 py-1.5 text-sm"
          />
          <button className="bg-accent text-white rounded-md px-4 py-1.5 text-sm">Add</button>
        </form>
        {students && students.length === 0 && (
          <EmptyState
            title="No students"
            description="Add students above to begin scoring."
          />
        )}
        <ul className="divide-y">
          {students?.map((s) => (
            <li
              key={s._id}
              className="px-4 py-2.5 flex items-center justify-between text-sm"
            >
              <span className="font-medium">{s.name}</span>
              <div className="flex items-center gap-3 flex-wrap justify-end">
                {kits && kits.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {kits.slice(0, 3).map((k) => (
                      <Link
                        key={k._id}
                        to={`/class/${id}/students/${s._id}/score/${k.kitId}`}
                        className="text-xs border rounded px-2 py-0.5 hover:bg-good-50 hover:border-good-200"
                      >
                        Score{" "}
                        {k.kit!.kitName.length > 16
                          ? k.kit!.kitName.slice(0, 16) + "…"
                          : k.kit!.kitName}
                      </Link>
                    ))}
                    {kits.length > 3 && (
                      <span className="text-xs text-gray-400">+{kits.length - 3} more</span>
                    )}
                  </div>
                )}
                <Link
                  to={`/class/${id}/students/${s._id}/report`}
                  className="text-xs text-accent hover:underline"
                >
                  Report
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${s.name}?`)) removeStudent({ studentId: s._id });
                  }}
                  className="text-xs text-bad-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
