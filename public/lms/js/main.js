document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");
    const progressLinks = document.querySelectorAll(".lesson-progress a");
    const sections = document.querySelectorAll(".phase-card");
    const currentPage = document.body.dataset.page;
    const params = new URLSearchParams(window.location.search);
    const year = params.get("year") || "1";
    const grade = params.get("grade") || "4";
    const session = params.get("session") || "1";
    const mode = params.get("mode") || "";
    const homePanel = params.get("panel") || "";
    const contentKey = `${year}-${grade}-${session}`;
    const legacyContentKey = `${grade}-${session}`;
    const lessonData = window.LMS_CONTENT ? (window.LMS_CONTENT[contentKey] || window.LMS_CONTENT[legacyContentKey]) : null;
    const query = `?year=${year}&grade=${grade}&session=${session}`;
    const assetPrefix = "https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/"; // patched: assets stay in the upstream GitHub repo
    const yearClasses = {
        "1": [
            ["4", "Class 4", "Beginner"],
            ["5", "Class 5", "Intermediate"],
            ["6", "Class 6", "Advanced"],
            ["7", "Class 7", "Expert"]
        ],
        "2": [
            ["6", "Class 6", "Beginner"],
            ["7", "Class 7", "Intermediate"],
            ["8", "Class 8", "Advanced"],
            ["9", "Class 9", "Expert"]
        ]
    };
    const levelLabels = {
        "1": "Level 1 Creative Automation",
        "2": "Level 2 Sensational Sensors"
    };
    let selectedHomeYear = year;
    let selectedHomeGrade = grade;
    let selectedHomeSessionUrl = "pages/all5e.html?year=1&grade=4&session=1";
    let selectedHomeSession = "1";

    const getHomeLesson = (yearValue, gradeValue, sessionValue) => {
        if (sessionValue === "0") {
            const common = window.COMMON_SESSION_CONTENT;
            return common ? {
                session: common.session,
                topic: common.topic,
                cover: common.cover,
                isCommonSession: true
            } : null;
        }
        if (!window.LMS_CONTENT) return null;
        return window.LMS_CONTENT[`${yearValue}-${gradeValue}-${sessionValue}`] || window.LMS_CONTENT[`${gradeValue}-${sessionValue}`] || null;
    };

    const showHomePanel = (panelId) => {
        document.querySelectorAll(".home-panel").forEach((panel) => {
            panel.classList.toggle("active", panel.id === panelId);
        });
    };

    const refreshClassCards = () => {
        const classes = yearClasses[selectedHomeYear] || yearClasses["1"];
        const classButtons = document.querySelectorAll(".selection-card[data-grade]");
        classButtons.forEach((classButton, index) => {
            const item = classes[index];
            if (!item) return;
            classButton.dataset.grade = item[0];
            const number = classButton.querySelector("span");
            const title = classButton.querySelector("strong");
            const tier = classButton.querySelector("p");
            if (number) number.textContent = item[0];
            if (title) title.textContent = item[1];
            if (tier) tier.textContent = item[2];
        });
        document.querySelectorAll("[data-selected-year-label]").forEach((label) => {
            label.textContent = levelLabels[selectedHomeYear] || levelLabels["1"];
        });
    };

    const refreshSessionCards = () => {
        const label = document.querySelector("#selectedClassLabel");
        if (label) label.textContent = `${levelLabels[selectedHomeYear] || levelLabels["1"]} | Class ${selectedHomeGrade}`;
        document.querySelectorAll(".session-card.available").forEach((card) => {
            const sessionValue = card.dataset.session || "1";
            const cardLesson = getHomeLesson(selectedHomeYear, selectedHomeGrade, sessionValue);
            card.setAttribute("href", "#");
            card.dataset.targetUrl = sessionValue === "0"
                ? `pages/all5e.html?mode=introduction&year=${selectedHomeYear}&grade=${selectedHomeGrade}`
                : `pages/all5e.html?year=${selectedHomeYear}&grade=${selectedHomeGrade}&session=${sessionValue}`;
            if (cardLesson) {
                const image = card.querySelector("img");
                const sessionLabel = card.querySelector("span");
                const title = card.querySelector("strong");
                const status = card.querySelector("p");
                if (image) {
                    image.src = cardLesson.cover;
                    image.alt = `${cardLesson.session} ${cardLesson.topic} cover`;
                }
                if (sessionLabel) sessionLabel.textContent = cardLesson.session;
                if (title) title.textContent = cardLesson.topic;
                if (status) {
                    const explorePending = !cardLesson.explore?.pages?.length;
                    const elaboratePending = cardLesson.elaborate?.projects?.some((project) => !project.pages?.length);
                    status.textContent = cardLesson.isCommonSession
                        ? "Common session ready"
                        : (elaboratePending ? "Elaborate PDF pending" : (explorePending ? "Explore PDF pending" : "5E lesson ready"));
                }
            }
        });
    };

    document.querySelectorAll("[data-show-panel]").forEach((button) => {
        button.addEventListener("click", () => showHomePanel(button.dataset.showPanel));
    });

    document.querySelectorAll("[data-year]").forEach((button) => {
        button.addEventListener("click", () => {
            selectedHomeYear = button.dataset.year || "1";
            refreshClassCards();
            showHomePanel("classSelect");
        });
    });

    document.querySelectorAll("[data-grade]").forEach((button) => {
        button.addEventListener("click", () => {
            selectedHomeGrade = button.dataset.grade;
            refreshSessionCards();
            showHomePanel("sessionSelect");
        });
    });

    document.querySelectorAll(".session-card.available").forEach((card) => {
        card.addEventListener("click", (event) => {
            event.preventDefault();
            selectedHomeSessionUrl = card.dataset.targetUrl || `pages/all5e.html?year=${selectedHomeYear}&grade=${selectedHomeGrade}&session=1`;
            selectedHomeSession = card.dataset.session || "1";
            const selectedLesson = getHomeLesson(selectedHomeYear, selectedHomeGrade, selectedHomeSession);
            const modal = document.querySelector("#sessionModal");
            const startButton = document.querySelector("#startSelectedSession");
            const modalImage = modal ? modal.querySelector("img") : null;
            const modalLabel = modal ? modal.querySelector(".phase-label") : null;
            const modalTitle = document.querySelector("#sessionModalTitle");
            if (selectedLesson) {
                if (modalImage) {
                    modalImage.src = selectedLesson.cover;
                    modalImage.alt = `${selectedLesson.session} ${selectedLesson.topic} cover`;
                }
                if (modalLabel) modalLabel.textContent = selectedLesson.session;
                if (modalTitle) modalTitle.textContent = selectedLesson.topic;
            }
            if (modal) modal.hidden = false;
            if (startButton) startButton.focus();
        });
    });

    const startSelectedSession = document.querySelector("#startSelectedSession");
    if (startSelectedSession) {
        startSelectedSession.addEventListener("click", () => {
            window.location.href = selectedHomeSessionUrl;
        });
    }

    const closeSessionModal = document.querySelector("#closeSessionModal");
    const sessionModal = document.querySelector("#sessionModal");
    if (closeSessionModal && sessionModal) {
        closeSessionModal.addEventListener("click", () => {
            sessionModal.hidden = true;
        });
        sessionModal.addEventListener("click", (event) => {
            if (event.target === sessionModal) sessionModal.hidden = true;
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !sessionModal.hidden) {
                sessionModal.hidden = true;
            }
        });
    }

    const escapeHtml = (value) => String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    const renderAll5ePage = () => {
        if (currentPage !== "all-5e") return;
        if (mode === "introduction") return;

        if (!lessonData) return;

        const label = document.querySelector("[data-all5e-label]");
        const cover = document.querySelector("[data-all5e-cover]");
        const sessionText = document.querySelector("[data-all5e-session]");
        const title = document.querySelector("[data-all5e-title]");
        const phaseButtons = document.querySelectorAll("[data-phase]");
        const phaseCards = document.querySelectorAll("[data-all5e-phase]");
        const contentCard = document.querySelector("#all5eContent");
        const enterFullscreen = document.querySelector("#enter5eFullscreen");
        const exitFullscreen = document.querySelector("#exit5eFullscreen");
        const backToSessions = document.querySelector("[data-back-to-sessions]");
        const phaseOrder = ["engage", "explore", "explain", "elaborate", "evaluate"];
        const phaseNames = {
            engage: "Engage",
            explore: "Explore",
            explain: "Explain",
            elaborate: "Elaborate",
            evaluate: "Evaluate"
        };

        document.title = `${lessonData.year || levelLabels[year] || `Level ${year}`} | ${lessonData.grade} | ${lessonData.session}`;
        if (label) label.textContent = `${lessonData.year || levelLabels[year] || `Level ${year}`} ${lessonData.grade} ${lessonData.tier}`;
        if (cover) {
            cover.src = `${assetPrefix}${lessonData.cover}`;
            cover.alt = `${lessonData.session} ${lessonData.topic} cover`;
        }
        if (sessionText) sessionText.textContent = `${lessonData.session} | ${lessonData.grade}`;
        if (title) title.textContent = lessonData.topic;
        if (backToSessions) backToSessions.href = `../index.html?panel=sessionSelect&year=${year}&grade=${grade}`;
        phaseCards.forEach((card) => renderPhaseCard(card.dataset.all5ePhase, card));

        const showPhase = (selectedPhase) => {
            phaseButtons.forEach((item) => item.classList.toggle("active", item.dataset.phase === selectedPhase));
            phaseCards.forEach((card) => card.classList.toggle("active", card.dataset.all5ePhase === selectedPhase));
            const activeCard = document.querySelector(`[data-all5e-phase="${selectedPhase}"]`);
            if (activeCard) activeCard.scrollTop = 0;
        };

        phaseButtons.forEach((button) => {
            button.addEventListener("click", () => showPhase(button.dataset.phase));
        });

        document.querySelectorAll("[data-next-e]").forEach((button) => {
            button.addEventListener("click", () => showPhase(button.dataset.nextE));
        });

        if (enterFullscreen && contentCard) {
            enterFullscreen.addEventListener("click", async () => {
                if (document.fullscreenElement) return;
                if (contentCard.requestFullscreen) await contentCard.requestFullscreen();
                contentCard.classList.add("fullscreen-mode");
            });
        }

        if (exitFullscreen && contentCard) {
            exitFullscreen.addEventListener("click", async () => {
                if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
                contentCard.classList.remove("fullscreen-mode");
            });
        }

        document.addEventListener("fullscreenchange", () => {
            if (contentCard) contentCard.classList.toggle("fullscreen-mode", document.fullscreenElement === contentCard);
        });
    };

    if (currentPage === "home") {
        refreshClassCards();
        if (homePanel === "sessionSelect") {
            refreshSessionCards();
            showHomePanel("sessionSelect");
        } else if (homePanel === "classSelect") {
            showHomePanel("classSelect");
        }
    }

    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Copy command failed");
    };

    const pageCard = (page) => {
        const [src, title, caption, codeTemplate, pageType] = page;
        const copyButton = codeTemplate
            ? `<button type="button" class="copy-page-code-btn" data-code-template="${codeTemplate}">Copy Code</button>`
            : "";
        const isPdf = pageType === "pdf" || String(src).toLowerCase().endsWith(".pdf");
        const media = isPdf
            ? `<iframe class="embedded-pdf" src="${assetPrefix}${src}#view=FitH" title="${title}" loading="lazy"></iframe>`
            : `<img src="${assetPrefix}${src}" alt="${title}" loading="lazy" decoding="async">`;
        return `<article class="pdf-frame${codeTemplate ? "" : " feature-page"}">
            ${copyButton}
            ${media}
            <div class="pdf-caption"><strong>${title}</strong><span>${caption}</span></div>
        </article>`;
    };

    const renderTemplates = (codes = {}) => Object.entries(codes)
        .map(([id, code]) => `<template id="${id}">${escapeHtml(code)}</template>`)
        .join("");

    const renderGallery = (pages = []) => `<div class="pdf-showcase elaborate-pages scroll-gallery">${pages.map(pageCard).join("")}</div>`;

    const renderHardwareImages = (images, title) => {
        const list = Array.isArray(images) ? images : [images];
        return `<div class="hardware-image-stack">
            ${list.filter(Boolean).map((image) => `<img src="${assetPrefix}${image}" alt="${title}" loading="lazy" decoding="async">`).join("")}
        </div>`;
    };

    const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const deriveBlankAnswers = (challengeCode = "", solutionCode = "") => {
        if (!challengeCode.includes("____") || !solutionCode) return [];

        const parts = challengeCode.split(/_{4,}/);
        const answers = [];
        let cursor = 0;
        let exactMatched = true;

        for (let index = 0; index < parts.length - 1; index += 1) {
            const prefixIndex = solutionCode.indexOf(parts[index], cursor);
            if (prefixIndex === -1) {
                exactMatched = false;
                break;
            }

            const answerStart = prefixIndex + parts[index].length;
            const suffix = parts[index + 1];
            const answerEnd = suffix ? solutionCode.indexOf(suffix, answerStart) : solutionCode.length;
            if (answerEnd === -1) {
                exactMatched = false;
                break;
            }

            answers.push(solutionCode.slice(answerStart, answerEnd).trim());
            cursor = answerEnd;
        }

        if (exactMatched && answers.length === parts.length - 1) return answers;

        const lineAnswers = [];
        let searchFrom = 0;
        challengeCode.split("\n").forEach((line) => {
            if (!line.includes("____")) return;
            const pattern = escapeRegExp(line).replace(/_{4,}/g, "(.+?)");
            const matcher = new RegExp(pattern);
            const sliced = solutionCode.slice(searchFrom);
            const match = sliced.match(matcher);
            if (!match) return;
            lineAnswers.push(match[1].trim());
            searchFrom += match.index + match[0].length;
        });

        return lineAnswers;
    };

    const normalizeCodeAnswer = (value = "") => String(value)
        .trim()
        .replace(/^["']|["']$/g, "")
        .replace(/\s+/g, "")
        .toUpperCase();

    const renderInteractiveCodeChallenge = (challengeCode = "", answers = []) => {
        const escapedParts = challengeCode.split(/_{4,}/).map(escapeHtml);
        if (escapedParts.length === 1) {
            return `<div class="code-entry-panel" data-code-challenge="full">
                <label for="fullCodeAnswer">Type the corrected code</label>
                <textarea id="fullCodeAnswer" class="code-textarea" data-full-code-answer rows="10" spellcheck="false">${escapeHtml(challengeCode)}</textarea>
            </div>`;
        }

        return `<pre class="interactive-code"><code>${escapedParts.map((part, index) => {
            const input = index < escapedParts.length - 1
                ? `<input class="code-blank-input" name="codeBlank${index + 1}" aria-label="Code blank ${index + 1}" data-code-answer="${escapeHtml(answers[index] || "")}" autocomplete="off" spellcheck="false">`
                : "";
            return `${part}${input}`;
        }).join("")}</code></pre>`;
    };

    const describeCodeAnswer = (answer = "") => {
        const normalized = normalizeCodeAnswer(answer);
        if (/^\d+$/.test(normalized)) return "Enter the correct pin number or delay value used by this session.";
        if (normalized === "OUTPUT") return "Enter OUTPUT because this pin sends a signal to a device.";
        if (normalized === "INPUT") return "Enter INPUT because this pin reads a sensor or switch signal.";
        if (normalized === "INPUT_PULLUP") return "Enter INPUT_PULLUP when the switch input uses Arduino's internal pull-up mode.";
        if (normalized === "HIGH") return "Enter HIGH to turn the output ON.";
        if (normalized === "LOW") return "Enter LOW to turn the output OFF.";
        return "Enter the missing Arduino keyword, value, or constant that completes the program.";
    };

    const renderCodeInstructions = (answers = [], hasCodeBlanks = true) => {
        if (!hasCodeBlanks) {
            return `<section class="code-instruction-panel">
                <h3>How to Complete the Code</h3>
                <ul>
                    <li>Read the target behavior first.</li>
                    <li>Edit the code so the setup and loop match the session project.</li>
                    <li>Submit the test after checking the corrected code and MCQs.</li>
                </ul>
            </section>`;
        }

        return `<section class="code-instruction-panel">
            <h3>How to Fill the Code Blanks</h3>
            <ul>
                <li>Fill each blank with only the missing value or keyword. Do not type extra brackets, semicolons, or full lines.</li>
                <li>Pin blanks need the Arduino pin number used in this session.</li>
                <li>Mode/state blanks need Arduino words like OUTPUT, INPUT, HIGH, or LOW.</li>
                <li>Delay blanks need the timing number in milliseconds.</li>
            </ul>
            <div class="blank-guide-grid">
                ${answers.map((answer, index) => `<article>
                    <strong>Blank ${index + 1}</strong>
                    <span>${describeCodeAnswer(answer)}</span>
                </article>`).join("")}
            </div>
        </section>`;
    };

    const codeAnswerOverrides = {
        "5-2": ["100", "300"]
    };

    function renderPhaseCard(phase, card) {
        if (!lessonData || !card) return;

        const phaseNumber = { engage: 1, explore: 2, explain: 3, elaborate: 4, evaluate: 5 }[phase] || 1;
        const phaseTitle = phase.charAt(0).toUpperCase() + phase.slice(1);
        const phaseOrder = ["engage", "explore", "explain", "elaborate", "evaluate"];
        const phaseNames = {
            engage: "Engage",
            explore: "Explore",
            explain: "Explain",
            elaborate: "Elaborate",
            evaluate: "Evaluate"
        };
        const nextPhase = phaseOrder[phaseOrder.indexOf(phase) + 1];
        const phaseFooter = nextPhase
            ? `<div class="all5e-next-row"><button type="button" class="download-btn" data-next-e="${nextPhase}">Next: ${phaseNames[nextPhase]}</button></div>`
            : `<div class="all5e-next-row"><a class="download-btn secondary-download" href="../index.html?panel=sessionSelect&year=${year}&grade=${grade}">Finish Session</a></div>`;
        const header = `<div class="phase-header">
            <span class="phase-number">${phaseNumber}</span>
            <div><p class="phase-label">${phaseTitle}</p><h1>${lessonData[phase]?.title || phaseTitle}</h1></div>
        </div>`;

        if (phase === "engage") {
            const data = lessonData.engage;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card engage all5e-section`;
            card.innerHTML = `${header}
                <p class="lead-text">${data.lead}</p>
                <div class="trigger-grid">
                    ${data.triggers.map((item, index) => `<article class="trigger-card${item[0] ? "" : " no-image"}">
                        ${item[0] ? `<img src="${assetPrefix}${item[0]}" alt="${item[1]}" loading="lazy" decoding="async">` : ""}
                        <div>
                            <h2>${index + 1}. ${item[1]}</h2>
                            <p><strong>Trigger Question:</strong> ${item[2]}</p>
                            <p>${item[3]}</p>
                        </div>
                    </article>`).join("")}
                </div>
                <section class="objectives-card">
                    <h2>Objectives</h2>
                    <ul class="check-list">${data.objectives.map((item) => `<li>${item}</li>`).join("")}</ul>
                </section>${phaseFooter}`;
        }

        if (phase === "explore") {
            const data = lessonData.explore;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card explore all5e-section`;
            const downloads = data.downloads?.length ? `<div class="download-panel">
                <div><h2>Arduino Code Files</h2><p>Download the ready-to-upload project code.</p></div>
                <div class="download-actions">${data.downloads.map(([href, label, type]) => `<a class="download-btn ${type === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${href}" download>${label}</a>`).join("")}</div>
            </div>` : "";
            const pendingExplore = !data.pages?.length
                ? `<article class="craft-card project-working-card"><h2>Explore PDF Pending</h2><p>The Explore PDF for this session is not in the workspace yet. Engage, Explain, Elaborate, and Evaluate are ready, and this section can be regenerated after the Explore PDF is added.</p></article>`
                : renderGallery(data.pages);
            card.innerHTML = `${header}<p class="source-note">${data.note}</p>${downloads}${pendingExplore}${renderTemplates(data.codes)}${phaseFooter}`;
        }

        if (phase === "explain") {
            const data = lessonData.explain;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card explain all5e-section`;
            const hardware = data.hardware;
            const hardwareSection = hardware ? `<section class="hardware-section">
                    <h2>${hardware.title}</h2>
                    <p class="lead-text hardware-intro">${hardware.intro}</p>
                    <div class="hardware-grid session-hardware-grid">
                        ${hardware.items.map((item) => `<article class="hardware-card session-hardware-card">
                            ${renderHardwareImages(item[0], item[1])}
                            <div>
                                <h3>${item[1]}</h3>
                                <p>${item[2]}</p>
                                <p>${item[3]}</p>
                            </div>
                        </article>`).join("")}
                    </div>
                </section>` : "";
            card.innerHTML = `${header}
                <article class="code-focus">
                    <h2>Code</h2>
                    <div class="code-copy-wrap"><button type="button" class="copy-code-btn">Copy Code</button><pre><code>${escapeHtml(data.code)}</code></pre></div>
                </article>
                <div class="explain-steps">${data.steps.map((step, index) => `<article><h3>${index + 1}. ${step[0]}</h3><p>${step[1]}</p></article>`).join("")}</div>
                ${hardwareSection}${phaseFooter}`;
        }

        if (phase === "elaborate") {
            const data = lessonData.elaborate;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card elaborate all5e-section`;
            card.innerHTML = `${header}<p class="source-note">${data.note}</p>
                <section class="project-gallery-block"><h2>Materials and Components</h2>${renderGallery(data.materials)}</section>
                ${data.projects.map((project) => {
                    const download = project.download ? `<div class="download-panel compact-download"><div><h3>${project.title} Code</h3><p>Download the Arduino code for this build.</p></div><a class="download-btn ${project.download[2] === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${project.download[0]}" download>${project.download[1]}</a></div>` : "";
                    return `<section class="project-gallery-block"><h2>${project.title}</h2>${download}${renderGallery(project.pages)}<article class="craft-card project-working-card"><h2>How It Works</h2><p>${project.working}</p></article></section>`;
                }).join("")}${renderTemplates(data.codes)}${phaseFooter}`;
        }

        if (phase === "evaluate") {
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card evaluate all5e-section`;
            const questions = lessonData.evaluate?.questions || [];
            const challenge = lessonData.evaluate?.challenge || "Complete the missing parts based on this session.";
            const challengeCode = lessonData.evaluate?.challengeCode || `const int ledPin = ____;

void setup() {
  pinMode(ledPin, ______);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(____);
  digitalWrite(ledPin, LOW);
  delay(____);
}`;
            const codeAnswers = lessonData.evaluate?.challengeAnswers
                || codeAnswerOverrides[contentKey]
                || codeAnswerOverrides[legacyContentKey]
                || deriveBlankAnswers(challengeCode, lessonData.explain?.code || "");
            const hasCodeBlanks = challengeCode.includes("____");
            card.innerHTML = `${header}
                <form class="test-form" id="sessionTest">
                    <article class="code-challenge-card" data-code-max="5" data-code-solution="${escapeHtml(lessonData.explain?.code || challengeCode)}">
                        <div>
                            <h2>Code Challenge</h2>
                            <p>${challenge}</p>
                            <p class="source-note">Code challenge carries 5 points. ${hasCodeBlanks ? "Fill every blank before submitting the test." : "Review and submit the corrected code."}</p>
                        </div>
                        ${renderCodeInstructions(codeAnswers, hasCodeBlanks)}
                        ${renderInteractiveCodeChallenge(challengeCode, codeAnswers)}
                        <div class="code-challenge-result" aria-live="polite"></div>
                    </article>
                    <h2>Session Test</h2>
                    <p class="source-note">MCQs carry ${questions.length} points. Total score: ${questions.length + 5} points.</p>
                    <div class="test-grid">
                        ${questions.map((question, index) => `<fieldset class="test-question">
                            <legend>${index + 1}. ${question[0]}</legend>
                            ${question[1].map((option, optionIndex) => `<label><input type="radio" name="q${index + 1}" value="${optionIndex}" ${optionIndex === question[2] ? 'data-correct="true"' : ""}> ${option}</label>`).join("")}
                        </fieldset>`).join("")}
                    </div>
                    <div class="test-actions">
                        <button type="submit" class="submit-test">Submit Test</button>
                        <button type="reset" class="reset-test">Reset</button>
                    </div>
                </form>
                <div class="score-modal" id="scoreModal" hidden>
                    <div class="score-modal-card" role="dialog" aria-modal="true" aria-labelledby="scoreText">
                        <p class="phase-label">Test Submitted</p>
                        <strong id="scoreText">Score: 0 / ${questions.length + 5}</strong>
                        <span id="scoreMessage">Review the lesson and try again.</span>
                        <button type="button" id="closeScore">Close</button>
                    </div>
                </div>${phaseFooter}`;
        }
    }

    const renderLessonPage = () => {
        if (!lessonData || !currentPage || currentPage === "home") return;

        const brandSmall = document.querySelector(".brand small");
        if (brandSmall) brandSmall.textContent = `${lessonData.year || levelLabels[year] || `Level ${year}`} ${lessonData.grade} ${lessonData.tier}`;
        document.title = `${lessonData.year || levelLabels[year] || `Level ${year}`} | ${lessonData.grade} | ${lessonData.session} | ${lessonData.topic}`;

        progressLinks.forEach((link) => {
            const url = new URL(link.getAttribute("href"), window.location.href);
            link.setAttribute("href", `${url.pathname.split("/").pop()}${query}`);
        });

        document.querySelectorAll(".page-nav a").forEach((link) => {
            const href = link.getAttribute("href");
            if (href && href.endsWith(".html") && !href.includes("index")) {
                link.setAttribute("href", `${href}${query}`);
            }
        });

        const card = document.querySelector(".phase-card");
        if (!card) return;

        const phaseNumber = { engage: 1, explore: 2, explain: 3, elaborate: 4, evaluate: 5 }[currentPage] || 1;
        const phaseTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
        const header = `<div class="phase-header">
            <span class="phase-number">${phaseNumber}</span>
            <div><p class="phase-label">${phaseTitle}</p><h1>${lessonData[currentPage]?.title || phaseTitle}</h1></div>
        </div>`;

        if (currentPage === "engage") {
            const data = lessonData.engage;
            card.className = "phase-card engage";
            card.innerHTML = `${header}
                <p class="lead-text">${data.lead}</p>
                <div class="trigger-grid">
                    ${data.triggers.map((item, index) => `<article class="trigger-card${item[0] ? "" : " no-image"}">
                        ${item[0] ? `<img src="${assetPrefix}${item[0]}" alt="${item[1]}" loading="lazy" decoding="async">` : ""}
                        <div>
                            <h2>${index + 1}. ${item[1]}</h2>
                            <p><strong>Trigger Question:</strong> ${item[2]}</p>
                            <p>${item[3]}</p>
                        </div>
                    </article>`).join("")}
                </div>
                <section class="objectives-card">
                    <h2>Objectives</h2>
                    <ul class="check-list">${data.objectives.map((item) => `<li>${item}</li>`).join("")}</ul>
                </section>`;
        }

        if (currentPage === "explore") {
            const data = lessonData.explore;
            card.className = "phase-card explore";
            const downloads = data.downloads?.length ? `<div class="download-panel">
                <div><h2>Arduino Code Files</h2><p>Download the ready-to-upload project code.</p></div>
                <div class="download-actions">${data.downloads.map(([href, label, type]) => `<a class="download-btn ${type === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${href}" download>${label}</a>`).join("")}</div>
            </div>` : "";
            const pendingExplore = !data.pages?.length
                ? `<article class="craft-card project-working-card"><h2>Explore PDF Pending</h2><p>The Explore PDF for this session is not in the workspace yet. Engage, Explain, Elaborate, and Evaluate are ready, and this section can be regenerated after the Explore PDF is added.</p></article>`
                : renderGallery(data.pages);
            card.innerHTML = `${header}<p class="source-note">${data.note}</p>${downloads}${pendingExplore}${renderTemplates(data.codes)}`;
        }

        if (currentPage === "explain") {
            const data = lessonData.explain;
            card.className = "phase-card explain";
            const hardware = data.hardware;
            const hardwareSection = hardware ? `<section class="hardware-section">
                    <h2>${hardware.title}</h2>
                    <p class="lead-text hardware-intro">${hardware.intro}</p>
                    <div class="hardware-grid session-hardware-grid">
                        ${hardware.items.map((item) => `<article class="hardware-card session-hardware-card">
                            ${renderHardwareImages(item[0], item[1])}
                            <div>
                                <h3>${item[1]}</h3>
                                <p>${item[2]}</p>
                                <p>${item[3]}</p>
                            </div>
                        </article>`).join("")}
                    </div>
                </section>` : `<section class="hardware-section">
                    <h2>Hardware Explanation</h2>
                    <div class="hardware-grid">
                        <article class="hardware-card"><img src="${assetPrefix}assets/images/real/shared/led-polarity.png" alt="LED polarity"><div><h3>LED Pins</h3><p>The positive side is the anode and the negative side is the cathode. Current must flow in the correct direction for the LED to glow.</p></div></article>
                        <article class="hardware-card"><img src="${assetPrefix}assets/images/real/shared/smd-led.jpg" alt="SMD LED"><div><h3>Output Device</h3><p>The LED or buzzer responds when the Arduino output pin sends a signal. This connects code to a real light or sound result.</p></div></article>
                    </div>
                </section>`;
            card.innerHTML = `${header}
                <article class="code-focus">
                    <h2>Code</h2>
                    <div class="code-copy-wrap"><button type="button" class="copy-code-btn">Copy Code</button><pre><code>${escapeHtml(data.code)}</code></pre></div>
                </article>
                <div class="explain-steps">${data.steps.map((step, index) => `<article><h3>${index + 1}. ${step[0]}</h3><p>${step[1]}</p></article>`).join("")}</div>
                ${hardwareSection}`;
        }

        if (currentPage === "elaborate") {
            const data = lessonData.elaborate;
            card.className = "phase-card elaborate";
            card.innerHTML = `${header}<p class="source-note">${data.note}</p>
                <section class="project-gallery-block"><h2>Materials and Components</h2>${renderGallery(data.materials)}</section>
                ${data.projects.map((project) => {
                    const download = project.download ? `<div class="download-panel compact-download"><div><h3>${project.title} Code</h3><p>Download the Arduino code for this build.</p></div><a class="download-btn ${project.download[2] === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${project.download[0]}" download>${project.download[1]}</a></div>` : "";
                    return `<section class="project-gallery-block"><h2>${project.title}</h2>${download}${renderGallery(project.pages)}<article class="craft-card project-working-card"><h2>How It Works</h2><p>${project.working}</p></article></section>`;
                }).join("")}${renderTemplates(data.codes)}`;
        }

        if (currentPage === "evaluate") {
            card.className = "phase-card evaluate";
            const questions = lessonData.evaluate?.questions || [];
            const challenge = lessonData.evaluate?.challenge || "Complete the missing parts based on this session.";
            const challengeCode = lessonData.evaluate?.challengeCode || `const int ledPin = ____;

void setup() {
  pinMode(ledPin, ______);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(____);
  digitalWrite(ledPin, LOW);
  delay(____);
}`;
            const codeAnswers = lessonData.evaluate?.challengeAnswers
                || codeAnswerOverrides[contentKey]
                || codeAnswerOverrides[legacyContentKey]
                || deriveBlankAnswers(challengeCode, lessonData.explain?.code || "");
            const hasCodeBlanks = challengeCode.includes("____");
            card.innerHTML = `${header}
                <form class="test-form" id="sessionTest">
                    <article class="code-challenge-card" data-code-max="5" data-code-solution="${escapeHtml(lessonData.explain?.code || challengeCode)}">
                        <div>
                            <h2>Code Challenge</h2>
                            <p>${challenge}</p>
                            <p class="source-note">Code challenge carries 5 points. ${hasCodeBlanks ? "Fill every blank before submitting the test." : "Review and submit the corrected code."}</p>
                        </div>
                        ${renderCodeInstructions(codeAnswers, hasCodeBlanks)}
                        ${renderInteractiveCodeChallenge(challengeCode, codeAnswers)}
                        <div class="code-challenge-result" aria-live="polite"></div>
                    </article>
                    <h2>Session Test</h2>
                    <p class="source-note">MCQs carry ${questions.length} points. Total score: ${questions.length + 5} points.</p>
                    <div class="test-grid">
                        ${questions.map((question, index) => `<fieldset class="test-question">
                            <legend>${index + 1}. ${question[0]}</legend>
                            ${question[1].map((option, optionIndex) => `<label><input type="radio" name="q${index + 1}" value="${optionIndex}" ${optionIndex === question[2] ? 'data-correct="true"' : ""}> ${option}</label>`).join("")}
                        </fieldset>`).join("")}
                    </div>
                    <div class="test-actions">
                        <button type="submit" class="submit-test">Submit Test</button>
                        <button type="reset" class="reset-test">Reset</button>
                    </div>
                </form>
                <div class="score-modal" id="scoreModal" hidden>
                    <div class="score-modal-card" role="dialog" aria-modal="true" aria-labelledby="scoreText">
                        <p class="phase-label">Test Submitted</p>
                        <strong id="scoreText">Score: 0 / ${questions.length + 5}</strong>
                        <span id="scoreMessage">Review the lesson and try again.</span>
                        <button type="button" id="closeScore">Close</button>
                    </div>
                </div>`;
        }
    };

    renderAll5ePage();
    renderLessonPage();

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (mainNav && mainNav.classList.contains("active")) {
                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    const setActiveLink = () => {
        if (currentPage && currentPage !== "home") {
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.dataset.nav === currentPage);
            });
            return;
        }

        let currentId = "engage";

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 130) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink, { passive: true });

    progressLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.step === currentPage);
    });

    const revealTargets = document.querySelectorAll(
        ".phase-card, .trigger-card, .pdf-frame, .hardware-card, .test-question, .download-panel, .project-working-card"
    );

    if ("IntersectionObserver" in window) {
        revealTargets.forEach((target) => target.classList.add("reveal-item"));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealTargets.forEach((target) => revealObserver.observe(target));
    }

    document.querySelectorAll(".quiz-item").forEach((item) => {
        const buttons = item.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                buttons.forEach((option) => option.classList.remove("selected"));
                button.classList.add("selected");
            });
        });
    });

    document.querySelectorAll(".copy-code-btn").forEach((button) => {
        button.addEventListener("click", async () => {
            const wrapper = button.closest(".code-copy-wrap");
            const code = wrapper ? wrapper.querySelector("code") : null;
            if (!code) return;

            const text = code.innerText;

            try {
                await copyText(text);
                button.textContent = "Copied";
                button.classList.add("copied");
                setTimeout(() => {
                    button.textContent = "Copy Code";
                    button.classList.remove("copied");
                }, 1400);
            } catch (error) {
                button.textContent = "Copy failed";
                setTimeout(() => {
                    button.textContent = "Copy Code";
                }, 1400);
            }
        });
    });

    document.querySelectorAll(".copy-page-code-btn").forEach((button) => {
        button.addEventListener("click", async () => {
            const templateId = button.dataset.codeTemplate;
            const template = templateId ? document.getElementById(templateId) : null;
            if (!template) return;

            const text = template.content ? template.content.textContent.trim() : template.innerHTML.trim();

            try {
                await copyText(text);
                button.textContent = "Copied";
                button.classList.add("copied");
                setTimeout(() => {
                    button.textContent = "Copy Code";
                    button.classList.remove("copied");
                }, 1400);
            } catch (error) {
                button.textContent = "Copy failed";
                setTimeout(() => {
                    button.textContent = "Copy Code";
                }, 1400);
            }
        });
    });

    const sessionTest = document.querySelector("#sessionTest");
    if (sessionTest) {
        const scoreModal = document.querySelector("#scoreModal");
        const closeScore = document.querySelector("#closeScore");
        const scoreText = document.querySelector("#scoreText");
        const scoreMessage = document.querySelector("#scoreMessage");
        const totalQuestions = sessionTest.querySelectorAll(".test-question").length;
        const codeMax = 5;
        const totalScore = totalQuestions + codeMax;

        const scoreCodeChallenge = () => {
            const codeCard = sessionTest.querySelector(".code-challenge-card");
            if (!codeCard) return codeMax;

            const blanks = codeCard.querySelectorAll(".code-blank-input");
            const result = codeCard.querySelector(".code-challenge-result");
            codeCard.classList.remove("answered-correct", "answered-wrong");

            if (blanks.length) {
                let correct = 0;

                blanks.forEach((blank) => {
                    const expected = normalizeCodeAnswer(blank.dataset.codeAnswer || "");
                    const actual = normalizeCodeAnswer(blank.value);
                    const isCorrect = expected && actual === expected;
                    blank.classList.toggle("correct", isCorrect);
                    blank.classList.toggle("wrong", !isCorrect);
                    if (isCorrect) correct += 1;
                });

                const points = blanks.length ? Math.round((correct / blanks.length) * codeMax * 100) / 100 : 0;
                codeCard.classList.add(correct === blanks.length ? "answered-correct" : "answered-wrong");
                if (result) result.textContent = `Code score: ${points} / ${codeMax} (${correct} of ${blanks.length} blanks correct)`;
                return points;
            }

            const textarea = codeCard.querySelector("[data-full-code-answer]");
            if (!textarea) {
                if (result) result.textContent = `Code score: ${codeMax} / ${codeMax}`;
                codeCard.classList.add("answered-correct");
                return codeMax;
            }

            const expectedCode = normalizeCodeAnswer(codeCard.dataset.codeSolution || "");
            const actualCode = normalizeCodeAnswer(textarea.value);
            const isCorrect = expectedCode && actualCode === expectedCode;
            codeCard.classList.add(isCorrect ? "answered-correct" : "answered-wrong");
            if (result) result.textContent = `Code score: ${isCorrect ? codeMax : 0} / ${codeMax}`;
            return isCorrect ? codeMax : 0;
        };

        sessionTest.addEventListener("submit", (event) => {
            event.preventDefault();

            let mcqScore = 0;
            const questions = sessionTest.querySelectorAll(".test-question");

            questions.forEach((question) => {
                const selected = question.querySelector("input[type='radio']:checked");
                question.classList.remove("answered-correct", "answered-wrong");

                if (selected && selected.dataset.correct === "true") {
                    mcqScore += 1;
                    question.classList.add("answered-correct");
                } else {
                    question.classList.add("answered-wrong");
                }
            });

            const codeScore = scoreCodeChallenge();
            const score = Math.round((mcqScore + codeScore) * 100) / 100;

            scoreText.textContent = `Score: ${score} / ${totalScore}`;

            if (score >= totalScore * 0.86) {
                scoreMessage.textContent = `Excellent. Code: ${codeScore} / ${codeMax}, MCQs: ${mcqScore} / ${totalQuestions}.`;
            } else if (score >= totalScore * 0.6) {
                scoreMessage.textContent = `Good work. Code: ${codeScore} / ${codeMax}, MCQs: ${mcqScore} / ${totalQuestions}.`;
            } else {
                scoreMessage.textContent = `Review the code challenge and MCQs. Code: ${codeScore} / ${codeMax}, MCQs: ${mcqScore} / ${totalQuestions}.`;
            }

            scoreModal.hidden = false;
            closeScore.focus();

            // patched: report the quiz result to the hosting Report Card app
            // (same-origin iframe parent) so it can store per-student scores.
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: "su-lms-quiz-result",
                    year,
                    grade,
                    session,
                    score,
                    total: totalScore,
                    mcqScore,
                    mcqTotal: totalQuestions,
                    codeScore,
                    codeMax,
                }, window.location.origin);
            }
        });

        sessionTest.addEventListener("reset", () => {
            sessionTest.querySelectorAll(".test-question").forEach((question) => {
                question.classList.remove("answered-correct", "answered-wrong");
            });
            const codeCard = sessionTest.querySelector(".code-challenge-card");
            if (codeCard) {
                codeCard.classList.remove("answered-correct", "answered-wrong");
                codeCard.querySelectorAll(".code-blank-input").forEach((blank) => {
                    blank.classList.remove("correct", "wrong");
                });
                const result = codeCard.querySelector(".code-challenge-result");
                if (result) result.textContent = "";
            }
            scoreModal.hidden = true;
        });

        closeScore.addEventListener("click", () => {
            scoreModal.hidden = true;
        });

        scoreModal.addEventListener("click", (event) => {
            if (event.target === scoreModal) {
                scoreModal.hidden = true;
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !scoreModal.hidden) {
                scoreModal.hidden = true;
            }
        });
    }
});


