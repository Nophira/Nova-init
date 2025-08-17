// Ambient module declarations for modules that might not be fully typed yet
declare module '@clack/prompts' {
  export interface SelectChoice {
    value: string;
    label: string;
    hint?: string;
  }
  
  export function text(options: any): Promise<string>;
  export function select(options: any): Promise<string>;
  export function confirm(options: any): Promise<boolean>;
  export function multiselect(options: any): Promise<string[]>;
  export function spinner(): any;
  export function note(message: string, title?: string): void;
  export function intro(message: string): void;
  export function outro(message: string): void;
  export function cancel(message?: string): never;
  export function isCancel(value: any): boolean;
}

// Legacy module declarations for backward compatibility
declare module '../installers/addFrontend.js' {
  const mod: any;
  export = mod;
}

declare module '../installers/addBackend.js' {
  const mod: any;
  export = mod;
}

declare module '../installers/addDatabase.js' {
  const mod: any;
  export = mod;
}

declare module '../installers/addMonorepo.js' {
  const mod: any;
  export = mod;
}

declare module '../installers/addTechstack.js' {
  const mod: any;
  export = mod;
}

declare module '../../installers/functions/backend.js' {
  export const askBackendLanguage: any;
  export const askBackendFramework: any;
  export const askBackendFolderName: any;
  export const askBackendPackageManager: any;
}

declare module '../../installers/functions/frontend.js' {
  export const askFrontendLanguage: any;
  export const askFrontendFramework: any;
  export const askFrontendFolderName: any;
  export const askFrontendPackageManager: any;
}

declare module '../commands/commands/create-commands.js' {
  export const CreateCommands: any;
}

// Database module declarations
declare module './database/docker-compose.js' {
  export const createDockerCompose: any;
  export function generateDatabaseCompose(db: string): Promise<string>;
}


