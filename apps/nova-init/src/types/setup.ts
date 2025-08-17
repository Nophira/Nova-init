export type SetupType = 'custom' | 'predefined';
export type HostingType = 'docker' | 'vercel' | 'netlify' | 'heroku' | 'aws' | 'gcp' | 'azure' | 'none';

export interface SetupOptions {
  interactive: boolean;
  skipPrompts: boolean;
  defaults: boolean;
  force: boolean;
  dryRun: boolean;
}

export interface SetupContext {
  cwd: string;
  projectName: string;
  options: SetupOptions;
  config: SetupConfig;
}

export interface SetupConfig {
  projectName: string;
  setupType: SetupType;
  monorepo: boolean;
  frontend: boolean;
  backend: boolean;
  database: boolean;
  hosting: boolean;
  git: boolean;
  techStack?: string;
}

export interface TechStack {
  name: string;
  description: string;
  frontend?: string[];
  backend?: string[];
  database?: string[];
  tools?: string[];
  features: string[];
}

export interface SetupResult {
  success: boolean;
  projectPath: string;
  createdFiles: string[];
  errors: string[];
  warnings: string[];
  nextSteps: string[];
}
