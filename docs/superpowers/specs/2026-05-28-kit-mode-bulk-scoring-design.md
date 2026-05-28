---
title: Kit-mode Bulk Scoring + Per-Student Report Downloads — Design
date: 2026-05-28
status: draft
---

# Kit-mode Bulk Scoring + Per-Student Report Downloads

A new "score the whole class for one kit" screen, and a parent-facing
download flow that produces one PDF per student instead of one combined PDF.

## 1. Goal

A teacher who just finished teaching kit #5 to 50 students should be able to
record every score for that kit in under 5 minutes — on either a laptop or a
phone — and then send each student's parent a personalised report card from
the same app.

Today's scoring path forces one navigation per (student × kit) pair: a class
of 50 students × 10 kits = 500 page transitions. The combined class PDF that
exists today ([ClassReport.tsx:44](../../../src/pages/ClassReport.tsx)) is
useful for the teacher's records but cannot be shared with individual
parents.

In scope:
- New route + page: `kit-mode` bulk scoring (one kit, all students, one
  criterion at a time).
- New entry point on `ClassDetail` — a "Score class →" action per kit.
- New `absent` flag on the `scores` table and across read paths.
- New backend mutation for single-criterion writes, to support tap-by-tap
  saves without read-modify-write races.
- ClassReport: add "Download all (ZIP, one PDF per student)" button beside
  the existing combined-PDF button; add per-row "Share" button using the
  Web Share API.
- Per-student "Share" button on the student report page.

Out of scope:
- Per-student observations field in bulk mode — left to the existing
  per-student `ScoreSheet`.
- Backend offline sync, PWA install — handled in a later spec.
- Localisation (Hindi / regional languages) — handled in a later spec.
- Bulk student onboarding (paste-a-list, CSV) — handled in a later spec.
- The class heatmap visualisation suggested during brainstorming — later.
- Changes to admin pages, kits, rubrics, or auth.

## 2. The kit-mode screen

### 2.1 Layout

A single, vertically-scrolling page that works at any width from 360px
(phone) to 1400px (laptop). No horizontal grid — the same DOM serves both
form factors.

Top to bottom:

1. **Breadcrumb + page title.**
   `Classes › <class name> › Kit #<n> · <kit name>` and an `H1` reading
   "Score class — `<kit name>`".
2. **Criterion header (sticky on scroll).** Contains:
   - "Criterion N / M" small label.
   - Criterion `label` (bold) and `sub` (muted).
   - Four colored descriptor strips for the four levels (c4, c3, c2, c1),
     using the existing rubric palette (`good`, `ok`, `warn`, `bad` tokens
     from `[ScoreRow.tsx:11](../../../src/components/ScoreRow.tsx)`).
     Strips are visible by default on laptop; collapsed by default on phone
     with a "show descriptors ▾" toggle.
   - `← Prev criterion` and `Next criterion →` buttons. Next is the
     primary (accent-filled) button; Prev is secondary.
3. **Roster.** One row per student, ordered by `rollNo` ascending (nulls
   last by name). See §2.2 for row anatomy.
4. **Progress bar (sticky on scroll, bottom).** Shows
   `<settled> / <total>` for the current criterion plus
   `saved <n>s ago` indicator. *Settled* = has a score 1–4 OR is marked
   absent for this kit. Absent students contribute 1 to every
   criterion's settled count (they're resolved for the whole kit).

Both the criterion header and the progress bar remain visible while the
roster scrolls between them — the teacher always sees which criterion
they're on and how close they are to done.

### 2.2 Row anatomy

```
| roll# | name              | [4] [3] [2] [1] [✕]  | ✓ |
```

- Roll# — right-aligned, muted, ~28px wide. Falls back to the student's
  position in the alphabetical list if `rollNo` is null.
- Name — `font-medium` at 14px on laptop / 13px on phone.
- Five action buttons in a fixed-width strip:
  - 4 / 3 / 2 / 1 — colored when this student has that score; outlined
    otherwise. Tinted hover state on laptop.
  - ✕ — "absent" toggle. Dashed border by default; solid charcoal fill
    when active. Mobile labels it "absent" instead of "✕" because the
    glyph alone is unclear at small sizes.
- ✓ checkmark — appears at the right end when this student has any score
  (1–4) OR is marked absent for this kit.

Row state visuals:
- **Unscored:** white background, action buttons at 0.6 opacity until
  hovered/focused.
- **Focused (keyboard or scroll-into-view target):** pale-yellow
  background, 3px accent left-border, action buttons at full opacity with
  2px borders.
- **Scored:** white background, the chosen score button is filled with
  its semantic color, others are outlined and unfaded.
- **Absent:** row at 0.7 opacity, name suffixed with " · absent", ✕
  button filled charcoal.

Tap targets are at least 36×32 on laptop and 40×40 on phone — comfortable
for thumbs.

### 2.3 The scoring interaction

The single most important interaction in the app.

1. Teacher taps `3` for student #13.
2. The button flashes its filled state immediately (optimistic update).
3. After 250ms, focus and scroll advance to student #14, applying the
   focused-row visual.
4. The write lands in Convex asynchronously (see §3.2). On error, the row
   shows a small red `!` near the ✓ slot and stays unfocused.
5. If the teacher taps a different score on a row that already has one,
   the previous score's color clears and the new one fills — no
   confirmation prompt.
6. Tapping the absent (✕) button has the same flow: flash, then advance
   to the next row.

The 250ms delay is the perceptible-but-not-annoying floor; less and the
teacher loses confidence they pressed the right button, more and rapid
data entry feels sluggish.

**On mount,** focus lands on the first row that is not yet settled for
the current criterion (not scored AND not absent). If everything's
settled, focus lands on the first row.

**After mount, auto-advance moves to the literal next row** in the
roster regardless of its scored/absent state — re-scoring or correcting
is a legitimate use case, and skipping rows would surprise the teacher.

**At the last row of the roster,** auto-advance moves focus to the
"Next criterion →" button instead of wrapping. Pressing Enter or Space
advances to the next criterion (which then mounts as above).

### 2.4 Keyboard (laptop)

Active on the focused row:
- `1`, `2`, `3`, `4` — set that score, advance.
- `0` — mark absent, advance.
- `↓` / `↑` — move focus without scoring.
- `Enter` — same as `↓`.
- `Esc` — leave kit-mode (returns to ClassDetail).
- `Page Down` / `Page Up` — jump 10 rows.

When the page mounts, focus starts on the first unscored student. If all
students are scored for the current criterion, focus starts on the first
row.

### 2.5 Criterion navigation

Criterion is part of the URL: `/class/:classId/kit/:kitId/score?c=2`.
Prev/next mutate the `c` query param and reset focus to the first
unscored student on the new criterion. Direct URLs are shareable and
back-button works.

After the last criterion's last student is settled, the page replaces
the roster with a completion summary:
- "All 50 students settled for `<kit name>`. ✓" — if any are absent, a
  small footnote reads "(3 marked absent)".
- Buttons: `Back to class` (default), `Class report →`, and `Score next
  kit →` (if the class curriculum has another kit after this one in
  `classKits.order` — regardless of whether it's already scored).

Mid-scoring exits are not blocked or warned — autosave guarantees
nothing is lost.

### 2.6 Empty / error states

- **Class has no students:** show an empty state with a primary "Add
  students" button linking to ClassDetail. Do not render kit-mode.
- **Kit has no rubric:** show an error state explaining the kit isn't
  ready to score, with a link to the admin (or just a "contact your
  admin" message for teachers).
- **Network down:** taps queue locally in component state and retry on
  reconnect. The "saved Xs ago" indicator turns into "saving…" then
  "offline — will retry" — same pattern as the existing debounced save
  in [ScoreSheet.tsx:38-43](../../../src/pages/ScoreSheet.tsx).

## 3. Data model and backend

### 3.1 Schema change: `absent`

Add an optional `absent: v.optional(v.boolean())` field to the `scores`
table in `[convex/schema.ts](../../../convex/schema.ts)`. When `true`:

- `criterionScores` is ignored by all read paths.
- The student is excluded from the kit's class average (currently
  computed in `[totals.ts](../../../src/lib/totals.ts)`).
- Report PDFs render "Absent" instead of a score for that kit.
- The ✓ checkmark in kit-mode appears (absent counts as resolved).

No migration is needed — existing rows have `absent: undefined`, which
is read as `false`.

### 3.2 New mutation: `scores.setCriterion`

Today `[scores.upsert](../../../convex/scores.ts)` takes the *full*
`criterionScores` record. In bulk mode that requires the client to
read-then-write, which races when the teacher taps quickly.

Add a new mutation:

```ts
// convex/scores.ts
export const setCriterion = mutation({
  args: {
    studentId: v.id("students"),
    kitId: v.id("kits"),
    criterionId: v.string(),
    value: v.union(v.literal(1), v.literal(2), v.literal(3), v.literal(4)),
  },
  handler: async (ctx, args) => { /* upsert single field */ },
});

export const setAbsent = mutation({
  args: {
    studentId: v.id("students"),
    kitId: v.id("kits"),
    absent: v.boolean(),
  },
  handler: async (ctx, args) => { /* upsert with absent flag */ },
});
```

These do conditional inserts (if no score doc exists) or partial
updates (if one does). Server-side merging means no client race.

`scores.upsert` stays as-is for the existing per-student `ScoreSheet`.

### 3.3 Reads

The roster needs one query per page render: `students by class` plus
`scores by class+kit`. Add or reuse:

- `api.students.listForClass` (exists).
- A new `api.scores.listForClassAndKit({ classId, kitId })` returning
  `Array<{ studentId, criterionScores, absent }>`. Joined client-side
  with students to render rows.

The criterion header reads from `api.rubrics.getForKit` (exists).

## 4. Entry points

### 4.1 ClassDetail curriculum list

In [ClassDetail.tsx:60-66](../../../src/pages/ClassDetail.tsx), each kit
row currently shows:

> `#5 · Floating Magnets (Discoverer)`

Change it to show, at the right edge of the row:
- `Score class →` — primary action, opens `/class/:classId/kit/:kitId/score`.
- A tiny progress chip like `32 / 300` — number of (student × criterion)
  cells scored out of total — visible only on rows that have at least one
  score. Helps the teacher see what's in progress.

The per-student row's existing tiny "Score `<kit>`" links in
[ClassDetail.tsx:99-110](../../../src/pages/ClassDetail.tsx) are deleted —
they're noisy at 50 students. Per-student detail scoring stays available
via the existing "Report" link → student detail page.

### 4.2 No dashboard or per-student shortcuts (yet)

TeacherDashboard doesn't link to kit-mode. We can add a "Continue
scoring" surfacing in a later iteration once we see how teachers
actually use it.

## 5. Download all report cards (per-student PDFs)

### 5.1 ClassReport changes

[ClassReport.tsx](../../../src/pages/ClassReport.tsx) gains two new
controls in the page header:

1. The existing **Download all (PDF)** button stays — combined-PDF for the
   teacher's records.
2. New: **Download per-student (ZIP)** button. Generates one PDF per
   student client-side using
   [StudentReportPdf](../../../src/components/StudentReportPdf.tsx) and
   bundles them with `jszip`. Filename: `<class-name>-report-cards.zip`,
   contents named `<rollNo or index>-<student-name>.pdf` (Unicode-safe,
   spaces → underscores).

Each student row in the existing list (currently just shows scores) gets
a row-level **Share** button:

3. **Share** — primary action per student row.
   - On mobile (Web Share API with files supported): renders the
     student's PDF to a `Blob`, wraps it in `new File([blob], name,
     {type:'application/pdf'})`, calls
     `navigator.share({ files:[file], title:'<student> — Report card',
     text:'<class-name> — Term report' })`. WhatsApp, Gmail, AirDrop, etc.
     appear in the OS share sheet.
   - On desktop or unsupported browsers: triggers a download of the
     single student's PDF and opens `https://web.whatsapp.com/` in a new
     tab. We cannot auto-attach via URL — teacher drags the downloaded
     PDF into the chat. A short toast explains this.

### 5.2 New library: `jszip`

Add `jszip` to dependencies. Pure browser, ~30KB gzip, no native deps.
Used only inside `ClassReportPdf`'s download path so it lazy-loads —
not on the bundle critical path.

### 5.3 PDF generation is synchronous-ish

`@react-pdf/renderer` is already in the project for the combined PDF.
For per-student PDFs we use the same `StudentReportPdf` component and
call `pdf(<Doc/>).toBlob()` once per student. A class of 50 takes a few
seconds; the button shows a spinner with "Generating 23/50…" progress
text. Cancellation isn't supported — closing the tab kills it.

## 6. Edge cases checklist

- **Editing a previously scored student:** identical to first-time
  scoring. Tap a different number → flash → advance. No confirmation.
- **Toggling absent on a student who already has scores:** the
  `criterionScores` record is kept in the DB (so toggling absent off
  restores them); reads just ignore it while `absent` is true.
- **Class with 1 student:** kit-mode still works; auto-advance lands on
  the same student or the criterion-completion summary.
- **Class with 80+ students:** roster is virtualized? No. 80 rows render
  fine without virtualization on commodity phones. Revisit if we add
  schools with classes of 200.
- **Student deleted mid-scoring:** Convex query updates, row disappears.
  If they were the focused row, focus moves to the next.
- **Rubric criterion edited by admin mid-scoring:** existing scores keep
  their values; the criterion descriptor strip re-renders. Rare.
- **No Web Share API and no Web Share Files support:** fall back to
  per-row download + open WhatsApp Web (§5.1).
- **Browser blocks the popup to WhatsApp Web:** the download still
  happens; toast explains how to share manually.

## 7. Visual conformance

Follows the design tokens added in
[2026-05-28-frontend-visual-upgrade-design.md](2026-05-28-frontend-visual-upgrade-design.md):
- Score colors use existing `good`/`ok`/`warn`/`bad` palette.
- Card surfaces use `--color-line` borders + soft shadow tokens.
- Page header uses the same serif H1 + Sans body styles already in use.
- Focused-row highlight uses a desaturated warm yellow tied into the
  brand palette (token to be confirmed during implementation; default
  `#FFFBE8` border `#D4A843`).

## 8. Open questions

None blocking. Things to revisit *after* shipping:

- Should the per-student "Continue from criterion N" resume position be
  saved per-teacher across devices? (Nice-to-have, not necessary.)
- Should "absent" be per-criterion or per-kit? Decided per-kit because
  attendance is per-activity; ask again if a teacher requests finer
  granularity.
- WhatsApp Business API integration (so the share button DMs the parent
  directly with no manual drag) — large effort, separate spec.

## 9. Implementation order (sketch — full plan in writing-plans next)

1. Schema: add `absent` to `scores`. Regenerate `_generated/`.
2. Backend mutations: `setCriterion`, `setAbsent`. New query
   `listForClassAndKit`.
3. Update `totals.ts` + `StudentReportPdf` + `ClassReportPdf` to honor
   `absent`.
4. New page `KitScoreSheet.tsx`, route, ClassDetail entry point.
5. Per-student PDF ZIP + share button on ClassReport.
6. Per-student share button on student detail page.
7. QA pass on phone + laptop with a seeded class of 50.
