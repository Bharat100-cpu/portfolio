import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Projects from './components/Projects';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './components/Contact';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  };

  return (
    <div className="App">
      <header>
        <div className="logo"><img src="/Salesforce.com_logo.svg.png" alt="Salesforce Logo" /></div>
        <div className="header-right-content">
          <button className="reach-out-button" onClick={() => scrollToSection('contact-section')}>Reach out</button>
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
