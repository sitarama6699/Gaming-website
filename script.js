// Welcome button
function showMessage() {
    alert("Welcome to Gaming Zone! Start playing now!");
}

// =====================
// TIC-TAC-TOE GAME
// =====================

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function play(cell, index) {
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer;

    if (checkWinner()) {
        document.getElementById("status").innerHTML =
            "Player " + currentPlayer + " Wins!";
        gameOver = true;
        return;
    }

    if (!board.includes("")) {
        document.getElementById("status").innerHTML = "Draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    document.getElementById("status").innerHTML =
        "Player " + currentPlayer + "'s Turn";
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerHTML = "";
    });

    document.getElementById("status").innerHTML =
        "Player X's Turn";
}
const songs = [
    "mixkit-cat-walk-371.mp3",
    "mixkit-fright-night-871.mp3",
    "mixkit-tech-house-vibes-130.mp3"
];

let currentSong = 0;

const music = document.getElementById("bgMusic");
const source = document.getElementById("musicSource");

function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    source.src = songs[currentSong];
    music.load();
    music.play();
}

function changeVolume() {
    music.volume =
        document.getElementById("volume").value;
}
