import React from 'react';
import { Fade } from 'react-awesome-reveal';

const projects = [
  {
    id: 1,
    title: 'Assurant (Insurance)',
    technologies: 'Apex, LWC, Aura, Visualforce',
    description: 'Worked as a Salesforce Developer within the Architecture Team working on an enterprise-level insurance platform. Provided end-to-end customizations for Salesforce, migrated legacy components to Lightning, and resolved issues based on JIRA stories.',
  },
  {
    id: 2,
    title: 'Clevertap (Customer Engagement and Retention)',
    technologies: 'Apex, Triggers, Batch Apex, LWC, Salesforce Administration, Quip Integration, Connected App, Visualforce, Deployment Automation.',
    description: 'As a Salesforce Developer, made contributions to core development and automation tasks to improve customer engagement workflows.',
  },
  {
    id: 3,
    title: 'Robotex (Real Estate)',
    technologies: 'Apex, Triggers, Batch Apex, LWC, Salesforce Administration, ClearTax Integration, Change Set Deployment',
    description: 'Worked as a Salesforce Developer on a real estate management platform. Developed Lightning components and integrated Salesforce with the ClearTax GST Portal to automate tax-related workflows.',
  },
  {
    id: 4,
    title: 'Pinterest (Digital Advertising and E-Commerce Enablement)',
    technologies: 'Apex, Triggers, Batch Apex, LWC, Salesforce Administration, Flows, Apex Integration, Change Set Deployment',
    description: 'Worked as part of the Salesforce delivery team enabling digital advertising and commerce solutions. Involved in core LWC and Apex development, peer code reviews, and regular sprint planning sessions to enhance the Salesforce platform and meet evolving business needs.',
  },
];

const Projects = () => {
  return (
    <section id="projects">
      <Fade cascade damping={0.1}>
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-technologies"><strong>Technologies:</strong> {project.technologies}</p>
              <p className="project-description">{project.description}</p>
              <button className="view-project-button">View Project</button>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
};

export default Projects;