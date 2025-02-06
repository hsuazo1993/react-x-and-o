import GameLogic from "../game-logic";

export default function GameOver({ gameState, onPlayAgain }) {
  if (gameState === null) {
    return (<></>);
  }

  const playerInfo = GameLogic.getPlayerInfo(gameState);

  const message =
    gameState === "draw"
      ? "It's a draw!"
      : `${playerInfo.name} wins!`;

  return (
    <div id="game-over">
      <h2>{message}</h2>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}
