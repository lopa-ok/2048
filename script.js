const boardSize = 4;
let board;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  createBoard();
  addRandomTile();
  addRandomTile();
  updateBoard();
  document.addEventListener('keydown', handleKeyPress);
});

function createBoard() {
  board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `cell-${i}-${j}`;
      boardElement.appendChild(cell);
    }
  }
}

function addRandomTile() {
  const emptyCells = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }
  if (emptyCells.length > 0) {
    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

function updateBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      cell.textContent = board[i][j] === 0 ? '' : board[i][j];
      cell.dataset.value = board[i][j];
    }
  }
  document.getElementById('score').textContent = score;
}

function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
  }
  addRandomTile();
  updateBoard();
  if (checkGameOver()) {
    alert('Game Over!');
  }
}

function moveUp() {
  for (let j = 0; j < boardSize; j++) {
    let col = [];
    for (let i = 0; i < boardSize; i++) {
      col.push(board[i][j]);
    }
    col = merge(col);
    for (let i = 0; i < boardSize; i++) {
      board[i][j] = col[i];
    }
  }
}

function moveDown() {
  for (let j = 0; j < boardSize; j++) {
    let col = [];
    for (let i = 0; i < boardSize; i++) {
      col.push(board[i][j]);
    }
    col = merge(col.reverse()).reverse();
    for (let i = 0; i < boardSize; i++) {
      board[i][j] = col[i];
    }
  }
}

function moveLeft() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = merge(board[i]);
  }
}

function moveRight() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = merge(board[i].reverse()).reverse();
  }
}

function merge(row) {
  let newRow = row.filter(value => value !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter(value => value !== 0);
  while (newRow.length < boardSize) {
    newRow.push(0);
  }
  return newRow;
}

function checkGameOver() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) {
        return false;
      }
      if (i < boardSize - 1 && board[i][j] === board[i + 1][j]) {
        return false;
      }
      if (j < boardSize - 1 && board[i][j] === board[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}
