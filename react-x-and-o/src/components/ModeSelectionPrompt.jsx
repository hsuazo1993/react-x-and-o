import React from "react";
import "./ModeSelectionPrompt.css";
import gameImage from "/game-transition-popup.jpg";

function ModeSelectionPrompt() {
  return (
    <div id="mode-selection-prompt">
      <h2>Please select a mode</h2>
      <img src={gameImage} alt="Select Mode" />
    </div>
  );
}

export default ModeSelectionPrompt;
