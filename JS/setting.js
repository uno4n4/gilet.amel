// Date-Heure :
function updateDateTime(){
    const date = new Date();
    const formattedDate = date.toLocaleDateString("fr", {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    });
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${formattedDate} ${hours}:${minutes}:${seconds}`;
    document.getElementById("date-heure").textContent = formattedDateTime;
}
updateDateTime();
setInterval(updateDateTime, 1000);

//fenêtre : 
const rectangle = document.getElementById('rectangle');
const closeBtn = document.querySelector('.rouge'); 
const minimizeBtn = document.querySelector('.orange'); 
const restoreBtn = document.querySelector('.vert'); 
const links = document.querySelectorAll(".foot a");

rectangle.style.position = "absolute"; // Permet le déplacement
rectangle.style.cursor = "move"; // Change le curseur

let isDragging = false;
let offsetX, offsetY;

// Modifier l'événement mousedown pour qu'il ne se déclenche pas si on clique sur un élément interactif comme le menu
rectangle.addEventListener('mousedown', (e) => {
    if (e.target.closest('.menu-container') || e.target.classList.contains('rond')) return; // Ignore si on clique sur le menu ou un bouton

    isDragging = true;
    offsetX = e.clientX - rectangle.getBoundingClientRect().left;
    offsetY = e.clientY - rectangle.getBoundingClientRect().top;
    rectangle.style.cursor = "moving";
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        rectangle.style.left = e.clientX - offsetX + 'px';
        rectangle.style.top = e.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    rectangle.style.cursor = "move";
});

// ✅ Empêcher le drag quand on clique sur un bouton
document.querySelectorAll('.rond').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
});

// 🔴 Ferme la fenêtre

closeBtn.addEventListener('click', () => {
    // Si la fenêtre est en plein écran, on sort du plein écran
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
            console.log(`Erreur lors de la sortie du plein écran: ${err.message}`);
        });
    }

    // Ajoute la classe pour l'animation de fermeture
    rectangle.classList.add('fermer');

    // Une fois l'animation terminée, on cache la fenêtre
    rectangle.addEventListener('animationend', () => {
        rectangle.style.display = 'none';
    });

    // Supprime la classe 'active' de tous les liens pour faire disparaître la pastille
    links.forEach(link => {
        link.classList.remove('active');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop(); // Récupère le nom du fichier actuel

    links.forEach(link => {
        const href = link.getAttribute("href").split("/").pop(); // Récupère juste le nom du fichier dans le href

        // Ajoute la classe active uniquement si le lien correspond à la page actuelle
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});



// 🟠 Réduit la fenêtre
minimizeBtn.addEventListener('click', () => {
    rectangle.style.transform = 'scale(0)';
    rectangle.style.opacity = '0';
});

// 🟢 Restaure la fenêtre en plein écran
restoreBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        // Si on n'est pas en plein écran, on passe en plein écran
        rectangle.requestFullscreen().catch(err => {
            console.log(`Erreur lors du passage en plein écran: ${err.message}`);
        });
    } else {
        // Si on est déjà en plein écran, on sort du plein écran
        document.exitFullscreen();
    }
});

// Bouton de réduction
let isMinimized = false; // Suivi de l'état réduit ou non

minimizeBtn.addEventListener('click', () => {
    if (isMinimized) return; // Empêche de réduire plusieurs fois

    // Vérifie si la fenêtre est en plein écran
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
            setTimeout(reduceWindow, 100); // Petite pause pour éviter un bug visuel
        }).catch(err => {
            console.log(`Erreur lors de la sortie du plein écran: ${err.message}`);
        });
    } else {
        reduceWindow(); // Réduit directement si pas en plein écran
    }
});

function reduceWindow() {
    const footer = document.querySelector('.footer');
    const footerRect = footer.getBoundingClientRect();
    const rect = rectangle.getBoundingClientRect();

    // Calculer le déplacement vers le footer
    const offsetX = footerRect.left + (footerRect.width / 2) - (rect.left + rect.width / 2);
    const offsetY = footerRect.top - rect.top;

    // Appliquer l'animation de réduction vers le footer
    rectangle.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    rectangle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.2)`;
    rectangle.style.opacity = '0';

    isMinimized = true; // Met l'état en réduit
}

// Réouverture de la fenêtre depuis le footer
document.querySelectorAll('.footer img').forEach(img => {
    img.addEventListener('click', (event) => {
        const parentLink = img.closest('a'); // Vérifie si l'image est dans un lien
        
        if (isMinimized) {
            event.preventDefault(); // Empêche le changement de page SEULEMENT si on veut rouvrir la fenêtre

            // Animation pour rouvrir la fenêtre
            rectangle.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            rectangle.style.transform = 'translate(0, 0) scale(1)';
            rectangle.style.opacity = '1';
            isMinimized = false;
        } else if (parentLink && parentLink.getAttribute('href')) {
            // Si c'est un lien valide, on laisse la navigation normale
            window.location.href = parentLink.getAttribute('href');
        }
    });
});














// Mode sombre
const darkModeCheckbox = document.getElementById("dark-mode");
const gitLogo = document.getElementById("git");
const iconeLogo = document.getElementById("icone");

// Vérifier si le mode sombre est activé dans le localStorage
const darkModePreference = localStorage.getItem("darkMode");

if (darkModePreference === "enabled") {
    document.body.classList.add("dark-mode");
    rectangle.classList.add("dark-mode-settings");
    gitLogo.src = "../IMAGES/gitblanc.webp";
    iconeLogo.src = "../IMAGES/clair.png";
    darkModeCheckbox.checked = true; // Cocher la case du mode sombre
} else if (darkModePreference === "disabled") {
    document.body.classList.remove("dark-mode");
    rectangle.classList.remove("dark-mode-settings");
    gitLogo.src = "../IMAGES/github.png";
    iconeLogo.src = "../IMAGES/icone.png";
    darkModeCheckbox.checked = false; // Décocher la case du mode sombre
}

// Écouter les changements de l'utilisateur
darkModeCheckbox.addEventListener("change", () => {
    if (darkModeCheckbox.checked) {
        document.body.classList.add("dark-mode");
        rectangle.classList.add("dark-mode-settings");
        gitLogo.src = "../IMAGES/gitblanc.webp";
        iconeLogo.src = "../IMAGES/clair.png";

        // Sauvegarder l'état du mode sombre dans localStorage
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        rectangle.classList.remove("dark-mode-settings");
        gitLogo.src = "../IMAGES/github.png";
        iconeLogo.src = "../IMAGES/icone.png";

        // Sauvegarder l'état du mode sombre dans localStorage
        localStorage.setItem("darkMode", "disabled");
    }
});



// Changement de fond d'écran
const wallpaperChoices = document.querySelectorAll(".wallpaper-choice");

wallpaperChoices.forEach((img) => {
    img.addEventListener("click", () => {
        // Changer le fond d'écran
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";

        // Sauvegarder la préférence dans localStorage
        localStorage.setItem("background", img.src);
    });
});

// Récupérer et appliquer le fond d'écran enregistré
const savedBackground = localStorage.getItem("background");
if (savedBackground) {
    document.body.style.backgroundImage = `url(${savedBackground})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

