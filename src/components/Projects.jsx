import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projectsData = [
    {
      title: "Assurant (Insurance)",
      technologies: "Apex, LWC, Aura, Visualforce",
      description: "Worked as a Salesforce Developer within the Architecture Team working on an enterprise-level insurance platform. Provided end-to-end customizations for Salesforce, migrated legacy components to Lightning, and resolved issues based on JIRA stories."
    },
    {
      title: "Clevertap (Customer Engagement and Retention)",
      technologies: "Apex, Triggers, Batch Apex, LWC, Salesforce Administration, Quip Integration, Connected App, Visualforce, Deployment Automation.",
      description: "As a Salesforce Developer, made contributions to core development and automation tasks to improve customer engagement workflows."
    },
    {
      title: "Robotex (Real Estate)",
      technologies: "Apex, Triggers, Batch Apex, LWC, Salesforce Administration, ClearTax Integration, Change Set Deployment",
      description: "Worked as a Salesforce Developer on a real estate management platform. Developed Lightning components and integrated Salesforce with the ClearTax GST Portal to automate tax-related workflows."
    },
    {
      title: "Pinterest (Digital Advertising and E-Commerce Enablement)",
      technologies: "Apex, Triggers, Batch Apex, LWC, Salesforce Administration, Flows, Apex Integration, Change Set Deployment",
      description: "Worked as part of the Salesforce delivery team enabling digital advertising and commerce solutions. Involved in core LWC and Apex development, peer code reviews, and regular sprint planning sessions to enhance the Salesforce platform and meet evolving business needs."
    }
  ];

  return (
    <section id="projects" className="section-green">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', fontSize: '3em', marginBottom: '50px' }}
      >
        My Projects
      </motion.h2>
      <div className="section-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {projectsData.map((item, index) => (
          <motion.div
            className="card project-item"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3>{item.title}</h3>
            <p><strong>Technologies:</strong> {item.technologies}</p>
            <p>{item.description}</p>
            <button className="btn-secondary" style={{ marginTop: '20px' }}>View Project</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
