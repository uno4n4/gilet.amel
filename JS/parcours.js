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

//

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
        if (isMinimized) {
            event.preventDefault();

            // Animation pour rouvrir la fenêtre
            rectangle.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            rectangle.style.transform = 'translate(0, 0) scale(1)';
            rectangle.style.opacity = '1';
            isMinimized = false;

            // Récupère la dernière page enregistrée ou ouvre accueil.html si aucune
            setTimeout(() => {
                const lastPage = localStorage.getItem("dernierePage");
                if (lastPage && lastPage !== "accueil.html") {
                    window.location.href = lastPage;
                } else {
                    window.location.href = "accueil.html";
                }
            }, 500);
        }
    });
});

// Menu : afficher/masquer
document.querySelector(".menu-btn").addEventListener("click", function() {
    let menu = document.querySelector(".pages");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
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

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop(); // Récupère le nom du fichier actuel

    // Les pages où la pastille doit apparaître
    const pagesWithActiveDot = ["contact.html", "cv.html", "parcours.html", "projets.html", "propos.html"];
    
    // Vérifie si la page actuelle est dans la liste des pages concernées
    if (pagesWithActiveDot.includes(currentPage)) {
        // Trouve l'image portfolio.png et ajoute la classe active
        const portfolioImage = document.querySelector('img[src="portfolio.png"]');
        if (portfolioImage) {
            portfolioImage.classList.add("active"); // Ajoute la pastille à l'image
        }
    }

    links.forEach(link => {
        const href = link.getAttribute("href").split("/").pop(); // Récupère juste le nom du fichier dans le href

        // Ajoute ou retire la classe active sur les liens du footer
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
