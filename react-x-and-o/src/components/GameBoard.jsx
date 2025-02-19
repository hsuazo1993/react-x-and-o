import React from "react";

export default function GameBoard({ onPlayerMove, gameBoard }) {
  function handleCellClick(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] === null) {
      onPlayerMove(rowIndex, colIndex);
    }
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
