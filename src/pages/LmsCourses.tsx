import { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  LMS_LEVELS,
  lmsLevelPath,
  type LmsLevel,
} from "../../convex/lib/lmsCatalog";

export default function LmsCourses() {
  const [open, setOpen] = useState<LmsLevel | null>(null);

  if (open) {
    return (
      <>
        <button
          onClick={() => setOpen(null)}
          className="mb-4 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All levels
        </button>
        <PageHeader title={open.name} description={open.classes} />
        <iframe
          src={lmsLevelPath(open)}
          title={open.name}
          className="w-full h-[75vh] rounded-lg border border-line bg-surface"
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="LMS"
        description="Preview the course content exactly as students see it."
      />

      <div className="space-y-4">
        {LMS_LEVELS.map((level) => (
          <Card key={level.id}>
            <CardBody>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-ink">{level.name}</div>
                  <div className="text-xs text-ink-muted mt-0.5">
                    {level.classes}
                  </div>
                </div>
                <Button onClick={() => setOpen(level)}>
                  <BookOpen className="w-4 h-4" />
                  Open course
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
