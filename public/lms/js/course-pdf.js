document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-pdf-fullscreen]").forEach((button) => {
        button.addEventListener("click", async () => {
            const viewer = button.closest("main")?.querySelector("[data-pdf-viewer]");
            if (!viewer) return;
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                button.textContent = "Full Screen";
                return;
            }
            await viewer.requestFullscreen();
            button.textContent = "Exit Full Screen";
        });
    });
});
