import React, { useEffect, useRef } from "react";

function AudioPlayer({ src, volume = 0.5, play, delay = 0 }) {
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const playAudio = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        audioRef.current
          .play()
          .then(() => {
            // setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Autoplay was prevented:", error);
            // setIsPlaying(false);
          });
      }, delay * 1000);
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    if (play) {
      if (document.readyState === "complete") {
        playAudio();
      } else {
        window.addEventListener("load", playAudio);
        return () => window.removeEventListener("load", playAudio);
      }
    } else {
      stopAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src, volume, play, delay]);

  return null;
}

export default AudioPlayer;
