let progress = [0, 0, 0, 0, 0, 0, 0];
        let completed = 0;
        let terminal = document.getElementById("terminal");
        let skipMessage = document.getElementById("skipMessage");
        let startScreen = document.getElementById("startScreen");
        let startButton = document.getElementById("startButton");
        let steps = [
            "Connexion au serveur...",
            "Décryptage en cours...",
            "Analyse des fichiers...",
            "Authentification utilisateur...",
            "Chargement des modules de sécurité...",
            "Analyse des logs système...",
            "Déploiement du protocole sécurisé..."
        ];
        
        function updateProgress() {
            let output = "<strong>Gilet, Amel</strong>\n\nCHARGEMENT DES RESSOURCES (" + completed + "/7)\n";
            if (completed === 7) {
                output = output.replace("CHARGEMENT DES RESSOURCES (7/7)", "TOUTES LES RESSOURCES ONT ÉTÉ INSTALLÉES");
            }
            output += "Vérification de la RAM : " + (completed > 0 ? "RÉUSSI" : "ÉCHEC") + "\n";
            for (let i = 0; i < steps.length; i++) {
                output += steps[i] + progress[i] + "%\n";
            }
            if (completed === 7) {
                output += "\nTout le contenu a été installé, chargement sur le portfolio de Gilet Amel.";
                setTimeout(() => {
                    terminal.style.display = "none";
                    skipMessage.style.display = "none";
                    startScreen.style.display = "flex";
                }, 1000);
            }
            terminal.innerHTML = output.replace(/\n/g, '<br>');
        }
        
        function loadSteps() {
            let interval = setInterval(() => {
                let index = Math.floor(Math.random() * 7);
                if (progress[index] < 100) {
                    progress[index] += Math.floor(Math.random() * 15) + 30;
                    if (progress[index] > 100) progress[index] = 100;
                    if (progress[index] === 100) completed++;
                    updateProgress();
                }
                if (completed === 7) clearInterval(interval);
            }, 80);
        }
        
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                terminal.style.display = "none";
                skipMessage.style.display = "none";
                startScreen.style.display = "flex";
            }
        });
        
        startButton.addEventListener("click", function() {
            window.location.href = "./HTML/accueil.html";
        });
        
        setTimeout(() => {
            completed = 1;
            updateProgress();
            loadSteps();
        }, 1000);