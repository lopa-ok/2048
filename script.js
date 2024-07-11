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
    updateBoard();
    checkGameOver();
  }
}

function updateBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      cell.textContent = board[i][j] === 0 ? '' : board[i][j];
      cell.dataset.value = board[i][j];
      cell.classList.remove('new', 'merging');
    }
  }
  document.getElementById('score').textContent = score;
}

function handleKeyPress(event) {
  let moved = false;
  switch (event.key) {
    case 'ArrowUp':
      moved = moveUp();
      break;
    case 'ArrowDown':
      moved = moveDown();
      break;
    case 'ArrowLeft':
      moved = moveLeft();
      break;
    case 'ArrowRight':
      moved = moveRight();
      break;
  }
  if (moved) {
    addRandomTile();
    updateBoard();
  }
}

function moveUp() {
  let moved = false;
  for (let j = 0; j < boardSize; j++) {
    for (let i = 1; i < boardSize; i++) {
      if (board[i][j] !== 0) {
        let k = i;
        while (k > 0 && board[k - 1][j] === 0) {
          board[k - 1][j] = board[k][j];
          board[k][j] = 0;
          k--;
          moved = true;
        }
        if (k > 0 && board[k - 1][j] === board[k][j]) {
          board[k - 1][j] *= 2;
          score += board[k - 1][j];
          board[k][j] = 0;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function moveDown() {
  let moved = false;
  for (let j = 0; j < boardSize; j++) {
    for (let i = boardSize - 2; i >= 0; i--) {
      if (board[i][j] !== 0) {
        let k = i;
        while (k < boardSize - 1 && board[k + 1][j] === 0) {
          board[k + 1][j] = board[k][j];
          board[k][j] = 0;
          k++;
          moved = true;
        }
        if (k < boardSize - 1 && board[k + 1][j] === board[k][j]) {
          board[k + 1][j] *= 2;
          score += board[k + 1][j];
          board[k][j] = 0;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function moveLeft() {
  let moved = false;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 1; j < boardSize; j++) {
      if (board[i][j] !== 0) {
        let k = j;
        while (k > 0 && board[i][k - 1] === 0) {
          board[i][k - 1] = board[i][k];
          board[i][k] = 0;
          k--;
          moved = true;
        }
        if (k > 0 && board[i][k - 1] === board[i][k]) {
          board[i][k - 1] *= 2;
          score += board[i][k - 1];
          board[i][k] = 0;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function moveRight() {
  let moved = false;
  for (let i = 0; i < boardSize; i++) {
    for (let j = boardSize - 2; j >= 0; j--) {
      if (board[i][j] !== 0) {
        let k = j;
        while (k < boardSize - 1 && board[i][k + 1] === 0) {
          board[i][k + 1] = board[i][k];
          board[i][k] = 0;
          k++;
          moved = true;
        }
        if (k < boardSize - 1 && board[i][k + 1] === board[i][k]) {
          board[i][k + 1] *= 2;
          score += board[i][k + 1];
          board[i][k] = 0;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function checkGameOver() {
  let gameOver = true;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0 ||
        (i < boardSize - 1 && board[i][j] === board[i + 1][j]) ||
        (j < boardSize - 1 && board[i][j] === board[i][j + 1])) {
        gameOver = false;
        break;
      }
    }
    if (!gameOver) {
      break;
    }
  }
  if (gameOver) {
    showGameOverModal();
  }
}

function showGameOverModal() {
  const modal = document.getElementById('game-over-modal');
  const scoreElement = document.getElementById('game-over-score');
  scoreElement.textContent = score;
  modal.style.display = 'flex';
}

function restartGame() {
  const modal = document.getElementById('game-over-modal');
  modal.style.display = 'none';
  score = 0;
  createBoard();
  addRandomTile();
  addRandomTile();
  updateBoard();
}