import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardBody, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { FormField } from "./ui/FormField";

/** Blocking first-login setup: just the school address. */
export default function SchoolSetupForm() {
  const save = useMutation(api.school.save);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await save({ address: address.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-sunken flex items-start justify-center p-6">
      <Card className="w-full max-w-lg mt-10">
        <CardHeader
          title="Set up your school"
          description="A one-time step before you start"
        />
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-5">
            <p className="text-sm text-ink-muted">
              Enter your school's address. After this you can register your
              classes — each class you register is sent to an admin for
              approval, and student logins are generated on approval.
            </p>
            <FormField label="School address">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, city, pincode"
                />
              )}
            </FormField>
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" loading={saving} disabled={saving}>
              Save and continue
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
