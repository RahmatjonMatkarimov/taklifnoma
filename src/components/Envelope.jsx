import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config';
import './Envelope.css';

const Envelope = ({ onOpen, onComplete }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
    if (onOpen) onOpen();
    
    // Notify when curtains are fully open
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);
  };

  return (
    <div className="curtain-overlay">
      <div className="curtain-container" onClick={handleOpen}>
        {/* Left Curtain */}
        <motion.div 
          className="curtain side left-curtain"
          initial={{ x: 0 }}
          animate={isOpened ? { x: '-100%' } : { x: 0 }}
          transition={{ duration: 2, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="curtain-silk"></div>
        </motion.div>

        {/* Right Curtain */}
        <motion.div 
          className="curtain side right-curtain"
          initial={{ x: 0 }}
          animate={isOpened ? { x: '100%' } : { x: 0 }}
          transition={{ duration: 2, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="curtain-silk"></div>
        </motion.div>

        {/* Center content centered perfectly */}
        <div className="center-content-wrapper">
          <AnimatePresence>
            {!isOpened && (
              <motion.div 
                className="center-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.8 } }}
              >
                <div className="gold-emblem">
                  <div className="emblem-inner">
                    <h2 className="script-font">
                      {weddingConfig.coupleNames.split('&')[0].trim()[0]} & {weddingConfig.coupleNames.split('&')[1].trim()[0]}
                    </h2>
                  </div>
                </div>
                <motion.p 
                  className="curtain-hint"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {weddingConfig.envelopeHint || "Kirish uchun bosing"}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Envelope;
