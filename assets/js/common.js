document.addEventListener("DOMContentLoaded", async function () {

    // =========================
    // LOAD COMPONENT FUNCTION
    // =========================
    async function loadComponent(elementId, filePath) {
        const element = document.getElementById(elementId);

        if (!element) return;

        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`Failed to load: ${filePath}`);
            }

            const data = await response.text();
            element.innerHTML = data;

        } catch (error) {
            console.error("Component loading error:", error);
        }
    }


    // =========================
    // LOAD HEADER
    // =========================
    await loadComponent(
        "header-placeholder",
        "/includes/header.html"
    );


    // =========================
    // LOAD FOOTER
    // =========================
    await loadComponent(
        "footer-placeholder",
        "/includes/footer.html"
    );


    // =========================
    // ADD MORE GLOBAL COMPONENTS
    // =========================

    // Example:
    // await loadComponent("loader-placeholder", "/includes/loader.html");

});