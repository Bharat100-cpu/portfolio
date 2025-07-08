import React from 'react';
import { motion } from 'framer-motion';
import apexSpecialist from '../assets/apex-specialist.png';
import lwcSpecialist from '../assets/lightning-web-components-specialist.webp';
import apexWebServices from '../assets/apex-web-services-superbadge-unit.webp';
import namedCredentials from '../assets/named-credentials-superbadge-unit.webp';

const superbadges = [
  { id: 1, name: 'Apex Specialist Superbadge', image: apexSpecialist },
  { id: 2, name: 'Lightning Web Components Specialist', image: lwcSpecialist },
  { id: 3, name: 'Apex Web Services Superbadge Unit', image: apexWebServices },
  { id: 4, name: 'Named Credentials Superbadge Unit', image: namedCredentials },
];

const Superbadges = () => {
  return (
    <section id="superbadges" className="certifications-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        My Superbadges
      </motion.h2>
      <div className="certifications-grid">
        {superbadges.map((badge) => (
          <motion.div
            key={badge.id}
            className="certification-item card-hover-effect"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <img src={badge.image} alt={badge.name} className="certification-logo" />
            <p className="certification-name">{badge.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Superbadges;
