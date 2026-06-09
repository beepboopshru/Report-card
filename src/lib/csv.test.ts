import { describe, it, expect } from "vitest";
import { parseCsv } from "./csv";

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
});
