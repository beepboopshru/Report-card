// src/pages/AdminKits.tsx
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Input } from "../components/ui/Input";

export default function AdminKits() {
  const kits = useQuery(api.kits.list);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "Explorer" | "Discoverer">(
    "all",
  );

  const visible = useMemo(() => {
    if (!kits) return [];
    const lq = q.trim().toLowerCase();
    return kits.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        k.concept.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq) ||
        k.subject.toLowerCase().includes(lq)
      );
    });
  }, [kits, q, filter]);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Kits" }]}
        title="Kits"
        description={`${kits?.length ?? "…"} total · click any kit to edit its rubric.`}
      />

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, concept, number, or subject…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 bg-surface-muted rounded-md p-1">
          {(["all", "Explorer", "Discoverer"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 h-8 rounded text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-surface text-ink shadow-card"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <span className="text-xs text-ink-muted ml-auto">
          {visible.length} shown
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {visible.map((k) => (
          <Link key={k._id} to={`/admin/rubrics/${k._id}`} className="group">
            <Card className="hover:shadow-pop hover:-translate-y-0.5 transition-all h-full">
              <CardBody>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-xs text-ink-subtle font-medium">
                    #{k.kitNumber}
                  </div>
                  <Badge tone={categoryTone(k.category)} size="sm">
                    {k.category}
                  </Badge>
                </div>
                <div className="font-medium text-ink mb-1 group-hover:text-accent transition-colors">
                  {k.kitName}
                </div>
                <div className="text-xs text-ink-muted line-clamp-2">
                  {k.concept}
                </div>
                <div className="text-[11px] text-ink-subtle mt-3 pt-3 border-t border-line/60">
                  Grade {k.grade} · {k.subject}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
        {visible.length === 0 && kits && (
          <p className="col-span-full text-center text-sm text-ink-muted py-12">
            No kits match these filters.
          </p>
        )}
      </div>
    </>
  );
}
