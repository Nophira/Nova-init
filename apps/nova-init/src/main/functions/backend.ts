// src/functions/backend.ts
import { select, text, confirm, isCancel, cancel } from '@clack/prompts';
import type { Language, BackendFramework, PackageManager, BackendSetup } from '../../types/index.js';

export async function askBackendLanguage(): Promise<Language> {
  const language = await select({
    message: 'Choose backend coding language:',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' }
    ],
  });

  if (isCancel(language)) {
    cancel('Backend language selection cancelled.');
    process.exit(0);
  }

  return language as Language;
}

export async function askBackendFramework(language: Language): Promise<BackendFramework> {
  const frameworks = await select({
    message: `Choose backend framework for ${language}:`,
    options: [
      { value: 'express', label: 'Express - Fast, unopinionated web framework for Node.js' },
      { value: 'nestjs', label: 'NestJS - Progressive Node.js framework' },
      { value: 'fastify', label: 'Fastify - Fast and low overhead web framework' }
    ],
  });

  if (isCancel(frameworks)) {
    cancel('Backend framework selection cancelled.');
    process.exit(0);
  }

  return frameworks as BackendFramework;
}

export async function askMicroservices(): Promise<boolean> {
  const useMicroservices = await confirm({
    message: 'Do you want to use microservices?',
  });

  if (isCancel(useMicroservices)) {
    cancel('Microservices selection cancelled.');
    process.exit(0);
  }

  return useMicroservices;
}

export async function askMicroserviceNames(): Promise<string[]> {
  const names = await text({
    message: 'Enter microservice names (comma-separated):',
    placeholder: 'auth,user,product,order',
  });

  if (isCancel(names)) {
    cancel('Microservice names input cancelled.');
    process.exit(0);
  }

  if (!names || names.trim() === '') {
    throw new Error('Microservice names cannot be empty');
  }

  return names.split(',').map(name => name.trim()).filter(name => name.length > 0);
}

export async function askBackendFolderName(): Promise<string> {
  const folderName = await text({
    message: 'Enter backend folder name:',
    placeholder: 'backend',
    defaultValue: 'backend',
  });

  if (isCancel(folderName)) {
    cancel('Backend folder name input cancelled.');
    process.exit(0);
  }

  return folderName?.trim() || 'backend';
}

export async function askBackendPackageManager(): Promise<PackageManager> {
  const packageManager = await select({
    message: 'Choose backend package manager:',
    options: [
      { value: 'npm', label: 'npm - Node Package Manager' },
      { value: 'pnpm', label: 'pnpm - Fast, disk space efficient package manager' },
      { value: 'bun', label: 'Bun - All-in-one JavaScript runtime & package manager' }
    ],
  });

  if (isCancel(packageManager)) {
    cancel('Backend package manager selection cancelled.');
    process.exit(0);
  }

  return packageManager as PackageManager;
}

export async function askBackendSetup(hasMonorepo: boolean): Promise<BackendSetup> {
  const language = await askBackendLanguage();
  const framework = await askBackendFramework(language);
  const useMicroservices = await askMicroservices();
  
  let microserviceNames: string[] | undefined;
  let folderName: string | undefined;
  
  if (useMicroservices) {
    microserviceNames = await askMicroserviceNames();
  } else {
    folderName = await askBackendFolderName();
  }
  
  const packageManager = await askBackendPackageManager();

  return {
    language,
    framework,
    useMicroservices,
    microserviceNames,
    folderName,
    packageManager,
  };
}

export function validateBackendLanguage(language: string): Language {
  if (!['javascript', 'typescript'].includes(language)) {
    throw new Error('Invalid backend language. Must be "javascript" or "typescript"');
  }
  return language as Language;
}

export function validateBackendFramework(framework: string): BackendFramework {
  if (!['express', 'nestjs', 'fastify'].includes(framework)) {
    throw new Error('Invalid backend framework. Must be "express", "nestjs", or "fastify"');
  }
  return framework as BackendFramework;
}

export function validateBackendPackageManager(packageManager: string): PackageManager {
  if (!['npm', 'pnpm', 'bun'].includes(packageManager)) {
    throw new Error('Invalid backend package manager. Must be "npm", "pnpm", or "bun"');
  }
  return packageManager as PackageManager;
}
