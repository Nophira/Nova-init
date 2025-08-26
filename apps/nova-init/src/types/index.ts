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
 * Health-Check für Docker-Container
 */
export interface HealthCheck {
  test: string[];
  interval?: string;
  timeout?: string;
  retries?: number;
  startPeriod?: string;
}

// ============================================================================
// COMMAND LINE OPTIONS
// ============================================================================

/**
 * Command-Line Optionen für das Setup
 */
export interface SetupCommandOptions {
  // CLI-Optionen (commander.js übergibt camelCase)
  projectName?: string;
  setupType?: SetupType;
  monorepo?: MonorepoTool;
  monorepoPackageManager?: PackageManager;
  frontend?: FrontendFramework;
  frontendLanguage?: Language;
  frontendFolder?: string;
  frontendPackageManager?: PackageManager;
  vite?: boolean; // Use Vite for React projects
  backend?: BackendFramework;
  backendLanguage?: Language;
  backendFolder?: string;
  backendPackageManager?: PackageManager;
  
  // Gemeinsame Optionen
  microservices?: boolean;
  databases?: string; // String für comma-separated values von commander.js
  hosting?: HostingOption;
  git?: boolean;
  packageManager?: PackageManager;
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

/**
 * Erforderliche Datenbank-Eigenschaften
 */
export type RequiredDatabaseSetup = Required<Pick<DatabaseSetup, 'type' | 'name'>>;

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/**
 * Validierungsergebnis
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Konfigurationsvalidierung
 */
export interface ConfigValidation {
  projectStructure: ValidationResult;
  frameworks: ValidationResult;
  databases: ValidationResult;
  monorepo: ValidationResult;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * Nova-Init spezifische Fehler
 */
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

/**
 * Framework-Installationsfehler
 */
export class FrameworkInstallationError extends NovaInitError {
  constructor(
    framework: string,
    details?: Record<string, any>
  ) {
    super(`Failed to install framework: ${framework}`, 'FRAMEWORK_INSTALLATION_FAILED', details);
    this.name = 'FrameworkInstallationError';
  }
}

/**
 * Datenbank-Setup-Fehler
 */
export class DatabaseSetupError extends NovaInitError {
  constructor(
    database: string,
    details?: Record<string, any>
  ) {
    super(`Failed to setup database: ${database}`, 'DATABASE_SETUP_FAILED', details);
    this.name = 'DatabaseSetupError';
  }
}
