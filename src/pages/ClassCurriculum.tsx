// src/pages/ClassCurriculum.tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import PageHeader from "../components/PageHeader";
import KitPicker from "../components/KitPicker";

export default function ClassCurriculum() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const links = useQuery(api.classKits.listForClass, { classId: id });
  const add = useMutation(api.classKits.add);
  const remove = useMutation(api.classKits.remove);

  if (!cls || !links) return <p className="text-sm text-ink-muted">Loading…</p>;
  const selectedIds = new Set<string>(links.map((l) => l.kitId as unknown as string));

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
        title="Curriculum"
        description="Pick the kits you'll teach this class. Only your assigned kits are shown."
      />
      <KitPicker selectedKitIds={selectedIds} onToggle={onToggle} />
    </>
  );
}
