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

    // Supprime "dernierePage" du localStorage pour que portfolio.png ramène à accueil.html
    localStorage.removeItem("dernierePage");

    // Optionnel : Supprime aussi "dernierePagePortfolio" si tu veux éviter que cela interfère
    localStorage.removeItem("dernierePagePortfolio");
});


// Stocke la page actuelle dans le localStorage à chaque chargement si on est sur une page du portfolio
if (window.location.pathname.includes("contact.html") || window.location.pathname.includes("cv.html") || window.location.pathname.includes("projet.html") || window.location.pathname.includes("parcours.html") || window.location.pathname.includes("propos.html")) {
    if (!localStorage.getItem("dernierePagePortfolio")) { // Ne mettre à jour que si aucune page n'est enregistrée
        localStorage.setItem("dernierePagePortfolio", window.location.href);
    }
}

// Portfolio : réouvrir la dernière page
document.querySelector("#portfolio-link").addEventListener("click", function (event) {
    event.preventDefault();

    const dernierePage = localStorage.getItem("dernierePagePortfolio");

    if (dernierePage) {
        // Si une page du portfolio a été visitée, on y retourne
        window.location.href = dernierePage;
    } else {
        // Sinon, on va sur accueil.html
        window.location.href = "accueil.html";
    }
});


// Stocke la page actuelle dans le localStorage à chaque chargement
localStorage.setItem("dernierePagePortfolio", window.location.href);



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
let currentPage = window.location.href; // Sauvegarde de l'URL actuelle

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
            event.preventDefault(); // Empêche la navigation tant que l'animation n'est pas terminée

            // Animation pour rouvrir la fenêtre
            rectangle.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            rectangle.style.transform = 'translate(0, 0) scale(1)';
            rectangle.style.opacity = '1';
            isMinimized = false;

            // On attend la fin de l'animation pour permettre la navigation
            setTimeout(() => {
                if (parentLink && parentLink.getAttribute('href')) {
                    window.location.href = parentLink.getAttribute('href');
                }
            }, 500); // 500ms pour laisser l'animation se terminer
        } else {
            // Si la fenêtre n'est pas réduite, on peut naviguer directement
            if (parentLink && parentLink.getAttribute('href')) {
                window.location.href = parentLink.getAttribute('href');
            }
        }
    });
});

// Menu : afficher/masquer
document.querySelector(".menu-btn").addEventListener("click", function() {
    let menu = document.querySelector(".pages");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});


document.addEventListener("DOMContentLoaded", () => {
    // Récupère le nom de la page actuelle
    const currentPage = window.location.pathname.split("/").pop(); 
    console.log("Page actuelle :", currentPage);  // Afficher la page actuelle dans la console

    // Liste des pages où la pastille doit apparaître
    const pagesWithActiveDot = ["contact.html", "cv.html", "parcours.html", "projets.html", "propos.html"];
    console.log("Pages concernées :", pagesWithActiveDot);  // Afficher les pages concernées dans la console

    // Vérifie si la page actuelle est dans la liste des pages concernées
    if (pagesWithActiveDot.includes(currentPage)) {
        const portfolioImage = document.querySelector('img[src="portfolio.png"]');
        console.log("Image portfolio trouvée :", portfolioImage);  // Vérifier si l'image a été trouvée dans le DOM

        if (portfolioImage) {
            // Ajoute la classe active à l'image
            portfolioImage.classList.add("active");
            console.log("Classe 'active' ajoutée à l'image portfolio.png");
        } else {
            console.log("Image portfolio.png non trouvée");
        }
    } else {
        // Si la page n'est pas dans la liste, supprime la classe active de l'image
        const portfolioImage = document.querySelector('img[src="portfolio.png"]');
        if (portfolioImage) {
            portfolioImage.classList.remove("active");
            console.log("Classe 'active' supprimée de l'image portfolio.png");
        }
    }

    // Gérer les liens du footer
    links.forEach(link => {
        const href = link.getAttribute("href").split("/").pop(); // Récupère juste le nom du fichier dans le href
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
