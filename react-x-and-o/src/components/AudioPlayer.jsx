import React, { useEffect, useRef } from 'react';

function AudioPlayer({ src, volume = 0.5, play, delay = 0 }) { // Add 'delay' prop
  const audioRef = useRef(null);
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const playAudio = () => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

      timeoutRef.current = setTimeout(() => {
        audioRef.current.play()
          .then(() => {
            // setIsPlaying(true);  // Optional state tracking
          })
          .catch(error => {
            console.error("Autoplay was prevented:", error);
            // setIsPlaying(false);
          });
      }, delay * 1000); // Convert seconds to milliseconds
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        if (timeoutRef.current) { // Clear timeout on stop
          clearTimeout(timeoutRef.current);
        }
      }
    };

    if (play) {
      if (document.readyState === 'complete') {
          playAudio();
      } else {
        window.addEventListener('load', playAudio);
        return () => window.removeEventListener('load', playAudio);
      }
    } else {
      stopAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
       if (timeoutRef.current) {  // Clear timeout on unmount
          clearTimeout(timeoutRef.current);
        }
    };
  }, [src, volume, play, delay]); // Add 'delay' to dependency array

  return null;
}

export default AudioPlayer;