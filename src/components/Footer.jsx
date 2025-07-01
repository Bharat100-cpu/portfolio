
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '40px 0',
        borderTop: '1px solid #333',
        marginTop: '40px',
        color: '#aaa'
      }}
    >
      <p>&copy; {new Date().getFullYear()} Bharat Kumar. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
