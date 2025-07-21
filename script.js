//your JS code here. If required.
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let board = Array(9).fill("");
let gameOver = false;

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names!");
    return;
  }

  document.getElementById("form-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  document.querySelector(".message").innerText = `${player1}, you're up`;
});

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameOver || cell.innerText !== "") return;

    const id = parseInt(cell.id) - 1;
    board[id] = currentPlayer;
    cell.innerText = currentPlayer;

    const winner = checkWinner();

    if (winner) {
      gameOver = true;
      const name = currentPlayer === "X" ? player1 : player2;
      document.querySelector(".message").innerText = `${name}, congratulations you won!`;
      highlightWinningCells(winner.combo);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const nextPlayer = currentPlayer === "X" ? player1 : player2;
      document.querySelector(".message").innerText = `${nextPlayer}, you're up`;
    }
  });
});

function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], combo };
    }
  }

  return null;
}

function highlightWinningCells(cells) {
  cells.forEach((index) => {
    document.getElementById((index + 1).toString()).classList.add("winning-cell");
  });
}