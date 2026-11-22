import type {
  DataLensSampleQuery,
  ExperienceItem,
  ProcessStepItem,
  ProjectItem,
  SkillCategory,
  StatMetric,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Prachi Sirola',
  monogram: 'PS.',
  title: 'Software Engineer | AI/ML | LLMs | Full-Stack Development',
  role: 'Software Engineer',
  tagline: 'AI/ML & Full-Stack Developer',
  heroDescription:
    'I independently design, build and deploy complete production systems, from frontend and backend to database, integrations and hosting.',
  quote:
    'I build intelligent software that is not only technically sound but also reliable, shipped and used in production.',
  availability: 'IMMEDIATE JOINER',
  phone: '+91 8867772707',
  location: 'Bengaluru, India',
  email: 'prachisirola07@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prachi-sirola/',
  github: 'https://github.com/PrachiSirola',
  resumePath: '/Prachi_Sirola_Resume.pdf',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const STAT_METRICS: StatMetric[] = [
  {
    id: 'stores',
    value: '10+',
    label: 'E-COMMERCE STORES LAUNCHED',
    sublabel: 'Reusable B2B storefront suite',
    iconName: 'store',
  },
  {
    id: 'employees',
    value: '50–500',
    label: 'EMPLOYEES PER ORGANIZATION',
    sublabel: 'Multi-tenant attendance · ~1M records',
    iconName: 'users',
  },
  {
    id: 'nl2sql',
    value: '85',
    label: 'NL-TO-SQL TEST QUERIES',
    sublabel: '100% accuracy on DataLensAI benchmark',
    iconName: 'sparkles',
  },
  {
    id: 'areas',
    value: '3',
    label: 'CORE ENGINEERING AREAS',
    sublabel: 'AI/ML · Backend · Full-Stack',
    iconName: 'layers',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'datalens-ai',
    name: 'DataLensAI',
    category: 'AI / Machine Learning / NL-to-SQL',
    shortDescription:
      'A local AI-powered data analyst that lets users query structured datasets in natural language, inspect generated SQL, and explore analytical outputs privately.',
    contribution:
      'Built the end-to-end local AI architecture on a custom LLM tuned from Qwen 2.5 7B, per-user isolated DuckDB workspaces, vector search retrieval, FastAPI backend, and React 19 analyst interface.',
    technologies: ['Python', 'FastAPI', 'React 19', 'DuckDB', 'Ollama', 'Qwen 2.5 7B'],
    features: [
      'Custom LLM-based NL-to-SQL workflow tuned from Qwen 2.5 7B',
      '100% accuracy achieved across 85 NL-to-SQL evaluation queries',
      'Per-user isolated DuckDB databases for strict local data boundaries',
      'Vector search integration for schema and metric context retrieval',
      'Fully local AI inference pipeline powered by Ollama',
    ],
    scaleNote: '100% accuracy on 85 NL-to-SQL test queries',
    mockupType: 'datalens',
    featured: true,
    githubUrl: 'https://github.com/PrachiSirola',
  },
  {
    id: 'attendance-platform',
    name: 'Multi-Tenant Attendance Management System',
    category: 'Full-Stack / Enterprise Software',
    shortDescription:
      'A production workforce attendance and payroll platform deployed across organizations in India and Dubai, handling ~1M attendance records.',
    contribution:
      'Independently designed, developed, and deployed the entire system—React 19 admin portal, Node.js/Express APIs, MongoDB schema, Telegram bot workflows, and Cloudinary selfie verification.',
    technologies: [
      'React 19',
      'MUI',
      'Redux',
      'Node.js',
      'Express',
      'MongoDB',
      'Telegraf',
      'Cloudinary',
    ],
    features: [
      'Employee, shift, break, leave, and salary management modules',
      'Role-based access control (RBAC) across multi-tenant organizations',
      'Selfie capture check-in verification via Cloudinary storage',
      'Telegram bot integration with Telegraf for rapid workforce updates',
      'Operational reports and real-time attendance analytics dashboards',
    ],
    scaleNote: 'Live in India & Dubai · 50–500 employees/org · ~1M records',
    mockupType: 'attendance',
  },
  {
    id: 'vastra',
    name: 'Vastra',
    category: 'B2B E-Commerce',
    shortDescription:
      'An end-to-end B2B wholesale e-commerce platform built for high-volume catalog sync, international buyers, and hardened account security.',
    contribution:
      'Independently engineered the Node.js/TypeScript backend, React 19 storefront, Razorpay checkout flow, Redis-resumable CJ Dropshipping sync workers, and TOTP 2FA authentication.',
    technologies: ['Node.js', 'TypeScript', 'React 19', 'MongoDB', 'Redis', 'Razorpay', 'CJ Dropshipping'],
    features: [
      'Razorpay payment gateway integration for wholesale transactions',
      'Redis-resumable CJ Dropshipping product catalog synchronization',
      'Multi-currency pricing support for cross-border buyers',
      'TOTP two-factor authentication (2FA) and CAPTCHA protection',
    ],
    mockupType: 'vastra',
    githubUrl: 'https://github.com/PrachiSirola',
  },
  {
    id: 'b2b-ecommerce-suite',
    name: 'B2B E-Commerce Suite',
    category: 'Full-Stack / E-Commerce Infrastructure',
    shortDescription:
      'A reusable multi-store storefront and backend architecture engineered to rapidly launch and maintain 10+ production e-commerce stores.',
    contribution:
      'Architected the reusable React storefront template and Express commerce engine, implemented Redis-to-MongoDB fallback resilience, and remediated an IDOR security vulnerability.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Stripe', 'CJ Dropshipping'],
    features: [
      'Reusable storefront template powering 10+ live stores',
      'Multi-store configuration and catalog architecture',
      'Graceful Redis-to-MongoDB fallback for uninterrupted reads',
      'Security hardening including IDOR vulnerability remediation',
      'Stripe payment processing and CJ Dropshipping integration',
    ],
    scaleNote: '10+ production stores launched from a shared core',
    mockupType: 'ecommerce-suite',
  },
  {
    id: 'chat-my-datasheet',
    name: 'Chat My Datasheet',
    category: 'AI / RAG / Developer Tools',
    shortDescription:
      'A locally running Retrieval-Augmented Generation application built for hardware engineers to query dense technical datasheets accurately.',
    contribution:
      'Designed the table-aware PDF chunking pipeline, ChromaDB vector store indexing, LangChain tool-calling agent, and prompt-injection guardrails running on local Ollama models.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama'],
    features: [
      'Table-aware PDF chunking preserving pinouts and electrical specs',
      'ChromaDB semantic retrieval with grounded citation snippets',
      'Tool-calling agent for structured parameter extraction',
      'Prompt-injection guardrails and fully local inference via Ollama',
    ],
    mockupType: 'datasheet-rag',
    githubUrl: 'https://github.com/PrachiSirola',
  },
  {
    id: 'ticket-management-system',
    name: 'Ticket Management System',
    category: 'Full-Stack Application',
    shortDescription:
      'A clean full-stack issue and ticket tracker with project-scoped permissions, audit history, and automated email notifications.',
    contribution:
      'Independently built the React/TypeScript frontend, Node.js/Express/MongoDB API, Brevo transactional email pipeline, and production deployments on Vercel and Render.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Brevo'],
    features: [
      'Project-level access control and role management',
      'Fast keyword search, filtering, and server-side pagination',
      'Complete ticket status transition history and audit trail',
      'Automated transactional email alerts powered by Brevo',
      'Production deployment across Vercel and Render',
    ],
    mockupType: 'ticket-system',
    githubUrl: 'https://github.com/PrachiSirola',
    liveDemoUrl: 'https://github.com/PrachiSirola',
  },
];

export const DATALENS_SAMPLE_QUERIES: DataLensSampleQuery[] = [
  {
    id: 'revenue-region',
    prompt: 'Show Q3 wholesale revenue by region and highlight top growth market',
    sql: `SELECT region,
       ROUND(SUM(order_total_usd), 2) AS revenue_usd,
       COUNT(DISTINCT order_id) AS orders
FROM wholesale_orders
WHERE order_date >= '2026-07-01' AND order_date < '2026-10-01'
GROUP BY region
ORDER BY revenue_usd DESC;`,
    insight:
      'Bengaluru & UAE corridors account for 64% of Q3 order volume, with average basket size up 14.2% quarter-over-quarter.',
    latencyMs: 142,
    rowsScanned: '48,210 rows · isolated DuckDB',
    chartData: [
      { label: 'IN-West', value: 88, display: '$184K' },
      { label: 'UAE', value: 76, display: '$159K' },
      { label: 'IN-South', value: 94, display: '$196K' },
      { label: 'EU', value: 52, display: '$108K' },
      { label: 'US', value: 64, display: '$132K' },
    ],
  },
  {
    id: 'shift-adherence',
    prompt: 'Compare on-time check-in rates across shift cohorts this month',
    sql: `SELECT shift_name,
       COUNT(*) AS total_logs,
       ROUND(100.0 * AVG(CASE WHEN delay_mins <= 5 THEN 1 ELSE 0 END), 1) AS on_time_pct
FROM attendance_logs
WHERE log_month = '2026-10'
GROUP BY shift_name
ORDER BY on_time_pct DESC;`,
    insight:
      'Morning and Hybrid Engineering cohorts maintain >95% adherence; Night Ops shows minor variance around Friday handovers.',
    latencyMs: 96,
    rowsScanned: '112,480 rows · isolated DuckDB',
    chartData: [
      { label: 'Morning', value: 97, display: '97.2%' },
      { label: 'Hybrid', value: 95, display: '95.4%' },
      { label: 'General', value: 91, display: '91.0%' },
      { label: 'Evening', value: 88, display: '88.3%' },
      { label: 'Night', value: 84, display: '84.1%' },
    ],
  },
  {
    id: 'sku-sync',
    prompt: 'Identify top 5 product categories by inventory sync velocity',
    sql: `SELECT category,
       COUNT(sku_id) AS synced_skus,
       ROUND(AVG(sync_duration_ms), 0) AS avg_ms
FROM catalog_sync_events
WHERE status = 'COMPLETED'
GROUP BY category
ORDER BY synced_skus DESC
LIMIT 5;`,
    insight:
      'Redis-resumable batches processed 14.6K SKUs with zero dropped checkpoints and sub-220ms average batch latency.',
    latencyMs: 118,
    rowsScanned: '29,940 rows · isolated DuckDB',
    chartData: [
      { label: 'Apparel', value: 92, display: '4.8K' },
      { label: 'Textiles', value: 78, display: '3.6K' },
      { label: 'Home', value: 66, display: '2.9K' },
      { label: 'Hardware', value: 54, display: '2.1K' },
      { label: 'Packaging', value: 38, display: '1.2K' },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'yogen-infotech',
    role: 'Software Developer',
    company: 'Yogen Infotech',
    location: 'Bengaluru, India',
    period: 'Jun 2026 – Present',
    summary:
      'End-to-end ownership of production SaaS, B2B e-commerce infrastructure, and local AI data analytics products.',
    highlights: [
      'Independently designed and built a multi-tenant attendance management platform live across India and Dubai (50–500 employees per organization, ~1M attendance records).',
      'Engineered the complete stack across React 19, MUI, Redux, Node.js, Express, MongoDB, Telegraf Telegram bot, Cloudinary selfie capture, and analytics dashboards.',
      'Architected a reusable B2B e-commerce storefront suite used to launch 10+ stores; resolved an IDOR vulnerability and built a Redis-to-MongoDB fallback layer.',
      'Developed DataLensAI, a local AI data analyst powered by a custom Qwen 2.5 7B workflow, achieving 100% accuracy on 85 NL-to-SQL test queries with isolated DuckDB and vector search.',
    ],
    technologies: [
      'React 19',
      'Node.js',
      'Express',
      'Python',
      'FastAPI',
      'MongoDB',
      'Redis',
      'DuckDB',
      'Ollama',
    ],
  },
  {
    id: 'atler',
    role: 'AI Engineer Intern',
    company: 'Atler',
    location: 'Remote',
    period: 'Nov 2025 – Mar 2026',
    summary:
      'Designed lightweight multi-agent orchestration systems and automated multi-platform LLM publishing pipelines.',
    highlights: [
      'Built a framework-free multi-agent AI platform orchestrating Gemini 2.5 Flash, Codestral, and Mistral models.',
      'Implemented lightweight, deterministic SQLite-based inter-agent communication and state persistence.',
      'Engineered an end-to-end content pipeline spanning web ingestion, LLM generation, human approval queue, and automated publishing to 8 platforms.',
    ],
    technologies: ['Python', 'Gemini 2.5 Flash', 'Codestral', 'Mistral', 'SQLite', 'Multi-Agent Systems'],
  },
  {
    id: 'infotact',
    role: 'Data Associate Intern',
    company: 'Infotact Solutions',
    location: 'Dehradun, India',
    period: 'Jun – Sep 2025',
    summary:
      'Data processing and analysis, data pipelines and data-quality workflows.',
    highlights: [
      'Data processing and analysis across operational datasets.',
      'Built data pipelines and data-quality workflows.',
    ],
    technologies: ['Python', 'SQL', 'Data Pipelines', 'Data Quality'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI / ML',
    subtitle: 'LLMs, agents, and local inference',
    iconName: 'brain',
    skills: [
      'OpenCV',
      'Ollama',
      'LangChain',
      'ChromaDB',
      'Prompt Engineering',
      'Tool-Calling Agents',
      'NL-to-SQL',
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core programming and query languages',
    iconName: 'code',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'APIs, real-time services, caching, and databases',
    iconName: 'server',
    skills: [
      'FastAPI',
      'Node.js',
      'Express',
      'REST APIs',
      'Socket.IO',
      'MongoDB',
      'Redis',
      'DuckDB',
      'SQLite',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Responsive interfaces and state management',
    iconName: 'layout',
    skills: ['React 19', 'Vite', 'Tailwind CSS', 'MUI', 'Redux'],
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    subtitle: 'Containers, hosting, and workflow',
    iconName: 'terminal',
    skills: [
      'Docker',
      'Git/GitHub',
      'Linux',
      'Render',
      'Vercel',
      'Cloudflare',
      'MongoDB Atlas',
      'Cloudinary',
      'Claude Code',
    ],
  },
];

export const PILLARS = [
  {
    icon: 'layers',
    title: 'END-TO-END OWNERSHIP',
    text: 'Frontend, backend, database, integrations and hosting, built and shipped independently.',
  },
  {
    icon: 'brain',
    title: 'PRODUCTION AI / ML',
    text: 'Local LLMs, NL-to-SQL, RAG and tool-calling agents with measured accuracy.',
  },
  {
    icon: 'shield',
    title: 'SECURE & RESILIENT',
    text: 'RBAC, TOTP 2FA, IDOR fixes and Redis-to-MongoDB fallbacks built in.',
  },
  {
    icon: 'rocket',
    title: 'LIVE IN PRODUCTION',
    text: 'Platforms running in India and Dubai, plus 10+ launched stores.',
  },
] as const;

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    description:
      'Clarify the core problem, user workflows, technical constraints, and measurable outcomes before writing code.',
    iconName: 'search',
  },
  {
    number: '02',
    title: 'ARCHITECT',
    description:
      'Define system boundaries, data models, API contracts, AI pipelines, and failure-resilient infrastructure.',
    iconName: 'compass',
  },
  {
    number: '03',
    title: 'BUILD',
    description:
      'Implement clean, modular frontend, backend, database, and LLM components with end-to-end ownership.',
    iconName: 'code',
  },
  {
    number: '04',
    title: 'VALIDATE',
    description:
      'Stress-test edge cases, security boundaries, query accuracy, latency, and reliability under real workloads.',
    iconName: 'shield',
  },
  {
    number: '05',
    title: 'DEPLOY',
    description:
      'Ship to production with observability, clean documentation, and iterative improvements driven by real usage.',
    iconName: 'rocket',
  },
];

export const EDUCATION = {
  degree: 'B.Tech in Computer Science & Engineering',
  institution: 'Uttaranchal University, Dehradun',
  period: '2022 – 2026',
  cgpa: '8.01',
} as const;

export const ABOUT_PARAGRAPHS = [
  'Software Engineer who independently designs, builds and deploys complete production systems, from frontend and backend to database, integrations and hosting, with strong depth in both AI/ML and full-stack development.',
  'Built a multi-tenant attendance platform live in India and Dubai (~1M attendance records), a B2B e-commerce platform launched as 10+ stores, and DataLensAI, a local AI data analyst that scored 100% on 85 NL-to-SQL test queries.',
  'Strong in LLMs, ML, React and Node.js. Based in Bengaluru and available to join immediately.',
];
