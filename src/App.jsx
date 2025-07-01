import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import About from './components/About';
import Projects from './components/Projects';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div className="logo"><img src="/Salesforce.com_logo.svg.png" alt="Salesforce Logo" style={{ height: '75px' }} /></div>
          <button className="menu-button" onClick={toggleMenu}>
            <span className="menu-icon"></span> MENU
          </button>
          <div className="header-right-content">
            <button className="reach-out-button" onClick={scrollToContact}>Reach out</button>
          </div>
        </motion.header>
      </div>

      {isMenuOpen && (
        <AnimatePresence>
          <motion.div
            className="menu-overlay"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="menu-overlay-header">
              <button className="close-menu-button" onClick={toggleMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                CLOSE MENU
              </button>
            </div>
            <nav className="mobile-nav">
              <a href="#hero" onClick={toggleMenu}>Home</a>
              <a href="#about" onClick={toggleMenu}>About us</a>
              <a href="#projects" onClick={toggleMenu}>Our projects</a>
            </nav>
          </motion.div>
        </AnimatePresence>
      )}

      <main>
        <Hero />
        {/* <motion.section
          id="about"
          className="section-yellow"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <About />
        </motion.section>
        <motion.section
          id="projects"
          className="section-green"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Projects />
        </motion.section>
        <Contact /> */}
      </main>
      {/* <div className="container">
        <Footer />
      </div> */}
      {/* <div className="container">
        <Footer />
      </div> */}
    </div>
  );
};

export default App;