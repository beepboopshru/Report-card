import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Sprout } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

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
      <PageHeader
        breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Seed" }]}
        title="Seed kits & rubrics"
        description="One-time setup. Safe to re-run — only missing rows are inserted."
      />
      <Card>
        <CardBody>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-good-50 text-good-600 inline-flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-ink">
                Current kit count in database:{" "}
                <strong className="text-ink">{count ?? "…"}</strong>
              </p>
              <p className="text-xs text-ink-muted mt-1">
                Inserts kits from <code>convex/seed/kits.ts</code> and rubrics
                from <code>convex/seed/rubrics.ts</code>. Existing rubrics are
                preserved.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={run} loading={busy}>
                  Run seed
                </Button>
                {result && (
                  <span className="text-sm text-ink-muted">{result}</span>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
