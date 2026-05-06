
const weightedGrid = [
    [3, 4, 5, 7, 5, 4, 3],
    [4, 6, 8, 10, 8, 6, 4],
    [5, 7, 11, 13, 11, 7, 5],
    [5, 7, 11, 13, 11, 7, 5],
    [4, 6, 8, 10, 8, 6, 4],
    [3, 4, 5, 7, 5, 4, 3]
]

function checkWinPure(landingRow, x, player) {

    let comboCounter = 1;

    /* Horisontal axis */

    /* x- */
    for (let i = x - 1; i >= 0; i--) {
        let checkValue = board[landingRow][i];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    /* x+ */
    for (let i = x + 1; i <= 6; i++) {
        let checkValue = board[landingRow][i];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    /* Vertical axis */
    comboCounter = 1;

    for (let i = landingRow + 1; i <= 5; i++) {
        let checkValue = board[i][x];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    /* Diagonal axis \ */
    comboCounter = 1;

    /* left to right, down */
    for (let i = landingRow + 1, j = x + 1; i <= 5 && j <= 6; i++, j++) {
        let checkValue = board[i][j];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    /* right to left, up */
    for (let i = landingRow - 1, j = x - 1; i >= 0 && j >= 0; i--, j--) {
        let checkValue = board[i][j];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    /* Diagonal axis / */
    comboCounter = 1;

    /* left to right, up */
    for (let i = landingRow - 1, j = x + 1; i >= 0 && j <= 6; i--, j++) {
        let checkValue = board[i][j];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    /* right to left, down */
    for (let i = landingRow + 1, j = x - 1; i <= 5 && j >= 0; i++, j--) {
        let checkValue = board[i][j];

        if (checkValue === player.idTag) {
            comboCounter += 1;
        }
        else {
            break
        }
    }

    if (comboCounter >= 4) {
        return true
    }

    return false
}

function evaluate() {
    let maxScore = 0
    let minScore = 0
    let totalScore = 0

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                maxScore = maxScore + weightedGrid[rowIndex][colIndex]
            }
            else if (cell === 2) {
                minScore = minScore + weightedGrid[rowIndex][colIndex]
            }
        })
    })
    totalScore = maxScore - minScore
    return totalScore
}

function getValidCols() {
    let validCols = [];

    for (let col = 0; col <= 6; col++) {
        if (board[0][col] === 0) {
            validCols.push(col)
        }
    }
    return validCols
}


function miniMax(depth, isMaximizing, alpha, beta) {
    let bestScore = null
    let score = null
    let validCols = getValidCols()

    if (depth === 0 || validCols.length === 0) {
        return evaluate();
    }

    if (isMaximizing) {
        bestScore = -Infinity

        for (let i = 0; i < validCols.length; i++) {
            let col = validCols[i]
            let landingRow = dropPiece(col, players.player2);
            if (landingRow === null) continue
            if (checkWinPure(landingRow, col, players.player2)) {
                undropPiece(landingRow, col);
                return Infinity
            }

            if (checkWinPure(landingRow, col, players.player1)) {
                undropPiece(landingRow, col);
                return -Infinity
            }


            let score = miniMax(depth - 1, false, alpha, beta);
            undropPiece(landingRow, col);
            if (score > bestScore) bestScore = score;
            if (bestScore > alpha) alpha = bestScore;
            if (beta <= alpha) break;
        };
        return bestScore
    }

    if (isMaximizing === false) {
        bestScore = Infinity

        for (let i = 0; i < validCols.length; i++) {
            let col = validCols[i]
            let landingRow = dropPiece(col, players.player1);
            if (landingRow === null) continue

            if (checkWinPure(landingRow, col, players.player1)) {
                undropPiece(landingRow, col);
                return -Infinity
            }
            if (checkWinPure(landingRow, col, players.player2)) {
                undropPiece(landingRow, col);
                return Infinity
            }

            score = miniMax(depth - 1, true, alpha, beta);
            undropPiece(landingRow, col);
            if (score < bestScore) bestScore = score;
            if (bestScore < beta) beta = bestScore;
            if (beta <= alpha) break;
        };
        return bestScore
    }
}

function bestMove(depth) {
    let bestCol = 3
    let bestScore = Infinity
    let score = 0
    let validCols = getValidCols();

    for (let i = 0; i < validCols.length; i++) {
        let col = validCols[i]
        let landingRow = dropPiece(col, players.player2)
        if (landingRow === null) continue
        if (checkWinPure(landingRow, col, players.player2)) {
            undropPiece(landingRow, col)
            return col
        }
        undropPiece(landingRow, col)
    }

    for (let i = 0; i < validCols.length; i++) {
        let col = validCols[i]
        let landingRow = dropPiece(col, players.player1)
        if (landingRow === null) continue
        if (checkWinPure(landingRow, col, players.player1)) {
            undropPiece(landingRow, col)
            return col
        }
        undropPiece(landingRow, col)
    }

    for (let i = 0; i < validCols.length; i++) {
        let col = validCols[i]
        let landingRow = dropPiece(col, players.player2);
        if (landingRow === null) continue
        let score = miniMax(depth - 1, true, -Infinity, Infinity);
        undropPiece(landingRow, col)

        if (score < bestScore) {
            bestScore = score
            bestCol = col
        }
    };
    console.log('validCols:', validCols, 'scores:', /* add score logging */);
    console.log('bestCol:', bestCol, 'bestScore:', bestScore);
    return bestCol
}

