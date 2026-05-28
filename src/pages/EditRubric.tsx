import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";

type Criterion = {
  id: string;
  label: string;
  sub: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

const LEVEL_LABELS: Record<string, string> = {
  c4: "4 · Outstanding",
  c3: "3 · Proficient",
  c2: "2 · Developing",
  c1: "1 · Beginning",
};

export default function EditRubric() {
  const { kitId } = useParams<{ kitId: string }>();
  const kit = useQuery(api.kits.get, { kitId: kitId as Id<"kits"> });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kitId as Id<"kits"> });
  const update = useMutation(api.rubrics.update);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (rubric) setCriteria(rubric.criteria);
  }, [rubric]);

  if (!kit || !rubric)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  function patch(idx: number, key: keyof Criterion, value: string) {
    setCriteria((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)),
    );
  }

  async function save() {
    if (!kit) return;
    setSaving(true);
    try {
      await update({ kitId: kit._id, criteria });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", to: "/admin" },
          { label: "Kits", to: "/admin/kits" },
          { label: kit.kitName },
        ]}
        title={kit.kitName}
        description={
          <span className="inline-flex items-center gap-2">
            <Badge tone={categoryTone(kit.category)} size="sm">
              {kit.category}
            </Badge>
            <span>
              #{kit.kitNumber} · {kit.concept} · Grade {kit.grade}
            </span>
          </span>
        }
        actions={
          <>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm text-good-600">
                <CheckCircle2 className="w-4 h-4" />
                Saved
              </span>
            )}
            <Button onClick={save} loading={saving}>
              Save rubric
            </Button>
          </>
        }
      />

      <div className="space-y-4">
        {criteria.map((c, i) => (
          <Card key={c.id}>
            <CardBody>
              <div className="space-y-2 mb-4">
                <Input
                  value={c.label}
                  onChange={(e) => patch(i, "label", e.target.value)}
                  className="font-medium"
                  placeholder="Criterion label"
                />
                <Input
                  value={c.sub}
                  onChange={(e) => patch(i, "sub", e.target.value)}
                  className="text-xs"
                  placeholder="Subtitle"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(["c4", "c3", "c2", "c1"] as const).map((k) => (
                  <label key={k} className="block">
                    <span className="text-[10px] uppercase tracking-wide font-medium text-ink-muted">
                      {LEVEL_LABELS[k]}
                    </span>
                    <Textarea
                      rows={3}
                      value={c[k]}
                      onChange={(e) => patch(i, k, e.target.value)}
                      className="mt-1"
                    />
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
