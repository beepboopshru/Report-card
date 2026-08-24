import { describe, it, expect } from "vitest";
import { parseCsv, toCsv } from "./csv";

describe("parseCsv", () => {
  it("parses simple rows", () => {
    expect(parseCsv("a,b,c\n1,2,3")).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
    ]);
  });

  it("handles quoted fields with commas", () => {
    expect(parseCsv('name,note\n"Doe, Jane","hi, there"')).toEqual([
      ["name", "note"],
      ["Doe, Jane", "hi, there"],
    ]);
  });

  it("handles escaped quotes and embedded newlines", () => {
    expect(parseCsv('a\n"line1\nline2","say ""hi"""')).toEqual([
      ["a"],
      ["line1\nline2", 'say "hi"'],
    ]);
  });

  it("handles CRLF line endings and a trailing newline", () => {
    expect(parseCsv("a,b\r\n1,2\r\n")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });

  it("returns [] for empty input", () => {
    expect(parseCsv("")).toEqual([]);
  });

  it("preserves empty fields", () => {
    expect(parseCsv("a,,b")).toEqual([["a", "", "b"]]);
  });

  it("treats a lone CR as a row terminator", () => {
    expect(parseCsv("a,b\rc,d")).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });
});

describe("toCsv", () => {
  it("round-trips cells containing commas, quotes, and newlines", () => {
    const rows = [
      ["Account", "Username", "Password"],
      ['St. Mary\'s, "Main" Branch', "abps_sidhi", 'p"a,ss\nword'],
    ];
    expect(parseCsv(toCsv(rows))).toEqual(rows);
  });
});
