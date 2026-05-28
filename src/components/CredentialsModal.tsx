import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { Button } from "./ui/Button";
import { formatCredentialBundle } from "../lib/credentialBundle";

interface Props {
  username: string;
  password: string;
  onClose: () => void;
}

export default function CredentialsModal({
  username,
  password,
  onClose,
}: Props) {
  const [copied, setCopied] = useState(false);
  const text = formatCredentialBundle({
    origin: window.location.origin,
    username,
    password,
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked — user can still select manually.
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-lg bg-surface rounded-lg shadow-pop">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <h2 className="font-serif text-lg text-accent-deep">
            Share these credentials
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="p-5 space-y-4">
          <p className="text-sm text-ink-muted">
            This password is shown only once. Copy the whole bundle and send it
            to <strong className="text-ink">{username}</strong>.
          </p>
          <pre className="font-mono text-xs whitespace-pre-wrap bg-surface-muted rounded border border-line p-3 max-h-80 overflow-y-auto">
            {text}
          </pre>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={onClose}>
              Done
            </Button>
            <Button onClick={copy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy bundle
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
