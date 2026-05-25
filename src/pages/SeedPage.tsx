import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function SeedPage() {
  const count = useQuery(api.kits.count);
  const seed = useMutation(api.seed.seedKitsAndRubrics);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    try {
      const r = await seed({});
      setResult(
        `Inserted ${r.kitsInserted} kits (${r.kitsSkipped} skipped), ${r.rubricsInserted} rubrics (${r.rubricsSkipped} skipped).`,
      );
    } catch (e: unknown) {
      setResult(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Admin", to: "/admin" }, { label: "Seed" }]} />
      <h1 className="font-serif text-2xl text-accent mb-4">Seed kits & rubrics</h1>
      <p className="text-sm text-gray-600 mb-6">
        Current kit count in database: <strong>{count ?? "…"}</strong>. Running this is safe —
        it inserts only missing rows and never overwrites existing rubrics.
      </p>
      <button
        onClick={run}
        disabled={busy}
        className="bg-accent text-white rounded-md px-5 py-2 text-sm disabled:opacity-50"
      >
        {busy ? "Seeding..." : "Run seed"}
      </button>
      {result && <p className="mt-4 text-sm text-gray-700">{result}</p>}
    </>
  );
}
