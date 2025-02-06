import startSound from '/game-effect-start.mp3';
import winSound from '/game-effect-victory.mp3';
import defeatSound from '/game-effect-defeat.mp3';
import drawSound from '/game-effect-draw.mp3';
import moveSound from '/game-effect-move.mp3';

const soundEffects = {
    start: new Audio(startSound),
    win: new Audio(winSound),
    defeat: new Audio(defeatSound),
    draw: new Audio(drawSound),
    move: new Audio(moveSound),
};

// Function to play a sound effect
export const playSoundEffect = (name, volume = 1.0) => {
  const audio = soundEffects[name];
  if (audio) {
      // Reset currentTime to 0 to allow rapid re-triggering
      audio.currentTime = 0; 
      audio.volume = volume; // Set volume (optional)
      audio.play().catch(error => {
          console.error("Sound effect playback failed:", error, name);
      });
  } else {
      console.warn(`Sound effect "${name}" not preloaded.`);
  }
};

// Example of preloading (you'll do this in your components):
// preloadSoundEffect('move', '/audio/move-sound.mp3');
// preloadSoundEffect('win', '/audio/win-sound.mp3');