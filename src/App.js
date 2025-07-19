import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentLaugh, setCurrentLaugh] = useState("");
  const [isBackflipping, setIsBackflipping] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const audioRef = useRef(null);
  const jumpAudioRef = useRef(null);
  const hoverAudioRef = useRef(null);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio();

    // Use the specific bg8bit.mp3 file
    audioRef.current.src = "/bg8bit.mp3";
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Initialize jump sound effect
    jumpAudioRef.current = new Audio();
    jumpAudioRef.current.src = "/jump.mp3";
    jumpAudioRef.current.volume = 0.5;

    // Initialize hover sound effect
    hoverAudioRef.current = new Audio();
    hoverAudioRef.current.src = "/hover.mp3";
    hoverAudioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (jumpAudioRef.current) {
        jumpAudioRef.current = null;
      }
      if (hoverAudioRef.current) {
        hoverAudioRef.current = null;
      }
    };
  }, []);

  // Different accented laughs
  const laughs = [
    "Hahahaha!", // English
    "Jajajaja!", // Spanish
    "Hehehe!", // Giggly
    "Hohohoho!", // Santa-like
    "Kekeke!", // Korean
    "Ahahaha!", // Arabic
    "Huhuhuhu!", // French
    "Hihihihi!", // High-pitched
    "Wahaha!", // Evil laugh
    "Teehehe!", // Shy laugh
    "Bwahaha!", // Villain laugh
    "Ohohoho!", // Sophisticated
    "Mwahaha!", // Mischievous
    "Nyahahaha!", // Anime-style
    "Hon hon hon!", // Stereotypical French
  ];

  // Handle the silly start button
  const handleSillyStart = async () => {
    try {
      await audioRef.current.play();
      setHasUserInteracted(true);
      setShowStartScreen(false);
    } catch (error) {
      console.log("Failed to start audio:", error);
      setHasUserInteracted(true);
      setShowStartScreen(false);
    }
  };

  // Handle first user interaction to enable audio
  const handleFirstInteraction = async () => {
    if (!hasUserInteracted && audioRef.current && isMusicPlaying) {
      try {
        await audioRef.current.play();
        setHasUserInteracted(true);
      } catch (error) {
        console.log("Failed to start audio:", error);
      }
    }
  };

  // Toggle music on/off
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    handleFirstInteraction(); // Ensure audio context is enabled

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        setHasUserInteracted(true);
      } catch (error) {
        console.log("Failed to play audio:", error);
      }
    }
  };

  const handleMouseEnter = () => {
    handleFirstInteraction(); // Enable audio on first interaction
    setIsHovered(true);

    // Play hover sound effect
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0; // Reset to start in case it's still playing
      hoverAudioRef.current.play().catch((error) => {
        console.log("Failed to play hover sound:", error);
      });
    }

    // Pick a random laugh
    const randomLaugh = laughs[Math.floor(Math.random() * laughs.length)];
    setCurrentLaugh(randomLaugh);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentLaugh("");
  };

  const handleBackflip = () => {
    handleFirstInteraction(); // Enable audio on first interaction
    if (isBackflipping) return; // Prevent multiple backflips at once

    // Play jump sound effect
    if (jumpAudioRef.current) {
      jumpAudioRef.current.currentTime = 0; // Reset to start in case it's still playing
      jumpAudioRef.current.play().catch((error) => {
        console.log("Failed to play jump sound:", error);
      });
    }

    setIsBackflipping(true);
    setCurrentLaugh("WHEEEEE! 🌟");

    // Reset after animation completes (1 second for smooth continuous animation)
    setTimeout(() => {
      setIsBackflipping(false);
      setCurrentLaugh("");
    }, 1000);
  };

  return (
    <div className="App">
      {showStartScreen ? (
        <div className="start-screen">
          <h1 className="start-title">🐸</h1>
          <p className="start-description">Blep</p>
          <button className="start-button" onClick={handleSillyStart}>
            🎵 Start blepping 🎵
          </button>
        </div>
      ) : (
        <>
          <div className="music-controls">
            <button className="music-button" onClick={toggleMusic}>
              {isMusicPlaying ? "🔊 Music ON" : "🔇 Music OFF"}
            </button>
            {!hasUserInteracted && isMusicPlaying && (
              <div className="music-hint">
                🎵 Click anywhere to start music!
              </div>
            )}
          </div>
          <div className="frog-container">
            <img
              src={isHovered ? "/frog_opened.png" : "/frog.png"}
              alt="Frog"
              className={`frog-image ${isBackflipping ? "backflip" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {currentLaugh && <div className="laugh-bubble">{currentLaugh}</div>}
          </div>
          <button
            className="backflip-button"
            onClick={handleBackflip}
            disabled={isBackflipping}
          >
            🤸 Make Frog Backflip! 🤸
          </button>
        </>
      )}
    </div>
  );
}

export default App;
