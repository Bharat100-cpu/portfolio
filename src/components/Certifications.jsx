import React from 'react';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';

const certifications = [
  { id: 1, name: 'Salesforce Certified Associate', image: '/Associate.png' },
  { id: 2, name: 'Salesforce Certified AI Associate', image: '/ai-associate.png' },
  { id: 3, name: 'Salesforce Certified AI Specialist', image: '/ai-specialist.png' },
  { id: 4, name: 'Salesforce Certified Data Cloud Consultant', image: '/date-cloud.png' },
  { id: 5, name: 'Salesforce Certified Platform Developer I', image: '/Platform-Developer-I.png' },
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
            className="certification-item"
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