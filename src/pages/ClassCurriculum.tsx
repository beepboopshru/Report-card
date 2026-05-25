import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Breadcrumbs from "../components/Breadcrumbs";
import KitPicker from "../components/KitPicker";

export default function ClassCurriculum() {
  const { classId } = useParams<{ classId: string }>();
  const id = classId as Id<"classes">;
  const cls = useQuery(api.classes.get, { classId: id });
  const links = useQuery(api.classKits.listForClass, { classId: id });
  const add = useMutation(api.classKits.add);
  const remove = useMutation(api.classKits.remove);

  if (!cls || !links) return <p className="text-sm text-gray-500">Loading…</p>;
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
      <Breadcrumbs
        crumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${id}` },
          { label: "Curriculum" },
        ]}
      />
      <h1 className="font-serif text-2xl text-accent mb-1">Curriculum</h1>
      <p className="text-sm text-gray-500 mb-6">
        Pick the kits you'll teach this class. Only your assigned kits are shown.
      </p>
      <KitPicker selectedKitIds={selectedIds} onToggle={onToggle} />
    </>
  );
}
