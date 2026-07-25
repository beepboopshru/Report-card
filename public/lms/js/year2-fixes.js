// Normalizes Level 2 Sensational Sensors generated data to the same structures used by Level 1 Creative Automation.
(function () {
  if (!window.LMS_CONTENT) return;

  Object.entries(window.LMS_CONTENT).forEach(([key, lesson]) => {
    if (!key.startsWith("2-") || !lesson.elaborate) return;

    const materials = lesson.elaborate.materials || [];
    if (typeof materials[0] === "string") {
      lesson.elaborate.materials = [
        [
          materials[0],
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Level 2 Sensational Sensors Elaborate PDF."
        ],
        [
          materials[1] || materials[0],
          "Electronic Components",
          "Class components and modules required for the Level 2 Sensational Sensors physical build."
        ]
      ];
    }
  });
}());
