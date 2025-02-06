import React from 'react';
import gameAI from '/game-transition-ai.jpg';
import gameLocal from '/game-transition-local.jpg';
import gameOnline from '/game-transition-online.jpg';
import './TransitionOverlay.css'; // We'll create this CSS file next

function TransitionOverlay({ active, mode }) {
      function getImage() {
        switch (mode) {
          case "AI":
            return gameAI;
          case "Local":
            return gameLocal;
          case "Online":
            return gameOnline;
          default:
            return gameAI;
        }
      }

  return (
    <div className={`transition-overlay ${active ? 'active' : ''}`}>
      {/* You can put an image or any content here */}
      <img src={getImage()} alt="Transition" />
    </div>
  );
}

export default TransitionOverlay;