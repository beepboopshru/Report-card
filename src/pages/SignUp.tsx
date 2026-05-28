import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  assertValidUsername,
  normalizeUsername,
} from "../../convex/lib/username";

export default function SignUp() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const normalized = normalizeUsername(username);
      assertValidUsername(normalized);
      await signIn("password", {
        username: normalized,
        password,
        flow: "signUp",
      });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-accent-deep">Create account</h1>
        <p className="text-sm text-ink-muted mt-1">
          Start scoring your first class in minutes.
        </p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Username"
          hint="Lowercase letters, digits, '.', '_', '-'. 3-32 characters."
        >
          {(id, describedBy) => (
            <Input
              id={id}
              type="text"
              required
              minLength={3}
              maxLength={32}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              pattern="[a-z0-9._\-]{3,32}"
              aria-describedby={describedBy}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
        </FormField>
        <FormField label="Password" hint="At least 8 characters.">
          {(id, describedBy) => (
            <Input
              id={id}
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              aria-describedby={describedBy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </FormField>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={busy} className="w-full">
          {busy ? "Creating…" : "Create account"}
        </Button>
        <p className="text-xs text-ink-muted text-center pt-1">
          Already have one?{" "}
          <Link to="/sign-in" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
