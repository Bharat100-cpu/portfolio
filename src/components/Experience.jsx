import React from 'react';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';

const experienceData = [
  {
    title: "Fexle Services Private Limited - Salesforce Developer",
      duration: "Jaipur, Rajasthan | May 2022 – June 2025",
    responsibilities: [
      "Developed and optimized Apex classes, triggers, and Lightning Web Components (LWC) to support scalable and high-performance Salesforce solutions.",
      "Converted intricate business needs into custom Salesforce implementations, improving workflow automation and system usability.",
      "Performed root cause analysis and fixed high-priority production issues, lowering the frequency of bugs and enhancing application stability.",
      "Managed the transition from Salesforce Classic to Lightning Experience, heavily improving UI responsiveness and end-user productivity.",
      "Worked with cross-functional teams to deliver continuous improvements, while confirming to Salesforce development best practices (governor limits, bulk-safe logic, naming conventions).",
      "Actively worked on code reviews, technical design meetings, and deployment cycles with the help of tools such as Change Sets and Salesforce DX."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        My Experience
      </motion.h2>
      <div className="experience-container">
        <Fade cascade damping={0.1}>
        {experienceData.map((item, index) => (
          <motion.div
            className="experience-item"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3>{item.title}</h3>
            <p className="experience-duration">{item.duration}</p>
            <ul className="experience-responsibilities">
              {item.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </motion.div>
        ))}
        </Fade>
      </div>
    </section>
  );
};

export default Experience;