# Vendored ScienceUtsav Robotics LMS

Static site vendored from https://github.com/Prem-things/SU_LMS_ROBOTICS
(`main` branch). Only the site code lives here (~1.4 MB); the heavy content —
images, PDFs, Arduino sketches, zips (~260 MB) — stays in the upstream repo and
is served from jsDelivr (`cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/`).

Local patches (keep when re-vendoring):

1. `js/main.js` + `js/common-introduction-content.js`: `assetPrefix` points at
   the jsDelivr CDN instead of relative paths.
2. `index.html` + `pages/all5e.html`: hardcoded `src="assets/..."` rewritten
   to the CDN. In `js/main.js`, the dynamic cover assignments in
   `refreshSessionCards` and the session modal are prefixed with `assetPrefix`
   (upstream assigns the relative `cover` path directly, which 404s here).
3. `js/main.js`: the quiz submit handler posts a `su-lms-quiz-result` message
   to the parent window so the Report Card app can store per-student scores
   (see `src/pages/StudentLms.tsx`).

To update content: re-run the sparse clone of the upstream repo, copy
`index.html css/ js/ pages/` over this directory, and re-apply the patches above.
