import { errorMessage } from "../lib/errors";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Navigate, useNavigate } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isLoading)
    return <div className="p-6 text-sm text-ink-muted">Loading…</div>;
  if (isAuthenticated) return <Navigate to="/" replace />;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const normalized = normalizeUsername(username);
    try {
      assertValidUsername(normalized);
    } catch (err: unknown) {
      setError(errorMessage(err, "Invalid username."));
      setBusy(false);
      return;
    }
    try {
      await signIn("password", {
        username: normalized,
        password,
        flow: "signIn",
      });
      navigate("/");
    } catch (err: unknown) {
      // Convex Auth surfaces bad credentials as an opaque server error
      // (InvalidAccountId / InvalidSecret) — never show that raw text.
      const msg = errorMessage(err, "");
      setError(
        /InvalidAccountId|InvalidSecret|Server Error|Uncaught/i.test(msg)
          ? "Incorrect username or password."
          : "Sign in failed. Please check your connection and try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-accent-deep">Welcome back</h1>
        <p className="text-sm text-ink-muted mt-1">
          Sign in with the username and password you were given.
        </p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Username">
          {(id, describedBy) => (
            <Input
              id={id}
              type="text"
              required
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              aria-describedby={describedBy}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
        </FormField>
        <FormField label="Password">
          {(id, describedBy) => (
            <Input
              id={id}
              type="password"
              required
              autoComplete="current-password"
              aria-describedby={describedBy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </FormField>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={busy} className="w-full">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
