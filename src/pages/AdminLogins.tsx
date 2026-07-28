import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import PageHeader from "../components/PageHeader";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

type Result = {
  className: string;
  teacherName: string;
  created: number;
  password: string | null;
  error: string | null;
};

export default function AdminLogins() {
  const recreateAllLogins = useAction(api.enrollment.recreateAllLogins);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);

  async function onRecreateAll() {
    const typed = prompt(
      "This deletes and rebuilds EVERY student login in EVERY class:\n\n" +
        "• New usernames from current student/class names\n" +
        "• One new shared password per class\n" +
        "• All students signed out everywhere\n" +
        "• Report card and quiz data is kept\n\n" +
        "This cannot be undone. Type RECREATE to continue.",
    );
    if (typed !== "RECREATE") return;
    setBusy(true);
    setResults(null);
    try {
      setResults(await recreateAllLogins({}));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Recreating logins failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Logins"
        description="Rebuild student login accounts across the whole platform."
      />

      <Card>
        <CardHeader
          title="Recreate all logins"
          description="Every active class, in one pass. Cannot be undone."
        />
        <CardBody>
          <p className="text-sm text-ink-muted mb-4">
            Deletes every student login in every active class and provisions
            fresh ones: usernames rebuilt from current student and class names,
            one new shared password per class. All students are signed out.
            Report card scores and quiz data are kept. Archived classes are
            skipped.
          </p>
          <Button onClick={onRecreateAll} disabled={busy} loading={busy}>
            {busy ? "Recreating…" : "Recreate all logins"}
          </Button>
          {busy && (
            <p className="mt-2 text-sm text-ink-muted">
              This runs class by class and can take a while — leave this page
              open.
            </p>
          )}
        </CardBody>
      </Card>

      {results && (
        <Card className="mt-4">
          <CardHeader
            title={`Done — ${results.filter((r) => !r.error).length} of ${results.length} class${results.length === 1 ? "" : "es"} recreated`}
            description="New shared passwords per class. Teachers can re-download credential sheets from their class pages."
          />
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-ink-subtle">
                    <th className="py-2 pr-4">Class</th>
                    <th className="py-2 pr-4">Teacher</th>
                    <th className="py-2 pr-4">Logins</th>
                    <th className="py-2">New password</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-t border-line">
                      <td className="py-2 pr-4 font-medium text-ink">
                        {r.className}
                      </td>
                      <td className="py-2 pr-4 text-ink-muted">
                        {r.teacherName}
                      </td>
                      <td className="py-2 pr-4">{r.created}</td>
                      <td className="py-2 font-mono">
                        {r.error ? (
                          <span className="font-sans text-danger">
                            Failed: {r.error}
                          </span>
                        ) : (
                          r.password
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
