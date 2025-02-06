import { useState } from "react";
import GameLogic from "../game-logic";

export default function Player({
  initialName,
  symbol,
  isActive,
  score,
  gameMode,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleSave() {
    setIsEditing(false);
    GameLogic.updatePlayerName(symbol, name);
  }

  let playerName = <span className="player-name">{name}</span>;
  let actionButton =
    symbol === "0" && gameMode === "AI" ? (
      <></>
    ) : (
      <button onClick={() => setIsEditing((editing) => !editing)}>Edit</button>
    );

  if (isEditing) {
    playerName = (
      <input
        type="text"
        required
        defaultValue={name}
        onChange={handleNameChange}
      />
    );
    actionButton = <button onClick={handleSave}>Save</button>;
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player-symbol">{symbol}</span>
      {playerName}
      <span className="player-score">{score}</span> {/* Display the score */}
      {actionButton}
    </li>
  );
}
