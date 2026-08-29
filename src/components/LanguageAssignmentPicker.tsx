import {
  DEFAULT_LMS_LANGUAGES,
  LMS_LANGUAGES,
  type LmsLanguageId,
} from "../../convex/lib/lmsCatalog";

interface Props {
  value: LmsLanguageId[];
  onChange: (next: LmsLanguageId[]) => void;
}

/** Account-wide LMS language picker. English cannot be removed. */
export default function LanguageAssignmentPicker({ value, onChange }: Props) {
  const selected = new Set<LmsLanguageId>([
    ...DEFAULT_LMS_LANGUAGES,
    ...value,
  ]);

  return (
    <div className="flex flex-wrap gap-2">
      {LMS_LANGUAGES.map((language) => {
        const required = language.id === "en";
        const checked = selected.has(language.id);
        return (
          <label
            key={language.id}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
              checked
                ? "border-accent bg-accent/10 text-accent-deep"
                : "border-line bg-surface text-ink-muted cursor-pointer hover:text-ink"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={required}
              onChange={(event) => {
                const next = new Set(selected);
                if (event.target.checked) next.add(language.id);
                else next.delete(language.id);
                next.add("en");
                onChange(
                  LMS_LANGUAGES.map((item) => item.id).filter((id) =>
                    next.has(id),
                  ),
                );
              }}
            />
            <span>
              {language.nativeLabel}
              {language.nativeLabel !== language.label && (
                <span className="text-ink-muted"> ({language.label})</span>
              )}
            </span>
            {required && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-ink-subtle">
                Required
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
