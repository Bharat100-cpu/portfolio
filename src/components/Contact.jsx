import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact-section" className="contact-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Let's Get Connected
        </motion.h2>
        <div className="contact-content">
          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="E-mail" />
            <textarea placeholder="Message"></textarea>
            <button>Send Message</button>
          </motion.div>
          <motion.div 
            className="social-media"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Our Social Media</h3>
            <a href="#"><FaLinkedin /> LinkedIn</a>
            <a href="mailto:hello@rerter.com"><FaEnvelope /> hello@rerter.com</a>
            <a href="#"><FaCalendarAlt /> Schedule a call</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
