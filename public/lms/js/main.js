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
    // patched: the report-card app assigns LMS languages per school/single-user
    // account. English is mandatory; Hindi is exposed only when "hi" is in
    // ?languages=. Persist globally so internal LMS links can omit the param.
    const languagesStoreKey = "su-lms-allowed-languages";
    const languagesParam = params.get("languages");
    if (languagesParam !== null) {
        try { sessionStorage.setItem(languagesStoreKey, languagesParam); } catch (e) { /* storage unavailable */ }
    }
    const allowedLanguages = () => {
        let stored = null;
        try { stored = sessionStorage.getItem(languagesStoreKey); } catch (e) { /* storage unavailable */ }
        // No assignment filter means a direct standalone LMS visit and keeps
        // the original English/Hindi behavior.
        const raw = stored !== null ? stored : languagesParam;
        return raw === null ? ["en", "hi"] : raw.split(",").filter(Boolean);
    };
    const hindiAllowed = allowedLanguages().includes("hi");
    // patched: Year 2 program lessons carry no ?year= param; their quiz keys
    // use the "year2" pseudo-year so they can't collide with Level 1 (both
    // programs have Classes 6 and 7).
    const quizYear = mode === "year2" ? "year2" : year;
    const homePanel = params.get("panel") || "";
    const contentKey = `${year}-${grade}-${session}`;
    const legacyContentKey = `${grade}-${session}`;
    const lessonData = window.LMS_CONTENT ? (window.LMS_CONTENT[contentKey] || window.LMS_CONTENT[legacyContentKey]) : null;
    const query = `?year=${year}&grade=${grade}&session=${session}`;
    const assetPrefix = "https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/"; // patched: assets stay in the upstream GitHub repo
    // patched: the report-card app restricts which classes a student sees via a
    // ?grades=4,5 param. Persisted per level in sessionStorage so the filter
    // survives navigating into a lesson and back (those links drop the param).
    const gradesStoreKey = (yearValue) => `su-lms-allowed-grades-${yearValue}`;
    if (params.get("grades") !== null) {
        try { sessionStorage.setItem(gradesStoreKey(year), params.get("grades")); } catch (e) { /* storage unavailable */ }
    }
    const allowedGradesFor = (yearValue) => {
        let stored = null;
        try { stored = sessionStorage.getItem(gradesStoreKey(yearValue)); } catch (e) { /* storage unavailable */ }
        return (stored || "").split(",").filter(Boolean);
    };
    // patched: the report-card app can further restrict sessions and 5E phase
    // groups via a ?sessions= param — JSON [{grade, session, groups}] where
    // groups are "core" (engage/explore/explain) and "extend"
    // (elaborate/evaluate). A grade with no entries is unrestricted; an empty
    // param clears any earlier restriction. Persisted like the grades filter.
    const sessionsStoreKey = (yearValue) => `su-lms-allowed-sessions-${yearValue}`;
    if (params.get("sessions") !== null) {
        try { sessionStorage.setItem(sessionsStoreKey(year), params.get("sessions")); } catch (e) { /* storage unavailable */ }
    }
    // patched: the report-card app locks the LMS to the opened level via a
    // ?years= param. Stored globally (every entry URL sends it) so backing
    // out to the level picker can't reach levels not given to the class.
    // patched: the report-card app can rename classes for a school via a
    // ?gradeNames= param — JSON {"6": "Class 5"} — shown on the class cards
    // and session headers. Cosmetic only: grade values in URLs and quiz
    // results keep the real grade. Persisted like the grades filter.
    const gradeNamesStoreKey = (yearValue) => `su-lms-grade-names-${yearValue}`;
    if (params.get("gradeNames") !== null) {
        try { sessionStorage.setItem(gradeNamesStoreKey(year), params.get("gradeNames")); } catch (e) { /* storage unavailable */ }
    }
    const gradeNameFor = (yearValue, gradeValue) => {
        let raw = null;
        try { raw = sessionStorage.getItem(gradeNamesStoreKey(yearValue)); } catch (e) { /* storage unavailable */ }
        if (raw) {
            try {
                const map = JSON.parse(raw);
                if (map && typeof map[gradeValue] === "string" && map[gradeValue]) return map[gradeValue];
            } catch (e) { /* malformed param */ }
        }
        return `Class ${gradeValue}`;
    };
    const yearsStoreKey = "su-lms-allowed-years";
    if (params.get("years") !== null) {
        try { sessionStorage.setItem(yearsStoreKey, params.get("years")); } catch (e) { /* storage unavailable */ }
    }
    const allowedYears = () => {
        let stored = null;
        try { stored = sessionStorage.getItem(yearsStoreKey); } catch (e) { /* storage unavailable */ }
        return (stored || "").split(",").filter(Boolean);
    };
    const phaseGroupPhases = {
        core: ["engage", "explore", "explain"],
        extend: ["elaborate", "evaluate"]
    };
    const allowedSessionsFor = (yearValue, gradeValue) => {
        let raw = null;
        try { raw = sessionStorage.getItem(sessionsStoreKey(yearValue)); } catch (e) { /* storage unavailable */ }
        if (!raw) return null; // unrestricted
        let list = null;
        try { list = JSON.parse(raw); } catch (e) { return null; }
        if (!Array.isArray(list)) return null;
        const map = new Map();
        list.forEach((row) => {
            if (row && String(row.grade) === String(gradeValue)) {
                map.set(String(row.session), row.groups || []);
            }
        });
        return map.size ? map : null;
    };
    const allowedPhasesFor = (yearValue, gradeValue, sessionValue) => {
        const map = allowedSessionsFor(yearValue, gradeValue);
        if (!map) return null; // unrestricted
        const groups = map.get(String(sessionValue));
        if (!groups) return []; // session not assigned
        let phases = [];
        Object.keys(phaseGroupPhases).forEach((groupId) => {
            if (groups.includes(groupId)) phases = phases.concat(phaseGroupPhases[groupId]);
        });
        return phases;
    };
    // Phase allowed for the lesson currently open (all5e page params).
    const isPhaseAllowed = (phase) => {
        const allowed = allowedPhasesFor(year, grade, session);
        return !allowed || allowed.includes(phase);
    };
    const headerBackToSessions = document.querySelector("[data-header-back-to-sessions]");
    if (headerBackToSessions && currentPage === "all-5e") {
        headerBackToSessions.href = `../index.html?panel=sessionSelect&year=${encodeURIComponent(year)}&grade=${encodeURIComponent(grade)}`;
    }
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
    const translatablePhases = new Set(["engage", "explain", "evaluate"]);
    const hindiTranslations = window.LMS_HINDI_TRANSLATIONS || {};
    const hindiTranslationOverrides = {
        "Assessment": "मूल्यांकन",
        "Curiosity Kickoff": "जिज्ञासा की शुरुआत",
        "Real-Life Curiosity Kickoff": "वास्तविक जीवन से जिज्ञासा की शुरुआत",
        "Deep Learning": "गहराई से समझें",
        "Hardware Explanation": "हार्डवेयर की व्याख्या"
    };
    const phaseUi = {
        en: {
            engage: "Engage",
            explore: "Explore",
            explain: "Explain",
            elaborate: "Elaborate",
            evaluate: "Evaluate",
            switchLanguage: "Change this phase to Hindi",
            languageButton: "हिंदी",
            next: "Next",
            finishSession: "Finish Session",
            triggerQuestion: "Trigger Question:",
            objectives: "Objectives",
            code: "Code",
            copyCode: "Copy Code",
            copied: "Copied",
            copyFailed: "Copy failed",
            hardwareExplanation: "Hardware Explanation",
            codeChallenge: "Code Challenge",
            codeChallengePoints: "Code challenge carries 5 points.",
            fillEveryBlank: "Fill every blank before submitting the test.",
            reviewCorrectedCode: "Review and submit the corrected code.",
            sessionTest: "Session Test",
            mcqPoints: "MCQs carry {count} points. Total score: {total} points.",
            submitTest: "Submit Test",
            reset: "Reset",
            testSubmitted: "Test Submitted",
            score: "Score",
            reviewLesson: "Review the lesson and try again.",
            close: "Close",
            howCompleteCode: "How to Complete the Code",
            readTarget: "Read the target behavior first.",
            editCode: "Edit the code so the setup and loop match the session project.",
            submitAfterCheck: "Submit the test after checking the corrected code and MCQs.",
            howFillBlanks: "How to Fill the Code Blanks",
            fillOnlyMissing: "Fill each blank with only the missing value or keyword. Do not type extra brackets, semicolons, or full lines.",
            pinBlank: "Pin blanks need the Arduino pin number used in this session.",
            modeBlank: "Mode/state blanks need Arduino words like OUTPUT, INPUT, HIGH, or LOW.",
            delayBlank: "Delay blanks need the timing number in milliseconds.",
            blank: "Blank",
            typeCorrectedCode: "Type the corrected code",
            codeBlank: "Code blank",
            numericAnswer: "Enter the correct pin number or delay value used by this session.",
            outputAnswer: "Enter OUTPUT because this pin sends a signal to a device.",
            inputAnswer: "Enter INPUT because this pin reads a sensor or switch signal.",
            pullupAnswer: "Enter INPUT_PULLUP when the switch input uses Arduino's internal pull-up mode.",
            highAnswer: "Enter HIGH to turn the output ON.",
            lowAnswer: "Enter LOW to turn the output OFF.",
            genericAnswer: "Enter the missing Arduino keyword, value, or constant that completes the program.",
            codeScore: "Code score: {points} / {max} ({correct} of {count} blanks correct)",
            excellent: "Excellent. Code: {code} / {max}, MCQs: {mcq} / {questions}.",
            goodWork: "Good work. Code: {code} / {max}, MCQs: {mcq} / {questions}.",
            reviewChallenge: "Review the code challenge and MCQs. Code: {code} / {max}, MCQs: {mcq} / {questions}."
        },
        hi: {
            engage: "जुड़ें",
            explore: "अन्वेषण",
            explain: "समझें",
            elaborate: "विस्तार",
            evaluate: "मूल्यांकन",
            switchLanguage: "इस चरण को अंग्रेज़ी में बदलें",
            languageButton: "English",
            next: "अगला",
            finishSession: "सत्र पूरा करें",
            triggerQuestion: "सोचने का प्रश्न:",
            objectives: "सीखने के उद्देश्य",
            code: "कोड",
            copyCode: "कोड कॉपी करें",
            copied: "कॉपी हो गया",
            copyFailed: "कॉपी नहीं हुआ",
            hardwareExplanation: "हार्डवेयर की व्याख्या",
            codeChallenge: "कोड चुनौती",
            codeChallengePoints: "कोड चुनौती के 5 अंक हैं।",
            fillEveryBlank: "टेस्ट जमा करने से पहले सभी रिक्त स्थान भरें।",
            reviewCorrectedCode: "सही किए गए कोड की जाँच करके उसे जमा करें।",
            sessionTest: "सत्र परीक्षा",
            mcqPoints: "बहुविकल्पीय प्रश्नों के {count} अंक हैं। कुल अंक: {total}।",
            submitTest: "टेस्ट जमा करें",
            reset: "दोबारा शुरू करें",
            testSubmitted: "टेस्ट जमा हो गया",
            score: "अंक",
            reviewLesson: "पाठ दोबारा पढ़ें और फिर प्रयास करें।",
            close: "बंद करें",
            howCompleteCode: "कोड कैसे पूरा करें",
            readTarget: "सबसे पहले अपेक्षित कार्यप्रणाली को ध्यान से पढ़ें।",
            editCode: "setup और loop को सत्र के प्रोजेक्ट के अनुसार बनाने के लिए कोड संपादित करें।",
            submitAfterCheck: "सही किया गया कोड और बहुविकल्पीय प्रश्न जाँचने के बाद टेस्ट जमा करें।",
            howFillBlanks: "कोड के रिक्त स्थान कैसे भरें",
            fillOnlyMissing: "हर रिक्त स्थान में केवल छूटा हुआ मान या कीवर्ड लिखें। अतिरिक्त ब्रैकेट, सेमीकोलन या पूरी पंक्ति न लिखें।",
            pinBlank: "पिन वाले रिक्त स्थान में इस सत्र में उपयोग किया गया Arduino पिन नंबर लिखें।",
            modeBlank: "मोड या स्थिति वाले रिक्त स्थान में OUTPUT, INPUT, HIGH या LOW जैसे Arduino शब्द लिखें।",
            delayBlank: "delay वाले रिक्त स्थान में मिलीसेकंड का समय लिखें।",
            blank: "रिक्त स्थान",
            typeCorrectedCode: "सही किया गया कोड लिखें",
            codeBlank: "कोड रिक्त स्थान",
            numericAnswer: "इस सत्र में उपयोग किया गया सही पिन नंबर या delay मान लिखें।",
            outputAnswer: "OUTPUT लिखें क्योंकि यह पिन किसी उपकरण को सिग्नल भेजता है।",
            inputAnswer: "INPUT लिखें क्योंकि यह पिन सेंसर या स्विच का सिग्नल पढ़ता है।",
            pullupAnswer: "जब स्विच इनपुट Arduino के अंदरूनी pull-up मोड का उपयोग करे तब INPUT_PULLUP लिखें।",
            highAnswer: "आउटपुट को ON करने के लिए HIGH लिखें।",
            lowAnswer: "आउटपुट को OFF करने के लिए LOW लिखें।",
            genericAnswer: "प्रोग्राम पूरा करने वाला छूटा हुआ Arduino कीवर्ड, मान या स्थिरांक लिखें।",
            codeScore: "कोड अंक: {points} / {max} ({count} में से {correct} रिक्त स्थान सही)",
            excellent: "बहुत बढ़िया। कोड: {code} / {max}, बहुविकल्पीय प्रश्न: {mcq} / {questions}।",
            goodWork: "अच्छा प्रयास। कोड: {code} / {max}, बहुविकल्पीय प्रश्न: {mcq} / {questions}।",
            reviewChallenge: "कोड चुनौती और बहुविकल्पीय प्रश्न दोबारा देखें। कोड: {code} / {max}, बहुविकल्पीय प्रश्न: {mcq} / {questions}।"
        }
    };
    const readPhaseLanguage = (phase) => {
        if (!hindiAllowed) return "en";
        try {
            return localStorage.getItem(`lms-phase-language-${phase}`) === "hi" ? "hi" : "en";
        } catch (error) {
            return "en";
        }
    };
    const phaseLanguages = {
        engage: readPhaseLanguage("engage"),
        explain: readPhaseLanguage("explain"),
        evaluate: readPhaseLanguage("evaluate")
    };
    const phaseLanguage = (phase) => translatablePhases.has(phase) ? phaseLanguages[phase] : "en";
    const translateText = (value, language) => {
        if (language !== "hi" || typeof value !== "string") return value;
        const translated = hindiTranslationOverrides[value.trim()]
            || hindiTranslations[value.trim()]
            || value;
        return translated
            .replaceAll("लेवल 1 क्रिएटिव ऑटोमेशन", "स्तर 1 रचनात्मक स्वचालन")
            .replaceAll("लेवल 2 सनसनीखेज सेंसर", "स्तर 2 संवेदी सेंसर");
    };
    const uiText = (language, key, replacements = {}) => {
        const source = phaseUi[language]?.[key] || phaseUi.en[key] || key;
        return Object.entries(replacements).reduce(
            (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
            source
        );
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
        if (sessionValue === "basics") {
            const basics = window.LEVEL2_BASICS_CONTENT;
            return yearValue === "2" && basics ? {
                session: basics.session,
                topic: basics.topic,
                cover: basics.cover,
                isBasicsSession: true
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
        const allowedGrades = allowedGradesFor(selectedHomeYear);
        const classes = (yearClasses[selectedHomeYear] || yearClasses["1"])
            .filter((item) => !allowedGrades.length || allowedGrades.includes(item[0]));
        const classButtons = document.querySelectorAll(".selection-card[data-grade]");
        classButtons.forEach((classButton, index) => {
            const item = classes[index];
            classButton.style.display = item ? "" : "none";
            if (!item) return;
            classButton.dataset.grade = item[0];
            const number = classButton.querySelector("span");
            const title = classButton.querySelector("strong");
            const tier = classButton.querySelector("p");
            // patched: per-school class rename — card badge shows the renamed
            // class's number when the override contains one ("Class 5" → "5").
            const renamed = gradeNameFor(selectedHomeYear, item[0]);
            if (number) number.textContent = (renamed.match(/\d+/) || [item[0]])[0];
            if (title) title.textContent = renamed;
            if (tier) tier.textContent = item[2];
        });
        document.querySelectorAll("[data-selected-year-label]").forEach((label) => {
            label.textContent = levelLabels[selectedHomeYear] || levelLabels["1"];
        });
    };

    const refreshSessionCards = () => {
        const label = document.querySelector("#selectedClassLabel");
        if (label) label.textContent = `${levelLabels[selectedHomeYear] || levelLabels["1"]} | ${gradeNameFor(selectedHomeYear, selectedHomeGrade)}`; // patched: per-school class rename
        const allowedSessions = allowedSessionsFor(selectedHomeYear, selectedHomeGrade);
        document.querySelectorAll(".session-card.available").forEach((card) => {
            const sessionValue = card.dataset.session || "1";
            const isBasicsCard = sessionValue === "basics";
            card.hidden = isBasicsCard && selectedHomeYear !== "2";
            if (card.hidden) return;
            card.style.display = allowedSessions && !allowedSessions.has(sessionValue) ? "none" : "";
            const cardLesson = getHomeLesson(selectedHomeYear, selectedHomeGrade, sessionValue);
            card.setAttribute("href", "#");
            card.dataset.targetUrl = sessionValue === "0"
                ? `pages/all5e.html?mode=introduction&year=${selectedHomeYear}&grade=${selectedHomeGrade}`
                : (isBasicsCard
                    ? `pages/all5e.html?mode=basics&year=${selectedHomeYear}&grade=${selectedHomeGrade}`
                    : `pages/all5e.html?year=${selectedHomeYear}&grade=${selectedHomeGrade}&session=${sessionValue}`);
            if (cardLesson) {
                const image = card.querySelector("img");
                const sessionLabel = card.querySelector("span");
                const title = card.querySelector("strong");
                const status = card.querySelector("p");
                if (image) {
                    image.src = `${assetPrefix}${cardLesson.cover}`; // patched: covers live on the CDN
                    image.alt = `${cardLesson.session} ${cardLesson.topic} cover`;
                }
                if (sessionLabel) sessionLabel.textContent = cardLesson.session;
                if (title) title.textContent = cardLesson.topic;
                if (status) {
                    const explorePending = !cardLesson.explore?.pages?.length;
                    const elaboratePending = cardLesson.elaborate?.projects?.some((project) => !project.pages?.length);
                    status.textContent = cardLesson.isCommonSession
                        ? "Common session ready"
                        : (cardLesson.isBasicsSession
                            ? "3 Explore topics ready"
                            : (elaboratePending ? "Elaborate PDF pending" : (explorePending ? "Explore PDF pending" : "5E lesson ready")));
                }
            }
        });
    };

    document.querySelectorAll("[data-show-panel]").forEach((button) => {
        button.addEventListener("click", () => showHomePanel(button.dataset.showPanel));
    });

    document.querySelectorAll("[data-year]").forEach((button) => {
        const lockedYears = allowedYears();
        const yearAllowed = !lockedYears.length || lockedYears.includes(button.dataset.year || "");
        if (!yearAllowed) button.style.display = "none";
        button.addEventListener("click", () => {
            if (!yearAllowed) return;
            selectedHomeYear = button.dataset.year || "1";
            refreshClassCards();
            showHomePanel("classSelect");
        });
    });

    // patched: the BLIX and Year 2 program cards follow the same years lock
    // as the level cards, so a class locked to one course can't wander into
    // the others from the program picker.
    document.querySelectorAll(".blix-program-card, .year2-program-card").forEach((card) => {
        const programId = card.classList.contains("year2-program-card") ? "year2" : "blix";
        const lockedYears = allowedYears();
        if (lockedYears.length && !lockedYears.includes(programId)) card.style.display = "none";
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
                    modalImage.src = `${assetPrefix}${selectedLesson.cover}`; // patched: covers live on the CDN
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

    const formatCode = (value) => typeof window.formatArduinoCode === "function"
        ? window.formatArduinoCode(value)
        : String(value ?? "");

    const iconMarkup = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

    const refreshIcons = () => {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons({
                attrs: {
                    width: 18,
                    height: 18,
                    "stroke-width": 2.25
                }
            });
        }
    };

    const setButtonLabel = (button, label) => {
        const labelNode = button.querySelector("[data-button-label]");
        if (labelNode) {
            labelNode.textContent = label;
        } else {
            button.textContent = label;
        }
    };

    const renderAll5ePage = () => {
        if (currentPage !== "all-5e") return;
        // patched: hard guards — lesson pages stay reachable via browser
        // history even when their cards are hidden, so bounce anything not
        // given to the class back to the pickers.
        if (mode === "year2") {
            // Year 2 program filters live under the "year2" pseudo-year (set
            // by pages/year2.html); the ?year= param here defaults to "1".
            const y2Grades = allowedGradesFor("year2");
            if (y2Grades.length && !y2Grades.includes(grade)) {
                window.location.replace("year2.html");
                return;
            }
            const y2Sessions = allowedSessionsFor("year2", grade);
            if (y2Sessions && !y2Sessions.has(String(session))) {
                window.location.replace(`year2.html?grade=${grade}`);
                return;
            }
            return;
        }
        const lockedYears = allowedYears();
        if (lockedYears.length && !lockedYears.includes(year)) {
            window.location.replace("../index.html");
            return;
        }
        const lockedGrades = allowedGradesFor(year);
        if (lockedGrades.length && !lockedGrades.includes(grade)) {
            window.location.replace(`../index.html?panel=classSelect&year=${year}`);
            return;
        }
        if (mode === "dependencies" || mode === "year2") return;
        const guardAllowed = allowedPhasesFor(year, grade, mode === "introduction" ? "0" : (mode === "basics" ? "basics" : session));
        if (guardAllowed && !guardAllowed.length) {
            window.location.replace(`../index.html?panel=sessionSelect&year=${year}&grade=${grade}`);
            return;
        }
        if (mode === "introduction" || mode === "basics") return;

        if (!lessonData) return;

        const label = document.querySelector("[data-all5e-label]");
        const cover = document.querySelector("[data-all5e-cover]");
        const sessionText = document.querySelector("[data-all5e-session]");
        const title = document.querySelector("[data-all5e-title]");
        const phaseButtons = document.querySelectorAll("[data-phase]");
        const phaseCards = document.querySelectorAll("[data-all5e-phase]");
        const contentCard = document.querySelector("#all5eContent");
        const fullscreenFrame = document.querySelector(".all5e-layout") || contentCard;
        const phaseNav = document.querySelector(".all5e-layout > .common-dialogue-nav");
        const enterFullscreen = document.querySelector("#enter5eFullscreen");
        const exitFullscreen = document.querySelector("#exit5eFullscreen");
        const backToSessions = document.querySelector("[data-back-to-sessions]");
        const phaseOrder = ["engage", "explore", "explain", "elaborate", "evaluate"];

        const sessionTitle = `${lessonData.year || levelLabels[year] || `Level ${year}`} | ${lessonData.grade} | ${lessonData.session}`;
        document.title = `${sessionTitle} | Engage`;
        if (label) label.textContent = `${lessonData.year || levelLabels[year] || `Level ${year}`} ${lessonData.grade} ${lessonData.tier}`;
        if (cover) {
            cover.src = `${assetPrefix}${lessonData.cover}`;
            cover.alt = `${lessonData.session} ${lessonData.topic} cover`;
        }
        if (sessionText) sessionText.textContent = `${lessonData.session} | ${lessonData.grade}`;
        if (title) title.textContent = lessonData.topic;
        if (backToSessions) backToSessions.href = `../index.html?panel=sessionSelect&year=${year}&grade=${grade}`;
        phaseButtons.forEach((button) => {
            if (!isPhaseAllowed(button.dataset.phase)) button.style.display = "none";
        });
        phaseCards.forEach((card) => renderPhaseCard(card.dataset.all5ePhase, card));

        let activePhase = "engage";
        const visitedPhases = new Set(["engage"]);

        const showPhase = (selectedPhase, immediate = false) => {
            if (!phaseOrder.includes(selectedPhase)) return;
            if (!isPhaseAllowed(selectedPhase)) {
                // Redirect to the nearest allowed phase (forward, then back).
                const startIndex = phaseOrder.indexOf(selectedPhase);
                selectedPhase = phaseOrder.slice(startIndex + 1).find(isPhaseAllowed)
                    || phaseOrder.slice(0, startIndex).reverse().find(isPhaseAllowed);
                if (!selectedPhase) return;
            }
            if (selectedPhase === activePhase && !immediate) return;

            activePhase = selectedPhase;
            visitedPhases.add(selectedPhase);
            document.title = `${sessionTitle} | ${uiText(phaseLanguage(selectedPhase), selectedPhase)}`;
            phaseButtons.forEach((item) => {
                const isActive = item.dataset.phase === selectedPhase;
                item.classList.toggle("active", isActive);
                item.classList.toggle("visited", visitedPhases.has(item.dataset.phase));
                if (isActive) {
                    item.setAttribute("aria-current", "step");
                } else {
                    item.removeAttribute("aria-current");
                }
            });
            phaseCards.forEach((card) => card.classList.toggle("active", card.dataset.all5ePhase === selectedPhase));
            const activeCard = document.querySelector(`[data-all5e-phase="${selectedPhase}"]`);
            if (activeCard) activeCard.scrollTop = 0;
            if (!immediate) {
                const scrollTarget = window.matchMedia("(max-width: 980px)").matches ? phaseNav : contentCard;
                const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
                window.requestAnimationFrame(() => {
                    scrollTarget?.scrollIntoView({ block: "start", behavior });
                });
            }
        };

        phaseButtons.forEach((button) => {
            button.addEventListener("click", () => showPhase(button.dataset.phase));
        });

        if (contentCard) {
            contentCard.addEventListener("click", (event) => {
                const nextButton = event.target.closest("[data-next-e]");
                if (nextButton) showPhase(nextButton.dataset.nextE);
            });
        }

        showPhase("engage", true);

        if (enterFullscreen && fullscreenFrame) {
            enterFullscreen.addEventListener("click", async () => {
                if (document.fullscreenElement) return;
                try {
                    if (fullscreenFrame.requestFullscreen) await fullscreenFrame.requestFullscreen();
                } catch (_error) {
                    // Embedded LMS hosts may reject native fullscreen; CSS mode remains available.
                }
                fullscreenFrame.classList.add("fullscreen-mode");
                document.body.classList.add("lesson-fullscreen-active");
            });
        }

        if (exitFullscreen && fullscreenFrame) {
            exitFullscreen.addEventListener("click", async () => {
                try {
                    if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
                } catch (_error) {
                    // Always clear the CSS fallback even if the browser rejects the request.
                }
                fullscreenFrame.classList.remove("fullscreen-mode");
                document.body.classList.remove("lesson-fullscreen-active");
            });
        }

        document.addEventListener("fullscreenchange", () => {
            if (fullscreenFrame) {
                const active = document.fullscreenElement === fullscreenFrame;
                fullscreenFrame.classList.toggle("fullscreen-mode", active);
                document.body.classList.toggle("lesson-fullscreen-active", active);
            }
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

    const mediaLoader = (label) => `<div class="media-loader" role="status" aria-live="polite">
        <span class="media-spinner" aria-hidden="true"></span>
        <span data-media-status>${label}</span>
    </div>`;

    const loadingImage = (src, alt, stageClass = "") => `<div class="media-stage is-loading ${stageClass}">
        ${mediaLoader("Loading image")}
        <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
    </div>`;

    const pageCard = (page) => {
        const [src, title, caption, codeTemplate, pageType] = page;
        const copyButton = codeTemplate
            ? `<button type="button" class="copy-page-code-btn" data-code-template="${codeTemplate}">${iconMarkup("copy")}<span data-button-label>Copy Code</span></button>`
            : "";
        const isPdf = pageType === "pdf" || String(src).toLowerCase().endsWith(".pdf");
        const media = isPdf
            ? `<div class="media-stage pdf-media-stage is-loading">
                ${mediaLoader("Loading PDF")}
                <iframe class="embedded-pdf" src="${assetPrefix}${src}#view=FitH" title="${title}" loading="lazy"></iframe>
            </div>`
            : loadingImage(`${assetPrefix}${src}`, title, "pdf-media-stage");
        return `<article class="pdf-frame${codeTemplate ? "" : " feature-page"}">
            ${copyButton}
            ${media}
            <div class="pdf-caption"><strong>${title}</strong><span>${caption}</span></div>
        </article>`;
    };

    const renderTemplates = (codes = {}) => Object.entries(codes)
        .map(([id, code]) => `<template id="${id}">${escapeHtml(formatCode(code))}</template>`)
        .join("");

    const renderGallery = (pages = []) => `<div class="pdf-showcase elaborate-pages scroll-gallery">${pages.map(pageCard).join("")}</div>`;

    const renderHardwareImages = (images, title) => {
        const list = Array.isArray(images) ? images : [images];
        return `<div class="hardware-image-stack">
            ${list.filter(Boolean).map((image) => loadingImage(`${assetPrefix}${image}`, title, "hardware-media-stage")).join("")}
        </div>`;
    };

    const initializeMediaLoading = () => {
        document.querySelectorAll(".media-stage").forEach((stage) => {
            const media = stage.querySelector("img, iframe");
            const status = stage.querySelector("[data-media-status]");
            if (!media || stage.dataset.mediaReady === "true") return;

            stage.dataset.mediaReady = "true";
            const finish = () => {
                stage.classList.remove("is-loading", "is-error");
                stage.classList.add("is-loaded");
            };
            const fail = () => {
                stage.classList.remove("is-loading", "is-loaded");
                stage.classList.add("is-error");
                if (status) status.textContent = "Media could not be loaded";
            };

            media.addEventListener("load", finish, { once: true });
            media.addEventListener("error", fail, { once: true });

            if (media instanceof HTMLImageElement && media.complete) {
                if (media.naturalWidth > 0) {
                    finish();
                } else {
                    fail();
                }
            }
        });
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

    const arrangeAssessmentQuestions = (questions = []) => {
        const seed = `${year}-${grade}-${session}`.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
        return questions.map((question, index) => {
            const options = Array.isArray(question[1]) ? [...question[1]] : [];
            const correctIndex = Number(question[2]);
            if (options.length < 2 || !Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= options.length) return question;
            const shift = (seed + index) % options.length;
            const arrangedOptions = options.slice(shift).concat(options.slice(0, shift));
            const arrangedCorrectIndex = (correctIndex - shift + options.length) % options.length;
            return [question[0], arrangedOptions, arrangedCorrectIndex];
        });
    };

    const renderInteractiveCodeChallenge = (challengeCode = "", answers = [], language = "en") => {
        const formattedChallenge = formatCode(challengeCode);
        const escapedParts = formattedChallenge.split(/_{4,}/).map(escapeHtml);
        if (escapedParts.length === 1) {
            return `<div class="code-entry-panel" data-code-challenge="full">
                <label for="fullCodeAnswer">${uiText(language, "typeCorrectedCode")}</label>
                <textarea id="fullCodeAnswer" class="code-textarea" data-full-code-answer rows="10" spellcheck="false">${escapeHtml(formattedChallenge)}</textarea>
            </div>`;
        }

        return `<pre class="interactive-code"><code>${escapedParts.map((part, index) => {
            const input = index < escapedParts.length - 1
                ? `<input class="code-blank-input" name="codeBlank${index + 1}" aria-label="${uiText(language, "codeBlank")} ${index + 1}" data-code-answer="${escapeHtml(answers[index] || "")}" autocomplete="off" spellcheck="false">`
                : "";
            return `${part}${input}`;
        }).join("")}</code></pre>`;
    };

    const describeCodeAnswer = (answer = "", language = "en") => {
        const normalized = normalizeCodeAnswer(answer);
        if (/^\d+$/.test(normalized)) return uiText(language, "numericAnswer");
        if (normalized === "OUTPUT") return uiText(language, "outputAnswer");
        if (normalized === "INPUT") return uiText(language, "inputAnswer");
        if (normalized === "INPUT_PULLUP") return uiText(language, "pullupAnswer");
        if (normalized === "HIGH") return uiText(language, "highAnswer");
        if (normalized === "LOW") return uiText(language, "lowAnswer");
        return uiText(language, "genericAnswer");
    };

    const renderCodeInstructions = (answers = [], hasCodeBlanks = true, language = "en") => {
        if (!hasCodeBlanks) {
            return `<section class="code-instruction-panel">
                <h3>${uiText(language, "howCompleteCode")}</h3>
                <ul>
                    <li>${uiText(language, "readTarget")}</li>
                    <li>${uiText(language, "editCode")}</li>
                    <li>${uiText(language, "submitAfterCheck")}</li>
                </ul>
            </section>`;
        }

        return `<section class="code-instruction-panel">
            <h3>${uiText(language, "howFillBlanks")}</h3>
            <ul>
                <li>${uiText(language, "fillOnlyMissing")}</li>
                <li>${uiText(language, "pinBlank")}</li>
                <li>${uiText(language, "modeBlank")}</li>
                <li>${uiText(language, "delayBlank")}</li>
            </ul>
            <div class="blank-guide-grid">
                ${answers.map((answer, index) => `<article>
                    <strong>${uiText(language, "blank")} ${index + 1}</strong>
                    <span>${describeCodeAnswer(answer, language)}</span>
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
        const language = phaseLanguage(phase);
        const tr = (value) => translateText(value, language);
        const phaseTitle = uiText(language, phase);
        const phaseOrder = ["engage", "explore", "explain", "elaborate", "evaluate"];
        const nextPhase = phaseOrder.slice(phaseOrder.indexOf(phase) + 1).find(isPhaseAllowed);
        const phaseFooter = nextPhase
            ? `<div class="all5e-next-row"><button type="button" class="download-btn" data-next-e="${nextPhase}"><span>${uiText(language, "next")}: ${uiText(language, nextPhase)}</span>${iconMarkup("arrow-right")}</button></div>`
            : `<div class="all5e-next-row"><a class="download-btn secondary-download" href="../index.html?panel=sessionSelect&year=${year}&grade=${grade}">${iconMarkup("circle-check")}<span>${uiText(language, "finishSession")}</span></a></div>`;
        const languageControl = translatablePhases.has(phase) && hindiAllowed
            ? `<button type="button" class="language-toggle" data-language-toggle="${phase}" aria-label="${uiText(language, "switchLanguage")}" title="${uiText(language, "switchLanguage")}">${iconMarkup("languages")}<span>${uiText(language, "languageButton")}</span></button>`
            : "";
        const header = `<div class="phase-header">
            <div class="phase-heading">
                <span class="phase-number">${phaseNumber}</span>
                <div><p class="phase-label">${phaseTitle}</p><h1>${tr(lessonData[phase]?.title) || phaseTitle}</h1></div>
            </div>
            ${languageControl}
        </div>`;
        card.setAttribute("lang", language);

        if (phase === "engage") {
            const data = lessonData.engage;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card engage all5e-section`;
            card.innerHTML = `${header}
                <p class="lead-text">${tr(data.lead)}</p>
                <div class="trigger-grid">
                    ${data.triggers.map((item, index) => `<article class="trigger-card${item[0] ? "" : " no-image"}">
                        ${item[0] ? loadingImage(`${assetPrefix}${item[0]}`, tr(item[1]), "trigger-media-stage") : ""}
                        <div>
                            <h2>${data.triggers.length > 1 ? `${index + 1}. ` : ""}${tr(item[1])}</h2>
                            <p><strong>${uiText(language, "triggerQuestion")}</strong> ${tr(item[2])}</p>
                            <p>${tr(item[3])}</p>
                        </div>
                    </article>`).join("")}
                </div>
                <section class="objectives-card">
                    <h2>${uiText(language, "objectives")}</h2>
                    <ul class="check-list">${data.objectives.map((item) => `<li>${tr(item)}</li>`).join("")}</ul>
                </section>${phaseFooter}`;
        }

        if (phase === "explore") {
            const data = lessonData.explore;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card explore all5e-section`;
            const downloads = data.downloads?.length ? `<div class="download-panel">
                <div><h2>Arduino Code Files</h2><p>Download the ready-to-upload project code.</p></div>
                <div class="download-actions">${data.downloads.map(([href, label, type]) => `<a class="download-btn ${type === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${href}" download>${iconMarkup("download")}<span>${label}</span></a>`).join("")}</div>
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
                    <h2>${tr(hardware.title)}</h2>
                    <p class="lead-text hardware-intro">${tr(hardware.intro)}</p>
                    <div class="hardware-grid session-hardware-grid">
                        ${hardware.items.map((item) => `<article class="hardware-card session-hardware-card">
                            ${renderHardwareImages(item[0], tr(item[1]))}
                            <div>
                                <h3>${tr(item[1])}</h3>
                                <p>${tr(item[2])}</p>
                                <p>${tr(item[3])}</p>
                            </div>
                        </article>`).join("")}
                    </div>
                </section>` : "";
            card.innerHTML = `${header}
                <article class="code-focus">
                    <h2>${uiText(language, "code")}</h2>
                    <div class="code-copy-wrap"><button type="button" class="copy-code-btn">${iconMarkup("copy")}<span data-button-label>${uiText(language, "copyCode")}</span></button><pre><code>${escapeHtml(formatCode(data.code))}</code></pre></div>
                </article>
                <div class="explain-steps">${data.steps.map((step, index) => `<article><h3>${index + 1}. ${tr(step[0])}</h3><p>${tr(step[1])}</p></article>`).join("")}</div>
                ${hardwareSection}${phaseFooter}`;
        }

        if (phase === "elaborate") {
            const data = lessonData.elaborate;
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card elaborate all5e-section`;
            card.innerHTML = `${header}<p class="source-note">${data.note}</p>
                <section class="project-gallery-block"><h2>Materials and Components</h2>${renderGallery(data.materials)}</section>
                ${data.projects.map((project) => {
                    const download = project.download ? `<div class="download-panel compact-download"><div><h3>${project.title} Code</h3><p>Download the Arduino code for this build.</p></div><a class="download-btn ${project.download[2] === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${project.download[0]}" download>${iconMarkup("download")}<span>${project.download[1]}</span></a></div>` : "";
                    return `<section class="project-gallery-block"><h2>${project.title}</h2>${download}${renderGallery(project.pages)}<article class="craft-card project-working-card"><h2>How It Works</h2><p>${project.working}</p></article></section>`;
                }).join("")}${renderTemplates(data.codes)}${phaseFooter}`;
        }

        if (phase === "evaluate") {
            card.className = `${card.classList.contains("active") ? "active " : ""}phase-card evaluate all5e-section`;
            const questions = arrangeAssessmentQuestions(lessonData.evaluate?.questions || []);
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
                            <h2>${uiText(language, "codeChallenge")}</h2>
                            <p>${tr(challenge)}</p>
                            <p class="source-note">${uiText(language, "codeChallengePoints")} ${hasCodeBlanks ? uiText(language, "fillEveryBlank") : uiText(language, "reviewCorrectedCode")}</p>
                        </div>
                        ${renderCodeInstructions(codeAnswers, hasCodeBlanks, language)}
                        ${renderInteractiveCodeChallenge(challengeCode, codeAnswers, language)}
                        <div class="code-challenge-result" aria-live="polite"></div>
                    </article>
                    <h2>${uiText(language, "sessionTest")}</h2>
                    <p class="source-note">${uiText(language, "mcqPoints", { count: questions.length, total: questions.length + 5 })}</p>
                    <div class="test-grid">
                        ${questions.map((question, index) => `<fieldset class="test-question">
                            <legend>${index + 1}. ${tr(question[0])}</legend>
                            ${question[1].map((option, optionIndex) => `<label><input type="radio" name="q${index + 1}" value="${optionIndex}" ${optionIndex === question[2] ? 'data-correct="true"' : ""}> ${tr(option)}</label>`).join("")}
                        </fieldset>`).join("")}
                    </div>
                    <div class="test-actions">
                        <button type="submit" class="submit-test">${uiText(language, "submitTest")}</button>
                        <button type="reset" class="reset-test">${uiText(language, "reset")}</button>
                    </div>
                </form>
                <div class="score-modal" id="scoreModal" hidden>
                    <div class="score-modal-card" role="dialog" aria-modal="true" aria-labelledby="scoreText">
                        <p class="phase-label">${uiText(language, "testSubmitted")}</p>
                        <strong id="scoreText">${uiText(language, "score")}: 0 / ${questions.length + 5}</strong>
                        <span id="scoreMessage">${uiText(language, "reviewLesson")}</span>
                        <button type="button" id="closeScore">${uiText(language, "close")}</button>
                    </div>
                </div>${phaseFooter}`;
        }
    }

    const renderLessonPage = () => {
        if (!lessonData || !currentPage || currentPage === "home" || currentPage === "all-5e") return;

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
                        ${item[0] ? loadingImage(`${assetPrefix}${item[0]}`, item[1], "trigger-media-stage") : ""}
                        <div>
                            <h2>${data.triggers.length > 1 ? `${index + 1}. ` : ""}${item[1]}</h2>
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
                <div class="download-actions">${data.downloads.map(([href, label, type]) => `<a class="download-btn ${type === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${href}" download>${iconMarkup("download")}<span>${label}</span></a>`).join("")}</div>
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
                    <div class="code-copy-wrap"><button type="button" class="copy-code-btn">${iconMarkup("copy")}<span data-button-label>Copy Code</span></button><pre><code>${escapeHtml(formatCode(data.code))}</code></pre></div>
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
                    const download = project.download ? `<div class="download-panel compact-download"><div><h3>${project.title} Code</h3><p>Download the Arduino code for this build.</p></div><a class="download-btn ${project.download[2] === "secondary" ? "secondary-download" : ""}" href="${assetPrefix}${project.download[0]}" download>${iconMarkup("download")}<span>${project.download[1]}</span></a></div>` : "";
                    return `<section class="project-gallery-block"><h2>${project.title}</h2>${download}${renderGallery(project.pages)}<article class="craft-card project-working-card"><h2>How It Works</h2><p>${project.working}</p></article></section>`;
                }).join("")}${renderTemplates(data.codes)}`;
        }

        if (currentPage === "evaluate") {
            card.className = "phase-card evaluate";
            const questions = arrangeAssessmentQuestions(lessonData.evaluate?.questions || []);
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
    initializeMediaLoading();
    refreshIcons();

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
        ".phase-card:not(.all5e-section), .trigger-card, .pdf-frame, .hardware-card, .test-question, .download-panel, .project-working-card"
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

    const initializeCopyButtons = (root = document) => {
        root.querySelectorAll(".copy-code-btn").forEach((button) => {
            if (button.dataset.copyBound === "true") return;
            button.dataset.copyBound = "true";
            button.addEventListener("click", async () => {
                const wrapper = button.closest(".code-copy-wrap");
                const code = wrapper ? wrapper.querySelector("code") : null;
                if (!code) return;

                const phase = button.closest("[data-all5e-phase]")?.dataset.all5ePhase || currentPage;
                const language = phaseLanguage(phase);
                const text = code.innerText;

                try {
                    await copyText(text);
                    setButtonLabel(button, uiText(language, "copied"));
                    button.classList.add("copied");
                    setTimeout(() => {
                        setButtonLabel(button, uiText(language, "copyCode"));
                        button.classList.remove("copied");
                    }, 1400);
                } catch (error) {
                    setButtonLabel(button, uiText(language, "copyFailed"));
                    setTimeout(() => {
                        setButtonLabel(button, uiText(language, "copyCode"));
                    }, 1400);
                }
            });
        });

        root.querySelectorAll(".copy-page-code-btn").forEach((button) => {
            if (button.dataset.copyBound === "true") return;
            button.dataset.copyBound = "true";
            button.addEventListener("click", async () => {
                const templateId = button.dataset.codeTemplate;
                const template = templateId ? document.getElementById(templateId) : null;
                if (!template) return;

                const text = template.content ? template.content.textContent.trim() : template.innerHTML.trim();

                try {
                    await copyText(text);
                    setButtonLabel(button, uiText("en", "copied"));
                    button.classList.add("copied");
                    setTimeout(() => {
                        setButtonLabel(button, uiText("en", "copyCode"));
                        button.classList.remove("copied");
                    }, 1400);
                } catch (error) {
                    setButtonLabel(button, uiText("en", "copyFailed"));
                    setTimeout(() => {
                        setButtonLabel(button, uiText("en", "copyCode"));
                    }, 1400);
                }
            });
        });
    };

    const initializeSessionTest = (sessionTest) => {
        if (!sessionTest || sessionTest.dataset.testBound === "true") return;
        sessionTest.dataset.testBound = "true";
        const scoreModal = document.querySelector("#scoreModal");
        const closeScore = document.querySelector("#closeScore");
        const scoreText = document.querySelector("#scoreText");
        const scoreMessage = document.querySelector("#scoreMessage");
        const totalQuestions = sessionTest.querySelectorAll(".test-question").length;
        const codeMax = 5;
        const totalScore = totalQuestions + codeMax;

        const scoreCodeChallenge = () => {
            const language = phaseLanguage("evaluate");
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
                if (result) {
                    result.textContent = uiText(language, "codeScore", {
                        points,
                        max: codeMax,
                        correct,
                        count: blanks.length
                    });
                }
                return points;
            }

            const textarea = codeCard.querySelector("[data-full-code-answer]");
            if (!textarea) {
                if (result) {
                    result.textContent = uiText(language, "codeScore", {
                        points: codeMax,
                        max: codeMax,
                        correct: 1,
                        count: 1
                    });
                }
                codeCard.classList.add("answered-correct");
                return codeMax;
            }

            const expectedCode = normalizeCodeAnswer(codeCard.dataset.codeSolution || "");
            const actualCode = normalizeCodeAnswer(textarea.value);
            const isCorrect = expectedCode && actualCode === expectedCode;
            codeCard.classList.add(isCorrect ? "answered-correct" : "answered-wrong");
            if (result) {
                result.textContent = uiText(language, "codeScore", {
                    points: isCorrect ? codeMax : 0,
                    max: codeMax,
                    correct: isCorrect ? 1 : 0,
                    count: 1
                });
            }
            return isCorrect ? codeMax : 0;
        };

        // patched: a test can only be submitted once. After submission (or when
        // the hosting app reports a stored score) the form is locked read-only.
        let testLocked = false;
        const lockTest = (note) => {
            testLocked = true;
            sessionTest.querySelectorAll("input, textarea, button").forEach((el) => {
                el.disabled = true;
            });
            const actions = sessionTest.querySelector(".test-actions");
            if (actions) {
                const p = document.createElement("p");
                p.className = "source-note";
                p.textContent = note;
                actions.replaceChildren(p);
            }
        };

        const sessionKey = `${quizYear}-${grade}-${session}`;
        window.addEventListener("message", (event) => {
            if (event.origin !== window.location.origin || testLocked) return;
            const d = event.data;
            if (!d || d.type !== "su-lms-quiz-scores") return;
            const done = (d.scores || []).find((s) => s.sessionKey === sessionKey);
            if (done) lockTest(`Test already submitted. Score: ${done.score} / ${done.total}`);
        });

        sessionTest.addEventListener("submit", (event) => {
            event.preventDefault();
            if (testLocked) return;
            if (!window.confirm("Submit the test? You can only submit once — answers cannot be changed after submission.")) return;

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
            const language = phaseLanguage("evaluate");

            scoreText.textContent = `${uiText(language, "score")}: ${score} / ${totalScore}`;

            if (score >= totalScore * 0.86) {
                scoreMessage.textContent = uiText(language, "excellent", {
                    code: codeScore,
                    max: codeMax,
                    mcq: mcqScore,
                    questions: totalQuestions
                });
            } else if (score >= totalScore * 0.6) {
                scoreMessage.textContent = uiText(language, "goodWork", {
                    code: codeScore,
                    max: codeMax,
                    mcq: mcqScore,
                    questions: totalQuestions
                });
            } else {
                scoreMessage.textContent = uiText(language, "reviewChallenge", {
                    code: codeScore,
                    max: codeMax,
                    mcq: mcqScore,
                    questions: totalQuestions
                });
            }

            scoreModal.hidden = false;
            closeScore.focus();

            // patched: report the quiz result to the hosting Report Card app
            // (same-origin iframe parent) so it can store per-student scores.
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: "su-lms-quiz-result",
                    year: quizYear,
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

            lockTest("Test submitted. Answers are locked.");
        });

        sessionTest.addEventListener("reset", (event) => {
            if (testLocked) {
                event.preventDefault();
                return;
            }
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
    };

    const captureEvaluationState = (card) => {
        const form = card?.querySelector("#sessionTest");
        if (!form) return null;
        return {
            selectedAnswers: Array.from(form.querySelectorAll(".test-question input:checked")).map((input) => ({
                name: input.name,
                value: input.value
            })),
            blankValues: Array.from(form.querySelectorAll(".code-blank-input")).map((input) => input.value),
            fullCode: form.querySelector("[data-full-code-answer]")?.value || ""
        };
    };

    const restoreEvaluationState = (card, state) => {
        if (!card || !state) return;
        state.selectedAnswers.forEach(({ name, value }) => {
            const input = Array.from(card.querySelectorAll(`input[name="${name}"]`))
                .find((candidate) => candidate.value === value);
            if (input) input.checked = true;
        });
        card.querySelectorAll(".code-blank-input").forEach((input, index) => {
            input.value = state.blankValues[index] || "";
        });
        const fullCode = card.querySelector("[data-full-code-answer]");
        if (fullCode && state.fullCode) fullCode.value = state.fullCode;
    };

    initializeCopyButtons();
    initializeSessionTest(document.querySelector("#sessionTest"));

    document.addEventListener("click", (event) => {
        const languageButton = event.target.closest("[data-language-toggle]");
        if (!languageButton) return;

        const phase = languageButton.dataset.languageToggle;
        if (!hindiAllowed || !translatablePhases.has(phase)) return;
        const card = document.querySelector(`[data-all5e-phase="${phase}"]`);
        if (!card) return;

        const evaluationState = phase === "evaluate" ? captureEvaluationState(card) : null;
        phaseLanguages[phase] = phaseLanguages[phase] === "hi" ? "en" : "hi";
        try {
            localStorage.setItem(`lms-phase-language-${phase}`, phaseLanguages[phase]);
        } catch (error) {
            // The language still changes for this page when storage is unavailable.
        }

        renderPhaseCard(phase, card);
        restoreEvaluationState(card, evaluationState);
        initializeMediaLoading();
        initializeCopyButtons(card);
        initializeSessionTest(card.querySelector("#sessionTest"));
        refreshIcons();
        if (card.classList.contains("active")) {
            const sessionTitle = `${lessonData.year || levelLabels[year] || `Level ${year}`} | ${lessonData.grade} | ${lessonData.session}`;
            document.title = `${sessionTitle} | ${uiText(phaseLanguages[phase], phase)}`;
        }
    });

    document.addEventListener("keydown", (event) => {
        const scoreModal = document.querySelector("#scoreModal");
        if (event.key === "Escape" && scoreModal && !scoreModal.hidden) {
            scoreModal.hidden = true;
        }
    });
});


