// --- Lawan Bot ---
const boxes = document.querySelectorAll('.box');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#reset');
let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let running = true;

const winConditions = [
    [0, 1, 2],[0, 3, 6],[0, 4, 8],
    [3, 4, 5],[1, 4, 7],[2, 4, 6],
    [6, 7, 8],[2, 5, 8]
];

function initializeGame() {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
}

function boxClicked() {
    const boxIndex = this.getAttribute('data-index');
    if (board[boxIndex] !== '' || !running) {
        return;
    }
    updateBox(this, boxIndex);
    checkWinner();
    if (running) {
        setTimeout(botMove, 500); // Tambahkan jeda agar bot terlihat lebih alami
    }
}

function updateBox(box, index) {
    board[index] = currentPlayer;
    box.textContent = currentPlayer; // ✅ FIXED
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} wins!`;
            running = false;
            return;
        }
    }
    if (!board.includes('')) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function botMove() {
    let emptyBoxes = board.map((val, idx) => (val === '' ? idx : null)).filter(val => val !== null);
    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        board[randomIndex] = currentPlayer;
        boxes[randomIndex].textContent = currentPlayer; // ✅ FIXED
        checkWinner();
    }
}

function restartGame() {
    board = ['','','','','','','','',''];
    boxes.forEach(box => (box.textContent = ''));
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`; // ✅ FIXED
    running = true;
}

initializeGame();


