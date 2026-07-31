import { useState } from "react";
import { useQuery } from "convex/react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { api } from "../../convex/_generated/api";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import {
  LMS_LEVELS,
  LMS_LEVEL_BY_ID,
  lmsLevelPath,
  type LmsLevel,
} from "../../convex/lib/lmsCatalog";

export default function LmsCourses() {
  const { profile } = useCurrentProfile();
  const isAdmin = profile?.role === "admin";
  const myClasses = useQuery(api.lms.myClassLms, isAdmin ? "skip" : {});
  const [open, setOpen] = useState<{
    level: LmsLevel;
    grades: string[];
  } | null>(null);

  if (open) {
    return (
      <>
        <button
          onClick={() => setOpen(null)}
          className="mb-4 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All courses
        </button>
        <PageHeader
          title={open.level.name}
          description={open.grades.map((g) => `Class ${g}`).join(" · ")}
        />
        <iframe
          src={lmsLevelPath(open.level, open.grades)}
          title={open.level.name}
          className="w-full h-[75vh] rounded-lg border border-line bg-surface"
        />
      </>
    );
  }

  const levelCard = (level: LmsLevel, grades: string[], key: string) => (
    <Card key={key}>
      <CardBody>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-medium text-ink">{level.name}</div>
            <div className="text-xs text-ink-muted mt-0.5">
              {grades.map((g) => `Class ${g}`).join(" · ")}
            </div>
          </div>
          <Button onClick={() => setOpen({ level, grades })}>
            <BookOpen className="w-4 h-4" />
            Open course
          </Button>
        </div>
      </CardBody>
    </Card>
  );

  if (isAdmin) {
    return (
      <>
        <PageHeader
          title="LMS"
          description="Preview the course content exactly as students see it."
        />
        <div className="space-y-4">
          {LMS_LEVELS.map((level) => levelCard(level, level.grades, level.id))}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="LMS"
        description="Courses assigned to your classes."
      />
      {myClasses === undefined ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : myClasses.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-sm text-ink-muted">
              No courses have been assigned to your classes yet.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-6">
          {myClasses.map((cls) => (
            <div key={cls.classId}>
              <div className="mb-2 text-sm font-medium text-ink">
                {cls.className}
              </div>
              <div className="space-y-4">
                {cls.levels.flatMap(({ levelId, grades }) => {
                  const level = LMS_LEVEL_BY_ID.get(levelId);
                  return level
                    ? [levelCard(level, grades, `${cls.classId}-${levelId}`)]
                    : [];
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
