function showMessage() {
    alert("Welcome to Gaming Zone! Start playing now!");
}let currentPlayer = "X";
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
}const canvas = document.getElementById("gameCanvas");

if (canvas) {
    const ctx = canvas.getContext("2d");

    const box = 20;
    let snake = [{ x: 200, y: 200 }];

    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    let dx = box;
    let dy = 0;

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" && dy === 0) {
            dx = 0;
            dy = -box;
        }
        else if (event.key === "ArrowDown" && dy === 0) {
            dx = 0;
            dy = box;
        }
        else if (event.key === "ArrowLeft" && dx === 0) {
            dx = -box;
            dy = 0;
        }
        else if (event.key === "ArrowRight" && dx === 0) {
            dx = box;
            dy = 0;
        }
    });

    function draw() {
        ctx.clearRect(0, 0, 400, 400);

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        ctx.fillStyle = "lime";
        snake.forEach(part => {
            ctx.fillRect(part.x, part.y, box, box);
        });

        let headX = snake[0].x + dx;
        let headY = snake[0].y + dy;

        if (headX === food.x && headY === food.y) {
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
        } else {
            snake.pop();
        }

        if (
            headX < 0 || headX >= 400 ||
            headY < 0 || headY >= 400 ||
            snake.some(part => part.x === headX && part.y === headY)
        ) {
            alert("Game Over!");
            snake = [{ x: 200, y: 200 }];
            dx = box;
            dy = 0;
            return;
        }

        snake.unshift({ x: headX, y: headY });
    }

    setInterval(draw, 100);
}