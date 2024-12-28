let currentPlayer = 'X';
        let board = ['', '', '', '', '', '', '', '', ''];

        function makeMove(cell, index) {
            if (cell.innerHTML === '' && board[index] === '') {
                cell.innerHTML = currentPlayer;
                board[index] = currentPlayer;
                if (checkWin()) {
                    alert(currentPlayer + ' wins!');
                    resetGame();
                } else if (board.every(cell => cell !== '')) {
                    alert('It\'s a draw!');
                    resetGame();
                }
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function checkWin() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
                [0, 4, 8], [2, 4, 6] // diagonal
            ];
            return winPatterns.some(pattern => {
                return pattern.every(index => board[index] === currentPlayer);
            });
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
            currentPlayer = 'X';
        }