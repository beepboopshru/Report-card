import { describe, expect, it } from "vitest";
import {
  buildCredentialsCsv,
  parseClassListCsv,
  toCsv,
} from "./classListSheet";

describe("parseClassListCsv", () => {
  it("skips the header row and blank lines", () => {
    const rows = parseClassListCsv("Name,Roll No\nAsha Kumar,1\n\nRavi,\n");
    expect(rows).toEqual([
      { name: "Asha Kumar", rollNo: "1" },
      { name: "Ravi", rollNo: undefined },
    ]);
  });

  it("works without a header row", () => {
    expect(parseClassListCsv("Asha,7")).toEqual([
      { name: "Asha", rollNo: "7" },
    ]);
  });

  it("handles quoted names with commas", () => {
    expect(parseClassListCsv('"Kumar, Asha",3')).toEqual([
      { name: "Kumar, Asha", rollNo: "3" },
    ]);
  });
});

describe("toCsv", () => {
  it("escapes quotes, commas and newlines", () => {
    expect(toCsv([['he said "hi"', "a,b", "x\ny"]])).toBe(
      '"he said ""hi""","a,b","x\ny"',
    );
  });
});

describe("buildCredentialsCsv", () => {
  it("includes header, one row per student, and the sign-in URL once", () => {
    const csv = buildCredentialsCsv(
      [
        { name: "Asha", rollNo: "1", username: "asha.c4", password: "pw1" },
        { name: "Ravi", rollNo: "2", username: "ravi.c4", password: "pw2" },
      ],
      "https://app.example.com/sign-in",
    );
    const lines = csv.split("\r\n");
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe("Name,Roll No,Username,Password,Sign in at");
    expect(lines[1]).toContain("https://app.example.com/sign-in");
    expect(lines[2]).toBe("Ravi,2,ravi.c4,pw2,");
  });
});
