import React from 'react';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';
import Associate from '../assets/Associate.png';
import aiAssociate from '../assets/ai-associate.png';
import aiSpecialist from '../assets/ai-specialist.png';
import dataCloud from '../assets/date-cloud.png';
import platformDeveloperI from '../assets/Platform-Developer-I.png';

const certifications = [
  { id: 1, name: 'Salesforce Certified Associate', image: Associate },
  { id: 2, name: 'Salesforce Certified AI Associate', image: aiAssociate },
  { id: 3, name: 'Salesforce Certified AI Specialist', image: aiSpecialist },
  { id: 4, name: 'Salesforce Certified Data Cloud Consultant', image: dataCloud },
  { id: 5, name: 'Salesforce Certified Platform Developer I', image: platformDeveloperI },
];

const Certifications = () => {
  return (
    <section id="certifications" className="certifications-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        My Certifications
      </motion.h2>
      <div className="certifications-grid">
        <Fade cascade damping={0.1}>
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            className="certification-item card-hover-effect"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <img src={cert.image} alt={cert.name} className="certification-logo" />
            <p className="certification-name">{cert.name}</p>
          </motion.div>
        ))}
        </Fade>
      </div>
    </section>
  );
};

export default Certifications;
