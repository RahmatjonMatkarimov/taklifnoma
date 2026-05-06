import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config';
import './Envelope.css';

const Envelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After the flap opens and letter slides out, trigger the transition
    setTimeout(() => {
      setIsDone(true);
      if (onOpen) onOpen();
    }, 2500);
  };

  return (
    <div className="envelope-overlay">
      <AnimatePresence>
        {!isDone && (
          <motion.div 
            className="envelope-scene"
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
          >
            <div className={`envelope-box ${isOpen ? 'is-open' : ''}`} onClick={handleOpen}>
              <div className="envelope-back"></div>
              <motion.div 
                className="envelope-letter"
                animate={isOpen ? { y: -150, zIndex: 10 } : { y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              >
                <div className="letter-inner">
                  <h3 className="script-font">{weddingConfig.coupleNames}</h3>
                  <p>{weddingConfig.envelopeTitle}</p>
                  <div className="gold-line"></div>
                </div>
              </motion.div>
              <div className="envelope-front"></div>
              <div className="envelope-top"></div>
              {!isOpen && (
                <div className="envelope-seal">
                  <div className="seal-inner">
                    <span>❤</span>
                  </div>
                </div>
              )}
            </div>
            {!isOpen && (
              <motion.p 
                className="open-hint"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {weddingConfig.envelopeHint}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
