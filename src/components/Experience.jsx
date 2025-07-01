import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experienceData = [
    {
      title: "Fexle Services Private Limited - Salesforce Developer",
      duration: "Jaipur, Rajasthan | May 2022 – Present",
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

  return (
    <section id="experience">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>
      <div className="section-content">
        {experienceData.map((item, index) => (
          <motion.div
            className="card experience-item"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3>{item.title}</h3>
            <p>{item.duration}</p>
            <ul>
              {item.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;