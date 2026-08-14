// src/pages/AdminDashboard.tsx
// One admin page: accounts (schools/teachers/single-users), their logins,
// and their classes — merged from the old Logins and Classes pages.
import { Link } from "react-router-dom";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useState, useMemo } from "react";
import {
  Boxes,
  Search,
  X,
  Plus,
  Ban,
  RotateCcw,
  FileText,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { categoryTone } from "../lib/badgeUtils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import CreateTeacherModal from "../components/CreateTeacherModal";
import CredentialsModal from "../components/CredentialsModal";
import ManageLmsModal from "../components/ManageLmsModal";
import { LMS_LEVELS } from "../../convex/lib/lmsCatalog";

type RecreateResult = {
  className: string;
  teacherName: string;
  created: number;
  password: string | null;
  error: string | null;
};

export default function AdminDashboard() {
  const logins = useQuery(api.admin.listLogins);
  const classes = useQuery(api.classes.listAllForAdmin);
  const teacherLevels = useQuery(api.lms.allTeacherLevels);
  // Classes can only be given LMS from what the account got in Manage LMS.
  const allowedByProfile = useMemo(() => {
    const map = new Map<string, Map<string, string[]>>();
    for (const r of teacherLevels ?? []) {
      const forProfile =
        map.get(r.teacherProfileId) ?? new Map<string, string[]>();
      forProfile.set(r.levelId, r.grades);
      map.set(r.teacherProfileId, forProfile);
    }
    return map;
  }, [teacherLevels]);

  const resetPassword = useAction(api.admin.resetTeacherPassword);
  const setDisabled = useAction(api.admin.setTeacherDisabled);
  const convertToFullAccount = useMutation(api.admin.convertToFullAccount);
  const renameLogin = useMutation(api.admin.renameTeacherLogin);
  const approveClass = useAction(api.enrollment.approveClass);
  const resetClassPassword = useAction(api.enrollment.resetClassPassword);
  const recreateClassLogins = useAction(api.enrollment.recreateClassLogins);
  const recreateAllLogins = useAction(api.enrollment.recreateAllLogins);
  const setClassLevels = useMutation(api.lms.setClassLevels);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [loginsId, setLoginsId] = useState<Id<"classes"> | null>(null);
  const credentials = useQuery(
    api.students.credentialsForClass,
    loginsId ? { classId: loginsId } : "skip",
  );
  const [search, setSearch] = useState("");
  const [showDisabled, setShowDisabled] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [kitsFor, setKitsFor] = useState<Id<"profiles"> | null>(null);
  const [lmsFor, setLmsFor] = useState<{
    profileId: Id<"profiles">;
    name: string;
  } | null>(null);
  const [creating, setCreating] = useState(false);
  const [createdCreds, setCreatedCreds] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [recreatingAll, setRecreatingAll] = useState(false);
  const [recreateResults, setRecreateResults] = useState<
    RecreateResult[] | null
  >(null);

  type ClassRow = NonNullable<typeof classes>[number];
  type Account = NonNullable<typeof logins>[number];

  const years = [...new Set(classes?.map((c) => c.academicYear) ?? [])].sort();
  const q = search.trim().toLowerCase();
  const filtering = !!(q || statusFilter || yearFilter);

  // Classes per account, class-level filters applied. Awaiting-approval
  // classes first, newest created first within each group.
  const classesByProfile = useMemo(() => {
    const map = new Map<string, ClassRow[]>();
    const filtered = (classes ?? [])
      .filter(
        (c) =>
          (!statusFilter || c.status === statusFilter) &&
          (!yearFilter || c.academicYear === yearFilter) &&
          (!q ||
            c.name.toLowerCase().includes(q) ||
            c.teacherName.toLowerCase().includes(q)),
      )
      .sort(
        (a, b) =>
          Number(b.status === "submitted") - Number(a.status === "submitted") ||
          b._creationTime - a._creationTime,
      );
    for (const c of filtered) {
      const group = map.get(c.teacherProfileId);
      if (group) group.push(c);
      else map.set(c.teacherProfileId, [c]);
    }
    return map;
  }, [classes, q, statusFilter, yearFilter]);

  // Accounts to show: search matches the account itself or one of its
  // classes; class-only filters hide accounts with no matching class.
  // Groups with classes awaiting approval float to the top.
  const accounts = (logins ?? [])
    .filter((l) => {
      if (!showDisabled && l.disabled) return false;
      const cls = classesByProfile.get(l.profileId) ?? [];
      if (statusFilter || yearFilter) return cls.length > 0;
      if (!q) return true;
      return (
        l.displayName.toLowerCase().includes(q) ||
        l.username.toLowerCase().includes(q) ||
        cls.length > 0
      );
    })
    .sort((a, b) => {
      const submitted = (l: Account) =>
        (classesByProfile.get(l.profileId) ?? []).some(
          (c) => c.status === "submitted",
        );
      return (
        Number(a.disabled ?? false) - Number(b.disabled ?? false) ||
        Number(submitted(b)) - Number(submitted(a)) ||
        a.displayName.localeCompare(b.displayName)
      );
    });

  const kitsAccount = accounts.find((l) => l.profileId === kitsFor);

  async function onEditUsername(profileId: Id<"profiles">, current: string) {
    const typed = prompt(
      `New username for @${current}.\n` +
        "3-32 characters: lowercase letters, digits, '.', '_', '-'.\n\n" +
        "The password stays the same; they stay signed in.",
      current,
    );
    if (typed === null || typed.trim() === "" || typed.trim() === current)
      return;
    setBusyId(profileId);
    try {
      await renameLogin({ profileId, username: typed });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Username change failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onEditPassword(profileId: Id<"profiles">, username: string) {
    const typed = prompt(
      `New password for @${username} (min 8 characters).\n` +
        "Leave blank to generate a random one.\n\n" +
        "They will be signed out everywhere.",
    );
    if (typed === null) return;
    setBusyId(profileId);
    try {
      await resetPassword({ profileId, password: typed.trim() || undefined });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onConvert(profileId: Id<"profiles">, name: string) {
    if (
      !confirm(
        `Convert ${name} to a school/teacher account?\n\n` +
          "They gain the school setup, class registration, and approval " +
          "workflow on next login. Assigned courses are kept. This cannot " +
          "be undone from here.",
      )
    )
      return;
    setBusyId(profileId);
    try {
      await convertToFullAccount({ profileId });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onToggleDisabled(
    profileId: Id<"profiles">,
    username: string,
    nextDisabled: boolean,
  ) {
    const verb = nextDisabled ? "Disable" : "Enable";
    if (!confirm(`${verb} ${username}?`)) return;
    setBusyId(profileId);
    try {
      await setDisabled({ profileId, disabled: nextDisabled });
    } catch (err) {
      alert(err instanceof Error ? err.message : `${verb} failed`);
    } finally {
      setBusyId(null);
    }
  }

  async function onApprove(
    classId: Id<"classes">,
    className: string,
    declared: { students: number; sections: number; grades: number } | null,
  ) {
    const declaredLine = declared
      ? `The school's setup declares ${declared.students} students across ${declared.sections} grade-section${declared.sections === 1 ? "" : "s"} (${declared.grades} grade${declared.grades === 1 ? "" : "s"}). Match this against your sales record to proceed.`
      : "This school has not filled in its setup details yet, so there is no declared student count to match against your sales record.";
    if (
      !confirm(
        `Approve "${className}" and create a login for every student without one?\n\n${declaredLine}`,
      )
    )
      return;
    setBusyId(classId);
    try {
      const { created } = await approveClass({ classId });
      alert(
        created === 0
          ? "All students already have logins."
          : `Created ${created} student login${created === 1 ? "" : "s"}. The teacher can now download them from the class page.`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Approval failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onResetClassPassword(
    classId: Id<"classes">,
    className: string,
  ) {
    if (
      !confirm(
        `Give every student in "${className}" one new shared password?\n\nOld passwords stop working and students are signed out. The teacher can re-download the credential sheet afterwards.`,
      )
    )
      return;
    setBusyId(classId);
    try {
      const { password, updated } = await resetClassPassword({ classId });
      alert(
        `Set shared password for ${updated} student${updated === 1 ? "" : "s"}:\n\n${password}`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Password reset failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onRecreateLogins(classId: Id<"classes">, className: string) {
    if (
      !confirm(
        `Recreate ALL student logins in "${className}"?\n\nEvery existing login is deleted and rebuilt from the current roster: new usernames, one new shared password, all students signed out. Report card and quiz data is kept.\n\nThis cannot be undone.`,
      )
    )
      return;
    setBusyId(classId);
    try {
      const { created, password } = await recreateClassLogins({ classId });
      alert(
        `Recreated ${created} login${created === 1 ? "" : "s"}. New shared password:\n\n${password}\n\nThe teacher can re-download the credential sheet from the class page.`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Recreating logins failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onRecreateAll() {
    const typed = prompt(
      "This deletes and rebuilds EVERY student login in EVERY class:\n\n" +
        "• New usernames from current student/class names\n" +
        "• One new shared password per class\n" +
        "• All students signed out everywhere\n" +
        "• Report card and quiz data is kept\n\n" +
        "This cannot be undone. Type RECREATE to continue.",
    );
    if (typed !== "RECREATE") return;
    setRecreatingAll(true);
    setRecreateResults(null);
    try {
      setRecreateResults(await recreateAllLogins({}));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Recreating logins failed");
    } finally {
      setRecreatingAll(false);
    }
  }

  type LevelAssignment = { levelId: string; grades: string[] };

  async function toggleLevel(
    classId: Id<"classes">,
    current: LevelAssignment[],
    level: (typeof LMS_LEVELS)[number],
    allowedGrades: string[],
  ) {
    // Checking a level assigns all its allowed classes; uncheck individual
    // ones below.
    const next = current.some((l) => l.levelId === level.id)
      ? current.filter((l) => l.levelId !== level.id)
      : [...current, { levelId: level.id, grades: allowedGrades }];
    await setClassLevels({ classId, levels: next });
  }

  async function toggleGrade(
    classId: Id<"classes">,
    current: LevelAssignment[],
    level: (typeof LMS_LEVELS)[number],
    grade: string,
  ) {
    const entry = current.find((l) => l.levelId === level.id);
    if (!entry) return;
    const grades = entry.grades.includes(grade)
      ? entry.grades.filter((g) => g !== grade)
      : level.grades.filter((g) => entry.grades.includes(g) || g === grade);
    // Unchecking the last class unassigns the level.
    const next = grades.length
      ? current.map((l) => (l.levelId === level.id ? { ...l, grades } : l))
      : current.filter((l) => l.levelId !== level.id);
    await setClassLevels({ classId, levels: next });
  }

  return (
    <>
      <PageHeader
        title="Schools / Teachers"
        description="Accounts, logins, and classes in one place. One account can be shared by a school's staff; passwords are stored so you can re-share them."
        actions={
          <div className="flex gap-2">
            <Link to="/admin/kits">
              <Button variant="secondary">
                <Boxes className="w-4 h-4" />
                Browse kits
              </Button>
            </Link>
            <Link to="/admin/grades">
              <Button variant="secondary">Grade sheets</Button>
            </Link>
            <Button onClick={() => setCreating(true)}>
              <Plus className="w-4 h-4" />
              Create account
            </Button>
          </div>
        }
      />

      {logins && logins.length > 0 && (
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <div className="relative sm:flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <Input
              type="search"
              placeholder="Search by account, username, or class…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-line bg-surface px-3 py-2 text-sm"
            aria-label="Filter by class status"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="submitted">Awaiting approval</option>
            <option value="approved">Approved</option>
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded border border-line bg-surface px-3 py-2 text-sm"
            aria-label="Filter by academic year"
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <label className="inline-flex items-center gap-2 rounded border border-line bg-surface px-3 py-2 text-sm cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              checked={showDisabled}
              onChange={(e) => setShowDisabled(e.target.checked)}
              className="accent-accent"
            />
            Show disabled
          </label>
        </div>
      )}

      {logins === undefined || classes === undefined ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : logins.length === 0 ? (
        <EmptyState
          title="No accounts yet"
          description='Click "Create account" above to provision the first account.'
        />
      ) : accounts.length === 0 ? (
        <EmptyState
          title="No matches"
          description="Try a different search or clear the filters."
        />
      ) : (
        <div className="space-y-3">
          {accounts.map((l) => {
            const accountClasses = classesByProfile.get(l.profileId) ?? [];
            const accountAllowed = allowedByProfile.get(l.profileId);
            const students = accountClasses.reduce(
              (n, c) => n + c.studentCount,
              0,
            );
            return (
              <details
                key={l.profileId}
                // Auto-expand while searching/filtering so matches are visible.
                open={filtering || undefined}
                className="rounded-lg border border-line bg-surface"
              >
                <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
                  <span className="font-medium text-ink">{l.displayName}</span>
                  <span className="text-sm text-ink-muted">@{l.username}</span>
                  <Badge tone={l.lmsOnly ? "ok" : "neutral"} size="sm">
                    {l.lmsOnly ? "Single user" : "School / teacher"}
                  </Badge>
                  {l.disabled && (
                    <Badge tone="bad" size="sm">
                      Disabled
                    </Badge>
                  )}
                  {accountClasses.length > 0 && (
                    <span className="text-sm text-ink-muted">
                      {accountClasses.length} class
                      {accountClasses.length === 1 ? "" : "es"} · {students}{" "}
                      students
                    </span>
                  )}
                  {accountClasses.some((c) => c.status === "submitted") && (
                    <Badge tone="warn">Awaiting approval</Badge>
                  )}
                </summary>
                <div className="space-y-4 border-t border-line p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                    <span className="text-ink-muted">
                      Password:{" "}
                      {l.password ? (
                        <span className="font-mono text-ink">{l.password}</span>
                      ) : (
                        <span className="text-ink-subtle">— edit to set</span>
                      )}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setKitsFor(l.profileId)}
                      >
                        Manage kits
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          setLmsFor({
                            profileId: l.profileId,
                            name: l.displayName,
                          })
                        }
                      >
                        Manage LMS
                      </Button>
                      {l.lmsOnly && (
                        <Button
                          size="sm"
                          variant="secondary"
                          loading={busyId === l.profileId}
                          onClick={() => onConvert(l.profileId, l.displayName)}
                        >
                          Make school / teacher
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={busyId === l.profileId}
                        onClick={() => onEditUsername(l.profileId, l.username)}
                      >
                        Edit username
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={busyId === l.profileId}
                        onClick={() => onEditPassword(l.profileId, l.username)}
                      >
                        Edit password
                      </Button>
                      <Button
                        size="sm"
                        variant={l.disabled ? "secondary" : "danger"}
                        loading={busyId === l.profileId}
                        onClick={() =>
                          onToggleDisabled(l.profileId, l.username, !l.disabled)
                        }
                      >
                        {l.disabled ? (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            Enable
                          </>
                        ) : (
                          <>
                            <Ban className="w-3.5 h-3.5" />
                            Disable
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {accountClasses.length === 0 ? (
                    <p className="text-sm text-ink-muted">No classes yet.</p>
                  ) : l.disabled ? (
                    // Disabled account = classes archived: data kept, read-only.
                    accountClasses.map((c) => (
                      <div
                        key={c._id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-sm"
                      >
                        <div>
                          <span className="font-medium text-ink">{c.name}</span>
                          <span className="text-ink-muted">
                            {" "}
                            · {c.academicYear} · {c.studentCount} students
                          </span>
                        </div>
                        <Link
                          to={`/class/${c._id}/report`}
                          className="inline-flex items-center gap-1 text-accent hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Class report
                        </Link>
                      </div>
                    ))
                  ) : (
                    accountClasses.map((c) => (
                      <Card key={c._id}>
                        <CardHeader
                          title={c.name}
                          description={c.academicYear}
                          action={
                            c.status === "approved" ? (
                              <Badge tone="good">Approved</Badge>
                            ) : c.status === "submitted" ? (
                              <Badge tone="warn">Awaiting approval</Badge>
                            ) : (
                              <Badge>Draft</Badge>
                            )
                          }
                        />
                        <CardBody>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
                            <span>
                              <span className="font-medium text-ink">
                                {c.studentCount}
                              </span>{" "}
                              students
                            </span>
                            <span>
                              <span className="font-medium text-ink">
                                {c.accountCount}
                              </span>{" "}
                              logins
                            </span>
                            <span>
                              Declared:{" "}
                              <span className="font-medium text-ink">
                                {c.declared
                                  ? `${c.declared.students} students · ${c.declared.sections} sections`
                                  : "—"}
                              </span>
                            </span>
                            <span>
                              Avg score:{" "}
                              <span className="font-medium text-ink">
                                {c.avgScorePct === null
                                  ? "—"
                                  : `${c.avgScorePct}%`}
                              </span>
                            </span>
                            <Link
                              to={`/class/${c._id}`}
                              className="inline-flex items-center gap-1 text-accent hover:underline"
                            >
                              <Users className="w-3.5 h-3.5" />
                              Students & scores
                            </Link>
                            <Link
                              to={`/class/${c._id}/report`}
                              className="inline-flex items-center gap-1 text-accent hover:underline"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Class report
                            </Link>
                          </div>

                          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                            <fieldset className="space-y-2">
                              <legend className="sr-only">
                                LMS levels for {c.name}
                              </legend>
                              <span className="text-xs uppercase tracking-wide text-ink-subtle font-semibold">
                                LMS
                              </span>
                              {!accountAllowed?.size ? (
                                <p className="text-xs text-ink-muted">
                                  Give this account LMS courses via "Manage
                                  LMS" first.
                                </p>
                              ) : (
                                LMS_LEVELS.filter((level) =>
                                  accountAllowed.has(level.id),
                                ).map((level) => {
                                  const allowedGrades = accountAllowed.get(
                                    level.id,
                                  )!;
                                  const assigned = c.lmsLevels.find(
                                    (lv) => lv.levelId === level.id,
                                  );
                                  return (
                                    <div key={level.id}>
                                      <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={!!assigned}
                                          onChange={() =>
                                            toggleLevel(
                                              c._id,
                                              c.lmsLevels,
                                              level,
                                              allowedGrades,
                                            )
                                          }
                                        />
                                        {level.name}
                                      </label>
                                      {/* BLIX's single pseudo-grade "all" needs no per-class row */}
                                      {assigned && level.grades.length > 1 && (
                                        <div className="ml-6 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                          {level.grades
                                            .filter((grade) =>
                                              allowedGrades.includes(grade),
                                            )
                                            .map((grade) => (
                                              <label
                                                key={grade}
                                                className="inline-flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer"
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={assigned.grades.includes(
                                                    grade,
                                                  )}
                                                  onChange={() =>
                                                    toggleGrade(
                                                      c._id,
                                                      c.lmsLevels,
                                                      level,
                                                      grade,
                                                    )
                                                  }
                                                />
                                                Class {grade}
                                              </label>
                                            ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </fieldset>
                            <div className="flex flex-wrap gap-2">
                              {c.accountCount > 0 && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                      setLoginsId(
                                        loginsId === c._id ? null : c._id,
                                      )
                                    }
                                  >
                                    {loginsId === c._id
                                      ? "Hide logins"
                                      : "View logins"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                      onResetClassPassword(c._id, c.name)
                                    }
                                    disabled={busyId === c._id}
                                  >
                                    New class password
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                      onRecreateLogins(c._id, c.name)
                                    }
                                    disabled={busyId === c._id}
                                  >
                                    Recreate all logins
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                onClick={() =>
                                  onApprove(c._id, c.name, c.declared)
                                }
                                disabled={
                                  busyId === c._id || c.studentCount === 0
                                }
                                loading={busyId === c._id}
                              >
                                {c.status === "approved"
                                  ? "Create missing logins"
                                  : "Approve & create logins"}
                              </Button>
                            </div>
                          </div>

                          {loginsId === c._id && (
                            <div className="mt-4 overflow-x-auto">
                              {!credentials ? (
                                <p className="text-sm text-ink-muted">
                                  Loading logins…
                                </p>
                              ) : credentials.filter((r) => r.username)
                                  .length === 0 ? (
                                <p className="text-sm text-ink-muted">
                                  No logins yet.
                                </p>
                              ) : (
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="text-left text-xs uppercase tracking-wide text-ink-subtle">
                                      <th className="py-2 pr-4">Student</th>
                                      <th className="py-2 pr-4">Roll no</th>
                                      <th className="py-2 pr-4">Username</th>
                                      <th className="py-2">Password</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {credentials
                                      .filter((r) => r.username)
                                      .map((r, i) => (
                                        <tr
                                          key={i}
                                          className="border-t border-line"
                                        >
                                          <td className="py-2 pr-4 font-medium text-ink">
                                            {r.name}
                                          </td>
                                          <td className="py-2 pr-4 text-ink-muted">
                                            {r.rollNo || "—"}
                                          </td>
                                          <td className="py-2 pr-4 font-mono">
                                            {r.username}
                                          </td>
                                          <td className="py-2 font-mono">
                                            {r.password || "—"}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    ))
                  )}
                </div>
              </details>
            );
          })}
        </div>
      )}

      <Card className="mt-8">
        <CardHeader
          title="Recreate all logins"
          description="Every active class, in one pass. Cannot be undone."
        />
        <CardBody>
          <p className="text-sm text-ink-muted mb-4">
            Deletes every student login in every active class and provisions
            fresh ones: usernames rebuilt from current student and class names,
            one new shared password per class. All students are signed out.
            Report card scores and quiz data are kept. Archived classes are
            skipped.
          </p>
          <Button
            onClick={onRecreateAll}
            disabled={recreatingAll}
            loading={recreatingAll}
          >
            {recreatingAll ? "Recreating…" : "Recreate all logins"}
          </Button>
          {recreatingAll && (
            <p className="mt-2 text-sm text-ink-muted">
              This runs class by class and can take a while — leave this page
              open.
            </p>
          )}
        </CardBody>
      </Card>

      {recreateResults && (
        <Card className="mt-4">
          <CardHeader
            title={`Done — ${recreateResults.filter((r) => !r.error).length} of ${recreateResults.length} class${recreateResults.length === 1 ? "" : "es"} recreated`}
            description="New shared passwords per class. Teachers can re-download credential sheets from their class pages."
          />
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-ink-subtle">
                    <th className="py-2 pr-4">Class</th>
                    <th className="py-2 pr-4">Teacher</th>
                    <th className="py-2 pr-4">Logins</th>
                    <th className="py-2">New password</th>
                  </tr>
                </thead>
                <tbody>
                  {recreateResults.map((r, i) => (
                    <tr key={i} className="border-t border-line">
                      <td className="py-2 pr-4 font-medium text-ink">
                        {r.className}
                      </td>
                      <td className="py-2 pr-4 text-ink-muted">
                        {r.teacherName}
                      </td>
                      <td className="py-2 pr-4">{r.created}</td>
                      <td className="py-2 font-mono">
                        {r.error ? (
                          <span className="font-sans text-danger">
                            Failed: {r.error}
                          </span>
                        ) : (
                          r.password
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {kitsAccount && (
        <AssignmentsDrawer
          teacher={{
            _id: kitsAccount.profileId,
            displayName: kitsAccount.displayName,
            username: kitsAccount.username,
          }}
          onClose={() => setKitsFor(null)}
        />
      )}
      {lmsFor && (
        <ManageLmsModal
          teacherProfileId={lmsFor.profileId}
          name={lmsFor.name}
          onClose={() => setLmsFor(null)}
        />
      )}
      {creating && (
        <CreateTeacherModal
          onClose={() => setCreating(false)}
          onCreated={(creds) => {
            setCreating(false);
            setCreatedCreds(creds);
          }}
        />
      )}
      {createdCreds && (
        <CredentialsModal
          username={createdCreds.username}
          password={createdCreds.password}
          onClose={() => setCreatedCreds(null)}
        />
      )}
    </>
  );
}

function AssignmentsDrawer({
  teacher,
  onClose,
}: {
  teacher: { _id: Id<"profiles">; displayName: string; username: string };
  onClose: () => void;
}) {
  const kits = useQuery(api.kits.list);
  const assigned = useQuery(api.assignments.listForTeacher, {
    teacherProfileId: teacher._id,
  });
  const setAssign = useMutation(api.assignments.set);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<
    "all" | "Explorer" | "Discoverer" | "Robotics"
  >("all");

  const assignedSet = useMemo(
    () => new Set(assigned?.map((a) => a.kitId) ?? []),
    [assigned],
  );

  const visible = useMemo(() => {
    if (!kits) return [];
    const lq = q.trim().toLowerCase();
    return kits.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!lq) return true;
      return (
        k.kitName.toLowerCase().includes(lq) ||
        String(k.kitNumber).includes(lq)
      );
    });
  }, [kits, q, filter]);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div
        className="absolute inset-0 bg-ink/30"
        onClick={onClose}
        aria-hidden
      />
      <aside className="relative w-full max-w-md bg-surface shadow-pop h-full flex flex-col">
        <header className="px-5 py-4 border-b border-line/60 flex items-center justify-between">
          <div className="min-w-0">
            <div className="font-medium text-ink truncate">
              {teacher.displayName}
            </div>
            <div className="text-xs text-ink-muted truncate">
              @{teacher.username} · {assignedSet.size} of {kits?.length ?? 0} assigned
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="px-5 py-3 border-b border-line/60 flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[150px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search kits…"
              className="pl-9"
            />
          </div>
          <div className="flex gap-1 bg-surface-muted rounded-md p-1">
            {(["all", "Explorer", "Discoverer", "Robotics"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 h-7 rounded text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-surface text-ink shadow-card"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y divide-line/60">
          {visible.map((k) => {
            const checked = assignedSet.has(k._id);
            return (
              <li
                key={k._id}
                className="px-5 py-3 flex items-center justify-between gap-3 text-sm"
              >
                <label className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setAssign({
                        teacherProfileId: teacher._id,
                        kitId: k._id,
                        assigned: e.target.checked,
                      })
                    }
                    className="mt-0.5 accent-accent"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">
                      #{k.kitNumber} · {k.kitName}
                    </div>
                    <div className="text-xs text-ink-muted truncate">
                      Grade {k.grade} · {k.subject}
                    </div>
                  </div>
                </label>
                <Badge tone={categoryTone(k.category)} size="sm">
                  {k.category}
                </Badge>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
