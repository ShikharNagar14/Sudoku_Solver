let arr = [];
for (let i = 0; i < 9; i++) {
    arr.push([]);
    for (let j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

let board = [];

function FillBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
        let response = JSON.parse(xhrRequest.response);
        board = response.board;
        FillBoard(board);
    };
    xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy');
    xhrRequest.send();
};

SolvePuzzle.onclick = () => {
    SolveSudoku(board);
};

function isValid(row, col, grid, p) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === p) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === p) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] === p) {
            return false;
        }
    }
    return true;
}

function SolveSudoku(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                for (let p = 1; p <= 9; p++) {
                    if (isValid(i, j, grid, p)) {
                        grid[i][j] = p;
                        if (SolveSudoku(grid)) {
                            FillBoard(grid);
                            return true;
                        }
                        grid[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
