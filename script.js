document.addEventListener("DOMContentLoaded", () => {
    const gameButtons = document.querySelectorAll('.gameStart');
    const game = document.getElementById("gameBoard");
    const music = document.getElementById("bg-music");
    const toggleMusic = document.getElementById("toggleMusic");
    const icon = toggleMusic.querySelector("i");
  
    gameButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Hide buttons
        gameButtons.forEach(btn => btn.style.display = 'none');

        //hide game mode selection
        document.getElementById("gameSelection").style.display = 'none';

        //start music
        music.play();
  
        // Show game: remove hidden and fade in
        game.classList.remove("hidden");
        void game.offsetWidth; // force reflow
        game.classList.add("show");
      });
    });

    //music toggle
    toggleMusic.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
      } else {
        music.pause();
        icon.classList.remove("fa-pause")
        icon.classList.add("fa-play");
      }
    });
  });
  
