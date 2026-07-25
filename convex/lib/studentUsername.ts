const MAX_USERNAME = 32;

/** Lowercase, keep [a-z0-9], collapse everything else into single dashes. */
export function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Username for a student login: "<name>.<class>", e.g. "ravi-s.class-4a".
 * `suffix` > 1 is appended to resolve collisions ("ravi-s.class-4a2").
 * Always fits the 3-32 char username rule.
 */
export function buildStudentUsername(
  studentName: string,
  className: string,
  suffix = 1,
): string {
  const tail = suffix > 1 ? String(suffix) : "";
  const cls = slugify(className).slice(0, 12);
  let name = slugify(studentName) || "student";
  const budget = MAX_USERNAME - tail.length - (cls ? cls.length + 1 : 0);
  name = name.slice(0, Math.max(budget, 3)).replace(/-+$/, "");
  const base = cls ? `${name}.${cls}` : name;
  const out = (base + tail).slice(0, MAX_USERNAME);
  return out.length >= 3 ? out : `student${tail}`.slice(0, MAX_USERNAME);
}
