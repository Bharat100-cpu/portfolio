
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#1a1a1a',
        color: 'var(--text-light)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="social-icons" style={{ marginBottom: '20px' }}>
        <a href="#" style={{ color: 'var(--text-light)', fontSize: '1.5em', margin: '0 15px' }}><FaLinkedin /></a>
        <a href="#" style={{ color: 'var(--text-light)', fontSize: '1.5em', margin: '0 15px' }}><FaGithub /></a>
        <a href="#" style={{ color: 'var(--text-light)', fontSize: '1.5em', margin: '0 15px' }}><FaTwitter /></a>
      </div>
      <p>&copy; {new Date().getFullYear()} Bharat Kumar. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
