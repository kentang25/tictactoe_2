const boxs = document.querySelectorAll('.box');
const restartBtn = document.querySelector('#reset');
const sttsText = document.querySelector('#status');
let papan = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let turn = true; // X mulai duluan

const conditions = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], 
    [3, 4, 5], [1, 4, 7], [2, 4, 6], 
    [6, 7, 8], [2, 5, 8]
];

function Game() {
    boxs.forEach(box => box.addEventListener('click', Clicked));
    restartBtn.addEventListener('click', restartGame);
    sttsText.textContent = `Giliran Player X`; // Status awal
}

function Clicked() {
    const boxIndex = this.getAttribute('data-index');

    if (papan[boxIndex] !== "" || !turn) {
        return;
    }

    updatebox(this, boxIndex);
    checkWinner();
}

function updatebox(box, index) {
    // let currentSymbol = turn ? "X" : "O"; // Pastikan simbol sesuai dengan giliran
    papan[index] = currentPlayer;
    box.textContent = currentPlayer;

    // turn = !turn; // Pindah giliran
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    sttsText.textContent = `Giliran Player ${currentPlayer}`;
}

function checkWinner() {
    for (const condi of conditions) {
        const [a, b, c] = condi;
        if (papan[a] && papan[a] === papan[b] && papan[a] === papan[c]) {
            sttsText.textContent = `Player ${papan[a]} menang!`;
            turn = false; // Hentikan permainan
            return;
        }
    }

    if (!papan.includes("")) {
        sttsText.textContent = `Seri!`;
        turn = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    papan = ["", "", "", "", "", "", "", "", ""];
    boxs.forEach(box => (box.textContent = ""));
    turn = true; // X mulai duluan setelah reset
    sttsText.textContent = `Giliran Player X`;
}

Game();
