import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-accent-deep">Welcome back</h1>
        <p className="text-sm text-ink-muted mt-1">Sign in to keep scoring.</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Email">
          {(id, describedBy) => (
            <Input
              id={id}
              type="email"
              required
              autoComplete="email"
              aria-describedby={describedBy}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <p className="text-xs text-ink-muted text-center pt-1">
          No account?{" "}
          <Link to="/sign-up" className="text-accent hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
