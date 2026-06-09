import { makeCriterionHeader } from "../../convex/lib/gradeSheet";

export type ExportKit = {
  kitId: string;
  kitNumber: number;
  kitName: string;
  category: string;
  criteria: { id: string; label: string }[];
  scores: {
    studentId: string;
    criterionScores: Record<string, number>;
    absent: boolean;
    observations: string;
  }[];
};

export type ExportData = {
  classId: string;
  className: string;
  students: { _id: string; name: string; rollNo?: string }[];
  kits: ExportKit[];
};

// Internal cell shape produced by the pure shaper. `null` value = empty cell.
type Cell = { value: string | number | null; type?: typeof String | typeof Number; readOnly?: boolean };

function sheetName(kit: ExportKit): string {
  const raw = `#${kit.kitNumber} ${kit.kitName}`;
  // Excel sheet names: max 31 chars, no : \ / ? * [ ]
  return raw.replace(/[:\\/?*[\]]/g, "").slice(0, 31);
}

export function sheetsForExport(data: ExportData): { sheets: Cell[][][]; names: string[] } {
  const names: string[] = [];
  const sheets: Cell[][][] = [];

  for (const kit of data.kits) {
    names.push(sheetName(kit));
    const scoreByStudent = new Map(kit.scores.map((s) => [s.studentId, s]));

    const header: Cell[] = [
      { value: "class_id" },
      { value: "kit_id" },
      { value: "student_id" },
      { value: "roll_no" },
      { value: "name" },
      { value: "absent" },
      ...kit.criteria.map((c) => ({ value: makeCriterionHeader(c.label, c.id) })),
      { value: "observations" },
    ];

    const rows: Cell[][] = data.students.map((s) => {
      const sc = scoreByStudent.get(s._id);
      const markCells: Cell[] = kit.criteria.map((c) => {
        const v = sc?.criterionScores[c.id];
        return { value: typeof v === "number" ? v : null, type: Number };
      });
      return [
        { value: data.classId, readOnly: true },
        { value: kit.kitId, readOnly: true },
        { value: s._id, readOnly: true },
        { value: s.rollNo ?? null },
        { value: s.name },
        { value: sc?.absent ? "x" : "" },
        ...markCells,
        { value: sc?.observations ? sc.observations : null },
      ];
    });

    sheets.push([header, ...rows]);
  }

  return { sheets, names };
}

// write-excel-file (v4) cell: a value-bearing object or `null` for an empty cell.
// Our internal `readOnly` flag has no v4 equivalent and is dropped.
type XlsxCell =
  | { value: string | number; type?: typeof String | typeof Number }
  | null;

function toXlsxRows(rows: Cell[][]): XlsxCell[][] {
  return rows.map((row) =>
    row.map((c) => (c.value === null ? null : { value: c.value, type: c.type })),
  );
}

export async function buildWorkbookBlob(data: ExportData): Promise<Blob> {
  // write-excel-file v4 browser build: multi-sheet form takes an array of
  // `{ data, sheet }` objects and returns `{ toBlob, toFile }`.
  const { default: writeXlsxFile } = await import("write-excel-file/browser");
  const { sheets, names } = sheetsForExport(data);
  const workbook = sheets.map((rows, i) => ({ data: toXlsxRows(rows), sheet: names[i] }));
  return await writeXlsxFile(workbook).toBlob();
}
