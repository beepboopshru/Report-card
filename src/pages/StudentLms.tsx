import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { ExternalLink, LogOut } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LMS_LEVELS } from "../../convex/lib/lmsCatalog";

export default function StudentLms() {
  const { signOut } = useAuthActions();
  const lms = useQuery(api.lms.myLms);

  if (lms === undefined)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;

  const levels = LMS_LEVELS.filter((l) => lms?.levelIds.includes(l.id));

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line bg-surface">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif text-accent-deep text-lg">
            <span className="w-7 h-7 rounded-md bg-accent text-white inline-flex items-center justify-center text-sm font-sans">
              SU
            </span>
            Robotics LMS
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

      <main className="max-w-3xl mx-auto px-5 py-8">
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
                No course has been assigned to your class yet. Check back soon!
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {levels.map((level) => (
              <Card key={level.id}>
                <CardBody>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-ink">{level.name}</div>
                      <div className="text-xs text-ink-muted mt-0.5">
                        {level.classes}
                      </div>
                    </div>
                    <a href={level.url} target="_blank" rel="noreferrer">
                      <Button>
                        Open course
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
