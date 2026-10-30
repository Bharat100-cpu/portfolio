// All portfolio content lives here (sourced from the résumé). Edit text here only.
export const profile = {
  name: 'Bharat Kumar',
  role: 'Salesforce Developer',
  location: 'Mathura, Uttar Pradesh, India',
  pitch: 'I build production-grade Apex and LWC, integrations, and the automation that replaces manual work.',
  about: [
    'Salesforce Developer with 4 years architecting scalable Experience Cloud, Sales Cloud and Service Cloud solutions for global clients including Pinterest, Assurant and CleverTap.',
    'I build production-grade Apex and LWC applications with REST/SOAP integrations, and I turn manual, error-prone processes into reusable LWC component libraries and orchestrated batch and queueable job chains. I also work with Salesforce DX, GitHub Actions basics and Copado-based release management.',
    'I hold 4 active Salesforce certifications and I am pursuing an MCA in Artificial Intelligence.',
  ],
  facts: [
    ['Experience', '4 years on Salesforce'],
    ['Clouds', 'Experience · Sales · Service'],
    ['Certified', 'Platform Developer I, AI Specialist, AI Associate, Associate'],
    ['Clients', 'Pinterest, Assurant, CleverTap'],
    ['Studying', 'MCA in Artificial Intelligence'],
    ['Based in', 'Mathura, India'],
  ],
};

export const links = {
  email: 'bharatmtr2002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kumar-bharat',
  trailhead: 'https://www.salesforce.com/trailblazer/bharatkumar2002',
  github: 'https://github.com/Bharat100-cpu',
};

// The 12 skill tiles. They stay in the sidebar and light up for whatever is in view.
export const skills = [
  'Apex', 'Batch Apex', 'Queueable', 'Scheduled Jobs',
  'LWC', 'Aura', 'Visualforce', 'Flows',
  'REST API', 'Connected Apps', 'Service Cloud', 'Sales Cloud',
];

export const roles = [
  {
    company: 'PCGI',
    title: 'Salesforce Developer',
    when: 'Dec 2025 – Present',
    stack: ['Apex', 'Batch Apex', 'Queueable', 'Scheduled Jobs', 'LWC'],
    points: [
      'Built a reusable LWC design-system kit and a dependency-free in-browser Excel (.xlsx) generator adopted across multiple production dashboards, plus an Apex error-logging framework for async batch and queueable jobs.',
      "Implemented business-day logic that aligns the team's IST hours with the client's US business calendar, so scheduled batch jobs and SLA timing run on the correct day.",
      'Audit and optimize complex Salesforce processes with code reviews, governor limit analysis and SOQL query tuning to improve platform throughput.',
      'Work with international stakeholders across time zones to turn requirements into Jira user stories and scalable Apex/LWC architectures.',
      'Manage project tracking and production deployments across sandboxes with Change Sets and Copado.',
      'Implemented Agentforce to prototype AI agents for business process automation.',
    ],
  },
  {
    company: 'Fexle Services',
    title: 'Salesforce Developer',
    when: 'May 2022 – Jun 2025',
    stack: ['Apex', 'LWC', 'Aura', 'Visualforce', 'Flows', 'REST API'],
    points: [
      'Led an enterprise-wide migration from Salesforce Classic to Lightning Experience, improving UI responsiveness and daily active user adoption.',
      'Built high-performance solutions with LWC, Apex classes and triggers, following governor limits and bulkification best practices for large global user bases.',
      'Maintained above 90% test coverage across all deployments with comprehensive Apex test classes.',
      'Root-caused high-priority production bugs with structured debugging and regression testing to reduce downtime.',
      'Supported CI/CD with Salesforce DX and Git workflows, and contributed to design reviews that reduced deployment cycle times.',
    ],
  },
];

export const projects = [
  {
    kicker: 'Healthcare · PCGI · Current',
    title: 'MNK',
    headline: 'PA Re-Auth Hub and Outbound Fax Analysis',
    short:
      'A weekly batch and queueable chain finds Prior Authorizations expiring within 40 days, opens Reimbursement cases, runs eBV and syncs to ARMory, all surfaced in a real-time LWC dashboard.',
    stack: ['Batch Apex', 'Queueable', 'Scheduled Jobs', 'LWC', 'Apex'],
    points: [
      'PA Re-Auth Hub: a weekly batch-and-queueable job chain that identifies patients whose Prior Authorization expires within 40 days, auto-creates Reimbursement cases, triggers electronic benefit verification (eBV) and syncs results to the ARMory system.',
      'Outbound Fax Analysis engine that classifies the daily fax queue and auto-generates downloadable Excel workbooks and draft overview emails, eliminating manual report compilation.',
      'Redesigned Daily Data Checks into one actionable to-do list with one-click auto-fix actions, plus an hourly Batch Orchestrator tab for scheduled job health.',
      "Authored developer architecture documentation and end-user guides adopted as the team's reference.",
    ],
  },
  {
    kicker: 'Insurance · Fexle',
    title: 'Assurant',
    headline: 'Visualforce to LWC modernization',
    short:
      'In an 18-member global architecture team, migrated 50+ complex Visualforce pages to LWC and Aura and automated Service Cloud case routing and SLA tracking.',
    stack: ['Service Cloud', 'LWC', 'Aura', 'Visualforce'],
    points: [
      'Scaled a highly customized enterprise insurance platform on Service Cloud within an 18-member global architecture team.',
      'Migrated 50+ complex Visualforce pages to LWC and Aura, improving page load times and cross-browser compatibility.',
      'Optimized Service Cloud workflows with automated case routing, escalation rules and SLA tracking.',
    ],
  },
  {
    kicker: 'Customer engagement · Fexle',
    title: 'CleverTap',
    headline: 'High-volume async processing and Quip integration',
    short:
      'Batch Apex and Scheduled Jobs backend for high-volume records within governor limits, plus a secure Quip integration through Connected Apps.',
    stack: ['Batch Apex', 'Scheduled Jobs', 'Connected Apps', 'Apex'],
    points: [
      'Built a scalable backend data-processing architecture with Batch Apex and Scheduled Jobs in a 7-member cross-functional pod.',
      'Integrated Salesforce with Quip via Connected Apps for secure document sharing and real-time collaboration.',
      'Kept data integrity strong with test classes above 90% code coverage.',
    ],
  },
  {
    kicker: 'Digital advertising · Fexle',
    title: 'Pinterest',
    headline: 'Sales Cloud quoting and automation',
    short:
      'Custom LWC interfaces for Sales Cloud, Order and Quote management, and deprecated Process Builder automations replaced with Flows.',
    stack: ['Sales Cloud', 'LWC', 'Flows'],
    points: [
      'Built responsive Sales Cloud interfaces with custom LWC in a 10-member delivery pod.',
      'Implemented Order and Quote management that streamlined the digital ad sales lifecycle and reduced quoting errors.',
      'Replaced deprecated Process Builder automations with declarative Flows to cut technical debt.',
    ],
  },
  {
    kicker: 'Real estate · Fexle',
    title: 'Robotex',
    headline: 'GST portal integration',
    short: 'Secure REST integrations between Salesforce and the ClearTax GST Portal to automate financial reporting.',
    stack: ['REST API', 'Apex', 'LWC'],
    points: [
      'Automated financial reporting by building secure REST API integrations between Salesforce and the ClearTax GST Portal.',
      'Developed Apex backend logic and LWC frontend enhancements to scale a real estate management platform.',
    ],
  },
];

export const skillGroups = [
  ['Salesforce clouds', 'Experience Cloud, Sales Cloud, Service Cloud'],
  ['Backend', 'Apex, Apex Triggers, Batch Apex, Queueable Apex, Scheduled Jobs, Anonymous Apex, SOQL/SOSL'],
  ['Frontend', 'Lightning Web Components (LWC), Aura, Visualforce, reusable LWC design systems'],
  ['Automation', 'Salesforce Flow, Process Builder, Workflow Rules, Approval Processes, batch job orchestration'],
  ['Integration', 'REST / SOAP API, Connected Apps, OAuth 2.0, Quip, ClearTax GST Portal'],
  ['DevOps', 'Salesforce DX, Git, GitHub, GitHub Actions (basic), Copado, Apache ANT, Change Sets, Workbench, Jira'],
  ['Languages and data', 'JavaScript, SOQL/SOSL, MongoDB (NoSQL), XML'],
  ['AI', 'Agentforce, Einstein AI'],
  ['Ways of working', 'Agile (Scrum), sprint planning, technical design reviews, requirement gathering'],
];

export const certifications = [
  { img: 'Platform-Developer-I.png', name: 'Platform Developer I' },
  { img: 'ai-specialist.png', name: 'AI Specialist' },
  { img: 'ai-associate.png', name: 'AI Associate' },
  { img: 'Associate.png', name: 'Associate' },
];

export const superbadges = [
  { img: 'apex-specialist.png', name: 'Apex Specialist', sub: 'Superbadge' },
  { img: 'lightning-web-components-specialist.webp', name: 'LWC Specialist', sub: 'Superbadge' },
  { img: 'apex-web-services-superbadge-unit.webp', name: 'Apex Web Services', sub: 'Superbadge unit' },
  { img: 'named-credentials-superbadge-unit.webp', name: 'Named Credentials', sub: 'Superbadge unit' },
];

export const education = [
  { degree: 'MCA, Artificial Intelligence', school: 'Chandigarh University', when: 'Pursuing' },
  { degree: 'BCA', school: 'Bon Maharaj Institute of Management & Technology, Mathura', when: 'Aug 2019 – Jul 2022' },
];

// Reusable solutions built independently of any client (generic, no client names).
export const solutions = [
  {
    kicker: 'Developer tooling · Apex + LWC',
    title: 'Transaction Inspector',
    headline: 'An in-org profiler for what a record save really runs',
    short:
      'A native Salesforce tool that profiles a record insert or update and shows every SOQL query, DML statement, flow, trigger, callout and async job it starts, grouped per transaction with governor-limit usage. It flags risky patterns such as queries in loops and unbulkified code, and data never leaves the org.',
    stack: ['Apex', 'Queueable', 'Scheduled Jobs', 'LWC', 'REST API'],
    points: [
      'Three capture modes: simulate a save inside an Apex test run started through the Tooling API and rolled back, trace real users live with TraceFlags, or commit in a sandbox and follow whole async chains.',
      'A multi-step Queueable engine with a Transaction Finalizer and a scheduled sweeper calls the Tooling and REST APIs through a Named Credential, fetches debug logs and always switches logging back off.',
      'An Apex log parser builds a tree of transactions (sync save, future, Queueable, batch chunks, platform events) and raises findings with a severity and a suggested fix.',
      'LWC console with record and field pickers, a transaction map, query, findings and async-job tabs, and a dependency-free Excel export.',
      'Configured through custom metadata and a permission set, with Apex tests and a Node.js companion tool for very large logs.',
    ],
  },
  {
    kicker: 'Platform operations · Apex + LWC',
    title: 'Scheduled Jobs Manager',
    headline: 'One orchestrator and console for every scheduled job',
    short:
      'A single hourly orchestrator replaces scattered System.schedule jobs. Schedules become records that admins can view, pause, edit and run from one tab without writing Apex, and every launch is checked against org async capacity first.',
    stack: ['Apex', 'Batch Apex', 'Queueable', 'Scheduled Jobs', 'LWC'],
    points: [
      'One schedulable orchestrator closes finished runs from AsyncApexJob, launches due jobs by priority after dependency and capacity checks, and rolls the next run forward so missed windows never stack up.',
      'A Queueable launcher starts batch, Queueable or Schedulable classes by name, but only those allow-listed in custom metadata, so editing a record can never run arbitrary Apex.',
      'A cron engine in Apex and JavaScript parses and explains Salesforce cron syntax (L, W, #, named days and months, time zones) as the admin types.',
      'A capacity service watches running and holding batches and the daily async limit to protect the flex queue.',
      'The LWC console also lists standard scheduled Apex from CronTrigger and can adopt, release or run those jobs, gated by a custom permission checked in Apex.',
    ],
  },
];
