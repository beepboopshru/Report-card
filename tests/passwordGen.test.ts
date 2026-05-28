import { describe, it, expect } from "vitest";
import {
  generatePassword,
  PASSWORD_ALPHABET,
  PASSWORD_LENGTH,
} from "../convex/lib/passwordGen";

describe("generatePassword", () => {
  it("returns a string of PASSWORD_LENGTH characters", () => {
    const pw = generatePassword();
    expect(pw).toHaveLength(PASSWORD_LENGTH);
  });

  it("uses only characters from the unambiguous alphabet", () => {
    for (let i = 0; i < 100; i++) {
      const pw = generatePassword();
      for (const ch of pw) {
        expect(PASSWORD_ALPHABET).toContain(ch);
      }
    }
  });

  it("excludes ambiguous characters 0, O, l, 1, I", () => {
    for (const ch of "0Ol1I") {
      expect(PASSWORD_ALPHABET).not.toContain(ch);
    }
  });

  it("produces distinct values across draws (probabilistic)", () => {
    const draws = new Set<string>();
    for (let i = 0; i < 200; i++) draws.add(generatePassword());
    expect(draws.size).toBeGreaterThan(195);
  });
});
