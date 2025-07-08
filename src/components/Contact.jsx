import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaTwitter, FaInstagram, FaSalesforce } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
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
          className="social-media card-hover-effect"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3>Our Social Media</h3>
          <a href="https://www.salesforce.com/trailblazer/bharatkumar2002" target="_blank" rel="noopener noreferrer"><FaSalesforce /> Trailhead Profile</a>
          <a href="https://www.linkedin.com/in/bharat-kumar77" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
          <a href="https://twitter.com/KumarBharat1005" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
          <a href="https://www.instagram.com/kumar_bharat667" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
          <a href="mailto:bharatmtr2002@gmail.com"><FaEnvelope /> bharatmtr2002@gmail.com</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;