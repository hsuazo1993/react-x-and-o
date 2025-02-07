import { WINNING_COMBINATIONS } from "./winning-combinations"; // Import winning combinations
import { playSoundEffect } from "./audio-utils"; // Import for sound effects

// Helper function to check if a player has won
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

// Helper function to check if the board is full
function isBoardFull(board) {
    return board.flat().every(cell => cell !== null);
}

function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
    // Check for terminal states (win, lose, draw)
    if (checkWinner(board, "0")) {
        return 10 - depth;
    }
    if (checkWinner(board, "X")) {
        return depth - 10;
    }
    if (isBoardFull(board)) {
        return 0;
    }

    if (isMaximizingPlayer) { // AI's turn ("0")
        let bestScore = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    board[row][col] = "0";  // Make the move
                    let score = minimax(board, depth + 1, false, alpha, beta); // Recurse for opponent
                    board[row][col] = null; // Undo the move
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) {
                        break; // Beta cut-off
                    }
                }
            }
        }
        return bestScore;

    } else {  // Human's turn ("X")
        let bestScore = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    board[row][col] = "X"; // Make the move
                    let score = minimax(board, depth + 1, true, alpha, beta); // Recurse for AI
                    board[row][col] = null; // Undo the move
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, bestScore);
                    if(beta <= alpha){
                        break; // Alpha cut-off
                    }
                }
            }
        }
        return bestScore;
    }
}

//Gets best move.
export function getAIMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
                // Try the move
                board[row][col] = "0";
                let score = minimax(board, 0, false, -Infinity, Infinity); // Start minimax, AI is maximizing
                board[row][col] = null; // Undo the move

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { row, col };
                }
            }
        }
    }

    return bestMove;
}

// NEW FUNCTION: Handles the AI's turn
export function performAITurn(board, activePlayer, handlePlayerMove) {
  if (activePlayer === "0") { // Ensure it's the AI's turn
    const aiMove = getAIMove(board);
    if (aiMove) {
      setTimeout(() => {
        handlePlayerMove(aiMove.row, aiMove.col, true); // Mark as AI move
        playSoundEffect("move", 0.5); // Play sound effect
      }, 800);
    }
  }
}