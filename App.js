const currentPlayerElement = document.getElementById("currentPlayer");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute("data"));

    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            endGame();
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            currentPlayerElement.textContent = currentPlayer;
        }
    }
}

function checkWin() {
    console.log("start")
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        console.log(pattern)
        const [a, b, c,] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells([a, b, c]);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].style.color = "red";
    });
}

function isDraw() {
    return gameBoard.every(cell => cell !== "");
}

function endGame(draw = false) {
    gameActive = false;
    if (!draw) {
        highlightWinningCells(getWinningCells());
    }
}

function getWinningCells() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        console.log("=================>",pattern)
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return [a, b, c];
        }
    }
    return [];
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    currentPlayerElement.textContent = currentPlayer;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "#000";
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
