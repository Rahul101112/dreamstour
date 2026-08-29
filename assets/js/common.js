console.log("common.js started");

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
        } else {
            console.error("header-placeholder not found");
        }
    })
    .catch(error => {
        console.error("Header error:", error);
    });