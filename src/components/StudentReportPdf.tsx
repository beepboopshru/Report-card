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

  // results page
  resPage:      { padding: 0, fontSize: 9, fontFamily: "DM Sans" },
  resBand:      { backgroundColor: "#0F6E56", paddingHorizontal: 36, paddingVertical: 12,
                  flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  resBandTitle: { fontFamily: "DM Serif Display", fontSize: 16, color: "#FFFFFF",
                  letterSpacing: 1 },
  resBandName:  { fontSize: 10, color: "#FFFFFF", textAlign: "right" },
  resBandClass: { fontSize: 8, color: "#E1F5EE", textAlign: "right" },

  resBody:      { paddingHorizontal: 36, paddingVertical: 18 },
  resHeader:    { flexDirection: "row", borderBottomWidth: 1, borderColor: "#0F1115",
                  paddingBottom: 4, marginBottom: 4 },
  resHeaderTxt: { fontSize: 8, color: "#5B6470", textTransform: "uppercase",
                  letterSpacing: 0.5 },
  resRow:       { flexDirection: "row", alignItems: "center", paddingVertical: 6,
                  borderBottomWidth: 0.5, borderColor: "#E5E7EB" },
  resKit:       { flex: 1, paddingRight: 8 },
  resKitNum:    { fontFamily: "DM Serif Display", fontSize: 10, color: "#0F1115" },
  resKitName:   { fontSize: 10, color: "#0F1115" },
  resCategory:  { width: 60, fontSize: 8, color: "#5B6470", textTransform: "uppercase",
                  letterSpacing: 0.5 },
  resChipCol:   { width: 28, alignItems: "center" },
  resChip:      { width: 22, height: 16, borderRadius: 4, alignItems: "center",
                  justifyContent: "center" },
  resChipTxt:   { fontSize: 9, fontFamily: "DM Sans" },
  resTotal:     { width: 50, textAlign: "right", fontSize: 10, color: "#0F1115" },
  resGrade:     { width: 80, textAlign: "right", fontSize: 9 },

  resOverall:   { flexDirection: "row", alignItems: "center", paddingVertical: 8,
                  borderTopWidth: 1, borderColor: "#0F1115", marginTop: 4 },
  resOverallLbl:{ flex: 1, fontFamily: "DM Serif Display", fontSize: 11, color: "#0F1115" },

  resLegend:    { marginTop: 24, paddingTop: 12, borderTopWidth: 0.5, borderColor: "#E5E7EB" },
  resLegendRow: { flexDirection: "row", justifyContent: "center", marginBottom: 4 },
  resLegendDot: { width: 8, height: 8, borderRadius: 2, marginRight: 4, marginLeft: 12 },
  resLegendTxt: { fontSize: 8, color: "#5B6470" },
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

function ScoreChip({ score }: { score: number }) {
  const cs = chipStyle(score);
  return (
    <View style={[s.resChip, { backgroundColor: cs.backgroundColor }]}>
      <Text style={[s.resChipTxt, { color: cs.color }]}>{score > 0 ? score : "—"}</Text>
    </View>
  );
}

function ResultsHeaderBand({
  studentName,
  className,
}: { studentName: string; className: string }) {
  return (
    <View style={s.resBand}>
      <Text style={s.resBandTitle}>RESULTS</Text>
      <View>
        <Text style={s.resBandName}>{studentName}</Text>
        <Text style={s.resBandClass}>{className}</Text>
      </View>
    </View>
  );
}

function ResultsRow({
  sk,
  criterionUnion,
}: {
  sk: ScoredKit;
  criterionUnion: CriterionRef[];
}) {
  const ownIds = new Set(sk.rubric.criteria.map((c) => c.id));
  const total = totalOf(sk.criterionScores);
  const max = maxScore(sk.rubric.criteria.length);
  const pct = max ? Math.round((total / max) * 100) : 0;
  return (
    <View style={s.resRow} wrap={false}>
      <View style={s.resKit}>
        <Text>
          <Text style={s.resKitNum}>#{sk.kit.kitNumber}  </Text>
          <Text style={s.resKitName}>{sk.kit.kitName}</Text>
        </Text>
      </View>
      <Text style={s.resCategory}>{sk.kit.category}</Text>
      {criterionUnion.map((c) => (
        <View key={c.id} style={s.resChipCol}>
          {ownIds.has(c.id)
            ? <ScoreChip score={sk.criterionScores[c.id] ?? 0} />
            : <Text style={{ color: "#8A93A0", fontSize: 9 }}>—</Text>}
        </View>
      ))}
      <Text style={s.resTotal}>{total}/{max}</Text>
      <Text style={[s.resGrade, { color: chipStyle(Math.ceil(pct / 25)).color }]}>
        {gradeBand(pct)}
      </Text>
    </View>
  );
}

const ROWS_PER_PAGE = 14;
const MAX_CRITERION_COLUMNS = 8;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out.length ? out : [[]];
}

function ResultsPages({
  studentName,
  className,
  scored,
}: {
  studentName: string;
  className: string;
  scored: ScoredKit[];
}) {
  if (scored.length === 0) {
    return (
      <Page size="A4" style={s.resPage}>
        <ResultsHeaderBand studentName={studentName} className={className} />
        <View style={s.resBody}>
          <Text style={{ color: "#5B6470", fontSize: 10 }}>No kits assessed yet.</Text>
        </View>
      </Page>
    );
  }

  const fullUnion = buildCriterionUnion(scored);
  const wide = fullUnion.length > MAX_CRITERION_COLUMNS;
  const criterionUnion = wide ? [] : fullUnion;

  const overallTotal = scored.reduce((a, sk) => a + totalOf(sk.criterionScores), 0);
  const overallMax = scored.reduce((a, sk) => a + maxScore(sk.rubric.criteria.length), 0);
  const overallPct = overallMax ? Math.round((overallTotal / overallMax) * 100) : 0;
  const pages = chunk(scored, ROWS_PER_PAGE);

  return (
    <>
      {pages.map((rows, pageIdx) => {
        const isLast = pageIdx === pages.length - 1;
        return (
          <Page key={pageIdx} size="A4" style={s.resPage}>
            <ResultsHeaderBand studentName={studentName} className={className} />
            <View style={s.resBody}>
              <View style={s.resHeader}>
                <Text style={[s.resKit, s.resHeaderTxt]}>Kit</Text>
                <Text style={[s.resCategory, s.resHeaderTxt]}>Category</Text>
                {criterionUnion.map((_, i) => (
                  <Text key={i} style={[s.resChipCol, s.resHeaderTxt, { textAlign: "center" }]}>
                    C{i + 1}
                  </Text>
                ))}
                <Text style={[s.resTotal, s.resHeaderTxt]}>Total</Text>
                <Text style={[s.resGrade, s.resHeaderTxt]}>Grade</Text>
              </View>

              {rows.map((sk) => (
                <ResultsRow key={sk.kit.kitNumber} sk={sk} criterionUnion={criterionUnion} />
              ))}

              {isLast && (
                <>
                  <View style={s.resOverall}>
                    <Text style={s.resOverallLbl}>Overall</Text>
                    <Text style={s.resTotal}>{overallTotal}/{overallMax}</Text>
                    <Text style={[s.resGrade, { color: "#085041" }]}>
                      {overallPct}%  {gradeBand(overallPct)}
                    </Text>
                  </View>

                  <View style={s.resLegend}>
                    <View style={s.resLegendRow}>
                      <Text style={s.resLegendTxt}>Scores:</Text>
                      {[
                        { n: 4, label: "Excellent" },
                        { n: 3, label: "Good" },
                        { n: 2, label: "Developing" },
                        { n: 1, label: "Needs support" },
                      ].map((d) => (
                        <View key={d.n} style={{ flexDirection: "row", alignItems: "center" }}>
                          <View style={[s.resLegendDot, { backgroundColor: chipStyle(d.n).color }]} />
                          <Text style={s.resLegendTxt}>{d.n} {d.label}</Text>
                        </View>
                      ))}
                    </View>
                    {!wide && (
                      <View style={s.resLegendRow}>
                        <Text style={s.resLegendTxt}>
                          Criteria:  {criterionUnion.map((c, i) => `C${i + 1} = ${c.label}`).join("  ·  ")}
                        </Text>
                      </View>
                    )}
                    {wide && (
                      <View style={s.resLegendRow}>
                        <Text style={s.resLegendTxt}>
                          Per-criterion detail omitted — rubric exceeds {MAX_CRITERION_COLUMNS} criteria.
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
          </Page>
        );
      })}
    </>
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
      <ResultsPages studentName={studentName} className={className} scored={scored} />
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
