document.addEventListener("DOMContentLoaded", () => {
    const gameButtons = document.querySelectorAll('.gameStart');
    const game = document.getElementById("gameBoard");
  
    gameButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Hide buttons
        gameButtons.forEach(btn => btn.style.display = 'none');

        //hide game mode selection
        document.getElementById("gameSelection").style.display = 'none';
  
        // Show game: remove hidden and fade in
        game.classList.remove("hidden");
        void game.offsetWidth; // force reflow
        game.classList.add("show");
      });
    });
  });
  
