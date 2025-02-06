import { WINNING_COMBINATIONS } from "./winning-combinations"; // Import your winning combinations

const GAME_DATA_KEY = "X0-game-data";

class GameLogic {
  static getInitialGameBoard() {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  static getDefaultGameData() {
    return {
      players: {
        X: {
          name: "Player 1",
          symbol: "X",
          wins: 0,
        },
        0: {
          name: "Player 2",
          symbol: "O",
          wins: 0,
        },
      },
      logs: [
        {
          timestamp: new Date(),
          message: "Game started",
        },
      ],
      currentGameBoard: [],
    };
  }

  static setGameData() {
    let json = localStorage.getItem(GAME_DATA_KEY);
    if (json) return;

    localStorage.setItem(
      GAME_DATA_KEY,
      JSON.stringify(this.getDefaultGameData())
    );
  }

  static updatePlayerName(playerSymbol, playerName) {
    let gameData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    gameData.players[playerSymbol].name = playerName;
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(gameData));
  }

  static addPlayerWin(playerSymbol) {
    let gameData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    gameData.players[playerSymbol].wins += 1;
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(gameData));

    console.log(`${gameData.players[playerSymbol].name} won the game!`);
  }

  static getPlayerInfo(playerSymbol) {
    let gameData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    return gameData.players[playerSymbol];
  }

  static registerLog(logMessage) {
    let gameData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    gameData.logs.push({
      timestamp: new Date(),
      message: logMessage,
    });
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(gameData));

    console.log(logMessage);
  }

  static updateCurrentGameBoard(gameBoard) {
    let gameData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    gameData.currentGameBoard = gameBoard;
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(gameData));

    console.table(gameBoard);
  }

  static checkGameState(gameBoard, activePlayerSymbol) {
    const isWinningCombination = WINNING_COMBINATIONS.some((combination) =>
      combination.every(
        (value) => gameBoard[value.row][value.col] === activePlayerSymbol
      )
    );

    if (isWinningCombination) {
      return activePlayerSymbol;
    }

    const isGameBoardFull = gameBoard.flat().every((cell) => cell !== null);
    if (isGameBoardFull) {
      return "draw";
    }

    return null;
  }

  static resetGame() {
    let gameData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    gameData.currentGameBoard = [];
    gameData.logs = [];
    gameData.logs.push({
      timestamp: new Date(),
      message: "Game reset",
    });
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(gameData));
    console.clear();
  }
}

export default GameLogic;
