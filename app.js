let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let isSinglePlayer = false;

const statusDisplay = document.querySelector(".game--status");
const cells = document.querySelectorAll(".cell");

// Get game mode from URL
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  if (mode === "single") {
    isSinglePlayer = true;
    statusDisplay.innerHTML = "Single Player Mode: Your Turn (X)";
  } else {
    statusDisplay.innerHTML = "Multiplayer Mode: Player X's Turn";
  }
};

// Winning combinations
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (board[clickedIndex] !== "" || !isGameActive) return;

  handleCellPlayed(clickedCell, clickedIndex);
  handleResultValidation();

  if (isSinglePlayer && currentPlayer === "O" && isGameActive) {
    setTimeout(computerMove, 500); // Delay to simulate thinking
  }
}

function handleCellPlayed(cell, index) {
  board[index] = currentPlayer;
  cell.innerHTML = `<span class="text-4xl font-bold text-white">${currentPlayer}</span>`;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.innerHTML = "Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (isSinglePlayer) {
    statusDisplay.innerHTML = `Your Turn (${currentPlayer === "X" ? "X" : "O"})`;
  } else {
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
  }
}

function computerMove() {
  const availableIndices = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  const cell = document.querySelector(`[data-cell-index='${randomIndex}']`);
  handleCellPlayed(cell, randomIndex);
  handleResultValidation();
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusDisplay.innerHTML = isSinglePlayer
    ? "Single Player Mode: Your Turn (X)"
    : "Multiplayer Mode: Player X's Turn";

  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
}

// Attach event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
document.querySelector(".game--restart").addEventListener("click", restartGame);
