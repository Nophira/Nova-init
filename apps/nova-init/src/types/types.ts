export type MonorepoTool = 'lerna' | 'nx' | 'turborepo' | 'none';
export type PackageManager = 'npm' | 'pnpm' | 'bun';
export type SetupType = 'custom' | 'predefined';
export type HostingType = 'docker' | 'none';

export interface FrontendSetup {
  language: 'javascript' | 'typescript';
  framework: string;
  folderName: string;
  packageManager: PackageManager;
}

export interface BackendSetup {
  language: 'javascript' | 'typescript';
  framework: string;
  useMicroservices: boolean;
  microserviceNames?: string[];
  folderName?: string;
  packageManager: PackageManager;
}

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
  databases: string[];
  hosting: HostingType;
  initializeGit: boolean;
  techStack?: string;
}