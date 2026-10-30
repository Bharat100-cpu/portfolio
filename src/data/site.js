// All portfolio content lives here (sourced from the résumé). Edit text here only.
export const profile = {
  name: 'Bharat Kumar',
  role: 'Salesforce Developer',
  location: 'Mathura, Uttar Pradesh, India',
  summary:
    'Salesforce Developer with 4 years across Experience, Sales and Service Cloud. I build production-grade Apex and LWC, integrations, and the automation that replaces manual work.',
  longSummary:
    '4 years architecting scalable Experience Cloud, Sales Cloud and Service Cloud solutions for global clients including Pinterest, Assurant and CleverTap. Builds production-grade Apex and LWC applications with REST/SOAP integrations, and turns manual, error-prone processes into reusable LWC component libraries and orchestrated batch and queueable job chains.',
};

export const links = {
  email: 'bharatmtr2002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kumar-bharat',
  trailhead: 'https://www.salesforce.com/trailblazer/bharatkumar2002',
  github: 'https://github.com/Bharat100-cpu',
};

export const stats = [
  ['4+', 'years on Salesforce'],
  ['5', 'client projects'],
  ['4', 'certifications'],
  ['>90%', 'test coverage'],
  ['50+', 'pages to LWC'],
];

// The 12 skill tiles that persist and flow through every scene.
export const tokens = [
  { name: 'Apex', ring: 0, project: 4, exp: 1 },
  { name: 'Batch Apex', ring: 0, project: 0, exp: 0 },
  { name: 'Queueable', ring: 0, project: 0, exp: 0 },
  { name: 'Scheduled Jobs', ring: 0, project: 2, exp: 1 },
  { name: 'LWC', ring: 1, project: 0, exp: 0 },
  { name: 'Aura', ring: 1, project: 1, exp: 2 },
  { name: 'Visualforce', ring: 1, project: 1, exp: 2 },
  { name: 'Flows', ring: 1, project: 3, exp: 3 },
  { name: 'REST API', ring: 2, project: 4, exp: 4 },
  { name: 'Connected Apps', ring: 2, project: 2, exp: 4 },
  { name: 'Service Cloud', ring: 2, project: 1, exp: 2 },
  { name: 'Sales Cloud', ring: 2, project: 3, exp: 3 },
];

export const legend = [
  'Inner ring · backend Apex',
  'Middle ring · UI and automation',
  'Outer ring · integration and clouds',
  'Closer to core = used daily',
  'Toolbox · DX, Git, Copado, Jira',
];

export const skillGroups = [
  ['Salesforce clouds', 'Experience Cloud, Sales Cloud, Service Cloud'],
  ['Backend', 'Apex, Apex Triggers, Batch Apex, Queueable Apex, Scheduled Jobs, Anonymous Apex, SOQL/SOSL'],
  ['Frontend', 'Lightning Web Components (LWC), Aura, Visualforce, reusable LWC design systems'],
  ['Automation', 'Salesforce Flow, Process Builder, Workflow Rules, Approval Processes, batch job orchestration'],
  ['Integration', 'REST / SOAP API, Connected Apps, OAuth 2.0, Quip, ClearTax GST Portal'],
  ['DevOps', 'Salesforce DX, Git, GitHub, GitHub Actions (basic), Copado, Apache ANT, Change Sets, Workbench, Jira'],
  ['Languages and data', 'JavaScript, SOQL/SOSL, MongoDB (NoSQL), XML'],
  ['Ways of working', 'Agile (Scrum), sprint planning, technical design reviews, requirement gathering'],
  ['AI and data', 'Salesforce AI Specialist, Agentforce, Einstein AI'],
];

export const projects = [
  {
    kicker: 'Healthcare · PCGI · Current',
    title: 'MNK',
    short:
      'PA Re-Auth Hub: a weekly batch and queueable chain finds Prior Authorizations expiring in 40 days, opens Reimbursement cases, runs eBV and syncs to ARMory, all in a live LWC dashboard. Plus an Outbound Fax Analysis engine that builds Excel reports and draft emails automatically.',
    points: [
      'PA Re-Auth Hub: a weekly batch-and-queueable job chain that identifies patients whose Prior Authorization expires within 40 days, auto-creates Reimbursement cases, triggers electronic benefit verification (eBV) and syncs results to the ARMory system, surfaced in a real-time LWC dashboard.',
      'Outbound Fax Analysis engine that classifies the daily fax queue and auto-generates downloadable Excel workbooks and draft overview emails, eliminating manual report compilation.',
      'Redesigned Daily Data Checks into one actionable to-do list with one-click auto-fix actions, plus an hourly Batch Orchestrator tab for scheduled job health.',
      'Authored developer architecture documentation and end-user guides adopted as the team reference.',
    ],
    env: 'Batch Apex, Queueable Apex, LWC',
  },
  {
    kicker: 'Insurance · Fexle',
    title: 'Assurant',
    short:
      'In an 18-member architecture team: migrated 50+ Visualforce pages to LWC and automated case routing and SLA tracking.',
    points: [
      'Collaborated within an 18-member global architecture team to scale an enterprise insurance platform on Service Cloud.',
      'Modernized a Visualforce-heavy UI by migrating 50+ complex pages to LWC and Aura, improving load times and cross-browser compatibility.',
      'Optimized Service Cloud workflows with automated case routing, escalation rules and SLA tracking.',
    ],
    env: 'Service Cloud, LWC, Aura, Visualforce',
  },
  {
    kicker: 'Customer engagement · Fexle',
    title: 'CleverTap',
    short:
      'Batch Apex and scheduled-job backend for high-volume records within governor limits, plus a Quip integration via Connected Apps.',
    points: [
      'Built a scalable backend data-processing architecture with Batch Apex and Scheduled Jobs in a 7-member cross-functional pod.',
      'Integrated Salesforce with Quip via Connected Apps for secure document sharing and real-time collaboration.',
      'Kept data integrity strong with test classes above 90% coverage across deployments.',
    ],
    env: 'Batch Apex, Scheduled Jobs, Connected Apps, Quip',
  },
  {
    kicker: 'Digital advertising · Fexle',
    title: 'Pinterest',
    short: 'Custom LWC for Sales Cloud, Order and Quote management, and Process Builder replaced by declarative Flows.',
    points: [
      'Built responsive Sales Cloud interfaces with custom LWC in a 10-member delivery pod.',
      'Implemented Order and Quote management that streamlined the digital ad sales lifecycle and reduced quoting errors.',
      'Replaced deprecated Process Builder automations with declarative Flows to cut technical debt.',
    ],
    env: 'Sales Cloud, LWC, Salesforce Flow',
  },
  {
    kicker: 'Real estate · Fexle',
    title: 'Robotex',
    short: 'Secure REST integrations with the ClearTax GST portal, plus Apex and LWC enhancements.',
    points: [
      'Automated financial reporting by building secure REST API integrations between Salesforce and the ClearTax GST Portal.',
      'Developed Apex backend logic and LWC frontend enhancements to scale a real estate management platform.',
    ],
    env: 'Apex, LWC, REST API, ClearTax GST Portal',
  },
];

// Experience blocks shown in the morph stage (5 blocks across 2 roles).
export const blocks = [
  ['PCGI · Dec 2025 – Now', 'Built a reusable LWC design-system kit, an in-browser Excel generator and an Apex error-logging framework for async jobs.'],
  ['PCGI · Dec 2025 – Now', "Business-day logic aligns IST schedules with the client's US calendar so batch jobs and SLA timing run on the right day."],
  ['Fexle · May 2022 – Jun 2025', 'Led the Classic to Lightning migration, lifting UI responsiveness and daily active adoption.'],
  ['Fexle · May 2022 – Jun 2025', 'Shipped global Sales Cloud features with Flows and kept test coverage above 90% on every deployment.'],
  ['Fexle · May 2022 – Jun 2025', 'Integrations and CI/CD: REST APIs, Connected Apps, Salesforce DX and Git workflows.'],
];

export const roles = [
  {
    company: 'PCGI',
    title: 'Salesforce Developer',
    when: 'Dec 2025 – Present',
    points: [
      'Audit and optimize complex Salesforce processes with code reviews, governor limit analysis and SOQL query tuning to improve platform throughput.',
      'Work with international stakeholders across time zones to turn requirements into Jira user stories and scalable Apex/LWC architectures.',
      'Built a reusable LWC design-system kit and a dependency-free in-browser Excel (.xlsx) generator adopted across multiple production dashboards, plus an Apex error-logging framework for async batch and queueable jobs.',
      "Implemented business-day logic to align the team's IST hours with the client's US business calendar for scheduled batch jobs and SLA timing.",
      'Manage project tracking and production deployments across sandboxes with Change Sets and Copado.',
      'Implemented Agentforce to prototype AI agents for business process automation.',
    ],
  },
  {
    company: 'Fexle Services Private Limited',
    title: 'Salesforce Developer',
    when: 'May 2022 – Jun 2025',
    points: [
      'Built high-performance solutions with LWC, Apex classes and triggers, adhering to governor limits and bulkification for large global user bases.',
      'Led an enterprise-wide migration from Salesforce Classic to Lightning Experience, improving UI responsiveness and daily active user adoption.',
      'Root-caused high-priority production bugs with structured debugging and regression testing to reduce downtime.',
      'Supported CI/CD with Salesforce DX and Git workflows, and contributed to design reviews that reduced deployment cycle times.',
      'Maintained above 90% test coverage across all deployments with comprehensive Apex test classes.',
    ],
  },
];

// Credential tiles (12, matching the 12 skill tiles). `href` makes a tile a link.
export const tiles = [
  { img: 'Platform-Developer-I.png', name: 'Platform Developer I', sub: 'Certification' },
  { img: 'ai-specialist.png', name: 'AI Specialist', sub: 'Certification' },
  { img: 'ai-associate.png', name: 'AI Associate', sub: 'Certification' },
  { img: 'Associate.png', name: 'Associate', sub: 'Certification' },
  { big: '↗', name: 'Trailhead', sub: 'trailblazer/bharatkumar2002', href: links.trailhead },
  { big: '↓', name: 'Résumé', sub: 'Download PDF', href: 'RESUME' },
  { img: 'apex-specialist.png', name: 'Apex Specialist', sub: 'Superbadge' },
  { img: 'lightning-web-components-specialist.webp', name: 'LWC Specialist', sub: 'Superbadge' },
  { img: 'apex-web-services-superbadge-unit.webp', name: 'Apex Web Services', sub: 'Superbadge unit' },
  { img: 'named-credentials-superbadge-unit.webp', name: 'Named Credentials', sub: 'Superbadge unit' },
  { big: 'MCA', name: 'Artificial Intelligence', sub: 'Chandigarh University · pursuing' },
  { big: 'BCA', name: 'Bon Maharaj Institute', sub: 'Mathura · Aug 2019 – Jul 2022' },
];

export const scenes = {
  headings: [
    "Hi, I'm<br><em>Bharat Kumar</em>",
    'Twelve tools, <em>one platform</em>',
    'Work that <em>shipped</em>',
    "Where I've <em>built</em>",
    'Certified &amp; <em>proven</em>',
    "Let's build <em>something great</em>",
  ],
  paragraphs: [
    profile.summary,
    'Closer to the core means used more. Also in my toolbox: Salesforce DX, Git, Copado, Jira, MongoDB, Agentforce.',
    'Five client projects, from healthcare job chains to insurance UI migrations.',
    'PCGI, Dec 2025 – Present · Fexle Services, May 2022 – Jun 2025',
    'Issued by Salesforce and verifiable on my Trailhead profile, alongside an MCA in AI.',
    `Open to new Salesforce roles. Based in ${profile.location}.<br><span class='mono'>${links.email}</span>`,
  ],
  pills: ['Verify on Trailhead ↗', 'Issued by Salesforce', 'Certifications', 'Superbadges', 'Education'],
  contact: [
    ['Email', links.email, `mailto:${links.email}`],
    ['LinkedIn', 'in/kumar-bharat ↗', links.linkedin],
    ['Trailhead', 'bharatkumar2002 ↗', links.trailhead],
    ['GitHub', 'Bharat100-cpu ↗', links.github],
    ['Résumé', 'download PDF ↓', 'RESUME'],
  ],
};
