# Vendored ScienceUtsav Robotics LMS

Static site vendored from https://github.com/Prem-things/SU_LMS_ROBOTICS
(`main` branch). Only the site code lives here (~1.4 MB); the heavy content —
images, PDFs, Arduino sketches, zips (~260 MB) — stays in the upstream repo and
is served from jsDelivr (`cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/`).

Local patches (keep when re-vendoring):

1. `js/main.js` + `js/common-introduction-content.js`: `assetPrefix` points at
   the jsDelivr CDN instead of relative paths.
2. `index.html` + `pages/*.html`: hardcoded `src="assets/..."` rewritten to
   the CDN. Same for `../assets/` and `` `../${...}` `` asset paths in
   `js/blix-content.js`, `js/level2-basics-content.js`,
   `js/level2-dependencies-content.js`, `js/year2-program.js`. In `js/main.js`, the dynamic cover assignments in
   `refreshSessionCards` and the session modal are prefixed with `assetPrefix`
   (upstream assigns the relative `cover` path directly, which 404s here).
3. `js/main.js`: the quiz submit handler posts a `su-lms-quiz-result` message
   to the parent window so the Report Card app can store per-student scores
   (see `src/pages/StudentLms.tsx`), and the test locks after one submission
   (or when the parent reports a stored score via `su-lms-quiz-scores`).
4. `js/main.js`: a `?grades=4,5` param (persisted per level in sessionStorage)
   filters which class cards are shown, so students only see their own grade.
5. `js/blix-content.js`: a `?sessions=1,3,5` param filters which BLIX sessions
   are shown (the admin's Manage LMS selection); session numbers keep their
   original 1..10 values.
6. `js/main.js`: a `?gradeNames=` param (JSON `{"6": "Class 5"}`, persisted per
   level in sessionStorage) renames class cards and the session-select header
   for schools that run a higher-level course under their own class name.
   Cosmetic only — URLs, content keys, and quiz results keep the real grade.

To update content: re-run the sparse clone of the upstream repo, copy
`index.html css/ js/ pages/` over this directory, and re-apply the patches above.
