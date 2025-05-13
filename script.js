const winner = document.getElementById("winner");
const winnerContainer = document.getElementById("winnerContainer");
const gameButtons = document.querySelectorAll('.gameStart');
const game = document.getElementById("gameBoard");
const gameSelection = document.getElementById("gameSelection");
const music = document.getElementById("bg-music");
const toggleMusic = document.getElementById("toggleMusic");
const icon = toggleMusic.querySelector("i");
let cells = document.querySelectorAll(".case"); // use let instead of const

document.addEventListener("DOMContentLoaded", () => {
  
    gameButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Hide buttons
        gameButtons.forEach(btn => btn.style.display = 'none');

        //hide game mode selection
        gameSelection.style.display = 'none';

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

// gameplay
// multiplayer

const playerX ="X";
const playerO ="O";
var currentPlayer = "X";

const classX = "classX";
const classO = "classO";

var fillStyle = classX;

function multiPlayer() {
  cells.forEach(cell =>{
    cell.addEventListener("click", () => {

      if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        cell.classList.add(fillStyle);

        checkWin(currentPlayer);

        if(checkDraw()) {
         winner.innerText = "It's a Draw !"
         winnerContainer.classList.remove("hidden");
        };
 
        fillStyle = currentPlayer ==="X" ? classO : classX;
        currentPlayer = currentPlayer === "X" ? "O" : "X";  
      }
    })
  })
}

// game logic
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      cells[a].textContent === player &&
      cells[b].textContent === player &&
      cells[c].textContent === player
    ){
      winner.innerText = "Player " + player + " wins!";
      winnerContainer.classList.remove("hidden");

      // stop the game
      disableBoard();
      return;
    }
  }
}

function disableBoard() {
  cells.forEach(cell => {
    if(cell.textContent === ""){ cell.textContent = "."}
    cell.style.pointerEvents = "none";
    currentPlayer = "X";
  })
}

function checkDraw() {
  return Array.from(cells).every(cell => {
    const value = cell.textContent.trim();
    return value === 'X' || value === 'O';
  });
}

//single player
function singlePlayer() {
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      // Player move
      if (cell.textContent === "") {
        cell.textContent = "X";
        cell.classList.add(classX);
        checkWin("X");

        if (checkDraw()) {
          winner.innerText = "It's a Draw!";
          winnerContainer.classList.remove("hidden");
          return;
        }

        // Computer move after short delay
        setTimeout(() => {
          const computerIndex = emptyCell();

          if (computerIndex !== -1) {
            cells[computerIndex].textContent = "O";
            cells[computerIndex].classList.add(classO);
            checkWin("O");

            if (checkDraw()) {
              winner.innerText = "It's a Draw!";
              winnerContainer.classList.remove("hidden");
            }
          }
        }, 500); // delay to simulate thinking
      }
    });
  });
}

// Returns index of a random empty cell or -1 if none
function emptyCell() {
  const emptyCells = [];

  cells.forEach((cell, index) => {
    if (cell.textContent === "") {
      emptyCells.push(index);
    }
  });

  if (emptyCells.length === 0) return -1;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}


// reset game
function clearCellListeners() {
  const newCells = [];

  cells.forEach(cell => {
    const newCell = cell.cloneNode(false); // Remove all children and listeners
    cell.parentNode.replaceChild(newCell, cell);
    newCells.push(newCell);
  });

  return newCells;
}

function resetGame() {
  game.classList.add("hidden");
  winnerContainer.classList.add("hidden");
  gameSelection.style.display = 'block';
  gameButtons.forEach(btn => btn.style.display = 'block');

  music.pause();

  // Reset current player
  currentPlayer = "X";
  fillStyle = classX;

  // Remove all event listeners and reset content
  const newCells = clearCellListeners();

  newCells.forEach(cell => {
    cell.style.pointerEvents = "auto";
    cell.textContent = "";
    cell.classList.remove(classO, classX);
  });

  // Replace the global "cells" NodeList with the new one
  cells = newCells;
}

