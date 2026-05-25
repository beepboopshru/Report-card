import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import EmptyState from "../components/EmptyState";

export default function TeacherDashboard() {
  const classes = useQuery(api.classes.listMine);
  const create = useMutation(api.classes.create);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(4);
  const [year, setYear] = useState("2025-26");
  const [showForm, setShowForm] = useState(false);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await create({ name: name.trim(), grade, academicYear: year });
    setName("");
    setShowForm(false);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-accent">My classes</h1>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-accent text-white rounded-md px-4 py-1.5 text-sm"
        >
          {showForm ? "Cancel" : "New class"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={onCreate}
          className="bg-white border rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
        >
          <label className="text-sm">
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-1.5 text-sm"
            />
          </label>
          <label className="text-sm">
            Grade
            <input
              type="number"
              min={1}
              max={12}
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="mt-1 w-full border rounded px-3 py-1.5 text-sm"
            />
          </label>
          <label className="text-sm">
            Academic year
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-1.5 text-sm"
            />
          </label>
          <button className="bg-accent text-white rounded-md px-4 py-1.5 text-sm">Create</button>
        </form>
      )}

      {classes && classes.length === 0 ? (
        <EmptyState
          title="No classes yet"
          description="Create your first class to add students and start scoring."
          action={
            <button
              onClick={() => setShowForm(true)}
              className="bg-accent text-white rounded-md px-4 py-1.5 text-sm"
            >
              New class
            </button>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {classes?.map((c) => (
            <li key={c._id}>
              <Link
                to={`/class/${c._id}`}
                className="block bg-white border rounded-xl p-4 hover:shadow-sm"
              >
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-gray-500">
                  Grade {c.grade} · {c.academicYear}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
