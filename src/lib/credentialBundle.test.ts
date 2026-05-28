import { describe, it, expect } from "vitest";
import { formatCredentialBundle } from "./credentialBundle";

describe("formatCredentialBundle", () => {
  it("includes the sign-in URL built from origin", () => {
    const text = formatCredentialBundle({
      origin: "https://example.com",
      username: "alice",
      password: "Abc23xyzPQR9",
    });
    expect(text).toContain("Sign in: https://example.com/sign-in");
  });

  it("includes the username and password", () => {
    const text = formatCredentialBundle({
      origin: "https://x.test",
      username: "alice",
      password: "Abc23xyzPQR9",
    });
    expect(text).toContain("Username: alice");
    expect(text).toContain("Password: Abc23xyzPQR9");
  });

  it("includes usage instructions and the lost-password note", () => {
    const text = formatCredentialBundle({
      origin: "https://x.test",
      username: "alice",
      password: "p",
    });
    expect(text).toContain("How to use:");
    expect(text).toContain('Go to "My Classes"');
    expect(text).toMatch(/admin to reset/);
  });

  it("strips a trailing slash from origin so URL has no double slash", () => {
    const text = formatCredentialBundle({
      origin: "https://x.test/",
      username: "u",
      password: "p",
    });
    expect(text).toContain("Sign in: https://x.test/sign-in");
    expect(text).not.toContain("//sign-in");
  });
});
