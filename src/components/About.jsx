import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        
        <motion.div 
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 style={{ color: 'var(--accent-color)', fontSize: '3em', fontWeight: 700 }}>About Me</h2>
          <p className="about-summary">
            Results-driven Salesforce Developer with 3 years of experience designing scalable Experience Cloud solutions leveraging Apex, Lightning Web Components, Visualforce, and sound integration patterns to drive business performance.
          </p>
          <div className="about-details">
            <h3>Location</h3>
            <p>Mathura, Uttar Pradesh</p>
            <h3>Professional Experience</h3>
            <p>3 years of hands-on expertise in designing, developing, and implementing robust solutions on the Salesforce platform. Proficient in Lightning Web Components (LWC), Apex, Apex integrations, Aura framework, and Visualforce. Skilled in building scalable, high-performance applications, integrating third-party systems, and customizing Salesforce to meet complex business requirements.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
