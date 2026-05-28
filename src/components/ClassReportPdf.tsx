import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { totalOf, maxScore } from "../lib/totals";

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 10, fontFamily: "Helvetica" },
  h1: { fontSize: 18, marginBottom: 4 },
  meta: { fontSize: 9, color: "#555", marginBottom: 10 },
  th: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 4,
    fontSize: 9,
    color: "#555",
  },
  tr: {
    flexDirection: "row",
    paddingVertical: 3,
    borderBottomWidth: 0.3,
    borderColor: "#eee",
  },
  cellKit: { flex: 1 },
  cellNum: { width: 28, textAlign: "center" },
  cellTotal: { width: 60, textAlign: "right" },
});

type StudentBlock = {
  student: { name: string };
  scores: {
    kit: { kitNumber: number; kitName: string };
    rubric: { criteria: { id: string }[] };
    criterionScores: Record<string, number>;
    absent?: boolean;
  }[];
};

export function ClassReportDoc({
  className,
  blocks,
}: {
  className: string;
  blocks: StudentBlock[];
}) {
  return (
    <Document>
      {blocks.map((b, i) => (
        <Page key={i} size="A4" style={s.page}>
          <Text style={s.h1}>{b.student.name}</Text>
          <Text style={s.meta}>{className}</Text>
          <View style={s.th}>
            <Text style={s.cellKit}>Kit</Text>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Text key={n} style={s.cellNum}>
                C{n}
              </Text>
            ))}
            <Text style={s.cellTotal}>Total</Text>
          </View>
          {b.scores.length === 0 ? (
            <Text>(no kits scored)</Text>
          ) : (
            b.scores.map((sk, j) => {
              if (sk.absent) {
                return (
                  <View key={j} style={s.tr}>
                    <Text style={s.cellKit}>#{sk.kit.kitNumber} · {sk.kit.kitName}</Text>
                    <Text style={{ ...s.cellTotal, color: "#a32d2d" }}>Absent</Text>
                  </View>
                );
              }
              const total = totalOf(sk.criterionScores);
              const max = maxScore(sk.rubric.criteria.length);
              return (
                <View key={j} style={s.tr}>
                  <Text style={s.cellKit}>
                    #{sk.kit.kitNumber} · {sk.kit.kitName}
                  </Text>
                  {sk.rubric.criteria.map((c) => (
                    <Text key={c.id} style={s.cellNum}>
                      {sk.criterionScores[c.id] || "—"}
                    </Text>
                  ))}
                  <Text style={s.cellTotal}>
                    {total}/{max}
                  </Text>
                </View>
              );
            })
          )}
        </Page>
      ))}
    </Document>
  );
}

export async function downloadClassReport(className: string, blocks: StudentBlock[]) {
  const blob = await pdf(
    <ClassReportDoc className={className} blocks={blocks} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${className.replace(/\s+/g, "_")}_class_report.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
