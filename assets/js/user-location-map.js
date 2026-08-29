function loadUserLocationMap() {
    const map = document.getElementById("user-map");

    // Stop if map doesn't exist on current page
    if (!map) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(

            // Success
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log("User Location:", latitude, longitude);

                map.src =
                    `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;
            },

            // Error / Permission denied
            function (error) {
                console.warn("Location access error:", error.message);

                // Default location
                map.src =
                    "https://www.google.com/maps?q=Delhi,India&z=12&output=embed";
            }
        );
    } else {
        console.warn("Geolocation is not supported by this browser.");

        map.src =
            "https://www.google.com/maps?q=Delhi,India&z=12&output=embed";
    }
}


// Initialize
document.addEventListener("DOMContentLoaded", loadUserLocationMap);