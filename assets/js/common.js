async function loadComponent(id, path) {
    const element = document.getElementById(id);

    if (!element) {
        console.warn(`Element not found: ${id}`);
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }

        element.innerHTML = await response.text();

        console.log(`Successfully loaded: ${path}`);

    } catch (error) {
        console.error(`Error loading ${path}:`, error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {

    console.log("Common JS started");

    // Load Header
    await loadComponent(
        "header-placeholder",
        "/includes/header.html"
    );

    // Load Footer
    await loadComponent(
        "footer-placeholder",
        "/includes/footer.html"
    );

    console.log("All components loaded");

    // Force hide preloader
    const preloaders = document.querySelectorAll(
        ".preloader, .loader, #loader, #preloader"
    );

    preloaders.forEach(function (loader) {
        loader.style.display = "none";
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    });

    // Remove loading classes if present
    document.body.classList.remove("loading");

    console.log("Preloader hidden");

});