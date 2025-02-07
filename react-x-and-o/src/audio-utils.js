import startSound from "/game-effect-start.mp3";
import winSound from "/game-effect-victory.mp3";
import defeatSound from "/game-effect-defeat.mp3";
import drawSound from "/game-effect-draw.mp3";
import moveSound from "/game-effect-move.mp3";
import playmakerPhrase1 from "/game-playmaker-1.mp3";
import playmakerPhrase2 from "/game-playmaker-2.mp3";
import playmakerPhrase3 from "/game-playmaker-3.mp3";
import playmakerPhrase4 from "/game-playmaker-4.mp3";
import playmakerPhrase5 from "/game-playmaker-5.mp3";
import playmakerPhrase6 from "/game-playmaker-6.mp3";
import playmakerPhrase7 from "/game-playmaker-7.mp3";
import playmakerPhrase8 from "/game-playmaker-8.mp3";

const soundEffects = {
  start: new Audio(startSound),
  win: new Audio(winSound),
  defeat: new Audio(defeatSound),
  draw: new Audio(drawSound),
  move: new Audio(moveSound),
  playmakerPhrase1: new Audio(playmakerPhrase1),
  playmakerPhrase2: new Audio(playmakerPhrase2),
  playmakerPhrase3: new Audio(playmakerPhrase3),
  playmakerPhrase4: new Audio(playmakerPhrase4),
  playmakerPhrase5: new Audio(playmakerPhrase5),
  playmakerPhrase6: new Audio(playmakerPhrase6),
  playmakerPhrase7: new Audio(playmakerPhrase7),
  playmakerPhrase8: new Audio(playmakerPhrase8),
};

export const playRandomPlaymakerPhrase = (volume = 1.0) => {
  const min = 1;
  const max = 8;
  const id = Math.floor(Math.random() * (max - min + 1)) + min;

  playSoundEffect(`playmakerPhrase${id}`, volume);
};

export const playSoundEffect = (name, volume = 1.0) => {
  const audio = soundEffects[name];
  if (audio) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch((error) => {
      console.error("Sound effect playback failed:", error, name);
    });
  } else {
    console.warn(`Sound effect "${name}" not preloaded.`);
  }
};
