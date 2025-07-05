import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  "Apex", "Apex Trigger", "Test Classes", "Batch Apex", "Lightning Web Components",
  "Aura Development", "Visualforce", "Flows", "API Integration", "Experience Cloud",
  "Apache ANT", "Workbench", "Change Set", "Git", "GitHub", "JavaScript", "Quip"
];

const Skills = () => {
  const radius = 350; // Increased radius for better spacing
  const angleIncrement = (2 * Math.PI) / skillsData.length;

  return (
    <section id="skills" style={{ padding: '150px 20px', backgroundColor: 'var(--background-dark)', position: 'relative', overflow: 'hidden' }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', fontSize: '3em', marginBottom: '100px', color: 'var(--accent-color)' }}
      >
        My Skills
      </motion.h2>
      <div style={{ height: '700px', position: 'relative' }}>
        <motion.div
          className="skills-container"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: `${2 * 450}px`, height: `${2 * 450}px` }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="central-decoration"
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 183, 77, 0.1)',
              boxShadow: '0 0 30px rgba(255, 183, 77, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--accent-color)',
              fontSize: '1.3em',
              fontWeight: '600',
              textAlign: 'center',
              border: '2px solid rgba(255, 183, 77, 0.5)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            Skills
          </motion.div>
          {skillsData.map((skill, index) => {
            const angle = index * angleIncrement;
            const x = radius + radius * Math.cos(angle);
            const y = radius + radius * Math.sin(angle);

            return (
              <motion.div
                key={index}
                className="skill-item"
                variants={{
                  hidden: { opacity: 0, x: 0, y: 0, scale: 0.5 },
                  visible: {
                    opacity: 1,
                    x: x,
                    y: y,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      damping: 12,
                      stiffness: 80,
                      delay: index * 0.1
                    }
                  }
                }}
                whileHover={{
                  scale: 1.15,
                  zIndex: 1,
                  boxShadow: '0 0 25px rgba(255, 183, 77, 0.8)',
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--background-dark)'
                }}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '15px 25px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  whiteSpace: 'nowrap',
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
