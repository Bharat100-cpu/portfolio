import React from 'react';
import { motion } from 'framer-motion';

const superbadges = [
  { id: 1, name: 'Apex Specialist Superbadge', image: '/apex-specialist.png' },
  { id: 2, name: 'Lightning Web Components Specialist', image: '/lightning-web-components-specialist.webp' },
  { id: 3, name: 'Apex Web Services Superbadge Unit', image: '/apex-web-services-superbadge-unit.webp' },
  { id: 4, name: 'Named Credentials Superbadge Unit', image: '/named-credentials-superbadge-unit.webp' },
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
            className="certification-item"
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