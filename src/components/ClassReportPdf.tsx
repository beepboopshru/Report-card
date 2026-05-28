import { Document } from "@react-pdf/renderer";
import {
  ResultsPages,
  renderPdfWithBrandFonts,
  type ScoredKit,
} from "./StudentReportPdf";

type StudentBlock = {
  student: { name: string };
  scores: ScoredKit[];
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
        <ResultsPages
          key={i}
          studentName={b.student.name}
          className={className}
          scored={b.scores}
        />
      ))}
    </Document>
  );
}

export async function downloadClassReport(className: string, blocks: StudentBlock[]) {
  const blob = await renderPdfWithBrandFonts(
    <ClassReportDoc className={className} blocks={blocks} />,
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${className.replace(/\s+/g, "_")}_class_report.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
