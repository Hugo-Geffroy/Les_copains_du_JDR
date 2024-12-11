let personnages = [];

// Fonction pour ajouter un personnage
function ajouterPersonnage() {
    const nom = prompt("Nom du personnage :") || "Inconnu";
    const race = prompt("Race du personnage :") || "Inconnu";
    const maxPv = parseInt(prompt("Points de vie max :")) || 100;
    const statistiqueAttaque = parseInt(prompt("Statistique d'attaque :")) || 0;
    const classeArmure = parseInt(prompt("Classe d'armure (CA) :")) || 0;

    const personnage = {
        id: Date.now(),
        nom,
        race,
        maxPv,
        pvActuel: maxPv,
        pvTemporaire: 0,
        statistiqueAttaque,
        classeArmure
    };

    personnages.push(personnage);
    afficherPersonnages();
}

// Fonction pour ajuster les PV principaux (+1 ou -1)
function ajusterPv(id, increment) {
    const personnage = personnages.find(p => p.id === id);
    if (personnage) {
        // Modifier les points de vie en respectant les limites
        personnage.pvActuel = Math.min(Math.max(0, personnage.pvActuel + increment), personnage.maxPv);
        afficherPersonnages();
    }
}

// Fonction pour ajuster les PV temporaires (+1 ou -1)
function ajusterPvTemporaire(id, increment) {
    const personnage = personnages.find(p => p.id === id);
    if (personnage) {
        // Empêche les points négatifs pour les points de vie temporaires
        personnage.pvTemporaire = Math.max(0, personnage.pvTemporaire + increment);
        afficherPersonnages();
    }
}

// Fonction pour supprimer un personnage
function supprimerPersonnage(id) {
    personnages = personnages.filter(p => p.id !== id);
    afficherPersonnages();
}

// Fonction pour afficher les personnages dans le DOM
function afficherPersonnages() {
    const sectionPersonnages = document.getElementById('personnages');
    
    // Effacer les personnages existants pour les rafraîchir
    sectionPersonnages.innerHTML = '';

    personnages.forEach(personnage => {
        const divPersonnage = document.createElement('div');
        divPersonnage.className = 'personnage';
        divPersonnage.innerHTML = `
            <h3>${personnage.nom} (${personnage.race})</h3>
            <p>Statistique d'attaque: ${personnage.statistiqueAttaque}</p>
            <p>Classe d'armure: ${personnage.classeArmure}</p>

            <!-- Affichage des points de vie avec la barre -->
            <div class="barre-sante">
                <div class="progression" style="width: ${(personnage.pvActuel / personnage.maxPv) * 100}%"></div>
                <span class="pv-text">${personnage.pvActuel} / ${personnage.maxPv}</span>
            </div>

            <!-- Affichage des points de vie temporaires avec la barre -->
            <div class="barre-sante temporaire">
                <div class="progression" style="width: ${(personnage.pvTemporaire / personnage.maxPv) * 100}%"></div>
                <span class="pv-text">${personnage.pvTemporaire}</span>
            </div>

            <!-- Boutons pour ajuster les PV principaux -->
            <div class="controls">
                <button onclick="ajusterPv(${personnage.id}, -1)">- PV</button>
                <button onclick="ajusterPv(${personnage.id}, 1)">+ PV</button>
            </div>

            <!-- Boutons pour ajuster les PV temporaires -->
            <div class="controls">
                <button onclick="ajusterPvTemporaire(${personnage.id}, -1)">- Temp</button>
                <button onclick="ajusterPvTemporaire(${personnage.id}, 1)">+ Temp</button>
            </div>

            <!-- Bouton pour supprimer le personnage -->
            <div class="controls">
                <button class="supprimer" onclick="supprimerPersonnage(${personnage.id})">Supprimer</button>
            </div>
        `;

        sectionPersonnages.appendChild(divPersonnage);
    });
}
