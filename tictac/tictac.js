const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');
const singlePlayerButton = document.getElementById('single-player');
const multiPlayerButton = document.getElementById('multi-player');

let currentPlayer = 'X';
let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];
let isSinglePlayer = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Event Listeners
singlePlayerButton.addEventListener('click', () => startGame(true));
multiPlayerButton.addEventListener('click', () => startGame(false));
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function startGame(singlePlayer) {
    isSinglePlayer = singlePlayer;
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) return;

    // Player's move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWinner();

    if (gameActive && isSinglePlayer) {
        // Switch to Computer's turn
        currentPlayer = 'O';
        computerMove();
    } else if (gameActive) {
        // Switch to the other player's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function computerMove() {
    if (!gameActive) return;

    // Find the best move using the Minimax algorithm
    const bestMove = getBestMove(gameState, 'O');
    gameState[bestMove] = 'O';
    cells[bestMove].textContent = 'O';

    checkForWinner();

    if (gameActive) {
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function getBestMove(board, player) {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    // Check for a winning move
    for (let move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = player;
        if (checkWin(newBoard, player)) {
            return move;
        }
    }

    // Check if the opponent can win in the next move and block them
    const opponent = player === 'O' ? 'X' : 'O';
    for (let move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = opponent;
        if (checkWin(newBoard, opponent)) {
            return move;
        }
    }

    // Try to take the center if available
    if (board[4] === '') {
        return 4;
    }

    // Try to take a corner if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => board[corner] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available edge
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(edge => board[edge] === '');
    if (availableEdges.length > 0) {
        return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    // If no moves are left (shouldn't happen in Tic-Tac-Toe)
    return -1;
}

function checkWin(board, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => 
        combination.every(index => board[index] === player)
    );
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCells();
        return;
    }

    if (!gameState.includes('')) {
        statusText.textContent = 'Game ended in a draw!';
        gameActive = false;
    }
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a] !== '') {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
        }
    });
}

function resetGame() {
    gameActive = false;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = 'Select a mode to start!';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}