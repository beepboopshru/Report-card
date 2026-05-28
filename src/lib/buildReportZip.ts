import JSZip from "jszip";

export type ZipEntry = { fileLabel: string; blob: Blob };

export function sanitizeFilename(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "_");
}

export async function buildReportZip(
  entries: ZipEntry[],
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const zip = new JSZip();
  for (let i = 0; i < entries.length; i++) {
    const { fileLabel, blob } = entries[i];
    zip.file(`${sanitizeFilename(fileLabel)}.pdf`, blob);
    onProgress?.(i + 1, entries.length);
  }
  return zip.generateAsync({ type: "blob" });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
