let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]



const players = {
    player1: { color: 'red', idTag: 1 },
    player2: { color: 'blue', idTag: 2 }
}

const hero = document.querySelector('.hero')
const gameContainer = document.querySelector('.game-container')
const gameGrid = document.getElementById('grid-4');
const msgContainer = document.getElementById('message-container')
const msgDisplay = document.querySelector('.messageDisplay')
const winDisplay = document.getElementById('winDisplay')
const closeBtn = document.getElementById('closeBtn')
const pOne = document.querySelector('.pOne')
const pTwo = document.querySelector('.pTwo')
const slider = document.querySelector('.slider');

let currentPlayer = players.player1;
let gameWon = false;
let gameStarted = false;
let tileCounter = 0;

function restartGame() {
    msgContainer.classList.remove('active');

    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]

    currentPlayer = players.player1;
    gameWon = false;
    tileCounter = 0;

    playerIndication(pOne, currentPlayer.color);
    rendering();

}

function start() {

    if (gameStarted === false) {
        gameStarted = true;
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                tile = document.createElement('div');
                tile.classList.add('tile');
                tile.dataset.row = rowIndex;
                tile.dataset.col = colIndex;
                tile.addEventListener('click', placer)
                gameGrid.appendChild(tile);

            })

        })
        hero.classList.add('inactive')
        gameContainer.classList.add('visible')


        playerIndication(pOne, currentPlayer.color);
        rendering();
    }
    else {
        return;
    }
}

function rendering() {

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            tile = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);

            if (cell === 1) {
                tile.classList.add('red');
            }
            else if (cell === 2) {
                tile.classList.add('blue');
            }
            else if (cell === 0) {
                tile.classList.remove('red');
                tile.classList.remove('blue');
            }
        })
    })
}

function animation(landingRow, x) {
    tile = document.querySelector(`[data-row="${landingRow}"][data-col="${x}"]`);
    tile.classList.add('css-fallAnimation')
    tile.addEventListener('animationend', () => {
        tile.classList.remove('css-fallAnimation')
    })
}

function placer(event) {
    if (gameWon === true) {
        return
    }

    let y = parseInt(event.target.dataset.row);
    let x = parseInt(event.target.dataset.col);
    let landingRow = null;


    for (let i = 5; i >= 0; i--) {
        let checkValue = board[i][x];
        if (checkValue === 0) {
            landingRow = i
            break
        }
    }
    if (landingRow === null) {
        /* popUp('this colomn is full') */
        /* add shake animation */
        alert('this colomn is full')
        return;
    }

    board[landingRow][x] = currentPlayer.idTag;

    checkWin(landingRow, x);
    tileCounter += 1
    if (tileCounter === 42 && gameWon === false) {

        rendering();
        animation(landingRow, x);
        popUp('The game ends in a draw.')
        return;
    }
    rendering();
    animation(landingRow, x);
    switchPlayer();
}

function switchPlayer() {
    if (currentPlayer.idTag == 1) {
        currentPlayer = players.player2;
        playerIndication(pTwo, currentPlayer.color);
    }
    else {
        currentPlayer = players.player1;
        playerIndication(pOne, currentPlayer.color);
    }
}

function checkWin(landingRow, x) {

    let comboCounter = 1;
    let winner = currentPlayer
    let comboLeft = null
    let comboRight = null
    let comboBottom = null

    /* Horisontal axis */

    /* x- */
    for (let i = x - 1; i >= 0; i--) {
        let checkValue = board[landingRow][i];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            comboLeft = comboCounter - 1;
            /* console.log(comboLeft + " to the left") */
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }

    /* x+ */
    for (let i = x + 1; i <= 6; i++) {
        let checkValue = board[landingRow][i];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            comboRight = comboCounter - comboLeft - 1;
            /* console.log(comboRight + ' to the right') */
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }

    /* Vertical axis */
    comboCounter = 1;

    for (let i = landingRow + 1; i <= 5; i++) {
        let checkValue = board[i][x];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            /* comboBottom = comboCounter-1
            console.log(comboBottom+' on the bottom') */
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }

    /* Diagonal axis \ */
    comboCounter = 1;

    /* left to right, down */
    for (let i = landingRow + 1, j = x + 1; i <= 5 && j <= 6; i++, j++) {
        let checkValue = board[i][j];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }

    /* right to left, up */
    for (let i = landingRow - 1, j = x - 1; i >= 0 && j >= 0; i--, j--) {
        let checkValue = board[i][j];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }

    /* Diagonal axis / */
    comboCounter = 1;

    /* left to right, up */
    for (let i = landingRow - 1, j = x + 1; i >= 0 && j <= 6; i--, j++) {
        let checkValue = board[i][j];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }

    /* right to left, down */
    for (let i = landingRow + 1, j = x - 1; i <= 5 && j >= 0; i++, j--) {
        let checkValue = board[i][j];

        if (checkValue === currentPlayer.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        gameStarted = false;
        gameWon = true;
        popUp(`Player ${String(winner.idTag)} wins`)
        return
    }
}



function popUp(message) {
    setTimeout(() => {
        msgContainer.classList.add('active');
        winDisplay.innerHTML = message;
    }, 750)
}

function closeMsg() {
    msgContainer.classList.remove('active');
}

function playerIndication(player, color) {
    const rect = player.getBoundingClientRect();
    const parentRect = player.parentElement.getBoundingClientRect();

    const centerX = rect.left - parentRect.left + rect.width / 2;
    const bottomY = rect.bottom - parentRect.top;
    slider.style.left = centerX + "px";
    slider.style.top = bottomY + "px";
    slider.style.transform = "translateX(-50%)";
    slider.style.backgroundColor = color;

}