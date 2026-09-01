// Adds the source PDF page 2 to every Explore flow.
(function () {
  if (!window.LMS_CONTENT) return;

  [1, 2, 3].forEach((session) => {
    [4, 5, 6, 7].forEach((grade) => {
      const lesson = window.LMS_CONTENT[`${grade}-${session}`];
      if (!lesson || !lesson.explore || !Array.isArray(lesson.explore.pages)) return;

      const src = `assets/images/pdf/class-${grade}/session-${session}/explore-c${grade}-s${session}-page-02-curiosity.jpg`;
      const alreadyAdded = lesson.explore.pages.some((page) => {
        const existingSrc = String(page[0] || "");
        return existingSrc === src || existingSrc.endsWith("/explore-page-02-curiosity.jpg");
      });
      if (alreadyAdded) return;

      lesson.explore.pages.unshift([
        src,
        "Curiosity Kickoff",
        "Source PDF page 2 with the session introduction and component curiosity questions."
      ]);
    });
  });
}());
