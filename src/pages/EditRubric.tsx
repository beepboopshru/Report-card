import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";

type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

export default function EditRubric() {
  const { kitId } = useParams<{ kitId: string }>();
  const kit = useQuery(api.kits.get, { kitId: kitId as Id<"kits"> });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kitId as Id<"kits"> });
  const update = useMutation(api.rubrics.update);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (rubric) setCriteria(rubric.criteria);
  }, [rubric]);

  if (!kit || !rubric) return <p className="text-sm text-gray-500">Loading…</p>;

  function patch(idx: number, key: keyof Criterion, value: string) {
    setCriteria((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)),
    );
  }

  async function save() {
    if (!kit) return;
    await update({ kitId: kit._id, criteria });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: "Admin", to: "/admin" },
          { label: "Kits", to: "/admin/kits" },
          { label: kit.kitName },
        ]}
      />
      <h1 className="font-serif text-2xl text-accent mb-1">{kit.kitName}</h1>
      <p className="text-sm text-gray-500 mb-6">
        #{kit.kitNumber} · {kit.concept} · {kit.category} · Grade {kit.grade}
      </p>

      <div className="space-y-3">
        {criteria.map((c, i) => (
          <div key={c.id} className="bg-white border rounded-xl p-4 space-y-2">
            <input
              value={c.label}
              onChange={(e) => patch(i, "label", e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm font-medium"
            />
            <input
              value={c.sub}
              onChange={(e) => patch(i, "sub", e.target.value)}
              className="w-full border rounded px-3 py-2 text-xs text-gray-500"
            />
            {(["c4", "c3", "c2", "c1"] as const).map((k) => (
              <label key={k} className="block">
                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                  {k.toUpperCase()}
                </span>
                <textarea
                  rows={2}
                  value={c[k]}
                  onChange={(e) => patch(i, k, e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={save} className="bg-accent text-white rounded-md px-5 py-2 text-sm">
          Save rubric
        </button>
        {saved && <span className="text-sm text-good-800">Saved.</span>}
      </div>
    </>
  );
}
