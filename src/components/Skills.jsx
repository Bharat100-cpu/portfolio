import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  "Apex", "Apex Trigger", "Test Classes", "Batch Apex", "Lightning Web Components",
  "Aura Development", "Visualforce", "Flows", "API Integration", "Experience Cloud",
  "Apache ANT", "Workbench", "Change Set", "Git", "GitHub", "JavaScript", "Quip"
];

const Skills = () => {
  return (
    <section id="skills">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </motion.h2>
      <motion.ul
        className="section-content"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
      >
        {skillsData.map((skill, index) => (
          <motion.li
            key={index}
            className="card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default Skills;