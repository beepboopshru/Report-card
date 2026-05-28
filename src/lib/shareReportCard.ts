export function canShareFiles(nav: Navigator): boolean {
  const c = (nav as Navigator & { canShare?: (data: unknown) => boolean }).canShare;
  if (typeof c !== "function") return false;
  try {
    return c.call(nav, { files: [] });
  } catch {
    return false;
  }
}

export async function shareReportCard(opts: {
  blob: Blob;
  filename: string;
  title: string;
  text: string;
  navigator?: Navigator;
  openUrl?: (url: string) => void;
}): Promise<"shared" | "downloaded"> {
  const nav = opts.navigator ?? globalThis.navigator;
  const open = opts.openUrl ?? ((url: string) => window.open(url, "_blank"));
  if (canShareFiles(nav)) {
    const file = new File([opts.blob], opts.filename, { type: "application/pdf" });
    try {
      await (nav as Navigator & {
        share: (data: { files: File[]; title: string; text: string }) => Promise<void>;
      }).share({ files: [file], title: opts.title, text: opts.text });
      return "shared";
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return "downloaded";
    }
  }
  const url = URL.createObjectURL(opts.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = opts.filename;
  a.click();
  URL.revokeObjectURL(url);
  open("https://web.whatsapp.com/");
  return "downloaded";
}
