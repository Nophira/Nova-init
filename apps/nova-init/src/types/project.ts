import type { PackageManager } from './package-manager.js';
import type { FrontendSetup, BackendSetup } from './framework.js';
import type { DatabaseConfig } from './database.js';
import type { SetupType, HostingType } from './setup.js';

export interface ProjectStructure {
  projectName: string;
  setupType: SetupType;
  monorepo: MonorepoTool;
  packageManagers: {
    monorepo?: PackageManager;
    frontend?: PackageManager;
    backend?: PackageManager;
  };
  frontend?: FrontendSetup;
  backend?: BackendSetup;
  databases: DatabaseConfig[];
  hosting: HostingType;
  initializeGit: boolean;
  techStack?: string;
}

export type MonorepoTool = 'lerna' | 'nx' | 'turborepo' | 'none';

export interface ProjectConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  private: boolean;
  workspaces?: string[];
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export interface ProjectPaths {
  root: string;
  frontend?: string;
  backend?: string;
  database?: string;
  docs?: string;
  tests?: string;
}

export interface ProjectMetadata {
  createdAt: Date;
  createdBy: string;
  version: string;
  features: string[];
  config: ProjectStructure;
}
