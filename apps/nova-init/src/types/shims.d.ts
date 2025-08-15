// Ambient module declarations to satisfy TypeScript for modules not present yet
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

declare module './database/docker-compose.js' {
  export const createDockerCompose: any;
  export function generateDatabaseCompose(db: string): Promise<string>;
}


