let score = 0;
let clickPower = 1;
let clickLevel = 1;

let ampCount = 0;
let ampCost = 10;

let bandCount = 0;
let bandCost = 100;

let upgradeCost = 50;

const scoreDisplay = document.getElementById("score");
const clicker = document.getElementById("clicker");
const buyAmp = document.getElementById("buyAmp");
const buyBand = document.getElementById("buyBand");
const upgradeClick = document.getElementById("upgradeClick");

const ampDisplay = document.getElementById("ampCount");
const bandDisplay = document.getElementById("bandCount");
const clickPowerDisplay = document.getElementById("clickPower");
const clickLevelDisplay = document.getElementById("clickLevel");

function updateDisplay() {
  scoreDisplay.textContent = Math.floor(score);
  ampDisplay.textContent = ampCount;
  bandDisplay.textContent = bandCount;
  clickPowerDisplay.textContent = clickPower;
  clickLevelDisplay.textContent = clickLevel;

  buyAmp.textContent = `Acheter un Ampli (${ampCost} beats) - +1 beat/sec`;
  buyBand.textContent = `Acheter un Groupe (${bandCost} beats) - +10 beats/sec`;
  upgradeClick.textContent = `Améliorer le clic (${upgradeCost} beats) - x2 puissance`;
}

clicker.addEventListener("click", () => {
  score += clickPower;
  updateDisplay();
});

buyAmp.addEventListener("click", () => {
  if (score >= ampCost) {
    score -= ampCost;
    ampCount++;
    ampCost = Math.floor(ampCost * 1.2);
    updateDisplay();
  }
});

buyBand.addEventListener("click", () => {
  if (score >= bandCost) {
    score -= bandCost;
    bandCount++;
    bandCost = Math.floor(bandCost * 1.3);
    updateDisplay();
  }
});

upgradeClick.addEventListener("click", () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickLevel++;
    clickPower *= 2;
    upgradeCost = Math.floor(upgradeCost * 2);
    updateDisplay();
  }
});

setInterval(() => {
  score += ampCount * 1 + bandCount * 10;
  updateDisplay();
}, 1000);

updateDisplay();
