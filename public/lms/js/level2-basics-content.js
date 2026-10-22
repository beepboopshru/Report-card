(function () {
  const code = {
    ledMain: `const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(500);
  digitalWrite(ledPin, LOW);
  delay(500);
}`,
    ledTry: `const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(200);
  digitalWrite(ledPin, LOW);
  delay(200);
  digitalWrite(ledPin, HIGH);
  delay(800);
  digitalWrite(ledPin, LOW);
  delay(800);
}`,
    rockerMain: `const int led = 7;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
}`,
    rockerTry: `const int led = 5;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
}`,
    pushMain: `const int switchPin = 2;
const int ledPin = 5;

void setup() {
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(switchPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
    pushTry: `const int switchPin = 3;
const int ledPin = 6;

void setup() {
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(switchPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
    potMain: `const int potPin = A0;      // Potentiometer connected to A0
const int motorPin = 5;     // PWM pin connected to motor driver

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  // Read the potentiometer value (0 to 1023)
  int potValue = analogRead(potPin);

  // Convert it to PWM value (0 to 255)
  int motorSpeed = map(potValue, 0, 1023, 0, 255);

  // Set motor speed
  analogWrite(motorPin, motorSpeed);
  delay(10);
}`,
    potTry: `const int potPin = A0;
const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (analogRead(potPin) > 512)
    digitalWrite(ledPin, HIGH);
  else
    digitalWrite(ledPin, LOW);
}`
  };

  window.LEVEL2_BASICS_CONTENT = {
    session: "Basics Session",
    topic: "LED, Switches, and Potentiometer Fundamentals",
    cover: "assets/images/pdf/year-2/session-1-cover.jpg",
    sections: [
      {
        id: "led",
        explore: "Explore 1",
        title: "Simple LED Blinking",
        label: "LED Blinking",
        source: "Level 1: Class 4, Session 1 Explore",
        summary: "Connect one red SMD LED to D5 and GND, then use HIGH, LOW, and delay() to create a repeating blink.",
        image: "assets/images/hardware-doc/level-1/hardware-doc-01.png",
        imageAlt: "LED component",
        facts: [
          ["Output", "Red 1W SMD LED on breakout board"],
          ["Connection", "LED signal to D5 and the second wire to GND"],
          ["Result", "The LED turns ON for 500 ms and OFF for 500 ms repeatedly"]
        ],
        pages: [
          ["assets/images/pdf/class-4/session-1/explore-page-03.jpg", "Project Setup", "Materials, D5/GND connection, and circuit diagram."],
          ["assets/images/pdf/class-4/session-1/explore-page-04.jpg", "Main Code", "Level 1 LED blink source code page.", "basics-led-main"],
          ["assets/images/pdf/class-4/session-1/explore-page-05.jpg", "Try This Yourself", "Level 1 changed-timing practice page.", "basics-led-try"]
        ],
        downloads: [
          ["assets/downloads/class-4/session-1/explore/4th-class-beginner-arduino-code.zip", "LED Main Code ZIP", "primary"],
          ["assets/downloads/class-4/session-1/explore/try-this-yourself-code.zip", "LED Try Code ZIP", "secondary"]
        ],
        codes: [
          ["basics-led-main", "Core LED Blink Code", code.ledMain],
          ["basics-led-try", "Try This Yourself Code", code.ledTry]
        ]
      },
      {
        id: "rocker",
        topic: "switches",
        explore: "Explore 2",
        title: "Rocker Switch",
        label: "Rocker Switch",
        source: "Level 1: Class 5, Session 1 Explore",
        summary: "A two-pin rocker switch is a maintained ON/OFF control. It keeps its state until the opposite side is pressed.",
        image: "assets/images/hardware-doc/level-1/hardware-doc-06.png",
        imageAlt: "Two-pin rocker switch",
        facts: [
          ["Pins", "Two non-polarized terminals placed in series with the output path"],
          ["Connection", "Rocker switch PCB with the green SMD LED connected to D6 and GND"],
          ["Result", "ON completes the path and OFF breaks the path"]
        ],
        pages: [
          ["assets/images/pdf/class-5/session-1/explore-g5-page-06.jpg", "Project Setup", "Level 1 rocker switch materials and circuit guide."],
          ["assets/images/pdf/class-5/session-1/explore-g5-page-07.jpg", "Main Code", "Level 1 rocker switch LED code page.", "basics-rocker-main"],
          ["assets/images/pdf/class-5/session-1/explore-g5-page-08.jpg", "Try This Yourself", "Level 1 changed-pin practice page.", "basics-rocker-try"]
        ],
        downloads: [
          ["assets/downloads/class-5/session-1/explore/g5-session1-explore-code.zip", "Rocker Main Code ZIP", "primary"],
          ["assets/downloads/class-5/session-1/explore/g5-session1-try-this-code.zip", "Rocker Try Code ZIP", "secondary"]
        ],
        codes: [
          ["basics-rocker-main", "Core Rocker Switch Code", code.rockerMain],
          ["basics-rocker-try", "Try This Yourself Code", code.rockerTry]
        ]
      },
      {
        id: "push",
        topic: "switches",
        explore: "Explore 2",
        title: "Push Button",
        label: "Push Button",
        source: "Level 1: Class 4, Session 3 Explore",
        summary: "A two-pin push button is a momentary input. The connection is active only while the button is pressed.",
        image: "assets/images/hardware-doc/level-1/hardware-doc-07.png",
        imageAlt: "Two-pin push button",
        facts: [
          ["Input mode", "INPUT_PULLUP keeps the input HIGH normally and reads LOW while pressed"],
          ["Source project", "Push button and yellow LED input-output circuit"],
          ["Result", "The LED turns ON while the button is pressed and OFF when released"]
        ],
        pages: [
          ["assets/images/pdf/class-4/session-3/explore-c4-s3-page-04.jpg", "Project Setup", "Level 1 push button materials and circuit guide."],
          ["assets/images/pdf/class-4/session-3/explore-c4-s3-page-05.jpg", "Main Code", "Level 1 push button input code page.", "basics-push-main"],
          ["assets/images/pdf/class-4/session-3/explore-c4-s3-page-06.jpg", "Try This Yourself", "Level 1 changed-pin practice page.", "basics-push-try"]
        ],
        downloads: [
          ["assets/downloads/class-4/session-3/explore/c4-session3-explore-code.zip", "Push Button Main ZIP", "primary"],
          ["assets/downloads/class-4/session-3/explore/c4-session3-try-this-code.zip", "Push Button Try ZIP", "secondary"]
        ],
        codes: [
          ["basics-push-main", "Core Push Button Code", code.pushMain],
          ["basics-push-try", "Try This Yourself Code", code.pushTry]
        ]
      },
      {
        id: "potentiometer",
        explore: "Explore 3",
        title: "Using a Potentiometer",
        label: "Potentiometer",
        source: "Level 1: Class 4, Session 5 Explore",
        summary: "Read the changing voltage from the potentiometer on A0, then use the value to control motor speed or switch an LED at a threshold.",
        image: "assets/images/hardware-doc/level-1/hardware-doc-25.png",
        imageAlt: "Potentiometer PCB",
        facts: [
          ["Pins", "VCC, GND, and OUT; connect OUT to analog pin A0"],
          ["Reading", "analogRead(A0) returns a value from 0 to 1023"],
          ["Result", "The value can be mapped to PWM 0-255 for motor speed or LED brightness"]
        ],
        pages: [
          ["assets/images/pdf/class-4/session-5/explore-c4-s5-page-01.jpg", "Component Introduction", "Level 1 potentiometer, DIP LED, and DC motor source page."],
          ["assets/images/pdf/class-4/session-5/explore-c4-s5-page-02.jpg", "Project Setup", "Level 1 potentiometer PCB and motor circuit page."],
          ["assets/images/pdf/class-4/session-5/explore-c4-s5-page-03.jpg", "Main Code", "Level 1 potentiometer motor-speed code page.", "basics-pot-main"],
          ["assets/images/pdf/class-4/session-5/explore-c4-s5-page-04.jpg", "Try This Yourself", "Level 1 potentiometer threshold practice page.", "basics-pot-try"]
        ],
        downloads: [
          ["assets/downloads/class-4/session-5/explore/c4-session5-explore-code.zip", "Potentiometer Main ZIP", "primary"],
          ["assets/downloads/class-4/session-5/explore/c4-session5-try-this-code.zip", "Potentiometer Try ZIP", "secondary"]
        ],
        codes: [
          ["basics-pot-main", "Core Potentiometer Code", code.potMain],
          ["basics-pot-try", "Try This Yourself Code", code.potTry]
        ]
      }
    ]
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const formatCode = (value) => typeof window.formatArduinoCode === "function"
    ? window.formatArduinoCode(value)
    : String(value ?? "");

  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  const media = (src, alt) => `<div class="media-stage pdf-media-stage is-loading">
    <div class="media-loader" role="status" aria-live="polite"><span class="media-spinner" aria-hidden="true"></span><span data-media-status>Loading image</span></div>
    <img src="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${src}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
  </div>`;

  const renderPage = ([src, title, caption, codeId]) => `<article class="pdf-frame${codeId ? "" : " feature-page"}">
    ${codeId ? `<button type="button" class="copy-page-code-btn" data-code-template="${codeId}">${icon("copy")}<span data-button-label>Copy Code</span></button>` : ""}
    ${media(src, title)}
    <div class="pdf-caption"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(caption)}</span></div>
  </article>`;

  const renderSection = (section, next) => `<section class="basics-explore-section" data-basics-section="${section.id}" aria-labelledby="basics-title-${section.id}">
    <header class="basics-explore-heading">
      <span>${escapeHtml(section.explore)}</span>
      <div><p class="phase-label">${escapeHtml(section.source)}</p><h2 id="basics-title-${section.id}">${escapeHtml(section.title)}</h2></div>
    </header>
    <p class="lead-text">${escapeHtml(section.summary)}</p>
    <div class="basics-component-overview">
      <div class="basics-component-image">${media(section.image, section.imageAlt)}</div>
      <dl>${section.facts.map(([term, detail]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(detail)}</dd></div>`).join("")}</dl>
    </div>
    <section class="project-gallery-block">
      <div class="basics-section-title"><div><p class="phase-label">Level 1 Source</p><h3>Explore Pages</h3></div><span>Scroll one page at a time</span></div>
      <div class="pdf-showcase elaborate-pages scroll-gallery">${section.pages.map(renderPage).join("")}</div>
    </section>
    <section class="download-panel basics-download-panel">
      <div><h3>Arduino Code Files</h3><p>Download the Level 1 source code used in this Explore topic.</p></div>
      <div class="download-actions">${section.downloads.map(([href, label, type]) => `<a class="download-btn ${type === "secondary" ? "secondary-download" : ""}" href="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${href}" download>${icon("download")}<span>${escapeHtml(label)}</span></a>`).join("")}</div>
    </section>
    <div class="basics-code-grid">${section.codes.map(([id, title, sourceCode]) => `<article class="code-focus"><h3>${escapeHtml(title)}</h3><div class="code-copy-wrap"><button type="button" class="copy-code-btn">${icon("copy")}<span data-button-label>Copy Code</span></button><pre><code>${escapeHtml(formatCode(sourceCode))}</code></pre></div><template id="${id}">${escapeHtml(formatCode(sourceCode))}</template></article>`).join("")}</div>
    <div class="all5e-next-row">${next ? `<button type="button" class="download-btn" data-next-basics="${next.id}"><span>Next: ${escapeHtml(next.label)}</span>${icon("arrow-right")}</button>` : `<a class="download-btn secondary-download" href="../index.html?panel=sessionSelect&year=2&grade={grade}">${icon("circle-check")}<span>Finish Basics Session</span></a>`}</div>
  </section>`;

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (document.body.dataset.page !== "all-5e" || params.get("mode") !== "basics") return;

    const selectedYear = params.get("year") || "2";
    const selectedGrade = params.get("grade") || "6";
    const data = window.LEVEL2_BASICS_CONTENT;
    const main = document.querySelector(".all5e-page");
    if (!main || !data) return;

    const sections = data.sections;
    const sectionById = Object.fromEntries(sections.map((section) => [section.id, section]));
    const order = sections.map((section) => section.id);
    const switches = sections.filter((section) => section.topic === "switches");
    const headerLabel = document.querySelector("[data-all5e-label]");
    if (headerLabel) headerLabel.textContent = `Level 2 Basics | Class ${selectedGrade}`;
    document.title = `Level 2 | Class ${selectedGrade} | ${data.session}`;
    main.classList.add("basics-session-page");
    main.innerHTML = `<section class="common-hero basics-hero">
      <img src="https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/${data.cover}" alt="${escapeHtml(data.session)} cover">
      <div><p class="phase-label">Level 2 Sensational Sensors | Class ${escapeHtml(selectedGrade)}</p><h1>${escapeHtml(data.topic)}</h1><div class="all5e-hero-actions"><a class="back-btn icon-button-label" href="../index.html?panel=sessionSelect&year=${escapeHtml(selectedYear)}&grade=${escapeHtml(selectedGrade)}">${icon("arrow-left")}<span>Back to Sessions</span></a></div></div>
    </section>
    <div class="common-layout basics-layout">
      <aside class="common-dialogue-nav basics-dialogue-nav" aria-label="Basics Explore navigation">
        <p class="phase-label">Select Explore</p>
        <div class="basics-dialogue-group active" data-basics-group="led"><button type="button" class="dialogue-option basics-topic-option active" data-basics-topic="led"><span>1</span><strong>LED Blinking</strong><small>Simple digital output</small></button></div>
        <div class="basics-dialogue-group" data-basics-group="switches"><button type="button" class="dialogue-option basics-topic-option" data-basics-topic="switches"><span>2</span><strong>Switches</strong><small>${switches.length} switch types</small></button><div class="basics-switch-options">${switches.map((section, index) => `<button type="button" class="dialogue-option basics-switch-option" data-basics-target="${section.id}"><span>${index + 1}</span><strong>${escapeHtml(section.label)}</strong><small>${escapeHtml(section.title)}</small></button>`).join("")}</div></div>
        <div class="basics-dialogue-group" data-basics-group="potentiometer"><button type="button" class="dialogue-option basics-topic-option" data-basics-topic="potentiometer"><span>3</span><strong>Potentiometer</strong><small>Variable analog input</small></button></div>
      </aside>
      <div class="basics-content-flow">${sections.map((section, index) => renderSection(section, sections[index + 1]).replace("{grade}", escapeHtml(selectedGrade))).join("")}</div>
    </div>`;

    const showSection = (target, shouldScroll = true) => {
      if (!sectionById[target]) return;
      const activeGroup = sectionById[target].topic === "switches" ? "switches" : target;
      main.querySelectorAll("[data-basics-section]").forEach((section) => section.classList.toggle("active", section.dataset.basicsSection === target));
      main.querySelectorAll("[data-basics-group]").forEach((group) => group.classList.toggle("active", group.dataset.basicsGroup === activeGroup));
      main.querySelectorAll("[data-basics-topic]").forEach((button) => {
        const isActive = button.dataset.basicsTopic === activeGroup;
        button.classList.toggle("active", isActive);
        if (isActive) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      main.querySelectorAll("[data-basics-target]").forEach((button) => button.classList.toggle("active", button.dataset.basicsTarget === target));
      document.title = `Level 2 | Class ${selectedGrade} | ${sectionById[target].title}`;
      if (shouldScroll) main.querySelector(".basics-content-flow")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    main.querySelectorAll("[data-basics-topic]").forEach((button) => button.addEventListener("click", () => showSection(button.dataset.basicsTopic === "switches" ? switches[0].id : button.dataset.basicsTopic)));
    main.querySelectorAll("[data-basics-target]").forEach((button) => button.addEventListener("click", () => showSection(button.dataset.basicsTarget)));
    main.querySelectorAll("[data-next-basics]").forEach((button) => button.addEventListener("click", () => showSection(button.dataset.nextBasics)));
    showSection(order[0], false);

    if (window.lucide && typeof window.lucide.createIcons === "function") window.lucide.createIcons();
  });
}());
