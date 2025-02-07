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
import { performAITurn } from "./ai-logic";

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

  function handlePlayerMove(rowIndex, colIndex, isAIMove = false) {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [...prevGameBoard];
      // Check if the cell is already occupied
      if (updatedGameBoard[rowIndex][colIndex] !== null) {
        return prevGameBoard; // Return the previous board state without changes
      }
      updatedGameBoard[rowIndex][colIndex] = activePlayer;
      return updatedGameBoard;
    });

    // Switch player *after* the board update, but *before* checking for game result
    setActivePlayer((currentActivePlayer) => (currentActivePlayer === "X" ? "0" : "X"));

    GameLogic.registerLog(
      `${GameLogic.getPlayerInfo(activePlayer).name
      } moved to ${rowIndex},${colIndex}`
    );

    if (!isAIMove) {
      playSoundEffect("move", 0.5);
    }
  }

  useEffect(() => {
    // This useEffect is ONLY for checking the game result
    if (gameBoard.flat().some((cell) => cell !== null)) {
       const lastPlayed = activePlayer === "X" ? "0" : "X"; // Get *previous* player
        const currentGameState = GameLogic.checkGameState(gameBoard, lastPlayed);
        handleGameResult(currentGameState);
    }
  }, [gameBoard, activePlayer]); // Depend on BOTH gameBoard AND activePlayer


  useEffect(() => {
    // This useEffect is ONLY for handling the AI's turn
    if (
      selectedMode === "AI" &&
      activePlayer === "0" &&
      !isValidGameResult &&
      gameStarted
    ) {
      performAITurn(gameBoard, activePlayer, handlePlayerMove);
    }
  }, [activePlayer, gameBoard, selectedMode, isValidGameResult, gameStarted]);

  const handleGameResult = (state) => {
    if (state) {
      setIsValidGameResult(true);
      setResult(state);

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
      setTransitionActive(false);
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