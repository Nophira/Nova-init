
export interface ProjectStructure {
  projectName: string;
  setupType: SetupType;
  monorepo: MonorepoTool;
  packageManagers: PackageManagerConfig;
  frontend?: FrontendSetup;
  backend?: BackendSetup;
  databases: DatabaseSetup[];
  initializeGit: boolean;
  techStack?: string;
}


export type SetupType = 'custom' | 'predefined';


export type MonorepoTool = 'none' | 'lerna' | 'nx' | 'turborepo';


export type PackageManager = 'npm' | 'pnpm' | 'bun';


export type Language = 'javascript' | 'typescript';


export type FrontendFramework =
  | 'react'
  | 'nextjs'
  | 'vue'
  | 'svelte'
  | 'angular'
  | 'nuxtjs'
  | 'astro'
  | 'remix'
  | 'solid'
  | 'qwik'
  | 'preact'
  | 'lit';


export type BackendFramework = 'express' | 'nestjs' | 'fastify';


export type DatabaseType =
  | 'mongodb'
  | 'postgres'
  | 'mysql'
  | 'redis'
  | 'neo4j'
  | 'cassandra'
  | 'couchdb'
  | 'mariadb'
  | 'cockroachdb'
  | 'edgedb'
  | 'surrealdb'
  | 'yugabytedb';


export interface PackageManagerConfig {
  monorepo?: PackageManager;
  frontend?: PackageManager;
  backend?: PackageManager;
}


export interface FrontendSetup {
  language: Language;
  framework: FrontendFramework;
  folderName?: string;
  packageManager: PackageManager;
  buildTool?: BuildTool;
}


export type BuildTool = 'vite';


export interface BackendSetup {
  language: Language;
  framework: BackendFramework;
  useMicroservices: boolean;
  microserviceNames?: string[];
  folderName?: string;
  packageManager: PackageManager;
  features?: BackendFeature[];
  database?: DatabaseType;
}

export type BackendFeature =
  | 'typescript'

export interface DatabaseSetup {
  type: DatabaseType;
  name: string;
  port?: number;
  containerName?: string;
  networkName?: string;
  volumeName?: string;
  database?: string;
  username?: string;
  password?: string;
  version?: string;
  environment?: Record<string, string>;
  volumes?: string[];
  networks?: string[];
}

export interface DockerDatabaseConfig {
  image: string;
  ports: string[];
  environment: Record<string, string>;
  volumes: string[];
  networks: string[];
  command?: string;
  healthcheck?: HealthCheck;
}

export interface HealthCheck {
  test: string[];
  interval?: string;
  timeout?: string;
  retries?: number;
  startPeriod?: string;
}


export interface SetupCommandOptions {

  projectName?: string;
  setupType?: SetupType;
  monorepo?: MonorepoTool;
  monorepoPackageManager?: PackageManager;
  frontend?: FrontendFramework;
  frontendLanguage?: Language;
  frontendFolder?: string;
  frontendPackageManager?: PackageManager;
  vite?: boolean; 
  backend?: BackendFramework;
  backendLanguage?: Language;
  backendFolder?: string;
  backendPackageManager?: PackageManager;

  
  microservices?: boolean;
  databases?: string; 
  git?: boolean;
  packageManager?: PackageManager;
  techstack?: string;
  help?: boolean;
}


export interface PromptResponses {
  projectName: string;
  setupType: SetupType;
  monorepo: MonorepoTool;
  monorepoPackageManager?: PackageManager;
  frontend?: FrontendSetup;
  backend?: BackendSetup;
  databases: DatabaseSetup[];
  initializeGit: boolean;
  techStack?: string;
}


export interface FrameworkInstaller {
  name: string;
  version: string;
  dependencies: string[];
  devDependencies: string[];
  scripts: Record<string, string>;
  configFiles: ConfigFile[];
}


export interface ConfigFile {
  name: string;
  content: string;
  path: string;
}


export interface DatabaseInstaller {
  type: DatabaseType;
  dockerImage: string;
  defaultPort: number;
  environment: Record<string, string>;
  volumes: string[];
  healthcheck?: HealthCheck;
}


export type PartialFrontendSetup = Partial<FrontendSetup>;


export type PartialBackendSetup = Partial<BackendSetup>;


export type PartialDatabaseSetup = Partial<DatabaseSetup>;


export type RequiredFrontendSetup = Required<Pick<FrontendSetup, 'language' | 'framework' | 'packageManager'>>;


export type RequiredBackendSetup = Required<Pick<BackendSetup, 'language' | 'framework' | 'packageManager'>>;


export type RequiredDatabaseSetup = Required<Pick<DatabaseSetup, 'type' | 'name'>>;


export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}


export interface ConfigValidation {
  projectStructure: ValidationResult;
  frameworks: ValidationResult;
  databases: ValidationResult;
  monorepo: ValidationResult;
}


export class NovaInitError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'NovaInitError';
  }
}

export class FrameworkInstallationError extends NovaInitError {
  constructor(
    framework: string,
    details?: Record<string, any>
  ) {
    super(`Failed to install framework: ${framework}`, 'FRAMEWORK_INSTALLATION_FAILED', details);
    this.name = 'FrameworkInstallationError';
  }
}


export class DatabaseSetupError extends NovaInitError {
  constructor(
    database: string,
    details?: Record<string, any>
  ) {
    super(`Failed to setup database: ${database}`, 'DATABASE_SETUP_FAILED', details);
    this.name = 'DatabaseSetupError';
  }
}