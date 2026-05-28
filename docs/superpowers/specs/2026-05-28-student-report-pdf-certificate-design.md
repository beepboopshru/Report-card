---
title: Student Report PDF — Certificate Redesign
date: 2026-05-28
status: approved-for-planning
---

# Student Report PDF — Certificate Redesign

Replace the plain Helvetica-table student PDF with a two-page,
certificate-styled report card that a student can present to their parents.
Internal layout only — no changes to data model, Convex functions, routes,
or the class PDF.

## 1. Goal

Today `downloadStudentReport` produces a functional but characterless PDF:
one A4 page per kit, black Helvetica, thin grey rules. The file is fine
for an internal record but not something a parent would keep.

The redesign turns it into a two-page document:

1. **Page 1 — Certificate of Assessment.** A formal cover with the
   ScienceUtsav · C-STEM program mark, the student's name in serif,
   the class, the overall percentage, the grade band, the kit count,
   and the issue date.
2. **Page 2 — Results grid.** A single results table: one row per scored
   kit, with per-criterion score chips tinted by score color, kit total,
   and a row at the bottom for the overall total. Footer legend maps
   the criterion columns to their rubric labels and the score colors
   to their meanings.

In scope:
- Rewrite of `src/components/StudentReportPdf.tsx`.
- Font registration so the PDF uses DM Serif Display + DM Sans.
- A smoke test for the redesigned document.

Out of scope:
- `src/components/ClassReportPdf.tsx` — the teacher-facing class PDF is
  unaffected.
- The on-screen `StudentReport.tsx` view.
- Convex functions, schemas, or any data shape change.
- Teacher signature, logo image, or session label (explicitly excluded
  during brainstorming).

## 2. Visual direction

Formal certificate, brand-aligned:
- Brand teal `--color-accent: #0F6E56` (and `--color-accent-deep: #085041`
  for the border) used assertively on the cover.
- DM Serif Display for the program mark, the "Certificate of Assessment"
  title, the student name, and the large overall percentage.
- DM Sans for body text.
- Score chips on page 2 use the existing soft/strong pairs from
  `src/index.css`: `good-50 / good-400`, `ok-50 / ok-600`,
  `warn-50 / warn-600`, `bad-50 / bad-600`.
- Plenty of whitespace; A4 portrait throughout.

## 3. Page 1 — Certificate

A4 portrait. Page padding 0 — the certificate has its own internal
margins so the border can sit close to the page edge.

Structure (top to bottom, centered horizontally):

```
┌──────────────────────────────────────────────┐ ← outer border (1.5pt, accent-deep)
│  ┌────────────────────────────────────────┐  │ ← inner border (0.5pt, accent-deep)
│  │                                        │  │
│  │       ScienceUtsav · C-STEM            │  │ ← serif 16pt, accent-deep, tracked
│  │       ──────────────────────           │  │ ← 60pt rule, accent
│  │                                        │  │
│  │    Certificate of Assessment           │  │ ← serif 26pt, ink
│  │                                        │  │
│  │   This certifies that                  │  │ ← sans 11pt, ink-muted
│  │                                        │  │
│  │     AARAV  SHARMA                      │  │ ← serif 32pt, ink, letterSpacing 2
│  │                                        │  │
│  │   of  Class V · Section B  has         │  │ ← sans 11pt, ink-muted, ~ 60% width,
│  │   completed the C-STEM assessment      │  │   text wraps naturally, centered
│  │   with an overall score of             │  │
│  │                                        │  │
│  │              84%                       │  │ ← serif 56pt, accent
│  │           Outstanding                  │  │ ← serif 16pt, accent-deep
│  │                                        │  │
│  │       6 of 8 kits assessed             │  │ ← sans 10pt, ink-muted
│  │                                        │  │
│  │       Issued 28 May 2026               │  │ ← sans 10pt, ink-muted
│  │                                        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

Implementation notes:
- Double border: an outer `View` with `border: 1.5pt accent-deep` and
  ~24pt of padding, containing an inner `View` with
  `border: 0.5pt accent-deep` and ~36pt of padding.
- Content vertically centered: the inner `View` uses
  `justifyContent: 'center'` and `flex: 1`.
- Student name is upper-cased in code for the cover, with `letterSpacing`
  applied via `@react-pdf/renderer` style. The DB value is unchanged.
- Issue date: `new Date()` formatted with
  `Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })`.
- Class line: always rendered as `of <className>` (the existing
  `className` prop, unmodified). No special-casing on whether the name
  starts with "Class" — keeps the wording predictable.
- Grade band label: `gradeBand(pct)` from `src/lib/totals.ts` →
  "Outstanding" / "Proficient" / "Developing" / "Beginning". The existing
  labels are dignified enough for a certificate; no separate letter grade.

### Cover — empty state

When `scored.length === 0`:
- The overall-score block (`84%` + grade band + "6 of 8 kits assessed")
  is replaced with a single sans line: "is currently enrolled in the
  C-STEM program."
- Page 2 (results) is replaced by a single page reading "No kits assessed
  yet." in `ink-muted` and the program mark in the footer.
- The "This certifies that" → "completed the C-STEM assessment with an
  overall score of" wording is replaced by "This certifies enrolment of"
  on a single line above the student name.

### Cover — overall score

- `overallTotal = sum of totalOf(sk.criterionScores) across scored kits`.
- `overallMax   = sum of maxScore(sk.rubric.criteria.length) across scored kits`.
- `pct = overallMax ? Math.round((overallTotal / overallMax) * 100) : 0`.

Kits passed in `scored` but where every criterion scores 0 are still
counted — the rubric was opened. This matches what the on-screen
`StudentReport.tsx` already shows. The phrase "N kits assessed" uses
`scored.length` (no "of N" denominator, because we don't have the class's
total expected kit count in the props today; adding it is out of scope).

## 4. Page 2 — Results grid

A4 portrait. Standard 36pt page padding.

Top band:
- A 28pt-tall band in `accent` color, full width edge-to-edge, with
  white serif text "RESULTS" left-aligned and the student name in
  sans on the right. `Class V-B` in smaller text below the name.

Below the band, the results table. Columns:

| Column | Width | Notes |
|---|---|---|
| Kit | flex | `#3  Solar Oven` — serif numeral, sans name |
| Category | 60pt | small caps, ink-muted |
| C1 … Cn | 28pt each | score chip; n is the union criterion count |
| Total | 50pt | `22/24`, right-aligned |
| Grade | 70pt | grade band word, color-tinted |

Score chip:
- A `View` 22pt × 16pt with `borderRadius: 4`, centered text inside.
- Background = the `*-soft` token for the awarded score.
- Text color = the strong token for the awarded score.
- Score of 0 / missing → muted dash, no background fill.

### Heterogeneous rubrics

Different kits can have different criterion sets. The grid normalizes
across them:

1. Compute `criterionUnion`: the ordered union of `(id, label)` pairs
   across all kits in `scored`, preserving the order they first appear.
2. The table renders one column per entry in `criterionUnion`.
3. For each kit row, criteria the kit's rubric doesn't define render as
   a single muted dash (no chip background) instead of a `0`.
4. The legend at the bottom of the page lists each column header (`C1`,
   `C2`, …) paired with its label.

Cap the column count at 8. If `criterionUnion.length > 8`, fall back to
a single combined "Per-criterion" column showing just the kit total
(degraded but won't blow out the page width). This is a safety net; the
expected rubrics top out at 6 criteria.

### Overall row

Bottom of the table, a row with bold text and a top rule:

```
Overall                                          122/144   Outstanding
```

Same `pct` as the cover.

### Page footer (results page)

Two lines of sans 8pt in `ink-muted`, centered:

```
Score legend:  ■ 4 Excellent   ■ 3 Good   ■ 2 Developing   ■ 1 Needs support
Criteria:      C1 = Observation · C2 = Reasoning · C3 = Build skill · …
```

The colored squares use the strong score tokens. The criterion mapping
line is built from `criterionUnion`.

### Multi-page handling

If the rows overflow page 2, the table continues on page 3 with the same
header band repeated (`<Page>`s repeat the band by rendering it inside
each results `<Page>`). The legend renders only on the final results
page. Implementation uses `wrap={false}` on each `<View>` row so a row
never splits, and a simple chunking helper in JS to slice rows into
pages of ~14 each (constant — measured against the row height; rough
upper bound, can be tuned during implementation).

## 5. Components and data flow

No new files. All work lives in `src/components/StudentReportPdf.tsx`.

`StudentReportDoc` is restructured into:

```
StudentReportDoc(props)
├── CertificatePage(student, className, overall, scored.length, isEmpty)
└── ResultsPages(student, className, scored, criterionUnion)
    └── ResultsRow(sk, criterionUnion)         ← internal
```

Internal helpers (private to the file, not exported):
- `buildCriterionUnion(scored): { id, label }[]`
- `chipStyle(score: 0..4): { backgroundColor, color }`
- `formatIssueDate(): string`           (uses `Intl.DateTimeFormat`)
- `formatClassPrefix(name: string): string`  (always returns `of <name>`)

`downloadStudentReport` keeps its current signature so
`src/pages/StudentReport.tsx` does not change.

## 6. Typography — font registration

`@react-pdf/renderer` defaults to Helvetica. To match the on-screen
typography:

```ts
import { Font } from '@react-pdf/renderer';
Font.register({
  family: 'DM Serif Display',
  src: 'https://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.woff',
});
Font.register({
  family: 'DM Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8C.woff' },        // regular
    { src: 'https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZawIIBSFFOZ-Lo3.woff', fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);
```

The exact font URLs will be confirmed during implementation by checking
Google Fonts' current CSS responses. If registration fails (offline,
CDN blocked), `@react-pdf/renderer` falls back to Helvetica
automatically — the layout still renders, just without the brand fonts.
No try/catch is needed.

Font registration runs at module load time. The chosen subset is
Latin only — student names outside Latin script will render with the
fallback. Wider script support is out of scope.

## 7. Tests

New file: `src/components/StudentReportPdf.test.tsx`.

Three smoke tests, each renders the doc to a buffer via
`@react-pdf/renderer`'s `renderToBuffer` and asserts no throw:

1. **Zero kits.** `scored = []`. Asserts a buffer is produced.
2. **Single kit, all 4s.** One scored kit with a 6-criterion rubric, all
   scores = 4. Asserts a buffer is produced.
3. **Mixed-rubric kits.** Two scored kits with different criterion sets
   (4-criterion vs 6-criterion). Asserts a buffer is produced and that
   `buildCriterionUnion` (exported for the test only via a `__test`
   suffix or a separate small export) returns the expected ordered
   union.

No visual / snapshot testing — `@react-pdf/renderer` output isn't
deterministic enough across platforms to make snapshots cheap.

## 8. Risks and mitigations

- **Font registration is network-dependent.** Mitigation: documented
  fallback to Helvetica; tests don't depend on fonts loading.
- **Heterogeneous rubrics produce a wide table.** Mitigation: 8-column
  cap with a degraded fallback (per-kit total only); criterion legend
  in the footer maps abbreviated headers to their labels.
- **`gradeBand` labels could change in the future.** Mitigation: the
  cover uses whatever `gradeBand` returns today; no separate copy of
  the thresholds in this file.
- **Multi-page row chunking is heuristic.** Mitigation: `wrap={false}`
  on rows guarantees correctness (no split rows); the page-size
  heuristic only affects how many pages the results take, not
  correctness. Can be tuned post-implementation.
