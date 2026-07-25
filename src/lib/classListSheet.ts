import { parseCsv } from "./csv";

export interface ClassListRow {
  name: string;
  rollNo?: string;
}

/** Parse an uploaded class-list CSV (Name, Roll No). Header row optional. */
export function parseClassListCsv(text: string): ClassListRow[] {
  const rows = parseCsv(text);
  const out: ClassListRow[] = [];
  for (const [i, cells] of rows.entries()) {
    const name = (cells[0] ?? "").trim();
    const rollNo = (cells[1] ?? "").trim();
    if (!name) continue;
    if (i === 0 && /^(student\s*)?name$/i.test(name)) continue;
    out.push({ name, rollNo: rollNo === "" ? undefined : rollNo });
  }
  return out;
}

function csvField(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function toCsv(rows: string[][]): string {
  return rows.map((r) => r.map(csvField).join(",")).join("\r\n");
}

export interface CredentialRow {
  name: string;
  rollNo: string;
  username: string;
  password: string;
}

/** Credential sheet a teacher hands out — one row per student. */
export function buildCredentialsCsv(
  rows: CredentialRow[],
  signInUrl: string,
): string {
  return toCsv([
    ["Name", "Roll No", "Username", "Password", "Sign in at"],
    ...rows.map((r, i) => [
      r.name,
      r.rollNo,
      r.username,
      r.password,
      i === 0 ? signInUrl : "",
    ]),
  ]);
}

/** Sample .xlsx the teacher downloads, fills in, and re-uploads as CSV. */
export async function buildClassListTemplateBlob(): Promise<Blob> {
  // Same write-excel-file v4 browser form as gradeWorkbook.ts:
  // `{ data, sheet }` array in, `{ toBlob }` out.
  const { default: writeXlsxFile } = await import("write-excel-file/browser");
  const data = [
    [{ value: "Name" }, { value: "Roll No" }],
    [{ value: "Asha Kumar" }, { value: "1" }],
    [{ value: "Ravi Sharma" }, { value: "2" }],
  ];
  return await writeXlsxFile([{ data, sheet: "Class list" }]).toBlob();
}
