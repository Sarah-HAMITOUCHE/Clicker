let score = 0;
let clickPower = 1;

let ampCount = 0;
let ampCost = 10;

let bandCount = 0;
let bandCost = 100;

let upgradeCost = 50;

const shopItems = {
  guitare: { cost: 50, production: 2, owned: 0 },
  piano: { cost: 150, production: 4, owned: 0 },
  tenues: { cost: 300, production: 6, owned: 0 },
};

const scoreDisplay = document.getElementById("score");
const clicker = document.getElementById("clicker");
const buyAmp = document.getElementById("buyAmp");
const buyBand = document.getElementById("buyBand");
const upgradeClick = document.getElementById("upgradeClick");

const ampDisplay = document.getElementById("ampCount");
const bandDisplay = document.getElementById("bandCount");
const clickPowerDisplay = document.getElementById("clickPower");

// Mise à jour de l'affichage
function updateDisplay() {
  scoreDisplay.textContent = Math.floor(score);
  ampDisplay.textContent = ampCount;
  bandDisplay.textContent = bandCount;
  clickPowerDisplay.textContent = clickPower;

  buyAmp.textContent = `Acheter un Ampli (${ampCost} beats) - +1 beat/sec`;
  buyBand.textContent = `Acheter un Groupe (${bandCost} beats) - +10 beats/sec`;
  upgradeClick.textContent = `Améliorer le clic (${upgradeCost} beats) - x2 puissance`;

  Object.keys(shopItems).forEach((item) => {
    const button = document.getElementById(`buy-${item}`);
    if (button) {
      button.textContent = `Acheter ${item} (${shopItems[item].cost} beats) - +${shopItems[item].production} beats/sec`;
    }
  });
}
const resetGameButton = document.getElementById("resetGame");

resetGameButton.addEventListener("click", () => {
  const confirmation = confirm("Voulez-vous vraiment tout réinitialiser ?");
  if (confirmation) {
    // Réinitialisation des variables principales
    score = 0;
    clickPower = 1;

    ampCount = 0;
    ampCost = 10;

    bandCount = 0;
    bandCost = 100;

    upgradeCost = 50;

    // Réinitialisation des améliorations
    Object.keys(shopItems).forEach((item) => {
      shopItems[item].cost = item === "guitare" ? 50 : item === "piano" ? 150 : 300;
      shopItems[item].owned = 0;
    });

    // Mise à jour de l'affichage
    updateDisplay();
  }
});
// Gestion des clics sur le bouton principal
clicker.addEventListener("click", () => {
  score += clickPower;
  updateDisplay();
});

// Gestion des achats d'amplis
buyAmp.addEventListener("click", () => {
  if (score >= ampCost) {
    score -= ampCost;
    ampCount++;
    ampCost = Math.floor(ampCost * 1.2);
    updateDisplay();
  }
});

// Gestion des achats de groupes
buyBand.addEventListener("click", () => {
  if (score >= bandCost) {
    score -= bandCost;
    bandCount++;
    bandCost = Math.floor(bandCost * 1.3);
    updateDisplay();
  }
});

// Gestion des améliorations de clic
upgradeClick.addEventListener("click", () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower *= 2;
    upgradeCost = Math.floor(upgradeCost * 2);
    updateDisplay();
  }
});

// Gestion des achats des améliorations (guitare, piano, tenues)
Object.keys(shopItems).forEach((item) => {
  const button = document.getElementById(`buy-${item}`);
  if (button) {
    button.addEventListener("click", () => {
      if (score >= shopItems[item].cost) {
        score -= shopItems[item].cost;
        shopItems[item].owned++;
        shopItems[item].cost = Math.floor(shopItems[item].cost * 1.5); // Augmentation du coût
        updateDisplay();
      }
    });
  }
});

// Production automatique (amplis, groupes, améliorations)
setInterval(() => {
  score += ampCount * 1 + bandCount * 10;
  Object.keys(shopItems).forEach((item) => {
    score += shopItems[item].owned * shopItems[item].production;
  });
  updateDisplay();
}, 1000);

// Initialisation de l'affichage
updateDisplay();

