import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-left-column">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Salesforce Developer &<br /> Experience Cloud Expert
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-description"
          >
            I build scalable and engaging solutions on the Salesforce platform. Let's create something amazing together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-buttons"
          >
            <button className="btn-primary">View Projects</button>
            <button className="btn-secondary" onClick={handleDownload}>Download Resume</button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-stats"
          >
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">years experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">projects success</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">satisfied rate</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
