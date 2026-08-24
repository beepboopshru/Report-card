import { ConvexError } from "convex/values";

// Prod Convex redacts plain Errors to "Server Error"; ConvexError keeps its
// payload in err.data. Backend user-facing throws use ConvexError for this.
export function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ConvexError) return String(err.data);
  if (err instanceof Error) return err.message;
  return fallback;
}
