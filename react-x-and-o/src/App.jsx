import { useState, useEffect } from "react";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameLogic from "./game-logic";
import GameOver from "./components/GameOver";
import GameModeSelector from "./components/GameModeSelector";
import AudioPlayer from "./components/AudioPlayer";
import gameLocalSong from "/game-song-1.mp3";
import gameAISong from "/game-song-ai.mp3";
import gameOnlineSong from "/game-song-online.mp3";
import { playSoundEffect } from "./audio-utils";
import TransitionOverlay from "./components/TransitionOverlay";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [isValidGameResult, setIsValidGameResult] = useState(false);
  const [result, setResult] = useState(null);
  const [gameBoard, setGameBoard] = useState(GameLogic.getInitialGameBoard());
  const [selectedMode, setSelectedMode] = useState("AI");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSong, setGameSong] = useState(gameAISong);
  const [transitionActive, setTransitionActive] = useState(false);

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
    playSoundEffect("move", 0.5);
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

      if (state === "X") {
        GameLogic.addPlayerWin(state);
        playSoundEffect("win", 1);
      } else if (state === "0") {
        GameLogic.addPlayerWin(state);
        playSoundEffect("defeat", 1);
      } else {
        playSoundEffect("draw", 1);
      }
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

  function getThemeSong(mode) {
    switch (mode) {
      case "AI":
        return gameAISong;
      case "Local":
        return gameLocalSong;
      case "Online":
        return gameOnlineSong;
      default:
        return gameAISong;
    }
  }

  const handleModeSelect = (mode) => {
    setTransitionActive(true);
    setSelectedMode(mode);
    setGameSong(getThemeSong(mode));
    playSoundEffect("start", 0.5);

    setTimeout(() => {
      setGameStarted(true);
      resetGame(true);
      setTransitionActive(false); // Deactivate transition after delay
    }, 2500);
  };

  return (
    <main>
      <TransitionOverlay active={transitionActive} mode={selectedMode} />
      <AudioPlayer src={gameSong} volume={0.2} play={gameStarted} delay={2.5} />
      <GameModeSelector
        selectedMode={selectedMode}
        onSelectMode={handleModeSelect}
      />
      <div id="players-container">
        {" "}
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
