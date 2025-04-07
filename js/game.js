// Récupérer les éléments DOM
const clickButton = document.getElementById('clickButton');
const clicksDisplay = document.getElementById('clicks');

// Initialiser le nombre de clics à partir du localStorage ou à 0 si aucun
let clicks = localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0;

// Afficher le nombre de clics dans le DOM
function updateClicks() {
    clicksDisplay.textContent = clicks;
}

// Ajouter un événement de clic sur le bouton
clickButton.addEventListener('click', () => {
    clicks++;  // Incrémenter le nombre de clics
    localStorage.setItem('clicks', clicks);  // Sauvegarder dans localStorage
    updateClicks();  // Mettre à jour l'affichage
});

// Initialiser l'affichage au démarrage
updateClicks();
