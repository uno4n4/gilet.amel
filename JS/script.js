// Vérifier si une préférence de fond d'écran est stockée
const savedBackground = localStorage.getItem("background");
if (savedBackground) {
    // Appliquer le fond d'écran enregistré
    document.body.style.backgroundImage = `url(${savedBackground})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

// Mode sombre
const darkModeCheckbox = document.getElementById("dark-mode");
const gitLogo = document.getElementById("git");
const iconeLogo = document.getElementById("icone");

// Vérifier si le mode sombre est activé dans le localStorage
const darkModePreference = localStorage.getItem("darkMode");

if (darkModePreference === "enabled") {
    document.body.classList.add("dark-mode");
    gitLogo.src = "../IMAGES/gitblanc.webp";  // Icône claire en mode sombre
    iconeLogo.src = "../IMAGES/clair.png";   // Icône claire en mode sombre
    darkModeCheckbox.checked = true;          // Cocher la case du mode sombre
} else if (darkModePreference === "disabled") {
    document.body.classList.remove("dark-mode");
    gitLogo.src = "../IMAGES/github.png";  // Icône noire en mode normal
    iconeLogo.src = "../IMAGES/icone.png"; // Icône noire en mode normal
    darkModeCheckbox.checked = false;      // Décocher la case du mode sombre
}

// Écouter les changements de l'utilisateur
darkModeCheckbox.addEventListener("change", () => {
    if (darkModeCheckbox.checked) {
        document.body.classList.add("dark-mode");
        gitLogo.src = "../IMAGES/gitblanc.webp";  // Icône claire en mode sombre
        iconeLogo.src = "../IMAGES/clair.png";   // Icône claire en mode sombre

        // Sauvegarder l'état du mode sombre dans localStorage
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        gitLogo.src = "../IMAGES/github.png";   // Icône noire en mode normal
        iconeLogo.src = "../IMAGES/icone.png";  // Icône noire en mode normal

        // Sauvegarder l'état du mode sombre dans localStorage
        localStorage.setItem("darkMode", "disabled");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".footer a"); // Tous les liens dans le footer
    const container = document.getElementById("windows-container"); // Conteneur des fenêtres

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Bloque l'ouverture normale du lien

            const url = this.getAttribute("href"); // Récupère l'URL du lien
            const title = this.getAttribute("title") || this.textContent || "Nouvelle fenêtre"; // Titre de la fenêtre

            openWindow(url, title);
        });
    });

    function openWindow(url, title) {
        // Crée une fenêtre dynamique
        const windowDiv = document.createElement("div");
        windowDiv.classList.add("window");
        windowDiv.innerHTML = `
            <div class="window-header">
                <span class="window-title">${title}</span>
                <button class="close-btn">×</button>
            </div>
            <iframe src="${url}" class="window-content"></iframe>
        `;

        // Ajouter l'événement de fermeture
        windowDiv.querySelector(".close-btn").addEventListener("click", function () {
            windowDiv.remove();
        });

        // Permet de déplacer la fenêtre
        makeDraggable(windowDiv);

        container.appendChild(windowDiv); // Ajoute la fenêtre au conteneur
    }

    function makeDraggable(element) {
        let isDragging = false, x = 0, y = 0, offsetX = 0, offsetY = 0;

        const header = element.querySelector(".window-header");

        header.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.zIndex = "1000"; // Met au premier plan
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                x = e.clientX - offsetX;
                y = e.clientY - offsetY;
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            }
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
        });
    }
});

