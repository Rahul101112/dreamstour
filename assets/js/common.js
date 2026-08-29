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

        const html = await response.text();
        element.innerHTML = html;

        console.log(`Successfully loaded: ${path}`);

    } catch (error) {
        console.error(`Error loading ${path}:`, error);
    }
}


document.addEventListener("DOMContentLoaded", async function () {

    console.log("Common JS started");

    await loadComponent(
        "header-placeholder",
        "/includes/header.html"
    );

    await loadComponent(
        "footer-placeholder",
        "/includes/footer.html"
    );

    // Hide page loader after components load
    const loader = document.querySelector(".preloader");

    if (loader) {
        loader.style.display = "none";
    }

    console.log("All common components loaded");
});