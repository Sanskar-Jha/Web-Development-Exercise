// Visual Map
// Initialize the map with a dark tile layer
const map = L.map("map").setView([50, 0], 3); // Centered at lat: 0, lon: 0, zoom: 2

// Add OpenStreetMap tiles
// Add a dark-themed tile layer
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    noWrap: true, // Prevent map wrapping
    subdomains: "abcd",
    maxZoom: 19,
}).addTo(map);

L.polyline(
    [
        [37.7749, -122.4194],
        [48.8566, 2.3522],
        [35.6895, 139.6917],
    ],
    { color: "lightgreen", weight: 2 }
).addTo(map);

const lightGreenIcon = L.icon({
    iconUrl: "https://example.com/light-green-marker.png", // Replace with your marker image
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -40],
});

L.marker([37.7749, -122.4194], { icon: lightGreenIcon }).addTo(map);


// Add markers to represent hacking targets
const targets = [
    { name: "Server 1", coords: [37.7749, -122.4194] }, // San Francisco
    { name: "Server 2", coords: [48.8566, 2.3522] },    // Paris
    { name: "Server 3", coords: [35.6895, 139.6917] },  // Tokyo
];

targets.forEach((target) => {
    const marker = L.marker(target.coords).addTo(map);
    marker.bindPopup(`<b>${target.name}</b><br>Hacking in progress...`);
});


// Add a polyline to show connections
const latlngs = [
    [37.7749, -122.4194], // San Francisco
    [48.8566, 2.3522],    // Paris
    [35.6895, 139.6917],  // Tokyo
];

L.polyline(latlngs, { color: "lime", weight: 2 }).addTo(map);


// Simulate a trace with dynamic markers
let traceIndex = 0;

function traceRoute() {
    if (traceIndex < latlngs.length - 1) {
        const start = latlngs[traceIndex];
        const end = latlngs[traceIndex + 1];

        // Create a temporary moving marker
        const tempMarker = L.marker(start, { icon: L.divIcon({ className: 'blinking-icon' }) }).addTo(map);
        let step = 0;
        const steps = 50;

        const interval = setInterval(() => {
            const lat = start[0] + ((end[0] - start[0]) * step) / steps;
            const lng = start[1] + ((end[1] - start[1]) * step) / steps;

            tempMarker.setLatLng([lat, lng]);
            step++;

            if (step > steps) {
                clearInterval(interval);
                tempMarker.remove();
                traceIndex++;
                traceRoute(); // Move to the next route
            }
        }, 50);
    }
}

traceRoute();

// Command line
const input = document.getElementById("command-input");
const output = document.getElementById("output");
const score = document.getElementById("score");
const trace = document.getElementById("trace");
const money = document.getElementById("money");
const outputLine = document.createElement("div");

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        input.value = ""; // Clear input

        // Check if the command starts with 'search'
        if (command.startsWith("search ")) {
            const query = command.replace("search ", "").trim();
            searchLocation(query); // Call async function
        }
        else {
            handleCommand(command);
        }
    }
});

// Function to handle the search and API call
let currentMarker = null; // Reference to the current marker

async function searchLocation(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

    try {
        const response = await fetch(url); // Await fetch response
        const data = await response.json(); // Await JSON parsing

        if (data.length > 0) {
            const { lat, lon } = data[0];

            // Remove the previous marker if it exists
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }

            // Add a new marker for the searched location
            currentMarker = L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`Location: ${query}`)
                .openPopup();

            // Move the map to the new location
            map.setView([lat, lon], 10);
            outputLine.textContent = query;
        } else {
            outputLine.textContent = "Location not found!";
        }
    } catch (error) {
        outputLine.textContent = `Failed to fetch location data. (${error})`;
    }
}

// Function to handle the commands
function handleCommand(command) {
    switch (command) {
        case "hack":
            outputLine.textContent = "Hacking in progress...";

            setTimeout(() => {
                money.textContent = "$" + (parseInt(money.textContent.slice(1)) + 1000);
                outputLine.textContent = "Hacking successful! +$1000";
            }, 2000);
            break;

        case "status":
            outputLine.textContent = "System secure. Trace level: " + trace.textContent;
            break;

        case "clear":
            output.innerHTML = "";
            break;

        case "ls":
            outputLine.textContent = "Reading your files in progress...";

            setTimeout(() => {
                outputLine.textContent = "password files detected...";
            }, 2000);

            setTimeout(() => {
                outputLine.textContent = "Sending all password and files to server...";
            }, 4000);

            setTimeout(() => {
                outputLine.textContent = "Cleaning up...";
            }, 6000);

            setTimeout(() => {
                outputLine.textContent = "Done!";
            }, 8000);
            break;

        default:
            outputLine.textContent = "Unknown command: " + command;
    }

    output.appendChild(outputLine);
    output.scrollTop = output.scrollHeight;
}