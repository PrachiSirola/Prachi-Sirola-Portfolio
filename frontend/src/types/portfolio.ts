export type ProjectMockupType =
  | 'datalens'
  | 'attendance'
  | 'vastra'
  | 'ecommerce-suite'
  | 'datasheet-rag'
  | 'ticket-system';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  contribution: string;
  technologies: string[];
  features: string[];
  scaleNote?: string;
  mockupType: ProjectMockupType;
  featured?: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface StatMetric {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: 'store' | 'users' | 'sparkles' | 'layers';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'brain' | 'code' | 'server' | 'layout' | 'terminal';
  skills: string[];
}

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
  iconName: 'search' | 'compass' | 'code' | 'shield' | 'rocket';
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field for spam protection
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface DataLensSampleQuery {
  id: string;
  prompt: string;
  sql: string;
  insight: string;
  latencyMs: number;
  rowsScanned: string;
  chartData: { label: string; value: number; display: string }[];
}
