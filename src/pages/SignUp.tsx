import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
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
      await signIn("password", { email, password, flow: "signUp" });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border rounded-2xl p-8 space-y-4">
        <h1 className="font-serif text-2xl text-accent">Create account</h1>
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-gray-500">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                 className="mt-1 w-full border rounded-md px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-gray-500">Password</span>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                 className="mt-1 w-full border rounded-md px-3 py-2 text-sm" />
        </label>
        {error && <p className="text-sm text-bad-600">{error}</p>}
        <button disabled={busy} className="w-full bg-accent text-white rounded-md py-2 text-sm font-medium disabled:opacity-50">
          {busy ? "Creating..." : "Create account"}
        </button>
        <p className="text-xs text-gray-500 text-center">
          Already have one? <Link to="/sign-in" className="text-accent underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
