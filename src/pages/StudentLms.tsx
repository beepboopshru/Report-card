import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { ArrowLeft, BookOpen, LogOut } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  gradesLabel,
  LMS_LEVELS,
  lmsLevelPath,
  type LmsLevel,
  type SessionPick,
} from "../../convex/lib/lmsCatalog";

export default function StudentLms() {
  const { signOut } = useAuthActions();
  const lms = useQuery(api.lms.myLms);
  const myScores = useQuery(api.lms.myQuizScores);
  const recordQuizResult = useMutation(api.lms.recordQuizResult);
  const [openLevel, setOpenLevel] = useState<{
    level: LmsLevel;
    grades: string[];
    sessions?: SessionPick[];
    gradeNames?: Record<string, string>;
  } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Tell the embedded LMS which sessions are already submitted so it locks
  // those tests. Sent on every iframe navigation and whenever scores change.
  const pushScores = () => {
    if (!myScores) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "su-lms-quiz-scores", scores: myScores },
      window.location.origin,
    );
  };
  useEffect(pushScores);

  // The vendored LMS posts quiz submissions from its (same-origin) iframe.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const d = event.data;
      if (!d || d.type !== "su-lms-quiz-result") return;
      recordQuizResult({
        year: String(d.year),
        grade: String(d.grade),
        session: String(d.session),
        score: Number(d.score),
        total: Number(d.total),
        mcqScore: Number(d.mcqScore),
        mcqTotal: Number(d.mcqTotal),
        codeScore: Number(d.codeScore),
        codeMax: Number(d.codeMax),
      }).catch(() => {
        // Score display in the LMS still works; storage is best-effort here.
      });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [recordQuizResult]);

  if (lms === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;

  const levels = LMS_LEVELS.flatMap((level) => {
    const assigned = lms?.levels.find((a) => a.levelId === level.id);
    return assigned && assigned.grades.length
      ? [
          {
            level,
            grades: assigned.grades,
            sessions: assigned.sessions,
            gradeNames: assigned.gradeNames,
          },
        ]
      : [];
  });

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* ponytail: CSS-only auto-collapse — shrinks to a strip while a course is open, expands on hover */}
      <header
        className={`border-b border-line bg-surface overflow-hidden transition-all duration-300 ${
          openLevel ? "max-h-2 hover:max-h-24 bg-accent/20" : "max-h-24"
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {openLevel && (
              <button
                onClick={() => setOpenLevel(null)}
                className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                My courses
              </button>
            )}
            <div className="flex items-center gap-2 font-serif text-accent-deep text-lg">
              <span className="w-7 h-7 rounded-md bg-accent text-white inline-flex items-center justify-center text-sm font-sans">
                SU
              </span>
              Robotics LMS
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </header>

      {openLevel ? (
        <iframe
          ref={iframeRef}
          src={lmsLevelPath(
            openLevel.level,
            openLevel.grades,
            openLevel.sessions,
            openLevel.gradeNames,
          )}
          title={openLevel.level.name}
          onLoad={pushScores}
          className="flex-1 w-full border-0"
        />
      ) : (
        <main className="max-w-3xl w-full mx-auto px-5 py-8">
          <h1 className="font-serif text-2xl text-accent-deep">
            {lms ? `Hi, ${lms.studentName}!` : "Welcome!"}
          </h1>
          {lms && (
            <p className="text-sm text-ink-muted mt-1 mb-6">{lms.className}</p>
          )}

          {levels.length === 0 ? (
            <Card>
              <CardBody>
                <p className="text-sm text-ink-muted">
                  No course has been assigned to your class yet. Check back
                  soon!
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {levels.map(({ level, grades, sessions, gradeNames }) => (
                <Card key={level.id}>
                  <CardBody>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-ink">{level.name}</div>
                        <div className="text-xs text-ink-muted mt-0.5">
                          {gradesLabel(level, grades, gradeNames)}
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          setOpenLevel({ level, grades, sessions, gradeNames })
                        }
                      >
                        <BookOpen className="w-4 h-4" />
                        Open course
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
