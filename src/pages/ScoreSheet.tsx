// src/pages/ScoreSheet.tsx
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import ScoreRow from "../components/ScoreRow";
import SaveStatus, { type SaveState } from "../components/SaveStatus";
import { useDebounce } from "../lib/useDebouncedMutation";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge, categoryTone } from "../components/ui/Badge";
import { Textarea } from "../components/ui/Input";
import { gradeBand, maxScore, scoredCount, totalOf } from "../lib/totals";

export default function ScoreSheet() {
  const { classId, studentId, kitId } = useParams<{
    classId: string;
    studentId: string;
    kitId: string;
  }>();
  const sid = studentId as Id<"students">;
  const kid = kitId as Id<"kits">;
  const cid = classId as Id<"classes">;

  const student = useQuery(api.students.get, { studentId: sid });
  const cls = useQuery(api.classes.get, { classId: cid });
  const kit = useQuery(api.kits.get, { kitId: kid });
  const rubric = useQuery(api.rubrics.getForKit, { kitId: kid });
  const score = useQuery(api.scores.get, { studentId: sid, kitId: kid });
  const upsert = useMutation(api.scores.upsert);

  const [criterionScores, setCriterionScores] = useState<Record<string, number>>({});
  const [observations, setObservations] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    if (score === undefined) return;
    setCriterionScores(score?.criterionScores ?? {});
    setObservations(score?.observations ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score?._id]);

  const debouncedSave = useDebounce(
    async (cs: Record<string, number>, obs: string) => {
      setSaveState("saving");
      try {
        await upsert({
          studentId: sid,
          kitId: kid,
          criterionScores: cs,
          observations: obs,
        });
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    },
    500,
  );

  function setScore(criterionId: string, v: number) {
    setCriterionScores((prev) => {
      const next = { ...prev, [criterionId]: v };
      debouncedSave(next, observations);
      return next;
    });
  }

  function setObs(v: string) {
    setObservations(v);
    debouncedSave(criterionScores, v);
  }

  const total = useMemo(() => totalOf(criterionScores), [criterionScores]);
  const criteriaCount = rubric?.criteria.length ?? 6;
  const max = maxScore(criteriaCount);
  const pct = max ? Math.round((total / max) * 100) : 0;
  const scored = scoredCount(criterionScores, criteriaCount);

  if (!student || !cls || !kit || !rubric)
    return <p className="text-sm text-ink-muted">Loading…</p>;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Classes", to: "/" },
          { label: cls.name, to: `/class/${cls._id}` },
          {
            label: student.name,
            to: `/class/${cls._id}/students/${student._id}/report`,
          },
          { label: kit.kitName },
        ]}
        title={student.name}
        description={
          <span className="inline-flex items-center gap-2 flex-wrap">
            <Badge tone={categoryTone(kit.category)} size="sm">
              {kit.category}
            </Badge>
            <span>
              #{kit.kitNumber} · {kit.kitName} · {kit.concept}
            </span>
          </span>
        }
      />

      <div className="sticky top-0 md:top-0 z-20 -mx-5 md:-mx-8 px-5 md:px-8 py-3 mb-5 bg-surface-sunken/95 backdrop-blur border-b border-line/60 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-serif text-3xl text-ink leading-none">
              {total}
              <span className="text-base text-ink-subtle">/{max}</span>
            </div>
            <div className="text-xs text-ink-muted mt-1">
              {scored === criteriaCount
                ? `${pct}% · ${gradeBand(pct)}`
                : `${scored} of ${criteriaCount} scored`}
            </div>
          </div>
        </div>
        <SaveStatus state={saveState} />
      </div>

      <div className="space-y-0">
        {rubric.criteria.map((c) => (
          <ScoreRow
            key={c.id}
            criterion={c}
            score={criterionScores[c.id] ?? 0}
            onChange={(v) => setScore(c.id, v)}
          />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader title="Teacher observations" />
        <CardBody>
          <Textarea
            rows={4}
            value={observations}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Notes on this session, things to revisit, safety observations…"
          />
        </CardBody>
      </Card>
    </>
  );
}
