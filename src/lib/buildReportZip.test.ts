import { describe, it, expect, vi } from "vitest";
import JSZip from "jszip";
import { buildReportZip, sanitizeFilename } from "./buildReportZip";

describe("sanitizeFilename", () => {
  it("replaces whitespace with underscores", () => {
    expect(sanitizeFilename("Aanya Sharma")).toBe("Aanya_Sharma");
  });

  it("strips path separators", () => {
    expect(sanitizeFilename("foo/bar\\baz")).toBe("foobarbaz");
  });

  it("keeps Unicode letters", () => {
    expect(sanitizeFilename("आन्या शर्मा")).toBe("आन्या_शर्मा");
  });
});

describe("buildReportZip", () => {
  it("builds a zip with one entry per input, named by index + sanitized name", async () => {
    const entries = [
      { fileLabel: "01-Aanya Sharma", blob: new Blob(["a"], { type: "application/pdf" }) },
      { fileLabel: "02-Rahul Iyer",   blob: new Blob(["b"], { type: "application/pdf" }) },
    ];
    const onProgress = vi.fn();
    const out = await buildReportZip(entries, onProgress);
    const zip = await JSZip.loadAsync(out);
    const names = Object.keys(zip.files).sort();
    expect(names).toEqual(["01-Aanya_Sharma.pdf", "02-Rahul_Iyer.pdf"]);
    expect(onProgress).toHaveBeenCalledWith(1, 2);
    expect(onProgress).toHaveBeenCalledWith(2, 2);
  });
});
