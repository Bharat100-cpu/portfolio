import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ fontSize: '1.2em', maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: '#aaa' }}
      >
        Results-driven Salesforce Developer with 3 years of experience designing scalable Experience Cloud solutions leveraging Apex, Lightning Web Components, Visualforce, and sound integration patterns to drive business performance.
      </motion.p>
    </section>
  );
};

export default About;