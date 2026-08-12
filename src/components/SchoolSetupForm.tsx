import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardBody, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { FormField } from "./ui/FormField";

/** Blocking first-login setup: school details. */
export default function SchoolSetupForm() {
  const save = useMutation(api.school.save);
  const [schoolName, setSchoolName] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [coordinatorName, setCoordinatorName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [studentsRegistered, setStudentsRegistered] = useState("");
  const [address, setAddress] = useState("");
  const [timings, setTimings] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const count = Number(studentsRegistered);
    if (!Number.isInteger(count) || count < 1) {
      setError("Number of students registered must be a positive number");
      return;
    }
    setSaving(true);
    try {
      await save({
        schoolName: schoolName.trim(),
        principalName: principalName.trim(),
        coordinatorName: coordinatorName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail.trim() || undefined,
        studentsRegistered: count,
        address: address.trim(),
        timings: timings.trim(),
      });
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
              Enter your school's details. After this you can register your
              classes — each class you register is sent to an admin for
              approval, and student logins are generated on approval.
            </p>
            <FormField label="School name">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              )}
            </FormField>
            <FormField label="Principal name">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                />
              )}
            </FormField>
            <FormField label="Coordinator name">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={coordinatorName}
                  onChange={(e) => setCoordinatorName(e.target.value)}
                />
              )}
            </FormField>
            <FormField label="Contact number">
              {(id) => (
                <Input
                  id={id}
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              )}
            </FormField>
            <FormField label="Email (optional)">
              {(id) => (
                <Input
                  id={id}
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              )}
            </FormField>
            <FormField label="No. of students registered">
              {(id) => (
                <Input
                  id={id}
                  type="number"
                  min={1}
                  step={1}
                  required
                  value={studentsRegistered}
                  onChange={(e) => setStudentsRegistered(e.target.value)}
                />
              )}
            </FormField>
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
            <FormField label="School timings">
              {(id) => (
                <Input
                  id={id}
                  required
                  value={timings}
                  onChange={(e) => setTimings(e.target.value)}
                  placeholder="e.g. 8:30 AM – 3:30 PM"
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
