(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        if (document.body.dataset.page !== "all-5e") return;

        const main = document.querySelector(".all5e-page");
        if (!main || main.querySelector("#all5eContent")) return;

        const hero = main.querySelector(".common-hero");
        const tools = document.createElement("div");
        tools.className = "all5e-tools standalone-fullscreen-tools";
        tools.innerHTML = `
            <button type="button" class="download-btn" data-shell-fullscreen-enter>
                <i data-lucide="maximize-2" aria-hidden="true"></i><span>Full Screen</span>
            </button>
            <button type="button" class="download-btn secondary-download" data-shell-fullscreen-exit>
                <i data-lucide="minimize-2" aria-hidden="true"></i><span>Exit Full Screen</span>
            </button>`;

        if (hero) hero.insertAdjacentElement("afterend", tools);
        else main.prepend(tools);

        const enter = tools.querySelector("[data-shell-fullscreen-enter]");
        const exit = tools.querySelector("[data-shell-fullscreen-exit]");
        const setFullscreenState = (active) => {
            main.classList.toggle("fullscreen-mode", active);
            document.body.classList.toggle("lesson-fullscreen-active", active);
        };

        enter.addEventListener("click", async () => {
            try {
                if (!document.fullscreenElement && main.requestFullscreen) await main.requestFullscreen();
            } catch (_error) {
                // Embedded course platforms may block the native Fullscreen API.
            }
            setFullscreenState(true);
        });

        exit.addEventListener("click", async () => {
            try {
                if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
            } catch (_error) {
                // The CSS viewport fallback still exits through the state below.
            }
            setFullscreenState(false);
        });

        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement === main) setFullscreenState(true);
            else if (!document.fullscreenElement) setFullscreenState(false);
        });

        if (window.lucide && typeof window.lucide.createIcons === "function") window.lucide.createIcons();
    });
}());
