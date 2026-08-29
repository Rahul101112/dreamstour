console.log("common.js started");

// Function to load HTML components
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }

        const html = await response.text();

        const element = document.getElementById(elementId);

        if (element) {
            element.innerHTML = html;
            console.log(`${filePath} loaded successfully`);
        }

    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}


// Function to load JavaScript dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = src;

        script.onload = () => {
            console.log(`${src} loaded successfully`);
            resolve();
        };

        script.onerror = () => {
            console.error(`Failed to load ${src}`);
            reject();
        };

        document.body.appendChild(script);
    });
}


// Load everything in correct order
async function initializeWebsite() {

    // 1. Load Header
    await loadComponent(
        "header-placeholder",
        "/includes/header.html"
    );

    // 2. Load Footer
    await loadComponent(
        "footer-placeholder",
        "/includes/footer.html"
    );

    console.log("All components loaded");

    // 3. Load theme JavaScript AFTER header exists
    await loadScript("/assets/js/theme-script.js");

    console.log("Website initialized successfully");
}


// Start
initializeWebsite();



// ================================
// Mobile Offcanvas Menu
// ================================

document.addEventListener("click", function (e) {

    // Open mobile menu
    const menuButton = e.target.closest(".sidebar-menu");

    if (menuButton) {
        e.preventDefault();

        const offcanvas = document.querySelector(".offcanvas-info");

        if (offcanvas) {
            offcanvas.classList.add("show");
            document.body.classList.add("menu-open");

            console.log("Mobile menu opened");
        }
    }


    // Close mobile menu
    const closeButton = e.target.closest(".offcanvas-close");

    if (closeButton) {
        e.preventDefault();

        const offcanvas = document.querySelector(".offcanvas-info");

        if (offcanvas) {
            offcanvas.classList.remove("show");
            document.body.classList.remove("menu-open");

            console.log("Mobile menu closed");
        }
    }

});