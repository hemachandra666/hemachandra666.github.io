let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'single'; // 'single' or 'two'
let resultDiv = document.getElementById('result');
let restartButton = document.getElementById('restart');
let undoButton = document.getElementById('undo');
let undoIndex = -1;

function drawBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).innerHTML = board[i];
    }
}

function checkWin(player) {
    if (board[0] == player && board[1] == player && board[2] == player) {
        return true;
    }
    if (board[3] == player && board[4] == player && board[5] == player) {
        return true;
    }
    if (board[6] == player && board[7] == player && board[8] == player) {
        return true;
    }
    if (board[0] == player && board[3] == player && board[6] == player) {
        return true;
    }
    if (board[1] == player && board[4] == player && board[7] == player) {
        return true;
    }
    if (board[2] == player && board[5] == player && board[8] == player) {
        return true;
    }
    if (board[0] == player && board[4] == player && board[8] == player) {
        return true;
    }
    if (board[2] == player && board[4] == player && board[6] == player) {
        return true;
    }
    return false;
}

function checkDraw() {
    for (let i = 0; i < 9; i++) {
        if (board[i] == '') {
            return false;
        }
    }
    return true;
}

function playMove(index) {
    if (board[index] == '') {
        board[index] = currentPlayer;
        undoIndex = index;
        drawBoard();
        if (checkWin(currentPlayer)) {
            resultDiv.innerHTML = `${currentPlayer} won!`;
            restartButton.style.display = 'block';
            undoButton.style.display = 'none';
        } else if (checkDraw()) {
            resultDiv.innerHTML = 'It is a draw!';
            restartButton.style.display = 'block';
            undoButton.style.display = 'none';
        } else {
            currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
            undoButton.style.display = 'block';
            if (gameMode == 'single' && currentPlayer == 'O') {
                let index = getNextMove();
                playMove(index);
            }
        }
    }
}

function undoMove() {
    if (undoIndex != -1) {
        board[undoIndex] = '';
        undoIndex = -1;
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
        drawBoard();
        undoButton.style.display = 'none';
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    undoIndex = -1;
    drawBoard();
    resultDiv.innerHTML = '';
    restartButton.style.display = 'none';
    undoButton.style.display = 'none';
}

function cellClicked(index) {
    playMove(index);
}

function getNextMove() {
    // Implement AI logic here
    // Return the index of the cell to play next
}

drawBoard();

document.querySelectorAll('td').forEach((cell) => {
    cell.addEventListener('click', () => {
        cellClicked(parseInt(cell.id));
    });
});

restartButton.addEventListener('click', () => {
    restartGame();
});

undoButton.addEventListener('click', () => {
    undoMove();
});

