import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { canShareFiles, shareReportCard } from "./shareReportCard";

describe("canShareFiles", () => {
  it("returns false when navigator.canShare is missing", () => {
    expect(canShareFiles({} as Navigator)).toBe(false);
  });

  it("returns true when navigator.canShare reports support for files", () => {
    const nav = { canShare: vi.fn(() => true), share: vi.fn() } as unknown as Navigator;
    expect(canShareFiles(nav)).toBe(true);
  });

  it("returns false when navigator.canShare returns false", () => {
    const nav = { canShare: vi.fn(() => false), share: vi.fn() } as unknown as Navigator;
    expect(canShareFiles(nav)).toBe(false);
  });
});

describe("shareReportCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window.URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:mock"),
    });
    Object.defineProperty(window.URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("invokes navigator.share with a File when canShareFiles is true", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const nav = { canShare: () => true, share } as unknown as Navigator;
    const blob = new Blob(["x"], { type: "application/pdf" });
    await shareReportCard({
      blob,
      filename: "Aanya.pdf",
      title: "Aanya — Report",
      text: "Grade 4 report",
      navigator: nav,
      openUrl: vi.fn(),
    });
    expect(share).toHaveBeenCalled();
    const arg = share.mock.calls[0][0];
    expect(arg.files[0].name).toBe("Aanya.pdf");
    expect(arg.title).toBe("Aanya — Report");
  });

  it("falls back to download + openUrl when canShareFiles is false", async () => {
    const nav = {} as Navigator;
    const openUrl = vi.fn();
    const click = vi.fn();
    const a = document.createElement("a");
    a.click = click;
    vi.spyOn(document, "createElement").mockReturnValue(a);
    await shareReportCard({
      blob: new Blob(["x"], { type: "application/pdf" }),
      filename: "Aanya.pdf",
      title: "t",
      text: "x",
      navigator: nav,
      openUrl,
    });
    expect(click).toHaveBeenCalled();
    expect(openUrl).toHaveBeenCalledWith("https://web.whatsapp.com/");
  });
});
