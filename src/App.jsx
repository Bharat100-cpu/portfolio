import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Superbadges from './components/Superbadges';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode', !isDarkMode);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bharat Kumar - Portfolio',
          text: 'Check out Bharat Kumar\'s portfolio!',
          url: window.location.href,
        });
        console.log('Profile shared successfully');
      } catch (error) {
        console.error('Error sharing profile:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser. You can copy the URL: ' + window.location.href);
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <header className={isHeaderVisible ? 'visible' : 'hidden'}>
        <div className="logo"><span>Portfolio</span></div>
        <div className="header-right-content">
          <button className="theme-toggle-button" onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="reach-out-button" onClick={() => scrollToSection('contact')}>Reach out</button>
          <button className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu-overlay"
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <nav className="mobile-nav">
              <a href="#hero" onClick={() => scrollToSection('hero')}>Home</a>
              <a href="#about" onClick={() => scrollToSection('about')}>About</a>
              <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
              <a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a>
              <a href="#experience" onClick={() => scrollToSection('experience')}>Experience</a>
              <a href="#contact" onClick={() => scrollToSection('contact-section')}>Contact</a>
              <a href="#" onClick={shareProfile}>Share Profile</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="hero-about" className="hero-section">
          <div className="hero-content-wrapper">
            <div className="hero-left-column">
              <motion.h1
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.17, 0.67, 0.83, 0.67], delay: 0.2 }}
              >
                Salesforce Developer &<br /> Experience Cloud Expert
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67], delay: 0.4 }}
                className="hero-description"
              >
                I build scalable and engaging solutions on the Salesforce platform. Let's create something amazing together.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100, damping: 10 }}
                className="hero-buttons"
              >
                <button className="reach-out-button" onClick={handleDownload}>Download Resume</button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, staggerChildren: 0.1 }}
                className="hero-stats"
              >
                <motion.div className="stat-item" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                  <span className="stat-number">3+</span>
                  <span className="stat-label">years experience</span>
                </motion.div>
                <motion.div className="stat-item" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                  <span className="stat-number">4</span>
                  <span className="stat-label">projects success</span>
                </motion.div>
                <motion.div className="stat-item" variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
                  <span className="stat-number">98%</span>
                  <span className="stat-label">satisfied rate</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <motion.div 
              className="about-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ color: 'var(--accent-color)', fontSize: '3em', fontWeight: 700 }}
              >
                About Me
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="about-summary"
              >
                Results-driven Salesforce Developer with 3 years of experience designing scalable Experience Cloud solutions leveraging Apex, Lightning Web Components, Visualforce, and sound integration patterns to drive business performance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="about-details"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Location
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  >
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Mathura, Uttar Pradesh
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Professional Experience
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  3 years of hands-on expertise in designing, developing, and implementing robust solutions on the Salesforce platform. Proficient in Lightning Web Components (LWC), Apex, Apex integrations, Aura framework, and Visualforce. Skilled in building scalable, high-performance applications, integrating third-party systems, and customizing Salesforce to meet complex business requirements.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <Projects />
        <Skills />
        <Experience />
        
        <Certifications />
        <Superbadges />
        <Contact />
      </main>
      
    </div>
  );
};

export default App;
