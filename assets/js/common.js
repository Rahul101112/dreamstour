console.log("common.js started");

// Load HTML component
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


// Set Active Navigation Menu
function setActiveMenu() {

    // Get current page name
    let currentPage = window.location.pathname.split('/').pop();

    // If URL is root
    if (!currentPage || currentPage === '/') {
        currentPage = 'index.html';
    }

    console.log("Current page:", currentPage);

    // Get all main navigation items
    const menuItems = document.querySelectorAll(
        '#mobile-menu .main-nav > li'
    );

    menuItems.forEach((item) => {

        const link = item.querySelector(':scope > a');

        if (!link) return;

        const href = link.getAttribute('href');

        // Remove active from all
        item.classList.remove('active');
        link.classList.remove('active');

        // Add active to current page
        if (href === currentPage) {
            item.classList.add('active');
            link.classList.add('active');

            console.log("Active menu set:", href);
        }
    });
}


// Load JavaScript dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {

        // Prevent duplicate script loading
        if (document.querySelector(`script[src="${src}"]`)) {
            console.log(`${src} already loaded`);
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            console.log(`${src} loaded successfully`);
            resolve();
        };

        script.onerror = () => {
            console.error(`Failed to load ${src}`);
            reject(new Error(`Failed to load ${src}`));
        };

        document.body.appendChild(script);
    });
}


// Mobile Offcanvas Open / Close
function initOffcanvasMenu() {

    document.addEventListener("click", function (e) {

        // Open menu
        const menuButton = e.target.closest(".sidebar-menu");

        if (menuButton) {
            e.preventDefault();

            const offcanvas = document.querySelector(".offcanvas-info");

            if (offcanvas) {
                offcanvas.classList.add("show");
                document.body.classList.add("menu-open");
            }
        }


        // Close menu
        const closeButton = e.target.closest(".offcanvas-close");

        if (closeButton) {
            e.preventDefault();

            const offcanvas = document.querySelector(".offcanvas-info");

            if (offcanvas) {
                offcanvas.classList.remove("show");
                document.body.classList.remove("menu-open");
            }
        }

    });

    console.log("Offcanvas menu initialized");
}


// Main initialization
async function initializeWebsite() {

    // 1. Load Header FIRST
    await loadComponent(
        "header-placeholder",
        "/includes/header.html"
    );

    // 2. Set active menu AFTER header is loaded
    setActiveMenu();


    // 3. Load Footer
    await loadComponent(
        "footer-placeholder",
        "/includes/footer.html"
    );

    await loadComponent(
        "whatsapp-placeholder",
        "/includes/whatsapp.html"
    );

    console.log("All components loaded");


    // 4. Initialize hamburger open/close
    initOffcanvasMenu();


    // 5. Load Mobile Menu script AFTER header exists
    await loadScript("/assets/js/mobile-menu.js");


    // 6. Explicitly initialize mobile menu
    if (typeof window.initMobileMenu === "function") {
        window.initMobileMenu();
        console.log("Mobile menu initialized successfully");
    } else {
        console.error("initMobileMenu function not found");
    }


    // 7. Load theme script
    await loadScript("/assets/js/theme-script.js");


    console.log("Website initialized successfully");
}


// Start website
initializeWebsite();