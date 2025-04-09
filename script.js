// ========== CONFIGURATION DU JEU ==========
let gameState = {
  points: 0,
  clickValue: 1,
  autoProduction: 0,
  itemsOwned: {
    guitare: 0,
    piano: 0,
    tenues: 0
  },
  upgradesPurchased: {
    meilleurScript: false
  }
};

// ========== ÉLÉMENTS DU DOM ==========
const pointsDisplay = document.getElementById('points');
const clickerBtn = document.getElementById('clicker');
const resetBtn = document.getElementById('reset-btn');
const shopItems = {
  guitare: document.querySelector('[data-id="stagiaire"]'),
  piano: document.querySelector('[data-id="camera"]'),
  tenues: document.querySelector('[data-id="star"]')
};
const upgrades = {
  meilleurScript: document.querySelector('[data-id="meilleur-script"]')
};

// ========== FONCTIONS PRINCIPALES ==========

// Charge la sauvegarde
function loadGame() {
  const savedData = localStorage.getItem('filmClickerSave');
  if (savedData) {
    Object.assign(gameState, JSON.parse(savedData));
  }
  updateDisplay();
}

// Sauvegarde la partie
function saveGame() {
  localStorage.setItem('filmClickerSave', JSON.stringify(gameState));
}

// Met à jour l'affichage
function updateDisplay() {
  pointsDisplay.textContent = gameState.points;
  
  // Met à jour les compteurs d'objets possédés
  for (const [item, element] of Object.entries(shopItems)) {
    element.querySelector('.owned').textContent = gameState.itemsOwned[item];
  }
  
  // Désactive les améliorations déjà achetées
  if (gameState.upgradesPurchased.meilleurScript) {
    upgrades.meilleurScript.querySelector('button').disabled = true;
  }
}

// Réinitialise le jeu
function resetGame() {
  if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {
    gameState = {
      points: 0,
      clickValue: 1,
      autoProduction: 0,
      itemsOwned: {
        guitare: 0,
        piano: 0,
        tenues: 0
      },
      upgradesPurchased: {
        meilleurScript: false
      }
    };
    localStorage.removeItem('filmClickerSave');
    updateDisplay();
  }
}

// ========== ÉVÉNEMENTS ==========

// Clic manuel
clickerBtn.addEventListener('click', () => {
  gameState.points += gameState.clickValue;
  updateDisplay();
  saveGame();
});

// Boutique
for (const [item, element] of Object.entries(shopItems)) {
  const btn = element.querySelector('button');
  const cost = parseInt(element.getAttribute('data-cost'));
  const production = parseInt(element.getAttribute('data-production'));
  
  btn.addEventListener('click', () => {
    if (gameState.points >= cost) {
      gameState.points -= cost;
      gameState.autoProduction += production;
      gameState.itemsOwned[item]++;
      updateDisplay();
      saveGame();
    } else {
      alert("Pas assez de points !");
    }
  });
}

// Améliorations
upgrades.meilleurScript.querySelector('button').addEventListener('click', () => {
  const cost = parseInt(upgrades.meilleurScript.getAttribute('data-cost'));
  
  if (gameState.points >= cost && !gameState.upgradesPurchased.meilleurScript) {
    gameState.points -= cost;
    gameState.clickValue *= 2;
    gameState.upgradesPurchased.meilleurScript = true;
    updateDisplay();
    saveGame();
  }
});

// Réinitialisation
resetBtn.addEventListener('click', resetGame);

// Production automatique
setInterval(() => {
  if (gameState.autoProduction > 0) {
    gameState.points += gameState.autoProduction;
    updateDisplay();
    saveGame();
  }
}, 1000);

// ========== INITIALISATION ==========
loadGame();