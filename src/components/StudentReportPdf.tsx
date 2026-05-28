import { Document, Page, Text, View, StyleSheet, pdf, Font } from "@react-pdf/renderer";
import { totalOf, maxScore, gradeBand } from "../lib/totals";

// Use the v1 endpoint which returns stable raw font URLs.
// If these ever 404, @react-pdf/renderer silently falls back to Helvetica
// and the document still renders — that's the documented degraded state.
try {
  Font.register({
    family: "DM Serif Display",
    src: "https://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.ttf",
  });
  Font.register({
    family: "DM Sans",
    fonts: [
      { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8C.ttf" },
      { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZawIIBSFFOZ-Lo3.ttf", fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
} catch {
  // ignored — fall back to Helvetica
}

const s = StyleSheet.create({
  // shared
  page:         { padding: 36, fontSize: 10, fontFamily: "DM Sans" },
  serif:        { fontFamily: "DM Serif Display" },

  // certificate page
  certPage:     { padding: 0, fontSize: 10, fontFamily: "DM Sans" },
  certOuter:    { flex: 1, margin: 18, borderWidth: 1.5, borderColor: "#085041", padding: 18 },
  certInner:    { flex: 1, borderWidth: 0.5, borderColor: "#085041", padding: 28,
                  alignItems: "center", justifyContent: "center" },
  certProgram:  { fontFamily: "DM Serif Display", fontSize: 16, color: "#085041",
                  letterSpacing: 2, marginBottom: 4 },
  certRule:     { width: 80, height: 1, backgroundColor: "#0F6E56", marginBottom: 28 },
  certTitle:    { fontFamily: "DM Serif Display", fontSize: 26, color: "#0F1115",
                  marginBottom: 36 },
  certIntro:    { fontSize: 11, color: "#5B6470", marginBottom: 16 },
  certName:     { fontFamily: "DM Serif Display", fontSize: 32, color: "#0F1115",
                  letterSpacing: 2, marginBottom: 24, textAlign: "center" },
  certBody:     { fontSize: 11, color: "#5B6470", textAlign: "center",
                  marginBottom: 28, maxWidth: 360, lineHeight: 1.5 },
  certScore:    { fontFamily: "DM Serif Display", fontSize: 56, color: "#0F6E56",
                  marginBottom: 4 },
  certBand:     { fontFamily: "DM Serif Display", fontSize: 16, color: "#085041",
                  marginBottom: 28 },
  certMeta:     { fontSize: 10, color: "#5B6470", marginBottom: 6 },

  // results page (unchanged for now — placeholder; Task 6 replaces this)
  h1:           { fontSize: 18, marginBottom: 4 },
  h2:           { fontSize: 13, marginTop: 18, marginBottom: 6 },
  meta:         { fontSize: 9, color: "#555", marginBottom: 10 },
  row:          { flexDirection: "row", borderBottomWidth: 0.5, borderColor: "#ccc",
                  paddingVertical: 4 },
  cellLabel:    { width: 160 },
  cellScore:    { width: 40, textAlign: "center" },
  cellDesc:     { flex: 1, color: "#444" },
  totalBar:     { marginTop: 8, fontSize: 11, fontWeight: 700 },
});

type Criterion = {
  id: string;
  label: string;
  c4: string;
  c3: string;
  c2: string;
  c1: string;
};

export type ScoredKit = {
  kit: { kitNumber: number; kitName: string; concept: string; category: string };
  rubric: { criteria: Criterion[] };
  criterionScores: Record<string, number>;
  observations?: string;
};

type CriterionRef = { id: string; label: string };

function buildCriterionUnion(scored: ScoredKit[]): CriterionRef[] {
  const out: CriterionRef[] = [];
  const seen = new Set<string>();
  for (const sk of scored) {
    for (const c of sk.rubric.criteria) {
      if (!seen.has(c.id)) {
        seen.add(c.id);
        out.push({ id: c.id, label: c.label });
      }
    }
  }
  return out;
}

function formatIssueDate(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

function formatClassPrefix(name: string): string {
  return `of ${name}`;
}

type ChipStyle = { backgroundColor: string; color: string };

function chipStyle(score: number): ChipStyle {
  switch (score) {
    case 4: return { backgroundColor: "#E1F5EE", color: "#1D9E75" }; // good-50 / good-400
    case 3: return { backgroundColor: "#EAF3DE", color: "#3B6D11" }; // ok-50 / ok-600
    case 2: return { backgroundColor: "#FAEEDA", color: "#854F0B" }; // warn-50 / warn-600
    case 1: return { backgroundColor: "#FCEBEB", color: "#A32D2D" }; // bad-50 / bad-600
    default: return { backgroundColor: "transparent", color: "#8A93A0" }; // ink-subtle
  }
}

function CertificatePage({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  const isEmpty = scored.length === 0;

  let overallTotal = 0;
  let overallMax = 0;
  for (const sk of scored) {
    overallTotal += totalOf(sk.criterionScores);
    overallMax += maxScore(sk.rubric.criteria.length);
  }
  const pct = overallMax ? Math.round((overallTotal / overallMax) * 100) : 0;
  const band = gradeBand(pct);

  return (
    <Page size="A4" style={s.certPage}>
      <View style={s.certOuter}>
        <View style={s.certInner}>
          <Text style={s.certProgram}>SCIENCEUTSAV · C-STEM</Text>
          <View style={s.certRule} />

          <Text style={s.certTitle}>Certificate of Assessment</Text>

          {isEmpty ? (
            <Text style={s.certIntro}>This certifies enrolment of</Text>
          ) : (
            <Text style={s.certIntro}>This certifies that</Text>
          )}

          <Text style={s.certName}>{studentName.toUpperCase()}</Text>

          {isEmpty ? (
            <Text style={s.certBody}>
              {formatClassPrefix(className)} is currently enrolled in the C-STEM program.
            </Text>
          ) : (
            <>
              <Text style={s.certBody}>
                {formatClassPrefix(className)} has completed the C-STEM assessment
                with an overall score of
              </Text>
              <Text style={s.certScore}>{pct}%</Text>
              <Text style={s.certBand}>{band}</Text>
              <Text style={s.certMeta}>{scored.length} kits assessed</Text>
            </>
          )}

          <Text style={s.certMeta}>Issued {formatIssueDate()}</Text>
        </View>
      </View>
    </Page>
  );
}

export function StudentReportDoc({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  return (
    <Document>
      <CertificatePage studentName={studentName} className={className} scored={scored} />
      {scored.map((sk, i) => {
        const total = totalOf(sk.criterionScores);
        const max = maxScore(sk.rubric.criteria.length);
        const pct = max ? Math.round((total / max) * 100) : 0;
        return (
          <Page key={i} size="A4" style={s.page}>
            <Text style={s.h1}>{studentName}</Text>
            <Text style={s.meta}>
              {className} · #{sk.kit.kitNumber} · {sk.kit.kitName} · {sk.kit.category} ·{" "}
              {sk.kit.concept}
            </Text>
            {sk.rubric.criteria.map((c) => {
              const v = sk.criterionScores[c.id] ?? 0;
              const desc =
                v === 4 ? c.c4 : v === 3 ? c.c3 : v === 2 ? c.c2 : v === 1 ? c.c1 : "—";
              return (
                <View key={c.id} style={s.row} wrap={false}>
                  <Text style={s.cellLabel}>{c.label}</Text>
                  <Text style={s.cellScore}>{v || "—"}/4</Text>
                  <Text style={s.cellDesc}>{desc}</Text>
                </View>
              );
            })}
            <Text style={s.totalBar}>
              Total: {total}/{max} ({pct}% · {gradeBand(pct)})
            </Text>
            {sk.observations && (
              <>
                <Text style={s.h2}>Observations</Text>
                <Text>{sk.observations}</Text>
              </>
            )}
          </Page>
        );
      })}
    </Document>
  );
}

export async function downloadStudentReport(
  studentName: string,
  className: string,
  scored: ScoredKit[],
) {
  const blob = await pdf(
    <StudentReportDoc studentName={studentName} className={className} scored={scored} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${studentName.replace(/\s+/g, "_")}_report.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export const __test = { buildCriterionUnion, formatIssueDate, formatClassPrefix, chipStyle };
