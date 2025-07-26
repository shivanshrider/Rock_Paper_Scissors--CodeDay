// app.js

document.addEventListener("DOMContentLoaded", () => {
  const mode = new URLSearchParams(window.location.search).get("mode");
  const status = document.getElementById("status");
  const result = document.getElementById("result");
  const choices = document.querySelectorAll(".choice");
  const player2Container = document.getElementById("player2-container");

  let player1Choice = "";
  let player2Choice = "";

  if (mode === "double") {
    player2Container.classList.remove("hidden");
    status.textContent = "Player 1, make your choice!";
  } else {
    status.textContent = "Choose Rock, Paper or Scissors!";
  }

  let currentPlayer = 1;

  choices.forEach(choice => {
    choice.addEventListener("click", () => {
      if (mode === "single") {
        player1Choice = choice.dataset.choice;
        const computerChoice = getComputerChoice();
        const winner = getWinner(player1Choice, computerChoice);
        showResult(player1Choice, computerChoice, winner);
      } else {
        if (currentPlayer === 1) {
          player1Choice = choice.dataset.choice;
          status.textContent = "Player 2, make your choice!";
          currentPlayer = 2;
        } else {
          player2Choice = choice.dataset.choice;
          const winner = getWinner(player1Choice, player2Choice);
          showResult(player1Choice, player2Choice, winner);
          currentPlayer = 1;
          status.textContent = "Player 1, make your choice!";
        }
      }
    });
  });

  function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
  }

  function getWinner(p1, p2) {
    if (p1 === p2) return "It's a draw!";
    if (
      (p1 === "rock" && p2 === "scissors") ||
      (p1 === "paper" && p2 === "rock") ||
      (p1 === "scissors" && p2 === "paper")
    ) {
      return mode === "single" ? "You win!" : "Player 1 wins!";
    } else {
      return mode === "single" ? "Computer wins!" : "Player 2 wins!";
    }
  }

  function showResult(p1, p2, winnerText) {
    result.innerHTML = `
      <p class="mt-4 text-xl">Player 1 chose: <strong>${capitalize(p1)}</strong></p>
      <p class="text-xl">${mode === "single" ? "Computer" : "Player 2"} chose: <strong>${capitalize(p2)}</strong></p>
      <p class="mt-4 text-2xl font-bold">${winnerText}</p>
    `;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
