import { useState } from "react";
import { useQuery } from "convex/react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { api } from "../../convex/_generated/api";
import PageHeader from "../components/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useCurrentProfile } from "../lib/useCurrentProfile";
import {
  gradesLabel,
  LMS_LEVELS,
  LMS_LEVEL_BY_ID,
  lmsLevelPath,
  type LmsLevel,
  type SessionPick,
} from "../../convex/lib/lmsCatalog";

export default function LmsCourses() {
  const { profile } = useCurrentProfile();
  const isAdmin = profile?.role === "admin";
  const lmsOnly = profile?.lmsOnly === true;
  // Courses assigned to the school/teacher account itself (admin sets these
  // when creating the account, with per-session 5E selection).
  const schoolLms = useQuery(api.lms.mySchoolLms, isAdmin ? "skip" : {});
  const myClasses = useQuery(
    api.lms.myClassLms,
    isAdmin || lmsOnly ? "skip" : {},
  );
  const [open, setOpen] = useState<{
    level: LmsLevel;
    grades: string[];
    sessions?: SessionPick[];
    gradeNames?: Record<string, string>;
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
          description={gradesLabel(open.level, open.grades, open.gradeNames)}
        />
        <iframe
          src={lmsLevelPath(
            open.level,
            open.grades,
            open.sessions,
            open.gradeNames,
          )}
          title={open.level.name}
          className="w-full h-[75vh] rounded-lg border border-line bg-surface"
        />
      </>
    );
  }

  const levelCard = (
    level: LmsLevel,
    grades: string[],
    key: string,
    sessions?: SessionPick[],
    gradeNames?: Record<string, string>,
  ) => (
    <Card key={key}>
      <CardBody>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-medium text-ink">{level.name}</div>
            <div className="text-xs text-ink-muted mt-0.5">
              {gradesLabel(level, grades, gradeNames)}
              {sessions?.length ? " · selected sessions" : ""}
            </div>
          </div>
          <Button onClick={() => setOpen({ level, grades, sessions, gradeNames })}>
            <BookOpen className="w-4 h-4" />
            Open course
          </Button>
        </div>
      </CardBody>
    </Card>
  );

  const fullCatalog = (
    <div className="space-y-4">
      {LMS_LEVELS.map((level) => levelCard(level, level.grades, level.id))}
    </div>
  );

  if (isAdmin) {
    return (
      <>
        <PageHeader
          title="LMS"
          description="Preview the course content exactly as students see it."
        />
        {fullCatalog}
      </>
    );
  }

  if (schoolLms === undefined || (!lmsOnly && myClasses === undefined)) {
    return (
      <>
        <PageHeader title="LMS" description="Courses assigned to you." />
        <p className="text-sm text-ink-muted">Loading…</p>
      </>
    );
  }

  // Single-user accounts created before course assignment existed have no
  // rows — keep their old full-catalog access.
  if (lmsOnly && schoolLms.length === 0) {
    return (
      <>
        <PageHeader title="LMS" description="All courses, ready to explore." />
        {fullCatalog}
      </>
    );
  }

  const classList = lmsOnly ? [] : (myClasses ?? []);
  const schoolCards = schoolLms.flatMap(
    ({ levelId, grades, sessions, gradeNames }) => {
      const level = LMS_LEVEL_BY_ID.get(levelId);
      return level
        ? [levelCard(level, grades, `school-${levelId}`, sessions, gradeNames)]
        : [];
    },
  );

  return (
    <>
      <PageHeader
        title="LMS"
        description="Courses assigned to your school and classes."
      />
      {schoolCards.length === 0 && classList.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-sm text-ink-muted">
              No courses have been assigned yet.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-6">
          {schoolCards.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-medium text-ink">
                School courses
              </div>
              <div className="space-y-4">{schoolCards}</div>
            </div>
          )}
          {classList.map((cls) => (
            <div key={cls.classId}>
              <div className="mb-2 text-sm font-medium text-ink">
                {cls.className}
              </div>
              <div className="space-y-4">
                {cls.levels.flatMap(
                  ({ levelId, grades, sessions, gradeNames }) => {
                    const level = LMS_LEVEL_BY_ID.get(levelId);
                    return level
                      ? [
                          levelCard(
                            level,
                            grades,
                            `${cls.classId}-${levelId}`,
                            sessions,
                            gradeNames,
                          ),
                        ]
                      : [];
                  },
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
