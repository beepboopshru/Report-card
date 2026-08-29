(() => {
  const program = window.YEAR2_PROGRAM;
  const source = window.LEVEL2_DEPENDENCIES;
  if (!program || !source) return;

  const classPanel = document.querySelector('[data-year2-panel="classes"]');
  const sessionPanel = document.querySelector('[data-year2-panel="sessions"]');
  const classGrid = document.querySelector("[data-year2-classes]");
  const sessionGrid = document.querySelector("[data-year2-sessions]");
  const classLabel = document.querySelector("[data-year2-class-label]");
  const params = new URLSearchParams(location.search);

  // patched: the report-card app restricts classes/sessions and renames
  // classes via ?grades= / ?sessions= / ?gradeNames= params — same formats as
  // main.js, persisted in sessionStorage under the "year2" pseudo-year so the
  // filters survive navigating into a lesson and back. An assignment launch
  // (?grades= present) also locks the shared level picker to this program.
  const store = (key, value) => {
    if (value === null) return;
    try { sessionStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  };
  store("su-lms-allowed-grades-year2", params.get("grades"));
  store("su-lms-allowed-sessions-year2", params.get("sessions"));
  store("su-lms-grade-names-year2", params.get("gradeNames"));
  store("su-lms-allowed-languages", params.get("languages"));
  if (params.get("grades") !== null) store("su-lms-allowed-years", "year2");
  const read = (key) => {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  };
  const parse = (raw, fallback) => {
    try { return JSON.parse(raw) || fallback; } catch (e) { return fallback; }
  };
  const allowedGrades = (read("su-lms-allowed-grades-year2") || "").split(",").filter(Boolean);
  const classes = allowedGrades.length
    ? program.classes.filter((grade) => allowedGrades.includes(grade))
    : program.classes;
  const sessionPicks = parse(read("su-lms-allowed-sessions-year2"), null);
  const gradeNames = parse(read("su-lms-grade-names-year2"), {});
  const classNameOf = (grade) =>
    (typeof gradeNames[grade] === "string" && gradeNames[grade]) || `Class ${grade}`;
  const allowedSessions = (grade) => {
    if (!Array.isArray(sessionPicks)) return null; // unrestricted
    const picked = sessionPicks
      .filter((row) => row && String(row.grade) === String(grade))
      .map((row) => String(row.session));
    return picked.length ? picked : null; // a grade with no rows = full course
  };
  if (!classes.length) return;

  let selectedGrade = classes.includes(params.get("grade")) ? params.get("grade") : classes[0];

  const showPanel = (name) => {
    classPanel.classList.toggle("active", name === "classes");
    sessionPanel.classList.toggle("active", name === "sessions");
  };

  const renderSessions = () => {
    classLabel.textContent = `Year 2 | ${classNameOf(selectedGrade)}`;
    const projects = source.grades[selectedGrade];
    const picked = allowedSessions(selectedGrade);
    const sessions = program.sessions.filter((session) => !picked || picked.includes(String(session.number)));
    sessionGrid.innerHTML = sessions.map((session) => {
      const project = projects.find((item) => Number(item.session) === session.sourceSession);
      return `<a class="session-card available year2-session-card" href="all5e.html?mode=year2&grade=${selectedGrade}&session=${session.number}">
        <img src="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${project.circuit}" alt="Class ${selectedGrade} Session ${session.number} ${session.title} circuit" decoding="async">
        <span>Session ${session.number}</span><strong>${session.title}</strong><p>${session.summary}</p><small>Engage &middot; Explore &middot; Explain &middot; Evaluate</small>
      </a>`;
    }).join("");
  };

  classGrid.innerHTML = classes.map((grade) => `<button class="selection-card" type="button" data-year2-grade="${grade}"><span>${grade}</span><strong>${classNameOf(grade)}</strong><p>10 four-phase sessions</p></button>`).join("");
  classGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-year2-grade]");
    if (!button) return;
    selectedGrade = button.dataset.year2Grade;
    renderSessions();
    showPanel("sessions");
    history.replaceState(null, "", `${location.pathname}?grade=${selectedGrade}`);
  });
  document.querySelector("[data-year2-back]")?.addEventListener("click", () => showPanel("classes"));

  if (params.has("grade") && classes.includes(params.get("grade"))) {
    renderSessions();
    showPanel("sessions");
  }
})();
