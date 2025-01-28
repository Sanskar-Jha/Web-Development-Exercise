document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-btn");
    const checkboxes = document.querySelectorAll("#tags-container input[type='checkbox']");

    generateButton.addEventListener("click", () => {
        const selectedTags = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);

        if (selectedTags.length === 0) {
            displayMessage("Please select at least one tag", "error");
            return;
        }

        const businessName = generateBusinessName(selectedTags);
        document.getElementById('display-name').value = businessName;
        displayMessage("Generated Business Name", "success");
    });

    function generateBusinessName(tags) {
        const names = {
            Professional: ["Pro", "Elite", "Apex", "Omni", "Prime", "Nova", "Quantum", "Global"],
            Trendy: ["Neo", "Giga", "Xeno", "Insta", "Vibe", "Hyper", "Astro", "Zest"],
            Natural: ["Eco", "Terra", "Solar", "Aqua", "Luna", "Flora", "Arbor", "Summit"],
            TechandInnovation: ["Code", "Logic", "Cloud", "Pixel", "Circuit", "Data", "Bot", "Byte"],
            FashionandLifestyle: ["Chic", "Vogue", "Style", "Luxe", "Glam", "Trend", "Icon", "Mode", "Nest"],
            FoodandBeverage: ["Feast", "Taste", "Brew", "Spoon", "Crave", "Sweet", "Fresh", "Savor"],
            HealthandWellness: ["Vital", "Glow", "Bliss", "Pure", "Zen", "Harmony", "Care", "Fit"],
            FinanceandBusiness: ["Capital", "Wealth", "Vault", "Trade", "Ledger", "Credit", "Fund"],
            TimeRelated: ["Instant", "Timeless", "Epoch", "NextGen"],
            Unique: ["Nimbus", "Atlas", "Haven", "Orbit", "Flux", "Ember", "Kaleido", "Prism", "Zenith", "Nexus"],
            // suffix: {
            //     Trendy: ["ify", "ly", "io", "sy", "za", "scape", "able", "hub"],
            //     Professional: ["tech", "corp", "labs", "works", "solutions", "ventures", "group"],
            //     Creative: ["nest", "spot", "dream", "wave", "spark", "gen", "path", "edge"],
            // }

        };


        let randomNames = [];

        tags.forEach(tag => {
            if (names[tag]) {
                const randomName = names[tag][Math.floor(Math.random() * names[tag].length)];
                randomNames.push(randomName);
            }
        });

        if (randomNames.length === 0) {
            return "UniqueBiz"; // Fallback if no matching tags
        }

        if (randomNames.length > 2) {
            return `${randomNames[Math.floor(Math.random() * randomNames.length)]}${randomNames[Math.floor(Math.random() * randomNames.length)]}`;
        }

        return randomNames.join("");
    }

    function displayMessage(message, type) {
        const messageBox = document.createElement('span');
        messageBox.textContent = message;
        messageBox.className = type;
        messageBox.setAttribute('id', 'message-box');
        document.body.prepend(messageBox);

        // Remove message box after 5s.
        setTimeout(() => {
            messageBox.remove();
        }, 2000);
    }
});
