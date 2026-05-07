import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Phone, Copy, Check, Gift } from 'lucide-react';
import { weddingConfig } from '../config';
import './Invitation.css';

const Invitation = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    const targetDate = new Date(weddingConfig.targetDate);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const textToCopy = weddingConfig.giftInfo.cardNumber.replace(/\s/g, '');
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  return (
    <div className="invitation-container">
      <motion.section 
        className="hero-section"
        style={{ opacity, scale }}
      >
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-card"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="card-ornament top"></div>
          <h1 className="script-font">{weddingConfig.coupleNames}</h1>
          <div className="hero-divider">
            <span className="line"></span>
            <Heart size={18} fill="currentColor" />
            <span className="line"></span>
          </div>
          <p className="hero-date">{new Date(weddingConfig.targetDate).toLocaleDateString('uz-UZ').split('.').join('.')}</p>
          <div className="card-ornament bottom"></div>
        </motion.div>
      </motion.section>

      <section className="story-section">
        <motion.div 
          className="premium-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Nikoh Oqshomi</h2>
          <p className="section-description">
            {weddingConfig.welcomeMessage}
          </p>
        </motion.div>
      </section>

      <section className="timer-section">
        <div className="premium-container">
          <div className="timer-grid">
            {Object.entries(timeLeft).map(([label, value]) => (
              <motion.div 
                key={label}
                className="timer-box"
                whileHover={{ scale: 1.05 }}
              >
                <span className="timer-value">{value}</span>
                <span className="timer-label">{weddingConfig.labels[label]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="details-grid-section">
        <div className="premium-container grid-3">
          <motion.div className="detail-card" whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} transition={{ delay: 0.2 }}>
            <Calendar className="detail-icon" />
            <h3>Sana</h3>
            <p>{weddingConfig.displayDate}</p>
          </motion.div>
          <motion.div className="detail-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.4 }}>
            <Clock className="detail-icon" />
            <h3>Vaqt</h3>
            <p>{weddingConfig.displayTime}</p>
          </motion.div>
          <motion.div className="detail-card" whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} transition={{ delay: 0.6 }}>
            <MapPin className="detail-icon" />
            <h3>Manzil</h3>
            <p>{weddingConfig.venueName}, {weddingConfig.venueLocation}</p>
          </motion.div>
        </div>
      </section>

      <section className="gift-section">
        <div className="premium-container">
          <motion.div 
            className="gift-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Gift className="gift-icon-top" />
            <h2 className="section-title">{weddingConfig.giftInfo.title}</h2>
            <p className="gift-message">{weddingConfig.giftInfo.message}</p>
            
            <div className="bank-card">
              <div className="bank-card-header">
                <span className="bank-name">{weddingConfig.giftInfo.bankName}</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Card Logo" className="card-logo" />
              </div>
              <div className="card-number-wrapper">
                <span className="card-number">{weddingConfig.giftInfo.cardNumber}</span>
                <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <div className="card-footer">
                <span className="card-holder">{weddingConfig.giftInfo.cardHolder}</span>
              </div>
              {copied && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="copy-toast">{weddingConfig.giftInfo.copySuccess}</motion.span>}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="location-section">
        <div className="premium-container">
          <h2 className="section-title">Manzilimiz</h2>
          <div className="map-frame">
            <iframe 
              src={weddingConfig.mapEmbedUrl} 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
          <motion.a 
            href={weddingConfig.mapExternalLink} 
            className="map-btn"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Google Xaritada ochish
          </motion.a>
        </div>
      </section>

      <footer className="footer-final">
        <div className="floral-ornament"></div>
        <p className="script-font">{weddingConfig.footerMessage}</p>
        <div className="contact-info">
          <p><Phone size={14} /> {weddingConfig.contactPhone}</p>
        </div>
      </footer>
    </div>
  );
};

export default Invitation;
