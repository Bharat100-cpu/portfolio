
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bharat Kumar
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bio-text"
      >
        Experienced Salesforce Developer with 3 years of hands-on expertise in designing, developing, and implementing robust solutions on the Salesforce platform. Proficient in Lightning Web Components (LWC), Apex, Apex integrations, Aura framework, and Visualforce. Skilled in building scalable, high-performance applications, integrating third-party systems, and customizing Salesforce to meet complex business requirements. Adept at collaborating with cross-functional teams to deliver innovative solutions that drive efficiency and enhance user experience. Passionate about staying updated with the latest Salesforce technologies and best practices to deliver cutting-edge solutions. ✨
      </motion.p>
    </section>
  );
};

export default Hero;
