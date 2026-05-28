const USERNAME_RE = /^[a-z0-9._-]{3,32}$/;
const VALID_CHARS_RE = /^[a-z0-9._-]+$/;

export function normalizeUsername(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw.trim().toLowerCase();
}

export function assertValidUsername(name: string): void {
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("Username is required.");
  }
  if (!USERNAME_RE.test(name)) {
    // Distinguish between length and character errors
    if (!VALID_CHARS_RE.test(name)) {
      throw new Error(
        "Username may only contain lowercase letters, digits, '.', '_', '-'.",
      );
    } else {
      throw new Error("Username must be 3-32 characters.");
    }
  }
}
