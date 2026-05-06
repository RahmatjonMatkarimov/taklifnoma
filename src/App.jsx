import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  useEffect(() => {
    // Lock scroll only when curtains are closed
    if (!isOpened) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    // After curtains are partially open, trigger confetti
    setTimeout(() => {
      triggerConfetti();
    }, 1500);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3000 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="app-container">
      {/* Invitation is ALWAYS rendered in the background */}
      <Invitation />
      <MusicPlayer autoPlay={isOpened} />

      {/* Curtains as an Overlay */}
      <AnimatePresence>
        {!showInvitation && (
          <motion.div
            key="curtain-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, delay: 2 } }} // Wait for curtains to open fully before removing from DOM
          >
            <Envelope onOpen={handleOpen} onComplete={() => setShowInvitation(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
