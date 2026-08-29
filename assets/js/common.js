console.log("common.js started");

// Load Header
fetch('/includes/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error("Header failed to load");
        }
        return response.text();
    })
    .then(data => {
        const header = document.getElementById('header-placeholder');

        if (header) {
            header.innerHTML = data;
            console.log("Header loaded successfully");
        }
    })
    .catch(error => {
        console.error("Header error:", error);
    });


// Load Footer
fetch('/includes/footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error("Footer failed to load");
        }
        return response.text();
    })
    .then(data => {
        const footer = document.getElementById('footer-placeholder');

        if (footer) {
            footer.innerHTML = data;
            console.log("Footer loaded successfully");
        }
    })
    .catch(error => {
        console.error("Footer error:", error);
    });