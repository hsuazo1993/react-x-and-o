import React from "react";

function GameModeSelector({ onSelectMode, selectedMode }) {
  return (
    <div id="game-mode-selector">
      <button
        className={selectedMode === "AI" ? "active" : ""}
        onClick={() => onSelectMode("AI")}
      >
        AI
      </button>
      <button
        className={selectedMode === "Local" ? "active" : ""}
        onClick={() => onSelectMode("Local")}
      >
        Local
      </button>
      <button
        className={selectedMode === "Online" ? "active" : ""}
        onClick={() => onSelectMode("Online")}
      >
        Online
      </button>
    </div>
  );
}

export default GameModeSelector;
