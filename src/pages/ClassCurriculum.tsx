// src/pages/ClassCurriculum.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import KitPicker from "../components/KitPicker";
import { Button } from "../components/ui/Button";

export default function ClassCurriculum() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const navigate = useNavigate();
  const cls = useQuery(api.classes.get, { classId: id });
  const links = useQuery(api.classKits.listForClass, { classId: id });
  const add = useMutation(api.classKits.add);
  const remove = useMutation(api.classKits.remove);

  if (!cls || !links) return <p className="text-sm text-ink-muted">Loading…</p>;
  const selectedIds = new Set<string>(links.map((l) => l.kitId as unknown as string));
  const hasSelection = selectedIds.size > 0;

  function onToggle(kitId: Id<"kits">, selected: boolean) {
    if (selected) {
      add({ classId: id, kitId });
    } else {
      const link = links!.find((l) => l.kitId === kitId);
      if (link) remove({ classKitId: link._id });
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Curriculum" },
        ]}
        backTo={`/class/${id}`}
        backLabel={`Back to ${cls.name}`}
        title="Curriculum"
        description="Pick the kits you'll teach this class. Only your assigned kits are shown."
      />
      <KitPicker selectedKitIds={selectedIds} onToggle={onToggle} />
      <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-line/60 bg-surface px-5 py-4">
        <p className="text-sm text-ink-muted">
          {hasSelection
            ? `${selectedIds.size} kit${selectedIds.size === 1 ? "" : "s"} selected. Tap Next when you're done.`
            : "Select the kits you'll teach, then tap Next to continue."}
        </p>
        <Button
          onClick={() => navigate(`/class/${id}`)}
          disabled={!hasSelection}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}
