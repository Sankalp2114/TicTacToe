const playBoxes = document.querySelectorAll('.play-box');
const restartBtn = document.getElementById('restartBtn');
const winner = document.getElementById('winner');

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";
let gameEnded = false; 

playBoxes.forEach(playbox => {
    playbox.addEventListener('click', (e) => {
        const target = e.target;
        if (gameEnded || target.innerText !== "") {
            return; 
        }
        target.innerText = currentPlayer;
        checkWin();
        changePlayer();
    });
});

restartBtn.addEventListener('click', () => {
    location.reload();
});

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
}

function checkWin() {
    for (let i = 0; i < wins.length; i++) {
        const win = wins[i];
        const [a, b, c] = win;
        const box1 = playBoxes[a];
        const box2 = playBoxes[b];
        const box3 = playBoxes[c];   
        if (box1.innerText === box2.innerText && box2.innerText === box3.innerText && box1.innerText !== "") {
            winner.innerText = (currentPlayer + " wins!");
            gameEnded = true; 
            restartBtn.classList.remove('hidden');
            break;
        }
    }

    if (!gameEnded) {
        const allPlayed = Array.from(playBoxes).every(box => box.innerText !== "");
        if (allPlayed) {
            winner.innerText = ("DRAW!");
            restartBtn.classList.remove('hidden');
            gameEnded = true; 
        }
    }
}
