import { useState, useEffect } from "react";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameLogic from "./game-logic";
import GameOver from "./components/GameOver";
import GameModeSelector from "./components/GameModeSelector";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [isValidGameResult, setIsValidGameResult] = useState(false);
  const [result, setResult] = useState(null);
  const [gameBoard, setGameBoard] = useState(GameLogic.getInitialGameBoard());
  const [selectedMode, setSelectedMode] = useState("AI");

  GameLogic.setGameData();

  function handlePlayerMove(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [...prevGameBoard];
      updatedGameBoard[rowIndex][colIndex] = activePlayer;
      return updatedGameBoard;
    });

    GameLogic.registerLog(
      `${
        GameLogic.getPlayerInfo(activePlayer).name
      } moved to ${rowIndex},${colIndex}`
    );
  }

  useEffect(() => {
    if (gameBoard.flat().some((cell) => cell !== null)) {
      const currentGameState = GameLogic.checkGameState(
        gameBoard,
        activePlayer
      );
      handleGameResult(currentGameState);
      setActivePlayer((currentActivePlayer) =>
        currentActivePlayer === "X" ? "0" : "X"
      );
    }
  }, [gameBoard]);

  const handleGameResult = (state) => {
    if (state) {
      setIsValidGameResult(true);
      setResult(state);

      console.table(gameBoard);

      (state === "X" || state === "0") && GameLogic.addPlayerWin(state);
    }
  };

  function resetGame(gameModeChanged = false) {
    setActivePlayer("X");
    setIsValidGameResult(false);
    setGameBoard(GameLogic.getInitialGameBoard());
    GameLogic.resetGame(gameModeChanged);
  }

  function handleNewMatch() {
    resetGame();
  }

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    resetGame(true);
  };

  return (
    <main>
      <GameModeSelector
        selectedMode={selectedMode}
        onSelectMode={handleModeSelect}
      />
      <div id="players-container">
        {" "}
        {/* New container for players */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={GameLogic.getPlayerInfo("X").name}
            score={GameLogic.getPlayerInfo("X").wins}
            symbol="X"
            gameMode={selectedMode}
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={GameLogic.getPlayerInfo("0").name}
            score={GameLogic.getPlayerInfo("0").wins}
            symbol="0"
            gameMode={selectedMode}
            isActive={activePlayer === "0"}
          />
        </ol>
      </div>
      <div id="game-container">
        {isValidGameResult && (
          <GameOver gameState={result} onPlayAgain={handleNewMatch} />
        )}
        <GameBoard onPlayerMove={handlePlayerMove} gameBoard={gameBoard} />
      </div>
    </main>
  );
}

export default App;
