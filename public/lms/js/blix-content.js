(() => {
    const sessions = [
        { title: "Getting Started with BLIX", summary: "Learn safe construction, part handling, dismantling, and the rack-and-pinion principle before beginning the models.", pages: ["cover", 2, 3] },
        { title: "Fork Lift: Chassis and Frame", summary: "Build the wheeled base and begin the upright support structure for the fork-lift model.", pages: [4, 5, 6, 7, 8, 9] },
        { title: "Fork Lift: Lifting Mechanism", summary: "Complete the rack-and-pinion tower, fork carriage, and final fork-lift assembly.", pages: [10, 11, 12, 13, 14] },
        { title: "Lift: Base and Guide Rails", summary: "Construct the lift base, vertical rails, and supporting frame with careful alignment.", pages: [15, 16, 17, 18, 19, 20] },
        { title: "Lift: Drive and Final Assembly", summary: "Add the moving platform, rack-and-pinion drive, motor connection, and complete the lift.", pages: [21, 22, 23, 24, 25, 26] },
        { title: "Vertical Gate", summary: "Build a guided vertical gate and use rack-and-pinion motion to raise and lower the gate panel.", pages: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36] },
        { title: "Grinding Machine", summary: "Assemble the machine frame, guided carriage, motor drive, and rotating grinding mechanism.", pages: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47] },
        { title: "Horizontal Gate", summary: "Construct a sliding gate and observe how rotary movement drives controlled horizontal motion.", pages: [48, 49, 50, 51, 52, 53, 54, 55, 56] },
        { title: "Steering Car: Chassis and Steering", summary: "Build the steering-car chassis and assemble the linked front-wheel steering mechanism.", pages: [57, 58, 59, 60, 61, 62, 63] },
        { title: "Steering Car: Final Build and Review", summary: "Complete the body, verify free movement, review the mechanism, and check every BLIX component.", pages: [64, 65, 66, 67, 68, 69, 70] }
    ];

    const nav = document.querySelector("[data-blix-nav]");
    const workspace = document.querySelector("[data-blix-workspace]");
    if (!nav || !workspace) return;

    let sessionIndex = Math.max(0, Math.min(sessions.length - 1, Number(new URLSearchParams(location.search).get("session") || 1) - 1));
    let pageIndex = 0;

    const sessionLabel = document.querySelector("[data-blix-session-label]");
    const sessionTitle = document.querySelector("[data-blix-session-title]");
    const summary = document.querySelector("[data-blix-summary]");
    const image = document.querySelector("[data-blix-page-image]");
    const programCover = document.querySelector("[data-blix-program-cover]");
    const pageCount = document.querySelector("[data-blix-page-count]");
    const progress = document.querySelector("[data-blix-progress]");
    const progressBar = document.querySelector("[data-blix-progress-bar]");
    const prevPage = document.querySelector("[data-blix-prev-page]");
    const nextPage = document.querySelector("[data-blix-next-page]");
    const prevSession = document.querySelector("[data-blix-prev-session]");
    const nextSession = document.querySelector("[data-blix-next-session]");
    const fullscreen = document.querySelector("[data-blix-fullscreen]");

    nav.innerHTML = sessions.map((session, index) => `
        <button type="button" data-blix-session="${index}">
            <span>${index + 1}</span>
            <span><strong>Session ${index + 1}</strong><small>${session.title}</small></span>
        </button>
    `).join("");

    const updateUrl = () => history.replaceState(null, "", `${location.pathname}?session=${sessionIndex + 1}`);

    const render = ({ focusWorkspace = false } = {}) => {
        const session = sessions[sessionIndex];
        const sourcePage = session.pages[pageIndex];
        const isProgramCover = sourcePage === "cover";
        let activeButton = null;
        nav.querySelectorAll("[data-blix-session]").forEach((button, index) => {
            button.classList.toggle("active", index === sessionIndex);
            button.setAttribute("aria-current", index === sessionIndex ? "step" : "false");
            if (index === sessionIndex) activeButton = button;
        });
        sessionLabel.textContent = `Session ${sessionIndex + 1}`;
        sessionTitle.textContent = session.title;
        summary.textContent = session.summary;
        programCover.hidden = !isProgramCover;
        image.hidden = isProgramCover;
        if (!isProgramCover) {
            image.src = `https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/assets/images/pdf/blix/rack-and-pinion/page-${String(sourcePage).padStart(2, "0")}.jpg`;
            image.alt = `BLIX Rack and Pinion manual page ${sourcePage}: ${session.title}`;
        }
        pageCount.textContent = `Page ${pageIndex + 1} of ${session.pages.length}`;
        progress.textContent = `Session ${sessionIndex + 1} of ${sessions.length}`;
        progressBar.style.width = `${((sessionIndex + 1) / sessions.length) * 100}%`;
        prevPage.disabled = pageIndex === 0;
        nextPage.disabled = pageIndex === session.pages.length - 1;
        prevSession.disabled = sessionIndex === 0;
        nextSession.disabled = sessionIndex === sessions.length - 1;
        nextSession.textContent = sessionIndex === sessions.length - 1 ? "Course Complete" : `Next: Session ${sessionIndex + 2}`;
        document.title = `Session ${sessionIndex + 1}: ${session.title} | BLIX LMS`;
        updateUrl();
        if (activeButton && !focusWorkspace) {
            nav.scrollTop = Math.max(0, activeButton.offsetTop - nav.offsetTop - 12);
        }
        if (focusWorkspace && window.innerWidth < 980) workspace.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const changeSession = (nextIndex, focusWorkspace = true) => {
        sessionIndex = Math.max(0, Math.min(sessions.length - 1, nextIndex));
        pageIndex = 0;
        render({ focusWorkspace });
    };

    nav.addEventListener("click", (event) => {
        const button = event.target.closest("[data-blix-session]");
        if (button) changeSession(Number(button.dataset.blixSession));
    });
    prevPage.addEventListener("click", () => { if (pageIndex > 0) { pageIndex -= 1; render(); } });
    nextPage.addEventListener("click", () => { if (pageIndex < sessions[sessionIndex].pages.length - 1) { pageIndex += 1; render(); } });
    prevSession.addEventListener("click", () => changeSession(sessionIndex - 1));
    nextSession.addEventListener("click", () => { if (sessionIndex < sessions.length - 1) changeSession(sessionIndex + 1); });

    const updateFullscreenLabel = () => {
        const active = document.fullscreenElement === workspace;
        fullscreen.textContent = active ? "Exit Full Screen" : "Full Screen";
        workspace.classList.toggle("is-fullscreen", active);
    };
    fullscreen.addEventListener("click", async () => {
        if (document.fullscreenElement === workspace) await document.exitFullscreen();
        else await workspace.requestFullscreen();
    });
    document.addEventListener("fullscreenchange", updateFullscreenLabel);
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && pageIndex > 0) { pageIndex -= 1; render(); }
        if (event.key === "ArrowRight" && pageIndex < sessions[sessionIndex].pages.length - 1) { pageIndex += 1; render(); }
    });

    render();
})();
