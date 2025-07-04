const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";
let cells = Array(9).fill("");
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.textContent = cells[i];
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== "" || checkWinner()) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    showResult(`${currentPlayer} wins!`);
  } else if (cells.every(cell => cell !== "")) {
    showResult("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  statusText.textContent = "Turn: X";
  resultScreen.classList.add("hidden");
  createBoard();
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

createBoard();
