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
  let selectedGrade = program.classes.includes(params.get("grade")) ? params.get("grade") : "6";

  const showPanel = (name) => {
    classPanel.classList.toggle("active", name === "classes");
    sessionPanel.classList.toggle("active", name === "sessions");
  };

  const renderSessions = () => {
    classLabel.textContent = `Year 2 | Class ${selectedGrade}`;
    const projects = source.grades[selectedGrade];
    sessionGrid.innerHTML = program.sessions.map((session) => {
      const project = projects.find((item) => Number(item.session) === session.sourceSession);
      return `<a class="session-card available year2-session-card" href="all5e.html?mode=year2&grade=${selectedGrade}&session=${session.number}">
        <img src="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${project.circuit}" alt="Class ${selectedGrade} Session ${session.number} ${session.title} circuit" decoding="async">
        <span>Session ${session.number}</span><strong>${session.title}</strong><p>${session.summary}</p><small>Engage &middot; Explore &middot; Explain &middot; Evaluate</small>
      </a>`;
    }).join("");
  };

  classGrid.innerHTML = program.classes.map((grade) => `<button class="selection-card" type="button" data-year2-grade="${grade}"><span>${grade}</span><strong>Class ${grade}</strong><p>10 four-phase sessions</p></button>`).join("");
  classGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-year2-grade]");
    if (!button) return;
    selectedGrade = button.dataset.year2Grade;
    renderSessions();
    showPanel("sessions");
    history.replaceState(null, "", `${location.pathname}?grade=${selectedGrade}`);
  });
  document.querySelector("[data-year2-back]")?.addEventListener("click", () => showPanel("classes"));

  if (params.has("grade")) {
    renderSessions();
    showPanel("sessions");
  }
})();
