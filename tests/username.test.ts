import { describe, it, expect } from "vitest";
import { normalizeUsername, assertValidUsername } from "../convex/lib/username";

describe("normalizeUsername", () => {
  it("lowercases and trims whitespace", () => {
    expect(normalizeUsername("  Alice  ")).toBe("alice");
    expect(normalizeUsername("BOB.MILLER")).toBe("bob.miller");
  });
  it("returns empty string for non-string input", () => {
    expect(normalizeUsername(undefined as unknown as string)).toBe("");
    expect(normalizeUsername(null as unknown as string)).toBe("");
  });
});

describe("assertValidUsername", () => {
  it("accepts valid usernames", () => {
    for (const u of ["abc", "user_1", "a.b-c", "12345", "a".repeat(32)]) {
      expect(() => assertValidUsername(u)).not.toThrow();
    }
  });
  it("rejects too short", () => {
    expect(() => assertValidUsername("ab")).toThrow(/3-32/);
  });
  it("rejects too long", () => {
    expect(() => assertValidUsername("a".repeat(33))).toThrow(/3-32/);
  });
  it("rejects uppercase or disallowed characters", () => {
    for (const u of ["Alice", "user name", "a!", "a@b", "café"]) {
      expect(() => assertValidUsername(u)).toThrow(/lowercase letters/);
    }
  });
  it("rejects empty string", () => {
    expect(() => assertValidUsername("")).toThrow();
  });
});
