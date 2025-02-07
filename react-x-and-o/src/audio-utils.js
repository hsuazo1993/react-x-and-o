import startSound from "/game-effect-start.mp3";
import winSound from "/game-effect-victory.mp3";
import defeatSound from "/game-effect-defeat.mp3";
import drawSound from "/game-effect-draw.mp3";
import moveSound from "/game-effect-move.mp3";

const soundEffects = {
  start: new Audio(startSound),
  win: new Audio(winSound),
  defeat: new Audio(defeatSound),
  draw: new Audio(drawSound),
  move: new Audio(moveSound),
};

const playmakerAudioFiles = {};
const playmakerAudioFilesCount = 55;
let currentlyPlayingPlaymakerAudio = null; // Keep track of the currently playing audio

export async function preloadAudio() {
  for (let i = 1; i <= playmakerAudioFilesCount; i++) {
    const audio = new Audio(`/game-playmaker-${i}.mp3`);
    audio.preload = "auto";
    playmakerAudioFiles[`playmakerPhrase${i}`] = audio;

    audio.addEventListener("loadeddata", () => {
      // console.log(`Audio ${i} preloaded`);
    });

    audio.addEventListener("error", (error) => {
      console.error(`Error preloading audio ${i}:`, error);
    });

    //Crucially, add an event listener for 'ended'
    audio.addEventListener("ended", () => {
      if (currentlyPlayingPlaymakerAudio === audio) {
        currentlyPlayingPlaymakerAudio = null;
      }
    });
  }
}

export const playRandomPlaymakerPhrase = async (volume = 1.0) => {
  // Check if an audio is currently playing.  If so, return early.
  if (currentlyPlayingPlaymakerAudio && !currentlyPlayingPlaymakerAudio.ended) {
    return;
  }

  const min = 1;
  const max = playmakerAudioFilesCount;
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  const phraseName = `playmakerPhrase${id}`;
  const audioFile = playmakerAudioFiles[phraseName];

  if (!audioFile) {
    console.error(`Audio file for ID ${id} not found or not preloaded.`);
    return;
  }

  audioFile.volume = volume;
  currentlyPlayingPlaymakerAudio = audioFile; // Set the currently playing audio

  audioFile.play().catch(error => {
      console.error("Error playing playmaker phrase:", error);
      currentlyPlayingPlaymakerAudio = null; // Reset if there is an error
  });
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