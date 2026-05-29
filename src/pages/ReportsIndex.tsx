// src/pages/ReportsIndex.tsx
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FileText, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardHeader } from "../components/ui/Card";

export default function ReportsIndex() {
  const classes = useQuery(api.classes.listMine);

  return (
    <>
      <PageHeader
        title="Reports"
        description="Download per-class or per-student report cards."
      />
      {classes && classes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No classes yet"
          description="Create a class first — then come back here to generate report cards."
          action={
            <Link to="/" className="text-sm text-accent hover:underline">
              Go to Classes →
            </Link>
          }
        />
      ) : (
        <Card>
          <CardHeader title="Your classes" />
          <ul className="divide-y divide-line/60">
            {classes?.map((c) => (
              <li key={c._id}>
                <Link
                  to={`/class/${c._id}/report`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-muted transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-ink">
                      {c.name}
                    </div>
                    <div className="text-xs text-ink-muted">
                      {c.academicYear}
                    </div>
                  </div>
                  <span className="text-xs text-accent inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open report
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
