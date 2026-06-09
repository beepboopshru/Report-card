// Minimal RFC-4180-style CSV parser. Returns rows of string cells.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const n = text.length;
  let sawAny = false;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < n) {
    const c = text[i];
    sawAny = true;
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      endField();
      i++;
      continue;
    }
    if (c === "\r") {
      // swallow; \n (or end) closes the row
      i++;
      continue;
    }
    if (c === "\n") {
      endRow();
      i++;
      continue;
    }
    field += c;
    i++;
  }

  // Flush the final field/row unless the input ended exactly on a row break
  // (i.e. field empty AND row empty AND the last char was a newline).
  const endedOnNewline = n > 0 && (text[n - 1] === "\n" || text[n - 1] === "\r");
  if (field !== "" || row.length > 0 || (sawAny && !endedOnNewline)) {
    endRow();
  }
  return rows;
}
