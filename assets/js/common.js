async function loadComponent(id, path) {
    const element = document.getElementById(id);

    if (!element) return;

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }

        element.innerHTML = await response.text();
        console.log(`Successfully loaded: ${path}`);

    } catch (error) {
        console.error(error);
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

document.addEventListener("DOMContentLoaded", async function () {

    console.log("Common JS started");

    // Load reusable components first
    await loadComponent(
        "header-placeholder",
        "/includes/header.html"
    );

    await loadComponent(
        "footer-placeholder",
        "/includes/footer.html"
    );

    console.log("All components loaded");

    // NOW load scripts that depend on header/footer
    await loadScript("/assets/js/theme-script.js");

});