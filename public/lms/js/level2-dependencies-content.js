(function () {
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  const media = (src, alt) => `<div class="media-stage pdf-media-stage is-loading">
    <div class="media-loader" role="status" aria-live="polite"><span class="media-spinner" aria-hidden="true"></span><span data-media-status>Loading image</span></div>
    <img src="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
  </div>`;

  const codeBlock = (title, code, extraClass = "") => `<article class="code-focus dependency-code-focus ${extraClass}">
    <h3>${escapeHtml(title)}</h3>
    <div class="code-copy-wrap">
      <button type="button" class="copy-code-btn">${icon("copy")}<span data-button-label>Copy Code</span></button>
      <pre><code>${escapeHtml(code)}</code></pre>
    </div>
  </article>`;

  const phaseHeader = (number, label, title, description) => `<header class="phase-header">
    <div class="phase-heading"><span>${number}</span><div><p class="phase-label">${escapeHtml(label)}</p><h2>${escapeHtml(title)}</h2></div></div>
  </header><p class="lead-text">${escapeHtml(description)}</p>`;

  const nextButton = (phase, label) => `<div class="all5e-next-row"><button type="button" class="download-btn" data-dependency-next="${phase}"><span>Next: ${escapeHtml(label)}</span>${icon("arrow-right")}</button></div>`;

  const conceptsFor = (project) => {
    const code = project.code;
    const concepts = [];
    if (code.includes("#include")) concepts.push("The included library supplies tested commands for the connected module instead of recreating its communication protocol.");
    concepts.push(`The constants at the top preserve the source pin map: ${project.pins}.`);
    concepts.push("setup() configures the required inputs, outputs, libraries, and starting state once when the board powers up.");
    if (code.includes("digitalRead")) concepts.push("digitalRead() samples a sensor, switch, receiver, or command state so the program can make a decision.");
    if (code.includes("analogRead")) concepts.push("analogRead() converts a changing sensor voltage into a numerical value that can be compared with a threshold.");
    if (code.includes("millis()")) concepts.push("millis() provides non-blocking timing or debounce control, allowing the system to measure time without relying only on long delays.");
    if (code.includes("tone(")) concepts.push("tone() drives the sound output at the frequency specified in the exact source code.");
    if (code.includes("Servo")) concepts.push("The Servo library converts an angle command into the control pulses required by the servo motor.");
    if (code.includes("LiquidCrystal_I2C")) concepts.push("The LCD library sends text and cursor commands through the I2C SDA and SCL lines.");
    if (code.includes("SoftwareSerial")) concepts.push("SoftwareSerial creates a separate serial channel for the wireless module while keeping the main USB serial connection available.");
    concepts.push("loop() repeatedly reads the current input condition and updates every connected output according to the project logic.");
    return concepts;
  };

  const engageForSession = (session, projects, data) => {
    const hardwareKeys = [...new Set(projects.flatMap((project) => project.hardware))];
    return session.contexts.map((title, index) => {
      const project = projects[index % projects.length];
      const hardware = data.hardware[hardwareKeys[index % hardwareKeys.length]];
      return {
        title,
        image: hardware?.image || project.circuit,
        description: `${title} uses the same sensing, decision, and output-control principles explored through ${projects.map((item) => item.title).join(" and ")}.`,
        question: `What input or command should the controller check before the ${title.toLowerCase()} system changes its output?`
      };
    });
  };

  const renderEngage = (data, grade, session) => `${phaseHeader(
    1,
    "Engage",
    `${session.title} in Real Life`,
    `Class ${grade} begins Session ${session.number} by connecting its circuit to five systems used outside the classroom.`
  )}
    <div class="dependency-engage-list">
      ${data.engage.map((example, index) => `<article class="dependency-engage-item">
        <div class="dependency-engage-media">${media(example.image, example.title)}</div>
        <div><span class="dependency-item-number">${index + 1}</span><h3>${escapeHtml(example.title)}</h3><p>${escapeHtml(example.description)}</p><div class="dependency-trigger-question"><strong>Think:</strong> ${escapeHtml(example.question)}</div></div>
      </article>`).join("")}
    </div>
    <section class="objectives-panel dependency-objectives"><h3>Learning Objectives</h3><ul>
      <li>Recognize where ${escapeHtml(session.title.toLowerCase())} is used in real systems.</li>
      <li>Read a class-specific circuit diagram before wiring hardware.</li>
      <li>Connect each source-code pin assignment to the physical circuit.</li>
      <li>Explain how an input condition produces a programmed output response.</li>
    </ul></section>
    ${nextButton("explore", "Explore")}`;

  const renderTopicNavigation = (projects) => `<nav class="dependency-topic-nav" aria-label="Session project selection">
    ${projects.map((project, index) => `<button type="button" class="dependency-topic-button${index === 0 ? " active" : ""}" data-dependency-topic="${project.id}"><span>${index + 1}</span><div><small>Project ${index + 1}</small><strong>${escapeHtml(project.title)}</strong></div></button>`).join("")}
  </nav>`;

  const renderExploreProject = (project, grade, index, total, sessionNumber) => `<section class="dependency-topic-panel${index === 0 ? " active" : ""}" data-dependency-topic-panel="${project.id}">
    <header class="dependency-project-heading"><div><p class="phase-label">Year 2 | Class ${grade} | Session ${sessionNumber}</p><h3>${escapeHtml(project.title)}</h3></div><span>Project ${index + 1} of ${total}</span></header>
    <div class="dependency-facts">
      <div><span>Components</span><strong>${escapeHtml(project.components)}</strong></div>
      <div><span>Pin Assignment</span><strong>${escapeHtml(project.pins)}</strong></div>
    </div>
    <div class="dependency-circuit-layout">
      <article class="dependency-circuit-frame"><div class="dependency-frame-label">Exact Circuit Diagram</div>${media(project.circuit, `Class ${grade} ${project.title} circuit diagram`)}</article>
      ${codeBlock("Exact Arduino Code", project.code)}
    </div>
    <div class="dependency-download-row">
      <a class="download-btn" href="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${escapeHtml(project.download)}" download>${icon("download")}<span>Download Code ZIP</span></a>
      <a class="download-btn secondary-download" href="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${escapeHtml(project.ino)}" download>${icon("file-code-2")}<span>Download INO</span></a>
    </div>
  </section>`;

  const renderExplore = (projects, grade, session) => `${phaseHeader(
    2,
    "Explore",
    `${session.title}: Exact Circuits and Code`,
    "Select one project at a time. Every circuit comes from the supplied class PDF, and every sketch is preserved exactly from the supplied Arduino code bundle."
  )}
    <div class="dependency-topic-layout">
      ${renderTopicNavigation(projects)}
      <div class="dependency-topic-content">${projects.map((project, index) => renderExploreProject(project, grade, index, projects.length, session.number)).join("")}</div>
    </div>
    ${nextButton("explain", "Explain")}`;

  const renderHardwareCard = (hardware) => `<article class="dependency-hardware-card">
    <div class="dependency-hardware-image">${media(hardware.image, hardware.name)}</div>
    <div class="dependency-hardware-copy"><h4>${escapeHtml(hardware.name)}</h4><p>${escapeHtml(hardware.overview)}</p><h5>How it works</h5><p>${escapeHtml(hardware.working)}</p><h5>Pins and connections</h5><ul>${hardware.pins.map((pin) => `<li>${escapeHtml(pin)}</li>`).join("")}</ul><div class="dependency-safety"><strong>Safety:</strong> ${escapeHtml(hardware.safety)}</div></div>
  </article>`;

  const renderExplainProject = (project, data, index, sessionNumber) => `<section class="dependency-explain-panel${index === 0 ? " active" : ""}" data-dependency-explain-panel="${project.id}">
    <div class="dependency-project-heading"><div><p class="phase-label">Code First</p><h3>${escapeHtml(project.title)} Code Explanation</h3></div><span>Session ${sessionNumber}</span></div>
    ${codeBlock("Source Code", project.code, "dependency-explain-code")}
    <section class="dependency-code-walkthrough"><h3>Code Walkthrough</h3><ol>${conceptsFor(project).map((concept) => `<li>${escapeHtml(concept)}</li>`).join("")}</ol></section>
    <section class="dependency-hardware-section"><div class="basics-section-title"><div><p class="phase-label">Hardware Explanation</p><h3>Components Used in This Circuit</h3></div><span>From the supplied Year 2 hardware document</span></div><div class="dependency-hardware-list">${project.hardware.map((key) => renderHardwareCard(data.hardware[key])).join("")}</div></section>
  </section>`;

  const renderExplain = (projects, data, session) => `${phaseHeader(
    3,
    "Explain",
    `Understand ${session.title}`,
    "Choose a project. The exact sketch appears first, followed by its control logic and only the hardware explanations required for that circuit."
  )}
    <label class="dependency-topic-select-label" for="dependencyExplainTopic"><span>Select project</span><select id="dependencyExplainTopic">${projects.map((project, index) => `<option value="${project.id}">Project ${index + 1}: ${escapeHtml(project.title)}</option>`).join("")}</select></label>
    <div class="dependency-explain-content">${projects.map((project, index) => renderExplainProject(project, data, index, session.number)).join("")}</div>
    ${nextButton("evaluate", "Evaluate")}`;

  const challengeForGrade = (grade) => ({
    "6": {
      title: "Complete the Class 6 Vibration Alert",
      instruction: "Use the Class 6 circuit values. The vibration sensor is read as an input, and the speaker produces a 900 Hz alert.",
      code: `const byte SENSOR = [[2]], BUZZER = [[5]];

void setup() {
  pinMode(SENSOR, [[INPUT]]);
  pinMode(BUZZER, [[OUTPUT]]);
}

void loop() {
  if (digitalRead(SENSOR)) tone(BUZZER, [[900]]);
  else noTone(BUZZER);
}`
    },
    "7": {
      title: "Complete the Class 7 Rain Response",
      instruction: "Use the Class 7 rain circuit: rain input D2, servo D3, speaker D5, wet angle 90 degrees, and a 1200 Hz alert.",
      code: `const byte RAIN = [[2]], SERVO_PIN = [[3]], BUZZER = [[5]];

void loop() {
  bool wet = digitalRead(RAIN) == LOW;
  cover.write(wet ? [[90]] : 0);
  if (wet) tone(BUZZER, [[1200]], 150);
}`
    },
    "8": {
      title: "Complete the Class 8 Distance System",
      instruction: "Use the exact Class 8 ultrasonic and servo pins, LCD address, and near-object distance threshold.",
      code: `const byte TRIG = [[8]], ECHO = [[9]], SERVO_PIN = [[3]];
LiquidCrystal_I2C lcd([[0x27]], 16, 2);

void loop() {
  bool nearObject = measureDistance() < [[20]];
  barrier.write(nearObject ? 90 : 0);
}`
    },
    "9": {
      title: "Complete the Class 9 Bluetooth Automation Setup",
      instruction: "Use the Class 9 wireless serial, LED, relay, and LCD configuration from the supplied source.",
      code: `SoftwareSerial hm10([[8]], [[9]]);
const byte LOAD_LED = [[7]], RELAY = [[4]];
LiquidCrystal_I2C lcd([[0x27]], 16, 2);

void setup() {
  hm10.begin(9600);
}`
    }
  }[grade]);

  const renderChallengeCode = (source) => {
    const tokens = source.split(/(\[\[[^\]]+\]\])/g);
    let blankIndex = 0;
    return tokens.map((token) => {
      const match = token.match(/^\[\[(.+)\]\]$/);
      if (!match) return escapeHtml(token);
      blankIndex += 1;
      return `<input class="code-blank-input" type="text" data-code-answer="${escapeHtml(match[1])}" aria-label="Code blank ${blankIndex}" autocomplete="off">`;
    }).join("");
  };

  const rotate = (items, amount) => items.slice(amount).concat(items.slice(0, amount));

  const buildQuestions = (projects, grade) => {
    const questions = projects.map((project, index) => {
      const candidates = [
        `${project.components} | ${project.pins}`,
        `${projects[(index + 3) % projects.length].components} | ${projects[(index + 3) % projects.length].pins}`,
        `${projects[(index + 6) % projects.length].components} | ${projects[(index + 6) % projects.length].pins}`,
        `${projects[(index + 9) % projects.length].components} | ${projects[(index + 9) % projects.length].pins}`
      ];
      return {
        text: `Which component and pin map matches Class ${grade} Session ${project.session}: ${project.title}?`,
        answer: candidates[0],
        options: rotate(candidates, index % 4)
      };
    });

    const smoke = projects.find((project) => project.title === "Smoke Detection");
    const wireless = projects.filter((project) => project.title.includes("Automation"));
    questions.push({
      text: `Which set of outputs belongs to the Class ${grade} Smoke Detection dependency?`,
      answer: smoke.components,
      options: rotate([smoke.components, projects[1].components, projects[8].components, projects[3].components], Number(grade) % 4)
    });
    questions.push({
      text: `Which Class ${grade} dependency receives commands through a serial Bluetooth link?`,
      answer: `${wireless[1].title} | ${wireless[1].pins}`,
      options: rotate([
        `${wireless[1].title} | ${wireless[1].pins}`,
        `${wireless[0].title} | ${wireless[0].pins}`,
        `${projects[3].title} | ${projects[3].pins}`,
        `${projects[6].title} | ${projects[6].pins}`
      ], (Number(grade) + 1) % 4)
    });
    return questions;
  };

  const renderQuestion = (question, index) => `<fieldset class="test-question"><legend><span>${index + 1}</span>${escapeHtml(question.text)}</legend><div class="test-options">${question.options.map((option, optionIndex) => `<label><input type="radio" name="dependency-q-${index}" value="${optionIndex}" data-correct="${option === question.answer}"><span>${escapeHtml(option)}</span></label>`).join("")}</div></fieldset>`;

  const challengeFromProject = (project, session) => {
    let blanks = 0;
    const numericPattern = /\b(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g;
    let code = project.code.split("\n").map((line) => {
      if (line.trim().startsWith("//") || blanks >= 5) return line;
      return line.replace(numericPattern, (value) => {
        if (blanks >= 5) return value;
        blanks += 1;
        return `[[${value}]]`;
      });
    }).join("\n");
    if (blanks < 5) {
      code = code.replace(/\b(HIGH|LOW|INPUT|OUTPUT|setup|loop|pinMode|digitalRead|digitalWrite|delay)\b/g, (value) => {
        if (blanks >= 5) return value;
        blanks += 1;
        return `[[${value}]]`;
      });
    }
    return {
      title: `Complete the Session ${session.number} ${project.title} Code`,
      instruction: `Fill the five missing values using the exact ${project.title} circuit and code shown in Explore. The completed program must keep the original pin map and behavior.`,
      code
    };
  };

  const behaviorLabel = (project) => {
    const code = project.code;
    if (code.includes("SoftwareSerial")) return "Receives commands through a separate serial communication channel";
    if (code.includes("LiquidCrystal_I2C")) return "Displays system information through an I2C LCD";
    if (code.includes("Servo")) return "Moves a servo to a programmed angle";
    if (code.includes("analogRead")) return "Reads a changing analog sensor value";
    if (code.includes("digitalRead")) return "Reads a digital input before changing an output";
    if (code.includes("tone(")) return "Produces an audible frequency with tone()";
    return "Updates connected outputs repeatedly inside loop()";
  };

  const buildSessionQuestions = (projects, allProjects, grade, session, data) => {
    const variants = [
      { question: (project) => `Which exact pin assignment belongs to Class ${grade} Session ${session.number} ${project.title}?`, value: (project) => `${project.title} | ${project.pins}` },
      { question: (project) => `Which component set is required for ${project.title}?`, value: (project) => `${project.title} | ${project.components}` },
      { question: (project) => `Which project matches this pin map: ${project.pins}?`, value: (project) => project.title },
      { question: (project) => `Which hardware group is used by ${project.title}?`, value: (project) => `${project.title} | ${project.hardware.map((key) => data.hardware[key]?.name || key).join(", ")}` },
      { question: (project) => `Which statement correctly describes an important part of the ${project.title} program?`, value: (project) => `${project.title} | ${behaviorLabel(project)}` }
    ];
    return Array.from({ length: 15 }, (_, index) => {
      const project = projects[index % projects.length];
      const variant = variants[index % variants.length];
      const distractorPool = allProjects.filter((item) => item !== project);
      const distractors = [0, 4, 8].map((step) => distractorPool[(index + step) % distractorPool.length]);
      const answer = variant.value(project);
      const options = [answer, ...distractors.map(variant.value)];
      return { text: variant.question(project), answer, options: rotate(options, (index + Number(grade)) % 4) };
    });
  };

  const renderEvaluate = (projects, grade, session = null, data = null, allProjects = projects) => {
    const isYear2Session = Boolean(session);
    const challenge = isYear2Session ? challengeFromProject(projects[0], session) : challengeForGrade(grade);
    const questions = isYear2Session ? buildSessionQuestions(projects, allProjects, grade, session, data) : buildQuestions(projects, grade);
    return `${phaseHeader(
      4,
      "Evaluate",
      isYear2Session ? `Session ${session.number}: ${session.title} Assessment` : `Class ${grade} Dependency Assessment`,
      "Complete the five-point code challenge and answer all fifteen class- and session-specific questions. Submit once to reveal the score."
    )}
      <form class="session-test" id="sessionTest">
        <article class="code-challenge-card"><p class="phase-label">5 Points</p><h3>${escapeHtml(challenge.title)}</h3><p>${escapeHtml(challenge.instruction)}</p><div class="challenge-code"><pre><code>${renderChallengeCode(challenge.code)}</code></pre></div><p class="code-challenge-result" aria-live="polite"></p></article>
        <section class="test-section"><div class="test-section-heading"><div><p class="phase-label">15 Points</p><h3>Multiple-Choice Test</h3></div><span>One point per question</span></div><div class="test-grid dependency-test-grid">${questions.map(renderQuestion).join("")}</div></section>
        <div class="test-actions"><button type="submit" class="download-btn">${icon("send")}<span>Submit Test</span></button><button type="reset" class="download-btn secondary-download">${icon("rotate-ccw")}<span>Reset</span></button></div>
      </form>
      <div class="score-modal" id="scoreModal" hidden><div class="score-card" role="dialog" aria-modal="true" aria-labelledby="scoreTitle"><button type="button" class="score-close" id="closeScore" aria-label="Close score">${icon("x")}</button><p class="phase-label">Test Submitted</p><h2 id="scoreTitle">${isYear2Session ? `Year 2 Session ${session.number} Score` : "Dependency Score"}</h2><strong id="scoreText">Score: 0 / 20</strong><p id="scoreMessage"></p></div></div>
      <div class="all5e-next-row"><a class="download-btn secondary-download" href="${isYear2Session ? `year2.html?grade=${grade}` : `../index.html?panel=sessionSelect&year=2&grade=${grade}`}">${icon("circle-check")}<span>${isYear2Session ? "Back to Year 2 Sessions" : "Finish Dependencies"}</span></a></div>`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (document.body.dataset.page !== "all-5e" || mode !== "year2") return;

    const data = window.LEVEL2_DEPENDENCIES;
    const grade = ["6", "7", "8", "9"].includes(params.get("grade")) ? params.get("grade") : "6";
    const allProjects = data?.grades?.[grade];
    const isYear2Session = true;
    const requestedSession = Math.max(1, Math.min(10, Number(params.get("session") || 1)));
    const session = isYear2Session ? window.YEAR2_PROGRAM?.sessions?.[requestedSession - 1] : null;
    const projects = isYear2Session ? allProjects?.filter((project) => Number(project.session) === session?.sourceSession) : allProjects;
    if (!data || !projects?.length) return;
    const renderData = isYear2Session ? { ...data, engage: engageForSession(session, projects, data) } : data;

    const label = document.querySelector("[data-all5e-label]");
    const cover = document.querySelector("[data-all5e-cover]");
    const sessionText = document.querySelector("[data-all5e-session]");
    const title = document.querySelector("[data-all5e-title]");
    const back = document.querySelector("[data-back-to-sessions]");
    const contentCard = document.querySelector("#all5eContent");
    const phaseNav = document.querySelector(".all5e-layout > .common-dialogue-nav");
    const elaborateButton = phaseNav?.querySelector('[data-phase="elaborate"]');
    const elaborateCard = contentCard?.querySelector('[data-all5e-phase="elaborate"]');
    const phaseOrder = ["engage", "explore", "explain", "evaluate"];
    let activePhase = "engage";
    let activeTopic = projects[0].id;

    document.title = isYear2Session ? `Year 2 | Class ${grade} | Session ${session.number}` : `Level 2 | Class ${grade} | Dependencies`;
    if (label) label.textContent = isYear2Session ? `Year 2 Robotics | Class ${grade}` : `Level 2 Dependencies | Class ${grade}`;
    if (cover) {
      cover.src = `https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${projects[0].circuit}`;
      cover.alt = isYear2Session ? `Year 2 Class ${grade} Session ${session.number} circuit cover` : `Class ${grade} Level 2 Dependencies cover`;
    }
    if (sessionText) sessionText.textContent = isYear2Session ? `Year 2 | Class ${grade} | Session ${session.number}` : `Level 2 Dependencies | Class ${grade}`;
    if (title) title.textContent = isYear2Session ? session.title : data.topic;
    if (back) back.href = isYear2Session ? `year2.html?grade=${grade}` : `../index.html?panel=sessionSelect&year=2&grade=${grade}`;

    elaborateButton?.remove();
    elaborateCard?.remove();
    if (phaseNav) {
      const navLabel = phaseNav.querySelector(":scope > .phase-label");
      if (navLabel) navLabel.textContent = "Select 4E";
      const evaluateButton = phaseNav.querySelector('[data-phase="evaluate"]');
      const number = evaluateButton?.querySelector(":scope > span");
      if (number) number.textContent = "4";
      if (evaluateButton) evaluateButton.querySelector("small").textContent = "Test and score";
    }

    const phaseCards = Object.fromEntries(phaseOrder.map((phase) => [phase, contentCard.querySelector(`[data-all5e-phase="${phase}"]`)]));
    phaseCards.engage.innerHTML = renderEngage(renderData, grade, session || { number: "", title: "Dependency Systems" });
    phaseCards.explore.innerHTML = renderExplore(projects, grade, session || { number: "", title: "Dependency Systems" });
    phaseCards.explain.innerHTML = renderExplain(projects, renderData, session || { number: "", title: "Dependency Systems" });
    phaseCards.evaluate.innerHTML = renderEvaluate(projects, grade, session, renderData, allProjects);
    contentCard.classList.add("dependencies-content-card");

    const showTopic = (topicId) => {
      if (!projects.some((project) => project.id === topicId)) return;
      activeTopic = topicId;
      contentCard.querySelectorAll("[data-dependency-topic]").forEach((button) => {
        const isActive = button.dataset.dependencyTopic === topicId;
        button.classList.toggle("active", isActive);
        if (isActive) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
      contentCard.querySelectorAll("[data-dependency-topic-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.dependencyTopicPanel === topicId));
      contentCard.querySelectorAll("[data-dependency-explain-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.dependencyExplainPanel === topicId));
      const explainSelect = contentCard.querySelector("#dependencyExplainTopic");
      if (explainSelect) explainSelect.value = topicId;
    };

    const showPhase = (phase, immediate = false) => {
      if (!phaseOrder.includes(phase)) return;
      activePhase = phase;
      phaseNav.querySelectorAll("[data-phase]").forEach((button) => {
        const isActive = button.dataset.phase === phase;
        button.classList.toggle("active", isActive);
        if (isActive) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      Object.entries(phaseCards).forEach(([name, card]) => card.classList.toggle("active", name === phase));
      showTopic(activeTopic);
      document.title = isYear2Session
        ? `Year 2 | Class ${grade} | Session ${session.number} | ${phase[0].toUpperCase()}${phase.slice(1)}`
        : `Level 2 | Class ${grade} | ${phase[0].toUpperCase()}${phase.slice(1)}`;
      if (!immediate) {
        const target = window.matchMedia("(max-width: 980px)").matches ? phaseNav : contentCard;
        target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      }
    };

    phaseNav.querySelectorAll("[data-phase]").forEach((button) => button.addEventListener("click", () => showPhase(button.dataset.phase)));
    contentCard.addEventListener("click", (event) => {
      const topicButton = event.target.closest("[data-dependency-topic]");
      if (topicButton) showTopic(topicButton.dataset.dependencyTopic);
      const nextButton = event.target.closest("[data-dependency-next]");
      if (nextButton) showPhase(nextButton.dataset.dependencyNext);
    });
    contentCard.querySelector("#dependencyExplainTopic")?.addEventListener("change", (event) => showTopic(event.target.value));

    const enterFullscreen = document.querySelector("#enter5eFullscreen");
    const exitFullscreen = document.querySelector("#exit5eFullscreen");
    enterFullscreen?.addEventListener("click", async () => {
      if (!document.fullscreenElement && contentCard.requestFullscreen) await contentCard.requestFullscreen();
      contentCard.classList.add("fullscreen-mode");
    });
    exitFullscreen?.addEventListener("click", async () => {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      contentCard.classList.remove("fullscreen-mode");
    });
    document.addEventListener("fullscreenchange", () => contentCard.classList.toggle("fullscreen-mode", document.fullscreenElement === contentCard));

    showTopic(activeTopic);
    showPhase(activePhase, true);
    if (window.lucide && typeof window.lucide.createIcons === "function") window.lucide.createIcons();
  });
}());
