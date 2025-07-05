import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  "Apex", "Apex Trigger", "Test Classes", "Batch Apex", "Lightning Web Components",
  "Aura Development", "Visualforce", "Flows", "API Integration", "Experience Cloud",
  "Apache ANT", "Workbench", "Change Set", "Git", "GitHub", "JavaScript", "Quip"
];

const Skills = () => {
  const radius = 250;
  const angleIncrement = (2 * Math.PI) / skillsData.length;

  return (
    <section id="skills" style={{ padding: '150px 20px', backgroundColor: 'var(--background-dark)', position: 'relative', overflow: 'hidden' }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', fontSize: '3em', marginBottom: '80px', color: 'var(--accent-color)' }}
      >
        My Skills
      </motion.h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <motion.div
          className="skills-container"
          style={{ position: 'relative' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {skillsData.map((skill, index) => {
            const angle = index * angleIncrement;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <motion.div
                key={index}
                className="skill-item"
                variants={{
                  hidden: { opacity: 0, x: 0, y: 0 },
                  visible: {
                    opacity: 1,
                    x: x,
                    y: y,
                    transition: {
                      type: 'spring',
                      damping: 10,
                      stiffness: 100,
                      delay: index * 0.1
                    }
                  }
                }}
                whileHover={{
                  scale: 1.2,
                  zIndex: 1,
                  boxShadow: '0 0 20px rgba(255, 183, 77, 0.7)',
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--background-dark)'
                }}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '15px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {skill}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
