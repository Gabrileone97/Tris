
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Possibili combinazioni vincenti
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Gestione del click sulla cella
cells.forEach(cell => cell.addEventListener('click', cellClicked));
resetButton.addEventListener('click', resetGame);

function cellClicked(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Giocatore ${currentPlayer} ha vinto!`;
        gameActive = false;
    } else if (board.includes('') === false) {
        statusText.textContent = "Pareggio!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Turno del giocatore ${currentPlayer}`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Turno del giocatore ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
}