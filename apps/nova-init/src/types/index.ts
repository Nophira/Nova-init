// ============================================================================
// NOVA-INIT TYPES - Zentrale Typdefinitionen für alle Commands und Prompts
// ============================================================================

// ============================================================================
// CORE TYPES - Grundlegende Typen
// ============================================================================

/**
 * Hauptkonfiguration für das gesamte Projekt
 */
export interface ProjectStructure {
  projectName: string;
  setupType: SetupType;
  monorepo: MonorepoTool;
  packageManagers: PackageManagerConfig;
  frontend?: FrontendSetup;
  backend?: BackendSetup;
  databases: DatabaseSetup[];
  hosting: HostingOption;
  initializeGit: boolean;
  techStack?: string;
}

/**
 * Setup-Typen für das Projekt
 */
export type SetupType = 'custom' | 'predefined';

/**
 * Verfügbare Monorepo-Tools
 */
export type MonorepoTool = 'none' | 'lerna' | 'nx' | 'turborepo';

/**
 * Verfügbare Package Manager
 */
export type PackageManager = 'npm' | 'pnpm' | 'bun';

/**
 * Verfügbare Programmiersprachen
 */
export type Language = 'javascript' | 'typescript';

/**
 * Verfügbare Frontend-Frameworks
 */
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

/**
 * Verfügbare Backend-Frameworks
 */
export type BackendFramework = 'express' | 'nestjs' | 'fastify';

/**
 * Verfügbare Datenbanktypen
 */
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

/**
 * Verfügbare Hosting-Optionen
 */
export type HostingOption = 'docker' | 'none';

// ============================================================================
// PACKAGE MANAGER CONFIGURATION
// ============================================================================

/**
 * Konfiguration für Package Manager in verschiedenen Bereichen
 */
export interface PackageManagerConfig {
  monorepo?: PackageManager;
  frontend?: PackageManager;
  backend?: PackageManager;
}

// ============================================================================
// FRONTEND CONFIGURATION
// ============================================================================

/**
 * Frontend-Setup Konfiguration
 */
export interface FrontendSetup {
  language: Language;
  framework: FrontendFramework;
  folderName?: string;
  packageManager: PackageManager;
  buildTool?: BuildTool;
}

/**
 * Verfügbare Build-Tools
 */
export type BuildTool = 'vite';

// ============================================================================
// BACKEND CONFIGURATION
// ============================================================================

/**
 * Backend-Setup Konfiguration
 */
export interface BackendSetup {
  language: Language;
  framework: BackendFramework;
  useMicroservices: boolean;
  microserviceNames?: string[];
  folderName?: string;
  packageManager: PackageManager;
  features?: BackendFeature[];
  database?: DatabaseType;
  testing?: BackendTestingFramework;
  documentation?: DocumentationTool;
}

/**
 * Verfügbare Backend-Features
 */
export type BackendFeature = 
  | 'typescript' 
  | 'swagger' 
  | 'jest' 
  | 'prisma' 
  | 'typeorm' 
  | 'mongoose' 
  | 'passport' 
  | 'helmet';

/**
 * Verfügbare Backend Testing-Frameworks
 */
export type BackendTestingFramework = 'jest' | 'mocha' | 'chai' | 'supertest';

/**
 * Verfügbare Dokumentations-Tools
 */
export type DocumentationTool = 'swagger' | 'jsdoc' | 'typedoc' | 'none';

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================

/**
 * Datenbank-Setup Konfiguration
 */
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

/**
 * Docker-spezifische Datenbank-Konfiguration
 */
export interface DockerDatabaseConfig {
  image: string;
  ports: string[];
  environment: Record<string, string>;
  volumes: string[];
  networks: string[];
  command?: string;
  healthcheck?: HealthCheck;
}

/**
 * Health Check Konfiguration für Docker-Container
 */
export interface HealthCheck {
  test: string[];
  interval: string;
  timeout: string;
  retries: number;
  startPeriod: string;
}

// ============================================================================
// MICROSERVICES CONFIGURATION
// ============================================================================

/**
 * Microservice-Konfiguration
 */
export interface MicroserviceConfig {
  name: string;
  language: Language;
  framework: BackendFramework;
  packageManager: PackageManager;
  database?: DatabaseType;
  port?: number;
  folderName?: string;
}

// ============================================================================
// COMMAND LINE ARGUMENTS
// ============================================================================

/**
 * Parsed Command Line Arguments
 */
export interface ParsedArgs {
  [key: string]: string | boolean | number;
}

/**
 * Add Command Options
 */
export interface AddCommandOptions {
  framework?: string;
  lang?: Language;
  vite?: boolean;
  folder?: string;
  database?: DatabaseType;
  port?: number;
  containerName?: string;
  networkName?: string;
  volumeName?: string;
  username?: string;
  password?: string;
  tool?: MonorepoTool;
  techstack?: string;
  microservices?: boolean;
  help?: boolean;
  h?: boolean;
}

/**
 * Setup Command Options
 */
export interface SetupCommandOptions {
  'project-name'?: string;
  projectName?: string; // camelCase version for commander
  'setup-type'?: SetupType;
  setupType?: SetupType; // camelCase version for commander
  monorepo?: MonorepoTool;
  'monorepo-package-manager'?: PackageManager;
  monorepoPackageManager?: PackageManager; // camelCase version for commander
  frontend?: FrontendFramework;
  'frontend-language'?: Language;
  frontendLanguage?: Language; // camelCase version for commander
  'frontend-folder'?: string;
  frontendFolder?: string; // camelCase version for commander
  'frontend-package-manager'?: PackageManager;
  frontendPackageManager?: PackageManager; // camelCase version for commander
  backend?: BackendFramework;
  'backend-language'?: Language;
  backendLanguage?: Language; // camelCase version for commander
  'backend-folder'?: string;
  backendFolder?: string; // camelCase version for commander
  'backend-package-manager'?: PackageManager;
  backendPackageManager?: PackageManager; // camelCase version for commander
  microservices?: boolean;
  databases?: string; // String für comma-separated values von commander.js
  hosting?: HostingOption;
  git?: boolean;
  'package-manager'?: PackageManager;
  packageManager?: PackageManager; // camelCase version for commander
  techstack?: string;
  help?: boolean;
}

// ============================================================================
// PROMPT RESPONSES
// ============================================================================

/**
 * Antworten von verschiedenen Prompts
 */
export interface PromptResponses {
  projectName: string;
  setupType: SetupType;
  monorepo: MonorepoTool;
  monorepoPackageManager?: PackageManager;
  frontend?: FrontendSetup;
  backend?: BackendSetup;
  databases: DatabaseSetup[];
  hosting: HostingOption;
  initializeGit: boolean;
  techStack?: string;
}

// ============================================================================
// INSTALLER CONFIGURATIONS
// ============================================================================

/**
 * Framework-Installer Konfiguration
 */
export interface FrameworkInstaller {
  name: string;
  version: string;
  dependencies: string[];
  devDependencies: string[];
  scripts: Record<string, string>;
  configFiles: ConfigFile[];
}

/**
 * Konfigurationsdatei für Frameworks
 */
export interface ConfigFile {
  name: string;
  content: string;
  path: string;
}

/**
 * Datenbank-Installer Konfiguration
 */
export interface DatabaseInstaller {
  type: DatabaseType;
  dockerImage: string;
  defaultPort: number;
  environment: Record<string, string>;
  volumes: string[];
  healthcheck?: HealthCheck;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Teilweise Frontend-Setup (für Updates)
 */
export type PartialFrontendSetup = Partial<FrontendSetup>;

/**
 * Teilweise Backend-Setup (für Updates)
 */
export type PartialBackendSetup = Partial<BackendSetup>;

/**
 * Teilweise Datenbank-Setup (für Updates)
 */
export type PartialDatabaseSetup = Partial<DatabaseSetup>;

/**
 * Erforderliche Frontend-Eigenschaften
 */
export type RequiredFrontendSetup = Required<Pick<FrontendSetup, 'language' | 'framework' | 'packageManager'>>;

/**
 * Erforderliche Backend-Eigenschaften
 */
export type RequiredBackendSetup = Required<Pick<BackendSetup, 'language' | 'framework' | 'packageManager'>>;

// ============================================================================
// RESULT TYPES
// ============================================================================

/**
 * Ergebnis des Setup-Prozesses
 */
export interface SetupResult {
  success: boolean;
  projectPath: string;
  createdFiles: string[];
  errors: string[];
  warnings: string[];
  nextSteps: string[];
}

/**
 * Ergebnis des Add-Commands
 */
export interface AddCommandResult {
  success: boolean;
  addedType: string;
  createdFiles: string[];
  errors: string[];
  warnings: string[];
  nextSteps: string[];
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/**
 * Validierungsregeln für verschiedene Felder
 */
export interface ValidationRule {
  field: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'array';
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  allowedValues?: string[];
}

/**
 * Validierungsergebnis
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validierungsfehler
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// ============================================================================
// EXPORT CONSTANTS
// ============================================================================

export * from './constants.js';
