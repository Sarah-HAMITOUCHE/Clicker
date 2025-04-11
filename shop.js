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