import { WINNING_COMBINATIONS } from "./winning-combinations";
import { playSoundEffect } from "./audio-utils";

function checkWinner(board, player) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      board[a.row][a.col] === player &&
      board[b.row][b.col] === player &&
      board[c.row][c.col] === player
    ) {
      return true;
    }
  }
  return false;
}

function isBoardFull(board) {
  return board.flat().every((cell) => cell !== null);
}

function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
  if (checkWinner(board, "0")) {
    return 10 - depth;
  }
  if (checkWinner(board, "X")) {
    return depth - 10;
  }
  if (isBoardFull(board)) {
    return 0;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          board[row][col] = "0";
          let score = minimax(board, depth + 1, false, alpha, beta);
          board[row][col] = null;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          board[row][col] = "X";
          let score = minimax(board, depth + 1, true, alpha, beta);
          board[row][col] = null;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return bestScore;
  }
}

export function getAIMove(board) {
  let bestScore = -Infinity;
  let bestMove = null;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        board[row][col] = "0";
        let score = minimax(board, 0, false, -Infinity, Infinity);
        board[row][col] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = { row, col };
        }
      }
    }
  }

  return bestMove;
}

export function performAITurn(board, activePlayer, handlePlayerMove) {
  if (activePlayer === "0") {
    const aiMove = getAIMove(board);
    if (aiMove) {
      setTimeout(() => {
        handlePlayerMove(aiMove.row, aiMove.col, true);
        playSoundEffect("move", 0.5);
      }, 800);
    }
  }
}
